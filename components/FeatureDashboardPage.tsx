import React from 'react';
// FIX: Changed import path to be explicit, pointing to the index file.
import { AuthView } from '../types/index';
import { HandCoins, ArrowRight } from './icons';

interface FeaturePageProps {
  setAuthView: (view: AuthView) => void;
}

const FeatureDashboardPage: React.FC<FeaturePageProps> = ({ setAuthView }) => {
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
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary">Dashboard Analítico Inteligente</h1>
          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">Toma el pulso de tu nómina con una vista de 360 grados. Datos claros para decisiones inteligentes.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-md max-w-4xl mx-auto prose lg:prose-lg text-gray-700">
            <h2>El Centro de Mando de tu Nómina</h2>
            <p>
              Nuestro dashboard te ofrece una visión clara y concisa de los indicadores más importantes, permitiéndote identificar tendencias y tomar acciones proactivas.
            </p>
            <ul>
                <li><strong>KPIs Clave:</strong> Monitorea en tiempo real el total de empleados activos, el costo laboral mensual y la fecha de tu próxima nómina.</li>
                <li><strong>Gráficos Históricos:</strong> Visualiza la evolución de tu costo de nómina a lo largo del tiempo para entender mejor el impacto de nuevas contrataciones y ajustes salariales.</li>
                <li><strong>Alertas Proactivas:</strong> El sistema te notifica sobre eventos importantes, como contratos que están por vencer o próximos feriados, para que nunca te tome por sorpresa.</li>
                <li><strong>Resumen de Actividad:</strong> Accede rápidamente a tus últimas nóminas procesadas y a las tareas pendientes más urgentes.</li>
            </ul>
        </div>
        
        <div className="mt-16 text-center">
            <button onClick={() => setAuthView(AuthView.REGISTER)} className="group mt-8 bg-secondary text-white font-bold text-lg py-3 px-6 rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg inline-flex items-center">
              Obtén Visibilidad Total <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"/>
            </button>
        </div>
      </main>
    </div>
  );
};

export default FeatureDashboardPage;