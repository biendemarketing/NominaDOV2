import React from 'react';
// FIX: Changed import path to be explicit, pointing to the index file.
import { AuthView } from '../types/index';
import { HandCoins, ArrowRight } from './icons';

interface FeaturePageProps {
  setAuthView: (view: AuthView) => void;
}

const FeaturePayrollPage: React.FC<FeaturePageProps> = ({ setAuthView }) => {
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
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary">Cálculo Automatizado de Nómina</h1>
          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">Olvídate de las hojas de cálculo. Nuestro motor de cálculo está siempre actualizado con la legislación dominicana para garantizar precisión y cumplimiento.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-md max-w-4xl mx-auto prose lg:prose-lg text-gray-700">
            <h2>Precisión en Cada Pago</h2>
            <p>
                El corazón de NominaDO es un potente motor de cálculo diseñado para manejar las complejidades del sistema tributario y de seguridad social de la República Dominicana. Automatizamos cada paso para que puedas pagar a tu equipo con total confianza.
            </p>
            <ul>
                <li><strong>TSS (AFP y SFS):</strong> Aplicamos automáticamente los topes salariales cotizables vigentes cada año, asegurando que las deducciones para el seguro familiar de salud y el fondo de pensiones sean siempre correctas.</li>
                <li><strong>Impuesto Sobre la Renta (ISR):</strong> El sistema calcula la retención de ISR para cada empleado basándose en la escala de ingresos anual exenta y los porcentajes correspondientes, ajustado para pagos quincenales o mensuales.</li>
                <li><strong>Novedades de Nómina:</strong> ¿Un empleado hizo horas extras? ¿Necesitas aplicar una comisión o un descuento? Nuestra interfaz te permite añadir estas "novedades" fácilmente antes de procesar el pago, y el sistema recalcula todo al instante.</li>
                <li><strong>Flexibilidad de Pago:</strong> Ya sea que pagues quincenal, mensual o de forma especial (como bonificaciones o regalía), la plataforma se adapta a tu ciclo de pago.</li>
            </ul>
            <p>
                Con NominaDO, reduces el riesgo de errores humanos a cero, ahorras incontables horas de trabajo manual y garantizas que cada volante de pago sea un reflejo exacto y justo del trabajo de tu equipo.
            </p>
        </div>
        
        <div className="mt-16 text-center">
            <button onClick={() => setAuthView(AuthView.REGISTER)} className="group mt-8 bg-secondary text-white font-bold text-lg py-3 px-6 rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg inline-flex items-center">
              Automatiza tu Nómina Ahora <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"/>
            </button>
        </div>
      </main>
    </div>
  );
};

export default FeaturePayrollPage;