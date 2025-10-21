import { Employee } from './employee';

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

export interface PayrollRun {
    id: string;
    period: string;
    processedDate: string;
    employeeCount: number;
    totalNetPay: number;
    status: 'Pagado' | 'Pendiente';
}

export interface PendingLiquidation {
    employeeId: string;
    reason: 'Despido' | 'Renuncia' | 'Mutuo Acuerdo';
}