import React from 'react';
// FIX: Changed import path to be explicit, pointing to index file.
import { Company, Employee, Contract, EmployeeStatus } from '../types/index';
import Card from './Card';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell, CartesianGrid } from 'recharts';
// FIX: Changed import path to be explicit, pointing to index file.
import { PAYROLL_HISTORY_DATA } from '../constants/index';
import PayrollChart from './PayrollChart';

interface ProfessionalAnalyticsProps {
  companies: Company[];
  employees: Employee[];
  contracts: Contract[];
}

const COLORS = ['#0A2540', '#2ECC71', '#F39C12', '#3B82F6', '#8B5CF6', '#EF4444'];
const formatCompact = (amount: number) => `DOP ${new Intl.NumberFormat('en-US', { notation: 'compact', compactDisplay: 'short' }).format(amount)}`;
const formatCurrency = (amount: number) => new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(amount);

const ProfessionalAnalytics: React.FC<ProfessionalAnalyticsProps> = ({ companies, employees }) => {
  const employeeDistributionData = React.useMemo(() => {
    return companies.map(company => ({
      name: company.name,
      value: employees.filter(e => e.companyId === company.id && e.status === EmployeeStatus.ACTIVE).length,
    }));
  }, [companies, employees]);

  const payrollCostByCompany = React.useMemo(() => {
    return companies.map(company => {
        const cost = employees
            .filter(e => e.companyId === company.id && e.status === EmployeeStatus.ACTIVE)
            .reduce((sum, e) => sum + e.salary, 0);
        return { name: company.name, 'Costo Mensual': cost };
    }).sort((a, b) => b['Costo Mensual'] - a['Costo Mensual']);
  }, [companies, employees]);

  return (
    <div className="p-8">
      <h1 className="font-heading text-3xl font-bold text-primary">Analítica Profesional</h1>
      <p className="text-gray-500 mt-1">Visión consolidada del rendimiento de todas las empresas que gestionas.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <Card>
          <h2 className="text-lg font-bold font-heading text-primary mb-1">Distribución de Empleados</h2>
          <p className="text-sm text-gray-500 mb-4">Empleados activos por empresa.</p>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={employeeDistributionData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {employeeDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card>
          <h2 className="text-lg font-bold font-heading text-primary mb-1">Ranking de Empresas por Costo de Nómina</h2>
          <p className="text-sm text-gray-500 mb-4">Costo salarial mensual por empresa.</p>
           <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <BarChart data={payrollCostByCompany} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={formatCompact} />
                <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} cursor={{ fill: 'rgba(46, 204, 113, 0.1)' }} />
                <Bar dataKey="Costo Mensual" fill="#0A2540" radius={[0, 4, 4, 0]}>
                    {payrollCostByCompany.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="lg:col-span-2">
            <h2 className="text-lg font-bold font-heading text-primary mb-1">Histórico de Costo de Nómina (Agregado)</h2>
            <p className="text-sm text-gray-500 mb-4">Costo total de todas las empresas en los últimos 6 meses (simulado).</p>
            <PayrollChart data={PAYROLL_HISTORY_DATA} />
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalAnalytics;
