import React, { useState } from 'react';
import { AuthView } from '../types';
import { HandCoins, CheckCircle2, ArrowRight } from './icons';

interface PricingPageProps {
  setAuthView: (view: AuthView) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ setAuthView }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = {
    monthly: [
      { name: 'Estándar', price: 50, employees: 'Hasta 20', features: ['Cálculos automáticos TSS/ISR', 'Gestión de empleados', 'Reportes TSS y DGII', 'Soporte por email'] },
      { name: 'Avanzado', price: 150, employees: 'Hasta 50', popular: true, features: ['Todo en Estándar', 'Portal del empleado', 'Roles y permisos', 'Soporte por chat prioritario'] },
      { name: 'Profesional', price: 200, employees: 'Ilimitados (por empresa)', features: ['Todo en Avanzado', 'Gestión multi-empresa', 'Personalización (Marca Blanca)', 'Integraciones Contables'] },
    ],
    annual: [
      { name: 'Estándar', price: 40, employees: 'Hasta 20', features: ['Cálculos automáticos TSS/ISR', 'Gestión de empleados', 'Reportes TSS y DGII', 'Soporte por email'] },
      { name: 'Avanzado', price: 120, employees: 'Hasta 50', popular: true, features: ['Todo en Estándar', 'Portal del empleado', 'Roles y permisos', 'Soporte por chat prioritario'] },
      { name: 'Profesional', price: 160, employees: 'Ilimitados (por empresa)', features: ['Todo en Avanzado', 'Gestión multi-empresa', 'Personalización (Marca Blanca)', 'Integraciones Contables'] },
    ]
  };

  const currentPlans = plans[billingCycle];

  return (
    <div className="bg-light min-h-screen">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => setAuthView(AuthView.LANDING)}>
            <HandCoins className="w-8 h-8 text-secondary" />
            <h1 className="text-2xl font-heading font-bold ml-2 text-primary">Nomina<span className="text-secondary">DO</span></h1>
          </div>
          <button onClick={() => setAuthView(AuthView.LANDING)} className="font-semibold text-primary hover:text-secondary transition">
            Volver al Inicio
          </button>
        </div>
      </header>

      <main className="container mx-auto p-6 md:p-12">
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary">Planes transparentes para cada necesidad</h1>
          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">Elige la opción que mejor se adapte al tamaño y complejidad de tu empresa. Sin sorpresas.</p>
        </div>
        
        <div className="flex justify-center items-center mb-10">
          <span className={`font-semibold ${billingCycle === 'monthly' ? 'text-primary' : 'text-gray-500'}`}>Mensual</span>
          <label className="relative inline-flex items-center cursor-pointer mx-4">
            <input type="checkbox" checked={billingCycle === 'annual'} onChange={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')} className="sr-only peer" />
            <div className="w-14 h-8 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-1 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-secondary"></div>
          </label>
          <span className={`font-semibold ${billingCycle === 'annual' ? 'text-primary' : 'text-gray-500'}`}>Anual <span className="text-secondary">(Ahorra 20%)</span></span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {currentPlans.map(plan => (
            <div key={plan.name} className={`bg-white p-8 rounded-xl border-2 ${plan.popular ? 'border-secondary shadow-lg' : 'border-gray-200/80 shadow-sm'} flex flex-col h-full relative`}>
              {plan.popular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full">MÁS POPULAR</div>}
              <h3 className="font-heading text-2xl font-bold text-primary">{plan.name}</h3>
              <p className="text-gray-500 mt-2">{plan.employees} empleados</p>
              <p className="font-heading text-5xl font-bold text-primary my-6">${plan.price}<span className="text-xl font-semibold text-gray-500">/mes</span></p>
              <p className="text-xs text-gray-400 mb-6">{billingCycle === 'annual' ? `Facturado ${plan.price * 12} anualmente` : ''}</p>
              <ul className="space-y-3 text-gray-600 mb-8 flex-grow">
                {plan.features.map(feature => (
                  <li key={feature} className="flex items-start"><CheckCircle2 className="w-5 h-5 text-secondary mr-2 flex-shrink-0 mt-0.5" /> {feature}</li>
                ))}
              </ul>
              <button className={`mt-auto w-full font-bold py-3 px-5 rounded-lg transition-all ${plan.popular ? 'bg-secondary text-white hover:bg-secondary/90' : 'bg-primary/5 text-primary border-2 border-primary/10 hover:bg-primary/10'}`}>
                Elegir Plan
              </button>
            </div>
          ))}
        </div>
        
         <div className="mt-16 text-center">
            <h2 className="font-heading text-3xl font-bold text-primary">¿Necesitas algo más grande?</h2>
            <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Para soluciones corporativas con requerimientos específicos, contacta a nuestro equipo de ventas para un plan a tu medida.</p>
            <button onClick={() => setAuthView(AuthView.CONTACT)} className="group mt-8 bg-primary text-white font-bold text-lg py-3 px-6 rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-lg inline-flex items-center">
              Contactar a Ventas <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>
      </main>
    </div>
  );
};

export default PricingPage;
