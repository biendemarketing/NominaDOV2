import React from 'react';
import { AuthView } from '../types';
import { HandCoins, ArrowRight } from './icons';

interface FeaturePageProps {
  setAuthView: (view: AuthView) => void;
}

const FeatureLiquidacionesPage: React.FC<FeaturePageProps> = ({ setAuthView }) => {
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
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary">Cálculo de Liquidaciones</h1>
          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">Gestiona la salida de empleados con precisión y total apego al Código de Trabajo Dominicano, evitando errores y posibles disputas legales.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-md max-w-4xl mx-auto prose lg:prose-lg text-gray-700">
            <h2>Prestaciones Laborales, sin Errores</h2>
            <p>
              El cálculo de prestaciones laborales es uno de los procesos más delicados en la gestión de personal. NominaDO lo simplifica y automatiza para darte seguridad y tranquilidad.
            </p>
            <ul>
                <li><strong>Cálculo Preciso:</strong> La plataforma calcula automáticamente los montos correspondientes a preaviso, auxilio de cesantía, vacaciones y salario de navidad (regalía) proporcionales.</li>
                <li><strong>Adaptado al Motivo:</strong> El sistema ajusta los cálculos según el motivo de la terminación del contrato (despido, renuncia o mutuo acuerdo), aplicando los derechos que correspondan en cada caso.</li>
                <li><strong>Generación de Documentos:</strong> Crea el "Acto de Liquidación" o finiquito con el desglose detallado de los montos, listo para ser firmado por ambas partes.</li>
                <li><strong>Actualización Automática:</strong> Al procesar una liquidación, el estatus del empleado se actualiza a "Terminado" y deja de ser incluido en futuras nóminas regulares.</li>
            </ul>
        </div>
        
        <div className="mt-16 text-center">
            <button onClick={() => setAuthView(AuthView.REGISTER)} className="group mt-8 bg-secondary text-white font-bold text-lg py-3 px-6 rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg inline-flex items-center">
              Calcula Liquidaciones con Precisión <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"/>
            </button>
        </div>
      </main>
    </div>
  );
};

export default FeatureLiquidacionesPage;
