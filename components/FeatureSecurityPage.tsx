import React from 'react';
import { AuthView } from '../types';
import { HandCoins, ArrowRight } from './icons';

interface FeaturePageProps {
  setAuthView: (view: AuthView) => void;
}

const FeatureSecurityPage: React.FC<FeaturePageProps> = ({ setAuthView }) => {
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
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary">Seguridad y Confianza</h1>
          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">La información de tu empresa y tus empleados es nuestro activo más preciado. La protegemos con los más altos estándares.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-md max-w-4xl mx-auto prose lg:prose-lg text-gray-700">
            <h2>Tu Tranquilidad es Nuestra Prioridad</h2>
            <p>
              Entendemos la sensibilidad de los datos de nómina. Por eso, hemos construido nuestra plataforma sobre una base de seguridad robusta para garantizar la confidencialidad, integridad y disponibilidad de tu información.
            </p>
            <ul>
                <li><strong>Encriptación de Extremo a Extremo:</strong> Todos los datos, tanto en tránsito como en reposo, están protegidos con encriptación AES-256, el mismo estándar utilizado por los bancos.</li>
                <li><strong>Infraestructura Segura:</strong> Alojamos nuestra plataforma en servidores que cumplen con las certificaciones de seguridad más rigurosas a nivel mundial.</li>
                <li><strong>Cumplimiento Local:</strong> Operamos en estricto cumplimiento con la Ley 172-13 de Protección de Datos Personales de la República Dominicana.</li>
                <li><strong>Controles de Acceso:</strong> Con nuestro sistema de roles y permisos, tú decides quién ve qué información, limitando el acceso a datos sensibles solo al personal autorizado.</li>
            </ul>
        </div>
        
        <div className="mt-16 text-center">
            <button onClick={() => setAuthView(AuthView.REGISTER)} className="group mt-8 bg-secondary text-white font-bold text-lg py-3 px-6 rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg inline-flex items-center">
              Opera con Total Confianza <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"/>
            </button>
        </div>
      </main>
    </div>
  );
};

export default FeatureSecurityPage;
