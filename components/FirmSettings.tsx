import React from 'react';
import Card from './Card';
import { Settings } from './icons';

const FirmSettings: React.FC = () => {
    return (
        <div className="p-8">
            <h1 className="font-heading text-3xl font-bold text-primary">Configuración de la Firma</h1>
            <p className="text-gray-500 mt-1">Administra los detalles, facturación y equipo de tu firma.</p>
            
            <Card className="mt-8">
                <h2 className="font-heading text-xl font-bold text-primary mb-4">Perfil de la Firma</h2>
                <div className="text-center py-16 border-2 border-dashed rounded-lg">
                    <Settings className="w-12 h-12 mx-auto text-gray-300" />
                    <h3 className="mt-4 font-bold text-lg text-primary">Próximamente</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                        Estamos trabajando en esta sección para que pronto puedas gestionar el perfil de tu firma, 
                        los miembros de tu equipo y las opciones de facturación para tus clientes.
                    </p>
                </div>
            </Card>
        </div>
    );
};

export default FirmSettings;
