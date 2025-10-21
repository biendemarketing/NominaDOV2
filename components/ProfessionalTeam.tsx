import React from 'react';
import Card from './Card';
// Se asume que estos imports están correctos en tu estructura de carpetas
import { TeamMember, Company } from '../types/index';
import { Plus } from './icons';

// Interfaz (ya estabas bien)
interface ProfessionalTeamProps {
  teamMembers: TeamMember[];
  companies: Company[];
}

export const ProfessionalTeam: React.FC<ProfessionalTeamProps> = ({ teamMembers, companies }) => {
  const companyMap = new Map(companies.map(c => [c.id, c]));

  return (
    <div className="p-8"> {/* Inicio: Div principal */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">Equipo de la Cuenta</h1>
          <p className="text-gray-500 mt-1">Gestiona los usuarios de tu cuenta y sus accesos a empresas.</p>
        </div>
        <button className="flex items-center bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary/90 transition-all">
          <Plus className="w-5 h-5 mr-2" />
          Invitar Miembro
        </button>
      </div> {/* Fin: Div flex items-center justify-between */}

      <Card className="mt-8"> {/* Inicio: Card */}
        <div className="overflow-x-auto"> {/* Inicio: Div overflow */}
          <table className="w-full text-left"> {/* Inicio: Table */}
            <thead>
              <tr className="bg-light">
                <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider">Miembro</th>
                <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider">Rol</th>
                <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider">Empresas Asignadas</th>
                <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider">Estatus</th>
                <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody> {/* Inicio: Tbody */}
              {teamMembers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 px-6 text-center text-gray-500">
                    No hay miembros de equipo registrados.
                  </td>
                </tr>
              ) : (
                teamMembers.map((member) => (
                  <tr key={member.id} className="border-b border-gray-200 hover:bg-light transition-colors"> {/* Inicio: TR */}
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
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {member.assignedCompanies?.length ? (
                        member.assignedCompanies.map(id => companyMap.get(id)?.name || 'N/A').join(', ')
                      ) : 'Todas'}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${member.status === 'Activo' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-secondary hover:underline font-semibold">Editar</button>
                    </td>
                  </tr> // Fin: TR
                ))
              )}
            </tbody> {/* Fin: Tbody */}
          </table> {/* Fin: Table */}
        </div> {/* Fin: Div overflow */}
      </Card> {/* Fin: Card */}
    </div> // Fin: Div principal
  );
};