import React, { useState, useEffect, useRef } from 'react';
import { Map, Layers, Filter, Download, Search, Info } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export const FRAAtlas: React.FC = () => {
  const { t } = useLanguage();
  const mapRef = useRef<L.Map | null>(null);
  const [selectedFilters, setSelectedFilters] = useState({
    state: 'all',
    district: 'all',
    claimType: 'all',
    status: 'all'
  });
  const [activePanel, setActivePanel] = useState('overview');
  
  // Sample GeoJSON data (will be replaced with API calls)
  const sampleClaims = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          id: 1,
          claimType: "IFR",
          status: "Approved",
          area: 2.5,
          village: "Dhamtari"
        },
        geometry: {
          type: "Point",
          coordinates: [81.5, 20.7]
        }
      },
      {
        type: "Feature",
        properties: {
          id: 2,
          claimType: "CFR",
          status: "Pending",
          area: 15.8,
          village: "Kondagaon"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[81.6, 20.8], [81.65, 20.8], [81.65, 20.85], [81.6, 20.85], [81.6, 20.8]]]
        }
      },
      {
        type: "Feature",
        properties: {
          id: 3,
          claimType: "CR",
          status: "Rejected",
          area: 5.2,
          village: "Bastar"
        },
        geometry: {
          type: "Point",
          coordinates: [81.7, 20.9]
        }
      }
    ]
  };

  // Sample forest areas
  const forestAreas = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          id: 1,
          name: "Kanger Valley National Park",
          type: "Protected Forest"
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[81.8, 20.6], [82.0, 20.6], [82.0, 20.8], [81.8, 20.8], [81.8, 20.6]]]
        }
      }
    ]
  };

  // Sample village boundaries
  const villageBoundaries = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          id: 1,
          name: "Dhamtari",
          population: 14500
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[81.45, 20.65], [81.55, 20.65], [81.55, 20.75], [81.45, 20.75], [81.45, 20.65]]]
        }
      },
      {
        type: "Feature",
        properties: {
          id: 2,
          name: "Kondagaon",
          population: 8700
        },
        geometry: {
          type: "Polygon",
          coordinates: [[[81.55, 20.75], [81.7, 20.75], [81.7, 20.9], [81.55, 20.9], [81.55, 20.75]]]
        }
      }
    ]
  };
  
  // Initialize map when component mounts
  useEffect(() => {
    // Fix for default marker icons in Leaflet
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });

    // Initialize map if it doesn't exist
    if (!mapRef.current) {
      const map = L.map('map-container').setView([20.8, 81.6], 9);
      
      // Add base tile layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Add satellite layer
      const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
      });
      
      // Create layer groups for different data types
      const claimsLayer = L.geoJSON(sampleClaims as any, {
        style: (feature) => {
          const claimType = feature?.properties?.claimType;
          const status = feature?.properties?.status;
          
          let color = '#3388ff'; // Default blue
          
          if (claimType === 'IFR') color = '#1e40af'; // Blue
          else if (claimType === 'CFR') color = '#15803d'; // Green
          else if (claimType === 'CR') color = '#7e22ce'; // Purple
          
          if (status === 'Approved') return { color, fillColor: color, weight: 2, opacity: 1, fillOpacity: 0.5 };
          if (status === 'Pending') return { color, fillColor: color, weight: 2, opacity: 0.7, fillOpacity: 0.3, dashArray: '5, 5' };
          if (status === 'Rejected') return { color, fillColor: color, weight: 1, opacity: 0.5, fillOpacity: 0.1 };
          
          return { color, fillColor: color, weight: 2, opacity: 1, fillOpacity: 0.5 };
        },
        pointToLayer: (feature, latlng) => {
          return L.circleMarker(latlng, {
            radius: 8,
            fillColor: feature.properties.claimType === 'IFR' ? '#1e40af' : 
                      feature.properties.claimType === 'CFR' ? '#15803d' : '#7e22ce',
            color: "#000",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
          });
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties) {
            const { claimType, status, area, village } = feature.properties;
            layer.bindPopup(`
              <div class="text-sm">
                <div class="font-bold">${claimType} Claim</div>
                <div>Status: ${status}</div>
                <div>Area: ${area} hectares</div>
                <div>Village: ${village}</div>
              </div>
            `);
          }
        }
      }).addTo(map);
      
      const villagesLayer = L.geoJSON(villageBoundaries as any, {
        style: {
          color: '#d97706',
          fillColor: '#d97706',
          weight: 1,
          opacity: 0.8,
          fillOpacity: 0.1
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties) {
            const { name, population } = feature.properties;
            layer.bindPopup(`
              <div class="text-sm">
                <div class="font-bold">${name} Village</div>
                <div>Population: ${population}</div>
              </div>
            `);
          }
        }
      }).addTo(map);
      
      const forestLayer = L.geoJSON(forestAreas as any, {
        style: {
          color: '#047857',
          fillColor: '#047857',
          weight: 1,
          opacity: 0.8,
          fillOpacity: 0.2
        },
        onEachFeature: (feature, layer) => {
          if (feature.properties) {
            const { name, type } = feature.properties;
            layer.bindPopup(`
              <div class="text-sm">
                <div class="font-bold">${name}</div>
                <div>Type: ${type}</div>
              </div>
            `);
          }
        }
      }).addTo(map);
      
      // Add layer control
      const baseLayers = {
        "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }),
        "Satellite": satelliteLayer
      };
      
      const overlays = {
        "FRA Claims": claimsLayer,
        "Village Boundaries": villagesLayer,
        "Forest Areas": forestLayer
      };
      
      L.control.layers(baseLayers, overlays).addTo(map);
      
      // Add zoom controls
      document.getElementById('zoom-in')?.addEventListener('click', () => {
        map.zoomIn();
      });
      
      document.getElementById('zoom-out')?.addEventListener('click', () => {
        map.zoomOut();
      });
      
      // Store map reference
      mapRef.current = map;
    }
    
    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

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
              <div className="h-96 lg:h-[500px] relative">
                <div id="map-container" className="w-full h-full">
                  {/* Map will be rendered here using useEffect */}
                </div>
                {/* Map controls */}
                <div className="absolute top-4 right-4 space-y-2 z-[1000]">
                  <button id="zoom-in" className="w-10 h-10 bg-white shadow-md rounded flex items-center justify-center hover:bg-gray-50">+</button>
                  <button id="zoom-out" className="w-10 h-10 bg-white shadow-md rounded flex items-center justify-center hover:bg-gray-50">-</button>
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