import React, { useState } from 'react';
import { BarChart, TrendingUp, Users, Clock, MapPin, Download, Filter } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const InsightsDashboard: React.FC = () => {
  const { t } = useLanguage();
  const [selectedTimeframe, setSelectedTimeframe] = useState('12months');
  const [selectedState, setSelectedState] = useState('all');

  const kpis = [
    {
      title: 'Total Claims Submitted',
      value: '31,200',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'text-blue-600'
    },
    {
      title: 'Claims Verified',
      value: '22,450',
      change: '+8%',
      trend: 'up',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: 'Titles Granted',
      value: '18,450',
      change: '+15%',
      trend: 'up',
      icon: MapPin,
      color: 'text-purple-600'
    },
    {
      title: 'Avg. Turnaround Time',
      value: '45 days',
      change: '-23%',
      trend: 'down',
      icon: Clock,
      color: 'text-orange-600'
    }
  ];

  const stateComparisons = [
    { state: 'Madhya Pradesh', submitted: 12450, verified: 9830, granted: 8200, efficiency: 66 },
    { state: 'Odisha', submitted: 8750, verified: 7100, granted: 5800, efficiency: 66 },
    { state: 'Telangana', submitted: 6800, verified: 5200, granted: 4300, efficiency: 63 },
    { state: 'Tripura', submitted: 3200, verified: 2600, granted: 2150, efficiency: 67 }
  ];

  const topDistricts = [
    { district: 'Bastar (MP)', improvement: '+45%', claims: 650 },
    { district: 'Mayurbhanj (OD)', improvement: '+38%', claims: 750 },
    { district: 'Adilabad (TG)', improvement: '+32%', claims: 560 },
    { district: 'West Tripura (TR)', improvement: '+28%', claims: 260 },
    { district: 'Dantewada (MP)', improvement: '+25%', claims: 470 }
  ];

  const monthlyTrends = [
    { month: 'Jan', submitted: 2800, verified: 2100, granted: 1750 },
    { month: 'Feb', submitted: 3200, verified: 2600, granted: 2100 },
    { month: 'Mar', submitted: 3600, verified: 2900, granted: 2400 },
    { month: 'Apr', submitted: 2900, verified: 2500, granted: 2000 },
    { month: 'May', submitted: 3100, verified: 2700, granted: 2200 },
    { month: 'Jun', submitted: 3400, verified: 2800, granted: 2300 }
  ];

  return (
    <div id="main-content" className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <BarChart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Atlas Stats Deck</h1>
                <p className="text-gray-600">Comprehensive FRA Implementation Insights</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedTimeframe}
                onChange={(e) => setSelectedTimeframe(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="3months">Last 3 Months</option>
                <option value="6months">Last 6 Months</option>
                <option value="12months">Last 12 Months</option>
                <option value="2years">Last 2 Years</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                <Download className="w-4 h-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-8">
        {/* KPI Cards */}
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-6">Key Performance Indicators</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, index) => {
              const IconComponent = kpi.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-10 h-10 ${kpi.color} bg-opacity-10 rounded-lg flex items-center justify-center`}>
                      <IconComponent className={`w-5 h-5 ${kpi.color}`} />
                    </div>
                    <div className={`text-sm font-medium ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">{kpi.value}</div>
                  <div className="text-sm text-gray-600">{kpi.title}</div>
                </div>
              );
            })}
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Monthly Trends Chart */}
          <section>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Progress Trends</h3>
              <div className="h-80 bg-gray-50 rounded flex items-center justify-center mb-4">
                <div className="text-center text-gray-500">
                  <BarChart className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Interactive Chart Placeholder</div>
                  <div className="text-xs mt-1">Line/Area chart showing submission, verification, and grant trends</div>
                </div>
              </div>
              <div className="flex justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Submitted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span>Granted</span>
                </div>
              </div>
            </div>
          </section>

          {/* State Comparisons */}
          <section>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Cross-State Benchmarks</h3>
              <div className="space-y-4">
                {stateComparisons.map((state, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-800">{state.state}</h4>
                      <span className="text-sm font-medium text-purple-600">{state.efficiency}% Efficiency</span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center text-sm">
                      <div>
                        <div className="font-semibold text-blue-600">{state.submitted.toLocaleString()}</div>
                        <div className="text-gray-600">Submitted</div>
                      </div>
                      <div>
                        <div className="font-semibold text-green-600">{state.verified.toLocaleString()}</div>
                        <div className="text-gray-600">Verified</div>
                      </div>
                      <div>
                        <div className="font-semibold text-purple-600">{state.granted.toLocaleString()}</div>
                        <div className="text-gray-600">Granted</div>
                      </div>
                    </div>
                    <div className="mt-3 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 rounded-full h-2 transition-all duration-300"
                        style={{ width: `${state.efficiency}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Top Improving Districts */}
          <section>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Improving Districts</h3>
              <div className="space-y-3">
                {topDistricts.map((district, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{district.district}</div>
                        <div className="text-sm text-gray-600">{district.claims} claims processed</div>
                      </div>
                    </div>
                    <div className="text-green-600 font-semibold">{district.improvement}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Village Coverage Map */}
          <section>
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Coverage by Village/Tehsil</h3>
              <div className="h-80 bg-gradient-to-br from-green-50 to-blue-50 rounded flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <div className="text-sm">Choropleth Map Placeholder</div>
                  <div className="text-xs mt-1">Village-level coverage visualization would be displayed here</div>
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-red-200 rounded"></div>
                    <span>0-25%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-yellow-200 rounded"></div>
                    <span>25-50%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-200 rounded"></div>
                    <span>50-75%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 bg-green-500 rounded"></div>
                    <span>75-100%</span>
                  </div>
                </div>
                <select className="px-3 py-1 border border-gray-300 rounded text-sm">
                  <option>All States</option>
                  <option>Madhya Pradesh</option>
                  <option>Odisha</option>
                  <option>Telangana</option>
                  <option>Tripura</option>
                </select>
              </div>
            </div>
          </section>
        </div>

        {/* Export Options */}
        <section>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Export & Download Options</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                <Download className="w-5 h-5 text-green-600" />
                <span>Download CSV Data</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors">
                <Download className="w-5 h-5 text-blue-600" />
                <span>Export XLSX Report</span>
              </button>
              <button className="flex items-center justify-center space-x-2 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                <Download className="w-5 h-5 text-purple-600" />
                <span>Generate PDF Report</span>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};