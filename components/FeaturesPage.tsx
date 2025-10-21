import React from 'react';
// FIX: Changed import path to be explicit, pointing to the index file.
import { AuthView } from '../types/index';
import { HandCoins, DollarSign, Users, FileText, ArrowRight } from './icons';

interface FeaturesPageProps {
  setAuthView: (view: AuthView) => void;
}

const FeatureDetail: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="md:flex items-start mb-12">
    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
      <div className="flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-lg">
        {icon}
      </div>
    </div>
    <div>
      <h3 className="font-heading text-2xl font-bold text-primary mb-2">{title}</h3>
      <div className="prose text-gray-600">
        {children}
      </div>
    </div>
  </div>
);

const FeaturesPage: React.FC<FeaturesPageProps> = ({ setAuthView }) => {
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
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary">Características Detalladas</h1>
          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">Explora cómo cada funcionalidad de NominaDO está diseñada para hacer tu vida más fácil y tu negocio más eficiente.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-md max-w-4xl mx-auto">
          <FeatureDetail icon={<DollarSign className="w-8 h-8 text-secondary"/>} title="Cálculo de Nómina Automatizado">
            <p>Olvídate de las hojas de cálculo y los errores manuales. Nuestro motor de cálculo está siempre actualizado con la legislación dominicana.</p>
            <ul>
              <li><strong>TSS (AFP y SFS):</strong> Aplicación automática de los topes salariales cotizables vigentes.</li>
              <li><strong>Impuesto Sobre la Renta (ISR):</strong> Cálculo preciso de retenciones basado en la escala salarial anual.</li>
              <li><strong>Novedades:</strong> Ingresa fácilmente horas extras, comisiones, bonos y deducciones por ausencias o daños.</li>
              <li><strong>Flexibilidad de Pago:</strong> Soporte para ciclos de pago quincenales, mensuales y especiales.</li>
            </ul>
          </FeatureDetail>

          <FeatureDetail icon={<Users className="w-8 h-8 text-secondary"/>} title="Gestión Integral de Empleados">
            <p>Un expediente digital para cada miembro de tu equipo, accesible desde cualquier lugar.</p>
            <ul>
                <li><strong>Perfiles Completos:</strong> Almacena datos personales, salariales, de contacto y bancarios de forma segura.</li>
                <li><strong>Módulo de Extranjeros:</strong> Gestiona el estatus migratorio, vencimiento de visa y aplica las retenciones correspondientes según si es o no residente fiscal.</li>
                <li><strong>Historial:</strong> Lleva un registro de todos los cambios de salario, posición y departamento.</li>
                <li><strong>Documentos:</strong> Sube y gestiona contratos, copias de cédula y otras certificaciones en un solo lugar.</li>
            </ul>
          </FeatureDetail>

           <FeatureDetail icon={<FileText className="w-8 h-8 text-secondary"/>} title="Reportes y Cumplimiento Regulatorio">
            <p>Cumple con todas tus obligaciones con el Estado sin estrés. Genera los archivos oficiales con un solo clic.</p>
            <ul>
                <li><strong>TSS:</strong> Archivo de Autodeterminación (SUIR+) en formato .txt, listo para subir a la plataforma.</li>
                <li><strong>DGII:</strong> Reporte de Retenciones a Asalariados (IR-3) para la declaración mensual.</li>
                <li><strong>Ministerio de Trabajo:</strong> Formularios DGT-3 (Planilla de Personal Fijo) y DGT-4 (Cambios en Personal) en PDF.</li>
                <li><strong>Dispersión de Pagos:</strong> Archivos de pago masivo compatibles con los principales bancos del país.</li>
            </ul>
          </FeatureDetail>
          
          <div className="mt-16 text-center">
            <h2 className="font-heading text-3xl font-bold text-primary">¿Listo para tomar el control de tu nómina?</h2>
            <p className="text-gray-600 mt-3">Simplifica tus procesos y enfócate en lo que realmente importa: hacer crecer tu negocio.</p>
            <button onClick={() => setAuthView(AuthView.REGISTER)} className="group mt-8 bg-secondary text-white font-bold text-lg py-3 px-6 rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg inline-flex items-center">
              Comenzar Ahora <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"/>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FeaturesPage;