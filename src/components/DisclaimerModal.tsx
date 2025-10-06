import React, { useState, useEffect } from 'react';
import { X, Download, Info } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { useChat } from '../contexts/ChatContext';

interface DisclaimerModalProps {
  downloadUrl?: string;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({ 
  downloadUrl = 'https://drive.google.com/file/d/1IFVmOjenN8le2CSwnFfarIgKwpoFnrlI/view?usp=sharing' // Default URL, can be overridden
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const { isOpen: isChatOpen } = useChat();

  useEffect(() => {
    // Set current date on mount
    setCurrentDate(new Date().toLocaleDateString());
    
    // Handle minimized state and first visit
    const isMinimized = sessionStorage.getItem('disclaimerModalMinimized');
    console.log('DisclaimerModal: Initial state check - isMinimized from storage:', isMinimized);
    
    if (isMinimized === 'true') {
      setIsMinimized(true);
      setIsOpen(false);
      console.log('DisclaimerModal: Starting minimized');
    } else if (isMinimized === null) {
      // First visit, show the modal
      setIsOpen(true);
      setIsMinimized(false);
      console.log('DisclaimerModal: First visit, showing modal');
    } else {
      setIsMinimized(false);
      setIsOpen(true);
      console.log('DisclaimerModal: Starting restored');
    }
  }, []);

  // Recovery mechanism - ensure button is visible after downloads/page changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Page became visible again, check our state
        const isMinimized = sessionStorage.getItem('disclaimerModalMinimized');
        console.log('DisclaimerModal: Page became visible, checking state:', isMinimized);
        
        if (isMinimized === 'true') {
          setIsMinimized(true);
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Monitor chat state changes for debugging
  useEffect(() => {
    console.log('DisclaimerModal: Chat state changed, isChatOpen:', isChatOpen);
  }, [isChatOpen]);

  const handleClose = () => {
    setIsMinimized(true);
    sessionStorage.setItem('disclaimerModalMinimized', 'true');
  };

  const handleRestore = () => {
    setIsMinimized(false);
    sessionStorage.setItem('disclaimerModalMinimized', 'false');
  };

  const handleDownload = () => {
    // Create a temporary link element for download
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = 'SIH_Presentation_Sanjivani.pptx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Minimize the modal after download to show the info button
    console.log('DisclaimerModal: Download triggered, minimizing modal');
    setIsMinimized(true);
    sessionStorage.setItem('disclaimerModalMinimized', 'true');
    console.log('DisclaimerModal: Session storage set to minimized');
  };

  if (isMinimized) {
    console.log('DisclaimerModal: Render minimized state, isChatOpen:', isChatOpen);
    
    // Always show the info button, but adjust position when chat is open
    const buttonPosition = isChatOpen ? 'bottom-44' : 'bottom-24';
    
    console.log('DisclaimerModal: Showing minimized button at position:', buttonPosition);
    return (
      <button
        onClick={handleRestore}
        className={`fixed right-6 z-[1100] w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${buttonPosition}`}
        aria-label="Restore disclaimer"
        title="Restore disclaimer"
        style={{ display: 'block' }} // Force display to ensure visibility
      >
        <Info className="w-6 h-6 mx-auto" />
      </button>
    );
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1100] flex items-center justify-center">
      {/* Semi-transparent background overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm transition-opacity duration-300"
        onClick={handleClose}
      />
      
      {/* Modal content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all duration-300 ease-out animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Important Notice</h2>
              <button
                onClick={handleClose}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Disclaimer text */}
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <span className="text-red-500 dark:text-red-400 text-xl">⚠️</span>
              <p className="text-sm text-red-700 dark:text-red-300 leading-relaxed">
                <strong>Disclaimer:</strong> The content on this website is purely for demonstration purposes. We do not claim any data or references (including Ministry of Tribal Affairs, government schemes, etc.) to be accurate or official.
              </p>
            </div>
          </div>

          {/* Development info */}
          <div className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
            <p>
              This project is still under development. Last updated on: <strong>{currentDate}</strong>
            </p>
            <p>
              All the current features were built within 1 week as part of the SIH (Smart India Hackathon) demo submission, and more functionalities are being implemented.
            </p>
          </div>

          {/* Download button */}
          <div className="pt-4">
            <button
              onClick={handleDownload}
              className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Download SIH PPT</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};