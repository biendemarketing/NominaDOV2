import React from 'react';
import { AuthView } from '../types';
import { HandCoins, ArrowRight } from './icons';

interface FeaturePageProps {
  setAuthView: (view: AuthView) => void;
}

const FeatureReportsPage: React.FC<FeaturePageProps> = ({ setAuthView }) => {
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
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary">Reportes y Cumplimiento Normativo</h1>
          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">Genera los archivos oficiales que exigen las entidades gubernamentales con un solo clic y mantente siempre al día con la ley.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-md max-w-4xl mx-auto prose lg:prose-lg text-gray-700">
            <h2>Cumplimiento sin Complicaciones</h2>
            <p>
              NominaDO elimina la carga de preparar manualmente los reportes regulatorios. Nuestra plataforma genera los archivos en los formatos exactos requeridos, listos para ser presentados.
            </p>
            <ul>
                <li><strong>Tesorería de la Seguridad Social (TSS):</strong> Genera el archivo de Autodeterminación (SUIR+) en formato <strong>.txt</strong>, con todos los campos y validaciones necesarias para una carga exitosa.</li>
                <li><strong>Dirección General de Impuestos Internos (DGII):</strong> Obtén el reporte de Retenciones a Asalariados (IR-3), un documento clave para tu declaración mensual.</li>
                <li><strong>Ministerio de Trabajo (MT):</strong> Descarga los formularios DGT-3 (Planilla de Personal Fijo) y DGT-4 (Cambios en Personal) en formato PDF, listos para ser presentados.</li>
            </ul>
            <p>
              Además de los reportes de ley, puedes generar informes internos de gestión, como resúmenes de nómina, costos por departamento y más, para una toma de decisiones informada.
            </p>
        </div>
        
        <div className="mt-16 text-center">
            <button onClick={() => setAuthView(AuthView.REGISTER)} className="group mt-8 bg-secondary text-white font-bold text-lg py-3 px-6 rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg inline-flex items-center">
              Simplifica tus Reportes <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"/>
            </button>
        </div>
      </main>
    </div>
  );
};

export default FeatureReportsPage;
