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
- **DOCX Export**: Download feedback as formatted Word documents

### 4. Social Media Automation
- **Multi-Platform Support**: YouTube, Instagram, LinkedIn, etc.
- **Automated Publishing**: Schedule and post content
- **AI Content Generation**: Gemini AI for descriptions and captions
- **OBS Integration**: Automated video recording and streaming
- **Queue Management**: Track publishing status across platforms
- **Token-based Auth**: Secure credential storage

### 5. Content Management
- **Repository System**: Organize decks into logical groups
- **CRUD Operations**: Create, rename, move, delete decks/repos
- **Search & Filter**: Real-time content search
- **Sorting**: Alphabetical and custom ordering
- **Pagination**: Smooth navigation through large collections
- **Import/Export**: Upload and download deck archives
- **Archive System**: Hide decks without deleting
- **Bulk Operations**: Select and manage multiple decks

### 6. GraphQL API
- **Modern API**: Efficient data fetching with GraphQL
- **Real-time Updates**: Apollo Client integration
- **Type-safe Queries**: Structured data access
- **RESTful Endpoints**: Complementary REST API for media and files

## 📖 Presentation Content

### Go Programming Topics
The platform includes comprehensive presentations on:

- **Mastering Concurrency**: Complete guide to Goroutines, Channels, Select, and Sync patterns
- **Goroutines Deep Dive**: Under the hood - Scheduler, Stack Management, Context Switching
- **Concurrency Masterclass**: From basics to advanced patterns and tools
- **Concurrency QA**: Interview preparation - Goroutines, Channels, Sync, and Context
- **Go Concurrency (हिंदी)**: Hindi language presentations for Goroutines, Channels, और GMP Scheduler
- **Interview Prep**: Pointers, Interfaces, Methods, and Type Safety

### Microservices & System Design
- **Load Balancer**: In-depth explanation of algorithms, health checks, and failover strategies
- **Rate Limiting**: Detailed coverage of algorithms, token bucket, and distributed systems
- **Design Patterns**: Microservices design patterns and how they work
- **CAP Theorem**: Understanding consistency, availability, and partition tolerance

### Content Organization
- **Repository System**: Decks organized into logical categories
  - **Go Programming**: Core Go concepts and concurrency
  - **Microservices**: System design and architecture patterns
  - **Mental Health**: Gen-Z Mental Health topics
  - **Stress Test**: Testing and demo decks
- **Dynamic Deck Index**: JSON-based deck registry with metadata
- **Multi-language Support**: Content available in English and Hindi (हिंदी)
- **22+ Presentation Decks**: Continuously growing content library

## 🎯 Advanced Features

### Deck Management
- **Create & Organize**: Build custom repositories to group related presentations
- **Search & Filter**: Real-time search across deck titles and descriptions
- **Sorting Options**: Alphabetical or custom ordering
- **Pagination**: Smooth navigation through large deck collections (6 items per page)
- **Edit Mode**: Rename, move, delete, and reorganize decks
- **Selection Mode**: Bulk operations on multiple decks simultaneously
- **Repository Management**: Create, rename, and delete deck categories

### Archive System
- **Archive Decks**: Hide decks without deleting them
- **Restore Functionality**: Bring archived decks back to active status
- **Separate Views**: Toggle between active and archived decks
- **Bulk Archiving**: Archive multiple decks at once
- **Status Tracking**: Visual indicators for archived content
- **Persistent State**: Archive status saved across sessions

### Import/Export Operations
- **Import Decks**: Upload custom deck archives (ZIP format)
- **Export Individual Decks**: Download single decks as markdown
- **Bulk Export**: Export multiple selected decks as ZIP archive
- **Auto-generated IDs**: Smart deck ID generation from titles
- **Metadata Preservation**: Maintain deck information during import/export
- **Version Tracking**: Track deck versions and modifications

### Feedback & Collaboration
- **Design Feedback Tool**: Submit change requests for specific slides
- **Screenshot Uploads**: Attach visual references (file upload or paste from clipboard)
- **Feedback Management**: Review, approve, or delete feedback items
- **Slide-specific Feedback**: Associate feedback with exact deck and slide
- **DOCX Export**: Download feedback as formatted Word documents
- **Bulk Download**: Get feedback for multiple selected decks
- **Image Gallery**: View attached screenshots in feedback

### Social Media Automation
- **Multi-Platform Publishing**:
  - YouTube video uploads with automated metadata
  - Instagram content scheduling
  - LinkedIn post automation
- **AI-Powered Content Generation**:
  - Gemini AI integration for descriptions and captions
  - Auto-generated hashtags and SEO optimization
  - Content suggestions based on presentation topics
- **OBS Integration**:
  - Automated recording control via WebSocket
  - Scene management and streaming automation
  - Screen capture configuration
- **Social Queue Management**:
  - Schedule posts across platforms
  - Track publishing status
  - Token-based authentication storage

### Browser Automation
- **Puppeteer Integration**: Automated browser tasks
- **Video Recording**: Capture presentations as videos
- **Screenshot Generation**: Auto-generate preview images
- **Form Automation**: Auto-fill and submit forms
- **Testing Support**: Automated UI testing capabilities

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
   
   # OBS WebSocket (Optional)
   OBS_WEBSOCKET_URL=ws://localhost:4455
   OBS_WEBSOCKET_PASSWORD=your_obs_password
   ```

5. **Start Development Servers**

   **Option 1: Run Both Servers Simultaneously (Recommended)**
   ```bash
   # Terminal 1: Start Backend (Port 3001)
   npm run server
   
   # Terminal 2: Start Frontend (Port 5173)
   npm run dev
   ```

   **Option 2: Use Windows Batch Script**
   ```bash
   # Windows only - Starts both servers automatically
   start_app.bat
   ```

6. **Access the Application**
   - **Frontend**: `http://localhost:5173`
   - **Backend API**: `http://localhost:3001`
   - **GraphQL Playground**: `http://localhost:3001/graphql`

## 📦 Build & Deployment

### Production Build
```bash
# Build frontend
npm run build

# Preview production build
npm run preview
```

### Build Output
- **Production files**: `dist/` directory
- **Server**: Deploy `server/` separately as Node.js application
- **Static Assets**: All media and assets bundled in dist

### Deployment Checklist
- [ ] Update environment variables for production
- [ ] Configure CORS for production domain
- [ ] Set up Google OAuth redirect URIs
- [ ] Configure API endpoints in Vite config
- [ ] Optimize images and video assets
- [ ] Set up CDN for static assets (optional)

## 🔧 Development

### Available Scripts

**Frontend**
- `npm run dev` - Start Vite development server (Port 5173)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint code quality checks

**Backend**
- `npm run server` - Start backend server with Nodemon (auto-restart on changes)

### Development Workflow
1. Start both servers (frontend and backend)
2. Make changes to code with hot reload
3. Test features in browser at `localhost:5173`
4. Check API endpoints at `localhost:3001`
5. Use GraphQL Playground for API testing

### Port Configuration
- **Frontend Dev Server**: 5173 (Vite default)
- **Backend API Server**: 3001 (Express)
- **Vite Proxy**: `/api` and `/graphql` routes proxied to backend
- **OBS WebSocket**: 4455 (if using OBS automation)

## 📚 Additional Documentation

- **[PROJECT_DOCUMENTATION.md](PROJECT_DOCUMENTATION.md)** - Detailed feature documentation and navigation guide
- **[ANNOTATION_ENHANCEMENTS.md](ANNOTATION_ENHANCEMENTS.md)** - Annotation system architecture and tools
- **[ANNOTATION_QUICK_REFERENCE.md](ANNOTATION_QUICK_REFERENCE.md)** - Quick reference for annotation features
- **[DRAGGABLE_TOOLBAR_GUIDE.md](DRAGGABLE_TOOLBAR_GUIDE.md)** - Toolbar customization and positioning guide
- **[TOOLBAR_QUICK_REFERENCE.md](TOOLBAR_QUICK_REFERENCE.md)** - Toolbar features and shortcuts
- **[TOOLBAR_PROXIMITY_UPDATE.md](TOOLBAR_PROXIMITY_UPDATE.md)** - Proximity-based toolbar behavior
- **[DRAWING_PERFORMANCE_FIX.md](DRAWING_PERFORMANCE_FIX.md)** - Performance optimization details

## 🎨 UI/UX Features

### Design Philosophy
- **Glassmorphism**: Modern frosted glass effects
- **Dark Theme**: Easy on the eyes for presentations
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Works on various screen sizes
- **Accessibility**: Keyboard navigation support

### Visual Elements
- **Dynamic Gradients**: Contextual color schemes per deck
- **Icon System**: Lucide React icons throughout
- **Color-coded Decks**: Visual categorization
- **Loading States**: Smooth loading indicators
- **Hover Effects**: Interactive feedback on all elements

## 🔐 Security & Privacy

- **Google OAuth**: Secure authentication for social features
- **Token Storage**: Encrypted credential management
- **CORS Configuration**: Restricted API access
- **Input Validation**: Server-side validation for all inputs
- **Safe File Uploads**: Virus scanning and type checking
- **LocalStorage**: Client-side data encryption

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Kill process on port 5173 or 3001
# Windows
netstat -ano | findstr :5173
taskkill /PID <process_id> /F
```

**Module Not Found Errors**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**GraphQL Connection Issues**
- Ensure backend is running on port 3001
- Check proxy configuration in `vite.config.js`
- Verify GraphQL endpoint in Apollo Client setup

**OBS WebSocket Connection Failed**
- Check OBS is running with WebSocket plugin
- Verify password in `.env` file
- Ensure correct port (default: 4455)

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow existing code style
- Add comments for complex logic
- Test all features before committing
- Update documentation for new features
- Use ESLint for code quality

## 📄 License

This project is private and not licensed for public use.

## 👤 Author

**Dhruv Shah**

- GitHub: [@DhruvShahM](https://github.com/DhruvShahM)
- Project: [ppt-viewer](https://github.com/DhruvShahM/ppt-viewer)

## 🙏 Acknowledgments

- **React Team** - For the amazing framework
- **Vite Team** - For the lightning-fast build tool
- **Tailwind CSS** - For the utility-first CSS framework
- **Framer Motion** - For smooth animations
- **Google** - For Gemini AI and OAuth services
- **Puppeteer Team** - For browser automation capabilities

## 📊 Project Stats

- **Total Decks**: 22+ presentation decks
- **Languages**: English, हिंदी (Hindi)
- **Topics Covered**: Go Concurrency, Microservices, System Design
- **Components**: 10+ reusable React components
- **API Endpoints**: 15+ RESTful + GraphQL endpoints
- **Automation Scripts**: Python + JavaScript automation tools

---

**Built with ❤️ using React, Vite, Express, GraphQL, and modern web technologies**

**Platform**: Full-stack interactive presentation system with AI-powered social media automation
