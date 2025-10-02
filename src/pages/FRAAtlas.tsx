import React, { useState } from 'react';
import { Map, Layers, Filter, Download, Search, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const FRAAtlas: React.FC = () => {
  const { t } = useLanguage();
  const [selectedFilters, setSelectedFilters] = useState({
    state: 'all',
    district: 'all',
    claimType: 'all',
    status: 'all'
  });
  const [activePanel, setActivePanel] = useState('overview');

  const filterOptions = {
    states: [
      { value: 'all', label: 'All States' },
      { value: 'mp', label: 'Madhya Pradesh' },
      { value: 'tripura', label: 'Tripura' },
      { value: 'odisha', label: 'Odisha' },
      { value: 'telangana', label: 'Telangana' }
    ],
    claimTypes: [
      { value: 'all', label: 'All Types' },
      { value: 'ifr', label: 'Individual Forest Rights (IFR)' },
      { value: 'cfr', label: 'Community Forest Rights (CFR)' },
      { value: 'cr', label: 'Community Rights (CR)' }
    ],
    statuses: [
      { value: 'all', label: 'All Status' },
      { value: 'pending', label: 'Pending Verification' },
      { value: 'approved', label: 'Approved' },
      { value: 'rejected', label: 'Rejected' },
      { value: 'granted', label: 'Title Granted' }
    ]
  };

  const overviewData = {
    totalClaims: '31,200',
    approved: '18,450',
    pending: '8,750',
    rejected: '4,000',
    coverageArea: '2.45M hectares',
    villages: '2,500+'
  };

  const tableData = [
    { district: 'Bastar', state: 'MP', ifr: 450, cfr: 120, cr: 80, approved: 380, pending: 270 },
    { district: 'Dantewada', state: 'MP', ifr: 320, cfr: 90, cr: 60, approved: 280, pending: 190 },
    { district: 'West Tripura', state: 'Tripura', ifr: 180, cfr: 45, cr: 35, approved: 160, pending: 100 },
    { district: 'Mayurbhanj', state: 'Odisha', ifr: 520, cfr: 140, cr: 90, approved: 450, pending: 300 },
    { district: 'Adilabad', state: 'Telangana', ifr: 380, cfr: 110, cr: 70, approved: 340, pending: 220 }
  ];

  return (
    <div id="main-content" className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <Map className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">RightsView WebGIS</h1>
                <p className="text-gray-600">Interactive FRA Atlas with IFR/CR/CFR Visualizations</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Map</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                <Info className="w-4 h-4" />
                <span>Help</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-80 space-y-6">
            {/* Search */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Search className="w-5 h-5 mr-2" />
                Search Location
              </h3>
              <input
                type="text"
                placeholder="Enter village, district, or coordinates..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filters */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filter Data
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <select
                    value={selectedFilters.state}
                    onChange={(e) => setSelectedFilters({...selectedFilters, state: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {filterOptions.states.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Claim Type</label>
                  <select
                    value={selectedFilters.claimType}
                    onChange={(e) => setSelectedFilters({...selectedFilters, claimType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {filterOptions.claimTypes.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={selectedFilters.status}
                    onChange={(e) => setSelectedFilters({...selectedFilters, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {filterOptions.statuses.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Layer Control */}
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Layers className="w-5 h-5 mr-2" />
                Map Layers
              </h3>
              <div className="space-y-2">
                {[
                  { id: 'ifr', label: 'IFR Claims', color: 'bg-blue-500' },
                  { id: 'cfr', label: 'CFR Claims', color: 'bg-green-500' },
                  { id: 'cr', label: 'CR Claims', color: 'bg-purple-500' },
                  { id: 'villages', label: 'Village Boundaries', color: 'bg-orange-500' },
                  { id: 'forest', label: 'Forest Areas', color: 'bg-emerald-500' }
                ].map(layer => (
                  <label key={layer.id} className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded" />
                    <div className={`w-4 h-4 ${layer.color} rounded`}></div>
                    <span className="text-sm text-gray-700">{layer.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Map Container */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-96 lg:h-[500px] bg-gradient-to-br from-green-50 to-blue-50 relative flex items-center justify-center">
                <div className="text-center">
                  <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">Interactive WebGIS Map</h3>
                  <p className="text-sm text-gray-500 max-w-md">
                    Real WebGIS implementation would integrate here using Leaflet/OpenLayers
                    with OGC WMS/WMTS layers for IFR, CFR, and CR claims visualization
                  </p>
                </div>
                {/* Map controls */}
                <div className="absolute top-4 right-4 space-y-2">
                  <button className="w-10 h-10 bg-white shadow-md rounded flex items-center justify-center hover:bg-gray-50">+</button>
                  <button className="w-10 h-10 bg-white shadow-md rounded flex items-center justify-center hover:bg-gray-50">-</button>
                </div>
              </div>
            </div>

            {/* Data Panels */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'timeline', label: 'Progress Timeline' },
                    { id: 'datatable', label: 'Data Table' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setActivePanel(tab.id)}
                      className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                        activePanel === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activePanel === 'overview' && (
                  <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{overviewData.totalClaims}</div>
                      <div className="text-sm text-gray-600">Total Claims</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{overviewData.approved}</div>
                      <div className="text-sm text-gray-600">Approved</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{overviewData.pending}</div>
                      <div className="text-sm text-gray-600">Pending</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{overviewData.rejected}</div>
                      <div className="text-sm text-gray-600">Rejected</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{overviewData.coverageArea}</div>
                      <div className="text-sm text-gray-600">Area Covered</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-teal-600">{overviewData.villages}</div>
                      <div className="text-sm text-gray-600">Villages</div>
                    </div>
                  </div>
                )}

                {activePanel === 'timeline' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-800">Claims Progress Over Time</h4>
                      <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                        <option>Last 12 months</option>
                        <option>Last 6 months</option>
                        <option>Last 3 months</option>
                      </select>
                    </div>
                    <div className="h-64 bg-gray-50 rounded flex items-center justify-center">
                      <div className="text-center text-gray-500">
                        <div className="text-sm">Timeline Chart Placeholder</div>
                        <div className="text-xs mt-1">Interactive timeline would show claims processing over time</div>
                      </div>
                    </div>
                  </div>
                )}

                {activePanel === 'datatable' && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-gray-800">District-wise Claims Summary</h4>
                      <div className="flex items-center space-x-2">
                        <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                          CSV
                        </button>
                        <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                          PDF
                        </button>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse border border-gray-300">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-300 px-4 py-2 text-left">District</th>
                            <th className="border border-gray-300 px-4 py-2 text-left">State</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">IFR</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">CFR</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">CR</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Approved</th>
                            <th className="border border-gray-300 px-4 py-2 text-center">Pending</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tableData.map((row, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="border border-gray-300 px-4 py-2 font-medium">{row.district}</td>
                              <td className="border border-gray-300 px-4 py-2">{row.state}</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">{row.ifr}</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">{row.cfr}</td>
                              <td className="border border-gray-300 px-4 py-2 text-center">{row.cr}</td>
                              <td className="border border-gray-300 px-4 py-2 text-center text-green-600 font-medium">{row.approved}</td>
                              <td className="border border-gray-300 px-4 py-2 text-center text-orange-600 font-medium">{row.pending}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};