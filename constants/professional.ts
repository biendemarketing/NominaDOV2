// FIX: Changed import path to be explicit, pointing to the index file.
import { UpcomingPayroll, PayrollStatus, ProfessionalAlert, AlertType, ProfessionalActivity, TeamMember, BillingInfo } from '../types/index';

export const MOCK_UPCOMING_PAYROLLS: UpcomingPayroll[] = [
    { clientId: 'com-001', clientName: 'CaribeTech SRL', payrollType: '1ra Quincena Julio', dueDate: '2024-07-15', status: PayrollStatus.PENDING },
    { clientId: 'com-002', clientName: 'Quisqueya Soluciones', payrollType: 'Nómina Mensual Junio', dueDate: '2024-07-05', status: PayrollStatus.REVIEW },
    { clientId: 'com-003', clientName: 'Constructora del Este', payrollType: '1ra Quincena Julio', dueDate: '2024-07-15', status: PayrollStatus.PENDING },
];

export const MOCK_PROFESSIONAL_ALERTS: ProfessionalAlert[] = [
    { id: 'alert-1', type: AlertType.ALERT, text: 'Contrato de John Doe (Quisqueya Soluciones) vence en 30 días.', clientId: 'com-002' },
    { id: 'alert-2', type: AlertType.REMINDER, text: 'Procesar nómina de CaribeTech antes del día 15.', clientId: 'com-001' },
    { id: 'alert-3', type: AlertType.ERROR, text: 'Fallo al sincronizar con QuickBooks para Constructora del Este.', clientId: 'com-003' },
];

export const MOCK_PROFESSIONAL_ACTIVITY: ProfessionalActivity[] = [
    { id: 'act-1', timestamp: 'Hace 5 minutos', user: 'Ana Rodriguez', action: 'Procesó la nómina de Quisqueya Soluciones.' },
    { id: 'act-2', timestamp: 'Hace 2 horas', user: 'Juan Pérez', action: 'Añadió un nuevo empleado a CaribeTech SRL.' },
    { id: 'act-3', timestamp: 'Ayer', user: 'Ana Rodriguez', action: 'Generó el reporte DGT-3 para Constructora del Este.' },
];

export const MOCK_TEAM_MEMBERS: TeamMember[] = [
    { id: 'user-001', name: 'Ana Rodríguez', email: 'ana.r@mifirma.com', avatarUrl: 'https://picsum.photos/id/1027/200/200', role: 'Admin', status: 'Activo', assignedCompanies: [] },
    { id: 'user-002', name: 'Carlos López', email: 'carlos.l@mifirma.com', avatarUrl: 'https://picsum.photos/id/1025/200/200', role: 'Contador', status: 'Activo', assignedCompanies: ['com-001', 'com-003'] },
    { id: 'user-003', name: 'Maria Peña', email: 'maria.p@mifirma.com', avatarUrl: 'https://picsum.photos/id/1028/200/200', role: 'RRHH', status: 'Invitación Pendiente' },
];

export const MOCK_BILLING_INFO: BillingInfo = {
    plan: 'Profesional',
    level: 2,
    price: 500,
    billingCycle: 'Mensual',
    nextPaymentDate: '2024-08-01',
    paymentMethod: { type: 'Credit Card', last4: '4242', expiry: '12/26' },
    invoices: [
        { id: 'inv-003', date: '2024-07-01', amount: 500, status: 'Pagada' },
        { id: 'inv-002', date: '2024-06-01', amount: 500, status: 'Pagada' },
        { id: 'inv-001', date: '2024-05-01', amount: 500, status: 'Pagada' },
    ]
};