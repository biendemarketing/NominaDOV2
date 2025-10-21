import React, { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import Header from './components/Header';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Payroll from './components/Payroll';
import TaskList from './components/TaskList';
import Reports from './components/Reports';
import EmployeeProfile from './components/EmployeeProfile';
import Settings from './components/Settings';
import Contracts from './components/Contracts';
import { Payslips } from './components/Payslips';
import Liquidaciones from './components/Liquidaciones';
import Analytics from './components/Analytics';
import Calendar from './components/Calendar';
import Calculadora from './components/Calculadora';
import AddEmployeeModal from './components/AddEmployeeModal';
import TaskModal from './components/TaskModal';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import FAQ from './components/FAQ';
import PaymentDispersion from './components/PaymentDispersion';
import BottomNavBar from './components/BottomNavBar';
import ProfessionalDashboard from './components/ProfessionalDashboard';
import ManageCompanies from './components/ManageCompanies';
import ProfessionalAnalytics from './components/ProfessionalAnalytics';
import ProfessionalAccount from './components/ProfessionalAccount';
import CompanyModal from './components/CompanyModal';
import Team from './components/Team';
import { ProfessionalTeam } from './components/ProfessionalTeam';
import ProfessionalIntegrations from './components/ProfessionalIntegrations';
import ProfessionalCustomization from './components/ProfessionalCustomization';
import ProfessionalBilling from './components/ProfessionalBilling';
import AuditLog from './components/AuditLog';
import { AppView, AuthView, Employee, Contract, EmployeeDocument, LiquidacionRun, PendingLiquidation, EmployeeStatus, Task, Company, UpcomingPayroll, ProfessionalAlert, ProfessionalActivity, AuditLogEvent, HelpArticle, Notification } from './types/index';
import { MOCK_EMPLOYEES, MOCK_CONTRACTS, MOCK_DOCUMENTS, MOCK_LIQUIDACIONES, MOCK_TASKS, MOCK_PAYROLL_HISTORY, MOCK_COMPANIES, MOCK_UPCOMING_PAYROLLS, MOCK_PROFESSIONAL_ALERTS, MOCK_PROFESSIONAL_ACTIVITY, MOCK_TEAM_MEMBERS, MOCK_BILLING_INFO, MOCK_AUDIT_LOGS, MOCK_HELP_ARTICLES, MOCK_NOTIFICATIONS } from './constants/index';
import FeaturesPage from './components/FeaturesPage';
import PricingPage from './components/PricingPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import SupportPage from './components/SupportPage';
import ArticlePage from './components/ArticlePage';
import FeaturePayrollPage from './components/FeaturePayrollPage';
import FeatureEmployeesPage from './components/FeatureEmployeesPage';
import FeatureReportsPage from './components/FeatureReportsPage';
import FeatureDashboardPage from './components/FeatureDashboardPage';
import FeatureSecurityPage from './components/FeatureSecurityPage';
import FeatureContractsPage from './components/FeatureContractsPage';
import FeatureLiquidacionesPage from './components/FeatureLiquidacionesPage';
import FeatureDispersionsPage from './components/FeatureDispersionsPage';
import FeatureSupportPage from './components/FeatureSupportPage';
import DocumentsPage from './components/DocumentsPage';


export type UserType = 'single_company' | 'professional_firm';

const App: React.FC = () => {
  // --- Global State ---
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authView, setAuthView] = useState<AuthView>(AuthView.LANDING);
  const [userType, setUserType] = useState<UserType>('single_company'); // Default

  const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  
  // Data State
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [contracts, setContracts] = useState<Contract[]>(MOCK_CONTRACTS);
  const [documents, setDocuments] = useState<EmployeeDocument[]>(MOCK_DOCUMENTS);
  const [liquidaciones, setLiquidaciones] = useState<LiquidacionRun[]>(MOCK_LIQUIDACIONES);
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [auditLogs, setAuditLogs] = useState<AuditLogEvent[]>(MOCK_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  // Professional Firm State
  const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

  // Workflow & Modal State
  const [pendingLiquidation, setPendingLiquidation] = useState<PendingLiquidation | null>(null);
  const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [companyToEdit, setCompanyToEdit] = useState<Company | null>(null);

  // --- Derived State (Data filtered by selected company) ---
  const companyFilteredData = useMemo(() => {
    if (userType === 'professional_firm' && selectedCompanyId) {
      return {
        employees: employees.filter(e => e.companyId === selectedCompanyId),
        contracts: contracts.filter(c => c.companyId === selectedCompanyId),
      };
    }
    // For single company user, filter by the default first company.
    if (userType === 'single_company') {
        return {
            employees: employees.filter(e => e.companyId === 'com-001'),
            contracts: contracts.filter(c => c.companyId === 'com-001'),
        }
    }
    // For professional dashboard view, return all data for aggregate calculations
    return { employees, contracts };
  }, [userType, selectedCompanyId, employees, contracts]);

  // --- Modal Handlers ---
  const handleOpenAddEmployeeModal = () => setIsAddEmployeeModalOpen(true);
  const handleCloseAddEmployeeModal = () => setIsAddEmployeeModalOpen(false);

  const handleOpenTaskModal = (task: Task | null = null) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };
  const handleCloseTaskModal = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(false);
  };
  
  const handleOpenCompanyModal = (company: Company | null = null) => {
    setCompanyToEdit(company);
    setIsCompanyModalOpen(true);
  };
  const handleCloseCompanyModal = () => {
    setCompanyToEdit(null);
    setIsCompanyModalOpen(false);
  };

  // --- Notification Handlers ---
  const handleMarkNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n));
  };
  
  const handleDismissNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };
  
  const handleClearReadNotifications = () => {
    setNotifications(prev => prev.filter(n => !n.isRead));
  };

  const handleNotificationClick = (link: Notification['link']) => {
    if (link) {
      if (link.id) {
        setSelectedEmployeeId(link.id);
      }
      setActiveView(link.view);
    }
  };


  // --- Navigation & State Handlers ---
  const handleLogin = (selectedUserType: UserType) => {
    setUserType(selectedUserType);
    setIsAuthenticated(true);
    if (selectedUserType === 'professional_firm') {
      setActiveView(AppView.PROFESSIONAL_DASHBOARD);
    } else {
      setActiveView(AppView.DASHBOARD);
    }
  };
  
  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthView(AuthView.LANDING);
    setSelectedCompanyId(null);
  };
  
  const handleSelectCompany = (companyId: string) => {
    setSelectedCompanyId(companyId);
    setActiveView(AppView.DASHBOARD);
  };
  
  const handleReturnToFirmDashboard = () => {
    setSelectedCompanyId(null);
    setActiveView(AppView.PROFESSIONAL_DASHBOARD);
  };

  const handleSelectEmployee = (employeeId: string) => {
    setSelectedEmployeeId(employeeId);
    setActiveView(AppView.EMPLOYEE_PROFILE);
  };

  const handleBackToList = () => {
    setSelectedEmployeeId(null);
    setActiveView(AppView.EMPLOYEES);
  };

  const handleViewChange = (view: AppView) => {
    setSelectedEmployeeId(null);
    setActiveView(view);
  };

  const handleSelectArticle = (articleId: string) => {
    setSelectedArticleId(articleId);
    if (isAuthenticated) {
        setActiveView(AppView.HELP_ARTICLE);
    } else {
        setAuthView(AuthView.HELP_ARTICLE);
    }
  };

  const handleBackToHelpCenter = () => {
    setSelectedArticleId(null);
    if (isAuthenticated) {
        setActiveView(AppView.SUPPORT);
    } else {
        setAuthView(AuthView.SUPPORT);
    }
  };
  
  // --- Data Mutation Handlers ---
  const handleUpdateContract = (updatedContract: Contract, newSalary?: number) => {
    const previousContract = contracts.find(c => c.id === updatedContract.id);
    const hasBeenTerminated = 
        (updatedContract.status === 'Finalizado' || updatedContract.status === 'Terminado Anticipadamente') &&
        previousContract?.status === 'Activo';

    setContracts(prev => prev.map(c => c.id === updatedContract.id ? updatedContract : c));
    if (newSalary !== undefined) {
      setEmployees(prev => prev.map(e => e.id === updatedContract.employeeId ? { ...e, salary: newSalary } : e));
    }

    if (hasBeenTerminated) {
        const reason = updatedContract.status === 'Terminado Anticipadamente' ? 'Despido' : 'Mutuo Acuerdo';
        setPendingLiquidation({ employeeId: updatedContract.employeeId, reason });
        setActiveView(AppView.LIQUIDACIONES);
    }
  };

  const handleAddNewEmployee = (employeeData: Omit<Employee, 'id' | 'avatarUrl' | 'status' | 'companyId'>, contractData: Omit<Contract, 'id' | 'employeeId' | 'status' | 'companyId'>) => {
      const companyId = userType === 'professional_firm' && selectedCompanyId ? selectedCompanyId : 'com-001'; // Default for single user
      const newEmployeeId = `emp-${String(employees.length + 1).padStart(3, '0')}`;
      const newContractId = `con-${String(contracts.length + 1).padStart(3, '0')}`;
      
      const newEmployee: Employee = {
        ...employeeData,
        id: newEmployeeId,
        companyId,
        status: EmployeeStatus.ACTIVE,
        avatarUrl: `https://picsum.photos/id/10${employees.length + 10}/200/200`,
      };
      
      const newContract: Contract = {
          ...contractData,
          id: newContractId,
          employeeId: newEmployeeId,
          companyId,
          status: 'Activo',
      };
      
      if (newContract.isIndefinite) {
        delete newContract.endDate;
      }

      setEmployees(prev => [...prev, newEmployee]);
      setContracts(prev => [...prev, newContract]);
      handleCloseAddEmployeeModal();
  };

  const handleAddLiquidation = (liquidation: LiquidacionRun) => {
    setLiquidaciones(prev => [...prev, liquidation]);
    setEmployees(prev => prev.map(e => 
      e.id === liquidation.employee.id ? { ...e, status: EmployeeStatus.TERMINATED } : e
    ));
    setPendingLiquidation(null); // Clear pending state
  };

  const handleAddNewDocument = (docData: Omit<EmployeeDocument, 'id' | 'uploadDate'>) => {
    const newDocument: EmployeeDocument = {
      ...docData,
      id: `doc-${Date.now()}`,
      uploadDate: new Date().toISOString().split('T')[0],
    };
    setDocuments(prev => [...prev, newDocument]);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id'>) => {
    if (taskToEdit) {
      setTasks(prev => prev.map(t => t.id === taskToEdit.id ? { ...taskToEdit, ...taskData } : t));
    } else {
      const newTask: Task = { ...taskData, id: `task-${Date.now()}` };
      setTasks(prev => [...prev, newTask]);
    }
    handleCloseTaskModal();
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
    handleCloseTaskModal();
  };
  
  const handleSaveCompany = (companyData: Omit<Company, 'id'>) => {
    if (companyToEdit) {
      setCompanies(prev => prev.map(c => c.id === companyToEdit.id ? { ...companyToEdit, ...companyData } : c));
    } else {
      const newCompany: Company = { ...companyData, id: `com-${Date.now()}` };
      setCompanies(prev => [...prev, newCompany]);
    }
    handleCloseCompanyModal();
  };

  const handleDeleteCompany = (companyId: string) => {
    // A more robust confirmation is now handled in ManageCompanies component
    setCompanies(prev => prev.filter(c => c.id !== companyId));
    // Also remove associated employees, contracts, etc.
    setEmployees(prev => prev.filter(e => e.companyId !== companyId));
    setContracts(prev => prev.filter(c => c.companyId !== companyId));
  };


  // --- View Rendering ---
  const renderView = () => {
    // Professional Firm Views
    if (userType === 'professional_firm' && !selectedCompanyId) {
        switch (activeView) {
            case AppView.PROFESSIONAL_DASHBOARD:
                return <ProfessionalDashboard 
                            companies={companies} 
                            employees={employees} 
                            onSelectCompany={handleSelectCompany} 
                            upcomingPayrolls={MOCK_UPCOMING_PAYROLLS}
                            professionalAlerts={MOCK_PROFESSIONAL_ALERTS}
                            professionalActivity={MOCK_PROFESSIONAL_ACTIVITY}
                        />;
            case AppView.MANAGE_COMPANIES:
                return <ManageCompanies 
                            companies={companies} 
                            onEdit={handleOpenCompanyModal} 
                            onDelete={handleDeleteCompany} 
                            onAdd={() => handleOpenCompanyModal(null)}
                            onManage={handleSelectCompany} 
                        />;
            case AppView.PROFESSIONAL_ANALYTICS:
                return <ProfessionalAnalytics companies={companies} employees={employees} contracts={contracts} />;
            case AppView.PROFESSIONAL_TEAM:
                return <ProfessionalTeam teamMembers={MOCK_TEAM_MEMBERS} companies={companies} />;
            case AppView.PROFESSIONAL_INTEGRATIONS:
                return <ProfessionalIntegrations />;
            case AppView.PROFESSIONAL_CUSTOMIZATION:
                return <ProfessionalCustomization />;
            case AppView.PROFESSIONAL_BILLING:
                return <ProfessionalBilling billingInfo={MOCK_BILLING_INFO} />;
            case AppView.PROFESSIONAL_ACCOUNT:
                return <ProfessionalAccount />;
            default:
                return <ProfessionalDashboard 
                            companies={companies} 
                            employees={employees} 
                            onSelectCompany={handleSelectCompany}
                            upcomingPayrolls={MOCK_UPCOMING_PAYROLLS}
                            professionalAlerts={MOCK_PROFESSIONAL_ALERTS}
                            professionalActivity={MOCK_PROFESSIONAL_ACTIVITY}
                       />;
        }
    }

    // Single Company Views (for both user types, but data is filtered)
    switch (activeView) {
      case AppView.DASHBOARD:
        return <Dashboard employees={companyFilteredData.employees} contracts={companyFilteredData.contracts} setActiveView={handleViewChange}/>;
      case AppView.EMPLOYEES:
        return <EmployeeList 
          employees={companyFilteredData.employees} 
          contracts={companyFilteredData.contracts} 
          onSelectEmployee={handleSelectEmployee} 
          onOpenAddEmployeeModal={handleOpenAddEmployeeModal}
        />;
      case AppView.EMPLOYEE_PROFILE:
        return selectedEmployeeId ? (
          <EmployeeProfile 
            employeeId={selectedEmployeeId} 
            employees={employees} // Pass all employees to find the one by ID
            contracts={contracts} // Pass all contracts to find by employee ID
            onUpdateContract={handleUpdateContract}
            onBack={handleBackToList} 
            documents={documents.filter(d => d.employeeId === selectedEmployeeId)}
            onAddNewDocument={handleAddNewDocument}
            setDocuments={setDocuments}
          />
        ) : <EmployeeList employees={companyFilteredData.employees} contracts={companyFilteredData.contracts} onSelectEmployee={handleSelectEmployee} onOpenAddEmployeeModal={handleOpenAddEmployeeModal}/>;
      case AppView.PAYROLL:
        return <Payroll employees={companyFilteredData.employees} />;
      case AppView.TASKS:
        return <TaskList 
          tasks={tasks} 
          employees={companyFilteredData.employees}
          setTasks={setTasks}
          onOpenTaskModal={handleOpenTaskModal}
        />;
      case AppView.REPORTS:
        return <Reports employees={companyFilteredData.employees} />;
      case AppView.ANALYTICS:
        return <Analytics employees={companyFilteredData.employees} contracts={companyFilteredData.contracts} />;
      case AppView.CALENDAR:
        return <Calendar employees={companyFilteredData.employees} />;
      case AppView.SETTINGS:
        return <Settings />;
      case AppView.TEAM:
        return <Team teamMembers={MOCK_TEAM_MEMBERS.slice(0, 1)} />;
      case AppView.AUDIT_LOG:
        return <AuditLog logs={auditLogs} teamMembers={MOCK_TEAM_MEMBERS} employees={employees} />;
      case AppView.CONTRACTS:
        return <Contracts 
          employees={companyFilteredData.employees}
          contracts={companyFilteredData.contracts}
          onSelectEmployee={handleSelectEmployee} 
          documents={documents} 
          setDocuments={setDocuments} 
          onUpdateContract={handleUpdateContract}
        />;
      case AppView.DOCUMENTS:
        return <DocumentsPage
          documents={documents}
          employees={companyFilteredData.employees}
          onAddNewDocument={handleAddNewDocument}
          setDocuments={setDocuments}
        />;
      case AppView.PAYSLIPS:
        return <Payslips employees={companyFilteredData.employees} />;
      case AppView.LIQUIDACIONES:
        return <Liquidaciones 
          employees={companyFilteredData.employees} 
          contracts={companyFilteredData.contracts} 
          liquidaciones={liquidaciones} 
          pendingLiquidation={pendingLiquidation}
          onAddLiquidation={handleAddLiquidation}
        />;
      case AppView.CALCULADORA:
        return <Calculadora employees={companyFilteredData.employees} contracts={companyFilteredData.contracts} />;
      case AppView.PAYMENT_DISPERSION:
        return <PaymentDispersion employees={companyFilteredData.employees} payrollHistory={MOCK_PAYROLL_HISTORY} />;
      case AppView.SUPPORT:
        return <SupportPage articles={MOCK_HELP_ARTICLES} onSelectArticle={handleSelectArticle} />;
      case AppView.HELP_ARTICLE: {
        const article = MOCK_HELP_ARTICLES.find(a => a.id === selectedArticleId);
        return article ? <ArticlePage article={article} onBack={handleBackToHelpCenter} /> : <SupportPage articles={MOCK_HELP_ARTICLES} onSelectArticle={handleSelectArticle} />;
      }
      default:
        return <Dashboard employees={companyFilteredData.employees} contracts={companyFilteredData.contracts} setActiveView={handleViewChange}/>;
    }
  };

  if (!isAuthenticated) {
    switch (authView) {
        case AuthView.LOGIN:
            return <LoginPage onLogin={handleLogin} switchToRegister={() => setAuthView(AuthView.REGISTER)} switchToLanding={() => setAuthView(AuthView.LANDING)} />;
        case AuthView.REGISTER:
            return <RegisterPage onRegister={handleLogin} switchToLogin={() => setAuthView(AuthView.LOGIN)} switchToLanding={() => setAuthView(AuthView.LANDING)} />;
        case AuthView.PRIVACY:
            return <PrivacyPolicy setAuthView={setAuthView} />;
        case AuthView.TERMS:
            return <TermsOfService setAuthView={setAuthView} />;
        case AuthView.FAQ:
            return <FAQ setAuthView={setAuthView} />;
        case AuthView.FEATURES:
            return <FeaturesPage setAuthView={setAuthView} />;
        case AuthView.PRICING:
            return <PricingPage setAuthView={setAuthView} />;
        case AuthView.ABOUT:
            return <AboutPage setAuthView={setAuthView} />;
        case AuthView.CONTACT:
            return <ContactPage setAuthView={setAuthView} />;
        case AuthView.SUPPORT:
            return <SupportPage articles={MOCK_HELP_ARTICLES} onSelectArticle={handleSelectArticle} setAuthView={setAuthView} />;
        case AuthView.HELP_ARTICLE: {
            const article = MOCK_HELP_ARTICLES.find(a => a.id === selectedArticleId);
            return article ? <ArticlePage article={article} onBack={handleBackToHelpCenter} /> : <SupportPage articles={MOCK_HELP_ARTICLES} onSelectArticle={handleSelectArticle} setAuthView={setAuthView} />;
        }
        case AuthView.FEATURE_PAYROLL:
            return <FeaturePayrollPage setAuthView={setAuthView} />;
        case AuthView.FEATURE_EMPLOYEES:
            return <FeatureEmployeesPage setAuthView={setAuthView} />;
        case AuthView.FEATURE_REPORTS:
            return <FeatureReportsPage setAuthView={setAuthView} />;
        case AuthView.FEATURE_DASHBOARD:
            return <FeatureDashboardPage setAuthView={setAuthView} />;
        case AuthView.FEATURE_SECURITY:
            return <FeatureSecurityPage setAuthView={setAuthView} />;
        case AuthView.FEATURE_CONTRACTS:
            return <FeatureContractsPage setAuthView={setAuthView} />;
        case AuthView.FEATURE_LIQUIDACIONES:
            return <FeatureLiquidacionesPage setAuthView={setAuthView} />;
        case AuthView.FEATURE_DISPERSIONS:
            return <FeatureDispersionsPage setAuthView={setAuthView} />;
        case AuthView.FEATURE_SUPPORT_PAGE:
            return <FeatureSupportPage setAuthView={setAuthView} />;
        default:
            return <LandingPage setAuthView={setAuthView} />;
    }
  }
  
  const currentCompany = companies.find(c => c.id === selectedCompanyId) ?? null;

  return (
    <div className="md:flex h-screen bg-light font-sans text-gray-800">
      <Sidebar 
        activeView={activeView} 
        setActiveView={handleViewChange} 
        onLogout={handleLogout} 
        userType={userType}
        selectedCompanyId={selectedCompanyId}
        onReturnToFirmDashboard={handleReturnToFirmDashboard}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          employees={companyFilteredData.employees}
          tasks={tasks}
          articles={MOCK_HELP_ARTICLES}
          onSelectEmployee={handleSelectEmployee}
          onSelectArticle={handleSelectArticle}
          setActiveView={handleViewChange}
          onOpenAddEmployeeModal={handleOpenAddEmployeeModal}
          onOpenTaskModal={() => handleOpenTaskModal(null)}
          userType={userType}
          companies={companies}
          selectedCompany={currentCompany}
          onSelectCompany={handleSelectCompany}
          notifications={notifications}
          onMarkAsRead={handleMarkNotificationAsRead}
          onDismiss={handleDismissNotification}
          onClearRead={handleClearReadNotifications}
          onNotificationClick={handleNotificationClick}
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-light pb-20 md:pb-0">
          {renderView()}
        </main>
      </div>
      
      <BottomNavBar activeView={activeView} setActiveView={handleViewChange} onLogout={handleLogout} />

      {isAddEmployeeModalOpen && (
        <AddEmployeeModal 
          isOpen={isAddEmployeeModalOpen}
          onClose={handleCloseAddEmployeeModal}
          onSave={handleAddNewEmployee}
        />
      )}

      {isTaskModalOpen && (
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={handleCloseTaskModal}
          onSave={handleSaveTask}
          onDelete={handleDeleteTask}
          taskToEdit={taskToEdit}
          employees={companyFilteredData.employees}
        />
      )}

      {isCompanyModalOpen && (
        <CompanyModal
            isOpen={isCompanyModalOpen}
            onClose={handleCloseCompanyModal}
            onSave={handleSaveCompany}
            companyToEdit={companyToEdit}
        />
      )}
    </div>
  );
};

export default App;