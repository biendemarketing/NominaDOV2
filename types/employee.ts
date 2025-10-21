export enum EmployeeStatus {
  ACTIVE = 'Active',
  ON_LEAVE = 'On Leave',
  TERMINATED = 'Terminated',
}

export enum Nationality {
  DOMINICAN = 'Dominican',
  FOREIGN = 'Foreign',
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

export type DocumentType = 'Contrato' | 'Cédula/ID' | 'Certificación' | 'CV' | 'Título Universitario' | 'Carta de Referencia' | 'Amonestación' | 'Política Interna' | 'Otro';

export interface EmployeeDocument {
    id: string;
    employeeId?: string;
    name: string;
    type: DocumentType;
    uploadDate: string;
    fileContent: string; // base64 data URL
    fileType: string; // MIME type
    status: 'Generado' | 'Firmado' | 'Otro';
}

export interface EmployeeHistoryEvent {
  id: string;
  employeeId: string;
  date: string;
  eventType: 'Salary Change' | 'Promotion' | 'Department Change';
  description: string;
}