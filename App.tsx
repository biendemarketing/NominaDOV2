
import React, { useState, useEffect } from 'react';

// Import types
import { 
    AppView, AuthView, Employee, Contract, Task, HelpArticle, Company, 
    Notification, LiquidacionRun, PendingLiquidation, EmployeeDocument, 
    // FIX: Add missing type imports
    TeamMember, UserRole, BankAccount, Permission, CompanyProfile, 
    EmployeeStatus, Nationality, ContractStatus, DocumentType
} from './types/index';

// Import constants
import { 
    MOCK_EMPLOYEES, MOCK_CONTRACTS, MOCK_TASKS, MOCK_HELP_ARTICLES, 
    MOCK_COMPANIES, MOCK_NOTIFICATIONS, MOCK_LIQUIDACIONES, MOCK_DOCUMENTS, 
    MOCK_TEAM_MEMBERS, MOCK_USER_ROLES, MOCK_BANK_ACCOUNTS, 
    MOCK_UPCOMING_PAYROLLS, MOCK_PROFESSIONAL_ALERTS, 
    MOCK_PROFESSIONAL_ACTIVITY, MOCK_PAYROLL_HISTORY, MOCK_COMPANY_PROFILE, 
    MOCK_BILLING_INFO, MOCK_AUDIT_LOGS, PERMISSIONS_LIST 
} from './constants/index';

// Import components
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import BottomNavBar from './components/BottomNavBar';
import Dashboard from './components/Dashboard';
import EmployeeList from './components/EmployeeList';
import EmployeeProfile from './components/EmployeeProfile';
import Payroll from './components/Payroll';
import TaskList from './components/TaskList';
import AddEmployeeModal from './components/AddEmployeeModal';
import TaskModal from './components/TaskModal';
import Contracts from './components/Contracts';
import { Payslips } from './components/Payslips';
import Liquidaciones from './components/Liquidaciones';
import Reports from './components/Reports';
import Analytics from './components/Analytics';
import Calendar from './components/Calendar';
import Calculadora from './components/Calculadora';
import PaymentDispersion from './components/PaymentDispersion';
import Settings from './components/Settings';
import Team from './components/Team';
import AuditLog from './components/AuditLog';
import DocumentsPage from './components/DocumentsPage';
import SupportPage from './components/SupportPage';
import ArticlePage from './components/ArticlePage';
import InviteMemberModal from './components/InviteMemberModal';
import CompanyModal from './components/CompanyModal';
import BankAccountModal from './components/BankAccountModal';
import RoleModal from './components/RoleModal';

// Professional firm components
import ProfessionalDashboard from './components/ProfessionalDashboard';
import ManageCompanies from './components/ManageCompanies';
import ProfessionalAnalytics from './components/ProfessionalAnalytics';
import ProfessionalTeam from './components/ProfessionalTeam';
import ProfessionalAccount from './components/ProfessionalAccount';
import ProfessionalBilling from './components/ProfessionalBilling';
import ProfessionalIntegrations from './components/ProfessionalIntegrations';
import ProfessionalCustomization from './components/ProfessionalCustomization';

// Static pages
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import FAQ from './components/FAQ';
import FeaturesPage from './components/FeaturesPage';
import PricingPage from './components/PricingPage';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import FeaturePayrollPage from './components/FeaturePayrollPage';
import FeatureEmployeesPage from './components/FeatureEmployeesPage';
import FeatureReportsPage from './components/FeatureReportsPage';
import FeatureDashboardPage from './components/FeatureDashboardPage';
import FeatureSecurityPage from './components/FeatureSecurityPage';
import FeatureContractsPage from './components/FeatureContractsPage';
import FeatureLiquidacionesPage from './components/FeatureLiquidacionesPage';
import FeatureDispersionsPage from './components/FeatureDispersionsPage';
import FeatureSupportPage from './components/FeatureSupportPage';


export type UserType = 'single_company' | 'professional_firm';

const App = () => {
    // ---- AUTH & VIEW STATE ----
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authView, setAuthView] = useState<AuthView>(AuthView.LANDING);
    const [userType, setUserType] = useState<UserType>('single_company');
    const [activeView, setActiveView] = useState<AppView>(AppView.DASHBOARD);

    // ---- DATA STATE ----
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [tasks, setTasks] = useState(MOCK_TASKS);
    const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
    const [liquidaciones, setLiquidaciones] = useState(MOCK_LIQUIDACIONES);
    const [documents, setDocuments] = useState<EmployeeDocument[]>(MOCK_DOCUMENTS);
    const [teamMembers, setTeamMembers] = useState(MOCK_TEAM_MEMBERS);
    const [userRoles, setUserRoles] = useState<UserRole[]>(MOCK_USER_ROLES);
    const [bankAccounts, setBankAccounts] = useState(MOCK_BANK_ACCOUNTS);
    const [companyProfile, setCompanyProfile] = useState(MOCK_COMPANY_PROFILE);
    const [integrations, setIntegrations] = useState({ quickbooks: true, xero: false, googleCalendar: false });

    // ---- PROFESSIONAL FIRM STATE ----
    const [companies, setCompanies] = useState(MOCK_COMPANIES);
    const [selectedCompanyId, setSelectedCompanyId] = useState<string | null>(null);

    // ---- UI STATE (Modals, selections) ----
    const [isAddEmployeeModalOpen, setIsAddEmployeeModalOpen] = useState(false);
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
    const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
    const [pendingLiquidation, setPendingLiquidation] = useState<PendingLiquidation | null>(null);
    const [isInviteMemberModalOpen, setIsInviteMemberModalOpen] = useState(false);
    const [memberToEdit, setMemberToEdit] = useState<TeamMember | null>(null);
    const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
    const [companyToEdit, setCompanyToEdit] = useState<Company | null>(null);
    const [isBankAccountModalOpen, setIsBankAccountModalOpen] = useState(false);
    const [accountToEdit, setAccountToEdit] = useState<BankAccount | null>(null);
    const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
    const [roleToEdit, setRoleToEdit] = useState<UserRole | null>(null);

    // Filter data based on selected company for professional firm view
    useEffect(() => {
        if (userType === 'professional_firm' && selectedCompanyId) {
            setEmployees(MOCK_EMPLOYEES.filter(e => e.companyId === selectedCompanyId));
            setContracts(MOCK_CONTRACTS.filter(c => c.companyId === selectedCompanyId));
        } else if (userType === 'single_company') {
            // In single company mode, assign all mock data to one company
            const singleCompanyId = 'com-002';
            setEmployees(MOCK_EMPLOYEES.filter(e => e.companyId === singleCompanyId));
            setContracts(MOCK_CONTRACTS.filter(c => c.companyId === singleCompanyId));
            setCompanies(MOCK_COMPANIES.filter(c => c.id === singleCompanyId));
            setSelectedCompanyId(singleCompanyId);
        } else {
             setEmployees(MOCK_EMPLOYEES); // Show all for firm dashboard level
             setContracts(MOCK_CONTRACTS);
        }
    }, [userType, selectedCompanyId]);
    
    // ---- HANDLERS ----
    const handleLogin = (type: UserType) => {
        setUserType(type);
        setIsAuthenticated(true);
        setActiveView(type === 'professional_firm' ? AppView.PROFESSIONAL_DASHBOARD : AppView.DASHBOARD);
        if(type === 'professional_firm') setSelectedCompanyId(null);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setAuthView(AuthView.LANDING);
    };
    
    // --- Employee & Contract Handlers ---
    const handleSaveEmployee = (employeeData: Omit<Employee, 'id' | 'avatarUrl' | 'status' | 'companyId'>, contractData: Omit<Contract, 'id' | 'employeeId' | 'status' | 'companyId'>) => {
        const newEmployeeId = `emp-${String(MOCK_EMPLOYEES.length + 1).padStart(3, '0')}`;
        const newEmployee: Employee = {
            ...employeeData,
            id: newEmployeeId,
            companyId: selectedCompanyId!,
            avatarUrl: `https://picsum.photos/seed/${newEmployeeId}/200/200`,
            status: EmployeeStatus.ACTIVE,
        };
        const newContract: Contract = {
            ...contractData,
            id: `con-${String(MOCK_CONTRACTS.length + 1).padStart(3, '0')}`,
            employeeId: newEmployeeId,
            companyId: selectedCompanyId!,
            status: 'Activo',
        };
        setEmployees(prev => [...prev, newEmployee]);
        setContracts(prev => [...prev, newContract]);
        setIsAddEmployeeModalOpen(false);
    };
    
    const handleUpdateContract = (updatedContract: Contract, newSalary?: number) => {
        setContracts(prev => prev.map(c => c.id === updatedContract.id ? updatedContract : c));
        if (newSalary !== undefined) {
            setEmployees(prev => prev.map(e => e.id === updatedContract.employeeId ? { ...e, salary: newSalary } : e));
        }
    };
    
    // --- Task Handlers ---
    const handleOpenTaskModal = (task: Task | null = null) => {
        setTaskToEdit(task);
        setIsTaskModalOpen(true);
    };
    const handleSaveTask = (taskData: Omit<Task, 'id'>) => {
        if (taskToEdit) {
            setTasks(prev => prev.map(t => t.id === taskToEdit.id ? { ...t, ...taskData } : t));
        } else {
            const newTask: Task = { ...taskData, id: `task-${Date.now()}` };
            setTasks(prev => [...prev, newTask]);
        }
        setIsTaskModalOpen(false);
    };
    const handleDeleteTask = (taskId: string) => {
        setTasks(prev => prev.filter(t => t.id !== taskId));
        setIsTaskModalOpen(false);
    };
    
    // --- Document Handlers ---
    const handleAddNewDocument = (docData: Omit<EmployeeDocument, 'id' | 'uploadDate'>) => {
        const newDoc: EmployeeDocument = {
            ...docData,
            id: `doc-${Date.now()}`,
            uploadDate: new Date().toISOString().split('T')[0],
        };
        setDocuments(prev => [...prev, newDoc]);
    };
    
    // --- Liquidation Handlers ---
    const handleAddLiquidation = (liquidation: LiquidacionRun) => {
        setLiquidaciones(prev => [liquidation, ...prev]);
        // Also update employee status
        setEmployees(prev => prev.map(e => e.id === liquidation.employee.id ? {...e, status: EmployeeStatus.TERMINATED} : e));
    };

    // --- Settings & Team Handlers ---
    const handleInviteMember = (member?: TeamMember) => {
        setMemberToEdit(member || null);
        setIsInviteMemberModalOpen(true);
    };

    const handleSaveMember = (memberData: Omit<TeamMember, 'id' | 'status'>, isEditing: boolean) => {
        if (isEditing && memberToEdit) {
            setTeamMembers(prev => prev.map(m => m.id === memberToEdit.id ? { ...memberToEdit, ...memberData } : m));
        } else {
            const newMember: TeamMember = {
                ...memberData,
                id: `team-${Date.now()}`,
                status: 'Invitación Pendiente',
            };
            setTeamMembers(prev => [...prev, newMember]);
        }
        setIsInviteMemberModalOpen(false);
    };

    const handleDeleteMember = (memberId: string) => {
        setTeamMembers(prev => prev.filter(m => m.id !== memberId));
    };

    const handleSaveBankAccount = (accountData: Omit<BankAccount, 'id'>, isEditing: boolean) => {
        if (isEditing && accountToEdit) {
            setBankAccounts(prev => prev.map(acc => acc.id === accountToEdit.id ? { ...acc, ...accountData } : acc));
        } else {
            const newAccount: BankAccount = { ...accountData, id: `bank-${Date.now()}`};
            setBankAccounts(prev => [...prev, newAccount]);
        }
        setIsBankAccountModalOpen(false);
    };

    const handleDeleteBankAccount = (accountId: string) => {
        setBankAccounts(prev => prev.filter(acc => acc.id !== accountId));
    };

    const handleSaveRole = (roleData: Omit<UserRole, 'id'>, isEditing: boolean) => {
        if (isEditing && roleToEdit) {
            setUserRoles(prev => prev.map(r => r.id === roleToEdit.id ? { ...r, ...roleData } : r));
        } else {
            const newRole: UserRole = { ...roleData, id: `role-${Date.now()}`};
            setUserRoles(prev => [...prev, newRole]);
        }
        setIsRoleModalOpen(false);
    };

    const handleDeleteRole = (roleId: string) => {
        setUserRoles(prev => prev.filter(r => r.id !== roleId && r.id !== 'admin')); // Prevent deleting admin
    };
    
    // --- Professional Firm Handlers ---
    const handleSelectCompany = (companyId: string) => {
        setSelectedCompanyId(companyId);
        setActiveView(AppView.DASHBOARD);
    };
    const handleReturnToFirmDashboard = () => {
        setSelectedCompanyId(null);
        setActiveView(AppView.PROFESSIONAL_DASHBOARD);
    };
    const handleSaveCompany = (companyData: Omit<Company, 'id'>) => {
        if (companyToEdit) {
            setCompanies(prev => prev.map(c => c.id === companyToEdit.id ? { ...c, ...companyData } : c));
        } else {
            const newCompany: Company = { ...companyData, id: `com-${Date.now()}`};
            setCompanies(prev => [...prev, newCompany]);
        }
        setIsCompanyModalOpen(false);
    };
    const handleDeleteCompany = (companyId: string) => {
        setCompanies(prev => prev.filter(c => c.id !== companyId));
    };

    // --- Navigation & UI Handlers ---
    const handleSelectEmployee = (id: string) => {
        setSelectedEmployeeId(id);
        setActiveView(AppView.EMPLOYEE_PROFILE);
    };
    const handleSelectArticle = (id: string) => {
        setSelectedArticleId(id);
        setActiveView(AppView.HELP_ARTICLE);
    };

    // --- Notification Handlers ---
    const handleNotificationClick = (link?: Notification['link']) => {
        if (link) {
            if(link.view === AppView.EMPLOYEE_PROFILE && link.id) {
                handleSelectEmployee(link.id);
            } else {
                setActiveView(link.view);
            }
        }
    };

    // ---- RENDER LOGIC ----
    if (!isAuthenticated) {
        switch (authView) {
            case AuthView.LOGIN: return <LoginPage onLogin={handleLogin} switchToRegister={() => setAuthView(AuthView.REGISTER)} switchToLanding={() => setAuthView(AuthView.LANDING)} />;
            case AuthView.REGISTER: return <RegisterPage onRegister={handleLogin} switchToLogin={() => setAuthView(AuthView.LOGIN)} switchToLanding={() => setAuthView(AuthView.LANDING)} />;
            case AuthView.PRIVACY: return <PrivacyPolicy setAuthView={setAuthView} />;
            case AuthView.TERMS: return <TermsOfService setAuthView={setAuthView} />;
            case AuthView.FAQ: return <FAQ setAuthView={setAuthView} />;
            case AuthView.FEATURES: return <FeaturesPage setAuthView={setAuthView} />;
            case AuthView.PRICING: return <PricingPage setAuthView={setAuthView} />;
            case AuthView.ABOUT: return <AboutPage setAuthView={setAuthView} />;
            case AuthView.CONTACT: return <ContactPage setAuthView={setAuthView} />;
            case AuthView.SUPPORT: return <SupportPage articles={MOCK_HELP_ARTICLES} onSelectArticle={handleSelectArticle} setAuthView={setAuthView}/>
            case AuthView.FEATURE_PAYROLL: return <FeaturePayrollPage setAuthView={setAuthView} />;
            case AuthView.FEATURE_EMPLOYEES: return <FeatureEmployeesPage setAuthView={setAuthView} />;
            case AuthView.FEATURE_REPORTS: return <FeatureReportsPage setAuthView={setAuthView} />;
            case AuthView.FEATURE_DASHBOARD: return <FeatureDashboardPage setAuthView={setAuthView} />;
            case AuthView.FEATURE_SECURITY: return <FeatureSecurityPage setAuthView={setAuthView} />;
            case AuthView.FEATURE_CONTRACTS: return <FeatureContractsPage setAuthView={setAuthView} />;
            case AuthView.FEATURE_LIQUIDACIONES: return <FeatureLiquidacionesPage setAuthView={setAuthView} />;
            case AuthView.FEATURE_DISPERSIONS: return <FeatureDispersionsPage setAuthView={setAuthView} />;
            case AuthView.FEATURE_SUPPORT_PAGE: return <FeatureSupportPage setAuthView={setAuthView} />;
            default: return <LandingPage setAuthView={setAuthView} />;
        }
    }
    
    const selectedCompany = companies.find(c => c.id === selectedCompanyId) || null;

    const renderView = () => {
        switch (activeView) {
            // Shared views
            case AppView.DASHBOARD: return <Dashboard employees={employees} contracts={contracts} setActiveView={setActiveView} notifications={notifications} onNotificationClick={handleNotificationClick} tasks={tasks} />;
            case AppView.EMPLOYEES: return <EmployeeList employees={employees} contracts={contracts} onSelectEmployee={handleSelectEmployee} onOpenAddEmployeeModal={() => setIsAddEmployeeModalOpen(true)} />;
            case AppView.EMPLOYEE_PROFILE: return <EmployeeProfile employeeId={selectedEmployeeId!} employees={MOCK_EMPLOYEES} contracts={MOCK_CONTRACTS} onBack={() => setActiveView(AppView.EMPLOYEES)} onUpdateContract={handleUpdateContract} documents={documents.filter(d => d.employeeId === selectedEmployeeId)} setDocuments={setDocuments} onAddNewDocument={handleAddNewDocument}/>;
            case AppView.PAYROLL: return <Payroll employees={employees} />;
            case AppView.TASKS: return <TaskList tasks={tasks} employees={employees} setTasks={setTasks} onOpenTaskModal={handleOpenTaskModal} />;
            case AppView.CONTRACTS: return <Contracts employees={employees} contracts={contracts} onSelectEmployee={handleSelectEmployee} documents={documents} setDocuments={setDocuments} onUpdateContract={handleUpdateContract} />;
            case AppView.PAYSLIPS: return <Payslips employees={employees} />;
            case AppView.LIQUIDACIONES: return <Liquidaciones employees={employees} contracts={contracts} liquidaciones={liquidaciones} pendingLiquidation={pendingLiquidation} onAddLiquidation={handleAddLiquidation}/>;
            case AppView.REPORTS: return <Reports employees={employees} />;
            case AppView.ANALYTICS: return <Analytics employees={employees} contracts={contracts} />;
            case AppView.CALENDAR: return <Calendar employees={employees} />;
            case AppView.CALCULADORA: return <Calculadora employees={employees} contracts={contracts} />;
            case AppView.PAYMENT_DISPERSION: return <PaymentDispersion employees={employees} payrollHistory={MOCK_PAYROLL_HISTORY} />;
            case AppView.TEAM: return <Team teamMembers={teamMembers} userRoles={userRoles} onInvite={handleInviteMember} onDelete={handleDeleteMember} />;
            case AppView.AUDIT_LOG: return <AuditLog logs={MOCK_AUDIT_LOGS} teamMembers={teamMembers} employees={employees} />;
            case AppView.SETTINGS: return <Settings companyProfile={companyProfile} onUpdateCompanyProfile={setCompanyProfile} bankAccounts={bankAccounts} onAddBankAccount={(acc) => handleSaveBankAccount(acc, false)} onUpdateBankAccount={(acc) => { setAccountToEdit(acc); setIsBankAccountModalOpen(true); }} onDeleteBankAccount={handleDeleteBankAccount} userRoles={userRoles} teamMembers={teamMembers} permissions={PERMISSIONS_LIST} onAddRole={(role) => handleSaveRole(role, false)} onUpdateRole={(role) => { setRoleToEdit(role); setIsRoleModalOpen(true); }} onDeleteRole={handleDeleteRole} integrations={integrations} onToggleIntegration={(key) => setIntegrations(p => ({...p, [key]: !p[key]}))} />;
            case AppView.DOCUMENTS: return <DocumentsPage documents={documents} employees={employees} onAddNewDocument={handleAddNewDocument} setDocuments={setDocuments} />;
            case AppView.SUPPORT: return <SupportPage articles={MOCK_HELP_ARTICLES} onSelectArticle={handleSelectArticle} />;
            case AppView.HELP_ARTICLE: return <ArticlePage article={MOCK_HELP_ARTICLES.find(a => a.id === selectedArticleId)!} onBack={() => setActiveView(AppView.SUPPORT)} />;
            
            // Professional firm views
            case AppView.PROFESSIONAL_DASHBOARD: return <ProfessionalDashboard companies={companies} employees={MOCK_EMPLOYEES} upcomingPayrolls={MOCK_UPCOMING_PAYROLLS} professionalAlerts={MOCK_PROFESSIONAL_ALERTS} professionalActivity={MOCK_PROFESSIONAL_ACTIVITY} onSelectCompany={handleSelectCompany} />;
            case AppView.MANAGE_COMPANIES: return <ManageCompanies companies={companies} onAdd={() => { setCompanyToEdit(null); setIsCompanyModalOpen(true); }} onEdit={(c) => { setCompanyToEdit(c); setIsCompanyModalOpen(true); }} onDelete={handleDeleteCompany} onManage={handleSelectCompany} />;
            case AppView.PROFESSIONAL_ANALYTICS: return <ProfessionalAnalytics companies={companies} employees={MOCK_EMPLOYEES} contracts={MOCK_CONTRACTS} />;
            case AppView.PROFESSIONAL_TEAM: return <ProfessionalTeam teamMembers={teamMembers} userRoles={userRoles} onInvite={handleInviteMember} onDelete={handleDeleteMember} companies={companies} />;
            case AppView.PROFESSIONAL_ACCOUNT: return <ProfessionalAccount />;
            case AppView.PROFESSIONAL_BILLING: return <ProfessionalBilling billingInfo={MOCK_BILLING_INFO} />;
            case AppView.PROFESSIONAL_INTEGRATIONS: return <ProfessionalIntegrations />;
            case AppView.PROFESSIONAL_CUSTOMIZATION: return <ProfessionalCustomization />;

            default: return <Dashboard employees={employees} contracts={contracts} setActiveView={setActiveView} notifications={notifications} onNotificationClick={handleNotificationClick} tasks={tasks} />;
        }
    };

    return (
        <div className="flex h-screen bg-light">
            <Sidebar 
                activeView={activeView} 
                setActiveView={setActiveView} 
                onLogout={handleLogout} 
                userType={userType}
                selectedCompanyId={selectedCompanyId}
                onReturnToFirmDashboard={handleReturnToFirmDashboard}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Header 
                    employees={MOCK_EMPLOYEES}
                    tasks={tasks}
                    articles={MOCK_HELP_ARTICLES}
                    onSelectEmployee={handleSelectEmployee}
                    onSelectArticle={handleSelectArticle}
                    setActiveView={setActiveView}
                    onOpenAddEmployeeModal={() => setIsAddEmployeeModalOpen(true)}
                    onOpenTaskModal={() => handleOpenTaskModal()}
                    userType={userType}
                    companies={companies}
                    selectedCompany={selectedCompany}
                    onSelectCompany={handleSelectCompany}
                    notifications={notifications}
                    onMarkAsRead={(id) => setNotifications(p => p.map(n => n.id === id ? {...n, isRead: true} : n))}
                    onDismiss={(id) => setNotifications(p => p.filter(n => n.id !== id))}
                    onClearRead={() => setNotifications(p => p.filter(n => !n.isRead))}
                    onNotificationClick={handleNotificationClick}
                />
                <main className="flex-1 overflow-y-auto pb-20 md:pb-0">{renderView()}</main>
                <BottomNavBar activeView={activeView} setActiveView={setActiveView} onLogout={handleLogout} />
            </div>

            {/* Modals */}
            <AddEmployeeModal isOpen={isAddEmployeeModalOpen} onClose={() => setIsAddEmployeeModalOpen(false)} onSave={handleSaveEmployee} />
            <TaskModal isOpen={isTaskModalOpen} onClose={() => setIsTaskModalOpen(false)} onSave={handleSaveTask} onDelete={handleDeleteTask} taskToEdit={taskToEdit} employees={employees} />
            <InviteMemberModal isOpen={isInviteMemberModalOpen} onClose={() => setIsInviteMemberModalOpen(false)} onSave={handleSaveMember} memberToEdit={memberToEdit} userRoles={userRoles} userType={userType} companies={companies} />
            <CompanyModal isOpen={isCompanyModalOpen} onClose={() => setIsCompanyModalOpen(false)} onSave={handleSaveCompany} companyToEdit={companyToEdit} />
            <BankAccountModal isOpen={isBankAccountModalOpen} onClose={() => setIsBankAccountModalOpen(false)} onSave={(acc) => handleSaveBankAccount(acc, !!accountToEdit)} accountToEdit={accountToEdit} />
            <RoleModal isOpen={isRoleModalOpen} onClose={() => setIsRoleModalOpen(false)} onSave={(role) => handleSaveRole(role, !!roleToEdit)} roleToEdit={roleToEdit} permissionsList={PERMISSIONS_LIST} />
        </div>
    );
};

export default App;
