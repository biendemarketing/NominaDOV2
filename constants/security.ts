// FIX: Changed import path to be explicit, pointing to the index file.
import { UserRole, AuditLogEvent } from '../types/index';

export const MOCK_USER_ROLES: UserRole[] = [
    { id: 'role-1', name: 'Administrador', permissions: ['Todo'], userCount: 1 },
    { id: 'role-2', name: 'Contador', permissions: ['Nómina', 'Reportes'], userCount: 2 },
    { id: 'role-3', name: 'RRHH', permissions: ['Empleados', 'Contratos'], userCount: 1 },
];

export const MOCK_AUDIT_LOGS: AuditLogEvent[] = [
    { id: 'log-1', timestamp: new Date().toISOString(), userId: 'user-001', actionType: 'LOGIN', description: 'Inicio de sesión exitoso.', ipAddress: '192.168.1.1' },
    { id: 'log-2', timestamp: new Date(Date.now() - 3600000).toISOString(), userId: 'user-002', actionType: 'PROCESS_PAYROLL', description: 'Procesó nómina para CaribeTech SRL (1ra Quincena Julio).', ipAddress: '200.1.2.3' },
    { id: 'log-3', timestamp: new Date(Date.now() - 7200000).toISOString(), userId: 'user-001', actionType: 'UPDATE', description: 'Actualizó perfil de la empresa Quisqueya Soluciones.', ipAddress: '192.168.1.1' },
];