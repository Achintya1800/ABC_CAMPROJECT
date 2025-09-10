import React, { useState, useEffect } from 'react';
import { 
  Building2, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Upload, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  ArrowLeft,
  Check,
  X
} from 'lucide-react';

interface Application {
  id: string;
  applicant: string;
  amount: string;
  program: string;
  status: 'New' | 'In Progress' | 'Pending' | 'Verified';
  progress: number;
}

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<string>('dashboard');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [verificationStatus, setVerificationStatus] = useState<{[key: string]: boolean}>({});
  const [allVerified, setAllVerified] = useState(false);
  const [camProgress, setCamProgress] = useState(0);
  const [camStage, setCamStage] = useState('');
  const [securityVerified, setSecurityVerified] = useState(false);

  const applications: Application[] = [
    { id: 'APP005', applicant: 'Vishnu Packwell Pvt Ltd', amount: '₹35,00,000', program: 'Term Loan', status: 'Verified', progress: 100 },
    { id: 'APP001', applicant: 'Sharma Industries Pvt Ltd', amount: '₹25,00,000', program: 'Term Loan', status: 'In Progress', progress: 65 },
    { id: 'APP002', applicant: 'Tech Solutions Inc', amount: '₹50,00,000', program: 'Working Capital', status: 'Pending', progress: 35 },
    { id: 'APP003', applicant: 'Manufacturing Co.', amount: '₹1,00,00,000', program: 'Equipment Loan', status: 'Verified', progress: 55 },
    { id: 'APP004', applicant: 'Export Business Ltd', amount: '₹75,00,000', program: 'LC Limit', status: 'In Progress', progress: 10 }
  ];

  const documents = [
    'Aadhar Card',
    'Pan Card', 
    'Application Form',
    'Bank Statements',
    'GST Returns',
    'IT Returns',
    'ROC Filings',
    'Audit Reports'
  ];

  const handleFileUpload = (files: FileList) => {
    const fileArray = Array.from(files);
    setSelectedFiles(fileArray);
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          setTimeout(() => setCurrentScreen('rm-dashboard'), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const handleVerificationChange = (doc: string, checked: boolean) => {
    const newStatus = { ...verificationStatus, [doc]: checked };
    setVerificationStatus(newStatus);
    
    const allChecked = documents.every(doc => newStatus[doc]);
    setAllVerified(allChecked);
  };

  const startCamGeneration = () => {
    setCurrentScreen('cam-generation');
    setCamProgress(0);
    setCamStage('Reading Documents');
    
    const stages = [
      { name: 'Reading Documents', end: 44 },
      { name: 'Building Basic CAM', end: 58 },
      { name: 'Financial Plotting', end: 87 },
      { name: 'Generating CAM Report', end: 100 }
    ];
    
    let currentStageIndex = 0;
    
    const interval = setInterval(() => {
      setCamProgress(prev => {
        const newProgress = prev + 1;
        
        if (currentStageIndex < stages.length - 1 && newProgress >= stages[currentStageIndex].end) {
          currentStageIndex++;
          setCamStage(stages[currentStageIndex].name);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setCurrentScreen('cam-complete'), 1000);
        }
        
        return newProgress;
      });
    }, 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'In Progress': return 'bg-yellow-100 text-yellow-800';
      case 'Pending': return 'bg-orange-100 text-orange-800';
      case 'Verified': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderHeader = () => (
    <div className="bg-white shadow-sm border-b">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="bg-red-500 p-2 rounded">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">ADITYA BIRLA</h1>
            <p className="text-sm text-gray-600">CAPITAL</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">Relationship Manager Dashboard</h2>
            <p className="text-gray-600">Manage credit applications and track progress</p>
          </div>
          <button 
            onClick={() => setCurrentScreen('new-application')}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Application</span>
          </button>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search Applications..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Application ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Progress</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.map((app) => (
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
                      <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${app.progress}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{app.progress}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {app.status === 'Verified' && (
                      <>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs transition-colors">
                          CM Queue
                        </button>
                        <button 
                          onClick={() => setCurrentScreen('cpa-checklist')}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs transition-colors"
                        >
                          Send to CPA
                        </button>
                      </>
                    )}
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderNewApplication = () => (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">New Credit Application</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Applicant Name</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Program Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                  <option>Term Loan</option>
                  <option>Working Capital</option>
                  <option>Equipment Loan</option>
                  <option>LC Limit</option>
                </select>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={() => setCurrentScreen('dashboard')}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setCurrentScreen('upload')}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Continue to Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUpload = () => (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      <div className="p-6">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Documents</h2>
            
            <div 
              className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-red-500 transition-colors cursor-pointer"
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg text-gray-600 mb-2">Drag and drop files here</p>
              <p className="text-sm text-gray-500">or click to browse</p>
              <input
                id="file-upload"
                type="file"
                multiple
                className="hidden"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
              />
            </div>
            
            {selectedFiles.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Selected Files</h3>
                <div className="space-y-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <FileText className="w-5 h-5 text-gray-500" />
                      <span className="text-sm text-gray-700">{file.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {isUploading && (
              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Uploading...</span>
                  <span className="text-sm text-gray-600">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <div className="flex space-x-4 mt-8">
              <button 
                onClick={() => setCurrentScreen('new-application')}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button 
                onClick={() => selectedFiles.length > 0 && handleFileUpload(new FileList())}
                disabled={selectedFiles.length === 0}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Upload Files
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderVerifyDocuments = () => (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Document Verification</h2>
              <button 
                onClick={() => setCurrentScreen('rm-dashboard')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Dashboard</span>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {documents.map((doc) => (
                <div key={doc} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-medium text-gray-900">{doc}</span>
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={verificationStatus[doc] || false}
                      onChange={(e) => handleVerificationChange(doc, e.target.checked)}
                      className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                    />
                  </label>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex space-x-4">
              <button 
                onClick={() => setCurrentScreen('rm-dashboard')}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => setCurrentScreen('approve-documents')}
                disabled={!allVerified}
                className="flex-1 bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Continue to Approval
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderApproveDocuments = () => (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Document Approval</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <h3 className="text-lg font-medium text-green-900">All Documents Verified</h3>
                  <p className="text-sm text-green-700">All required documents have been successfully verified and are ready for approval.</p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {documents.map((doc) => (
                <div key={doc} className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-sm text-gray-900">{doc}</span>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-4">
              <button 
                onClick={() => setCurrentScreen('verify-documents')}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Back to Verification
              </button>
              <button 
                onClick={() => setCurrentScreen('rm-dashboard')}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Approve Documents
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCMDashboard = () => (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">CM Dashboard</h2>
            <p className="text-gray-600">Review and process credit applications</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Application ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Applicant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Program</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-red-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {applications.filter(app => app.status === 'Verified').map((app) => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={startCamGeneration}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Generate CAM
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCAMGeneration = () => (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Generating Credit Assessment Memo</h2>
            
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-medium text-gray-900">{camStage}</span>
                <span className="text-lg font-medium text-gray-900">{camProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-300 relative overflow-hidden"
                  style={{ width: `${camProgress}%` }}
                >
                  <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Processing Documents</h3>
                <div className="space-y-2">
                  {['Bank Statements', 'Perfios Report', 'Consumer CIBIL', 'Commercial CIBIL'].map((doc, index) => (
                    <div key={doc} className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${camProgress > index * 25 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm text-gray-700">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Analysis Progress</h3>
                <div className="space-y-2">
                  {['GST Filing Report', 'Shareholding Certificate', 'Audit Report', 'Final CAM'].map((item, index) => (
                    <div key={item} className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full ${camProgress > 50 + index * 12.5 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 text-blue-600">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                <span>Processing... Please wait</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCAMComplete = () => (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      <div className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">CAM Generated Successfully</h2>
              <p className="text-gray-600">Credit Assessment Memo has been generated and is ready for review</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Security Details Verification Required</h3>
              <p className="text-sm text-gray-600 mb-4">Please verify all security details before making a decision on this application.</p>
              
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="security-check"
                  checked={securityVerified}
                  onChange={(e) => setSecurityVerified(e.target.checked)}
                  className="w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                />
                <label htmlFor="security-check" className="text-sm text-gray-700">
                  I have verified all security details and collateral information
                </label>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <button 
                disabled={!securityVerified}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                  securityVerified 
                    ? 'bg-green-500 hover:bg-green-600 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Approve Application
              </button>
              <button 
                disabled={!securityVerified}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                  securityVerified 
                    ? 'bg-yellow-500 hover:bg-yellow-600 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Send Back for Review
              </button>
              <button 
                disabled={!securityVerified}
                className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                  securityVerified 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Reject Application
              </button>
            </div>
            
            {!securityVerified && (
              <p className="text-sm text-gray-500 text-center mt-4">
                Complete security verification to unlock decision options
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCPAChecklist = () => (
    <div className="min-h-screen bg-gray-50">
      {renderHeader()}
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-red-600 mb-2">CPA Documentation Checklist</h2>
              <p className="text-gray-600">Verify document completeness and compliance</p>
            </div>
            
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">Overall Progress</h3>
                <span className="text-sm text-gray-500">3 of 4 Categories Completed</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-medium">1</div>
                  <div className="text-xs text-gray-600 mt-1 ml-2">Step 1</div>
                </div>
                <div className="flex-1 h-1 bg-red-600 mx-4"></div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-medium">2</div>
                  <div className="text-xs text-gray-600 mt-1 ml-2">Step 2</div>
                </div>
                <div className="flex-1 h-1 bg-red-600 mx-4"></div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white text-sm font-medium">3</div>
                  <div className="text-xs text-gray-600 mt-1 ml-2">Step 3</div>
                </div>
                <div className="flex-1 h-1 bg-gray-300 mx-4"></div>
                
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm font-medium">4</div>
                  <div className="text-xs text-gray-600 mt-1 ml-2">Step 4</div>
                </div>
              </div>
            </div>
            
            {/* Two Column Layout */}
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Checklist Column */}
              <div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-medium text-gray-900 text-center mb-4">Checklist</h3>
                </div>
                
                {/* Documents Section */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Documents</h4>
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>Aadhar Card</div>
                    <div>Pan Card</div>
                    <div>Application Form</div>
                    <div>Bank Statements</div>
                  </div>
                </div>
                
                {/* Compliance Documents Section */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Compliance Documents</h4>
                    <Check className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>GST Returns</div>
                    <div>IT Returns</div>
                    <div>ROC Filings</div>
                    <div>Audit Reports</div>
                  </div>
                </div>
              </div>
              
              {/* Issues Column */}
              <div>
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h3 className="text-lg font-medium text-gray-900 text-center mb-4">Issues</h3>
                </div>
                
                {/* Financial Audit Reports Issues */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Financial Audit Reports</h4>
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  </div>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div>Audit Reports</div>
                    <div>Balance Sheets</div>
                    <div>P&L Statements</div>
                    <div>GST Statements</div>
                    <div>Missing Application track documents</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-between">
              <button 
                onClick={() => setCurrentScreen('rm-dashboard')}
                className="flex items-center space-x-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Screen routing
  switch (currentScreen) {
    case 'new-application':
      return renderNewApplication();
    case 'upload':
      return renderUpload();
    case 'rm-dashboard':
      return renderDashboard();
    case 'verify-documents':
      return renderVerifyDocuments();
    case 'approve-documents':
      return renderApproveDocuments();
    case 'cm-dashboard':
      return renderCMDashboard();
    case 'cam-generation':
      return renderCAMGeneration();
    case 'cam-complete':
      return renderCAMComplete();
    case 'cpa-checklist':
      return renderCPAChecklist();
    default:
      return renderDashboard();
  }
};

export default App;