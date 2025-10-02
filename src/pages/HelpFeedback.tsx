import React, { useState } from 'react';
import { HelpCircle, MessageCircle, Phone, Mail, FileText, Search } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const HelpFeedback: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [feedbackForm, setFeedbackForm] = useState({
    category: '',
    subject: '',
    description: '',
    email: '',
    file: null
  });

  const faqs = [
    {
      category: 'General',
  question: 'What is Sanjivani and how does it help?',
  answer: 'Sanjivani is an AI-powered system that digitizes FRA records, provides WebGIS mapping of claims, and offers decision support for accelerating forest rights implementation.'
    },
    {
      category: 'Eligibility',
      question: 'Who is eligible to apply for Forest Rights under FRA?',
      answer: 'Tribal communities and other traditional forest dwellers who have been residing in forest areas prior to December 13, 2005, are eligible to apply for Individual Forest Rights (IFR) and Community Forest Rights (CFR).'
    },
    {
      category: 'Maps',
      question: 'How do I search for my village on the FRA Atlas?',
      answer: 'Use the search box in the FRA Atlas to enter your village name, district, or coordinates. You can also use the filters to narrow down by state and district.'
    },
    {
      category: 'Data',
  question: 'Where does the data in Sanjivani come from?',
  answer: 'Data comes from official FRA records provided by state governments, satellite imagery from ISRO, and digitized documents processed through our OCR-NER pipeline.'
    },
    {
      category: 'Technical',
      question: 'Why can\'t I access certain features of the Decision Support System?',
      answer: 'Full DSS features are restricted to authorized government officials. Public users can access read-only demos of SchemeLink and Intervention Prioritizer features.'
    },
    {
      category: 'General',
      question: 'How often is the data updated on the platform?',
      answer: 'Claims data is updated monthly, satellite imagery is refreshed quarterly, and statistical indicators are updated in real-time as new data becomes available.'
    },
    {
      category: 'Maps',
      question: 'What do the different colors on the map represent?',
      answer: 'Blue represents IFR claims, green represents CFR claims, purple represents CR claims. Different shades indicate claim status: light for pending, dark for approved/granted.'
    },
    {
      category: 'Eligibility',
      question: 'What documents are needed for FRA application?',
      answer: 'Required documents include proof of forest dwelling (before Dec 2005), community/caste certificate, survey settlement records, and evidence of traditional occupation.'
    }
  ];

  const supportContacts = [
    {
      title: 'Technical Support',
      description: 'Issues with portal access, login problems, or technical difficulties',
      phone: '1800-XXX-XXXX',
  email: 'tech.support@sanjivani.gov.in',
      hours: '9:00 AM - 6:00 PM (Mon-Fri)'
    },
    {
      title: 'FRA Application Help',
      description: 'Guidance on forest rights application process and eligibility',
      phone: '1800-YYY-YYYY',
  email: 'fra.help@sanjivani.gov.in',
      hours: '9:00 AM - 5:00 PM (Mon-Sat)'
    },
    {
      title: 'Data & Research Queries',
      description: 'Questions about data sources, research collaboration, or API access',
      phone: '011-ZZZZ-ZZZZ',
  email: 'research@sanjivani.gov.in',
      hours: '10:00 AM - 4:00 PM (Mon-Fri)'
    }
  ];

  const feedbackCategories = [
    { value: '', label: 'Select Category' },
    { value: 'bug-report', label: 'Bug Report' },
    { value: 'feature-request', label: 'Feature Request' },
    { value: 'data-correction', label: 'Data Correction' },
    { value: 'user-experience', label: 'User Experience' },
    { value: 'accessibility', label: 'Accessibility Issue' },
    { value: 'general-feedback', label: 'General Feedback' }
  ];

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle feedback submission
    alert('Thank you for your feedback! We will review and respond within 2-3 business days.');
    setFeedbackForm({
      category: '',
      subject: '',
      description: '',
      email: '',
      file: null
    });
  };

  return (
    <div id="main-content" className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Help & Feedback</h1>
              <p className="text-gray-600">Get support, find answers, and share your feedback</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* FAQ Search */}
            <section>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="space-y-4">
                  {filteredFaqs.map((faq, index) => (
                    <details key={index} className="border border-gray-200 rounded-lg">
                      <summary className="cursor-pointer p-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-gray-800">{faq.question}</span>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                            {faq.category}
                          </span>
                        </div>
                      </summary>
                      <div className="p-4 pt-0 border-t border-gray-200">
                        <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>

                {filteredFaqs.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <HelpCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No FAQs found matching your search.</p>
                  </div>
                )}
              </div>
            </section>

            {/* Feedback Form */}
            <section>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Send Feedback</h2>
                <form onSubmit={handleFeedbackSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category *
                      </label>
                      <select
                        required
                        value={feedbackForm.category}
                        onChange={(e) => setFeedbackForm({...feedbackForm, category: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        {feedbackCategories.map(cat => (
                          <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={feedbackForm.email}
                        onChange={(e) => setFeedbackForm({...feedbackForm, email: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="your.email@domain.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={feedbackForm.subject}
                      onChange={(e) => setFeedbackForm({...feedbackForm, subject: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Brief description of your feedback"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={feedbackForm.description}
                      onChange={(e) => setFeedbackForm({...feedbackForm, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Provide detailed feedback, steps to reproduce issues, or suggestions for improvement..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Attach File (Optional)
                    </label>
                    <input
                      type="file"
                      onChange={(e) => setFeedbackForm({...feedbackForm, file: e.target.files[0]})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Supported formats: PDF, JPG, PNG, DOC, DOCX (Max 10MB)
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="privacy-consent"
                        required
                        className="mr-2"
                      />
                      <label htmlFor="privacy-consent" className="text-sm text-gray-600">
                        I agree to the <a href="/privacy" className="text-green-600 hover:underline">Privacy Policy</a>
                      </label>
                    </div>
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition-colors"
                    >
                      Submit Feedback
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Help */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Quick Help</h3>
              <div className="space-y-3">
                <a href="/fra-atlas" className="flex items-center space-x-2 text-green-600 hover:text-green-800">
                  <span>🗺️</span>
                  <span className="text-sm">How to use FRA Atlas</span>
                </a>
                <a href="/digitization" className="flex items-center space-x-2 text-green-600 hover:text-green-800">
                  <span>🤖</span>
                  <span className="text-sm">Understanding AI Features</span>
                </a>
                <a href="/schemes" className="flex items-center space-x-2 text-green-600 hover:text-green-800">
                  <span>📋</span>
                  <span className="text-sm">Available Schemes Guide</span>
                </a>
                <a href="/resources" className="flex items-center space-x-2 text-green-600 hover:text-green-800">
                  <span>📚</span>
                  <span className="text-sm">Documentation & Guides</span>
                </a>
              </div>
            </div>

            {/* Support Contacts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="font-semibold text-gray-800 mb-4">Support Contacts</h3>
              <div className="space-y-4">
                {supportContacts.map((contact, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <h4 className="font-medium text-gray-800 mb-1">{contact.title}</h4>
                    <p className="text-sm text-gray-600 mb-2">{contact.description}</p>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2 text-sm">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span className="text-green-600">{contact.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="w-3 h-3 text-gray-400" />
                        <span className="text-green-600">{contact.email}</span>
                      </div>
                      <p className="text-xs text-gray-500">{contact.hours}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">Emergency Support</h4>
              <p className="text-sm text-red-700">
                For urgent technical issues affecting official operations, contact:
              </p>
              <p className="text-sm font-medium text-red-800 mt-1">
                Emergency Hotline: 1800-XXX-EMRG
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};