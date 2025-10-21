
import React, { useState, useEffect } from 'react';
import { TeamMember, UserRole, Company } from '../types/index';
import { X } from './icons';

interface InviteMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (memberData: Omit<TeamMember, 'id' | 'status'>, isEditing: boolean) => void;
  memberToEdit: TeamMember | null;
  userRoles: UserRole[];
  userType: 'single_company' | 'professional_firm';
  companies: Company[];
}

const InviteMemberModal: React.FC<InviteMemberModalProps> = ({ isOpen, onClose, onSave, memberToEdit, userRoles, userType, companies }) => {
    const getInitialState = () => ({
        name: memberToEdit?.name || '',
        email: memberToEdit?.email || '',
        roleId: memberToEdit?.roleId || userRoles[0]?.id || '',
        companyIds: memberToEdit?.companyIds || [],
    });

    const [formData, setFormData] = useState(getInitialState());

    useEffect(() => {
        if(isOpen) {
            setFormData(getInitialState());
        }
    }, [isOpen, memberToEdit]);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData, !!memberToEdit);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="font-heading text-2xl font-bold text-primary">{memberToEdit ? 'Editar Miembro' : 'Invitar Nuevo Miembro'}</h2>
                        <button type="button" onClick={onClose}><X className="w-6 h-6 text-gray-500" /></button>
                    </div>
                    <div className="p-6 space-y-4">
                        <input name="name" value={formData.name} onChange={handleChange} placeholder="Nombre Completo" className="w-full px-4 py-2 bg-light border rounded-lg" required />
                        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Correo Electrónico" className="w-full px-4 py-2 bg-light border rounded-lg" required />
                        <select name="roleId" value={formData.roleId} onChange={handleChange} className="w-full px-4 py-2 bg-light border rounded-lg">
                            {userRoles.map(role => <option key={role.id} value={role.id}>{role.name}</option>)}
                        </select>
                        {userType === 'professional_firm' && (
                            <div>
                                <label className="text-sm font-semibold text-gray-600">Asignar a Empresas (opcional)</label>
                                <p className="text-xs text-gray-500 mb-2">Si no seleccionas ninguna, tendrá acceso a todas.</p>
                                {/* A multi-select component would be better here, but this is a simplified version */}
                                <select multiple name="companyIds" value={formData.companyIds} onChange={(e) => setFormData(prev => ({...prev, companyIds: Array.from(e.target.selectedOptions, option => option.value)}))} className="w-full h-32 px-4 py-2 bg-light border rounded-lg">
                                    {companies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                                </select>
                            </div>
                        )}
                    </div>
                    <div className="p-6 bg-light flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg">Cancelar</button>
                        <button type="submit" className="bg-secondary text-white font-bold py-2 px-4 rounded-lg">{memberToEdit ? 'Guardar Cambios' : 'Enviar Invitación'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InviteMemberModal;
