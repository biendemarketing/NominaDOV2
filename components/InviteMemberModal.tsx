import React, { useState, useEffect } from 'react';
import { TeamMember, TeamMemberRole, Company } from '../types/index';
import { X } from './icons';
import { UserType } from '../App';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (memberData: Omit<TeamMember, 'id' | 'avatarUrl' | 'status'>) => void;
  userType: UserType;
  companies?: Company[];
}

const InviteMemberModal: React.FC<InviteMemberModalProps> = ({ isOpen, onClose, onSave, userType, companies = [] }) => {
  
  const getInitialState = () => ({
    name: '',
    email: '',
    role: 'Contador' as TeamMemberRole,
    assignedCompanies: [] as string[],
  });

  const [formData, setFormData] = useState(getInitialState());

  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialState());
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleCompanyChange = (companyId: string) => {
    setFormData(prev => {
        const currentlySelectsAll = prev.assignedCompanies.length === 0;
        let newAssigned: string[];

        if (currentlySelectsAll) {
            // If "All" was selected, starting a specific selection
            newAssigned = [companyId];
        } else {
            newAssigned = prev.assignedCompanies.includes(companyId)
                ? prev.assignedCompanies.filter(id => id !== companyId)
                : [...prev.assignedCompanies, companyId];
        }
        
        return { ...prev, assignedCompanies: newAssigned };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { name, email, role, assignedCompanies } = formData;
    const submissionData: Omit<TeamMember, 'id' | 'avatarUrl' | 'status'> = {
        name,
        email,
        role,
    };
    // Only add assignedCompanies if the user is professional and has made a specific selection
    if (userType === 'professional_firm' && assignedCompanies.length > 0) {
        submissionData.assignedCompanies = assignedCompanies;
    }
    onSave(submissionData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        <div className="p-6 border-b flex justify-between items-start">
            <div>
                <h2 className="font-heading text-2xl font-bold text-primary">Invitar Nuevo Miembro</h2>
                <p className="text-gray-500 mt-1">Se le enviará una invitación por correo electrónico.</p>
            </div>
             <button type="button" onClick={onClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600">
                <X className="w-6 h-6" />
            </button>
        </div>
        <form onSubmit={handleSubmit}>
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold mb-2 text-gray-600">Nombre Completo</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 bg-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50" />
                    </div>
                     <div>
                        <label htmlFor="email" className="block text-sm font-semibold mb-2 text-gray-600">Correo Electrónico</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 bg-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50" />
                    </div>
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-semibold mb-2 text-gray-600">Rol</label>
                    <select id="role" name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 bg-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50">
                        <option>Admin</option>
                        <option>Contador</option>
                        <option>RRHH</option>
                    </select>
                </div>
                {userType === 'professional_firm' && (
                    <div>
                        <h3 className="block text-sm font-semibold mb-2 text-gray-600">Asignar Empresas</h3>
                        <div className="p-3 bg-light rounded-lg border max-h-40 overflow-y-auto space-y-2">
                            <label className="flex items-center space-x-2 font-medium text-gray-700">
                                <input 
                                    type="checkbox"
                                    checked={formData.assignedCompanies.length === 0}
                                    onChange={() => setFormData(prev => ({...prev, assignedCompanies: []}))}
                                    className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary/50"
                                />
                                <span>Acceso a todas las empresas (por defecto)</span>
                            </label>
                            <hr/>
                            {companies.map(company => (
                                <label key={company.id} className="flex items-center space-x-2 text-gray-700">
                                    <input
                                        type="checkbox"
                                        checked={formData.assignedCompanies.includes(company.id)}
                                        onChange={() => handleCompanyChange(company.id)}
                                        className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary/50"
                                    />
                                    <span>{company.name}</span>
                                </label>
                            ))}
                        </div>
                         <p className="text-xs text-gray-500 mt-1">Si no seleccionas ninguna específica, el miembro tendrá acceso a todas.</p>
                    </div>
                )}
            </div>
            <div className="p-6 bg-light flex justify-end items-center space-x-3 rounded-b-xl border-t">
                <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-all">
                    Cancelar
                </button>
                <button type="submit" className="bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary/90 transition-all shadow-sm">
                    Enviar Invitación
                </button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default InviteMemberModal;
