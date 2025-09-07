import React from 'react';
import { AuthView } from '../types';
import { HandCoins } from './icons';

interface AboutPageProps {
  setAuthView: (view: AuthView) => void;
}

const TeamMemberCard: React.FC<{ name: string; title: string; imageUrl: string; }> = ({ name, title, imageUrl }) => (
    <div className="text-center">
        <img src={imageUrl} alt={name} className="w-32 h-32 rounded-full mx-auto mb-4 shadow-lg object-cover" />
        <h4 className="font-heading text-xl font-bold text-primary">{name}</h4>
        <p className="text-gray-500">{title}</p>
    </div>
);


const AboutPage: React.FC<AboutPageProps> = ({ setAuthView }) => {
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
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary">Nuestra Misión es Simplificar</h1>
          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">Nacimos de la necesidad de una herramienta de nómina moderna, intuitiva y perfectamente adaptada a la realidad del mercado dominicano.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-md max-w-4xl mx-auto prose lg:prose-lg text-gray-700">
            <h2>La Historia Detrás de NominaDO</h2>
            <p>
                Como contadores y dueños de pequeñas empresas, experimentamos de primera mano la frustración de gestionar la nómina en República Dominicana. Hojas de cálculo interminables, cambios constantes en la legislación, y el riesgo siempre presente de cometer errores costosos nos llevaron a una conclusión: tenía que haber una mejor manera.
            </p>
            <p>
                En 2023, unimos a un equipo de expertos en contabilidad, desarrolladores de software y diseñadores de experiencia de usuario para crear la solución que siempre quisimos. El resultado es NominaDO: una plataforma que no solo automatiza los cálculos complejos, sino que también proporciona claridad y control sobre el aspecto más importante de cualquier negocio: su gente.
            </p>
        </div>

        <div className="text-center my-16">
            <h2 className="font-heading text-3xl font-bold text-primary">Conoce a Nuestro Equipo</h2>
            <p className="text-gray-500 mt-2">Apasionados por la tecnología y el servicio.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <TeamMemberCard name="Laura Gómez" title="CEO y Fundadora" imageUrl="https://picsum.photos/id/1011/200/200" />
            <TeamMemberCard name="Pedro Martínez" title="CTO y Co-Fundador" imageUrl="https://picsum.photos/id/1012/200/200" />
            <TeamMemberCard name="Sofía Valdéz" title="Directora de Producto" imageUrl="https://picsum.photos/id/1027/200/200" />
            <TeamMemberCard name="Juan Pérez" title="Ingeniero Principal" imageUrl="https://picsum.photos/id/1005/200/200" />
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
