import React from 'react';
import { AuthView } from '../types';
import { HandCoins, ArrowRight } from './icons';

interface FeaturePageProps {
  setAuthView: (view: AuthView) => void;
}

const FeatureSupportPage: React.FC<FeaturePageProps> = ({ setAuthView }) => {
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
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary">Soporte Especializado y Local</h1>
          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">No estás solo. Nuestro equipo de expertos está basado en República Dominicana y entiende tus desafíos porque los hemos vivido.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-md max-w-4xl mx-auto prose lg:prose-lg text-gray-700">
            <h2>Ayuda Real, por Expertos Reales</h2>
            <p>
              Cuando tienes una pregunta sobre nómina, no necesitas un experto en software, necesitas un experto en la ley dominicana. Nuestro equipo combina ambas cosas para darte el mejor soporte posible.
            </p>
            <ul>
                <li><strong>Expertos Locales:</strong> Habla con personas que entienden a fondo el Código de Trabajo, la Ley 87-01 de Seguridad Social y las normativas de la DGII.</li>
                <li><strong>Soporte Multicanal:</strong> Contáctanos a través de chat en vivo, correo electrónico o teléfono. Estamos aquí para ayudarte a través del canal que te resulte más cómodo.</li>
                <li><strong>Base de Conocimientos:</strong> Accede a nuestro completo Centro de Ayuda con artículos, guías y tutoriales en video diseñados para resolver tus dudas rápidamente.</li>
                <li><strong>Resolución Rápida:</strong> Nuestro objetivo es resolver tus inquietudes en el primer contacto, para que puedas volver a lo que más importa: tu negocio.</li>
            </ul>
        </div>
        
        <div className="mt-16 text-center">
            <button onClick={() => setAuthView(AuthView.REGISTER)} className="group mt-8 bg-secondary text-white font-bold text-lg py-3 px-6 rounded-lg hover:bg-secondary/90 transition-all duration-300 shadow-lg inline-flex items-center">
              Obtén Soporte de Expertos <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"/>
            </button>
        </div>
      </main>
    </div>
  );
};

export default FeatureSupportPage;
