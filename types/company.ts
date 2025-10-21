export interface Company {
  id: string;
  name: string;
  logoUrl?: string;
  rnc?: string;
  address?: string;
  phone?: string;
  email?: string;
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