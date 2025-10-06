import React, { useState, useEffect } from 'react';
import { Target, Users, Settings, Lock, TrendingUp, AlertTriangle, BarChart3, Sliders, ChevronRight, Filter, Download, Share2, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';

export const DecisionSupport: React.FC = () => {
  const { t } = useLanguage();
  const [activeModule, setActiveModule] = useState('schemelink');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<{
    recommended_schemes: any[];
    recommended_resources: any[];
  }>({
    recommended_schemes: [],
    recommended_resources: []
  });

  // Fetch recommendations from the backend
  useEffect(() => {
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://localhost:8000/api/v1/decision-support/recommendations');
        setRecommendations(response.data);
      } catch (err) {
        console.error('Error fetching recommendations:', err);
        setError('Failed to load recommendations. Please try again later.');
        // Use sample data as fallback
        setRecommendations({
          recommended_schemes: schemeMatches.flatMap(match => match.schemes.map(scheme => ({
            id: Math.random().toString(),
            name: scheme.name,
            description: `Sample description for ${scheme.name}`,
            type: 'financial',
            benefits: scheme.amount
          }))),
          recommended_resources: []
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const schemeMatches = [
    {
      beneficiary: 'Ramesh Kumar (IFR Holder)',
      village: 'Jhilmil, Bastar',
      schemes: [
        { name: 'PM-KISAN', eligibility: 95, status: 'Eligible', amount: '₹6,000/year' },
        { name: 'MGNREGA', eligibility: 100, status: 'Active', amount: '₹220/day' },
        { name: 'Forest Produce Scheme', eligibility: 90, status: 'Eligible', amount: 'Variable' }
      ]
    },
    {
      beneficiary: 'Sunita Devi (CFR Member)',
      village: 'Khadgawan, Dantewada',
      schemes: [
        { name: 'SHG Microfinance', eligibility: 88, status: 'Eligible', amount: '₹50,000' },
        { name: 'Skill Development', eligibility: 85, status: 'Eligible', amount: 'Free Training' },
        { name: 'Pradhan Mantri Awas Yojana', eligibility: 92, status: 'Priority', amount: '₹1.2L' }
      ]
    }
  ];

  const prioritizedVillages = [
    {
      village: 'Jhilmil',
      district: 'Bastar',
      score: 92,
      indicators: {
        pendingClaims: 45,
        avgIncome: 25000,
        forestCover: 78,
        accessibility: 'Low'
      },
      interventions: ['Mobile Verification Unit', 'Document Support', 'Awareness Campaign']
    },
    {
      village: 'Khadgawan',
      district: 'Dantewada',
      score: 88,
      indicators: {
        pendingClaims: 38,
        avgIncome: 28000,
        forestCover: 82,
        accessibility: 'Medium'
      },
      interventions: ['Digital Literacy', 'Scheme Enrollment', 'Livelihood Support']
    },
    {
      village: 'Rajpur',
      district: 'Mayurbhanj',
      score: 85,
      indicators: {
        pendingClaims: 52,
        avgIncome: 22000,
        forestCover: 65,
        accessibility: 'High'
      },
      interventions: ['Fast-track Processing', 'Income Generation', 'Forest Conservation']
    }
  ];

  const policyScenarios = [
    {
      scenario: 'Increase Verification Staff by 50%',
      impact: {
        processingTime: '-30%',
        cost: '+₹2.5Cr',
        satisfaction: '+25%',
        coverage: '+40%'
      },
      feasibility: 'High'
    },
    {
      scenario: 'Digital-First Documentation',
      impact: {
        processingTime: '-45%',
        cost: '-₹1.2Cr',
        satisfaction: '+15%',
        coverage: '+60%'
      },
      feasibility: 'Medium'
    },
    {
      scenario: 'Mobile Verification Units',
      impact: {
        processingTime: '-20%',
        cost: '+₹3.8Cr',
        satisfaction: '+35%',
        coverage: '+80%'
      },
      feasibility: 'High'
    }
  ];

  return (
    <div id="main-content" className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <Target className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">DSS Prism</h1>
              <p className="text-gray-600">Decision Support System for Evidence-Based Policy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Module Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex overflow-x-auto gap-2 border-b border-gray-200">
            {[
              { id: 'schemelink', label: 'SchemeLink', icon: Users },
              { id: 'prioritizer', label: 'Intervention Prioritizer', icon: Target },
              { id: 'sandbox', label: 'Policy Sandbox', icon: Settings }
            ].map(module => {
              const IconComponent = module.icon;
              return (
                <button
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`flex items-center space-x-2 py-4 px-4 font-medium text-sm transition-all duration-200 whitespace-nowrap ${
                    activeModule === module.id
                      ? 'text-orange-600 border-b-2 border-orange-500'
                      : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{module.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* SchemeLink */}
        {activeModule === 'schemelink' && (
          <div className="space-y-8">
            <section>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h2 className="font-semibold text-blue-800">SchemeLink - Automated Beneficiary Matching</h2>
                    <p className="text-sm text-blue-700 mt-1">
                      Match eligible beneficiaries to centrally sponsored schemes using eligibility rules and AI recommendations.
                    </p>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading recommendations...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-800">Error</h3>
                      <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {recommendations.recommended_schemes.length > 0 ? (
                    recommendations.recommended_schemes.map((scheme, index) => (
                      <div key={scheme.id || index} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-800">{scheme.name}</h3>
                            <p className="text-sm text-gray-600">{scheme.type}</p>
                          </div>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            Recommended
                          </span>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4">
                          <div className="mb-3">
                            <p className="text-sm text-gray-700 mb-2">{scheme.description}</p>
                            <div className="flex items-center justify-between text-sm mb-1">
                              <span>Eligibility Score</span>
                              <span className="font-medium">85%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="h-2 rounded-full bg-green-500"
                                style={{ width: '85%' }}
                              ></div>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-gray-700">Benefit: {scheme.benefits}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    // Fallback to sample data if no recommendations are available
                    schemeMatches.map((match, index) => (
                      <div key={index} className="bg-white rounded-lg shadow-md p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-gray-800">{match.beneficiary}</h3>
                            <p className="text-sm text-gray-600">{match.village}</p>
                          </div>
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                            {match.schemes.length} Schemes Matched
                          </span>
                        </div>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          {match.schemes.map((scheme, schemeIndex) => (
                            <div key={schemeIndex} className="border border-gray-200 rounded-lg p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-medium text-gray-800">{scheme.name}</h4>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  scheme.status === 'Active' ? 'bg-green-100 text-green-800' :
                                  scheme.status === 'Priority' ? 'bg-orange-100 text-orange-800' :
                                  'bg-blue-100 text-blue-800'
                                }`}>
                                  {scheme.status}
                                </span>
                              </div>
                              <div className="mb-3">
                                <div className="flex items-center justify-between text-sm mb-1">
                                  <span>Eligibility Score</span>
                                  <span className="font-medium">{scheme.eligibility}%</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className={`h-2 rounded-full ${scheme.eligibility >= 90 ? 'bg-green-500' : scheme.eligibility >= 80 ? 'bg-orange-500' : 'bg-red-500'}`}
                                    style={{ width: `${scheme.eligibility}%` }}
                                  ></div>
                                </div>
                              </div>
                              <p className="text-sm font-medium text-gray-700">Benefit: {scheme.amount}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-800">Public Demo View</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      This is a demonstration with sample data. All features are accessible without authentication for development purposes.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Intervention Prioritizer */}
        {activeModule === 'prioritizer' && (
          <div className="space-y-8">
            <section>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Target className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <h2 className="font-semibold text-purple-800">Intervention Prioritizer</h2>
                    <p className="text-sm text-purple-700 mt-1">
                      Ranks villages for targeted action based on multiple socio-economic and administrative indicators.
                    </p>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="bg-white rounded-lg shadow-md p-6 text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading prioritized villages...</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-red-800">Error</h3>
                      <p className="text-sm text-red-700 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {prioritizedVillages.map((village, index) => (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-800">{village.village}</h3>
                          <p className="text-sm text-gray-600">{village.district} District</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-purple-600">{village.score}</div>
                          <div className="text-xs text-gray-500">Priority Score</div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Key Indicators</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Pending Claims:</span>
                              <span className="font-medium text-orange-600">{village.indicators.pendingClaims}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Avg. Annual Income:</span>
                              <span className="font-medium">₹{village.indicators.avgIncome.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Forest Cover:</span>
                              <span className="font-medium text-green-600">{village.indicators.forestCover}%</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Accessibility:</span>
                              <span className={`font-medium ${
                                village.indicators.accessibility === 'High' ? 'text-green-600' :
                                village.indicators.accessibility === 'Medium' ? 'text-orange-600' : 'text-red-600'
                              }`}>
                                {village.indicators.accessibility}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Recommended Interventions</h4>
                          <div className="space-y-2">
                            {village.interventions.map((intervention, intIndex) => (
                              <div key={intIndex} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                <span className="text-sm text-gray-700">{intervention}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-800">Public Demo View</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      This is a demonstration with sample data. All features are accessible without authentication for development purposes.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Policy Sandbox */}
        {activeModule === 'sandbox' && (
          <div className="space-y-8">
            <section>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Settings className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <h2 className="font-semibold text-orange-800">Policy Sandbox</h2>
                    <p className="text-sm text-orange-700 mt-1">
                      Simulate "what-if" scenarios to evaluate policy interventions before implementation.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h3 className="font-semibold text-gray-800 mb-4">Policy Simulation</h3>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Policy Area
                    </label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="claims">Claim Processing</option>
                      <option value="awareness">Awareness & Education</option>
                      <option value="resources">Resource Allocation</option>
                      <option value="governance">Governance Structure</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Target Region
                    </label>
                    <select 
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="all">All States</option>
                      <option value="mp">Madhya Pradesh</option>
                      <option value="cg">Chhattisgarh</option>
                      <option value="jh">Jharkhand</option>
                      <option value="od">Odisha</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Claim Processing Time
                    </label>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">Current: 180 days</span>
                      <div className="flex-1">
                        <input 
                          type="range" 
                          min="30" 
                          max="365" 
                          defaultValue="90"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <span className="text-sm text-gray-600">Target: 90 days</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Awareness Program Budget
                    </label>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">Current: ₹50L</span>
                      <div className="flex-1">
                        <input 
                          type="range" 
                          min="10" 
                          max="200" 
                          defaultValue="100"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <span className="text-sm text-gray-600">Target: ₹100L</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Field Staff Allocation
                    </label>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-600">Current: 120</span>
                      <div className="flex-1">
                        <input 
                          type="range" 
                          min="50" 
                          max="300" 
                          defaultValue="200"
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <span className="text-sm text-gray-600">Target: 200</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors">
                    Run Simulation
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-1 lg:grid-cols-1 gap-6">
                {policyScenarios.map((scenario, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-800">{scenario.scenario}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        scenario.feasibility === 'High' ? 'bg-green-100 text-green-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {scenario.feasibility} Feasibility
                      </span>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded">
                        <TrendingUp className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                        <div className="text-sm font-medium text-blue-800">Processing Time</div>
                        <div className="text-lg font-bold text-blue-600">{scenario.impact.processingTime}</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded">
                        <Target className="w-6 h-6 text-red-600 mx-auto mb-1" />
                        <div className="text-sm font-medium text-red-800">Cost Impact</div>
                        <div className="text-lg font-bold text-red-600">{scenario.impact.cost}</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded">
                        <Users className="w-6 h-6 text-green-600 mx-auto mb-1" />
                        <div className="text-sm font-medium text-green-800">Satisfaction</div>
                        <div className="text-lg font-bold text-green-600">{scenario.impact.satisfaction}</div>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded">
                        <Target className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                        <div className="text-sm font-medium text-purple-800">Coverage</div>
                        <div className="text-lg font-bold text-purple-600">{scenario.impact.coverage}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-yellow-800">Public Demo View</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      This is a demonstration with sample data. All features are accessible without authentication for development purposes.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Governance Safeguards */}
        <section className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Governance & Audit Safeguards</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Lock className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Role-Based Access</h3>
              <p className="text-sm text-gray-600">Different access levels for central officials, state officers, and district administrators.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Settings className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Audit Trails</h3>
              <p className="text-sm text-gray-600">Complete logging of all decisions, data access, and policy simulations.</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-medium text-gray-800 mb-2">Human Oversight</h3>
              <p className="text-sm text-gray-600">AI recommendations require human validation before implementation.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};