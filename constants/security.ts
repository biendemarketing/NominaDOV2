
import { TeamMember, UserRole, AuditLogEvent, AuditLogActionType } from '../types/index';

export const MOCK_USER_ROLES: UserRole[] = [
    { id: 'admin', name: 'Administrador', isDefault: true, permissions: ['view_employees', 'manage_employees', 'run_payroll', 'view_payroll_history', 'generate_reports', 'manage_company_settings', 'manage_team', 'manage_billing'] },
    { id: 'payroll_manager', name: 'Gestor de Nómina', isDefault: false, permissions: ['view_employees', 'run_payroll', 'view_payroll_history', 'generate_reports'] },
    { id: 'viewer', name: 'Solo Lectura', isDefault: false, permissions: ['view_employees', 'view_payroll_history'] },
];

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
    { id: 'team-001', name: 'Juan Pérez', email: 'juan.perez@firma.com', roleId: 'admin', status: 'Activo', companyIds: ['com-001', 'com-002', 'com-003'] },
    { id: 'team-002', name: 'Laura Gómez', email: 'laura.gomez@firma.com', roleId: 'payroll_manager', status: 'Activo', companyIds: ['com-001'] },
    { id: 'team-003', name: 'Carlos Santana', email: 'carlos.s@example.com', roleId: 'viewer', status: 'Invitación Pendiente' },
];

export const MOCK_AUDIT_LOGS: AuditLogEvent[] = [
  { id: 'log-001', timestamp: '2024-07-10T14:30:00Z', userId: 'team-001', actionType: 'LOGIN' as AuditLogActionType, description: 'Usuario Juan Pérez inició sesión.', ipAddress: '192.168.1.1' },
  { id: 'log-002', timestamp: '2024-07-10T14:35:12Z', userId: 'team-001', actionType: 'PROCESS_PAYROLL' as AuditLogActionType, description: 'Procesó nómina para CaribeTech SRL (1ra Quincena Julio).', ipAddress: '192.168.1.1' },
  { id: 'log-003', timestamp: '2024-07-09T10:05:45Z', userId: 'team-002', actionType: 'CREATE' as AuditLogActionType, description: 'Creó nuevo empleado: "Sofia Reyes".', ipAddress: '200.10.20.30' },
  { id: 'log-004', timestamp: '2024-07-09T11:20:00Z', userId: 'team-001', actionType: 'GENERATE_REPORT' as AuditLogActionType, description: 'Generó reporte IR-3 para Quisqueya Soluciones.', ipAddress: '192.168.1.1' },
];
