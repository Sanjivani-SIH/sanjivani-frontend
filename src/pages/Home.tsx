import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Map, Brain, Satellite, Target, TrendingUp, Users, FileText } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import ReactMarkdown from 'react-markdown';

export const Home: React.FC = () => {
  const { t } = useLanguage();

  const capabilities = [
    {
      icon: Map,
      title: t('capability.rightsview'),
      description: t('capability.rightsview.desc'),
      link: '/fra-atlas',
      color: 'bg-blue-500'
    },
    {
      icon: FileText,
      title: t('capability.docflow'),
      description: t('capability.docflow.desc'),
      link: '/digitization',
      color: 'bg-green-500'
    },
    {
      icon: Satellite,
      title: t('capability.assetsense'),
      description: t('capability.assetsense.desc'),
      link: '/digitization',
      color: 'bg-purple-500'
    },
    {
      icon: Target,
      title: t('capability.dss'),
      description: t('capability.dss.desc'),
      link: '/decision-support',
      color: 'bg-orange-500'
    }
  ];

  const states = [
    { name: 'Madhya Pradesh', code: 'MP', claims: '12,450' },
    { name: 'Tripura', code: 'TR', claims: '3,200' },
    { name: 'Odisha', code: 'OD', claims: '8,750' },
    { name: 'Telangana', code: 'TG', claims: '6,800' }
  ];

  const impactStats = [
    { label: 'Processing Time Reduction', value: '95%', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Scheme Delivery Speed', value: '3x', icon: Target, color: 'text-blue-600' },
    { label: 'Verification Accuracy', value: '90%', icon: Brain, color: 'text-purple-600' },
    { label: 'Villages Covered', value: '2,500+', icon: Users, color: 'text-orange-600' }
  ];

  const updates = [
    {
      date: '2024-09-30',
      title: 'Project Kickoff - Development Begins',
      summary: 'Development started with core architecture setup, database design, and initial WebGIS mapping infrastructure...'
    },
    {
      date: '2024-10-15',
      title: 'Alpha Release - Basic Features Ready',
      summary: 'First working prototype with basic claim visualization, OCR processing, and user authentication completed...'
    },
    {
      date: '2024-11-10',
      title: 'Beta Testing - Final Polish',
      summary: 'Final testing phase with enhanced features, bug fixes, and performance optimization before launch...'
    }
  ];

  const markdownTest = `
# Welcome to Sanjivani AI Assistant

This is a **test** of *markdown* rendering in our chat system.

## Features
- **Bold text** for emphasis
- *Italic text* for style
- \`inline code\` for technical terms
- [Links](https://example.com) for references

### Code Example
\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

> This is a blockquote for important information

**The chat system now properly renders markdown!** 🎉
  `;

  return (
    <div id="main-content" className="space-y-16">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/fra-atlas"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300 flex items-center space-x-2"
              >
                <span>{t('cta.explore.atlas')}</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/insights"
                className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                {t('cta.view.insights')}
              </Link>
              <Link
                to="/about"
                className="bg-transparent border-2 border-blue-300 hover:bg-blue-300 hover:text-blue-900 text-blue-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-300"
              >
                {t('cta.learn.how')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 space-y-16">
        {/* What Is Sanjivani */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {t('section.what.is')}
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Sanjivani brings the Forest Rights Act to the digital forefront—combining WebGIS maps, 
                AI-driven document processing, and decision support to help officials deliver benefits faster 
                and more transparently.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Digitize legacy FRA records with 95% accuracy using OCR and Natural Language Processing</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Visualize IFR, CFR, and CR claims on interactive WebGIS maps with real-time progress tracking</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <span>Match eligible beneficiaries to schemes automatically using AI-powered decision support</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Key Capabilities */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            {t('section.key.capabilities')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {capabilities.map((capability, index) => {
              const IconComponent = capability.icon;
              return (
                <Link
                  key={index}
                  to={capability.link}
                  className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 group"
                >
                  <div className={`${capability.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{capability.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{capability.description}</p>
                  <div className="mt-4 flex items-center text-blue-600 text-sm font-medium group-hover:text-blue-800 transition-colors">
                    <span>Learn More</span>
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* States in Focus */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            {t('section.states.focus')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {states.map((state, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">{state.code}</span>
                </div>
                <h3 className="font-semibold text-gray-800 mb-2">{state.name}</h3>
                <p className="text-sm text-gray-600 mb-2">Active Claims</p>
                <p className="text-2xl font-bold text-orange-600">{state.claims}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Impact at a Glance */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            {t('section.impact.glance')}
          </h2>
          <div className="bg-gray-50 rounded-lg p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 italic">
                * Pilot estimates based on Phase 1 implementation data
              </p>
            </div>
          </div>
        </section>

        {/* Latest Updates */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            {t('section.latest.updates')}
          </h2>
          <div className="space-y-6">
            {updates.map((update, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 mb-2">{update.date}</div>
                    <h3 className="font-semibold text-gray-800 mb-3">{update.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{update.summary}</p>
                  </div>
                  <div className="ml-4">
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/resources"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
            >
              <span>{t('view.more')}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};