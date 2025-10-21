// FIX: Changed import path to be explicit, pointing to the index file.
import { Company, CompanyProfile, BankAccount } from '../types/index';

export const MOCK_COMPANIES: Company[] = [
  { 
    id: 'com-001', 
    name: 'CaribeTech SRL', 
    logoUrl: 'https://tailwindui.com/img/logos/48x48/statickit.svg',
    rnc: '130123457',
    address: 'Av. John F. Kennedy, Santo Domingo',
    phone: '809-555-1111',
    email: 'contacto@caribetech.do'
  },
  { 
    id: 'com-002', 
    name: 'Quisqueya Soluciones',
    rnc: '131987654',
    address: 'Calle El Sol, Santiago de los Caballeros',
    phone: '829-555-2222',
    email: 'info@quisqueyasoluciones.com'
  },
  { 
    id: 'com-003', 
    name: 'Constructora del Este', 
    logoUrl: 'https://tailwindui.com/img/logos/48x48/transistor.svg',
    rnc: '101555888',
    address: 'Blvd. Turístico del Este, Punta Cana',
    phone: '809-555-3333',
    email: 'admin@constructoraeste.com'
  },
];

export const MOCK_COMPANY_PROFILE: CompanyProfile = {
    name: 'Quisqueya Soluciones SRL',
    rnc: '131987654',
    address: 'Calle El Sol, Santiago de los Caballeros',
    phone: '829-555-2222',
    email: 'info@quisqueyasoluciones.com',
    website: 'www.quisqueyasoluciones.com'
};

export const MOCK_BANK_ACCOUNTS: BankAccount[] = [
    { id: 'bank-1', bankName: 'Banco Popular', accountNumber: '798...1234', accountType: 'Corriente', isPrimary: true },
    { id: 'bank-2', bankName: 'Banreservas', accountNumber: '960...5678', accountType: 'Ahorros', isPrimary: false },
];