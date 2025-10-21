// FIX: Changed import path to be explicit, pointing to the index file.
import { LiquidacionRun, PayrollHistoryData, PayrollRun, PaymentHistory } from '../types/index';
import { MOCK_EMPLOYEES } from './employees';

export const MOCK_LIQUIDACIONES: LiquidacionRun[] = [
    { id: 'liq-001', employee: MOCK_EMPLOYEES.find(e => e.id === 'emp-007')!, preaviso: 0, cesantia: 25000, vacaciones: 8500, salario13: 12000, total: 45500, processedDate: '2023-06-05', reason: 'Renuncia' },
];

export const MOCK_PAYROLL_HISTORY: PayrollRun[] = [
    { id: 'run-006', period: '2da Quincena Junio 2024', processedDate: '2024-06-28', employeeCount: 10, totalNetPay: 450200.00, status: 'Pagado' },
    { id: 'run-005', period: '1ra Quincena Junio 2024', processedDate: '2024-06-14', employeeCount: 10, totalNetPay: 449500.00, status: 'Pagado' },
    { id: 'run-004', period: '2da Quincena Mayo 2024', processedDate: '2024-05-30', employeeCount: 9, totalNetPay: 420800.00, status: 'Pagado' },
];

export const PAYROLL_HISTORY_DATA: PayrollHistoryData[] = [
  { month: 'Enero', totalCost: 950000, baseSalary: 800000, taxes: 150000 },
  { month: 'Febrero', totalCost: 960000, baseSalary: 810000, taxes: 150000 },
  { month: 'Marzo', totalCost: 980000, baseSalary: 825000, taxes: 155000 },
  { month: 'Abril', totalCost: 975000, baseSalary: 820000, taxes: 155000 },
  { month: 'Mayo', totalCost: 1050000, baseSalary: 880000, taxes: 170000 },
  { month: 'Junio', totalCost: 1100000, baseSalary: 920000, taxes: 180000 },
];

export const MOCK_PAYMENT_HISTORY: PaymentHistory[] = [
    { id: 'pay-001', employeeId: 'emp-001', payDate: '2024-06-28', period: '2da Quincena Junio', grossPay: 62500, netPay: 51200 },
    { id: 'pay-002', employeeId: 'emp-001', payDate: '2024-06-14', period: '1ra Quincena Junio', grossPay: 62500, netPay: 51200 },
    { id: 'pay-003', employeeId: 'emp-002', payDate: '2024-06-28', period: '2da Quincena Junio', grossPay: 47500, netPay: 40100 },
];