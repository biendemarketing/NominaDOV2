export enum PayrollStatus {
  PENDING = 'Por Procesar',
  REVIEW = 'En Revisión',
  APPROVED = 'Aprobada',
}

export interface UpcomingPayroll {
  clientId: string;
  clientName: string;
  payrollType: string;
  dueDate: string;
  status: PayrollStatus;
}

export enum AlertType {
  ALERT,
  REMINDER,
  ERROR,
  INFO,
}

export interface ProfessionalAlert {
  id: string;
  type: AlertType;
  text: string;
  clientId: string;
}

export interface ProfessionalActivity {
  id: string;
  timestamp: string;
  user: string;
  action: string;
}

export type TeamMemberRole = 'Admin' | 'Contador' | 'RRHH';

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: TeamMemberRole;
  status: 'Activo' | 'Invitación Pendiente';
  assignedCompanies?: string[]; // For Professional accounts
}

export interface BillingInfo {
  plan: string;
  level: number;
  price: number;
  billingCycle: 'Mensual' | 'Anual';
  nextPaymentDate: string;
  paymentMethod: {
    type: 'Credit Card';
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