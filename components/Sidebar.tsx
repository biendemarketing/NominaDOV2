import React from 'react';
// FIX: Changed import path to be explicit, pointing to index file.
import { AppView } from '../types/index';
import { LayoutDashboard, Users, DollarSign, FileText, Settings, LogOut, ClipboardCheck, FileClock, Receipt, FileMinus, HandCoins, PieChart, CalendarDays, Calculator, Send, ArrowLeft, Briefcase, UsersCog, Plug, Palette, CreditCard, ScrollText, HelpCircle, Files } from './icons';

interface SidebarProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  onLogout: () => void;
  userType: 'single_company' | 'professional_firm';
  selectedCompanyId: string | null;
  onReturnToFirmDashboard: () => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <li
    className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ${
      isActive
        ? 'bg-secondary/10 text-secondary'
        : 'text-gray-400 hover:bg-white/5 hover:text-white'
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-4 font-medium">{label}</span>
  </li>
);

const NavHeader: React.FC<{ label: string }> = ({ label }) => (
    <h3 className="px-3 pt-4 pb-2 text-xs font-bold text-gray-500 uppercase tracking-wider">{label}</h3>
);

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onLogout, userType, selectedCompanyId, onReturnToFirmDashboard }) => {
  const singleCompanyNavItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: AppView.EMPLOYEES, label: 'Empleados', icon: <Users className="w-5 h-5" /> },
    { id: AppView.TEAM, label: 'Equipo', icon: <UsersCog className="h-5 w-auto" /> },
    { id: AppView.CONTRACTS, label: 'Contratos', icon: <FileClock className="w-5 h-5" /> },
    { id: AppView.DOCUMENTS, label: 'Documentos', icon: <Files className="h-5 w-auto" /> },
    { id: AppView.PAYROLL, label: 'Nómina', icon: <DollarSign className="w-5 h-5" /> },
    { id: AppView.LIQUIDACIONES, label: 'Liquidaciones', icon: <FileMinus className="w-5 h-5" /> },
    { id: AppView.PAYMENT_DISPERSION, label: 'Dispersión de Pagos', icon: <Send className="w-5 h-5" /> },
    { id: AppView.PAYSLIPS, label: 'Recibos de Pago', icon: <Receipt className="w-5 h-5" /> },
    { id: AppView.TASKS, label: 'Tareas', icon: <ClipboardCheck className="w-5 h-5" /> },
    { id: AppView.REPORTS, label: 'Reportes', icon: <FileText className="w-5 h-5" /> },
    { id: AppView.ANALYTICS, label: 'Analítica', icon: <PieChart className="w-5 h-5" /> },
    { id: AppView.CALENDAR, label: 'Calendario', icon: <CalendarDays className="w-5 h-5" /> },
    { id: AppView.CALCULADORA, label: 'Calculadora', icon: <Calculator className="h-5 w-auto" /> },
    { id: AppView.AUDIT_LOG, label: 'Auditoría', icon: <ScrollText className="h-5 w-auto" /> },
  ];
  
  const professionalClientNav = [
    { id: AppView.PROFESSIONAL_DASHBOARD, label: 'Dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { id: AppView.MANAGE_COMPANIES, label: 'Gestionar Empresas', icon: <Briefcase className="w-5 h-5" /> },
    { id: AppView.PROFESSIONAL_ANALYTICS, label: 'Analítica', icon: <PieChart className="w-5 h-5" /> },
  ];

  const professionalAccountNav = [
      { id: AppView.PROFESSIONAL_TEAM, label: 'Equipo', icon: <UsersCog className="h-5 w-auto" /> },
      { id: AppView.PROFESSIONAL_INTEGRATIONS, label: 'Integraciones', icon: <Plug className="w-5 h-5" /> },
      { id: AppView.PROFESSIONAL_CUSTOMIZATION, label: 'Personalización', icon: <Palette className="w-5 h-5" /> },
      { id: AppView.PROFESSIONAL_ACCOUNT, label: 'Cuenta', icon: <Settings className="w-5 h-5" /> },
      { id: AppView.PROFESSIONAL_BILLING, label: 'Facturación y Plan', icon: <CreditCard className="w-5 h-5" /> },
  ];

  const isProfessionalLevelView = userType === 'professional_firm' && !selectedCompanyId;

  const renderNav = () => {
    if (userType === 'single_company') {
      return singleCompanyNavItems.map(item => (
        <NavItem key={item.id} {...item} isActive={activeView === item.id} onClick={() => setActiveView(item.id)} />
      ));
    }
    
    if (userType === 'professional_firm') {
      if (selectedCompanyId) { // Viewing a specific company
        return singleCompanyNavItems.map(item => (
          <NavItem key={item.id} {...item} isActive={activeView === item.id} onClick={() => setActiveView(item.id)} />
        ));
      } else { // Viewing the professional dashboard
        return (
          <>
            <NavHeader label="Gestión de Empresas" />
            {professionalClientNav.map(item => (
              <NavItem key={item.id} {...item} isActive={activeView === item.id} onClick={() => setActiveView(item.id)} />
            ))}
            <NavHeader label="Gestión de la Cuenta" />
            {professionalAccountNav.map(item => (
              <NavItem key={item.id} {...item} isActive={activeView === item.id} onClick={() => setActiveView(item.id)} />
            ))}
          </>
        );
      }
    }
    return null;
  };

  return (
    <aside className="w-64 bg-primary text-white flex-col p-4 hidden md:flex">
      <div className="flex items-center mb-10 p-3">
        <HandCoins className="w-8 h-8 text-secondary" />
        <h1 className="text-2xl font-heading font-bold ml-2">Nomina<span className="text-secondary">DO</span></h1>
      </div>
      
      {userType === 'professional_firm' && selectedCompanyId && (
        <div className="mb-4">
            <button
                onClick={onReturnToFirmDashboard}
                className="w-full flex items-center p-3 rounded-lg bg-secondary/10 text-secondary hover:bg-secondary/20 transition-all"
            >
                <ArrowLeft className="w-5 h-5" />
                <span className="ml-4 font-bold">Volver al Dashboard</span>
            </button>
        </div>
      )}

      <nav className="flex-1">
        <ul>
          {renderNav()}
        </ul>
      </nav>
      <div>
        <ul>
            {!isProfessionalLevelView && (
              <>
                <NavItem
                  icon={<Settings className="w-5 h-5" />}
                  label="Configuración"
                  isActive={activeView === AppView.SETTINGS}
                  onClick={() => setActiveView(AppView.SETTINGS)}
                />
                <NavItem
                  icon={<HelpCircle className="w-5 h-5" />}
                  label="Soporte"
                  isActive={activeView === AppView.SUPPORT || activeView === AppView.HELP_ARTICLE}
                  onClick={() => setActiveView(AppView.SUPPORT)}
                />
              </>
            )}
           <NavItem
            icon={<LogOut className="w-5 h-5" />}
            label="Cerrar Sesión"
            isActive={false}
            onClick={onLogout}
          />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;