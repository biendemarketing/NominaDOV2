
import { UpcomingPayroll, PayrollStatus, ProfessionalAlert, AlertType, ProfessionalActivity, BillingInfo } from '../types/index';

export const MOCK_UPCOMING_PAYROLLS: UpcomingPayroll[] = [
    { clientId: 'com-001', clientName: 'CaribeTech SRL', payrollType: '1ra Quincena Julio', dueDate: '2024-07-15', status: PayrollStatus.PENDING },
    { clientId: 'com-002', clientName: 'Quisqueya Soluciones', payrollType: '1ra Quincena Julio', dueDate: '2024-07-15', status: PayrollStatus.PENDING },
    { clientId: 'com-003', clientName: 'Constructora del Este', payrollType: 'Mensual Junio', dueDate: '2024-07-05', status: PayrollStatus.REVIEW },
];

export const MOCK_PROFESSIONAL_ALERTS: ProfessionalAlert[] = [
    { id: 'pa-1', type: AlertType.ALERT, text: 'El contrato de John Doe (Quisqueya Soluciones) está a 30 días de vencer.' },
    { id: 'pa-2', type: AlertType.REMINDER, text: 'Fecha límite para reporte DGT-3 de CaribeTech SRL es en 5 días.' },
];

export const MOCK_PROFESSIONAL_ACTIVITY: ProfessionalActivity[] = [
    { id: 'act-1', action: 'Procesó la nómina de 2da Quincena de Junio para CaribeTech SRL.', user: 'Laura Gómez', timestamp: 'Hace 2 horas' },
    { id: 'act-2', action: 'Añadió un nuevo empleado a Quisqueya Soluciones.', user: 'Juan Pérez', timestamp: 'Hace 5 horas' },
    { id: 'act-3', action: 'Descargó el reporte IR-3 para Constructora del Este.', user: 'Laura Gómez', timestamp: 'Ayer' },
];

export const MOCK_BILLING_INFO: BillingInfo = {
    plan: 'Profesional',
    level: 2,
    price: 500,
    billingCycle: 'mes',
    paymentMethod: {
        last4: '4242',
        expiry: '12/25'
    },
    invoices: [
        { id: 'inv-1', date: '2024-07-01', amount: 500, status: 'Pagada' },
        { id: 'inv-2', date: '2024-06-01', amount: 500, status: 'Pagada' },
        { id: 'inv-3', date: '2024-05-01', amount: 500, status: 'Pagada' },
    ]
};
