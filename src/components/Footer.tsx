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
        <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center dark:bg-orange-600">
          <span className="font-bold">SJ</span>
              </div>
              <div>
                <h3 className="font-bold">{t('tribalrights360')}</h3>
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
            <p>© 2024 Ministry of Tribal Affairs, Government of India. All rights reserved.</p>
            <p className="mt-2">
              Last updated: {new Date().toLocaleDateString()} | 
              <span className="ml-2">Data is illustrative; official records prevail.</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};