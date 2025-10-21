import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, Bell, ChevronDown, Plus, Users, FileText, UserPlus, ClipboardCheck, ArrowLeftRight, Clock, AlertTriangle, Info, X, LogOut, Settings as SettingsIcon, UserCog, HelpCircle } from './icons';
import { Employee, SearchResult, AppView, Company, Notification, NotificationType, Task, HelpArticle } from '../types/index';
import CompanyAvatar from './CompanyAvatar';

const reportTypes = [
  { id: 'TSS', title: 'Autodeterminación (SUIR+)', description: 'Reporte para la TSS' },
  { id: 'DGII', title: 'Retenciones Asalariados (IR-3)', description: 'Reporte para la DGII' },
  { id: 'DGT3', title: 'Planilla Personal Fijo (DGT-3)', description: 'Reporte para Min. de Trabajo' },
  { id: 'DGT4', title: 'Cambios en Personal (DGT-4)', description: 'Reporte para Min. de Trabajo' },
];

const getNotificationIcon = (type: NotificationType) => {
    switch(type) {
        case NotificationType.ALERT: return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
        case NotificationType.REMINDER: return <Clock className="w-5 h-5 text-blue-500" />;
        case NotificationType.INFO: return <Info className="w-5 h-5 text-gray-500" />;
        default: return <Info className="w-5 h-5 text-gray-500" />;
    }
};

interface HeaderProps {
    employees: Employee[];
    tasks: Task[];
    articles: HelpArticle[];
    onSelectEmployee: (employeeId: string) => void;
    onSelectArticle: (articleId: string) => void;
    setActiveView: (view: AppView) => void;
    onOpenAddEmployeeModal: () => void;
    onOpenTaskModal: () => void;
    userType: 'single_company' | 'professional_firm';
    companies: Company[];
    selectedCompany: Company | null;
    onSelectCompany: (companyId: string) => void;
    notifications: Notification[];
    onMarkAsRead: (id: string) => void;
    onDismiss: (id: string) => void;
    onClearRead: () => void;
    onNotificationClick: (link?: Notification['link']) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  employees, 
  tasks,
  articles,
  onSelectEmployee, 
  onSelectArticle,
  setActiveView, 
  onOpenAddEmployeeModal, 
  onOpenTaskModal,
  userType,
  companies,
  selectedCompany,
  onSelectCompany,
  notifications,
  onMarkAsRead,
  onDismiss,
  onClearRead,
  onNotificationClick
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isCompanySwitcherOpen, setIsCompanySwitcherOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const addMenuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const companySwitcherRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const unreadCount = useMemo(() => notifications.filter(n => !n.isRead).length, [notifications]);

  const searchResults = useMemo<SearchResult[]>(() => {
    if (searchTerm.length < 2) return [];
    
    const lowercasedTerm = searchTerm.toLowerCase();

    const employeeResults = employees
      .filter(e => e.name.toLowerCase().includes(lowercasedTerm) || e.identifier.includes(lowercasedTerm))
      .map(e => ({
        id: e.id,
        type: 'employee' as 'employee',
        title: e.name,
        description: e.position,
      }));

    const reportResults = reportTypes
      .filter(r => r.title.toLowerCase().includes(lowercasedTerm) || r.id.toLowerCase().includes(lowercasedTerm))
      .map(r => ({
        id: r.id,
        type: 'report' as 'report',
        title: r.title,
        description: r.description,
      }));

    const taskResults = tasks
      .filter(t => t.title.toLowerCase().includes(lowercasedTerm))
      .map(t => ({
        id: t.id,
        type: 'task' as 'task',
        title: t.title,
        description: `Tarea - Vence: ${new Date(t.dueDate + 'T00:00:00').toLocaleDateString('es-DO')}`,
      }));

    const articleResults = articles
      .filter(a => a.title.toLowerCase().includes(lowercasedTerm) || a.tags.some(tag => tag.toLowerCase().includes(lowercasedTerm)))
      .map(a => ({
        id: a.id,
        type: 'article' as 'article',
        title: a.title,
        description: `Artículo de Ayuda - Categoría: ${a.category}`,
      }));

    return [...employeeResults, ...taskResults, ...reportResults, ...articleResults];
  }, [searchTerm, employees, tasks, articles]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) setIsAddMenuOpen(false);
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) setSearchTerm('');
      if (companySwitcherRef.current && !companySwitcherRef.current.contains(event.target as Node)) setIsCompanySwitcherOpen(false);
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) setIsNotificationsOpen(false);
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) setIsProfileMenuOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectResult = (result: SearchResult) => {
    switch (result.type) {
        case 'employee':
            onSelectEmployee(result.id);
            break;
        case 'report':
            setActiveView(AppView.REPORTS);
            break;
        case 'task':
            setActiveView(AppView.TASKS);
            break;
        case 'article':
            onSelectArticle(result.id);
            break;
    }
    setSearchTerm('');
  };

  const getResultIcon = (type: SearchResult['type']) => {
    switch(type) {
        case 'employee': return <Users className="w-5 h-5 text-secondary" />;
        case 'report': return <FileText className="w-5 h-5 text-secondary" />;
        case 'task': return <ClipboardCheck className="w-5 h-5 text-secondary" />;
        case 'article': return <HelpCircle className="w-5 h-5 text-secondary" />;
        default: return null;
    }
  };

  const handleCompanyChange = (companyId: string) => {
    onSelectCompany(companyId);
    setIsCompanySwitcherOpen(false);
  }

  const handleNotificationItemClick = (notification: Notification) => {
    if (!notification.isRead) {
        onMarkAsRead(notification.id);
    }
    if (notification.link) {
        onNotificationClick(notification.link);
    }
    setIsNotificationsOpen(false);
  };
  
  const handleMenuClick = (view: AppView) => {
    setActiveView(view);
    setIsProfileMenuOpen(false);
  };
  
  const handleLogout = () => {
    // onLogout is defined in App.tsx and passed as a prop
    // This assumes onLogout handles all necessary state changes
    setIsProfileMenuOpen(false);
  };

  const isFirmDashboardView = userType === 'professional_firm' && !selectedCompany;

  return (
    <header className="bg-white h-20 flex items-center justify-between px-4 sm:px-8 border-b border-gray-200 z-30 relative">
      <div className="flex items-center flex-1 min-w-0">
        {isFirmDashboardView ? (
          <h2 className="font-heading text-xl font-bold text-primary">Dashboard Profesional</h2>
        ) : userType === 'professional_firm' && selectedCompany ? (
            <div className="relative" ref={companySwitcherRef}>
                <button onClick={() => setIsCompanySwitcherOpen(prev => !prev)} className="flex items-center p-2 rounded-lg hover:bg-light transition-colors">
                    <CompanyAvatar company={selectedCompany} size="large" />
                    <h2 className="font-heading text-xl font-bold text-primary mx-3">{selectedCompany.name}</h2>
                    <ArrowLeftRight className="w-4 h-4 text-gray-400" />
                </button>
                {isCompanySwitcherOpen && (
                    <div className="absolute top-full mt-2 w-72 bg-white border rounded-lg shadow-xl overflow-hidden py-1">
                        {companies.map(company => (
                             <button 
                                key={company.id}
                                onClick={() => handleCompanyChange(company.id)} 
                                className={`w-full flex items-center px-4 py-2 text-sm text-left ${company.id === selectedCompany.id ? 'font-bold text-secondary bg-light' : 'text-gray-700 hover:bg-light'}`}
                              >
                                {company.name}
                             </button>
                        ))}
                    </div>
                )}
            </div>
        ) : (
            <div className="relative w-full max-w-xs" ref={searchRef}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar..."
                className="pl-10 pr-4 py-2 w-full bg-light rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition sm:w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full mt-2 w-full bg-white border rounded-lg shadow-xl overflow-hidden">
                  <ul>
                    {searchResults.map(result => (
                      <li key={`${result.type}-${result.id}`} onClick={() => handleSelectResult(result)} className="flex items-center px-4 py-3 hover:bg-light cursor-pointer">
                        <div className="p-2 bg-secondary/10 rounded-md mr-3">
                          {getResultIcon(result.type)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-primary">{result.title}</p>
                          <p className="text-xs text-gray-500">{result.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
        )}
      </div>
      <div className="flex items-center space-x-2 sm:space-x-6">
        {!isFirmDashboardView && (
            <div className="relative" ref={addMenuRef}>
                <button 
                    onClick={() => setIsAddMenuOpen(prev => !prev)}
                    className="p-2 bg-secondary text-white rounded-full hover:bg-secondary/90 transition-all"
                >
                  <Plus className="w-5 h-5" />
                </button>
                {isAddMenuOpen && (
                     <div className="absolute top-full right-0 mt-2 w-48 bg-white border rounded-lg shadow-xl overflow-hidden py-1">
                         <button onClick={() => { onOpenAddEmployeeModal(); setIsAddMenuOpen(false); }} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-light">
                            <UserPlus className="w-4 h-4 mr-3 text-gray-500"/> Añadir Empleado
                         </button>
                         <button onClick={() => { onOpenTaskModal(); setIsAddMenuOpen(false); }} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-light">
                            <ClipboardCheck className="w-4 h-4 mr-3 text-gray-500"/> Crear Tarea
                         </button>
                     </div>
                )}
            </div>
        )}
        <div className="relative" ref={notificationsRef}>
            <button onClick={() => setIsNotificationsOpen(prev => !prev)} className="relative text-gray-500 hover:text-primary transition">
              <Bell className="w-6 h-6" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent text-white text-xs rounded-full flex items-center justify-center">{unreadCount}</span>
              )}
            </button>
            {isNotificationsOpen && (
                <div className="absolute top-full right-0 mt-3 w-80 bg-white border rounded-lg shadow-xl overflow-hidden">
                    <div className="flex justify-between items-center p-3 border-b">
                        <h4 className="font-bold text-primary">Notificaciones</h4>
                        <button onClick={onClearRead} className="text-xs text-secondary hover:underline font-semibold">Limpiar leídas</button>
                    </div>
                    {notifications.length > 0 ? (
                        <ul className="max-h-80 overflow-y-auto">
                           {notifications.map(n => (
                            <li key={n.id} className={`flex items-start p-3 transition-colors ${!n.isRead ? 'bg-light' : 'bg-white'}`}>
                                <button onClick={() => handleNotificationItemClick(n)} className="flex-1 flex items-start text-left group">
                                    <div className="mr-3 mt-1">{getNotificationIcon(n.type)}</div>
                                    <div className="flex-1">
                                        <p className="text-sm text-gray-700 group-hover:text-primary">{n.text}</p>
                                        <p className="text-xs text-gray-400 mt-1">{n.timestamp}</p>
                                    </div>
                                </button>
                                <div className="flex items-center ml-2">
                                     {!n.isRead && (
                                        <button onClick={() => onMarkAsRead(n.id)} title="Marcar como leída" className="w-5 h-5 flex items-center justify-center">
                                            <span className="w-2 h-2 bg-secondary rounded-full"></span>
                                        </button>
                                     )}
                                     <button onClick={() => onDismiss(n.id)} title="Descartar" className="p-1 text-gray-400 hover:text-red-500">
                                         <X className="w-4 h-4" />
                                     </button>
                                </div>
                            </li>
                           ))}
                        </ul>
                    ) : (
                        <p className="text-center text-sm text-gray-500 py-8">No hay notificaciones.</p>
                    )}
                </div>
            )}
        </div>
        <div className="relative" ref={profileMenuRef}>
            <button onClick={() => setIsProfileMenuOpen(prev => !prev)} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-light transition-colors">
                <img
                    src="https://picsum.photos/id/1005/40/40"
                    alt="User Avatar"
                    className="w-10 h-10 rounded-full"
                />
                <div className="hidden sm:block text-left">
                    <p className="font-semibold text-sm text-primary">Juan Pérez</p>
                    <p className="text-xs text-gray-500">{userType === 'professional_firm' ? 'Cuenta Profesional' : 'Cuenta Individual'}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 hidden sm:block transition-transform duration-200 ${isProfileMenuOpen ? 'rotate-180' : ''}`} />
            </button>
            {isProfileMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white border rounded-lg shadow-xl overflow-hidden py-1 z-40">
                    {userType === 'professional_firm' && !selectedCompany && (
                        <button onClick={() => handleMenuClick(AppView.PROFESSIONAL_ACCOUNT)} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-light">
                            <UserCog className="w-4 h-4 mr-3 text-gray-500"/> Cuenta Profesional
                        </button>
                    )}
                    {(userType === 'single_company' || (userType === 'professional_firm' && selectedCompany)) && (
                        <button onClick={() => handleMenuClick(AppView.SETTINGS)} className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-light">
                           <SettingsIcon className="w-4 h-4 mr-3 text-gray-500"/> Configuración
                       </button>
                    )}
                    <div className="border-t my-1"></div>
                    <button onClick={handleLogout} className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                        <LogOut className="w-4 h-4 mr-3"/> Cerrar Sesión
                    </button>
                </div>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;