import React from 'react';
// FIX: Changed import path to be explicit, pointing to the index file.
import { HelpArticle } from '../types/index';
import { ArrowLeft } from './icons';
import Card from './Card';

interface ArticlePageProps {
  article: HelpArticle;
  onBack: () => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article, onBack }) => {
    return (
        <div className="p-8">
            <button onClick={onBack} className="flex items-center text-secondary hover:text-secondary/80 font-semibold mb-6 p-1 rounded-md transition-colors hover:bg-secondary/10">
                <ArrowLeft className="w-5 h-5 mr-2" /> Volver al Centro de Ayuda
            </button>
            <Card>
                <p className="text-sm font-semibold text-secondary mb-2">{article.category}</p>
                <h1 className="font-heading text-3xl font-bold text-primary mb-6">{article.title}</h1>
                <div className="prose max-w-none text-gray-700">
                    <p>{article.content}</p>
                </div>
            </Card>
        </div>
    );
};

export default ArticlePage;