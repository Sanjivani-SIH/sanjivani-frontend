import React, { useState } from 'react';
import { FileText, Download, ExternalLink, BookOpen, Database, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Resources: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('documentation');

  const documentation = [
    {
      title: 'The Scheduled Tribes and Other Traditional Forest Dwellers (Recognition of Forest Rights) Act, 2006',
      description: 'Complete text of the Forest Rights Act with amendments',
      type: 'Legal Document',
      size: '2.5 MB',
      format: 'PDF',
      downloadUrl: '/docs/fra-act-2006.pdf'
    },
    {
      title: 'FRA Rules 2008 & Amendments',
      description: 'Detailed implementation rules and recent amendments',
      type: 'Guidelines',
      size: '1.8 MB',
      format: 'PDF',
      downloadUrl: '/docs/fra-rules-2008.pdf'
    },
    {
      title: 'Ministry of Tribal Affairs Guidelines',
      description: 'Official guidelines for FRA implementation',
      type: 'Guidelines',
      size: '3.2 MB',
      format: 'PDF',
      downloadUrl: '/docs/mota-guidelines.pdf'
    },
    {
      title: 'Data Standards Documentation',
      description: 'Technical specifications for data formats and API integration',
      type: 'Technical',
      size: '1.5 MB',
      format: 'PDF',
      downloadUrl: '/docs/data-standards.pdf'
    },
    {
      title: 'User Manual - WebGIS Portal',
      description: 'Complete guide for using the FRA Atlas mapping interface',
      type: 'User Guide',
      size: '4.1 MB',
      format: 'PDF',
      downloadUrl: '/docs/webgis-user-manual.pdf'
    }
  ];

  const caseStudies = [
    {
      title: 'Successful CFR Implementation in Gadchiroli, Maharashtra',
      summary: 'How community forest rights transformed forest governance in 127 villages',
      author: 'Dr. Neema Pathak-Broome, Kalpavriksh',
      year: '2023',
      impact: '50,000 hectares under community management',
      downloadUrl: '/studies/gadchiroli-cfr-success.pdf'
    },
    {
      title: 'Digital Documentation Impact Study - Madhya Pradesh',
      summary: 'Analysis of processing time reduction through AI-powered document digitization',
      author: 'Indian Institute of Science, Bangalore',
      year: '2025',
      impact: '65% reduction in verification time',
      downloadUrl: '/studies/mp-digitization-impact.pdf'
    },
    {
      title: 'Livelihood Enhancement through FRA in Odisha Tribal Areas',
      summary: 'Economic impact assessment of forest rights on tribal communities',
      author: 'Centre for Budget and Governance Accountability',
      year: '2023',
      impact: '30% increase in household income',
      downloadUrl: '/studies/odisha-livelihood-study.pdf'
    },
    {
      title: 'Remote Sensing for Forest Monitoring: Telangana Case Study',
      summary: 'Using satellite imagery to monitor forest cover changes in FRA areas',
      author: 'National Remote Sensing Centre, ISRO',
      year: '2025',
      impact: '95% accuracy in change detection',
      downloadUrl: '/studies/telangana-remote-sensing.pdf'
    }
  ];

  const datasets = [
    {
      name: 'State-wise FRA Claims Summary',
      description: 'Aggregated statistics of claims submitted, verified, and granted across states',
      format: 'CSV, JSON',
      lastUpdated: '2024-10-20',
      records: '2K+ records',
      apiEndpoint: '/api/v1/claims/summary'
    },
    {
      name: 'District-wise Progress Indicators',
      description: 'District-level performance metrics and progress tracking data',
      format: 'CSV, XLSX',
      lastUpdated: '2024-11-05',
      records: '25+ districts',
      apiEndpoint: '/api/v1/districts/progress'
    },
    {
      name: 'Forest Cover Change Data',
      description: 'Satellite-derived forest cover changes in FRA implementation areas',
      format: 'GeoJSON, Shapefile',
      lastUpdated: '2024-10-15',
      records: '10K+ polygons',
      apiEndpoint: '/api/v1/forest/changes'
    },
    {
      name: 'Scheme Beneficiary Mapping',
      description: 'Anonymized mapping of FRA holders to applicable government schemes',
      format: 'CSV, JSON',
      lastUpdated: '2024-11-08',
      records: '500+ beneficiaries',
      apiEndpoint: '/api/v1/schemes/mapping'
    }
  ];

  const researchPapers = [
    {
      title: 'Digital Transformation of Forest Rights Administration in India',
      authors: 'Dr. Anjali Sharma, Prof. R.K. Singh',
      journal: 'Indian Journal of Public Administration',
      year: '2025',
      citation: 'Sharma, A., & Singh, R.K. (2025). Digital Transformation of Forest Rights Administration in India. Indian Journal of Public Administration, 71(1), 45-62.',
      doi: '10.1177/001955612025001',
      abstract: 'This paper examines the digital transformation of forest rights administration through the FRA portal, analyzing its impact on efficiency, transparency, and beneficiary satisfaction.'
    },
    {
      title: 'AI-Powered Document Processing for Forest Rights Claims',
      authors: 'Dr. Priya Venkataraman, Dr. Arjun Reddy',
      journal: 'International Journal of AI in Governance',
      year: '2023',
      citation: 'Venkataraman, P., & Reddy, A. (2023). AI-Powered Document Processing for Forest Rights Claims. International Journal of AI in Governance, 12(2), 89-104.',
      doi: '10.1007/s12345-023-0098',
      abstract: 'A comprehensive analysis of machine learning algorithms used for automated document processing and verification in forest rights administration.'
    },
    {
      title: 'Remote Sensing Applications in Forest Rights Monitoring',
      authors: 'Dr. Meenakshi Patel, Dr. Sanjay Kumar',
      journal: 'Journal of Remote Sensing Applications',
      year: '2025',
      citation: 'Patel, M., & Kumar, S. (2025). Remote Sensing Applications in Forest Rights Monitoring. Journal of Remote Sensing Applications, 16(3), 201-218.',
      doi: '10.1080/17538947.2025.123456',
      abstract: 'This study explores the integration of satellite remote sensing technology for monitoring forest cover changes and validating forest rights claims.'
    }
  ];

  const getDocTypeColor = (type: string) => {
    const colors = {
      'Legal Document': 'bg-red-100 text-red-800',
      'Guidelines': 'bg-blue-100 text-blue-800',
      'Technical': 'bg-green-100 text-green-800',
      'User Guide': 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div id="main-content" className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Resources</h1>
              <p className="text-gray-600">Documentation, Data, Research & Case Studies</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex overflow-x-auto gap-2 border-b border-gray-200">
            {[
              { id: 'documentation', label: 'Documentation & Guidelines', icon: FileText },
              { id: 'studies', label: 'Case Studies & Research', icon: BookOpen },
              { id: 'data', label: 'Open Data', icon: Database }
            ].map(tab => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-4 font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'text-orange-600 border-b-2 border-orange-500'
                      : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Documentation & Guidelines */}
        {activeTab === 'documentation' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Official Documentation</h2>
              <div className="space-y-4">
                {documentation.map((doc, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <FileText className="w-5 h-5 text-gray-400" />
                        <h3 className="font-semibold text-gray-800">{doc.title}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDocTypeColor(doc.type)}`}>
                          {doc.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{doc.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Size: {doc.size}</span>
                        <span>Format: {doc.format}</span>
                      </div>
                    </div>
                    <div className="ml-6">
                      <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Quick Links */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
              <div className="grid md:grid-cols-3 gap-4">
                <a
                  href="https://tribal.nic.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div>
                    <h4 className="font-medium text-gray-800">Ministry of Tribal Affairs</h4>
                    <p className="text-sm text-gray-600">Official MoTA portal</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
                <a
                  href="https://forestrightsact.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div>
                    <h4 className="font-medium text-gray-800">FRA Resource Portal</h4>
                    <p className="text-sm text-gray-600">Community resources</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
                <a
                  href="https://prs.gov.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
                >
                  <div>
                    <h4 className="font-medium text-gray-800">Policy Research</h4>
                    <p className="text-sm text-gray-600">Legislative analysis</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-gray-400" />
                </a>
              </div>
            </section>
          </div>
        )}

        {/* Case Studies & Research */}
        {activeTab === 'studies' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Case Studies</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {caseStudies.map((study, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-semibold text-gray-800 mb-3">{study.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{study.summary}</p>
                    <div className="space-y-2 mb-4">
                      <div className="text-xs text-gray-500">
                        <strong>Author:</strong> {study.author}
                      </div>
                      <div className="text-xs text-gray-500">
                        <strong>Year:</strong> {study.year}
                      </div>
                      <div className="text-xs text-green-600">
                        <strong>Impact:</strong> {study.impact}
                      </div>
                    </div>
                    <button className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors text-sm">
                      <Download className="w-4 h-4" />
                      <span>Download Case Study</span>
                    </button>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Research Publications</h2>
              <div className="space-y-4">
                {researchPapers.map((paper, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="font-semibold text-gray-800 mb-2">{paper.title}</h3>
                    <div className="text-sm text-gray-600 mb-2">
                      {paper.authors} • {paper.journal} ({paper.year})
                    </div>
                    <div className="text-xs text-blue-600 mb-3">{paper.citation}</div>
                    <p className="text-sm text-gray-700 mb-4">{paper.abstract}</p>
                    <div className="flex items-center space-x-3">
                      <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 text-sm">
                        <ExternalLink className="w-3 h-3" />
                        <span>View Full Paper</span>
                      </button>
                      <button className="flex items-center space-x-1 text-green-600 hover:text-green-800 text-sm">
                        <Download className="w-3 h-3" />
                        <span>Download PDF</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* Open Data */}
        {activeTab === 'data' && (
          <div className="space-y-8">
            <section>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h2 className="font-semibold text-blue-800 mb-2">Open Data Access</h2>
                <p className="text-sm text-blue-700">
                  Access anonymized, aggregated data for research and analysis. All datasets follow government 
                  open data policies and privacy guidelines.
                </p>
              </div>

              <div className="space-y-6">
                {datasets.map((dataset, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">{dataset.name}</h3>
                        <p className="text-sm text-gray-600 mb-3">{dataset.description}</p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Format:</span>
                            <div className="font-medium">{dataset.format}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Updated:</span>
                            <div className="font-medium">{dataset.lastUpdated}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">Records:</span>
                            <div className="font-medium">{dataset.records}</div>
                          </div>
                          <div>
                            <span className="text-gray-500">API:</span>
                            <div className="font-medium text-blue-600">Available</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 pt-4 border-t border-gray-200">
                      <button className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors text-sm">
                        <Download className="w-4 h-4" />
                        <span>Download Dataset</span>
                      </button>
                      <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors text-sm">
                        <Database className="w-4 h-4" />
                        <span>API Documentation</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* API Information */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">API Access</h3>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Rate Limits</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• 1000 requests per hour (anonymous)</li>
                      <li>• 5000 requests per hour (registered)</li>
                      <li>• Bulk access available for researchers</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-3">Authentication</h4>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• API key required for registered users</li>
                      <li>• OAuth 2.0 for secure access</li>
                      <li>• Rate limiting based on user tier</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
                    Request API Access
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};