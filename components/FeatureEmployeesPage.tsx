import React from 'react';
import { AuthView } from '../types';
import { HandCoins, ArrowRight } from './icons';

interface FeaturePageProps {
  setAuthView: (view: AuthView) => void;
}

const FeatureEmployeesPage: React.FC<FeaturePageProps> = ({ setAuthView }) => {
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
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary">Gestión Centralizada de Empleados</h1>
          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">Un expediente digital para cada miembro de tu equipo, accesible desde cualquier lugar y siempre actualizado.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-md max-w-4xl mx-auto prose lg:prose-lg text-gray-700">
            <h2>Toda la Información, al Instante</h2>
            <p>
               Mantén un registro completo y organizado de tu personal. NominaDO centraliza toda la información relevante para que la gestión de recursos humanos sea más eficiente que nunca.
            </p>
            <ul>
                <li><strong>Perfiles Digitales:</strong> Cada empleado tiene su propio perfil con su información personal, salarial, de contacto y bancaria almacenada de forma segura.</li>
                <li><strong>Módulo Especial para Extranjeros:</strong> Registra y gestiona fácilmente el estatus migratorio, fechas de vencimiento de visa y determina si el empleado es residente fiscal para aplicar las retenciones de ley correctamente.</li>
                <li><strong>Gestión Documental:</strong> Sube y asocia documentos importantes como contratos, copias de cédula/pasaporte, y certificaciones directamente al perfil del empleado.</li>
                <li><strong>Historial Completo:</strong> La plataforma registra automáticamente todos los cambios importantes, como aumentos de salario, promociones o cambios de departamento, creando un historial laboral completo.</li>
            </ul>
        </div>
        
        <div className="mt-16 text-center">
            <button onClick={() => setAuthView(AuthView.REGISTER)} className="group mt-8 bg-secondary text-white font-bold text-lg py-3 px-6 rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg inline-flex items-center">
              Centraliza la Gestión de tu Equipo <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"/>
            </button>
        </div>
      </main>
    </div>
  );
};

export default FeatureEmployeesPage;
