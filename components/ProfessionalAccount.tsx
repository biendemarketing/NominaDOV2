import React from 'react';
import Card from './Card';
// FIX: Changed import path to be explicit, pointing to index file.
import { MOCK_COMPANY_PROFILE } from '../constants/index';

const InfoItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-semibold text-primary text-md">{value}</p>
    </div>
);

const ProfessionalAccount: React.FC = () => {
    return (
        <div className="p-8">
            <h1 className="font-heading text-3xl font-bold text-primary">Cuenta Profesional</h1>
            <p className="text-gray-500 mt-1">Administra los detalles de tu cuenta y la configuración de seguridad.</p>
            
            <Card className="mt-8">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-heading text-xl font-bold text-primary">Perfil de la Cuenta</h3>
                     <button className="bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary/90 transition-all text-sm">Editar Información</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
                   <InfoItem label="Nombre de la Cuenta" value="Mi Firma Contable SRL" />
                   <InfoItem label="RNC" value={MOCK_COMPANY_PROFILE.rnc} />
                   <InfoItem label="Dirección" value={MOCK_COMPANY_PROFILE.address} />
                   <InfoItem label="Teléfono" value={MOCK_COMPANY_PROFILE.phone} />
                   <InfoItem label="Correo Electrónico Principal" value={MOCK_COMPANY_PROFILE.email} />
                   <InfoItem label="Sitio Web" value={MOCK_COMPANY_PROFILE.website} />
                </div>
            </Card>

            <Card className="mt-6">
                 <h3 className="font-heading text-xl font-bold text-primary mb-6">Seguridad</h3>
                 <div className="flex items-center justify-between p-4 bg-light rounded-lg border">
                    <div>
                        <p className="font-bold text-primary">Autenticación de dos factores (2FA)</p>
                        <p className="text-xs text-gray-500">Añade una capa extra de seguridad a tu cuenta.</p>
                    </div>
                    <button className="font-semibold text-sm border border-gray-300 py-1 px-3 rounded-md hover:bg-gray-200">Activar</button>
                </div>
            </Card>
        </div>
    );
};

export default ProfessionalAccount;
