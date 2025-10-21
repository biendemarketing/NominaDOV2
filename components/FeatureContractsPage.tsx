import React from 'react';
// FIX: Changed import path to be explicit, pointing to the index file.
import { AuthView } from '../types/index';
import { HandCoins, ArrowRight } from './icons';

interface FeaturePageProps {
  setAuthView: (view: AuthView) => void;
}

const FeatureContractsPage: React.FC<FeaturePageProps> = ({ setAuthView }) => {
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
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary">Gestión de Contratos y Documentos</h1>
          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">Digitaliza y centraliza la documentación laboral para una gestión de RRHH más organizada y eficiente.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-md max-w-4xl mx-auto prose lg:prose-lg text-gray-700">
            <h2>Del Papel a la Nube, de Forma Segura</h2>
            <p>
              Reduce el desorden y mejora el acceso a la información con nuestro módulo de gestión documental, integrado directamente en el perfil de cada empleado.
            </p>
            <ul>
                <li><strong>Generación de Contratos:</strong> Utiliza nuestras plantillas pre-configuradas y conformes a la ley para generar contratos de trabajo en segundos, rellenando automáticamente la información del empleado.</li>
                <li><strong>Ciclo de Vida del Contrato:</strong> Lleva un control claro de las fechas de inicio y fin, recibe alertas de vencimiento y gestiona renovaciones o terminaciones directamente en la plataforma.</li>
                <li><strong>Archivo Digital:</strong> Sube y almacena de forma segura todos los documentos importantes de tus empleados, como copias de cédula, certificaciones, títulos y más.</li>
                <li><strong>Acceso Centralizado:</strong> Encuentra cualquier documento que necesites en segundos, sin tener que rebuscar en archivadores físicos. Todo está organizado y asociado al perfil del empleado correspondiente.</li>
            </ul>
        </div>
        
        <div className="mt-16 text-center">
            <button onClick={() => setAuthView(AuthView.REGISTER)} className="group mt-8 bg-secondary text-white font-bold text-lg py-3 px-6 rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg inline-flex items-center">
              Digitaliza tu Gestión de RRHH <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"/>
            </button>
        </div>
      </main>
    </div>
  );
};

export default FeatureContractsPage;