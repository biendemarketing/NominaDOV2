import React from 'react';
import { AuthView } from '../types';
import { HandCoins, Mail, Phone, MapPin } from './icons';

interface ContactPageProps {
  setAuthView: (view: AuthView) => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ setAuthView }) => {
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
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary">Hablemos</h1>
          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">Estamos aquí para ayudarte. Completa el formulario o contáctanos directamente.</p>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-lg shadow-md max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-gray-600 mb-2">Nombre Completo</label>
                            <input type="text" id="name" className="w-full px-4 py-2 bg-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50" required/>
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-600 mb-2">Correo Electrónico</label>
                            <input type="email" id="email" className="w-full px-4 py-2 bg-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50" required/>
                        </div>
                    </div>
                     <div className="mt-6">
                        <label htmlFor="subject" className="block text-sm font-semibold text-gray-600 mb-2">Asunto</label>
                        <input type="text" id="subject" className="w-full px-4 py-2 bg-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50" required/>
                    </div>
                     <div className="mt-6">
                        <label htmlFor="message" className="block text-sm font-semibold text-gray-600 mb-2">Mensaje</label>
                        <textarea id="message" rows={5} className="w-full px-4 py-2 bg-light border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50" required></textarea>
                    </div>
                    <div className="mt-6 text-right">
                        <button type="submit" className="bg-secondary text-white font-bold py-3 px-8 rounded-lg hover:bg-secondary/90 transition-all shadow-sm">
                            Enviar Mensaje
                        </button>
                    </div>
                </form>
            </div>
            <div className="space-y-6">
                 <h3 className="font-heading text-xl font-bold text-primary border-b pb-2">Información de Contacto</h3>
                 <div>
                    <div className="flex items-center text-gray-600">
                        <MapPin className="w-5 h-5 mr-3 text-secondary"/>
                        <span>Dirección</span>
                    </div>
                    <p className="mt-1 text-gray-800 font-medium">Av. Winston Churchill 1099, Santo Domingo, DN, República Dominicana</p>
                 </div>
                  <div>
                    <div className="flex items-center text-gray-600">
                        <Phone className="w-5 h-5 mr-3 text-secondary"/>
                        <span>Teléfono</span>
                    </div>
                    <p className="mt-1 text-gray-800 font-medium">(809) 555-1234</p>
                 </div>
                 <div>
                    <div className="flex items-center text-gray-600">
                        <Mail className="w-5 h-5 mr-3 text-secondary"/>
                        <span>Correo</span>
                    </div>
                    <p className="mt-1 text-gray-800 font-medium hover:underline"><a href="mailto:info@nominado.do">info@nominado.do</a></p>
                 </div>
            </div>
        </div>

      </main>
    </div>
  );
};

export default ContactPage;
