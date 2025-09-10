import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Upload, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  ArrowLeft,
  Building2,
  User,
  Calendar,
  DollarSign,
  TrendingUp,
  FileCheck,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';

interface Application {
  id: string;
  applicant: string;
  amount: string;
  program: string;
  status: 'New' | 'In Progress' | 'Pending' | 'Verified';
  progress: number;
}

const mockApplications: Application[] = [
  {
    id: 'APP005',
    applicant: 'Vishnu Packwell Pvt Ltd',
    amount: '₹35,00,000',
    program: 'Term Loan',
    status: 'Verified',
    progress: 100
  },
  {
    id: 'APP001',
    applicant: 'Sharma Industries Pvt Ltd',
    amount: '₹25,00,000',
    program: 'Term Loan',
    status: 'In Progress',
    progress: 65
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
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'New': return 'bg-blue-100 text-blue-800';
    case 'In Progress': return 'bg-yellow-100 text-yellow-800';
    case 'Pending': return 'bg-orange-100 text-orange-800';
    case 'Verified': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getProgressColor = (progress: number) => {
  if (progress >= 80) return 'bg-green-500';
  if (progress >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
};

function App() {
  const [currentScreen, setCurrentScreen] = useState<'dashboard' | 'documents' | 'cm-dashboard' | 'cam-generation' | 'cpa-checklist'>('dashboard');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [camProgress, setCamProgress] = useState(0);
  const [camStage, setCamStage] = useState('');
  const [isGeneratingCAM, setIsGeneratingCAM] = useState(false);
  const [securityVerified, setSecurityVerified] = useState(false);
  const [cpaProgress, setCpaProgress] = useState(3); // Current step in CPA process

  const filteredApplications = mockApplications.filter(app =>
    app.applicant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewApplication = (app: Application) => {
    setSelectedApplication(app);
    setCurrentScreen('documents');
  };

  const handleSendToCM = () => {
    setCurrentScreen('cm-dashboard');
  };

  const handleSendToCPA = () => {
    setCurrentScreen('cpa-checklist');
  };

  const handleGenerateCAM = () => {
    setIsGeneratingCAM(true);
    setCamProgress(0);
    setCamStage('Reading Documents');
    
    const stages = [
      { name: 'Reading Documents', duration: 2000, endProgress: 44 },
      { name: 'Building Basic CAM', duration: 1500, endProgress: 58 },
      { name: 'Financial Plotting', duration: 2500, endProgress: 87 },
      { name: 'Generating CAM Report', duration: 1000, endProgress: 100 }
    ];

    let currentStageIndex = 0;
    
    const runStage = (stageIndex: number) => {
      if (stageIndex >= stages.length) {
        setIsGeneratingCAM(false);
        return;
      }

      const stage = stages[stageIndex];
      setCamStage(stage.name);
      
      const startProgress = stageIndex === 0 ? 0 : stages[stageIndex - 1].endProgress;
      const progressIncrement = (stage.endProgress - startProgress) / (stage.duration / 50);
      
      let currentProgress = startProgress;
      const interval = setInterval(() => {
        currentProgress += progressIncrement;
        if (currentProgress >= stage.endProgress) {
          currentProgress = stage.endProgress;
          clearInterval(interval);
          setCamProgress(currentProgress);
          setTimeout(() => runStage(stageIndex + 1), 200);
        } else {
          setCamProgress(currentProgress);
        }
      }, 50);
    };

    runStage(0);
  };

  const handleSecurityVerification = () => {
    setSecurityVerified(true);
  };

  const renderDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="bg-red-500 p-2 rounded">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ADITYA BIRLA</h1>
              <p className="text-sm text-red-500 font-medium">CAPITAL</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Relationship Manager Dashboard</h1>
            <p className="text-gray-600">Manage credit applications and track progress</p>
          </div>
          <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors">
            <Plus className="w-5 h-5" />
            <span>New Application</span>
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search Applications..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Application ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredApplications.map((app) => (
                <tr key={app.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.applicant}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{app.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      {app.program}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(app.status)}`}>
                      {app.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 rounded-full h-2 mr-3">
                        <div 
                          className={`h-2 rounded-full ${getProgressColor(app.progress)}`}
                          style={{ width: `${app.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{app.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {app.status === 'Verified' ? (
                      <div className="flex space-x-2">
                        <button 
                          onClick={handleSendToCM}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs transition-colors"
                        >
                          CM Queue
                        </button>
                        <button 
                          onClick={handleSendToCPA}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs transition-colors"
                        >
                          Send to CPA
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => handleViewApplication(app)}
                        className="text-blue-600 hover:text-blue-900 flex items-center space-x-1"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View</span>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderDocuments = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="bg-red-500 p-2 rounded">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ADITYA BIRLA</h1>
              <p className="text-sm text-red-500 font-medium">CAPITAL</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Document Management</h1>
          <p className="text-gray-600">Upload and verify required documents for {selectedApplication?.applicant}</p>
        </div>

        {/* Application Info */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <FileText className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm text-gray-500">Application ID</p>
                <p className="font-semibold">{selectedApplication?.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <User className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Applicant</p>
                <p className="font-semibold">{selectedApplication?.applicant}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <DollarSign className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-semibold">{selectedApplication?.amount}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">Program</p>
                <p className="font-semibold">{selectedApplication?.program}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Document Upload */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Upload Documents</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-red-400 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop files here, or click to browse</p>
              <p className="text-sm text-gray-500">Supports PDF, DOC, DOCX, XLS, XLSX files</p>
              <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors">
                Choose Files
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Document Checklist</h2>
            <div className="space-y-3">
              {[
                { name: 'Application Form', status: 'completed' },
                { name: 'Bank Statements', status: 'completed' },
                { name: 'Financial Statements', status: 'completed' },
                { name: 'CIBIL Report', status: 'pending' },
                { name: 'GST Returns', status: 'pending' },
                { name: 'Audit Report', status: 'missing' }
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{doc.name}</span>
                  {doc.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                  {doc.status === 'pending' && <Clock className="w-5 h-5 text-yellow-500" />}
                  {doc.status === 'missing' && <AlertTriangle className="w-5 h-5 text-red-500" />}
                </div>
              ))}
            </div>
            <button className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-colors">
              Mark as Verified
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCMDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="bg-red-500 p-2 rounded">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ADITYA BIRLA</h1>
              <p className="text-sm text-red-500 font-medium">CAPITAL</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Credit Manager Dashboard</h1>
          <p className="text-gray-600">Review applications and generate Credit Assessment Memos</p>
        </div>

        {/* Application Queue */}
        <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Application Queue</h2>
          </div>
          <div className="p-6">
            <div className="border rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Vishnu Packwell Pvt Ltd</h3>
                  <p className="text-gray-600">Application ID: APP005</p>
                  <p className="text-gray-600">Amount: ₹35,00,000 | Program: Term Loan</p>
                </div>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setCurrentScreen('cam-generation')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                  >
                    Generate CAM
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCAMGeneration = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentScreen('cm-dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="bg-red-500 p-2 rounded">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ADITYA BIRLA</h1>
              <p className="text-sm text-red-500 font-medium">CAPITAL</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Credit Assessment Memo Generation</h1>
            <p className="text-gray-600">Automated CAM generation for Vishnu Packwell Pvt Ltd</p>
          </div>

          {/* CAM Generation Progress */}
          <div className="bg-white rounded-lg shadow p-8 mb-6">
            <div className="text-center mb-8">
              <div className="w-32 h-32 mx-auto mb-6 relative">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#ef4444"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - camProgress / 100)}`}
                    className="transition-all duration-300 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-900">{Math.round(camProgress)}%</span>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{camStage}</h3>
              <p className="text-gray-600">Processing documents and generating comprehensive assessment...</p>
            </div>

            {!isGeneratingCAM && camProgress === 0 && (
              <div className="text-center">
                <button 
                  onClick={handleGenerateCAM}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors"
                >
                  Start CAM Generation
                </button>
              </div>
            )}

            {camProgress === 100 && (
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2 text-green-600 mb-4">
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-lg font-semibold">CAM Generated Successfully!</span>
                </div>
                
                {!securityVerified && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                    <div className="flex items-center space-x-2 text-yellow-800 mb-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="font-semibold">Security Verification Required</span>
                    </div>
                    <p className="text-yellow-700 text-sm mb-3">Please complete security verification to unlock decision options.</p>
                    <button 
                      onClick={handleSecurityVerification}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded text-sm transition-colors"
                    >
                      Complete Security Verification
                    </button>
                  </div>
                )}

                <div className="flex justify-center space-x-4">
                  <button 
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      securityVerified 
                        ? 'bg-green-500 hover:bg-green-600 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!securityVerified}
                  >
                    Approve
                  </button>
                  <button 
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      securityVerified 
                        ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!securityVerified}
                  >
                    Send Back
                  </button>
                  <button 
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      securityVerified 
                        ? 'bg-red-500 hover:bg-red-600 text-white' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={!securityVerified}
                  >
                    Reject
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Document Processing Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Document Processing Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: 'Bank Statements', status: 'completed' },
                { name: 'Perfios Report', status: 'completed' },
                { name: 'CIBIL Consumer', status: 'completed' },
                { name: 'CIBIL Commercial', status: 'processing' },
                { name: 'GST Filing Report', status: 'pending' },
                { name: 'Shareholding Certificate', status: 'pending' },
                { name: 'Audit Report', status: 'pending' }
              ].map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{doc.name}</span>
                  {doc.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                  {doc.status === 'processing' && <Clock className="w-5 h-5 text-blue-500 animate-spin" />}
                  {doc.status === 'pending' && <Clock className="w-5 h-5 text-gray-400" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCPAChecklist = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setCurrentScreen('dashboard')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="bg-red-500 p-2 rounded">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ADITYA BIRLA</h1>
              <p className="text-sm text-red-500 font-medium">CAPITAL</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">CPA Documentation Checklist</h1>
            <p className="text-gray-600">Verify document completeness and compliance</p>
          </div>

          {/* Progress Indicator */}
          <div className="bg-white rounded-lg shadow p-8 mb-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Overall Progress</span>
                <span className="text-sm text-gray-500">{cpaProgress} of 4 Categories Completed</span>
              </div>
              <div className="flex items-center space-x-4">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold ${
                      step <= cpaProgress ? 'bg-red-500' : 'bg-gray-300'
                    }`}>
                      {step <= cpaProgress ? <CheckCircle2 className="w-6 h-6" /> : step}
                    </div>
                    {step < 4 && (
                      <div className={`w-16 h-1 mx-2 ${
                        step < cpaProgress ? 'bg-red-500' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-2 text-xs text-gray-500">
                <span>Step 1</span>
                <span>Step 2</span>
                <span>Step 3</span>
                <span>Step 4</span>
              </div>
            </div>
          </div>

          {/* Checklist Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Checklist Tab */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Checklist</h2>
              </div>
              <div className="p-6 space-y-6">
                {/* Documents Section */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-green-800">Documents</h3>
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="space-y-2 text-sm text-green-700">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Aadhar Card</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Pan Card</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Application Form</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Bank Statements</span>
                    </div>
                  </div>
                </div>

                {/* Compliance Documents Section */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-green-800">Compliance Documents</h3>
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="space-y-2 text-sm text-green-700">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>GST Returns</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>IT Returns</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>ROC Filings</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Audit Reports</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Issues Tab */}
            <div className="bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Issues</h2>
              </div>
              <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-red-800">Financial Audit Reports</h3>
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <div className="space-y-2 text-sm text-red-700">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>Audit Reports</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>Balance Sheets</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>P&L Statements</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>GST Statements</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>Missing Application track documents</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="text-center">
            <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Main render logic
  switch (currentScreen) {
    case 'documents':
      return renderDocuments();
    case 'cm-dashboard':
      return renderCMDashboard();
    case 'cam-generation':
      return renderCAMGeneration();
    case 'cpa-checklist':
      return renderCPAChecklist();
    default:
      return renderDashboard();
  }
}

export default App;