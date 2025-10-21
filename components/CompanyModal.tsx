
import React, { useState, useEffect } from 'react';
// FIX: Changed import path to be explicit, pointing to the index file.
import { Company } from '../types/index';
import { X } from './icons';

interface CompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (companyData: Omit<Company, 'id'>) => void;
  companyToEdit: Company | null;
}

const InputField: React.FC<{ label: string; id: keyof Omit<Company, 'id'>; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; required?: boolean; placeholder?: string }> =
({ label, id, value, onChange, required = false, placeholder = '' }) => (
    <div>
        {/* FIX: Cast id to string to satisfy htmlFor prop type. */}
        <label htmlFor={id as string} className="block text-sm font-semibold mb-2 text-gray-600">{label}</label>
        <input 
            type="text" 
            // FIX: Cast id to string to satisfy id and name prop types.
            id={id as string} 
            name={id as string} 
            value={value} 
            onChange={onChange} 
            required={required} 
            placeholder={placeholder}
            className="w-full px-4 py-2 bg-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition" 
        />
    </div>
);

const CompanyModal: React.FC<CompanyModalProps> = ({ isOpen, onClose, onSave, companyToEdit }) => {
  const getInitialState = () => ({
    name: companyToEdit?.name || '',
    rnc: companyToEdit?.rnc || '',
    address: companyToEdit?.address || '',
    phone: companyToEdit?.phone || '',
    email: companyToEdit?.email || '',
    logoUrl: companyToEdit?.logoUrl || '',
  });

  const [formData, setFormData] = useState(getInitialState());

  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialState());
    }
  }, [isOpen, companyToEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="font-heading text-2xl font-bold text-primary">{companyToEdit ? 'Editar Empresa' : 'Añadir Nueva Empresa'}</h2>
          <button onClick={onClose}><X className="w-6 h-6 text-gray-500 hover:text-red-600" /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <InputField label="Nombre de la Empresa" id="name" value={formData.name} onChange={handleChange} required placeholder="CaribeTech SRL" />
            <InputField label="RNC" id="rnc" value={formData.rnc} onChange={handleChange} placeholder="130123457" />
            <InputField label="Dirección" id="address" value={formData.address} onChange={handleChange} placeholder="Av. John F. Kennedy, Santo Domingo" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InputField label="Teléfono" id="phone" value={formData.phone} onChange={handleChange} placeholder="809-555-1234" />
                <InputField label="Correo Electrónico" id="email" value={formData.email} onChange={handleChange} placeholder="contacto@empresa.do" />
            </div>
            <InputField label="URL del Logo" id="logoUrl" value={formData.logoUrl} onChange={handleChange} placeholder="https://dominio.com/logo.png" />
          </div>
          <div className="p-6 bg-light flex justify-end items-center space-x-3 rounded-b-xl">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-all">
              Cancelar
            </button>
            <button type="submit" className="bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary/90 transition-all shadow-sm">
              Guardar Empresa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyModal;
