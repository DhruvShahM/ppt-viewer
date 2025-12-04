# Project Documentation: Go Concurrency PPT App

## 1. Application Overview
This is a React-based presentation application designed for teaching Go (Golang) concepts, specifically concurrency. It features a highly interactive and visually rich interface with support for multiple decks, repositories, and presentation tools.

## 2. Navigation & Main Pages

### **2.1. Deck Selector (Home Page)**
- **Path**: `/` (Root)
- **Component**: `src/components/DeckSelector.jsx`
- **Purpose**: The central hub for browsing and managing presentation decks.
- **Key Elements**:
  - **Repository Grid**: Displays decks grouped by repositories (e.g., "Go Programming", "Microservices").
  - **Search Bar**: Real-time filtering of decks and repositories.
  - **Sort Controls**: Toggle between default and alphabetical (A-Z) sorting.
  - **Edit Mode**: Allows restructuring of content (Rename Repos, Delete Repos, Move Decks between Repos).
  - **Export Button**: Generates a PDF of the entire presentation.

### **2.2. Presentation Viewer**
- **Path**: Activated when a deck is selected.
- **Component**: `src/components/PresentationViewer.jsx`
- **Purpose**: The active presentation interface.
- **Key Elements**:
  - **Slide View**: Renders individual slide components with Framer Motion animations.
  - **Navigation**: Previous/Next controls (Arrow keys, on-screen buttons).
  - **Toolbar**: Auto-hides; provides access to annotation tools, background settings, and feedback.
  - **Progress Bar**: Visual indicator of presentation progress.

## 3. Key Features

### **3.1. Deck Management System**
- **Repositories**: Decks are organized into logical groups (Repositories).
- **CRUD Operations**:
  - **Create**: Add new repositories.
  - **Read**: View all decks and repositories.
  - **Update**: Rename repositories, Move decks between repositories.
  - **Delete**: Remove empty repositories.
- **Persistence**: Structure is saved to `localStorage` (`deck_repositories`).

### **3.2. Interactive Presentation Tools**
- **Annotation Layer**: Draw directly on slides during presentation.
  - **Tools**: Pen, Circle, Rectangle, Arrow, Text, Eraser.
  - **Colors**: Red, Blue, Green, Yellow, White, Black.
  - **Clear**: One-click clear all annotations.
- **Cursor Management**: Custom cursor visibility logic (hides after inactivity).
- **Fullscreen Support**: Seamless toggle for immersive presentation.

### **3.3. Visual Customization**
- **Dynamic Backgrounds**:
  - **Video Backgrounds**: Select from available MP4 loops (e.g., Abstract, Tech).
  - **Gradients**: Choose from preset themes (Midnight Fusion, Ocean Depth, etc.).
- **Theming**: Tailwind CSS based styling with glassmorphism effects.

### **3.4. Export Functionality**
- **PDF Export**: Uses `html2canvas` and `jspdf` to render every slide in every deck and compile them into a single "complete-presentation.pdf".

### **3.5. Design Feedback System**
- **Component**: `src/components/DesignFeedback.jsx`
- **Purpose**: Allows users/reviewers to submit change requests for specific slides.
- **Capabilities**:
  - **Submit Feedback**: Text instruction + Screenshot uploads (File select or Paste).
  - **Status Tracking**: Pending, Sending, Success, Error states.
  - **Admin/Review View**: See pending requests for the current slide.
  - **Management**: Delete individual or all requests for a slide.
  - **Backend Integration**: Communicates with a local Express server.

## 4. Technical Stack & Backend

### **4.1. Frontend**
- **Framework**: React + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React `useState`, `useEffect`, `localStorage`.

### **4.2. Backend (Server)**
- **Entry Point**: `server/index.js`
- **Port**: 3001
- **Storage**:
  - **Feedback**: JSON file (`feedback.json`).
  - **Screenshots**: Local directory (`server/screenshots`).
- **API Endpoints**:
  - `GET /api/feedback`: Retrieve all feedback.
  - `POST /api/feedback`: Submit new feedback with images (Multer upload).
  - `DELETE /api/feedback/:id`: Delete specific feedback.
  - `DELETE /api/feedback/:deckId/:slideIndex`: Bulk delete for a slide.
  - `GET /api/screenshots/:filename`: Serve uploaded images.
- **Maintenance**: Auto-cleanup of old feedback (>30 entries) and orphaned screenshots.
