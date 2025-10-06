import React, { useState } from 'react';
import { FileText, Cpu, Satellite, CheckCircle, AlertCircle, Upload, Download } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const DigitizationAI: React.FC = () => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('docflow');

  const pipelineSteps = [
    {
      step: 1,
      title: 'Document Scanning',
      description: 'Physical FRA documents scanned at 300+ DPI resolution',
      status: 'completed',
      metrics: '85,000+ docs processed'
    },
    {
      step: 2,
      title: 'OCR Processing',
      description: 'Optical Character Recognition with 99.2% accuracy for printed text',
      status: 'active',
      metrics: '95% accuracy achieved'
    },
    {
      step: 3,
      title: 'NER Extraction',
      description: 'Named Entity Recognition extracts villages, names, coordinates, dates',
      status: 'active',
      metrics: '12 entity types identified'
    },
    {
      step: 4,
      title: 'Human Validation',
      description: 'Expert review and correction of extracted data',
      status: 'pending',
      metrics: '2-3 minutes per document'
    },
    {
      step: 5,
      title: 'Database Integration',
      description: 'Structured data stored in PostgreSQL/PostGIS database',
      status: 'pending',
      metrics: 'Real-time updates'
    }
  ];

  const modelCards = [
    {
      name: 'OCR Text Recognition',
      accuracy: '92.5%',
      dataset: 'Scanned FRA documents (5,000+ pages)',
      limitations: 'Handwritten text may require manual review',
      lastUpdated: '2024-10-25'
    },
    {
      name: 'Named Entity Recognition',
      accuracy: '87.3%',
      dataset: 'FRA claims with manual annotations',
      limitations: 'Village names with spelling variations',
      lastUpdated: '2024-11-05'
    },
    {
      name: 'Land Use Classification',
      accuracy: '89.8%',
      dataset: 'Satellite imagery (Sentinel-2, Landsat-8)',
      limitations: 'Cloud cover affects accuracy',
      lastUpdated: '2024-10-15'
    }
  ];

  const dataStandards = [
    {
      component: 'Database',
      technology: 'PostgreSQL 14 with PostGIS 3.2',
      description: 'Spatial database for storing claims, boundaries, and metadata'
    },
    {
      component: 'Web Services',
      technology: 'OGC WMS/WMTS/WFS',
      description: 'Standards-compliant map services for interoperability'
    },
    {
      component: 'Data Exchange',
      technology: 'GeoJSON, Shapefile, KML',
      description: 'Standard formats for data import/export'
    },
    {
      component: 'API Standards',
      technology: 'REST API with OpenAPI 3.0',
      description: 'Documented APIs for third-party integration'
    }
  ];

  const remoteSensingData = [
    {
      category: 'Forest Cover',
      source: 'Sentinel-2',
      resolution: '10m',
      frequency: 'Monthly',
      accuracy: '92%'
    },
    {
      category: 'Agricultural Land',
      source: 'Landsat-8',
      resolution: '30m',
      frequency: 'Bi-weekly',
      accuracy: '89%'
    },
    {
      category: 'Water Bodies',
      source: 'Sentinel-1 SAR',
      resolution: '10m',
      frequency: 'Weekly',
      accuracy: '95%'
    },
    {
      category: 'Settlement Areas',
      source: 'High-res Optical',
      resolution: '1m',
      frequency: 'Quarterly',
      accuracy: '97%'
    }
  ];

  return (
    <div id="main-content" className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">DocFlow & AssetSense</h1>
              <p className="text-gray-600">AI-Powered Document Processing & Remote Sensing</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex overflow-x-auto gap-2 border-b border-gray-200">
            {[
              { id: 'docflow', label: 'DocFlow OCR-NER', icon: FileText },
              { id: 'standards', label: 'Data Standards', icon: CheckCircle },
              { id: 'assetsense', label: 'AssetSense Remote Sensing', icon: Satellite }
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
        {/* DocFlow OCR-NER Pipeline */}
        {activeTab === 'docflow' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-6">DocFlow OCR-NER Pipeline</h2>
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <p className="text-gray-700 mb-6">
                  Turn scanned FRA documents into accurate, searchable records—extracting village names, 
                  title holders, coordinates, and claim status with human-verified quality.
                </p>
                
                {/* Pipeline Flow */}
                <div className="space-y-4">
                  {pipelineSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        step.status === 'completed' ? 'bg-green-500 text-white' :
                        step.status === 'active' ? 'bg-blue-500 text-white' :
                        'bg-gray-300 text-gray-600'
                      }`}>
                        {step.status === 'completed' ? <CheckCircle className="w-4 h-4" /> : step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-gray-800">{step.title}</h3>
                          <span className="text-sm text-gray-500">{step.metrics}</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                        <div className={`mt-2 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          step.status === 'completed' ? 'bg-green-100 text-green-800' :
                          step.status === 'active' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {step.status === 'completed' ? 'Completed' :
                           step.status === 'active' ? 'In Progress' : 'Pending'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Model Cards */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">AI Model Performance</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {modelCards.map((model, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <h4 className="font-semibold text-gray-800 mb-3">{model.name}</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Accuracy:</span>
                        <span className="text-sm font-medium text-green-600">{model.accuracy}</span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Dataset:</span>
                        <p className="text-sm text-gray-800 mt-1">{model.dataset}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Limitations:</span>
                        <p className="text-sm text-amber-700 mt-1 flex items-start space-x-1">
                          <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                          <span>{model.limitations}</span>
                        </p>
                      </div>
                      <div className="pt-2 border-t">
                        <span className="text-xs text-gray-500">Updated: {model.lastUpdated}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Document Upload Demo */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Document Processing Demo</h3>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-gray-700 mb-2">Upload FRA Document</h4>
                  <p className="text-sm text-gray-500 mb-4">
                    Demo version processes sample documents. Full system requires official access.
                  </p>
                  <button className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors">
                    Try Sample Processing
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Data Standards */}
        {activeTab === 'standards' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Data Standards & Architecture</h2>
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <p className="text-gray-700 mb-6">
                  Sanjivani follows open standards and best practices for data storage, 
                  web services, and interoperability to ensure long-term sustainability and integration.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {dataStandards.map((standard, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-1">{standard.component}</h3>
                        <p className="text-sm font-medium text-blue-600 mb-2">{standard.technology}</p>
                        <p className="text-sm text-gray-600">{standard.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* API Documentation */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">API Documentation</h3>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                    <div>
                      <h4 className="font-medium text-gray-800">Claims API</h4>
                      <p className="text-sm text-gray-600">Access FRA claims data with filtering and pagination</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                      View Docs
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                    <div>
                      <h4 className="font-medium text-gray-800">Map Services</h4>
                      <p className="text-sm text-gray-600">OGC-compliant WMS/WMTS endpoints for GIS integration</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                      View Docs
                    </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded">
                    <div>
                      <h4 className="font-medium text-gray-800">Analytics API</h4>
                      <p className="text-sm text-gray-600">Statistical data and insights for reporting</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm">
                      View Docs
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* AssetSense Remote Sensing */}
        {activeTab === 'assetsense' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-6">AssetSense Remote Sensing</h2>
              <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                <p className="text-gray-700 mb-6">
                  Land use classification and change detection using satellite imagery to monitor 
                  forest cover, agricultural activities, and settlement patterns in FRA areas.
                </p>
              </div>

              {/* Remote Sensing Data Sources */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Data Sources & Accuracy</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-semibold text-gray-800">Land Use Category</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-800">Satellite Source</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-800">Resolution</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-800">Update Frequency</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-800">Accuracy</th>
                      </tr>
                    </thead>
                    <tbody>
                      {remoteSensingData.map((data, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 px-4 font-medium text-gray-800">{data.category}</td>
                          <td className="py-3 px-4 text-gray-600">{data.source}</td>
                          <td className="py-3 px-4 text-gray-600">{data.resolution}</td>
                          <td className="py-3 px-4 text-gray-600">{data.frequency}</td>
                          <td className="py-3 px-4">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {data.accuracy}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Change Detection */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Forest Cover Change</h3>
                  <div className="h-48 bg-gradient-to-br from-green-100 to-green-200 rounded flex items-center justify-center mb-4">
                    <div className="text-center text-green-700">
                      <Satellite className="w-8 h-8 mx-auto mb-2" />
                      <div className="text-sm">Change Detection Map</div>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Forest Gain (2024):</span>
                      <span className="font-medium text-green-600">+850 ha</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Forest Loss (2024):</span>
                      <span className="font-medium text-red-600">-420 ha</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Net Change:</span>
                      <span className="font-medium text-green-600">+430 ha</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Land Use Classification</h3>
                  <div className="space-y-3">
                    {[
                      { category: 'Dense Forest', percentage: 45, color: 'bg-green-600' },
                      { category: 'Open Forest', percentage: 25, color: 'bg-green-400' },
                      { category: 'Agricultural Land', percentage: 20, color: 'bg-yellow-500' },
                      { category: 'Water Bodies', percentage: 5, color: 'bg-blue-500' },
                      { category: 'Settlement Areas', percentage: 3, color: 'bg-red-500' },
                      { category: 'Other', percentage: 2, color: 'bg-gray-400' }
                    ].map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`w-4 h-4 ${item.color} rounded`}></div>
                        <span className="text-sm text-gray-700 flex-1">{item.category}</span>
                        <span className="text-sm font-medium text-gray-800">{item.percentage}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Download Options */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Download Satellite Data</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                    <Download className="w-5 h-5 text-green-600" />
                    <span>Land Use Maps (GeoTIFF)</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                    <Download className="w-5 h-5 text-blue-600" />
                    <span>Change Detection (Shapefile)</span>
                  </button>
                  <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                    <Download className="w-5 h-5 text-purple-600" />
                    <span>Analysis Report (PDF)</span>
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