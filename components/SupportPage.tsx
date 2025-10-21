import React, { useState, useMemo } from 'react';
// FIX: Changed import path to be explicit, pointing to the index file.
import { AuthView, HelpArticle, HelpArticleCategory } from '../types/index';
import { HandCoins, Search, BookOpen, DollarSign, FileText, Settings, MessageSquare, Phone, Users, ArrowRight } from './icons';

interface HelpCenterProps {
  articles: HelpArticle[];
  onSelectArticle: (articleId: string) => void;
  setAuthView?: (view: AuthView) => void; // Optional for authenticated view
}

const categories: { name: HelpArticleCategory; icon: React.ReactNode; description: string }[] = [
    { name: 'Primeros Pasos', icon: <BookOpen className="w-6 h-6 text-secondary"/>, description: 'Configura tu cuenta y empieza a usar NominaDO.' },
    { name: 'Nómina', icon: <DollarSign className="w-6 h-6 text-secondary"/>, description: 'Procesa nóminas regulares, especiales y más.' },
    { name: 'Reportes', icon: <FileText className="w-6 h-6 text-secondary"/>, description: 'Genera archivos para TSS, DGII y Ministerio de Trabajo.' },
    { name: 'Empleados', icon: <Users className="w-6 h-6 text-secondary"/>, description: 'Gestiona perfiles, contratos y documentos.' },
    { name: 'Configuración', icon: <Settings className="w-6 h-6 text-secondary"/>, description: 'Administra tu cuenta, roles e integraciones.' },
    { name: 'Facturación', icon: <HandCoins className="w-6 h-6 text-secondary"/>, description: 'Entiende tu plan, facturas y métodos de pago.' },
];

const SupportCategoryCard: React.FC<{ icon: React.ReactNode; title: string; description: string; onClick: () => void; isSelected: boolean; }> = ({ icon, title, description, onClick, isSelected }) => (
  <button onClick={onClick} className={`bg-white p-6 rounded-xl border-2 text-left ${isSelected ? 'border-secondary shadow-lg' : 'border-gray-200/80 shadow-sm'} transition-all hover:shadow-lg hover:-translate-y-1`}>
    <div className="flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-lg mb-4">
      {icon}
    </div>
    <h3 className="font-heading text-xl font-bold text-primary mb-2">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </button>
);

const SupportPage: React.FC<HelpCenterProps> = ({ articles, onSelectArticle, setAuthView }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<HelpArticleCategory | null>(null);

    const filteredArticles = useMemo(() => {
        return articles.filter(article => {
            const matchesCategory = !selectedCategory || article.category === selectedCategory;
            const matchesSearch = searchTerm.length < 2 || 
                                  article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                  article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            return matchesCategory && matchesSearch;
        });
    }, [articles, searchTerm, selectedCategory]);

    const handleCategoryClick = (category: HelpArticleCategory) => {
        setSelectedCategory(prev => prev === category ? null : category);
    }

  return (
    <div className="bg-light min-h-screen">
      {setAuthView && (
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
      )}

      <main className={`container mx-auto p-6 md:p-8 ${!setAuthView ? 'pt-0' : ''}`}>
        <div className="text-center mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary">Centro de Ayuda</h1>
          <p className="text-gray-600 mt-4 text-lg max-w-3xl mx-auto">¿Cómo podemos ayudarte? Busca en nuestra base de conocimientos o contáctanos.</p>
          <div className="mt-8 max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Buscar artículos (ej: 'cómo calcular regalía')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-secondary/50 transition"
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
            <h2 className="font-heading text-2xl font-bold text-primary mb-6 text-center">Explorar por categoría</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {categories.map(cat => (
                    <SupportCategoryCard 
                        key={cat.name}
                        icon={cat.icon}
                        title={cat.name}
                        description={cat.description}
                        onClick={() => handleCategoryClick(cat.name)}
                        isSelected={selectedCategory === cat.name}
                    />
                ))}
            </div>
            
            <div className="mt-16">
                 <h2 className="font-heading text-2xl font-bold text-primary mb-6">
                    {selectedCategory ? `Artículos en ${selectedCategory}` : 'Todos los Artículos'}
                 </h2>
                 <div className="bg-white p-4 rounded-lg border shadow-sm space-y-2">
                    {filteredArticles.length > 0 ? filteredArticles.map(article => (
                        <button key={article.id} onClick={() => onSelectArticle(article.id)} className="w-full text-left flex justify-between items-center p-4 rounded-md hover:bg-light transition-colors">
                            <div>
                                <p className="font-semibold text-primary">{article.title}</p>
                                <p className="text-sm text-gray-500">{article.category}</p>
                            </div>
                            <ArrowRight className="w-5 h-5 text-secondary flex-shrink-0" />
                        </button>
                    )) : (
                        <p className="text-center text-gray-500 py-8">No se encontraron artículos que coincidan con tu búsqueda.</p>
                    )}
                 </div>
            </div>

            <div className="mt-20 text-center">
                <h2 className="font-heading text-3xl font-bold text-primary">¿No encuentras lo que buscas?</h2>
                <p className="text-gray-600 mt-3 max-w-2xl mx-auto">Nuestro equipo de soporte está listo para asistirte. Elige tu método de contacto preferido.</p>
                 <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <div className="bg-white p-6 rounded-lg border shadow-sm text-left">
                        <div className="flex items-center mb-2">
                            <MessageSquare className="w-6 h-6 text-secondary" />
                            <h3 className="ml-3 font-heading text-xl font-bold text-primary">Abrir un Ticket</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Para consultas detalladas, la mejor opción. Te responderemos por email.</p>
                        <a href="mailto:soporte@nominado.do" className="font-semibold text-secondary hover:underline">Enviar una solicitud &rarr;</a>
                    </div>
                     <div className="bg-white p-6 rounded-lg border shadow-sm text-left">
                        <div className="flex items-center mb-2">
                            <Phone className="w-6 h-6 text-secondary" />
                            <h3 className="ml-3 font-heading text-xl font-bold text-primary">Llámanos</h3>
                        </div>
                        <p className="text-gray-600 mb-4">Habla directamente con un especialista de soporte. L-V, 9am-5pm AST.</p>
                        <a href="tel:+18095551234" className="font-semibold text-secondary hover:underline">(809) 555-1234 &rarr;</a>
                    </div>
                 </div>
            </div>
        </div>
      </main>
    </div>
  );
};

export default SupportPage;