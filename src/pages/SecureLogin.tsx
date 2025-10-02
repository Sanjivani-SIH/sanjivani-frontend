import React, { useState, useEffect } from 'react';
import { Lock, User, Key, Shield, AlertTriangle, CheckCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

export const SecureLogin: React.FC = () => {
  const { t } = useLanguage();
  const { login, googleLogin, isLoggedIn, error: authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    otp: '',
    remember: false
  });
  const [loginStep, setLoginStep] = useState('credentials'); // credentials, otp, success
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Handle Google OAuth callback
  useEffect(() => {
    const handleGoogleCallback = async () => {
      const urlParams = new URLSearchParams(location.search);
      const code = urlParams.get('code');
      
      if (code && location.pathname === '/google/callback') {
        setLoading(true);
        try {
          await googleLogin(code);
          navigate('/');
        } catch (err: any) {
          setError(err.message || 'Failed to authenticate with Google');
        } finally {
          setLoading(false);
        }
      }
    };
    
    handleGoogleCallback();
  }, [location, googleLogin, navigate]);
  
  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      if (loginStep === 'credentials') {
        // For now, we'll skip OTP and directly login
        await login(loginForm.email, loginForm.password);
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleLoginClick = async () => {
    setLoading(true);
    try {
      const url = await googleLogin();
      window.location.href = url;
    } catch (err: any) {
      setError(err.message || 'Failed to initiate Google login');
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Shield,
      title: 'Multi-Factor Authentication',
      description: 'Secure 2FA with SMS/Email OTP verification'
    },
    {
      icon: Lock,
      title: 'Role-Based Access Control',
      description: 'Different access levels for various government roles'
    },
    {
      icon: Key,
      title: 'Single Sign-On (SSO)',
      description: 'Integration with government identity systems'
    }
  ];

  const accessLevels = [
    {
      role: 'Central Officials',
      permissions: ['Full Dashboard Access', 'All States Data', 'Policy Sandbox', 'System Administration'],
      color: 'bg-red-100 text-red-800'
    },
    {
      role: 'State Officers',
      permissions: ['State Dashboard', 'District Reports', 'SchemeLink Access', 'Progress Monitoring'],
      color: 'bg-blue-100 text-blue-800'
    },
    {
      role: 'District Officers',
      permissions: ['District Dashboard', 'Village Reports', 'Claims Tracking', 'Field Updates'],
      color: 'bg-green-100 text-green-800'
    },
    {
      role: 'Block Officers',
      permissions: ['Block Reports', 'Village Data Entry', 'Status Updates', 'Field Verification'],
      color: 'bg-purple-100 text-purple-800'
    }
  ];

  return (
    <div id="main-content" className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Secure Government Portal</h1>
            <p className="text-gray-600">Official access for authorized government personnel</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Login Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              {loginStep === 'credentials' && (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Government Official Login</h2>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex items-center">
                      <AlertTriangle className="w-5 h-5 mr-2" />
                      <span>{error}</span>
                    </div>
                  )}
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          required
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your email address"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="password"
                          required
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter your password"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={loginForm.remember}
                          onChange={(e) => setLoginForm({...loginForm, remember: e.target.checked})}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                      </label>
                      <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                        Forgot password?
                      </a>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center justify-center disabled:opacity-50"
                    >
                      {loading ? 'Verifying...' : 'Continue to 2FA'}
                    </button>
                    
                    <div className="mt-6">
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <button
                          type="button"
                          onClick={handleGoogleLoginClick}
                          disabled={loading}
                          className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors flex items-center justify-center"
                        >
                          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                            <path
                              fill="#4285F4"
                              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                              fill="#34A853"
                              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                              fill="#FBBC05"
                              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                              fill="#EA4335"
                              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                          </svg>
                          Sign in with Google
                        </button>
                      </div>
                    </div>
                  </form>
                </>
              )}

              {loginStep === 'otp' && (
                <>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Two-Factor Authentication</h2>
                  <div className="mb-6">
                    <p className="text-gray-600">
                      We've sent a 6-digit verification code to your registered mobile number ending in •••• 9876
                    </p>
                  </div>
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Enter OTP
                      </label>
                      <div className="relative">
                        <Key className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={loginForm.otp}
                          onChange={(e) => setLoginForm({...loginForm, otp: e.target.value})}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest"
                          placeholder="000000"
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <button type="button" className="text-sm text-blue-600 hover:text-blue-800">
                        Didn't receive code? Resend OTP
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors font-medium flex items-center justify-center disabled:opacity-50"
                    >
                      {loading ? 'Verifying OTP...' : 'Verify & Login'}
                    </button>
                  </form>
                </>
              )}

              {loginStep === 'success' && (
                <div className="text-center py-8">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Login Successful</h2>
                  <p className="text-gray-600 mb-6">
                    Welcome to Sanjivani Government Portal. You will be redirected to your dashboard.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-sm text-green-800">
                      <strong>Note:</strong> This is a demonstration. In the actual system, you would be redirected 
                      to the appropriate dashboard based on your role and permissions.
                    </p>
                  </div>
                </div>
              )}

              {/* Security Notice */}
              <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-yellow-800 mb-1">Security Notice</h4>
                    <p className="text-sm text-yellow-700">
                      This portal is for authorized government personnel only. Unauthorized access 
                      attempts are monitored and logged. All activities are subject to audit.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Panel */}
            <div className="space-y-6">
              {/* Security Features */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Security Features</h3>
                <div className="space-y-4">
                  {features.map((feature, index) => {
                    const IconComponent = feature.icon;
                    return (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{feature.title}</h4>
                          <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Access Levels */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Access Levels & Permissions</h3>
                <div className="space-y-4">
                  {accessLevels.map((level, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-800">{level.role}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${level.color}`}>
                          {level.role.split(' ')[0]}
                        </span>
                      </div>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {level.permissions.map((permission, permIndex) => (
                          <li key={permIndex} className="flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span>{permission}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Privacy Notice */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy & Data Protection</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    All data access and usage is governed by the Information Technology Act, 2000 
                    and relevant privacy regulations.
                  </p>
                  <p>
                    Login activities, data access patterns, and system usage are logged for 
                    security auditing and compliance purposes.
                  </p>
                  <p>
                    Personal data of citizens is encrypted and access is restricted based on 
                    official requirements and authorization levels.
                  </p>
                </div>
                <div className="mt-4 flex space-x-4">
                  <a href="/privacy" className="text-blue-600 hover:text-blue-800 text-sm">Privacy Policy</a>
                  <a href="/terms" className="text-blue-600 hover:text-blue-800 text-sm">Terms of Use</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};