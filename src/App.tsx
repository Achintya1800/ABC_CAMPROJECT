import React, { useState } from 'react';
import { Search, Filter, Plus, Upload, ArrowLeft, X, CheckCircle, Clock, MessageCircle, Send, FileText, Download, Mail } from 'lucide-react';

function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard'); // 'dashboard', 'newApplication', 'uploading', 'cmDashboard', 'camGeneration', 'camOutput'
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [showVerifyPopup, setShowVerifyPopup] = useState(false);
  const [isDocumentsApproved, setIsDocumentsApproved] = useState(false);
  const [camProgress, setCamProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showEmailPopup, setShowEmailPopup] = useState(false);
  const [securityDetailsClicked, setSecurityDetailsClicked] = useState(false);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { type: 'bot', message: 'Hello! I\'m your CAM Assistant. How can I help you with this Credit Assessment Memo?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [selectedSection, setSelectedSection] = useState('executive');
  const [applications, setApplications] = useState([
    {
      id: 'APP001',
      applicant: 'Sharma Industries Pvt Ltd',
      amount: '₹25,00,000',
      program: 'Term Loan',
      status: 'In Progress',
      progress: 85
    },
    {
      id: 'APP002',
      applicant: 'Tech Solutions Inc',
      amount: '₹50,00,000',
      program: 'Working Capital',
      status: 'Pending',
      progress: 35
    },
    {
      id: 'APP003',
      applicant: 'Manufacturing Co.',
      amount: '₹1,00,00,000',
      program: 'Equipment Loan',
      status: 'Verified',
      progress: 55
    },
    {
      id: 'APP004',
      applicant: 'Export Business Ltd',
      amount: '₹75,00,000',
      program: 'LC Limit',
      status: 'In Progress',
      progress: 10
    }
  ]);

  const documentChecklist = [
    { name: 'Periods Report', status: 'uploaded' },
    { name: 'Bank Statements', status: 'uploaded' },
    { name: 'GST Reports', status: 'uploaded' },
    { name: 'Shareholding Certificates', status: 'uploaded' },
    { name: 'Anchor Certificates', status: 'uploaded' },
    { name: 'BI Reports', status: 'uploaded' },
    { name: 'Consumer CIBIL', status: 'uploaded' },
    { name: 'Commercial CIBIL', status: 'uploaded' },
    { name: 'Udyam Regst Certificate', status: 'uploaded' },
    { name: 'Audit Reports', status: 'uploaded' }
  ];

  const handleNewApplicationClick = () => {
    setCurrentScreen('newApplication');
  };

  const handleBackToDashboard = () => {
    setCurrentScreen('dashboard');
    setSelectedFiles(null);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(event.target.files);
    }
  };

  const handleUpload = () => {
    if (selectedFiles) {
      setCurrentScreen('uploading');
      
      // Simulate upload process
      setTimeout(() => {
        // Add new application entry
        const newApplication = {
          id: 'APP005',
          applicant: 'Vishnu Packwell Pvt Ltd',
          amount: '₹35,00,000',
          program: 'Term Loan',
          status: isDocumentsApproved ? 'Verified' : 'New',
          progress: 0
        };
        
        setApplications(prev => [newApplication, ...prev]);
        setCurrentScreen('dashboard');
        setSelectedFiles(null);
      }, 3000); // 3 second upload simulation
    }
  };

  const handleVerifyDocuments = () => {
    setShowVerifyPopup(true);
  };

  const closeVerifyPopup = () => {
    setShowVerifyPopup(false);
  };

  const handleApproveDocuments = () => {
    setIsDocumentsApproved(true);
    setApplications(prev => 
      prev.map(app => 
        app.applicant === 'Vishnu Packwell Pvt Ltd' 
          ? { ...app, status: 'Verified', progress: 100 }
          : app
      )
    );
    setShowVerifyPopup(false);
  };

  const handleCMQueue = () => {
    setCurrentScreen('cmDashboard');
  };

  const handleBackFromCM = () => {
    setCurrentScreen('dashboard');
  };

  const handleGenerateCAM = () => {
    setCurrentScreen('camGeneration');
    setCamProgress(0);
    setCompletedSteps([]);
    
    // Smooth progressive loading with different messages
    let currentProgress = 0;
    
    // Step 1: Reading Documents (0% to 44%)
    const step1Interval = setInterval(() => {
      currentProgress += 2;
      setCamProgress(currentProgress);
      if (currentProgress >= 44) {
        clearInterval(step1Interval);
        setCompletedSteps([0]);
        
        // Step 2: Building Basic CAM (44% to 58%)
        const step2Interval = setInterval(() => {
          currentProgress += 1;
          setCamProgress(currentProgress);
          if (currentProgress >= 58) {
            clearInterval(step2Interval);
            setCompletedSteps([0, 1]);
            
            // Step 3: Financial Plotting (58% to 87%)
            const step3Interval = setInterval(() => {
              currentProgress += 1;
              setCamProgress(currentProgress);
              if (currentProgress >= 87) {
                clearInterval(step3Interval);
                setCompletedSteps([0, 1, 2]);
                
                // Step 4: Generating CAM Report (87% to 100%)
                const step4Interval = setInterval(() => {
                  currentProgress += 1;
                  setCamProgress(currentProgress);
                  if (currentProgress >= 100) {
                    clearInterval(step4Interval);
                    setCompletedSteps([0, 1, 2, 3]);
                  }
                }, 100);
              }
            }, 150);
          }
        }, 200);
      }
    }, 100);

    // Return to CM Dashboard after completion
    setTimeout(() => {
      setCurrentScreen('camOutput');
      setShowEmailPopup(true);
    }, 18000); // 18 seconds total
  };

  // Get current status message based on progress
  const getCurrentStatusMessage = () => {
    if (camProgress < 22) return "Starting analysis...";
    if (camProgress < 44) return "Documents collected successfully!";
    if (camProgress < 58) return "Data fetched and processed!";
    if (camProgress < 87) return "Financial analysis completed!";
    if (camProgress < 100) return "Generating CAM... Please wait";
    return "Complete CAM generated successfully!";
  };

  const getStatusMessageColor = () => {
    if (camProgress < 22) return "text-blue-600";
    if (camProgress < 44) return "text-green-600";
    if (camProgress < 58) return "text-green-600";
    if (camProgress < 87) return "text-green-600";
    if (camProgress < 100) return "text-blue-600";
    return "text-green-600";
  };

  const handleSendMessage = () => {
    if (chatInput.trim()) {
      setChatMessages(prev => [...prev, { type: 'user', message: chatInput }]);
      
      // Simulate bot response
      setTimeout(() => {
        setChatMessages(prev => [...prev, { 
          type: 'bot', 
          message: 'I understand your query about the CAM. Let me help you with that information.' 
        }]);
      }, 1000);
      
      setChatInput('');
    }
  };

  const closeEmailPopup = () => {
    setShowEmailPopup(false);
  };

  const toggleChatbot = () => {
    setShowChatbot(!showChatbot);
  };

  const handleSectionClick = (section: string) => {
    setSelectedSection(section);
    if (section === 'security') {
      setSecurityDetailsClicked(true);
    }
  };

  const getSectionContent = () => {
    switch (selectedSection) {
      case 'executive':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 bg-blue-50 p-3 rounded">
              Executive Summary
            </h3>
            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>Applicant:</strong> Vishnu Packwell Private Limited is a private limited company engaged in manufacturing of packaging materials and corrugated boxes.
              </p>
              <p className="text-gray-700">
                <strong>Business Overview:</strong> The company has been in operation since 2017 and has established a strong presence in the packaging industry with consistent growth in revenue and profitability.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-2">Key Strengths:</h4>
                <ul className="list-disc list-inside text-green-700 space-y-1">
                  <li>Experienced management team</li>
                  <li>Diversified customer base</li>
                  <li>Strong financial performance</li>
                  <li>Good market position</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'applicant':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 bg-blue-50 p-3 rounded">
              Applicant Profile
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">Legal Name of Business:</span>
                  <p className="text-gray-900">Vishnu Packwell Private Limited</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Date of Incorporation:</span>
                  <p className="text-gray-900">18/09/2017</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Constitution:</span>
                  <p className="text-gray-900">Private Limited Company</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="font-medium text-gray-700">GST Number:</span>
                  <p className="text-gray-900">09*******121</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Udyam Number:</span>
                  <p className="text-gray-900">UDYAM-DL-06-0023962</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Mobile Number:</span>
                  <p className="text-gray-900">98*****231</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'financial':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 bg-blue-50 p-3 rounded">
              Financial Analysis
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-2 text-left">Particulars</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">FY 2022-23</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">FY 2021-22</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">FY 2020-21</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Total Income</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">₹45.2 Cr</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">₹38.7 Cr</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">₹32.1 Cr</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Net Profit</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">₹3.8 Cr</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">₹3.2 Cr</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">₹2.7 Cr</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 px-4 py-2 font-medium">Net Worth</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">₹18.5 Cr</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">₹15.2 Cr</td>
                    <td className="border border-gray-300 px-4 py-2 text-right">₹12.8 Cr</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'risk':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 bg-blue-50 p-3 rounded">
              Risk Assessment
            </h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Risk Metrics</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">DSCR:</span>
                    <span className="font-medium text-green-600">2.1x</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">LTV:</span>
                    <span className="font-medium text-blue-600">55%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Probability of Default:</span>
                    <span className="font-medium text-orange-600">2.3%</span>
                  </div>
                </div>
              </div>
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Risk Factors</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Industry cyclicality</li>
                  <li>• Raw material price volatility</li>
                  <li>• Competition from organized players</li>
                  <li>• Working capital requirements</li>
                </ul>
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 bg-blue-50 p-3 rounded">
              Security Details
            </h3>
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Primary Security</h4>
                <p className="text-green-700">First charge on all current assets of the company including stock, book debts, and other movable assets.</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">Collateral Security</h4>
                <p className="text-blue-700">Mortgage of industrial property located at Sector-80, Gautambudha Nagar, Uttar Pradesh valued at ₹45 Lakhs.</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-semibold text-purple-800 mb-2">Personal Guarantee</h4>
                <p className="text-purple-700">Personal guarantee of promoters - Mr. Ankit Babbar and Mrs. Ritu Babbar.</p>
              </div>
            </div>
          </div>
        );
      case 'recommendation':
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 bg-blue-50 p-3 rounded">
              Recommendation
            </h3>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold text-green-800 mb-4">Credit Recommendation: APPROVED</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-medium text-gray-700">Facility Type:</span>
                    <p className="text-gray-900">Term Loan</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Amount:</span>
                    <p className="text-gray-900">₹35,00,000</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Interest Rate:</span>
                    <p className="text-gray-900">12.5% p.a.</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Tenure:</span>
                    <p className="text-gray-900">60 months</p>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="font-medium text-gray-700">Conditions:</span>
                  <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                    <li>Quarterly financial statements to be submitted</li>
                    <li>Insurance coverage to be maintained</li>
                    <li>No additional borrowings without consent</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const getSectionComments = () => {
    switch (selectedSection) {
      case 'executive':
        return "Overall assessment shows strong business fundamentals with consistent growth trajectory.";
      case 'applicant':
        return "Company profile indicates well-established business with proper documentation and compliance.";
      case 'financial':
        return "Financial performance shows healthy growth with improving profitability margins.";
      case 'risk':
        return "Risk assessment indicates manageable risk profile with adequate mitigation measures.";
      case 'security':
        return "Security structure provides adequate coverage with multiple layers of protection.";
      case 'recommendation':
        return "Recommended for approval based on comprehensive analysis and risk assessment.";
      default:
        return "Add your comments for this section...";
    }
  };

  // CAM Output Screen
  if (currentScreen === 'camOutput') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Logo */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-sm flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="text-red-600 font-bold text-lg">
                  ADITYA BIRLA<br />
                  <span className="text-red-700">CAPITAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex h-[calc(100vh-80px)]">
          {/* Left Sidebar */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Document Outline */}
            <div className="p-4 border-b border-gray-200">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Document Outline</h3>
                
                {/* Navigation Items */}
                <div className="space-y-1">
                  <div 
                    onClick={() => handleSectionClick('executive')}
                    className={`px-3 py-2 rounded text-sm font-medium cursor-pointer ${
                      selectedSection === 'executive' ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    📋 Executive Summary
                  </div>
                  <div 
                    onClick={() => handleSectionClick('applicant')}
                    className={`px-3 py-2 rounded text-sm font-medium cursor-pointer ${
                      selectedSection === 'applicant' ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    👤 Applicant Profile
                  </div>
                  <div 
                    onClick={() => handleSectionClick('financial')}
                    className={`px-3 py-2 rounded text-sm font-medium cursor-pointer ${
                      selectedSection === 'financial' ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    📊 Financial Analysis
                  </div>
                  <div 
                    onClick={() => handleSectionClick('risk')}
                    className={`px-3 py-2 rounded text-sm font-medium cursor-pointer ${
                      selectedSection === 'risk' ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    ⚠️ Risk Assessment
                  </div>
                  <div 
                    onClick={() => handleSectionClick('security')}
                    className={`px-3 py-2 rounded text-sm font-medium cursor-pointer ${
                      selectedSection === 'security' ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    🔒 Security Details
                  </div>
                  <div 
                    onClick={() => handleSectionClick('recommendation')}
                    className={`px-3 py-2 rounded text-sm font-medium cursor-pointer ${
                      selectedSection === 'recommendation' ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    💡 Recommendation
                  </div>
                </div>
              </div>
            </div>

            {/* Comments */}
            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Comments</h4>
              <div className="bg-gray-50 p-3 rounded border text-sm text-gray-700">
                {getSectionComments()}
              </div>
            </div>
          </div>

          {/* Main Document Viewer */}
          <div className="flex-1 bg-white overflow-hidden">
            <div className="h-full flex flex-col">
              {/* Document Header */}
              <div className="border-b border-gray-200 p-6 bg-white">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Credit Assessment Memo</h2>
                  <span className="text-sm text-gray-500">Application No: CAM-2024-007</span>
                </div>
                <div className="flex items-center space-x-3 mt-4 items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Risk Rating: BB+
                    </span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      Limit: ₹25L
                    </span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      Tenor: 60M
                    </span>
                    <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm font-medium">
                      50% Complete
                    </span>
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                    <Download className="w-4 h-4" />
                    Generate PDF
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {getSectionContent()}
              </div>

              {/* Decision Buttons at Bottom */}
              <div className="border-t border-gray-200 p-6 bg-white">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="mr-2">👤</span>
                  <h4 className="font-semibold text-gray-900">Decision</h4>
                </div>
                <div className="flex space-x-4">
                  <button 
                    disabled={!securityDetailsClicked}
                    className={`flex-1 py-3 rounded font-medium ${
                      securityDetailsClicked 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    ✓ Approve
                  </button>
                  <button 
                    disabled={!securityDetailsClicked}
                    className={`flex-1 py-3 rounded font-medium ${
                      securityDetailsClicked 
                        ? 'bg-gray-500 text-white hover:bg-gray-600' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    ↩ Send Back
                  </button>
                  <button 
                    disabled={!securityDetailsClicked}
                    className={`flex-1 py-3 rounded font-medium ${
                      securityDetailsClicked 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    ✗ Reject
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Chatbot Area */}
          <div className="w-80 bg-gray-50 border-l border-gray-200 flex flex-col items-center justify-center relative">
            {!showChatbot ? (
              <div className="text-center">
                <button
                  onClick={toggleChatbot}
                  className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <MessageCircle size={32} />
                </button>
                <p className="mt-4 text-gray-600 font-medium">CAM Assistant</p>
                <p className="text-sm text-gray-500">Click to start chat</p>
              </div>
            ) : (
              <div className="w-full h-full flex flex-col">
                {/* Chatbot Header */}
                <div className="bg-red-600 text-white p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <MessageCircle size={20} />
                    <span className="font-medium">CAM Assistant</span>
                  </div>
                  <button
                    onClick={toggleChatbot}
                    className="text-white hover:text-gray-200"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {chatMessages.map((msg, index) => (
                    <div
                      key={index}
                      className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs p-3 rounded-lg ${
                          msg.type === 'user'
                            ? 'bg-red-600 text-white'
                            : 'bg-white border border-gray-200 text-gray-800'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="p-4 border-t border-gray-200 bg-white">
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask about this CAM..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-md"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Email Popup */}
        {showEmailPopup && (
          <div className="fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-50">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-sm">CAM Generate Successfully </span>
              </div>
              <button
                onClick={() => setShowEmailPopup(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              CAM has been generated and sent to the credit manager's email id.
            </p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700">
                View
              </button>
              <button
                onClick={() => setShowEmailPopup(false)}
                className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded hover:bg-gray-300"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Upload Animation Screen
  if (currentScreen === 'uploading') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Logo */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-sm flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="text-red-600 font-bold text-lg">
                  ADITYA BIRLA<br />
                  <span className="text-red-700">CAPITAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Upload Animation Content */}
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="mb-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-red-600 mx-auto"></div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Uploading Documents</h2>
            <p className="text-gray-600 mb-4">Please wait, documents are uploading...</p>
            <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto">
              <div className="bg-red-600 h-2 rounded-full animate-pulse" style={{ width: '70%' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CAM Generation Screen
  if (currentScreen === 'camGeneration') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Logo */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-sm flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="text-red-600 font-bold text-lg">
                  ADITYA BIRLA<br />
                  <span className="text-red-700">CAPITAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CAM Generation Content */}
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6 bg-gradient-to-br from-gray-50 to-gray-100">
          <div className="max-w-5xl w-full bg-white rounded-2xl shadow-2xl p-12 border border-gray-100">
            {/* Header */}
            <div className="flex items-center space-x-6 mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-2xl">ABC</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Automated Credit Assessment Memo Solution</h1>
                <p className="text-lg text-gray-600">Fully automated Agentic AI + Gen AI based CAM ++ Generation Solution</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-12">
              <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                <div 
                  className="bg-gradient-to-r from-red-500 to-red-600 h-4 rounded-full transition-all duration-300 ease-out shadow-sm" 
                  style={{ width: `${camProgress}%` }}
                ></div>
              </div>
              <div className="text-center mt-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">{camProgress}% Complete</h2>
                <p className={`font-semibold text-lg ${getStatusMessageColor()}`}>
                  {getCurrentStatusMessage()}
                </p>
              </div>
            </div>

            {/* Success Icon - Only show when complete */}
            {camProgress === 100 && (
              <div className="text-center mb-12 animate-fade-in">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-bounce">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-green-600 mb-3">CAM Generation Complete!</h3>
                <p className="text-gray-600 text-lg">Redirecting to CAM Composer...</p>
              </div>
            )}

            {/* Process Steps */}
            <div className="grid grid-cols-4 gap-8 mb-12">
              {['Reading Documents', 'Building Basic CAM', 'Financial Plotting', 'Generating CAM Report'].map((step, index) => (
                <div key={index} className="text-center transform transition-all duration-500 hover:scale-105">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-all duration-500 ${
                    completedSteps.includes(index) 
                      ? 'bg-gradient-to-br from-green-500 to-green-600 shadow-lg' 
                      : 'bg-gray-300'
                  }`}>
                    {completedSteps.includes(index) ? (
                      <svg className="w-6 h-6 text-white animate-scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span className="text-gray-600 font-bold text-sm">{index + 1}</span>
                    )}
                  </div>
                  <h4 className={`font-bold mb-2 transition-colors duration-500 text-sm ${
                    completedSteps.includes(index) ? 'text-green-600' : 'text-gray-500'
                  }`}>{step}</h4>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="text-center text-gray-600 text-base bg-gray-50 rounded-lg p-6">
              <p className="leading-relaxed">Takes input from Bank Statements, Emails, Perfios Reports, Consumer and Commercial CIBIL, Share Holding Certificates, GST Filing Reports ... in PDF, XLSX, MSG, HTML Formats</p>
            </div>

            {/* Processing Status */}
            <div className="text-right mt-8">
              <p className="text-gray-500 text-sm">
                {camProgress === 100 ? 'Processing complete!' : 'Processing... Please wait'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // CM Dashboard Screen
  if (currentScreen === 'cmDashboard') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Logo */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-sm flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="text-red-600 font-bold text-lg">
                  ADITYA BIRLA<br />
                  <span className="text-red-700">CAPITAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-6">
          {/* Dashboard Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-red-600 mb-2">CM Dashboard</h1>
              <p className="text-gray-500">Review and process credit applications</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search Applications....."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Applications Table */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Application ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Applicant</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Program</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">APP005</td>
                  <td className="px-6 py-4 text-sm text-gray-900">Vishnu Packwell Pvt Ltd</td>
                  <td className="px-6 py-4 text-sm text-gray-900">₹35,00,000</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Term Loan
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">Received New Application</td>
                  <td className="px-6 py-4">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium">
                      <span onClick={handleGenerateCAM}>Generate CAM</span>
                    </button>
                  </td>
                </tr>
                {applications.slice(0, 4).map((app) => (
                  <tr key={app.id}>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{app.applicant}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{app.amount}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {app.program}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{app.status}</td>
                    <td className="px-6 py-4">
                      <button 
                        onClick={() => setShowVerifyPopup(true)}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Back Button - Bottom Left */}
        <button
          onClick={handleBackFromCM}
          className="fixed bottom-6 left-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800 z-10"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>
      </div>
    );
  }

  // New Application Screen
  if (currentScreen === 'newApplication') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header with Logo */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-sm flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  </div>
                </div>
                <div className="text-red-600 font-bold text-lg">
                  ADITYA BIRLA<br />
                  <span className="text-red-700">CAPITAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* New Application Content */}
        <div className="px-6 py-6 flex justify-center relative">
          <div className="max-w-4xl w-full">
            <div className="bg-white rounded-lg border border-gray-300 p-8">
              {/* Header */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-red-600 mb-2">Intelligent Credit Appraisal Assistant</h1>
                <p className="text-gray-500">Upload your documents to begin the intelligent credit assessment process</p>
              </div>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 mb-8 text-center">
                <div className="mb-4">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-4">Drag your files here or click to browse</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-md cursor-pointer inline-block"
                >
                  Choose Files
                </label>
                {selectedFiles && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">
                      {selectedFiles.length} file(s) selected
                    </p>
                    <button
                      onClick={handleUpload}
                      className="mt-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md"
                    >
                      Upload
                    </button>
                  </div>
                )}
              </div>

              {/* Process Steps */}
              <div className="flex justify-center space-x-8 mb-8">
                {/* Step 1 */}
                <div className="text-center border border-gray-300 rounded-lg p-6 w-48">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    1
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Upload Docs</h3>
                  <p className="text-sm text-gray-500">Drag & drop documents</p>
                </div>

                {/* Step 2 */}
                <div className="text-center border border-gray-300 rounded-lg p-6 w-48">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    2
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">AI Analysis</h3>
                  <p className="text-sm text-gray-500">Intelligent Processing</p>
                </div>

                {/* Step 3 */}
                <div className="text-center border border-gray-300 rounded-lg p-6 w-48">
                  <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 text-sm font-bold">
                    3
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Generate CAM</h3>
                  <p className="text-sm text-gray-500">Automated reports</p>
                </div>
              </div>
            </div>
          </div>

          {/* Back Button - Bottom Left */}
          <button
            onClick={handleBackToDashboard}
            className="fixed bottom-6 left-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800 z-10"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
        </div>
      </div>
    );
  }

  // Dashboard Screen
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-sm flex items-center justify-center">
                <div className="grid grid-cols-2 gap-1">
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                  <div className="w-2 h-2 bg-white/80 rounded-sm"></div>
                  <div className="w-2 h-2 bg-white rounded-sm"></div>
                </div>
              </div>
              <div className="text-red-600 font-bold text-lg">
                ADITYA BIRLA<br />
                <span className="text-red-700">CAPITAL</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        {/* Dashboard Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-red-600 mb-2">Relationship Manager Dashboard</h1>
            <p className="text-gray-500">Manage credit applications and track progress</p>
          </div>
          <button 
            onClick={handleNewApplicationClick}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center space-x-2"
          >
            <Plus size={16} />
            <span>New Application</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search Applications....."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Application ID</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Applicant</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Amount</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Program</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Progress</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-red-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {applications.map((app) => (
                <tr key={app.id}>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{app.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{app.applicant}</td>
                  <td className="px-6 py-4 text-sm text-gray-900">{app.amount}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      {app.program}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{app.status}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-red-600 h-2 rounded-full" style={{ width: `${app.progress}%` }}></div>
                      </div>
                      <span className="text-xs text-gray-500">{app.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {app.applicant === 'Vishnu Packwell Pvt Ltd' ? (
                      app.status === 'Verified' ? (
                        <button 
                          onClick={handleCMQueue}
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm font-medium"
                        >
                          CM Queue
                        </button>
                      ) : (
                        <button 
                          onClick={handleVerifyDocuments}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium"
                        >
                          Verify Documents
                        </button>
                      )
                    ) : (
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">View</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Back Button - Bottom Left (for dashboard) */}
      <button
        onClick={() => {/* Add navigation logic if needed */}}
        className="fixed bottom-6 left-6 flex items-center space-x-2 text-gray-600 hover:text-gray-800 z-10"
        style={{ display: 'none' }} // Hidden on dashboard as it's the main page
      >
        <ArrowLeft size={16} />
        <span>Back</span>
      </button>

      {/* Verify Documents Popup */}
      {showVerifyPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
            {/* Popup Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-red-600">Document Verification</h2>
                <p className="text-gray-500 mt-1">Vishnu Packwell Pvt Ltd - APP005</p>
              </div>
              <button
                onClick={closeVerifyPopup}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            {/* Document Status */}
            <div className="p-6">
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-4">
                  <CheckCircle className="text-green-600" size={20} />
                  <span className="text-green-600 font-medium">All documents uploaded successfully</span>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 text-sm">
                    <strong>Status:</strong> Ready for verification • <strong>Upload Date:</strong> {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Document Checklist */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900 mb-4">Document Checklist</h3>
                {documentChecklist.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="text-green-600" size={16} />
                      <span className="text-gray-900">{doc.name}</span>
                    </div>
                    <span className="text-green-600 text-sm font-medium">Uploaded</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mt-8">
                <button
                  onClick={handleApproveDocuments}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium"
                >
                  Approve Documents
                </button>
                <button
                  onClick={closeVerifyPopup}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-3 px-4 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;