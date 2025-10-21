export type HelpArticleCategory = 'Primeros Pasos' | 'Nómina' | 'Reportes' | 'Empleados' | 'Configuración' | 'Facturación';

export interface HelpArticle {
  id: string;
  title: string;
  category: HelpArticleCategory;
  content: string;
  tags: string[];
}
