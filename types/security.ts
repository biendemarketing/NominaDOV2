
export type Permission = 
    // Employee Management
    | 'view_employees'
    | 'manage_employees'
    // Payroll
    | 'run_payroll'
    | 'view_payroll_history'
    // Reports
    | 'generate_reports'
    // Settings
    | 'manage_company_settings'
    | 'manage_team'
    | 'manage_billing';

export interface UserRole {
    id: string;
    name: string;
    permissions: Permission[];
    isDefault?: boolean;
}

export interface TeamMember {
    id: string;
    name: string;
    email: string;
    roleId: string;
    status: 'Activo' | 'Invitación Pendiente';
    companyIds?: string[]; // For professional firm users
}

export type AuditLogActionType = 
    | 'CREATE' 
    | 'UPDATE' 
    | 'DELETE' 
    | 'LOGIN' 
    | 'LOGOUT'
    | 'GENERATE_REPORT'
    | 'PROCESS_PAYROLL';

export interface AuditLogEvent {
    id: string;
    timestamp: string;
    userId: string; // TeamMember ID
    actionType: AuditLogActionType;
    description: string;
    ipAddress: string;
}
