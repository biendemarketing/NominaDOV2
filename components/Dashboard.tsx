import React, { useMemo } from 'react';
import Card from './Card';
import { Calendar, Users, DollarSign, TrendingUp, Megaphone, FileClock, History, Cake, ClipboardCheck, AlertTriangle, Clock, Info } from './icons';
import { MOCK_PAYROLL_HISTORY, PAYROLL_HISTORY_DATA } from '../constants/index';
import PayrollChart from './PayrollChart';
import { Employee, EmployeeStatus, Contract, AppView, Notification, NotificationType, Task, TaskStatus } from '../types/index';

interface DashboardProps {
    employees: Employee[];
    contracts: Contract[];
    setActiveView: (view: AppView) => void;
    notifications: Notification[];
    onNotificationClick: (link?: Notification['link']) => void;
    tasks: Task[];
}

const StatCard: React.FC<{ icon: React.ReactNode; title: string; value: string; footer: string }> = ({ icon, title, value, footer }) => (
  <Card>
    <div className="flex items-center">
      <div className="p-3 bg-secondary/10 rounded-lg">
        {icon}
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-primary">{value}</p>
      </div>
    </div>
    <p className="text-xs text-gray-400 mt-4">{footer}</p>
  </Card>
);

const getNotificationIcon = (type: NotificationType) => {
    switch(type) {
        case NotificationType.ALERT: return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
        case NotificationType.REMINDER: return <Clock className="w-5 h-5 text-blue-500" />;
        case NotificationType.INFO: return <Info className="w-5 h-5 text-gray-500" />;
        default: return <Info className="w-5 h-5 text-gray-500" />;
    }
};

const Dashboard: React.FC<DashboardProps> = ({ employees, contracts, setActiveView, notifications, onNotificationClick, tasks }) => {
  const activeEmployees = employees.filter(e => e.status === EmployeeStatus.ACTIVE);
  const totalMonthlyCost = activeEmployees.reduce((acc, e) => acc + e.salary, 0);
  const recentPayrolls = MOCK_PAYROLL_HISTORY.slice(0, 3);
  const formatCompact = (amount: number) => `DOP ${new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(amount)}`;
  const formatCurrency = (amount: number) => new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(amount);

  const upcomingBirthdays = useMemo(() => {
    const now = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(now.getDate() + 30);
    
    return employees.filter(e => {
        const birthDate = new Date(e.birthDate + 'T00:00:00');
        const birthdayThisYear = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
        return birthdayThisYear >= now && birthdayThisYear <= thirtyDaysFromNow;
    });
  }, [employees]);
  const nextBirthdayEmployee = upcomingBirthdays.sort((a,b) => new Date(a.birthDate).getTime() - new Date(b.birthDate).getTime())[0];

  const pendingTasks = useMemo(() => {
    return tasks.filter(t => t.status !== TaskStatus.DONE);
  }, [tasks]);
  const highPriorityTasks = pendingTasks.filter(t => t.priority === 'High').length;

  const unreadNotifications = useMemo(() => notifications.filter(n => !n.isRead), [notifications]);

  return (
    <div className="p-8">
      <h1 className="font-heading text-3xl font-bold text-primary">Dashboard</h1>
      <p className="text-gray-500 mt-1">Bienvenido, aquí tienes un resumen de tu nómina.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <StatCard 
            icon={<Calendar className="w-6 h-6 text-secondary" />} 
            title="Próxima Nómina"
            value="15 Jul, 2024"
            footer={`Estimado ${formatCompact(totalMonthlyCost / 2)}`}
        />
        <StatCard 
            icon={<Users className="w-6 h-6 text-secondary" />} 
            title="Empleados Activos"
            value={activeEmployees.length.toString()}
            footer={`${employees.length} empleados en total`}
        />
         <StatCard 
            icon={<DollarSign className="w-6 h-6 text-secondary" />} 
            title="Costo Laboral Mensual"
            value={formatCompact(totalMonthlyCost)}
            footer="Suma de salarios activos"
        />
        <StatCard 
            icon={<TrendingUp className="w-6 h-6 text-secondary" />} 
            title="Tasa de Rotación"
            value={`${((employees.filter(e => e.status === 'Terminated').length / employees.length) * 100).toFixed(1)}%`}
            footer="Anualizada (simulada)"
        />
         <StatCard 
            icon={<Cake className="w-6 h-6 text-secondary" />} 
            title="Próximos Cumpleaños"
            value={upcomingBirthdays.length.toString()}
            footer={nextBirthdayEmployee ? `El próximo es ${nextBirthdayEmployee.name.split(' ')[0]}` : 'Ninguno en los próximos 30 días'}
        />
        <StatCard 
            icon={<ClipboardCheck className="w-6 h-6 text-secondary" />} 
            title="Tareas Pendientes"
            value={pendingTasks.length.toString()}
            footer={`${highPriorityTasks} de alta prioridad`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2">
            <Card>
                <h2 className="text-lg font-bold font-heading text-primary mb-1">Histórico de Costo de Nómina</h2>
                <p className="text-sm text-gray-500 mb-4">Últimos 6 meses</p>
                <PayrollChart data={PAYROLL_HISTORY_DATA} />
            </Card>
        </div>
        <div className="space-y-6">
            <Card>
                <div className="flex items-center mb-4">
                    <Megaphone className="w-6 h-6 text-accent" />
                    <h2 className="text-lg font-bold font-heading text-primary ml-3">Alertas y Notificaciones</h2>
                </div>
                <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                    {unreadNotifications.length > 0 ? unreadNotifications.map(notification => (
                         <button 
                            key={notification.id} 
                            onClick={() => onNotificationClick(notification.link)}
                            className="w-full flex items-start p-3 bg-light rounded-lg text-left hover:bg-secondary/10 transition-colors"
                         >
                            <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                            <p className="text-sm text-gray-700 ml-3">{notification.text}</p>
                        </button>
                    )) : <p className="text-sm text-gray-400 text-center py-8">No hay alertas nuevas.</p>}
                </div>
            </Card>
             <Card>
                <div className="flex items-center justify-between mb-4">
                     <div className="flex items-center">
                        <History className="w-6 h-6 text-accent" />
                        <h2 className="text-lg font-bold font-heading text-primary ml-3">Nóminas Recientes</h2>
                     </div>
                     <button onClick={() => setActiveView(AppView.PAYROLL)} className="text-sm font-semibold text-secondary hover:underline">Ver todo</button>
                </div>
                <div className="space-y-3">
                    {recentPayrolls.map(run => (
                         <div key={run.id} className="flex items-center justify-between p-3 bg-light rounded-lg">
                            <div>
                                <p className="font-semibold text-sm text-primary">{run.period}</p>
                                <p className="text-xs text-gray-500">{run.employeeCount} empleados &middot; {new Date(run.processedDate).toLocaleDateString('es-DO')}</p>
                            </div>
                            <p className="font-bold text-sm text-primary">{formatCurrency(run.totalNetPay)}</p>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;