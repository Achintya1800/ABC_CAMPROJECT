# Intelligent Credit Appraisal Assistant

A comprehensive credit assessment platform built for Aditya Birla Capital, featuring AI-powered document processing and automated Credit Assessment Memo (CAM) generation.

## 🌐 Live Demo

**[View Live Application](https://stellular-caramel-a4c8ff.netlify.app)**

## 📋 Overview

The Intelligent Credit Appraisal Assistant is a modern web application designed to streamline the credit assessment process for relationship managers and credit managers. It provides an intuitive interface for managing credit applications, document verification, and automated CAM generation using AI technology.

## ✨ Features

### 🏠 Relationship Manager Dashboard
- **Application Management**: View and track all credit applications in one place
- **Progress Tracking**: Real-time progress indicators for each application
- **Search & Filter**: Advanced search and filtering capabilities
- **New Application Creation**: Streamlined process for creating new credit applications

### 📄 Document Management
- **Drag & Drop Upload**: Easy document upload with support for multiple file formats
- **Document Verification**: Comprehensive checklist verification system
- **Status Tracking**: Real-time document status updates
- **Automated Processing**: AI-powered document analysis and processing

### 🎯 CM (Credit Manager) Dashboard
- **Application Review**: Dedicated interface for credit managers
- **CAM Generation**: One-click automated Credit Assessment Memo generation
- **Application Queue**: Organized queue system for processing applications

### 🤖 AI-Powered CAM Generation
- **Automated Analysis**: AI processes multiple document types including:
  - Bank Statements
  - Perfios Reports
  - Consumer & Commercial CIBIL
  - GST Filing Reports
  - Shareholding Certificates
  - Audit Reports
- **Real-time Progress**: Visual progress tracking with step-by-step completion
- **Multi-format Support**: PDF, XLSX, MSG, HTML formats supported
- **Decision Control**: Security-gated approval process requiring completion of all verification steps

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: Netlify

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd intelligent-credit-appraisal-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📱 Application Flow

### 1. Relationship Manager Workflow
1. **Dashboard Overview**: View all applications and their current status
2. **New Application**: Create new credit applications
3. **Document Upload**: Upload required documents using drag-and-drop interface
4. **Document Verification**: Verify uploaded documents against checklist
5. **CM Queue**: Send verified applications to Credit Manager queue

### 2. Credit Manager Workflow
1. **CM Dashboard**: Review applications ready for processing
2. **CAM Generation**: Initiate automated CAM generation process
3. **Progress Monitoring**: Track real-time progress of CAM generation
4. **Security Verification**: Complete security details verification to unlock decision buttons
5. **Decision Making**: Approve, send back, or reject applications after verification

## 🎨 UI/UX Features

- **Responsive Design**: Optimized for desktop and mobile devices
- **Modern Interface**: Clean, professional design following Aditya Birla Capital branding
- **Interactive Elements**: Smooth animations and transitions
- **Progress Indicators**: Visual feedback for all processes
- **Loading States**: Engaging loading animations with progress tracking
- **Conditional UI**: Security-gated controls that unlock based on user actions

## 📊 Application States

### Document Status Types
- **New**: Recently uploaded applications
- **In Progress**: Applications currently being processed
- **Pending**: Applications awaiting action
- **Verified**: Documents verified and ready for CAM generation

### CAM Generation Stages
1. **Reading Documents** (0-44%): Document collection and initial processing
2. **Building Basic CAM** (44-58%): Data extraction and structuring
3. **Financial Plotting** (58-87%): Financial analysis and calculations
4. **Generating CAM Report** (87-100%): Final report compilation

### Security Controls
- **Gated Decisions**: Decision buttons remain disabled until security verification is complete
- **Progressive Unlock**: UI elements unlock as verification steps are completed
- **Visual Feedback**: Clear indication of enabled/disabled states

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── App.tsx              # Main application component
├── main.tsx            # Application entry point
├── index.css           # Global styles
└── vite-env.d.ts       # Vite type definitions
```

## 🎯 Key Components

### Dashboard Management
- Multi-screen navigation system
- State management for different user roles
- Real-time data updates

### Document Processing
- File upload handling
- Document verification workflows
- Status tracking and updates

### CAM Generation
- Progressive loading system
- Step-by-step completion tracking
- Automated workflow management

## 🚀 Deployment

The application is deployed on Netlify with automatic builds from the main branch.

**Live URL**: [https://stellular-caramel-a4c8ff.netlify.app](https://stellular-caramel-a4c8ff.netlify.app)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software developed for Aditya Birla Capital.

## 📞 Support

For support and questions, please contact the development team.

---

**Built with ❤️ for Aditya Birla Capital**