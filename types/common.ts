export enum AppView {
  DASHBOARD = 'dashboard',
  EMPLOYEES = 'employees',
  EMPLOYEE_PROFILE = 'employee_profile',
  PAYROLL = 'payroll',
  TASKS = 'tasks',
  REPORTS = 'reports',
  SETTINGS = 'settings',
  CONTRACTS = 'contracts',
  PAYSLIPS = 'payslips',
  LIQUIDACIONES = 'liquidaciones',
  ANALYTICS = 'analytics',
  CALENDAR = 'calendar',
  CALCULADORA = 'calculadora',
  PAYMENT_DISPERSION = 'payment_dispersion',
  TEAM = 'team', // For single company
  AUDIT_LOG = 'audit_log', // New Audit Log view
  SUPPORT = 'support',
  HELP_ARTICLE = 'help_article',
  DOCUMENTS = 'documents',
  
  // Professional-level views
  PROFESSIONAL_DASHBOARD = 'professional_dashboard',
  MANAGE_COMPANIES = 'manage_companies',
  PROFESSIONAL_ANALYTICS = 'professional_analytics',
  PROFESSIONAL_TEAM = 'professional_team',
  PROFESSIONAL_INTEGRATIONS = 'professional_integrations',
  PROFESSIONAL_CUSTOMIZATION = 'professional_customization',
  PROFESSIONAL_ACCOUNT = 'professional_account',
  PROFESSIONAL_BILLING = 'professional_billing',
}

export enum AuthView {
  LANDING = 'landing',
  LOGIN = 'login',
  REGISTER = 'register',
  PRIVACY = 'privacy',
  TERMS = 'terms',
  FAQ = 'faq',
  FEATURES = 'features',
  PRICING = 'pricing',
  ABOUT = 'about',
  CONTACT = 'contact',
  SUPPORT = 'support',
  HELP_ARTICLE = 'help_article',
  FEATURE_PAYROLL = 'feature_payroll',
  FEATURE_EMPLOYEES = 'feature_employees',
  FEATURE_REPORTS = 'feature_reports',
  FEATURE_DASHBOARD = 'feature_dashboard',
  FEATURE_SECURITY = 'feature_security',
  FEATURE_CONTRACTS = 'feature_contracts',
  FEATURE_LIQUIDACIONES = 'feature_liquidaciones',
  FEATURE_DISPERSIONS = 'feature_dispersions',
  FEATURE_SUPPORT_PAGE = 'feature_support_page',
}

export interface Holiday {
    date: string; // YYYY-MM-DD
    name: string;
}

export interface SearchResult {
  id: string;
  type: 'employee' | 'report' | 'task' | 'article';
  title: string;
  description: string;
}