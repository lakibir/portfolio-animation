# 🚀 Lekibir Mulatu — Full-Stack Engineering & Design Portfolio

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-Backend-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB_Atlas-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![CSS3](https://img.shields.io/badge/CSS3-Design_System-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

An ultra-modern, interactive, and responsive portfolio web application crafted with a custom dark-mode glassmorphism design system, powered by an asynchronous **Node.js/Express** backend and **MongoDB Atlas** database. Features a full dynamic **Admin CMS Panel**, real-time search & category filtering, interactive project inspector modals, and an interactive experience timeline.

---

## ✨ Key Features

- **🎨 Signature Aesthetics & Design System**:
  - Dark mode glassmorphism UI built with pure Vanilla CSS custom properties (`tokens`).
  - Fluid typography via CSS `clamp()` and curated typography with Google Fonts (*Plus Jakarta Sans*, *Instrument Serif*).
  - Micro-animations, interactive hovering states, glow borders, and live pulse badges.

- **💼 Interactive Work Experience Matrix**:
  - Signature staggered diagonal timeline with dashed guidelines.
  - Highlights full-stack engineering at **Qiyas Advanced Digital Skills Program (AAU / MoLS)** and systems administration at **Mada Walabu University**.
  - Completely responsive and auto-centered across all mobile, tablet, and desktop viewports.

- **📂 Projects & Certifications Hub (`projects.html`)**:
  - Master dual-tab switcher: Toggle effortlessly between **Featured Engineering Projects** and **Accredited Certifications**.
  - Real-time search by keyword and category filters (*Full-Stack*, *AI / ML*, *Frontend*, *Mobile*, *Cloud / DevOps*).
  - Interactive Project Modal Inspector detailing architecture, live metrics, tech stack tags, and repository links.

- **🛠️ Full-Featured Admin CMS Panel (`admin.html`)**:
  - Complete CRUD operations (Create, Read, Update, Delete) for:
    - **Projects**: Title, category, live URL, GitHub repo, tags, and summary.
    - **Certifications**: Issuing organization, credential ID, completion date, and verification links.
    - **Skills**: Dynamic categorization across Frontend, Backend, Tools, and AI.
    - **Testimonials & Contact Submissions**: Review incoming messages directly from recruiters.

- **⚡ Robust Backend Architecture**:
  - RESTful API endpoints organized cleanly into Express router modules (`/api/projects`, `/api/skills`, `/api/certificates`, `/api/testimonials`, `/api/contact`).
  - Mongoose models with strict schema validation.
  - Pre-seeded high-fidelity data script (`reseedDB.js`) for seamless zero-to-running local development.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5 (Semantic), Vanilla CSS3 (Custom Design System, Flexbox, Grid), Modern JavaScript (ES6+ Modules, Fetch API) |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB Atlas, Mongoose ODM |
| **Environment & Tools** | Dotenv, Nodemon, Git, Postman |

---

## 📁 Repository Structure

```text
portfolio-web/
├── backend/                    # Node.js Express & MongoDB Backend
│   ├── .env                    # Environment variables (DB URI, PORT)
│   ├── .env.example            # Environment variables template
│   ├── package.json            # Backend dependencies & scripts
│   ├── server.js               # Express application entry point & MongoDB connection
│   ├── seedData.js             # Verified portfolio data
│   ├── reseedDB.js             # Database reset/seed script
│   ├── models/                 # Mongoose Data Models
│   │   ├── Project.js
│   │   ├── Certificate.js
│   │   ├── Skill.js
│   │   ├── Experience.js
│   │   ├── Testimonial.js
│   │   └── Message.js
│   └── routes/                 # Express REST API Endpoints
│       ├── projectRoutes.js    # /api/projects
│       ├── certificateRoutes.js# /api/certificates
│       ├── skillRoutes.js      # /api/skills
│       ├── experienceRoutes.js # /api/experience
│       ├── testimonialRoutes.js# /api/testimonials
│       ├── contactRoutes.js    # /api/contact
│       └── statsRoutes.js      # /api/stats
│
├── frontend/                   # Client-side Static Web Application
│   ├── index.html              # Main landing page & interactive canvas timeline
│   ├── style.css               # Signature glassmorphic design system
│   ├── script.js               # Canvas scroll sequence & interactive client logic
│   ├── projects.html           # Dedicated projects & certifications showcase page
│   ├── projects.js             # Showcase filtering, search & modal controller
│   ├── admin.html              # Full Admin CMS management dashboard
│   ├── admin.css               # Admin CMS panel styling
│   ├── admin.js                # Admin CRUD operations & state management
│   └── image/                  # Media, frame sequences, and project screenshots
│
├── package.json                # Root package.json with convenient proxy scripts
└── README.md                   # Project documentation
```

---

## 🚀 Getting Started

Follow these instructions to set up the project locally on your machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16.0.0 or higher recommended)
- [Git](https://git-scm.com/)
- [MongoDB Atlas](https://www.mongodb.com/atlas) account (or a local MongoDB instance)

### 1. Clone the Repository

```bash
git clone https://github.com/lakibir/portfolio-animation.git
cd portfolio-animation
```

### 2. Install Dependencies

You can install dependencies inside `backend/`:

```bash
cd backend
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend/` directory:

```bash
cp backend/.env.example backend/.env
```

Open `backend/.env` and configure your settings:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

### 4. (Optional) Seed the Database

Populate your MongoDB database with pre-configured project, skill, and certification entries:

```bash
npm run seed
# or: cd backend && node reseedDB.js
```

### 5. Launch the Server

Run directly from root or inside `backend/`:

```bash
npm start
# or: npm run dev
```

Visit the application in your browser:
- **Main Portfolio**: [http://localhost:5000](http://localhost:5000)
- **Projects & Certifications**: [http://localhost:5000/projects.html](http://localhost:5000/projects.html)
- **Admin Dashboard**: [http://localhost:5000/admin.html](http://localhost:5000/admin.html)

---

## 📡 REST API Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/projects` | Retrieve all projects |
| `POST` | `/api/projects` | Create a new project entry |
| `DELETE` | `/api/projects/:id` | Remove a project entry |
| `GET` | `/api/certificates` | Retrieve all certifications |
| `POST` | `/api/certificates` | Add a verified certification |
| `GET` | `/api/skills` | List all technical skills |
| `POST` | `/api/contact` | Submit contact / inquiry form message |

---

## 👤 Author

**Lekibir Mulatu**  
- **Role**: Full-Stack Developer & Software Engineer  
- **Location**: Addis Ababa, Ethiopia  
- **GitHub**: [@lakibir](https://github.com/lakibir)  
- **LinkedIn**: [Lekibir Mulatu](https://linkedin.com)  

---

## 📄 License

This project is licensed under the MIT License — feel free to use and adapt it for your own portfolio.
