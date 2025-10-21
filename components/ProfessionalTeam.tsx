import React from 'react';
import Card from './Card';
// FIX: Changed import path to be explicit, pointing to index file.
import { TeamMember, Company } from '../types/index';
import { Plus } from './icons';

interface ProfessionalTeamProps {
  teamMembers: TeamMember[];
  companies: Company[];
}

export const ProfessionalTeam: React.FC<ProfessionalTeamProps> = ({ teamMembers, companies }) => {
  const companyMap = new Map(companies.map(c => [c.id, c]));

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-3xl font-bold text-primary">Equipo de la Cuenta</h1>
          <p className="text-gray-500 mt-1">Gestiona los usuarios de tu cuenta y sus accesos a empresas.</p>
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
                <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider">Empresas Asignadas</th>
                <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider">Estatus</th>
                <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase tracking-wider text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {teamMembers.map((member) => (
                <tr key={member.id} className="border-b border-gray-200 hover:bg-light transition-colors">