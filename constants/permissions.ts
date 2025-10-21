
import { Permission } from '../types/index';

export const PERMISSIONS_LIST: { id: Permission; label: string; description: string; }[] = [
    { id: 'view_employees', label: 'Ver Empleados', description: 'Permite ver la lista de empleados y sus perfiles.' },
    { id: 'manage_employees', label: 'Gestionar Empleados', description: 'Permite crear, editar y eliminar empleados.' },
    { id: 'run_payroll', label: 'Correr Nómina', description: 'Permite procesar nóminas regulares y especiales.' },
    { id: 'view_payroll_history', label: 'Ver Historial de Nómina', description: 'Permite ver y descargar nóminas pasadas.' },
    { id: 'generate_reports', label: 'Generar Reportes', description: 'Permite generar reportes para TSS, DGII y MT.' },
    { id: 'manage_company_settings', label: 'Gestionar Ajustes', description: 'Permite modificar la configuración de la empresa.' },
    { id: 'manage_team', label: 'Gestionar Equipo', description: 'Permite invitar, editar y eliminar miembros del equipo.' },
    { id: 'manage_billing', label: 'Gestionar Facturación', description: 'Permite ver y modificar el plan y método de pago.' },
];
