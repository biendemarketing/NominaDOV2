export interface UserRole {
    id: string;
    name: 'Administrador' | 'Contador' | 'RRHH';
    permissions: string[];
    userCount: number;
}

export type AuditLogActionType = 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'GENERATE_REPORT' | 'PROCESS_PAYROLL';

export interface AuditLogEvent {
    id: string;
    timestamp: string; // ISO Date String
    userId: string; // Corresponds to TeamMember ID
    actionType: AuditLogActionType;
    description: string;
    ipAddress: string;
}