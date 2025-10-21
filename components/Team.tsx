
import React from 'react';
import Card from './Card';
import { TeamMember, UserRole } from '../types/index';
import { UserPlus, Pencil, Trash2 } from './icons';

interface TeamProps {
    teamMembers: TeamMember[];
    userRoles: UserRole[];
    onInvite: (member?: TeamMember) => void;
    onDelete: (memberId: string) => void;
}

const Team: React.FC<TeamProps> = ({ teamMembers, userRoles, onInvite, onDelete }) => {
    const roleMap = new Map(userRoles.map(r => [r.id, r.name]));

    return (
        <div className="p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading text-3xl font-bold text-primary">Gestión de Equipo</h1>
                    <p className="text-gray-500 mt-1">Invita y administra a los miembros de tu equipo que acceden a la plataforma.</p>
                </div>
                <button onClick={() => onInvite()} className="flex items-center bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary/90 transition-all">
                    <UserPlus className="w-5 h-5 mr-2" /> Invitar Miembro
                </button>
            </div>

            <Card className="mt-8">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-light">
                                <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase">Nombre</th>
                                <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase">Rol</th>
                                <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase">Estatus</th>
                                <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teamMembers.map(member => (
                                <tr key={member.id} className="border-b last:border-0 hover:bg-light">
                                    <td className="py-4 px-6">
                                        <p className="font-semibold text-primary">{member.name}</p>
                                        <p className="text-sm text-gray-500">{member.email}</p>
                                    </td>
                                    <td className="py-4 px-6 text-gray-700">{roleMap.get(member.roleId) || 'N/A'}</td>
                                    <td className="py-4 px-6">
                                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${member.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {member.status}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6 text-right">
                                        <button onClick={() => onInvite(member)} className="p-2 text-gray-400 hover:text-blue-600"><Pencil className="w-4 h-4" /></button>
                                        <button onClick={() => onDelete(member.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Team;
