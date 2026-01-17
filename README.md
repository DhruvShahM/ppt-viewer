# Go Concurrency Presentation Viewer

An advanced, full-stack interactive presentation platform for teaching Go (Golang) concurrency concepts with rich annotation tools, social media automation, and AI-powered features.

## 🚀 Technology Stack

### Frontend
- **Framework**: React 18.2 with Vite 5.1
- **Styling**: 
  - Tailwind CSS 3.4 for utility-first styling
  - Framer Motion 11.0 for smooth animations and transitions
  - Custom glassmorphism effects
- **UI Components**:
  - Lucide React (icons)
  - React Icons
  - Custom interactive annotation tools
- **State Management**: React Hooks (useState, useEffect) + LocalStorage
- **API Integration**: 
  - Apollo Client 3.10 for GraphQL
  - Axios for REST API calls

### Backend
- **Server Framework**: Express.js 4.18
- **API Architecture**:
  - GraphQL with Apollo Server 4.10
  - RESTful endpoints for feedback and media
- **Authentication**: Google OAuth 2.0 (google-auth-library, googleapis)
- **AI Integration**: Google Generative AI (Gemini)
- **Automation**:
  - Puppeteer 24.34 for browser automation
  - OBS WebSocket for streaming control
  - Social media automation (YouTube, Instagram, etc.)
- **File Processing**:
  - Multer for file uploads
  - JSZip/AdmZip for archive handling
  - Docx for document generation
- **Storage**: 
  - JSON files for feedback and data
  - SQLite database
  - Local file system for media assets

### Development Tools
- **Build Tool**: Vite with Hot Module Replacement (HMR)
- **Code Quality**: ESLint with React plugins
- **Process Manager**: Nodemon for auto-restart during development
- **CSS Processing**: PostCSS + Autoprefixer

## 🏗️ Architecture

### Project Structure
```
go-concurrency-ppt/
├── src/                          # Frontend React application
│   ├── components/              # Reusable UI components
│   │   ├── DeckSelector.jsx     # Main deck selection interface
│   │   ├── PresentationViewer.jsx # Slide presentation engine
│   │   ├── DesignFeedback.jsx   # Feedback submission system
│   │   └── ...                  # Annotation, toolbar, etc.
│   ├── decks/                   # Presentation deck modules
│   ├── slides/                  # Individual slide components
│   ├── data/                    # Static data and configurations
│   ├── assets/                  # Images, videos, and media
│   ├── App.jsx                  # Root application component
│   ├── main.jsx                 # Application entry point
│   └── index.css                # Global styles and Tailwind
│
├── server/                      # Backend Express server
│   ├── index.js                 # Main server file (Port 3001)
│   ├── graphql/                 # GraphQL schema and resolvers
│   ├── services/                # Business logic services
│   ├── controllers/             # Request handlers
│   ├── utils/                   # Helper utilities
│   ├── config/                  # Server configurations
│   ├── data/                    # Server-side data storage
│   ├── screenshots/             # Uploaded feedback images
│   └── temp_uploads/            # Temporary file storage
│
├── automation/                  # Automation scripts
├── scripts/                     # Utility scripts
├── public/                      # Static public assets
├── electron/                    # Desktop app wrapper (optional)
└── dist/                        # Production build output
```

### System Architecture
```
┌─────────────────────────────────────────────────────────┐
│                    Client Browser                       │
│  ┌─────────────────────────────────────────────────┐   │
│  │         React Frontend (Port 5173)              │   │
│  │  • Vite Dev Server with HMR                     │   │
│  │  • Apollo Client (GraphQL)                      │   │
│  │  • Axios (REST API)                             │   │
│  └─────────────┬───────────────────────────────────┘   │
└────────────────┼───────────────────────────────────────┘
                 │
                 │ HTTP/GraphQL Requests
                 │ (Proxied via Vite)
                 │
┌────────────────▼───────────────────────────────────────┐
│         Express Backend (Port 3001)                    │
│  ┌─────────────────────────────────────────────────┐  │
│  │ API Layer                                       │  │
│  │  • GraphQL (Apollo Server)                      │  │
│  │  • REST API Endpoints                           │  │
│  │  • File Upload Handler (Multer)                 │  │
│  └──────┬──────────────────────────────────────────┘  │
│         │                                              │
│  ┌──────▼──────────────────────────────────────────┐  │
│  │ Services Layer                                  │  │
│  │  • Feedback Service                             │  │
│  │  • Social Media Automation                      │  │
│  │  • AI Content Generation (Gemini)               │  │
│  │  • OBS Control Service                          │  │
│  │  • Google OAuth Service                         │  │
│  └──────┬──────────────────────────────────────────┘  │
│         │                                              │
│  ┌──────▼──────────────────────────────────────────┐  │
│  │ Data Layer                                      │  │
│  │  • SQLite Database                              │  │
│  │  • JSON File Storage                            │  │
│  │  • File System (Media, Screenshots)             │  │
│  └─────────────────────────────────────────────────┘  │
└────────────────┬───────────────────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
┌───────▼──────┐  ┌──────▼────────┐
│  External    │  │   Automation  │
│  Services    │  │   Tools       │
│  • Google    │  │   • Puppeteer │
│  • YouTube   │  │   • OBS       │
│  • Gemini AI │  │               │
└──────────────┘  └───────────────┘
```

## ✨ Key Features

### 1. Interactive Presentation System
- **Deck Management**: Organize presentations into repositories
- **Rich Slide Components**: Custom React components for each slide
- **Navigation**: Keyboard shortcuts, on-screen controls, progress tracking
- **Fullscreen Mode**: Immersive presentation experience
- **Dynamic Backgrounds**: Video loops and gradient themes

### 2. Advanced Annotation Tools
- **Drawing Tools**: Pen, Circle, Rectangle, Arrow
- **Text Annotations**: Add text directly on slides
- **Color Palette**: Multiple color options (Red, Blue, Green, Yellow, White, Black)
- **Eraser Tool**: Selective or complete annotation removal
- **Auto-hide Toolbar**: Proximity-based toolbar visibility
- **Performance Optimized**: Efficient canvas rendering

### 3. Design Feedback System
- **Visual Feedback**: Submit change requests with screenshots
- **Image Upload**: File selection or paste from clipboard
- **Status Tracking**: Real-time feedback submission status
- **Review Interface**: Admin view for managing feedback
- **Backend Integration**: RESTful API for feedback storage

### 4. Social Media Automation
- **Multi-Platform Support**: YouTube, Instagram, LinkedIn, etc.
- **Automated Publishing**: Schedule and post content
- **AI Content Generation**: Gemini AI for descriptions and captions
- **OBS Integration**: Automated video recording and streaming

### 5. Content Management
- **Repository System**: Organize decks into logical groups
- **CRUD Operations**: Create, rename, move, delete decks/repos
- **Search & Filter**: Real-time content search
- **Sorting**: Alphabetical and custom ordering
- **PDF Export**: Generate complete presentation PDFs
- **LocalStorage Persistence**: Save user preferences and structure

### 6. GraphQL API
- **Modern API**: Efficient data fetching with GraphQL
- **Real-time Updates**: Apollo Client integration
- **Type-safe Queries**: Structured data access

## 🛠️ Setup & Installation

### Prerequisites
- **Node.js**: v16 or higher
- **npm**: v7 or higher
- **Git**: For version control

### Installation Steps

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd go-concurrency-ppt
   ```

2. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

4. **Configure Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   # Google OAuth Configuration
   GOOGLE_CLIENT_ID=your_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   GOOGLE_REDIRECT_URI=http://localhost:3001/auth/google/callback
   
   # AI Configuration
   GEMINI_API_KEY=your_gemini_api_key
   
   # Server Configuration
   PORT=3001
   ```

5. **Start Development Servers**

   **Option 1: Run Both Servers Simultaneously**
   ```bash
   # Terminal 1: Start Backend (Port 3001)
   npm run server
   
   # Terminal 2: Start Frontend (Port 5173)
   npm run dev
   ```

   **Option 2: Use Windows Batch Script**
   ```bash
   # Windows only
   start_app.bat
   ```

6. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3001`
   - GraphQL Playground: `http://localhost:3001/graphql`

## 📦 Build & Deployment

### Production Build
```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

### Build Output
- Production files: `dist/`
- Server remains in `server/` (deploy separately)

## 🔧 Development

### Available Scripts

**Frontend**
- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Backend**
- `npm run server` - Start backend server with Nodemon (auto-restart)

### Ports
- **Frontend Dev Server**: 5173 (Vite)
- **Backend API Server**: 3001 (Express)
- **Vite Proxy**: /api and /graphql routes proxied to backend

## 📚 Additional Documentation

- **[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)** - Detailed feature documentation
- **[SOCIAL_SETUP.md](SOCIAL_SETUP.md)** - Social media integration guide
- **[ANNOTATION_ENHANCEMENTS.md](ANNOTATION_ENHANCEMENTS.md)** - Annotation system details
- **[DRAGGABLE_TOOLBAR_GUIDE.md](DRAGGABLE_TOOLBAR_GUIDE.md)** - Toolbar customization guide

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and not licensed for public use.

## 👤 Author

Dhruv Shah

---

**Built with ❤️ using React, Vite, Express, and modern web technologies**
