import React, { useState } from 'react';
import { Gift, FileText, Download, ExternalLink, Search, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const SchemesBenefits: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const schemes = [
    {
      id: 1,
      name: 'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
      category: 'agriculture',
      description: 'Income support scheme for farmer families across the country',
      eligibility: 'Small and marginal farmer families with cultivable land up to 2 hectares',
      benefits: '₹6,000 per year in three equal installments',
      documents: ['Aadhaar Card', 'Bank Account Details', 'Land Records', 'FRA Title (if applicable)'],
      applicationLink: 'https://pmkisan.gov.in/',
      ministry: 'Ministry of Agriculture and Farmers Welfare'
    },
    {
      id: 2,
      name: 'Mahatma Gandhi National Rural Employment Guarantee Act (MGNREGA)',
      category: 'employment',
      description: 'Guaranteed 100 days of employment to rural households',
      eligibility: 'Adult members of rural households willing to do unskilled manual work',
      benefits: '₹220 per day (varies by state)',
      documents: ['Job Card', 'Aadhaar Card', 'Bank Account Details'],
      applicationLink: 'https://nrega.nic.in/',
      ministry: 'Ministry of Rural Development'
    },
    {
      id: 3,
      name: 'Pradhan Mantri Awas Yojana (PMAY) - Gramin',
      category: 'housing',
      description: 'Provide pucca houses to homeless and inadequately housed families',
      eligibility: 'Homeless families and families living in inadequate structures',
      benefits: '₹1.20 lakhs for plain areas, ₹1.30 lakhs for hilly areas',
      documents: ['Aadhaar Card', 'Bank Account Details', 'Income Certificate', 'Caste Certificate'],
      applicationLink: 'https://pmayg.nic.in/',
      ministry: 'Ministry of Rural Development'
    },
    {
      id: 4,
      name: 'Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
      category: 'health',
      description: 'Health insurance coverage for economically vulnerable families',
      eligibility: 'Families identified in SECC-2011 database',
      benefits: 'Health coverage up to ₹5 lakhs per family per year',
      documents: ['Ration Card', 'Aadhaar Card', 'Family ID'],
      applicationLink: 'https://pmjay.gov.in/',
      ministry: 'Ministry of Health and Family Welfare'
    },
    {
      id: 5,
      name: 'Forest Rights Act Implementation',
      category: 'tribal',
      description: 'Recognition of forest dwelling tribal communities and other traditional forest dwellers',
      eligibility: 'Tribal communities and other traditional forest dwellers',
      benefits: 'Land titles, community forest resource rights, livelihood security',
      documents: ['Evidence of Forest Dwelling', 'Community Certificate', 'Survey Settlement Records'],
      applicationLink: '/fra-atlas',
      ministry: 'Ministry of Tribal Affairs'
    },
    {
      id: 6,
      name: 'Pradhan Mantri Ujjwala Yojana',
      category: 'energy',
      description: 'Free LPG connections to women from BPL households',
      eligibility: 'Women belonging to BPL families',
      benefits: 'Free LPG connection with cooking gas stove and refill',
      documents: ['BPL Card', 'Aadhaar Card', 'Bank Account Details', 'Address Proof'],
      applicationLink: 'https://pmujjwalayojana.com/',
      ministry: 'Ministry of Petroleum and Natural Gas'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'agriculture', label: 'Agriculture' },
    { value: 'employment', label: 'Employment' },
    { value: 'housing', label: 'Housing' },
    { value: 'health', label: 'Health' },
    { value: 'tribal', label: 'Tribal Affairs' },
    { value: 'energy', label: 'Energy' }
  ];

  const guides = [
    {
      title: 'How to Apply for FRA Title',
      description: 'Step-by-step guide for Individual Forest Rights application',
      steps: 8,
      downloadUrl: '/guides/fra-application-guide.pdf'
    },
    {
      title: 'Document Checklist for Government Schemes',
      description: 'Complete list of required documents for major schemes',
      steps: 5,
      downloadUrl: '/guides/document-checklist.pdf'
    },
    {
      title: 'Community Forest Rights Process',
      description: 'Understanding CFR application and management',
      steps: 12,
      downloadUrl: '/guides/cfr-process-guide.pdf'
    },
    {
      title: 'Digital Services Access Guide',
      description: 'How to access government services online',
      steps: 6,
      downloadUrl: '/guides/digital-services-guide.pdf'
    }
  ];

  const filteredSchemes = schemes.filter(scheme => {
    const matchesSearch = scheme.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scheme.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || scheme.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      agriculture: 'bg-green-100 text-green-800',
      employment: 'bg-blue-100 text-blue-800',
      housing: 'bg-orange-100 text-orange-800',
      health: 'bg-red-100 text-red-800',
      tribal: 'bg-purple-100 text-purple-800',
      energy: 'bg-yellow-100 text-yellow-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div id="main-content" className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Schemes & Benefits</h1>
              <p className="text-gray-600">Government Schemes for Tribal Communities and Forest Rights Holders</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Schemes Catalog */}
        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Available Schemes ({filteredSchemes.length})</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {filteredSchemes.map((scheme) => (
                <div key={scheme.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 mb-2">{scheme.name}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(scheme.category)}`}>
                        {scheme.category}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{scheme.description}</p>

                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-gray-700 text-sm">Eligibility:</h4>
                      <p className="text-sm text-gray-600">{scheme.eligibility}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 text-sm">Benefits:</h4>
                      <p className="text-sm text-green-600 font-medium">{scheme.benefits}</p>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-700 text-sm">Required Documents:</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {scheme.documents.slice(0, 3).map((doc, index) => (
                          <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {doc}
                          </span>
                        ))}
                        {scheme.documents.length > 3 && (
                          <span className="text-xs text-gray-500">+{scheme.documents.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                    <span className="text-xs text-gray-500">{scheme.ministry}</span>
                    <a
                      href={scheme.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 text-green-600 hover:text-green-800 text-sm font-medium"
                    >
                      <span>Apply Now</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Application Guides */}
          <section>
            <h2 className="text-xl font-bold text-gray-800 mb-6">Application Guides & Checklists</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {guides.map((guide, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800 text-sm">{guide.title}</h3>
                      <p className="text-xs text-gray-500">{guide.steps} steps</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">{guide.description}</p>
                  <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors text-sm">
                    <Download className="w-4 h-4" />
                    <span>Download Guide</span>
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Help */}
          <section>
            <div className="bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg p-8">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-2xl font-bold mb-4">Need Help with Applications?</h2>
                <p className="text-lg mb-6">
                  Our support team can help you understand scheme eligibility and guide you through the application process.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Contact Support
                  </button>
                  <button className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
                    Schedule Consultation
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};