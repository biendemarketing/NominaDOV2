import React from 'react';
import Card from './Card';
import { BillingInfo } from '../types';
import { CreditCard, Download } from './icons';

interface ProfessionalBillingProps {
  billingInfo: BillingInfo;
}

const ProfessionalBilling: React.FC<ProfessionalBillingProps> = ({ billingInfo }) => {
    const formatCurrency = (amount: number) => new Intl.NumberFormat('es-DO', { style: 'currency', currency: 'DOP' }).format(amount);
    const formatDate = (dateString: string) => new Date(dateString + 'T00:00:00').toLocaleDateString('es-DO', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="p-8">
      <h1 className="font-heading text-3xl font-bold text-primary">Facturación y Plan</h1>
      <p className="text-gray-500 mt-1">Gestiona tu suscripción, revisa tus facturas y actualiza tu método de pago.</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        <div className="lg:col-span-2">
            <Card>
                <h2 className="font-heading text-xl font-bold text-primary mb-4">Historial de Facturación</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-light">
                        <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase">Fecha</th>
                        <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase">Monto</th>
                        <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase">Estatus</th>
                        <th className="py-3 px-6 text-sm font-semibold text-gray-500 uppercase text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billingInfo.invoices.map((invoice) => (
                        <tr key={invoice.id} className="border-b border-gray-200 hover:bg-light transition-colors">
                          <td className="py-4 px-6 font-semibold text-primary">{formatDate(invoice.date)}</td>
                          <td className="py-4 px-6 text-gray-600">{formatCurrency(invoice.amount)}</td>
                          <td className="py-4 px-6">
                            <span className={`px-2 py-1 text-xs font-semibold rounded-full ${invoice.status === 'Pagada' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {invoice.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button className="text-secondary hover:underline font-semibold flex items-center ml-auto">
                                <Download className="w-4 h-4 mr-1"/> Descargar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            </Card>
        </div>
        <div>
            <Card>
                 <h2 className="font-heading text-xl font-bold text-primary mb-4">Plan Actual</h2>
                 <div className="bg-primary text-white p-6 rounded-lg text-center">
                    <p className="font-bold text-2xl">{billingInfo.plan} - Nivel {billingInfo.level}</p>
                    <p className="text-4xl font-bold text-secondary my-2">{formatCurrency(billingInfo.price)}<span className="text-lg text-gray-300">/{billingInfo.billingCycle}</span></p>
                 </div>
                 <button className="w-full mt-4 bg-secondary text-white font-bold py-2 rounded-lg hover:bg-secondary/90 transition-all">
                    Cambiar de Plan
                 </button>
            </Card>
            <Card className="mt-6">
                <h2 className="font-heading text-xl font-bold text-primary mb-4">Método de Pago</h2>
                <div className="flex items-center p-4 bg-light rounded-lg border">
                    <CreditCard className="w-8 h-8 text-secondary mr-4" />
                    <div>
                        <p className="font-semibold text-primary">Terminada en {billingInfo.paymentMethod.last4}</p>
                        <p className="text-sm text-gray-500">Expira {billingInfo.paymentMethod.expiry}</p>
                    </div>
                </div>
                <button className="w-full mt-4 border border-gray-300 text-primary font-bold py-2 rounded-lg hover:bg-gray-100 transition-all">
                    Actualizar Método
                 </button>
            </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalBilling;
