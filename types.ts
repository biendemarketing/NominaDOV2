export enum AppView {
  DASHBOARD = 'dashboard',
  EMPLOYEES = 'employees',
  EMPLOYEE_PROFILE = 'employee_profile',
  PAYROLL = 'payroll',
  TASKS = 'tasks',
  REPORTS = 'reports',
  SETTINGS = 'settings',
  CONTRACTS = 'contracts',
  PAYSLIPS = 'payslips',
  LIQUIDACIONES = 'liquidaciones',
  ANALYTICS = 'analytics',
  CALENDAR = 'calendar',
  CALCULADORA = 'calculadora',
  PAYMENT_DISPERSION = 'payment_dispersion',
  TEAM = 'team', // For single company
  AUDIT_LOG = 'audit_log', // New Audit Log view
  
  // Professional-level views
  PROFESSIONAL_DASHBOARD = 'professional_dashboard',
  MANAGE_COMPANIES = 'manage_companies',
  PROFESSIONAL_ANALYTICS = 'professional_analytics',
  PROFESSIONAL_TEAM = 'professional_team',
  PROFESSIONAL_INTEGRATIONS = 'professional_integrations',
  PROFESSIONAL_CUSTOMIZATION = 'professional_customization',
  PROFESSIONAL_ACCOUNT = 'professional_account',
  PROFESSIONAL_BILLING = 'professional_billing',
}

export enum AuthView {
  LANDING = 'landing',
  LOGIN = 'login',
  REGISTER = 'register',
  PRIVACY = 'privacy',
  TERMS = 'terms',
  FAQ = 'faq',
  FEATURES = 'features',
  PRICING = 'pricing',
  ABOUT = 'about',
  CONTACT = 'contact',
}

export enum EmployeeStatus {
  ACTIVE = 'Active',
  ON_LEAVE = 'On Leave',
  TERMINATED = 'Terminated',
}

export enum Nationality {
  DOMINICAN = 'Dominican',
  FOREIGN = 'Foreign',
}

export interface Company {
  id: string;
  name: string;
  logoUrl?: string;
  rnc?: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface Employee {
  id: string;
  companyId: string;
  name: string;
  avatarUrl: string;
  position: string;
  department: string;
  salary: number;
  status: EmployeeStatus;
  nationality: Nationality;
  identifier: string; // Cédula or Passport
  nss?: string; // Número de Seguridad Social (for Dominicans)
  migratoryStatus?: string; // For Foreigners
  visaExpiry?: string; // For Foreigners
  paysTSS: boolean;
  isFiscalResident: boolean;
  gender: 'Male' | 'Female';
  birthDate: string;
  bankName?: string;
  accountNumber?: string;
}

export type ContractStatus = 'Activo' | 'Finalizado' | 'Terminado Anticipadamente';

export interface Contract {
    id: string;
    employeeId: string;
    companyId: string;
    startDate: string;
    endDate?: string; // Optional for indefinite contracts
    isIndefinite: boolean;
    status: ContractStatus;
}

export interface PayrollHistoryData {
    month: string;
    totalCost: number;
    baseSalary: number;
    taxes: number;
}

export interface RegaliaResult {
  employee: Employee;
  amount: number;
}

export interface BonificacionResult {
  employee: Employee;
  amount: number;
}

export interface LiquidacionResult {
  employee: Employee;
  preaviso: number;
  cesantia: number;
  vacaciones: number;
  salario13: number;
  total: number;
}

export interface LiquidacionRun extends LiquidacionResult {
    id: string;
    processedDate: string;
    reason: 'Despido' | 'Renuncia' | 'Mutuo Acuerdo';
}

export interface PayrollNovelty {
  overtimeHours: number;
  absenceDeductions: number;
  damageDeductions: number;
}

export interface RegularPayrollResult {
  employee: Employee;
  grossPay: number;
  sfs: number;
  afp: number;
  isr: number;
  novelties: PayrollNovelty;
  totalDeductions: number;
  netPay: number;
}


export enum TaskStatus {
  TODO = 'To Do',
  IN_PROGRESS = 'In Progress',
  DONE = 'Done',
}

export enum TaskPriority {
  HIGH = 'High',
  MEDIUM = 'Medium',
  LOW = 'Low',
}

export interface Task {
  id: string;
  title: string;
  category: string;
  assigneeId: string;
  dueDate: string;
  status: TaskStatus;
  priority: TaskPriority;
}

export interface PayslipData extends RegularPayrollResult {
    period: string;
    companyName: string;
    companyRNC: string;
    payDate: string;
}

export interface PaymentHistory {
  id: string;
  employeeId: string;
  payDate: string;
  period: string;
  grossPay: number;
  netPay: number;
}

export interface EmployeeHistoryEvent {
  id: string;
  employeeId: string;
  date: string;
  eventType: 'Salary Change' | 'Promotion' | 'Department Change';
  description: string;
}

export type DocumentType = 'Contrato' | 'Cédula/ID' | 'Certificación' | 'CV' | 'Título Universitario' | 'Carta de Referencia' | 'Amonestación';

export interface EmployeeDocument {
    id: string;
    employeeId: string;
    name: string;
    type: DocumentType;
    uploadDate: string;
    fileContent: string; // base64 data URL
    fileType: string; // MIME type
    status: 'Generado' | 'Firmado' | 'Otro';
}

export interface PayrollRun {
    id: string;
    period: string;
    processedDate: string;
    employeeCount: number;
    totalNetPay: number;
    status: 'Pagado' | 'Pendiente';
}

export interface CompanyProfile {
    name: string;
    rnc: string;
    address: string;
    phone: string;
    email: string;
    website: string;
}

export interface BankAccount {
    id: string;
    bankName: string;
    accountNumber: string;
    accountType: 'Corriente' | 'Ahorros';
    isPrimary: boolean;
}

export interface UserRole {
    id: string;
    name: 'Administrador' | 'Contador' | 'RRHH';
    permissions: string[];
    userCount: number;
}

export interface PendingLiquidation {
    employeeId: string;
    reason: 'Despido' | 'Renuncia' | 'Mutuo Acuerdo';
}

export interface Holiday {
    date: string; // YYYY-MM-DD
    name: string;
}

export interface SearchResult {
  id: string;
  type: 'employee' | 'report';
  title: string;
  description: string;
}

// Professional Dashboard Types
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

// Audit Log Types
export type AuditLogActionType = 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT' | 'GENERATE_REPORT' | 'PROCESS_PAYROLL';

export interface AuditLogEvent {
    id: string;
    timestamp: string; // ISO Date String
    userId: string; // Corresponds to TeamMember ID
    actionType: AuditLogActionType;
    description: string;
    ipAddress: string;
}