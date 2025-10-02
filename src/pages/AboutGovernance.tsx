import React, { useState } from 'react';
import { Users, Target, MapPin, Calendar, Award, ExternalLink } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const AboutGovernance: React.FC = () => {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('mission');

  const steeringCommittee = [
    {
      name: 'Shri Arjun Munda',
      position: 'Hon\'ble Minister of Tribal Affairs',
      role: 'Chairman',
      image: '/placeholder-official.jpg'
    },
    {
      name: 'Dr. Anil Joshi',
      position: 'Secretary, Ministry of Tribal Affairs',
      role: 'Vice Chairman',
      image: '/placeholder-official.jpg'
    },
    {
      name: 'Ms. Priya Sharma',
      position: 'Joint Secretary (FRA), MoTA',
      role: 'Member Secretary',
      image: '/placeholder-official.jpg'
    },
    {
      name: 'Dr. Rajesh Kumar',
      position: 'Director, National Informatics Centre',
      role: 'Technical Advisor',
      image: '/placeholder-official.jpg'
    }
  ];

  const implementationTeam = [
    {
      state: 'Madhya Pradesh',
      nodal: 'Shri Ram Prasad Verma',
      designation: 'Commissioner, Tribal Development',
      contact: 'fra.mp@tribal.gov.in'
    },
    {
      state: 'Odisha',
      nodal: 'Dr. Sunita Panda',
      designation: 'Director, SC & ST Development',
      contact: 'fra.odisha@tribal.gov.in'
    },
    {
      state: 'Telangana',
      nodal: 'Shri Venkat Rao',
      designation: 'Secretary, Tribal Welfare',
      contact: 'fra.telangana@tribal.gov.in'
    },
    {
      state: 'Tripura',
      nodal: 'Ms. Anjali Deb',
      designation: 'Director, Tribal Research Institute',
      contact: 'fra.tripura@tribal.gov.in'
    }
  ];

  const roadmapPhases = [
    {
      phase: 'Phase 1',
      period: 'Apr 2023 - Mar 2024',
      status: 'Completed',
      objectives: [
        'Pilot implementation in 2 states (MP, Tripura)',
        'DocFlow OCR-NER development and testing',
        'Basic WebGIS atlas deployment',
        'Initial data digitization (50,000+ documents)'
      ],
      achievements: [
        '✓ 85% reduction in document processing time',
        '✓ 99.2% OCR accuracy achieved',
        '✓ 2,500 villages mapped',
        '✓ 150+ officials trained'
      ]
    },
    {
      phase: 'Phase 2',
      period: 'Apr 2024 - Mar 2025',
      status: 'In Progress',
      objectives: [
        'Expand to Odisha and Telangana',
        'AssetSense remote sensing integration',
        'DSS Prism decision support rollout',
        'Advanced analytics and reporting'
      ],
      achievements: [
        '◐ 60% complete - Odisha integration',
        '◐ 45% complete - Telangana pilot',
        '◐ 75% complete - Remote sensing module',
        '○ Planning - Full DSS deployment'
      ]
    },
    {
      phase: 'Phase 3',
      period: 'Apr 2025 - Mar 2026',
      status: 'Planned',
      objectives: [
        'Scale to 10+ states nationwide',
        'Mobile app for field officers',
        'Blockchain for title verification',
        'AI-powered fraud detection'
      ],
      achievements: [
        'Planning state-wise rollout strategy',
        'Technology roadmap finalization',
        'Stakeholder engagement in progress'
      ]
    },
    {
      phase: 'Phase 4',
      period: 'Apr 2026 - Mar 2027',
      status: 'Planned',
      objectives: [
        'Complete national coverage',
        'Integration with other tribal schemes',
        'Real-time monitoring dashboard',
        'Predictive analytics for policy'
      ],
      achievements: [
        'Framework design in progress',
        'Inter-ministerial coordination initiated'
      ]
    }
  ];

  const achievements = [
    {
      metric: '85,000+',
      label: 'Documents Digitized',
      icon: Target,
      color: 'text-blue-600'
    },
    {
      metric: '31,200',
      label: 'Claims Mapped',
      icon: MapPin,
      color: 'text-green-600'
    },
    {
      metric: '2,500+',
      label: 'Villages Covered',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      metric: '95%',
      label: 'Processing Time Reduced',
      icon: Award,
      color: 'text-orange-600'
    }
  ];

  return (
    <div id="main-content" className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">About & Governance</h1>
              <p className="text-gray-600">Mission, Leadership & Implementation Roadmap</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8">
            {[
              { id: 'mission', label: 'Mission & Objectives' },
              { id: 'governance', label: 'Steering Committee' },
              { id: 'implementation', label: 'Implementation Team' },
              { id: 'roadmap', label: 'Roadmap & Achievements' }
            ].map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                  activeSection === section.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Mission & Objectives */}
        {activeSection === 'mission' && (
          <div className="space-y-8">
            <section>
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg p-8 mb-8">
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-xl leading-relaxed">
                  To accelerate the implementation of the Forest Rights Act through innovative technology, 
                  ensuring transparent, efficient, and inclusive delivery of forest rights to tribal communities 
                  and traditional forest dwellers across India.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Strategic Objectives</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <span className="text-gray-700">Digitize legacy FRA records with 95%+ accuracy using AI-powered OCR and NER</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <span className="text-gray-700">Provide real-time WebGIS visualization of IFR, CFR, and CR claims across states</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <span className="text-gray-700">Enable evidence-based decision making through comprehensive analytics</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <span className="text-gray-700">Facilitate automatic matching of beneficiaries to relevant government schemes</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                      <span className="text-gray-700">Monitor forest cover changes using satellite remote sensing technology</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Impact Goals</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-medium text-gray-800">Processing Efficiency</h4>
                      <p className="text-sm text-gray-600">Reduce document processing time by 90% through automation</p>
                    </div>
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-medium text-gray-800">Transparency & Accountability</h4>
                      <p className="text-sm text-gray-600">Provide real-time status updates to claimants and officials</p>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-4">
                      <h4 className="font-medium text-gray-800">Scheme Convergence</h4>
                      <p className="text-sm text-gray-600">Increase beneficiary enrollment in government schemes by 300%</p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-medium text-gray-800">Data-Driven Policy</h4>
                      <p className="text-sm text-gray-600">Enable evidence-based policy formulation and course correction</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Key Achievements */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-6">Key Achievements</h3>
              <div className="grid md:grid-cols-4 gap-6">
                {achievements.map((achievement, index) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
                      <div className={`w-12 h-12 ${achievement.color} bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                        <IconComponent className={`w-6 h-6 ${achievement.color}`} />
                      </div>
                      <div className={`text-2xl font-bold ${achievement.color} mb-1`}>{achievement.metric}</div>
                      <div className="text-sm text-gray-600">{achievement.label}</div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        )}
                            The Sanjivani project is governed by a high-level steering committee comprising senior 
        {/* Governance */}
        {activeSection === 'governance' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Project Steering Committee</h2>
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <p className="text-gray-700 leading-relaxed">
                  The Sanjivani project is governed by a high-level steering committee comprising senior 
                  officials from the Ministry of Tribal Affairs, technical experts, and state representatives. 
                  The committee ensures strategic direction, policy alignment, and effective implementation across states.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {steeringCommittee.map((member, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                        <Users className="w-8 h-8 text-gray-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{member.name}</h3>
                        <p className="text-sm text-gray-600 mb-1">{member.position}</p>
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                          {member.role}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-800 mb-2">Committee Functions</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Strategic oversight and policy guidance</li>
                  <li>• Review of implementation progress and milestones</li>
                  <li>• Resource allocation and budget approval</li>
                  <li>• Stakeholder coordination and issue resolution</li>
                  <li>• Quality assurance and compliance monitoring</li>
                </ul>
              </div>
            </section>
          </div>
        )}

        {/* Implementation Team */}
        {activeSection === 'implementation' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-6">State Implementation Teams</h2>
              <div className="space-y-6">
                {implementationTeam.map((team, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">{team.state}</h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Active
                      </span>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">Nodal Officer</h4>
                        <p className="text-sm text-gray-600">{team.nodal}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">Designation</h4>
                        <p className="text-sm text-gray-600">{team.designation}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 mb-1">Contact</h4>
                        <p className="text-sm text-blue-600">{team.contact}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-800 mb-4">Technical Partners</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">NIC</span>
                    </div>
                    <h4 className="font-medium text-gray-800">National Informatics Centre</h4>
                    <p className="text-sm text-gray-600">Infrastructure & Development</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">ISRO</span>
                    </div>
                    <h4 className="font-medium text-gray-800">Indian Space Research Organisation</h4>
                    <p className="text-sm text-gray-600">Remote Sensing & GIS</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">IISC</span>
                    </div>
                    <h4 className="font-medium text-gray-800">Indian Institute of Science</h4>
                    <p className="text-sm text-gray-600">AI/ML Research & Development</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* Roadmap */}
        {activeSection === 'roadmap' && (
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-800 mb-6">Implementation Roadmap</h2>
              <div className="space-y-6">
                {roadmapPhases.map((phase, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex items-center justify-between p-6 border-b border-gray-200">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{phase.phase}</h3>
                        <p className="text-sm text-gray-600">{phase.period}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        phase.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        phase.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {phase.status}
                      </span>
                    </div>
                    <div className="p-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">Objectives</h4>
                          <ul className="space-y-2">
                            {phase.objectives.map((objective, objIndex) => (
                              <li key={objIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"></div>
                                <span>{objective}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700 mb-3">
                            {phase.status === 'Completed' ? 'Achievements' : 'Progress'}
                          </h4>
                          <ul className="space-y-2">
                            {phase.achievements.map((achievement, achIndex) => (
                              <li key={achIndex} className="flex items-start space-x-2 text-sm">
                                <span className={`mt-0.5 ${
                                  achievement.startsWith('✓') ? 'text-green-600' :
                                  achievement.startsWith('◐') ? 'text-blue-600' :
                                  achievement.startsWith('○') ? 'text-gray-400' :
                                  'text-gray-600'
                                }`}>
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Timeline Visualization */}
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Project Timeline</h3>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="flex items-center space-x-8 overflow-x-auto pb-4">
                  {roadmapPhases.map((phase, index) => (
                    <div key={index} className="flex-shrink-0 text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        phase.status === 'Completed' ? 'bg-green-500 text-white' :
                        phase.status === 'In Progress' ? 'bg-blue-500 text-white' :
                        'bg-gray-300 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div className="text-sm font-medium text-gray-800">{phase.phase}</div>
                      <div className="text-xs text-gray-500">{phase.period.split(' - ')[0]}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};