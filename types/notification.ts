import { AppView } from './common';

export enum NotificationType {
    ALERT = 'alert',
    REMINDER = 'reminder',
    INFO = 'info',
}

export interface Notification {
    id: string;
    type: NotificationType;
    text: string;
    timestamp: string; // "Hace 5 minutos", "Ayer", etc.
    isRead: boolean;
    link?: {
      view: AppView;
      id?: string;
    }
}
