import { HelpArticle } from '../types/index';

export const MOCK_HELP_ARTICLES: HelpArticle[] = [
    { id: 'h-001', title: '¿Cómo correr mi primera nómina?', category: 'Primeros Pasos', content: 'Sigue nuestra guía paso a paso para configurar y procesar tu primera nómina quincenal o mensual en menos de 10 minutos.', tags: ['nomina', 'primera vez', 'tutorial'] },
    { id: 'h-002', title: 'Entendiendo el cálculo de ISR', category: 'Nómina', content: 'Explicamos cómo se calcula el Impuesto Sobre la Renta para asalariados y cómo la plataforma lo automatiza.', tags: ['isr', 'impuestos', 'dgii'] },
    { id: 'h-003', title: 'Generar el archivo para la TSS', category: 'Reportes', content: 'Aprende a generar el archivo de autodeterminación SUIR+ y subirlo a la plataforma de la TSS sin errores.', tags: ['tss', 'suir+', 'reportes'] },
];
