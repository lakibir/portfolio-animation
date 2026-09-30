# 🚀 Deployment Guide: Vercel (Frontend) & Render (Backend)

This portfolio is fully configured for zero-friction decoupled deployment:
- **Frontend** runs on **Vercel** (Global Edge CDN, ultrafast static asset delivery)
- **Backend** runs on **Render** (Node.js/Express Web Service with MongoDB Atlas integration)

---

## Part 1: Deploy Backend to Render

1. Log in to your [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** → **Web Service**.
3. Connect your GitHub repository: `portfolio-animation`.
4. Fill in the service details:
   - **Name**: `portfolio-backend` (or your preferred name)
   - **Region**: Choose closest to you (e.g., Frankfurt / Oregon)
   - **Branch**: `main`
   - **Root Directory**: `backend` (or leave empty if using repository root)
   - **Runtime**: `Node`
   - **Build Command**: `npm install` (If Root Directory is empty, use: `npm --prefix backend install`)
   - **Start Command**: `npm start` (If Root Directory is empty, use: `npm --prefix backend start`)
   - **Instance Type**: `Free`

5. Add the following **Environment Variables** in the Environment tab:
   | Key | Example Value | Note |
   | --- | ------------- | ---- |
   | `NODE_ENV` | `production` | Enables production optimizations |
   | `MONGODB_URI` | `mongodb+srv://<user>:<password>@cluster0.xxx.mongodb.net/portfolio_db?retryWrites=true&w=majority` | Your MongoDB Atlas connection URI |
   | `CORS_ORIGIN` | `*` (or `https://your-portfolio.vercel.app`) | Allows your Vercel frontend to make requests |
   | `ADMIN_USER` | `lekibir` | Admin portal username |
   | `ADMIN_PASS` | `lake1122@` | Admin portal password |

6. In **Advanced Settings**:
   - **Health Check Path**: `/health` (Render uses this to verify the instance is alive)
7. Click **Create Web Service**.
8. Once deployed, copy your Render service URL (e.g., `https://portfolio-backend-xxxx.onrender.com`).

> 💡 **Tip:** To test your backend immediately, open `https://your-backend.onrender.com/health` in your browser. It will return:
> `{"status":"healthy","uptime":...,"dbConnected":true}`

---

## Part 2: Connect Frontend & Deploy to Vercel

### Step 1: Set your Render Backend URL in Frontend Config
Open `frontend/config.js` and set your Render URL:
```javascript
window.PORTFOLIO_CONFIG = {
  // Paste your live Render backend URL here:
  BACKEND_URL: 'https://portfolio-backend-xxxx.onrender.com',
};
```
Commit and push this change to GitHub (`git add . && git commit -m "Set backend URL" && git push`).

*(Optional Alternative: You can also configure Vercel Rewrites in `vercel.json` to proxy `/api/(.*)` to your Render URL without modifying `frontend/config.js`)*

---

### Step 2: Deploy to Vercel
1. Log in to [Vercel](https://vercel.com).
2. Click **Add New...** → **Project**.
3. Import your GitHub repository: `portfolio-animation`.
4. Configure the Project:
   - **Framework Preset**: `Other`
   - **Root Directory**: Select `frontend` (or keep `.` as root; both root `vercel.json` and `frontend/vercel.json` are already set up).
   - **Build Command**: Leave default/empty.
   - **Output Directory**: Leave default (`.` or `frontend`).
5. Click **Deploy**.

---

## 🛠️ Verification Checklist

- [ ] **Home Page**: Open your Vercel URL (e.g. `https://portfolio-xxxx.vercel.app`) - verify projects deck, skills, and certifications render cleanly.
- [ ] **Projects Page**: Navigate to `/projects` or `/projects.html` - test filtering and live search.
- [ ] **Admin Portal**: Navigate to `/admin` or `/admin.html`:
  - Log in with `lekibir` / `lake1122@`
  - Verify stats, projects, CV management, and contact messages sync with your MongoDB Atlas database.
- [ ] **CV Download**: Click "Download CV" or view PDF to verify resume download works through the backend.
- [ ] **Contact Form**: Send a test message from the contact form and confirm it reaches the Admin dashboard.
