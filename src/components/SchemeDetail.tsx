import React from 'react';
import { useScheme } from '../contexts/SchemeContext';
import { Calendar, Users, Building, ArrowLeft, ExternalLink, Download, Bookmark, BookmarkCheck } from 'lucide-react';

interface SchemeDetailProps {
  scheme: any;
  onBack: () => void;
  isSaved: boolean;
  onToggleSave: (schemeId: string) => void;
}

const SchemeDetail: React.FC<SchemeDetailProps> = ({ 
  scheme, 
  onBack, 
  isSaved, 
  onToggleSave 
}) => {
  if (!scheme) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <button 
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to schemes
          </button>
        </div>
        <div className="text-center py-8">
          <p className="text-gray-500">Scheme not found or has been deleted.</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not specified';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to schemes
          </button>
          
          <button
            onClick={() => onToggleSave(scheme.id)}
            className={`flex items-center px-3 py-1.5 rounded-md ${
              isSaved 
                ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title={isSaved ? "Remove from saved" : "Save scheme"}
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-4 h-4 mr-1" />
                Saved
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 mr-1" />
                Save
              </>
            )}
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">{scheme.title}</h2>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-4 text-sm text-gray-500">
            {scheme.category && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800">
                {scheme.category}
              </span>
            )}
            
            {scheme.deadline && (
              <span className="inline-flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Deadline: {formatDate(scheme.deadline)}
              </span>
            )}
            
            {scheme.implementing_agency && (
              <span className="inline-flex items-center">
                <Building className="w-4 h-4 mr-1" />
                {scheme.implementing_agency}
              </span>
            )}
          </div>
          
          <p className="text-gray-700 whitespace-pre-line">{scheme.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Eligibility</h3>
            {scheme.eligibility ? (
              <div className="bg-gray-50 p-4 rounded-md">
                <div className="flex items-start mb-2">
                  <Users className="w-5 h-5 mr-2 text-blue-600 mt-0.5" />
                  <div>
                    {Array.isArray(scheme.eligibility) ? (
                      <ul className="list-disc list-inside space-y-1">
                        {scheme.eligibility.map((item: string, index: number) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>{scheme.eligibility}</p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 italic">No eligibility criteria specified</p>
            )}
          </div>
          
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Benefits</h3>
            {scheme.benefits ? (
              <div className="bg-gray-50 p-4 rounded-md">
                {Array.isArray(scheme.benefits) ? (
                  <ul className="list-disc list-inside space-y-1">
                    {scheme.benefits.map((benefit: string, index: number) => (
                      <li key={index} className="text-gray-700">{benefit}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">{scheme.benefits}</p>
                )}
              </div>
            ) : (
              <p className="text-gray-500 italic">No benefits specified</p>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">How to Apply</h3>
          {scheme.application_process ? (
            <div className="bg-gray-50 p-4 rounded-md">
              <ol className="list-decimal list-inside space-y-2">
                {Array.isArray(scheme.application_process) ? (
                  scheme.application_process.map((step: string, index: number) => (
                    <li key={index} className="text-gray-700">{step}</li>
                  ))
                ) : (
                  <li className="text-gray-700">{scheme.application_process}</li>
                )}
              </ol>
            </div>
          ) : (
            <p className="text-gray-500 italic">No application process specified</p>
          )}
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Required Documents</h3>
          {scheme.required_documents && scheme.required_documents.length > 0 ? (
            <div className="bg-gray-50 p-4 rounded-md">
              <ul className="list-disc list-inside space-y-1">
                {scheme.required_documents.map((doc: string, index: number) => (
                  <li key={index} className="text-gray-700">{doc}</li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-gray-500 italic">No document requirements specified</p>
          )}
        </div>
        
        {scheme.resources && scheme.resources.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Resources</h3>
            <div className="space-y-2">
              {scheme.resources.map((resource: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
                  <div className="flex items-center">
                    <Download className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="text-gray-800">{resource.title || `Resource ${index + 1}`}</span>
                  </div>
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {scheme.contact_info && (
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-2">Contact Information</h3>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-gray-700 whitespace-pre-line">{scheme.contact_info}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SchemeDetail;