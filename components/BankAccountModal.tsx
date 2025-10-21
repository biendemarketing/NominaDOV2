
import React, { useState, useEffect } from 'react';
import { BankAccount } from '../types/index';
import { X } from './icons';

interface BankAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (accountData: Omit<BankAccount, 'id'>) => void;
  accountToEdit: BankAccount | null;
}

const BankAccountModal: React.FC<BankAccountModalProps> = ({ isOpen, onClose, onSave, accountToEdit }) => {
    const getInitialState = () => ({
        bankName: accountToEdit?.bankName || 'Banco Popular',
        accountNumber: accountToEdit?.accountNumber || '',
        accountType: accountToEdit?.accountType || 'Corriente',
        isPrimary: accountToEdit?.isPrimary || false,
    });

    const [formData, setFormData] = useState(getInitialState());

    useEffect(() => {
        if (isOpen) {
            setFormData(getInitialState());
        }
    }, [isOpen, accountToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if(type === 'checkbox') {
            setFormData(prev => ({...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 border-b flex justify-between items-center">
                        <h2 className="font-heading text-2xl font-bold text-primary">{accountToEdit ? 'Editar Cuenta' : 'Añadir Cuenta Bancaria'}</h2>
                        <button type="button" onClick={onClose}><X className="w-6 h-6 text-gray-500" /></button>
                    </div>
                    <div className="p-6 space-y-4">
                        {/* Form fields */}
                        <select name="bankName" value={formData.bankName} onChange={handleChange} className="w-full px-4 py-2 bg-light border rounded-lg">
                            <option>Banco Popular</option>
                            <option>Banreservas</option>
                            <option>BHD</option>
                            <option>Scotiabank</option>
                            <option>Banco Santa Cruz</option>
                            <option>Asociación Popular de Ahorros y Préstamos (APAP)</option>
                        </select>
                         <input name="accountNumber" value={formData.accountNumber} onChange={handleChange} placeholder="Número de Cuenta" className="w-full px-4 py-2 bg-light border rounded-lg" required />
                         <select name="accountType" value={formData.accountType} onChange={handleChange} className="w-full px-4 py-2 bg-light border rounded-lg">
                            <option>Corriente</option>
                            <option>Ahorros</option>
                        </select>
                        <label className="flex items-center space-x-2"><input type="checkbox" name="isPrimary" checked={formData.isPrimary} onChange={handleChange} /> <span>Marcar como cuenta principal para pagos</span></label>
                    </div>
                    <div className="p-6 bg-light flex justify-end space-x-2">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg">Cancelar</button>
                        <button type="submit" className="bg-secondary text-white font-bold py-2 px-4 rounded-lg">Guardar Cuenta</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BankAccountModal;
