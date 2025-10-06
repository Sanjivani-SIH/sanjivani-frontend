import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const Footer: React.FC = () => {
  const { t } = useLanguage();

  const footerLinks = [
    { key: 'footer.accessibility', href: '/accessibility' },
    { key: 'footer.copyright', href: '/copyright' },
    { key: 'footer.privacy', href: '/privacy' },
    { key: 'footer.terms', href: '/terms' },
    { key: 'footer.rti', href: '/rti' },
    { key: 'footer.help', href: '/help' },
    { key: 'footer.faq', href: '/faq' },
  ];

  return (
  <footer className="bg-gray-800 text-white dark:bg-gray-950 dark:text-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Main footer content */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
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
              <div>
                <h3 className="font-bold">{t('Sanjivani')}</h3>
                <p className="text-sm text-gray-400 dark:text-gray-300">FRA Atlas & Decision Support</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed dark:text-gray-300">
              {t('ministry.tribal.affairs')}, Government of India
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.slice(0, 4).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm text-gray-400 hover:text-white transition-colors dark:text-gray-300 dark:hover:text-orange-400"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <div className="space-y-2">
              {footerLinks.slice(4).map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="block text-sm text-gray-400 hover:text-white transition-colors dark:text-gray-300 dark:hover:text-orange-400"
                >
                  {t(link.key)}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-gray-700 pt-6 dark:border-gray-700">
          <div className="bg-yellow-900 bg-opacity-50 border border-yellow-600 rounded p-4 mb-4 dark:bg-yellow-950 dark:border-yellow-700">
            <p className="text-sm text-yellow-200 dark:text-yellow-100">
              <strong>Disclaimer:</strong> {t('footer.disclaimer')}
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-gray-400 dark:text-gray-300">
            <p>© 2025 Ministry of Tribal Affairs, Government of India. All rights reserved.</p>
            <p className="mt-2">
              Last updated: 6th October 2025 | 
              <span className="ml-2">Developed & Deployed by Team HackML</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};