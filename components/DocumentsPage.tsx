import React, { useState, useMemo } from 'react';
import Card from './Card';
import { Employee, EmployeeDocument } from '../types';
import { Search, UploadCloud, FileText, Trash2 } from './icons';
import UploadDocumentModal from './UploadDocumentModal';

interface DocumentsPageProps {
  documents: EmployeeDocument[];
  employees: Employee[];
  onAddNewDocument: (docData: Omit<EmployeeDocument, 'id' | 'uploadDate'>) => void;
  setDocuments: React.Dispatch<React.SetStateAction<EmployeeDocument[]>>;
}

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; count: number; }> = ({ label, isActive, onClick, count }) => (
    <button onClick={onClick} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors relative ${isActive ? 'bg-secondary text-white' : 'text-gray-500 hover:bg-gray-100'}`}>
        {label}
        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white text-secondary' : 'bg-gray-200 text-gray-600'}`}>{count}</span>
    </button>
);

const DocumentListItem: React.FC<{ doc: EmployeeDocument; onDelete: () => void; }> = ({ doc, onDelete }) => {
    const formatDate = (dateString: string) => new Date(dateString + 'T00:00:00').toLocaleDateString('es-DO');
    return (
        <div className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md">
            <div className="flex items-center flex-1 min-w-0">
                <FileText className="w-6 h-6 text-secondary mr-3 flex-shrink-0" />
                <div className="min-w-0">
                    <a href={doc.fileContent} target="_blank" rel="noopener noreferrer" className="font-semibold text-sm text-primary hover:underline truncate block">{doc.name}</a>
                    <p className="text-xs text-gray-500">
                        {doc.type} &middot; Subido el {formatDate(doc.uploadDate)}
                    </p>
                </div>
            </div>
            <div className="flex items-center space-x-2 ml-4">
                <button onClick={onDelete} className="text-gray-400 hover:text-red-500 p-1 rounded-md">
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};


const DocumentsPage: React.FC<DocumentsPageProps> = ({ documents, employees, onAddNewDocument, setDocuments }) => {
    const [activeTab, setActiveTab] = useState<'company' | 'employees'>('employees');
    const [searchTerm, setSearchTerm] = useState('');
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    
    const employeeMap = useMemo(() => new Map(employees.map(e => [e.id, e])), [employees]);

    const { companyDocs, employeeDocs } = useMemo(() => {
        const companyDocs = documents.filter(d => !d.employeeId);
        const employeeDocs = documents.filter(d => d.employeeId);
        return { companyDocs, employeeDocs };
    }, [documents]);

    const filteredDocs = useMemo(() => {
        const docsToFilter = activeTab === 'company' ? companyDocs : employeeDocs;
        if (!searchTerm) return docsToFilter;
        return docsToFilter.filter(doc => 
            doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            doc.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (doc.employeeId && employeeMap.get(doc.employeeId)?.name.toLowerCase().includes(searchTerm.toLowerCase()))
        );
    }, [activeTab, searchTerm, companyDocs, employeeDocs, employeeMap]);

    const employeeDocsGrouped = useMemo(() => {
        return filteredDocs.reduce((acc, doc) => {
            if (doc.employeeId) {
                if (!acc[doc.employeeId]) {
                    acc[doc.employeeId] = [];
                }
                acc[doc.employeeId].push(doc);
            }
            return acc;
        }, {} as Record<string, EmployeeDocument[]>);
    }, [filteredDocs]);


    const handleDeleteDocument = (docId: string) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este documento?')) {
            setDocuments(docs => docs.filter(doc => doc.id !== docId));
        }
    };
    
    const handleSaveNewDocument = (docData: Omit<EmployeeDocument, 'id' | 'uploadDate'>) => {
        onAddNewDocument(docData);
        setIsUploadModalOpen(false);
    };

    const renderEmployeeDocs = () => {
        const employeeIdsWithDocs = Object.keys(employeeDocsGrouped);

        if (employeeIdsWithDocs.length === 0) {
            return (
                <div className="text-center py-16 text-gray-500">
                    No se encontraron documentos para los empleados.
                </div>
            );
        }

        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {employeeIdsWithDocs.map(employeeId => {
                    const employee = employeeMap.get(employeeId);
                    const docs = employeeDocsGrouped[employeeId];
                    if (!employee) return null;

                    return (
                        <Card key={employeeId}>
                            <div className="flex items-center mb-4 pb-4 border-b">
                                <img src={employee.avatarUrl} alt={employee.name} className="w-12 h-12 rounded-full mr-4" />
                                <div>
                                    <p className="font-bold text-primary">{employee.name}</p>
                                    <p className="text-sm text-gray-500">{employee.position}</p>
                                </div>
                            </div>
                            <div className="space-y-2">
                                {docs.map(doc => (
                                    <DocumentListItem
                                        key={doc.id}
                                        doc={doc}
                                        onDelete={() => handleDeleteDocument(doc.id)}
                                    />
                                ))}
                            </div>
                        </Card>
                    );
                })}
            </div>
        )
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-heading text-3xl font-bold text-primary">Gestión de Documentos</h1>
                    <p className="text-gray-500 mt-1">Centraliza todos los archivos de tu empresa y empleados.</p>
                </div>
                <button onClick={() => setIsUploadModalOpen(true)} className="flex items-center bg-secondary text-white font-bold py-2 px-4 rounded-lg hover:bg-secondary/90 transition-all">
                    <UploadCloud className="w-5 h-5 mr-2" /> Subir Documento
                </button>
            </div>

            <Card className="mt-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                    <div className="flex items-center space-x-2 p-1 bg-light rounded-lg">
                        <TabButton label="Documentos de Empleados" isActive={activeTab === 'employees'} onClick={() => setActiveTab('employees')} count={employeeDocs.length} />
                        <TabButton label="Documentos de la Empresa" isActive={activeTab === 'company'} onClick={() => setActiveTab('company')} count={companyDocs.length} />
                    </div>
                     <div className="relative mt-4 md:mt-0">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por documento o empleado..."
                            className="pl-10 pr-4 py-2 w-full md:w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary/50 transition"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="space-y-3">
                    {activeTab === 'employees' && renderEmployeeDocs()}
                    {activeTab === 'company' && (
                        <div className="space-y-3">
                            {filteredDocs.map(doc => (
                                <Card key={doc.id} className="p-0">
                                <DocumentListItem 
                                    doc={doc}
                                    onDelete={() => handleDeleteDocument(doc.id)}
                                />
                                </Card>
                            ))}
                            {filteredDocs.length === 0 && (
                                <div className="text-center py-16 text-gray-500">
                                    No se encontraron documentos de la empresa.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </Card>
            
            <UploadDocumentModal 
                isOpen={isUploadModalOpen}
                onClose={() => setIsUploadModalOpen(false)}
                onSave={handleSaveNewDocument}
                employees={employees}
            />
        </div>
    );
};

export default DocumentsPage;