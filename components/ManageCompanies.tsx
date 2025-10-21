import React, { useState } from 'react';
// FIX: Changed import path to be explicit, pointing to index file.
import { Company } from '../types/index';
import Card from './Card';
import CompanyAvatar from './CompanyAvatar';
import { Plus, Pencil, Trash2, Mail, Phone, MapPin, Briefcase } from './icons';

interface ManageCompaniesProps {
  companies: Company[];
  onEdit: (company: Company) => void;
  onDelete: (companyId: string) => void;
  onAdd: () => void;
  onManage: (companyId: string) => void;
}

const CompanyManagementCard: React.FC<{ 
  company: Company; 
  onEdit: () => void; 
  onDelete: () => void; 
  onManage: () => void;
  isConfirmingDelete: boolean;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
  confirmText: string;
  onConfirmTextChange: (text: string) => void;
}> = ({ 
  company, onEdit, onDelete, onManage, 
  isConfirmingDelete, onConfirmDelete, onCancelDelete, 
  confirmText, onConfirmTextChange 
}) => {
  if (isConfirmingDelete) {
    return (
      <Card className="flex flex-col border-2 border-red-500 shadow-lg ring-4 ring-red-500/20">
        <h4 className="font-heading font-bold text-red-700 text-center">Confirmar Eliminación</h4>
        <p className="text-sm text-center text-gray-600 my-4">
          Esta acción es irreversible y eliminará todos los datos de <strong>{company.name}</strong>. Para confirmar, escribe "<strong>eliminar</strong>" a continuación.
        </p>
        <input
          type="text"
          value={confirmText}
          onChange={(e) => onConfirmTextChange(e.target.value)}
          className="w-full px-4 py-2 bg-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500/50 transition mb-4"
          placeholder="eliminar"
          autoFocus
        />
        <div className="mt-auto flex items-center justify-end space-x-2">
          <button onClick={onCancelDelete} className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-all">
            Cancelar
          </button>
          <button 
            onClick={onConfirmDelete} 
            disabled={confirmText !== 'eliminar'}
            className="flex items-center bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Eliminar Permanentemente
          </button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col">
      <div className="flex items-center mb-4">
        <CompanyAvatar company={company} size="large" />
        <div className="ml-4 flex-1 min-w-0">
          <h3 className="font-heading text-xl font-bold text-primary truncate" title={company.name}>{company.name}</h3>
          <p className="text-sm text-gray-500">{company.rnc || 'RNC no disponible'}</p>
        </div>
      </div>
      <div className="space-y-3 text-sm text-gray-600 my-4 flex-grow">
        <div className="flex items-start">
          <MapPin className="w-4 h-4 mr-3 mt-1 flex-shrink-0 text-gray-400" />
          <span>{company.address || 'Dirección no disponible'}</span>
        </div>
        <div className="flex items-center">
          <Phone className="w-4 h-4 mr-3 flex-shrink-0 text-gray-400" />
          <span>{company.phone || 'Teléfono no disponible'}</span>
        </div>
        <div className="flex items-center">
          <Mail className="w-4 h-4 mr-3 flex-shrink-0 text-gray-400" />
          <a href={`mailto:${company.email}`} className="hover:underline truncate">{company.email || 'Email no disponible'}</a>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-end space-x-2 border-t pt-4">
        <button onClick={onDelete} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-100 rounded-full transition-colors" title="Eliminar Empresa">
          <Trash2 className="w-5 h-5" />
        </button>
        <button onClick={onEdit} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-full transition-colors" title="Editar Empresa">
          <Pencil className="w-5 h-5" />
        </button>
        <button onClick={onManage} className="flex items-center bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary/90 transition-all">
          <Briefcase className="w-4 h-4 mr-2" />
          Gestionar
        </button>
      </div>
    </Card>
  );
};

const ManageCompanies: React.FC<ManageCompaniesProps> = ({ companies, onEdit, onDelete, onAdd, onManage }) => {
  const [companyToDeleteId, setCompanyToDeleteId] = useState<string | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  const handleStartDelete = (companyId: string) => {
    setCompanyToDeleteId(companyId);
    setDeleteConfirmText('');
  };
  
  const handleCancelDelete = () => {
    setCompanyToDeleteId(null);
    setDeleteConfirmText('');
  };

  const handleConfirmDelete = () => {
    if (companyToDeleteId && deleteConfirmText === 'eliminar') {
      onDelete(companyToDeleteId);
      handleCancelDelete();
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">Gestionar Empresas</h1>
          <p className="text-gray-500 mt-1">Añade, edita o elimina las empresas de tus clientes.</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary/90 transition-all"
        >
          <Plus className="w-5 h-5 mr-2" />
          Añadir Empresa
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
        {companies.map(company => (
          <CompanyManagementCard
            key={company.id}
            company={company}
            onEdit={() => onEdit(company)}
            onDelete={() => handleStartDelete(company.id)}
            onManage={() => onManage(company.id)}
            isConfirmingDelete={companyToDeleteId === company.id}
            onConfirmDelete={handleConfirmDelete}
            onCancelDelete={handleCancelDelete}
            confirmText={deleteConfirmText}
            onConfirmTextChange={setDeleteConfirmText}
          />
        ))}
         {companies.length === 0 && (
            <Card className="md:col-span-2 xl:col-span-3 text-center py-16 border-2 border-dashed">
                 <h3 className="font-bold text-lg text-primary">No hay empresas registradas</h3>
                 <p className="text-gray-500 mt-2">Comienza añadiendo tu primera empresa cliente.</p>
                 <button onClick={onAdd} className="mt-4 flex items-center mx-auto bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary/90 transition-all">
                    <Plus className="w-5 h-5 mr-2" />
                    Añadir Empresa
                </button>
            </Card>
        )}
      </div>
    </div>
  );
};

export default ManageCompanies;
