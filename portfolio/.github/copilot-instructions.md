# Portfolio Website Project Setup

## Project Status

✅ Project structure and folders created  
✅ Dependencies installed (client & server)  
✅ Environment variables configured  
⏳ Development server ready to launch  

## Quick Start

### 1. Configure Environment (First Time Only)

Update the `.env` file in the `server` folder with your configuration:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/portfolio
# or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Email Configuration
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Other settings
PORT=5000
NODE_ENV=development
```

### 2. Start Development Servers

Run the development servers (both frontend and backend):

```bash
npm run dev
```

This will start:
- **Frontend (React):** http://localhost:5173
- **Backend (Express):** http://localhost:5000

### 3. Open in Browser

Visit `http://localhost:5173` to see your portfolio website.

## Project Structure

```
portfolio/
├── client/                 # React frontend (Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   └── App.jsx        # Main app
│   └── package.json
├── server/                # Express backend
│   ├── models/            # MongoDB schemas
│   ├── routes/            # API routes
│   ├── server.js          # Main server file
│   └── package.json
└── package.json           # Root package.json
```

## Available Features

✅ Home page with hero section and stats  
✅ Projects showcase with filtering  
✅ Certifications display  
✅ Skills & expertise section  
✅ Blog/Articles section  
✅ Contact form with email integration  
✅ Dark mode toggle  
✅ Fully responsive design  
✅ Modern UI with Tailwind CSS  

## Development Tasks

You can use VS Code's task runner (Ctrl+Shift+B or Cmd+Shift+B):
- `dev: Start Development Server` - Start both client and server
- `server: Start Backend` - Start Express backend only
- `client: Start Frontend` - Start React frontend only
- `build: Build Production` - Build for production

## API Endpoints

- `GET /api/projects` - Get all projects
- `GET /api/certifications` - Get all certifications
- `GET /api/skills` - Get all skills
- `POST /api/contact` - Submit contact form
- `GET /api/articles` - Get all articles

## MongoDB Setup

For local development, make sure MongoDB is running:

```bash
# Windows
mongod

# macOS (with Homebrew)
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

Or use MongoDB Atlas (cloud):
1. Create a free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get the connection string
4. Update `MONGODB_URI` in `.env`

## Email Configuration

To enable contact form emails:

1. Use Gmail with App Passwords:
   - Enable 2-factor authentication on your Google account
   - Generate an App Password at https://myaccount.google.com/apppasswords
   - Use this 16-character password as `EMAIL_PASS`

2. Or use another email service (update server/routes/contactRoutes.js)

## Build for Production

```bash
npm run build
```

This creates optimized builds in:
- `client/dist/` - Frontend ready for deployment
- Backend ready for server deployment

## Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Connect repo to Vercel
3. Vercel auto-deploys on push

### Backend
- Deploy to Vercel, Railway, Render, or Heroku
- Set environment variables in platform dashboard

## Next Steps

1. ✏️ Customize content in `.env` and API files
2. 📝 Add your projects to database
3. 🎓 Add your certifications
4. 💼 Update skills section
5. ✉️ Configure email service
6. 🚀 Deploy to Vercel/your hosting platform
