import React from 'react';
import { AuthView } from '../types';
import { HandCoins, ArrowRight } from './icons';

interface FeaturePageProps {
  setAuthView: (view: AuthView) => void;
}

const FeatureDispersionsPage: React.FC<FeaturePageProps> = ({ setAuthView }) => {
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
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary">Dispersión de Pagos Bancarios</h1>
          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">Paga a todo tu equipo en minutos. Genera el archivo de pago masivo compatible con tu banco y olvídate de las transferencias individuales.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-md max-w-4xl mx-auto prose lg:prose-lg text-gray-700">
            <h2>Paga a tu Equipo sin Fricción</h2>
            <p>
              Una vez que tu nómina está calculada y confirmada, el último paso es pagar. NominaDO convierte este proceso, a menudo tedioso, en una tarea de un solo clic.
            </p>
            <ul>
                <li><strong>Formatos Bancarios:</strong> Generamos archivos de pago compatibles con las plataformas de los principales bancos comerciales de la República Dominicana (Banco Popular, Banreservas, BHD, Scotiabank, y más).</li>
                <li><strong>Proceso Seguro:</strong> Simplemente descarga el archivo generado por NominaDO y súbelo a tu portal bancario para autorizar el pago masivo. Nosotros no manejamos tu dinero directamente, garantizando la seguridad.</li>
                <li><strong>Ahorro de Tiempo Masivo:</strong> Evita el riesgo y el tiempo perdido de hacer docenas o cientos de transferencias manuales cada quincena.</li>
                <li><strong>Precisión Garantizada:</strong> Como el archivo se genera directamente desde los resultados de la nómina, se eliminan los errores de digitación en montos o números de cuenta.</li>
            </ul>
        </div>
        
        <div className="mt-16 text-center">
            <button onClick={() => setAuthView(AuthView.REGISTER)} className="group mt-8 bg-secondary text-white font-bold text-lg py-3 px-6 rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg inline-flex items-center">
              Agiliza tus Pagos <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"/>
            </button>
        </div>
      </main>
    </div>
  );
};

export default FeatureDispersionsPage;
