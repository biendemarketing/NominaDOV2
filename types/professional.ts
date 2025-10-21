
export enum PayrollStatus {
    PENDING = 'Pending',
    REVIEW = 'Review',
    APPROVED = 'Approved',
}

export interface UpcomingPayroll {
    clientId: string;
    clientName: string;
    payrollType: string;
    dueDate: string;
    status: PayrollStatus;
}

export enum AlertType {
    ERROR = 'error',
    ALERT = 'alert',
    REMINDER = 'reminder',
    INFO = 'info',
}

export interface ProfessionalAlert {
    id: string;
    type: AlertType;
    text: string;
}

export interface ProfessionalActivity {
    id: string;
    action: string;
    user: string;
    timestamp: string;
}

export interface BillingInfo {
    plan: string;
    level: number;
    price: number;
    billingCycle: 'mes' | 'año';
    paymentMethod: {
        last4: string;
        expiry: string;
    };
    invoices: {
        id: string;
        date: string;
        amount: number;
        status: 'Pagada' | 'Pendiente';
    }[];
}
