import React from 'react';
// FIX: Import ProfessionalAlert and ProfessionalActivity instead of FirmAlert and FirmActivity.
import { Company, Employee, EmployeeStatus, UpcomingPayroll, PayrollStatus, ProfessionalAlert, AlertType, ProfessionalActivity } from '../types';
import Card from './Card';
import { Building2, Users, DollarSign, FileClock, CheckCircle, Clock, AlertTriangle, Info, PieChart as PieChartIcon } from './icons';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

interface FirmDashboardProps {
    companies: Company[];
    employees: Employee[];
    upcomingPayrolls: UpcomingPayroll[];
    // FIX: Update prop types to use ProfessionalAlert and ProfessionalActivity.
    firmAlerts: ProfessionalAlert[];
    firmActivity: ProfessionalActivity[];
    onSelectCompany: (companyId: string) => void;
}

const KpiCard: React.FC<{ icon: React.ReactNode; title: string; value: string | number; }> = ({ icon, title, value }) => (
    <div className="bg-white p-4 rounded-lg border flex items-center">
        <div className="p-3 bg-secondary/10 rounded-lg">{icon}</div>
        <div className="ml-4">
            <p className="text-2xl font-bold text-primary">{value}</p>
            <p className="text-sm text-gray-500">{title}</p>
        </div>
    </div>
);

const getAlertIcon = (type: AlertType) => {
    switch (type) {
        case AlertType.ERROR: return <AlertTriangle className="w-5 h-5 text-red-500" />;
        case AlertType.ALERT: return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
        case AlertType.REMINDER: return <Clock className="w-5 h-5 text-blue-500" />;
        case AlertType.INFO: return <Info className="w-5 h-5 text-gray-500" />;
        default: return <Info className="w-5 h-5 text-gray-500" />;
    }
};

const FirmDashboard: React.FC<FirmDashboardProps> = ({ companies, employees, upcomingPayrolls, firmAlerts, firmActivity, onSelectCompany }) => {
    
    const activeClients = companies.length;
    const payrollsToProcess = upcomingPayrolls.filter(p => p.status === PayrollStatus.PENDING).length;
    const pendingApproval = upcomingPayrolls.filter(p => p.status === PayrollStatus.REVIEW).length;
    const totalManagedEmployees = employees.filter(e => e.status === EmployeeStatus.ACTIVE).length;

    const getStatusBadge = (status: PayrollStatus) => {
        switch(status) {
            case PayrollStatus.PENDING: 
                return (
                    <div className="inline-flex items-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2"></span>
                        <span className="text-red-700">Por Procesar</span>
                    </div>
                );
            case PayrollStatus.REVIEW: 
                return (
                    <div className="inline-flex items-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-500 mr-2"></span>
                        <span className="text-yellow-700">En Revisión</span>
                    </div>
                );
            case PayrollStatus.APPROVED: 
                return (
                    <div className="inline-flex items-center">
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500 mr-2"></span>
                        <span className="text-green-700">Aprobada</span>
                    </div>
                );
        }
    };
    
    const employeeDistributionData = React.useMemo(() => {
        return companies.map(company => ({
          name: company.name,
          value: employees.filter(e => e.companyId === company.id && e.status === EmployeeStatus.ACTIVE).length,
        })).filter(d => d.value > 0);
    }, [companies, employees]);
    
    const COLORS = ['#0A2540', '#2ECC71', '#F39C12', '#3B82F6', '#8B5CF6'];

    return (
        <div className="p-8">
            <h1 className="font-heading text-3xl font-bold text-primary">Dashboard de la Firma</h1>
            <p className="text-gray-500 mt-1">Centro de comando para la gestión de todos tus clientes.</p>

            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <KpiCard icon={<Building2 className="w-6 h-6 text-secondary"/>} title="Clientes Activos" value={activeClients} />
                <KpiCard icon={<FileClock className="w-6 h-6 text-secondary"/>} title="Nóminas por Procesar" value={payrollsToProcess} />
                <KpiCard icon={<CheckCircle className="w-6 h-6 text-secondary"/>} title="Pendientes de Aprobación" value={pendingApproval} />
                <KpiCard icon={<Users className="w-6 h-6 text-secondary"/>} title="Total Empleados Gestionados" value={totalManagedEmployees} />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
                {/* Upcoming Payrolls */}
                <div className="xl:col-span-2">
                    <Card>
                        <h2 className="font-heading text-xl font-bold text-primary mb-4">Nóminas con Vencimiento Próximo</h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-light">
                                        <th className="py-3 px-4 text-sm font-semibold text-gray-500 uppercase">Cliente</th>
                                        <th className="py-3 px-4 text-sm font-semibold text-gray-500 uppercase">Tipo</th>
                                        <th className="py-3 px-4 text-sm font-semibold text-gray-500 uppercase">Fecha Límite</th>
                                        <th className="py-3 px-4 text-sm font-semibold text-gray-500 uppercase">Estado</th>
                                        <th className="py-3 px-4 text-sm font-semibold text-gray-500 uppercase">Acción</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {upcomingPayrolls.map(p => (
                                        <tr key={p.clientId + p.payrollType} className="border-b last:border-0">
                                            <td className="py-3 px-4 font-semibold text-primary">{p.clientName}</td>
                                            <td className="py-3 px-4 text-gray-600">{p.payrollType}</td>
                                            <td className="py-3 px-4 text-gray-600">{new Date(p.dueDate + 'T00:00:00').toLocaleDateString('es-DO')}</td>
                                            <td className="py-3 px-4 text-sm font-semibold">{getStatusBadge(p.status)}</td>
                                            <td className="py-3 px-4">
                                                <button onClick={() => onSelectCompany(p.clientId)} className={`font-bold py-1 px-3 rounded-lg text-sm transition-all ${p.status === PayrollStatus.PENDING ? 'bg-secondary text-white hover:bg-secondary/90' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                                                    {p.status === PayrollStatus.PENDING ? 'Procesar Ahora' : 'Ver Detalles'}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </Card>
                </div>
                
                {/* Alerts & Notifications */}
                <div className="space-y-8">
                     <Card>
                        <h2 className="font-heading text-xl font-bold text-primary mb-4">Alertas y Notificaciones</h2>
                        <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                           {firmAlerts.map(alert => (
                               <div key={alert.id} className="flex items-start p-3 bg-light rounded-lg">
                                   <div className="flex-shrink-0 mt-1">{getAlertIcon(alert.type)}</div>
                                   <p className="text-sm text-gray-700 ml-3">{alert.text}</p>
                               </div>
                           ))}
                        </div>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-8">
                 {/* Employee Distribution */}
                 <Card>
                    <h2 className="font-heading text-xl font-bold text-primary mb-4">Distribución de Empleados por Cliente</h2>
                    <div style={{ width: '100%', height: 250 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={employeeDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} label={({ name, value }) => `${name} (${value})`}>
                                     {employeeDistributionData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                 {/* Recent Activity */}
                <div className="xl:col-span-2">
                    <Card>
                        <h2 className="font-heading text-xl font-bold text-primary mb-4">Actividad Reciente de la Firma</h2>
                        <div className="space-y-1">
                           {firmActivity.map(activity => (
                               <div key={activity.id} className="flex items-center justify-between p-3 hover:bg-light rounded-lg">
                                   <p className="text-sm text-gray-700">{activity.action}</p>
                                   <div className="text-right">
                                       <p className="text-xs text-gray-400 font-semibold">{activity.user}</p>
                                       <p className="text-xs text-gray-400">{activity.timestamp}</p>
                                   </div>
                               </div>
                           ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default FirmDashboard;