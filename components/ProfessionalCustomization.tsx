import React, { useState } from 'react';
import Card from './Card';
import { Palette } from './icons';

const ProfessionalCustomization: React.FC = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>('https://tailwindui.com/img/logos/48x48/statickit.svg');
  const [primaryColor, setPrimaryColor] = useState('#0A2540');

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8">
      <h1 className="font-heading text-3xl font-bold text-primary">Personalización (Marca Blanca)</h1>
      <p className="text-gray-500 mt-1">Ajusta la apariencia de la plataforma para que coincida con tu marca.</p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <Card>
          <h2 className="font-heading text-xl font-bold text-primary mb-4">Configuración de Marca</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-600">Logo de tu Cuenta</label>
              <div className="flex items-center space-x-4">
                {logoPreview && <img src={logoPreview} alt="Logo preview" className="w-16 h-16 object-contain border rounded-lg p-2 bg-light" />}
                <input type="file" id="logo-upload" className="hidden" onChange={handleLogoChange} accept="image/*" />
                <label htmlFor="logo-upload" className="cursor-pointer bg-white border border-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 text-sm font-semibold">
                  Cambiar Logo
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="primaryColor" className="block text-sm font-semibold mb-2 text-gray-600">Color Primario</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  id="primaryColor"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 border-none rounded-md cursor-pointer"
                />
                <input 
                    type="text"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-full px-4 py-2 bg-light border border-gray-300 rounded-lg"
                />
              </div>
            </div>
            <button className="w-full bg-secondary text-white font-bold py-3 rounded-lg hover:bg-secondary/90 transition-all">
              Guardar Cambios
            </button>
          </div>
        </Card>
        
        <Card>
           <h2 className="font-heading text-xl font-bold text-primary mb-4">Vista Previa</h2>
           <div className="border rounded-lg overflow-hidden">
               <div className="p-4 flex items-center" style={{ backgroundColor: primaryColor }}>
                    {logoPreview && <img src={logoPreview} alt="Logo" className="h-8 object-contain" />}
                    <span className="ml-3 text-white font-bold">Portal de Cliente</span>
               </div>
               <div className="p-4 bg-light">
                    <div className="bg-white p-4 rounded-md shadow-sm">
                        <p className="font-semibold" style={{ color: primaryColor }}>Bienvenido, Cliente XYZ</p>
                        <p className="text-sm text-gray-500">Aquí tienes un resumen de tu nómina.</p>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button className="py-2 px-4 rounded-md text-white text-sm font-semibold" style={{ backgroundColor: primaryColor }}>Ver Reporte</button>
                    </div>
               </div>
           </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfessionalCustomization;
