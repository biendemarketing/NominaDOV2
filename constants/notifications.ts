// FIX: Changed import path to be explicit, pointing to the index file.
import { Notification, NotificationType, AppView } from '../types/index';

export const MOCK_NOTIFICATIONS: Notification[] = [
    {
        id: 'notif-1',
        type: NotificationType.ALERT,
        text: 'El contrato de Maria Rodriguez vence en 28 días.',
        timestamp: 'Hace 1 hora',
        isRead: false,
        link: { view: AppView.EMPLOYEE_PROFILE, id: 'emp-002' }
    },
    {
        id: 'notif-2',
        type: NotificationType.REMINDER,
        text: 'Próximo feriado: Día de la Restauración.',
        timestamp: 'Hace 3 horas',
        isRead: false,
        link: { view: AppView.CALENDAR }
    },
    {
        id: 'notif-3',
        type: NotificationType.INFO,
        text: 'La nómina de la 2da quincena de Junio fue procesada exitosamente.',
        timestamp: 'Ayer',
        isRead: true,
        link: { view: AppView.PAYROLL }
    },
    {
        id: 'notif-4',
        type: NotificationType.ALERT,
        text: 'La visa de trabajo de Emily Smith está por vencer.',
        timestamp: 'Hace 2 días',
        isRead: false,
        link: { view: AppView.EMPLOYEE_PROFILE, id: 'emp-006' }
    }
];
