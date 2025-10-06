import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Eye, Moon, Sun } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleLanguage, t } = useLanguage();
  const location = useLocation();
  useTheme();

  const navigationItems = [
    { key: 'nav.home', path: '/' },
    { key: 'nav.fra.atlas', path: '/fra-atlas' },
    { key: 'nav.insights', path: '/insights' },
    { key: 'nav.digitization', path: '/digitization' },
    { key: 'nav.decision.support', path: '/decision-support' },
    { key: 'nav.schemes', path: '/schemes' },
    { key: 'nav.resources', path: '/resources' },
    { key: 'nav.about', path: '/about' },
    { key: 'nav.help', path: '/help' },
    { key: 'nav.login', path: '/login' },
  ];


  return (
    <header className="bg-blue-900 text-white shadow-lg dark:bg-gray-900 dark:text-gray-100">
      {/* Skip to content link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 bg-blue-600 text-white px-4 py-2 z-50"
      >
        {t('skip.to.content')}
      </a>
      {/* Unified header row */}
      <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
        {/* Left: Logo and App Name */}
        <Link to="/" className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg width="120" height="120" viewBox="0 0 35 35" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#4CAF50"/>
                  <stop offset="100%" stopColor="#2E7D32"/>
                </linearGradient>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="1.2" stdDeviation="1" floodColor="rgba(0,0,0,0.35)"/>
                </filter>
              </defs>
              <title>leaf favicon</title>
              <path 
                d="M28.082 9.534c-0.058 0.174-0.117 0.349-0.176 0.525 0.674 3.296 0.425 6.877-1.276 10.787 0.247-2.511 0.206-4.913-0.182-7.215-0.458 0.891-1.042 1.755-1.64 2.624 0.085 2.497-0.381 5.132-1.603 7.944 0.196-1.997 0.16-3.922-0.036-5.794-0.801 0.911-1.695 1.786-2.697 2.587-0.237 1.584-0.684 3.223-1.421 4.92 0.132-1.348 0.154-2.68 0.109-3.972-2.221 1.51-4.858 2.718-8.053 3.389 2.691-1.51 4.838-3.068 6.596-4.665-1.156-0.241-2.346-0.399-3.535-0.51 1.572-0.397 3.124-0.552 4.628-0.51 1.075-1.099 1.973-2.205 2.697-3.353-2.005-0.361-4.034-0.465-6.086-0.328 2.355-1.14 4.702-1.538 7.033-1.385 0.602-1.24 1.014-2.523 1.312-3.826-1.773-0.168-3.704 0.253-5.904 0.802 1.986-1.82 4.133-2.61 6.268-2.842 0.111-0.903 0.169-1.808 0.18-2.741-9.848-7.007-7.239 16.56-22.665 20.346 12.693 7.863 37.271-3.539 26.451-16.782zM25.788 1.846c0.628-0.305 1.39-0.323 1.968 0.219 0.33 3.103-0.68 9.663-4.665 14.249 3.039-5.538 3.261-9.548 2.697-14.467v-0z" 
                fill="url(#leafGradient)" 
                filter="url(#shadow)"/>
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-tight">{t('tribalrights360')}</span>
            <span className="text-xs text-blue-200 dark:text-gray-300 leading-tight">FRA Atlas & Decision Support</span>
          </div>
        </Link>
        {/* Center: Ministry name */}
        <div className="flex-1 flex justify-center items-center">
          <span className="text-base font-semibold text-center uppercase tracking-wider text-yellow-300 dark:text-yellow-200">{t('ministry.tribal.affairs')}</span>
        </div>
        {/* Right: Search and Language button */}
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          <div className="hidden lg:flex items-center space-x-2">
            <div className="relative">
              <input
                type="text"
                placeholder={t('search')}
                className="pl-10 pr-4 py-2 border border-blue-700 rounded-md bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-blue-300" />
            </div>
            <button
              onClick={toggleLanguage}
              className="text-sm px-3 py-1 border border-white rounded hover:bg-white hover:text-blue-900 transition-colors dark:border-gray-400 dark:hover:bg-gray-100 dark:hover:text-gray-900"
              aria-label="Toggle language"
            >
              {t('language.toggle')}
            </button>
          </div>
          {/* Mobile menu button */}
          <button
            className="lg:hidden ml-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      {/* Navigation */}
      <nav className="bg-blue-800 border-t border-blue-700 dark:bg-gray-800 dark:border-gray-700">
        <div className="container mx-auto px-4">
          {/* Desktop navigation */}
          <div className="hidden lg:flex justify-center items-center py-2 space-x-2">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative text-sm px-3 py-2 rounded-md transition-colors duration-300 focus:outline-none whitespace-nowrap
                    ${
                      isActive
                        ? 'text-orange-400 font-semibold'
                        : 'text-white hover:bg-blue-700 hover:text-orange-300'
                    }`}
                >
                  {t(item.key)}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-0.5 bg-orange-400 rounded-full"></span>
                  )}
                </Link>
              );
            })}
          </div>
          {/* Mobile navigation */}
          {isMobileMenuOpen && (
            <div className="lg:hidden py-4 space-y-2">
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block text-sm py-2 px-3 rounded-md transition-colors duration-300 ${
                      isActive
                        ? 'bg-orange-100 text-orange-600 font-semibold'
                        : 'text-white hover:bg-blue-700'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t(item.key)}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-blue-700 dark:border-gray-700">
                <input
                  type="text"
                  placeholder={t('search')}
                  className="w-full pl-10 pr-4 py-2 border border-blue-700 rounded-md bg-blue-800 text-white placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-100 dark:placeholder-gray-400"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-blue-300 dark:text-gray-400" />
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}