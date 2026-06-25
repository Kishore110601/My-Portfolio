# ServiceNow Developer Portfolio

A modern, fully-featured portfolio website designed for ServiceNow developers to showcase experience, certifications, projects, and technical skills.

## ✨ Features

- 🌓 **Dark Mode Toggle** - Smooth theme switching
- 📱 **Fully Responsive** - Works on all devices
- 🎯 **Project Showcase** - Display your best work with descriptions
- 🏆 **Certifications** - Highlight your credentials
- 💼 **Skills Section** - Categorized skill listing
- ✉️ **Contact Form** - Email integration with nodemailer
- 📝 **Blog/Articles** - Share your knowledge
- ⚡ **Fast Performance** - Built with Vite + React
- 🎨 **Modern UI** - Tailwind CSS styling
- 🔒 **Secure Backend** - Express.js with MongoDB

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Navigate to project**
   ```bash
   cd c:\Users\KishoreR\Node\portfolio
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Configure environment** (in `server/.env`)
   ```env
   MONGODB_URI=mongodb://localhost:27017/portfolio
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   ```

4. **Start development**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Frontend: http://localhost:5173
   - Backend: http://localhost:5000

## 📁 Project Structure

```
portfolio/
├── client/                      # React Frontend
│   ├── src/
│   │   ├── pages/              # Home, Projects, Certifications, Skills, Blog, Contact
│   │   ├── components/         # Navigation, Footer
│   │   ├── assets/             # Images, icons
│   │   ├── App.jsx             # Main app component
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Global styles + Tailwind
│   ├── index.html
│   ├── vite.config.js          # Vite configuration
│   ├── tailwind.config.js       # Tailwind CSS config
│   ├── postcss.config.js        # PostCSS config
│   └── package.json
│
├── server/                      # Express Backend
│   ├── models/
│   │   ├── Project.js          # Project schema
│   │   ├── Certification.js    # Certification schema
│   │   ├── Skill.js            # Skill schema
│   │   └── Article.js          # Article schema
│   ├── routes/
│   │   ├── projectRoutes.js    # CRUD for projects
│   │   ├── certificationRoutes.js
│   │   ├── skillRoutes.js
│   │   ├── articleRoutes.js
│   │   └── contactRoutes.js    # Email handling
│   ├── server.js               # Main server file
│   ├── .env                    # Environment variables
│   ├── .env.example            # Environment template
│   └── package.json
│
├── .github/
│   └── copilot-instructions.md # Setup documentation
├── .vscode/
│   ├── tasks.json              # VS Code tasks
│   └── settings.json           # Editor settings
├── .gitignore
├── README.md
└── package.json                # Root package (concurrently)
```

## 🔧 Tech Stack

### Frontend
- **React 18** - UI framework
- **Vite** - Next-gen build tool (faster development)
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Framer Motion** - Smooth animations
- **Axios** - HTTP client
- **React Icons** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **Nodemailer** - Email service
- **CORS** - Cross-origin requests
- **JWT** - Authentication (ready for implementation)

## 🌐 API Endpoints

### Projects
```
GET    /api/projects           # Get all projects
GET    /api/projects/:id       # Get single project
POST   /api/projects           # Create project (admin)
PUT    /api/projects/:id       # Update project (admin)
DELETE /api/projects/:id       # Delete project (admin)
```

### Certifications
```
GET    /api/certifications     # Get all certifications
GET    /api/certifications/:id # Get single certification
POST   /api/certifications     # Create certification (admin)
PUT    /api/certifications/:id # Update certification (admin)
DELETE /api/certifications/:id # Delete certification (admin)
```

### Skills
```
GET    /api/skills             # Get all skills
GET    /api/skills/:id         # Get single skill category
POST   /api/skills             # Add skill category (admin)
PUT    /api/skills/:id         # Update skill (admin)
DELETE /api/skills/:id         # Delete skill (admin)
```

### Articles
```
GET    /api/articles           # Get all articles
GET    /api/articles/:id       # Get single article
POST   /api/articles           # Create article (admin)
PUT    /api/articles/:id       # Update article (admin)
DELETE /api/articles/:id       # Delete article (admin)
```

### Contact
```
POST   /api/contact            # Submit contact form
```

### Health Check
```
GET    /api/health             # Server health status
```

## 📝 Environment Variables

### Server `.env`
```env
# Database
MONGODB_URI=mongodb://localhost:27017/portfolio

# Server
PORT=5000
NODE_ENV=development

# Email (Gmail)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Security
JWT_SECRET=your-secret-key

# Frontend URL
CLIENT_URL=http://localhost:5173
```

### Client `.env`
```env
VITE_API_URL=http://localhost:5000
```

## 🗄️ MongoDB Setup

### Local MongoDB
```bash
# Windows
mongod

# macOS (Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### MongoDB Atlas (Cloud - Recommended)
1. Create free account: https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string (looks like `mongodb+srv://user:pass@cluster.mongodb.net/db`)
4. Set `MONGODB_URI` in `.env`

## ✉️ Email Configuration

### Using Gmail
1. Enable 2-factor authentication on Google account
2. Generate App Password: https://myaccount.google.com/apppasswords
3. Copy 16-character password to `EMAIL_PASS` in `.env`

### Using Other Services
Edit `server/routes/contactRoutes.js` to change email provider.

## 🧑‍💻 Development

### Start Development Servers
```bash
npm run dev
```

### Start Individual Servers
```bash
# Backend only
cd server && npm run dev

# Frontend only
cd client && npm run dev
```

### Build for Production
```bash
npm run build
```

### Run Production Build
```bash
npm start
```

## 🚀 Deployment

### Frontend (Vercel - Recommended)
1. Push code to GitHub
2. Connect repo to Vercel: https://vercel.com
3. Set environment variables
4. Auto-deploy on push

### Backend Options

**Vercel Serverless Functions**
- Free tier available
- Good for small projects
- https://vercel.com

**Railway**
- $5/month credit
- Simple Node.js deployment
- https://railway.app

**Render**
- Free tier with limits
- WebSocket support
- https://render.com

**Heroku** (deprecated but still available)
- Limited free tier
- https://www.heroku.com

## 🎨 Customization

### Colors & Theme
Edit `client/tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#0f172a',      // Change primary color
      secondary: '#1e293b',    // Change secondary color
      accent: '#3b82f6',       // Change accent color
    },
  },
}
```

### Page Content
- Edit components in `client/src/pages/`
- Add/modify data through MongoDB or API calls
- Update navigation in `client/src/components/Navigation.jsx`

### Adding New Sections
1. Create page component in `client/src/pages/`
2. Create MongoDB schema in `server/models/`
3. Create API routes in `server/routes/`
4. Add route in `client/src/App.jsx`

## 📊 Data Models

### Project
```javascript
{
  title: String,
  description: String,
  content: String,
  technologies: [String],
  link: String,
  github: String,
  image: String,
  createdAt: Date
}
```

### Certification
```javascript
{
  title: String,
  issuer: String,
  date: Date,
  credentialUrl: String,
  credentialId: String
}
```

### Skill
```javascript
{
  category: String,
  skills: [String],
  proficiency: String  // Beginner, Intermediate, Advanced, Expert
}
```

### Article
```javascript
{
  title: String,
  excerpt: String,
  content: String,
  author: String,
  date: Date,
  readTime: Number,
  tags: [String]
}
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process using port 5000/5173
netstat -ano | findstr :5000

# Kill process
taskkill /PID <PID> /F
```

### MongoDB Connection Error
- Check MongoDB is running
- Verify connection string in `.env`
- Check username/password for Atlas

### CORS Errors
- Ensure backend is running on `http://localhost:5000`
- Check `CLIENT_URL` in server `.env`

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📚 Learning Resources

- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Express.js](https://expressjs.com)
- [MongoDB](https://docs.mongodb.com)
- [ServiceNow Developer](https://developer.servicenow.com)

## 📄 License

MIT License - feel free to use this for your portfolio!

## 🤝 Support

Need help? Check the GitHub issues or update `.github/copilot-instructions.md`.

---

**Happy coding! 🚀**
