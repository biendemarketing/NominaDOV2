import React from 'react';
import Card from './Card';
// FIX: Changed import path to be explicit, pointing to index file.
import { TeamMember } from '../types/index';
import { Plus, Users } from './icons';

interface TeamProps {
  teamMembers: TeamMember[];
}

const Team: React.FC<TeamProps> = ({ teamMembers }) => {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">Equipo</h1>
          <p className="text-gray-500 mt-1">Gestiona los usuarios que tienen acceso a tu cuenta.</p>
        </div>
        <button className="flex items-center bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary/90 transition-all">
          <Plus className="w-5 h-5 mr-2" />
          Invitar Miembro
        </button>
      </div>

      <Card className="mt-8">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-light">
                <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider">Miembro</th>
                <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider">Rol</th>
                <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider">Estatus</th>
                <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.id} className="border-b border-gray-200 hover:bg-light transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full mr-4 object-cover" />
                      <div>
                        <p className="font-semibold text-primary">{member.name}</p>
                        <p className="text-sm text-gray-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-primary/10 text-primary">{member.role}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${member.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-secondary hover:underline font-semibold">Editar</button>
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
