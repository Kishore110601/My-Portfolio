# ServiceNow Developer Portfolio - Getting Started Guide

Welcome! Your portfolio website has been created. Follow these steps to get it running.

## Step 1: Open the Portfolio Project

The project is located at: `c:\Users\KishoreR\Node\portfolio`

Open it in VS Code:
```bash
cd c:\Users\KishoreR\Node\portfolio
code .
```

## Step 2: Configure MongoDB (Database)

You have two options:

### Option A: Local MongoDB (Easier for Development)
1. Install MongoDB Community: https://www.mongodb.com/try/download/community
2. Start MongoDB:
   ```bash
   mongod
   ```
3. Keep it running in the background

### Option B: MongoDB Atlas (Cloud - Recommended)
1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a cluster
4. Click "Connect" and copy the connection string
5. Paste into `server/.env` (see Step 3)

## Step 3: Set Up Environment Variables

Open `server/.env` and update the settings:

```env
# If using local MongoDB:
MONGODB_URI=mongodb://localhost:27017/portfolio

# If using MongoDB Atlas (copy your connection string):
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# Email Settings (Gmail recommended)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Keep these as is for local development:
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### Gmail Setup for Email
1. Go to https://myaccount.google.com/apppasswords
2. Generate an app password
3. Copy the 16-character password
4. Paste as `EMAIL_PASS` in `.env`

## Step 4: Install Dependencies

All dependencies are already installed! ✅

## Step 5: Start Development

Run this command in the terminal:
```bash
npm run dev
```

You should see:
- ✓ Backend running on `http://localhost:5000`
- ✓ Frontend running on `http://localhost:5173`

## Step 6: Open in Browser

Visit: **http://localhost:5173**

You should see your portfolio website! 🎉

## Step 7: Customize Your Portfolio

### Add Your Information
Edit these files:

1. **Home Page** - `client/src/pages/Home.jsx`
   - Change "Hi, I'm a ServiceNow Developer" text
   - Update years of experience
   - Update number of certifications and projects

2. **Navigation** - `client/src/components/Navigation.jsx`
   - Update your initials (KR → your initials)

3. **Footer** - `client/src/components/Footer.jsx`
   - Add your GitHub, LinkedIn URLs
   - Update email

### Add Content to Database

Use any MongoDB tool (MongoDB Compass, MongoDB Atlas UI) to add:

1. **Projects** - Collection: `projects`
   ```json
   {
     "title": "ServiceNow Implementation",
     "description": "Enterprise workflow automation",
     "technologies": ["ServiceNow", "JavaScript"],
     "link": "https://...",
     "github": "https://github.com/..."
   }
   ```

2. **Certifications** - Collection: `certifications`
   ```json
   {
     "title": "ServiceNow Certified System Administrator",
     "issuer": "ServiceNow",
     "date": "2024-01-15",
     "credentialUrl": "https://..."
   }
   ```

3. **Skills** - Collection: `skills`
   ```json
   {
     "category": "ServiceNow",
     "skills": ["Admin", "Development", "ITSM", "Scripting"]
   }
   ```

4. **Articles** - Collection: `articles`
   ```json
   {
     "title": "My ServiceNow Journey",
     "excerpt": "How I became a ServiceNow expert",
     "content": "Full article content here...",
     "author": "Your Name",
     "date": "2024-01-15",
     "readTime": 5
   }
   ```

## Step 8: Features Overview

Your portfolio includes:

### 🏠 Home Page
- Hero section
- Stats (years of experience, certifications, projects)
- Featured projects preview
- Call-to-action buttons

### 🎯 Projects Page
- Display all your projects
- Show technologies used
- Links to live demos and GitHub repos

### 🏆 Certifications Page
- Display all certifications
- Issuer information
- Links to credential verification

### 💼 Skills Page
- Categorized skills
- Skill badges
- Proficiency levels

### 📝 Blog Page
- Articles and blog posts
- Read time estimation
- Full articles

### ✉️ Contact Page
- Contact form
- Email integration (sends to your inbox)
- Contact information display

### 🌓 Dark Mode
- Toggle in header
- Preference saved locally

## Step 9: Deploy to Production

### Deploy Frontend (Free!)

1. Push code to GitHub
2. Go to https://vercel.com
3. Sign up and connect your GitHub repo
4. Deploy automatically!

### Deploy Backend (Choose One)

**Option 1: Railway** (Recommended - Simple)
1. Go to https://railway.app
2. Connect GitHub repo
3. Set environment variables
4. Deploy!

**Option 2: Render** (Free tier available)
1. Go to https://render.com
2. Connect GitHub repo
3. Set environment variables
4. Deploy!

## Troubleshooting

### Frontend won't start
- Port 5173 might be in use
- Kill the process and try again
- Or change port in `client/vite.config.js`

### Backend won't start
- Check MongoDB is running
- Check `.env` file for correct settings
- Check port 5000 isn't in use

### Can't connect to MongoDB
- If local: Make sure `mongod` is running
- If Atlas: Check connection string is copied correctly
- Check username/password in connection string

### Contact form not sending emails
- Gmail: Make sure app password is set (not regular password)
- Check EMAIL_USER and EMAIL_PASS in `.env`
- Test with a simple message first

## Useful VS Code Extensions

Install these for better development experience:
- **Prettier** - Code formatter
- **ESLint** - Code quality
- **MongoDB** - Database management
- **Thunder Client** - API testing (instead of Postman)

## Next Steps

1. ✅ Customize content (Step 7)
2. ✅ Add your projects to database
3. ✅ Add certifications
4. ✅ Test contact form with email
5. ✅ Deploy to production (Step 9)

## Need Help?

Check these files:
- `.github/copilot-instructions.md` - Detailed setup info
- `README.md` - Full documentation
- `server/.env.example` - Environment template

## Happy Building! 🚀

Your ServiceNow developer portfolio is ready to showcase your skills!
