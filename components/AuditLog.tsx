import React, { useState, useMemo } from 'react';
import Card from './Card';
import { AuditLogEvent, TeamMember, Employee, AuditLogActionType } from '../types';
// FIX: Imported the 'Users' icon to resolve the 'Cannot find name' error.
import { Search, Filter, FileText, UserPlus, Trash2, LogOut, DollarSign, Pencil, Users } from './icons';

interface AuditLogProps {
  logs: AuditLogEvent[];
  teamMembers: TeamMember[];
  employees: Employee[];
}

const actionIcons: Record<AuditLogActionType, React.ReactNode> = {
    CREATE: <UserPlus className="w-5 h-5 text-green-600" />,
    UPDATE: <Pencil className="w-5 h-5 text-blue-600" />,
    DELETE: <Trash2 className="w-5 h-5 text-red-600" />,
    LOGIN: <Users className="w-5 h-5 text-indigo-600" />,
    LOGOUT: <LogOut className="w-5 h-5 text-gray-500" />,
    GENERATE_REPORT: <FileText className="w-5 h-5 text-purple-600" />,
    PROCESS_PAYROLL: <DollarSign className="w-5 h-5 text-teal-600" />,
};

const actionLabels: Record<AuditLogActionType, string> = {
    CREATE: 'Creación',
    UPDATE: 'Actualización',
    DELETE: 'Eliminación',
    LOGIN: 'Inicio de Sesión',
    LOGOUT: 'Cierre de Sesión',
    GENERATE_REPORT: 'Reporte Generado',
    PROCESS_PAYROLL: 'Nómina Procesada',
};

const AuditLog: React.FC<AuditLogProps> = ({ logs, teamMembers, employees }) => {
  const [filters, setFilters] = useState({
    searchText: '',
    userId: 'all',
    actionType: 'all',
    startDate: '',
    endDate: '',
  });

  const teamMemberMap = useMemo(() => new Map(teamMembers.map(m => [m.id, m])), [teamMembers]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      const logDate = new Date(log.timestamp);
      
      const isAfterStartDate = !filters.startDate || logDate >= new Date(filters.startDate);
      const isBeforeEndDate = !filters.endDate || logDate <= new Date(filters.endDate + 'T23:59:59');
      const matchesUser = filters.userId === 'all' || log.userId === filters.userId;
      const matchesAction = filters.actionType === 'all' || log.actionType === filters.actionType;
      const matchesSearch = filters.searchText === '' || log.description.toLowerCase().includes(filters.searchText.toLowerCase());

      return isAfterStartDate && isBeforeEndDate && matchesUser && matchesAction && matchesSearch;
    });
  }, [logs, filters]);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('es-DO', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="p-8">
      <h1 className="font-heading text-3xl font-bold text-primary">Registro de Auditoría</h1>
      <p className="text-gray-500 mt-1">Rastrea todas las actividades importantes realizadas en la cuenta.</p>

      <Card className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border-b">
          {/* Filters */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              name="searchText"
              placeholder="Buscar evento..."
              value={filters.searchText}
              onChange={handleFilterChange}
              className="w-full pl-10 pr-4 py-2 bg-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50"
            />
          </div>
          <select name="userId" value={filters.userId} onChange={handleFilterChange} className="w-full px-4 py-2 bg-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50">
            <option value="all">Todos los Usuarios</option>
            {teamMembers.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
          <select name="actionType" value={filters.actionType} onChange={handleFilterChange} className="w-full px-4 py-2 bg-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50">
            <option value="all">Todas las Acciones</option>
            {Object.entries(actionLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
          </select>
          <div className="flex items-center space-x-2">
             <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} className="w-full px-2 py-2 bg-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50" />
             <span className="text-gray-500">-</span>
             <input type="date" name="endDate" value={filters.endDate} onChange={handleFilterChange} className="w-full px-2 py-2 bg-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50" />
          </div>
        </div>

        {/* Log List */}
        <div className="space-y-2 p-4 max-h-[60vh] overflow-y-auto">
          {filteredLogs.map(log => {
            const user = teamMemberMap.get(log.userId);
            return (
              <div key={log.id} className="flex items-start p-4 bg-white hover:bg-light rounded-lg transition-colors">
                <div className="p-3 bg-gray-100 rounded-full mr-4">
                    {actionIcons[log.actionType]}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-primary">{log.description}</p>
                  <p className="text-sm text-gray-500">
                    <span className="font-medium">{user?.name || 'Sistema'}</span> &middot; {actionLabels[log.actionType]}
                  </p>
                </div>
                <div className="text-right text-sm text-gray-400">
                    <p>{formatTimestamp(log.timestamp)}</p>
                    <p>IP: {log.ipAddress}</p>
                </div>
              </div>
            );
          })}
          {filteredLogs.length === 0 && (
            <div className="text-center py-16">
                <p className="text-gray-500">No se encontraron eventos que coincidan con tus filtros.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AuditLog;