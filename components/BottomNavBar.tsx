import React, { useState } from 'react';
// FIX: Changed import path to be explicit, pointing to index file.
import { AppView } from '../types/index';
import { LayoutDashboard, Users, DollarSign, ClipboardCheck, MoreHorizontal, Settings, LogOut, FileClock, Receipt, FileMinus, HandCoins, PieChart, CalendarDays, Calculator, Send, FileText, X } from './icons';

interface BottomNavBarProps {
  activeView: AppView;
  setActiveView: (view: AppView) => void;
  onLogout: () => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full pt-2 pb-1 transition-all duration-200 ${
      isActive ? 'text-secondary' : 'text-gray-500 hover:text-primary'
    }`}
  >
    {icon}
    <span className={`text-xs mt-1 ${isActive ? 'font-bold' : 'font-normal'}`}>{label}</span>
  </button>
);

const MoreMenuItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <li
    className={`flex items-center p-4 rounded-lg cursor-pointer transition-all duration-200 text-lg ${
      isActive
        ? 'bg-secondary/10 text-secondary'
        : 'text-gray-700 hover:bg-gray-100'
    }`}
    onClick={onClick}
  >
    {icon}
    <span className="ml-4 font-medium">{label}</span>
  </li>
);

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, setActiveView, onLogout }) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  const mainNavItems = [
    { id: AppView.DASHBOARD, label: 'Dashboard', icon: <LayoutDashboard className="w-6 h-6" /> },
    { id: AppView.EMPLOYEES, label: 'Empleados', icon: <Users className="w-6 h-6" /> },
    { id: AppView.PAYROLL, label: 'Nómina', icon: <DollarSign className="w-6 h-6" /> },
    { id: AppView.TASKS, label: 'Tareas', icon: <ClipboardCheck className="w-6 h-6" /> },
  ];

  const moreNavItems = [
    { id: AppView.CONTRACTS, label: 'Contratos', icon: <FileClock className="w-6 h-6" /> },
    { id: AppView.LIQUIDACIONES, label: 'Liquidaciones', icon: <FileMinus className="w-6 h-6" /> },
    { id: AppView.PAYMENT_DISPERSION, label: 'Dispersión', icon: <Send className="w-6 h-6" /> },
    { id: AppView.PAYSLIPS, label: 'Recibos', icon: <Receipt className="w-6 h-6" /> },
    { id: AppView.REPORTS, label: 'Reportes', icon: <FileText className="w-6 h-6" /> },
    { id: AppView.ANALYTICS, label: 'Analítica', icon: <PieChart className="w-6 h-6" /> },
    { id: AppView.CALENDAR, label: 'Calendario', icon: <CalendarDays className="w-6 h-6" /> },
    { id: AppView.CALCULADORA, label: 'Calculadora', icon: <Calculator className="w-6 h-6" /> },
  ];
  
  const handleMoreItemClick = (view: AppView) => {
    setActiveView(view);
    setIsMoreMenuOpen(false);
  }

  return (
    <>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around shadow-lg z-40">
        {mainNavItems.map((item) => (
          <NavItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            isActive={activeView === item.id}
            onClick={() => setActiveView(item.id)}
          />
        ))}
        <NavItem
          icon={<MoreHorizontal className="w-6 h-6" />}
          label="Más"
          isActive={false}
          onClick={() => setIsMoreMenuOpen(true)}
        />
      </nav>

      {/* More Menu Modal */}
      {isMoreMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col justify-end" onClick={() => setIsMoreMenuOpen(false)}>
            <div className="bg-white rounded-t-2xl p-4 animate-slide-up" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-heading text-xl font-bold text-primary">Menú Principal</h2>
                    <button onClick={() => setIsMoreMenuOpen(false)} className="p-2 -mr-2 text-gray-500 hover:text-primary"><X className="w-6 h-6"/></button>
                </div>
                 <ul className="space-y-2">
                    {moreNavItems.map((item) => (
                        <MoreMenuItem
                        key={item.id}
                        icon={item.icon}
                        label={item.label}
                        isActive={activeView === item.id}
                        onClick={() => handleMoreItemClick(item.id)}
                        />
                    ))}
                 </ul>
                 <div className="border-t my-4"></div>
                 <ul>
                    <MoreMenuItem
                        icon={<Settings className="w-6 h-6" />}
                        label="Configuración"
                        isActive={activeView === AppView.SETTINGS}
                        onClick={() => handleMoreItemClick(AppView.SETTINGS)}
                    />
                    <MoreMenuItem
                        icon={<LogOut className="w-6 h-6" />}
                        label="Cerrar Sesión"
                        isActive={false}
                        onClick={onLogout}
                    />
                 </ul>
            </div>
             <style>{`
                @keyframes slide-up {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                .animate-slide-up { animation: slide-up 0.3s ease-out; }
            `}</style>
        </div>
      )}
    </>
  );
};

export default BottomNavBar;
