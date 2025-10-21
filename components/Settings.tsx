
import React, { useState } from 'react';
import Card from './Card';
import { CompanyProfile, BankAccount, UserRole, TeamMember, Permission } from '../types/index';
import { Building, Landmark, UserCog, Plug, Pencil, Trash2, PlusCircle, CheckCircle, Info } from './icons';

interface SettingsProps {
    companyProfile: CompanyProfile;
    onUpdateCompanyProfile: (profile: CompanyProfile) => void;
    bankAccounts: BankAccount[];
    onAddBankAccount: (account: Omit<BankAccount, 'id'>) => void;
    onUpdateBankAccount: (account: BankAccount) => void;
    onDeleteBankAccount: (accountId: string) => void;
    userRoles: UserRole[];
    teamMembers: TeamMember[];
    permissions: { id: Permission, label: string }[];
    onAddRole: (role: Omit<UserRole, 'id'>) => void;
    onUpdateRole: (role: UserRole) => void;
    onDeleteRole: (roleId: string) => void;
    integrations: { [key: string]: boolean };
    onToggleIntegration: (key: string) => void;
}

const TabButton: React.FC<{ icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => (
    <button onClick={onClick} className={`flex items-center space-x-2 px-4 py-3 font-semibold text-sm rounded-md transition-all duration-200 w-full text-left ${isActive ? 'bg-secondary/10 text-secondary' : 'text-gray-500 hover:bg-gray-100'}`}>
        {icon}
        <span>{label}</span>
    </button>
);

const Settings: React.FC<SettingsProps> = ({ 
    companyProfile, onUpdateCompanyProfile,
    bankAccounts, onAddBankAccount, onUpdateBankAccount, onDeleteBankAccount,
    userRoles, teamMembers, permissions, onAddRole, onUpdateRole, onDeleteRole,
    integrations, onToggleIntegration
}) => {
    const [activeTab, setActiveTab] = useState('profile');

    const renderContent = () => {
        switch(activeTab) {
            case 'profile':
                return (
                    <Card>
                        <h2 className="font-heading text-xl font-bold text-primary mb-4">Perfil de la Empresa</h2>
                        <p className="text-gray-500 mb-6">Esta información se utiliza en reportes y documentos oficiales.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Form to edit profile would go here. For now, just display. */}
                            <p><strong>Nombre:</strong> {companyProfile.name}</p>
                            <p><strong>RNC:</strong> {companyProfile.rnc}</p>
                            <p><strong>Dirección:</strong> {companyProfile.address}</p>
                            <p><strong>Teléfono:</strong> {companyProfile.phone}</p>
                            <p><strong>Email:</strong> {companyProfile.email}</p>
                            <p><strong>Sitio Web:</strong> {companyProfile.website}</p>
                        </div>
                    </Card>
                );
            case 'banks':
                 return (
                    <Card>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-heading text-xl font-bold text-primary">Cuentas Bancarias</h2>
                            <button onClick={() => onAddBankAccount({ bankName: '', accountNumber: '', accountType: 'Corriente', isPrimary: false })} className="flex items-center bg-secondary text-white font-bold py-2 px-4 rounded-lg text-sm"><PlusCircle className="w-4 h-4 mr-2" /> Añadir Cuenta</button>
                        </div>
                        <div className="space-y-3">
                            {bankAccounts.map(acc => (
                                <div key={acc.id} className="flex items-center justify-between p-3 bg-light rounded-lg">
                                    <div className="flex items-center">
                                        <Landmark className="w-6 h-6 text-secondary mr-4" />
                                        <div>
                                            <p className="font-semibold text-primary">{acc.bankName} - {acc.accountType}</p>
                                            <p className="text-sm text-gray-500">{acc.accountNumber}</p>
                                        </div>
                                        {acc.isPrimary && <span className="ml-4 text-xs font-bold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">Principal</span>}
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <button onClick={() => onUpdateBankAccount(acc)} className="p-2 text-gray-400 hover:text-blue-600"><Pencil className="w-4 h-4" /></button>
                                        <button onClick={() => onDeleteBankAccount(acc.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                );
            case 'roles':
                 return (
                    <Card>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="font-heading text-xl font-bold text-primary">Roles y Permisos</h2>
                             <button onClick={() => onAddRole({ name: '', permissions: [] })} className="flex items-center bg-secondary text-white font-bold py-2 px-4 rounded-lg text-sm"><PlusCircle className="w-4 h-4 mr-2" /> Añadir Rol</button>
                        </div>
                        <div className="space-y-4">
                            {userRoles.map(role => (
                                <div key={role.id} className="p-4 border rounded-lg">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-bold text-primary">{role.name}</h3>
                                        {!role.isDefault && <div className="flex items-center space-x-2">
                                            <button onClick={() => onUpdateRole(role)} className="p-2 text-gray-400 hover:text-blue-600"><Pencil className="w-4 h-4" /></button>
                                            <button onClick={() => onDeleteRole(role.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                        </div>}
                                    </div>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                                        {permissions.map(p => (
                                            <div key={p.id} className={`flex items-center text-sm ${role.permissions.includes(p.id) ? 'text-green-700' : 'text-gray-400'}`}>
                                                <CheckCircle className="w-4 h-4 mr-2" />
                                                <span>{p.label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                );
            case 'integrations':
                 return (
                    <Card>
                        <h2 className="font-heading text-xl font-bold text-primary mb-4">Integraciones</h2>
                        <div className="space-y-3">
                            {Object.entries(integrations).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between p-3 bg-light rounded-lg">
                                    <p className="font-semibold text-primary capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={value} onChange={() => onToggleIntegration(key)} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
                                    </label>
                                </div>
                            ))}
                        </div>
                    </Card>
                );
            default: return null;
        }
    };
    
    return (
        <div className="p-8">
            <h1 className="font-heading text-3xl font-bold text-primary">Configuración</h1>
            <p className="text-gray-500 mt-1">Administra los detalles de tu empresa, equipo e integraciones.</p>
            <div className="flex flex-col lg:flex-row gap-8 mt-8">
                <div className="lg:w-1/4">
                    <Card>
                        <nav className="flex flex-col space-y-2">
                            <TabButton icon={<Building className="w-5 h-5"/>} label="Perfil de la Empresa" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
                            <TabButton icon={<Landmark className="w-5 h-5"/>} label="Cuentas Bancarias" isActive={activeTab === 'banks'} onClick={() => setActiveTab('banks')} />
                            <TabButton icon={<UserCog className="w-5 h-5"/>} label="Roles y Permisos" isActive={activeTab === 'roles'} onClick={() => setActiveTab('roles')} />
                            <TabButton icon={<Plug className="w-5 h-5"/>} label="Integraciones" isActive={activeTab === 'integrations'} onClick={() => setActiveTab('integrations')} />
                        </nav>
                    </Card>
                </div>
                <div className="lg:w-3/4">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Settings;
