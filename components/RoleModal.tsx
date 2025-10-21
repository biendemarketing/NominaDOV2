
import React, { useState, useEffect } from 'react';
import { UserRole, Permission } from '../types/index';
import { X } from './icons';

interface RoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (roleData: Omit<UserRole, 'id'>) => void;
  roleToEdit: UserRole | null;
  permissionsList: { id: Permission; label: string; description: string; }[];
}

const RoleModal: React.FC<RoleModalProps> = ({ isOpen, onClose, onSave, roleToEdit, permissionsList }) => {
    const getInitialState = () => ({
        name: roleToEdit?.name || '',
        permissions: roleToEdit?.permissions || [],
    });
    
    const [formData, setFormData] = useState(getInitialState());

    useEffect(() => {
        if(isOpen) {
            setFormData(getInitialState());
        }
    }, [isOpen, roleToEdit]);

    const handlePermissionToggle = (permissionId: Permission) => {
        setFormData(prev => {
            const newPermissions = prev.permissions.includes(permissionId)
                ? prev.permissions.filter(p => p !== permissionId)
                : [...prev.permissions, permissionId];
            return { ...prev, permissions: newPermissions };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
         <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="font-heading text-2xl font-bold text-primary">{roleToEdit ? 'Editar Rol' : 'Crear Nuevo Rol'}</h2>
                        <button type="button" onClick={onClose}><X className="w-6 h-6 text-gray-500" /></button>
                    </div>
                    <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
                        <input name="name" value={formData.name} onChange={(e) => setFormData(p => ({...p, name: e.target.value}))} placeholder="Nombre del Rol" className="w-full px-4 py-2 bg-light border rounded-lg" required />
                        <div className="space-y-2">
                            {permissionsList.map(p => (
                                <label key={p.id} className="flex items-center p-2 rounded-md hover:bg-light space-x-3">
                                    <input type="checkbox" checked={formData.permissions.includes(p.id)} onChange={() => handlePermissionToggle(p.id)} className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary/50"/>
                                    <div>
                                        <span className="font-semibold text-sm text-primary">{p.label}</span>
                                        <p className="text-xs text-gray-500">{p.description}</p>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                    <div className="p-6 bg-light flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg">Cancelar</button>
                        <button type="submit" className="bg-secondary text-white font-bold py-2 px-4 rounded-lg">Guardar Rol</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RoleModal;
