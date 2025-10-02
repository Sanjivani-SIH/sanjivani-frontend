import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { FRAAtlas } from './pages/FRAAtlas';
import { InsightsDashboard } from './pages/InsightsDashboard';
import { DigitizationAI } from './pages/DigitizationAI';
import { DecisionSupport } from './pages/DecisionSupport';
import { SchemesBenefits } from './pages/SchemesBenefits';
import { Resources } from './pages/Resources';
import { AboutGovernance } from './pages/AboutGovernance';
import { HelpFeedback } from './pages/HelpFeedback';
import { SecureLogin } from './pages/SecureLogin';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { FraProvider } from './contexts/FraContext';
import { SchemeProvider } from './contexts/SchemeContext';
import { ResourceProvider } from './contexts/ResourceContext';
import { LLMProvider } from './contexts/LLMContext';

// Protected route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);
  
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};



function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <FraProvider>
            <SchemeProvider>
              <ResourceProvider>
                <LLMProvider>
                  <Router>
                    <div className="min-h-screen bg-gray-50 flex flex-col dark:bg-gray-900 dark:text-gray-100">
                      <Header />
                      <main className="flex-grow">
                        <Routes>
                          {/* Public routes */}
                          <Route path="/login" element={<SecureLogin />} />
                          <Route path="/google/callback" element={<SecureLogin />} />
                          <Route path="/about" element={<AboutGovernance />} />
                          <Route path="/help" element={<HelpFeedback />} />
                          
                          {/* Protected routes */}
                          <Route path="/" element={
                            <ProtectedRoute>
                              <Home />
                            </ProtectedRoute>
                          } />
                          <Route path="/fra-atlas" element={
                            <ProtectedRoute>
                              <FRAAtlas />
                            </ProtectedRoute>
                          } />
                          <Route path="/insights" element={
                            <ProtectedRoute>
                              <InsightsDashboard />
                            </ProtectedRoute>
                          } />
                          <Route path="/digitization" element={
                            <ProtectedRoute>
                              <DigitizationAI />
                            </ProtectedRoute>
                          } />
                          <Route path="/decision-support" element={
                            <ProtectedRoute>
                              <DecisionSupport />
                            </ProtectedRoute>
                          } />
                          <Route path="/schemes" element={
                            <ProtectedRoute>
                              <SchemesBenefits />
                            </ProtectedRoute>
                          } />
                          <Route path="/resources" element={
                            <ProtectedRoute>
                              <Resources />
                            </ProtectedRoute>
                          } />
                        </Routes>
                      </main>
                      <Footer />
                    </div>
                  </Router>
                </LLMProvider>
              </ResourceProvider>
            </SchemeProvider>
          </FraProvider>
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;