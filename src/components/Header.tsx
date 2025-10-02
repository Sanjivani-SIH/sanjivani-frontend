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
          <div className="w-10 h-10 bg-green-700 rounded-full flex items-center justify-center dark:bg-green-800">
            <svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
              <circle cx="64" cy="64" r="64" fill="#FF7F00"/>
      <text x="50%" y="50%" fontSize="72" fontFamily="serif" 
        fill="white" textAnchor="middle" dominantBaseline="central">♣</text>
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
          <div className="hidden lg:flex space-x-2 py-4">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative text-sm px-3 py-1 rounded transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-800
                    ${isActive ? 'text-orange-500 dark:text-orange-400 font-bold' : 'hover:text-blue-200 dark:hover:text-orange-400 text-white dark:text-gray-100'}`}
                >
                  {t(item.key)}
                  {isActive && (
                    <span className="absolute left-1/2 -bottom-1.5 -translate-x-1/2 w-2/3 h-1 bg-orange-500 dark:bg-orange-400 rounded-full transition-all duration-300"></span>
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
                    className={`block text-sm py-2 px-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 dark:hover:text-orange-400 ${isActive ? 'text-orange-500 dark:text-orange-400 font-bold bg-orange-50 dark:bg-gray-800' : 'hover:text-blue-200 text-white dark:text-gray-100'}`}
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