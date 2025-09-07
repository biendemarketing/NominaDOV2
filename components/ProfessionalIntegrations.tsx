import React from 'react';
import Card from './Card';
import { Plug } from './icons';

const ProfessionalIntegrations: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="font-heading text-3xl font-bold text-primary">Integraciones</h1>
      <p className="text-gray-500 mt-1">Conecta NominaDO con tus herramientas favoritas.</p>
      
      <Card className="mt-8">
         <h3 className="font-heading text-xl font-bold text-primary mb-6">Contabilidad</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 bg-light rounded-lg border">
                <div className="flex items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Intuit_QuickBooks_logo.svg/2560px-Intuit_QuickBooks_logo.svg.png" alt="QuickBooks" className="w-8 h-8 mr-4 object-contain" />
                    <div>
                        <p className="font-bold text-primary">QuickBooks</p>
                        <p className="text-xs text-green-600 font-semibold">Conectado</p>
                    </div>
                </div>
                <button className="font-semibold text-sm border bg-white border-gray-300 py-1 px-3 rounded-md hover:bg-gray-200">Gestionar</button>
            </div>
            <div className="flex items-center justify-between p-4 bg-light rounded-lg border">
                 <div className="flex items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Microsoft_Excel_2013-2019_logo.svg/2117px-Microsoft_Excel_2013-2019_logo.svg.png" alt="Excel" className="w-8 h-8 mr-4 object-contain" />
                    <div>
                        <p className="font-bold text-primary">Xero</p>
                        <p className="text-xs text-gray-500">Sincroniza tus asientos contables.</p>
                    </div>
                </div>
               <button className="font-semibold text-sm border bg-white border-gray-300 py-1 px-3 rounded-md hover:bg-gray-200">Conectar</button>
            </div>
         </div>
         <h3 className="font-heading text-xl font-bold text-primary mb-6 mt-8">Calendario</h3>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="flex items-center justify-between p-4 bg-light rounded-lg border">
                 <div className="flex items-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/1024px-Google_Calendar_icon_%282020%29.svg.png" alt="Google Calendar" className="w-8 h-8 mr-4 object-contain" />
                    <div>
                        <p className="font-bold text-primary">Google Calendar</p>
                        <p className="text-xs text-gray-500">Sincroniza fechas de pago y vacaciones.</p>
                    </div>
                </div>
               <button className="font-semibold text-sm border bg-white border-gray-300 py-1 px-3 rounded-md hover:bg-gray-200">Conectar</button>
            </div>
         </div>
      </Card>
    </div>
  );
};

export default ProfessionalIntegrations;
