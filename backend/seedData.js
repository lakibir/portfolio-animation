/**
 * Initial Seed Data for Lekibir Mulatu's Portfolio MongoDB Collections
 * Junior Software Engineer | Systems & IT Administrator
 */

const initialProjects = [
  {
    title: "Eleni Epoxy",
    category: "Full-Stack / E-Commerce & Logistics",
    subtitle: "Custom Resin Art E-Commerce & Logistics Management Platform",
    description: "Eleni Epoxy is an end-to-end e-commerce and logistics management platform tailored for custom resin and epoxy art commerce. Built with a decoupled client-server architecture, it bridges the gap between storefront retail, artisan inventory workflows, and last-mile order dispatch.",
    image: "image/project-eleni.jpg",
    githubUrl: "https://github.com/lakibir/eleni.git",
    liveDemoUrl: "https://github.com/lakibir/eleni.git",
    liveUrl: "https://github.com/lakibir/eleni.git",
    metrics: "Decoupled Architecture • PostgreSQL 15+ & JSONB • 4-Tier RBAC & Docker",
    techStack: [
      "ASP.NET Core 8",
      "C#",
      "Angular 17+",
      "TypeScript",
      "PostgreSQL 15+",
      "Entity Framework Core",
      "Tailwind CSS",
      "Docker",
      "JWT Bearer",
      "Serilog",
      "FluentValidation",
      "OpenAPI / Swagger"
    ],
    tags: [
      "ASP.NET Core 8",
      "C#",
      "Angular 17+",
      "TypeScript",
      "PostgreSQL 15+",
      "Entity Framework Core",
      "Tailwind CSS",
      "Docker",
      "JWT Bearer",
      "Serilog",
      "FluentValidation",
      "OpenAPI / Swagger"
    ],
    features: [
      "Decoupled Client-Server Architecture — Angular 17+ Standalone Components with Signals (signal, computed, effect) for fine-grained reactivity paired with ASP.NET Core 8 Web API.",
      "PostgreSQL 15+ Advanced Data Modeling — UUID primary keys (gen_random_uuid()), native CHECK constraints, JSONB flexible address storage, and immutable historical audit logging (audit_logs).",
      "Stateless JWT & Claim-Based RBAC — 4-tier Role-Based Access Control enforced across API endpoint attributes and Angular route guards (SuperAdmin, Admin, Driver, Buyer) with BCrypt password hashing.",
      "Artisan Inventory & Last-Mile Dispatch — Bridges the gap between storefront retail, artisan studio workflows, and last-mile order fulfillment with soft-delete catalog entities.",
      "DevOps & Multi-Stage Docker — Containerized orchestration via Docker Compose for production and local environments, with FluentValidation pipeline filters and Serilog structured logging."
    ],
    highlights: [
      { label: "Backend Core", val: "ASP.NET Core 8 Web API (C#) • EF Core (Npgsql) • FluentValidation • Serilog • Swagger UI" },
      { label: "Frontend Client", val: "Angular 17+ • Standalone Components • Signals • Reactive Forms • Tailwind CSS" },
      { label: "Database & Storage", val: "PostgreSQL 15+ • UUID PKs • JSONB Address Storage • CHECK Constraints • Audit Logs" },
      { label: "Security & RBAC", val: "Stateless JWT Bearer • Claims-Based RBAC • BCrypt Hashing • Route Guards" },
      { label: "DevOps & Logistics", val: "Multi-stage Dockerfiles • Docker Compose • Artisan Inventory & Last-Mile Dispatch" }
    ],
    featured: true,
    order: 1
  },
  {
    title: "Farmer to Market",
    category: "Full-Stack / AgriTech",
    subtitle: "Digital Agricultural Marketplace",
    description: "Farmer-to-Market is a digital agricultural marketplace designed to connect farmers directly with buyers, making it easier to discover, sell, and purchase agricultural products online. The platform focuses on reducing unnecessary intermediaries while improving market access, transparency, and convenience for both farmers and buyers.",
    image: "image/project-farmer.jpg",
    githubUrl: "https://github.com/lakibir/Farmer-to-Market.git",
    liveDemoUrl: "https://farmer-to-market-k34t.vercel.app/",
    liveUrl: "https://farmer-to-market-k34t.vercel.app/",
    metrics: "Direct Farmer-to-Buyer • Zero Middlemen • Angular & ASP.NET Core",
    techStack: ["Angular", "TypeScript", "ASP.NET Core", ".NET 10", "Entity Framework Core", "SQL Server", "REST API", "JWT"],
    tags: ["Angular", "TypeScript", "ASP.NET Core", ".NET 10", "Entity Framework Core", "SQL Server", "REST API", "JWT"],
    features: [
      "🌾 Farmer Product Listings — Showcase agricultural produce with full details",
      "🛒 Online Marketplace — Direct Farmer-to-Buyer Connection",
      "🔎 Product Discovery — Search and explore agricultural products",
      "📦 Order & Product Management — Streamlined transactions",
      "📱 Responsive Cross-Device UI & Wider Market Access"
    ],
    highlights: [
      { label: "Listings", val: "🌾 Farmer Product Listings — Showcase agricultural produce with full details" },
      { label: "Marketplace", val: "🛒 Online Marketplace — Direct Farmer-to-Buyer Connection" },
      { label: "Discovery", val: "🔎 Product Discovery — Search and explore agricultural products" },
      { label: "Management", val: "📦 Order & Product Management — Streamlined transactions" },
      { label: "Interface", val: "📱 Responsive Cross-Device UI & Wider Market Access" }
    ],
    featured: true,
    order: 2
  },
  {
    title: "EthioTemhret LMS",
    category: "Full-Stack / EdTech",
    subtitle: "Educational Management & Learning Platform",
    description: "EthioTemhret LMS is a comprehensive web-based education management platform designed to centralize academic, student, teacher, parent, and administrative operations. The system provides educational institutions with a structured digital environment for managing users, academic information, institutional activities, and learning-related workflows.",
    image: "image/project-lms.jpg",
    githubUrl: "https://github.com/lakibir/student-management",
    liveDemoUrl: "#contact",
    liveUrl: "#contact",
    metrics: "Modular Architecture • Role-Based Management • Centralized Data",
    techStack: ["Laravel", "PHP", "MySQL", "Blade", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Composer", "Git"],
    tags: ["Laravel", "PHP", "MySQL", "Blade", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Composer", "Git"],
    features: [
      "Modular Laravel-Based Education Management System",
      "Server-Rendered Blade Interface with HTML, CSS & JavaScript",
      "Laravel Framework with PHP and REST-Ready Application Architecture",
      "MySQL Relational Database with Structured Institutional Data",
      "Authentication, Authorization & Role-Based Access Control",
      "Centralized Student, Teacher, Parent & Academic Data",
      "Composer, NPM, Git & Laravel Development Workflow"
    ],
    highlights: [
      { label: "Architecture", val: "Modular Laravel-Based Education Management System" },
      { label: "Frontend", val: "Server-Rendered Blade Interface with HTML, CSS & JavaScript" },
      { label: "Backend", val: "Laravel Framework with PHP and REST-Ready Application Architecture" },
      { label: "Database", val: "MySQL Relational Database with Structured Institutional Data" },
      { label: "Security", val: "Authentication, Authorization & Role-Based Access Control" },
      { label: "Management", val: "Centralized Student, Teacher, Parent & Academic Data" },
      { label: "Development", val: "Composer, NPM, Git & Laravel Development Workflow" }
    ],
    featured: true,
    order: 3
  },
  {
    title: "MERN Blog CMS",
    category: "Full-Stack / Content Management",
    subtitle: "Modern Blog Publishing & Content Management",
    description: "A full-stack blogging and content management platform that enables users to discover and interact with published articles while providing administrators with tools to manage blog content, users, comments, and publishing workflows. The application combines a responsive React frontend with a Node.js and Express backend connected to MongoDB.",
    image: "image/project-blog.jpg",
    githubUrl: "https://github.com/lakibir/mern_blog_website_cms",
    liveDemoUrl: "https://mern-blog-website-cms.onrender.com/",
    liveUrl: "https://mern-blog-website-cms.onrender.com/",
    metrics: "MERN Architecture • RESTful API • Full CMS & OTP Auth",
    techStack: ["React", "JavaScript", "Node.js", "Express.js", "MongoDB", "Mongoose", "RESTful APIs", "JWT", "Vite", "Cloudinary"],
    tags: ["React", "JavaScript", "Node.js", "Express.js", "MongoDB", "Mongoose", "RESTful APIs", "JWT", "Vite", "Cloudinary"],
    features: [
      "Modular MERN Full-Stack Blog & CMS Architecture",
      "Responsive React Interface with Vite",
      "Node.js & Express RESTful API",
      "MongoDB with Mongoose ODM",
      "JWT-Based Authentication & Protected Operations",
      "Cloud-Based Image Upload & Management with Cloudinary",
      "Email-Based OTP Registration & Password Recovery"
    ],
    highlights: [
      { label: "Architecture", val: "Modular MERN Full-Stack Blog & CMS Architecture" },
      { label: "Frontend", val: "Responsive React Interface with Vite" },
      { label: "Backend", val: "Node.js & Express RESTful API" },
      { label: "Database", val: "MongoDB with Mongoose ODM" },
      { label: "Security", val: "JWT-Based Authentication & Protected Operations" },
      { label: "Media", val: "Cloud-Based Image Upload & Management" },
      { label: "Communication", val: "Email-Based OTP Registration & Password Recovery" }
    ],
    featured: true,
    order: 4
  },
  {
    title: "Hotel Management System",
    category: "Full-Stack / Hospitality",
    subtitle: "Operations & Reservation Management",
    description: "A hotel management platform designed to streamline hotel operations by providing a centralized system for managing rooms, guests, reservations, bookings, and day-to-day hotel activities. The system organizes hospitality workflows into a structured digital platform for more efficient management and service delivery.",
    image: "image/project-hotel.jpg",
    githubUrl: "https://github.com/lakibir/hotel-management",
    liveDemoUrl: "#contact",
    liveUrl: "#contact",
    metrics: "Hospitality Management • Booking Workflow • Centralized Hotel Data",
    techStack: ["React", "Node.js", "Express", "MySQL", "PostgreSQL", "RESTful APIs", "JavaScript", "HTML5", "CSS3"],
    tags: ["React", "Node.js", "Express", "MySQL", "PostgreSQL", "RESTful APIs", "JavaScript", "HTML5", "CSS3"],
    features: [
      "Structured Hotel Management Application",
      "Centralized Rooms, Guests & Reservation Data",
      "Booking, Availability & Guest Management Workflows",
      "Organized Interface for Hotel Operations",
      "Structured Data Management for Hotel Operations",
      "CRUD-Based Management & Business Workflows"
    ],
    highlights: [
      { label: "Architecture", val: "Structured Hotel Management Application" },
      { label: "Management", val: "Centralized Rooms, Guests & Reservation Data" },
      { label: "Operations", val: "Booking, Availability & Guest Management Workflows" },
      { label: "User Experience", val: "Organized Interface for Hotel Operations" },
      { label: "Database", val: "Structured Data Management for Hotel Operations" },
      { label: "Development", val: "CRUD-Based Management & Business Workflows" }
    ],
    featured: true,
    order: 5
  },
  {
    title: "Object Detection & Computer Vision",
    category: "Computer Vision / AI",
    subtitle: "Real-Time Object Detection & Stream Processing",
    description: "A computer vision project focused on detecting and identifying objects within images or video streams. Engineered with Python, OpenCV for high-throughput image and video frame processing, and TensorFlow for deep neural network inference, classification, and real-time bounding box localization.",
    image: "image/project-object-detection.png",
    githubUrl: "https://github.com/lakibir/object-detection",
    liveDemoUrl: "#contact",
    liveUrl: "#contact",
    metrics: "Real-Time Streams • Spatial Bounding Boxes • OpenCV & TensorFlow",
    techStack: ["Python", "OpenCV", "TensorFlow", "Computer Vision", "Deep Learning", "NumPy", "CNN"],
    tags: ["Python", "OpenCV", "TensorFlow", "Computer Vision", "Deep Learning", "NumPy", "CNN"],
    features: [
      "Multi-Class Object Detection — Detects and identifies distinct real-world objects in live frames.",
      "Real-Time Video Stream Pipeline — Frame-by-frame image acquisition and processing with OpenCV.",
      "Deep Neural Network Inference — High-accuracy model predictions powered by TensorFlow.",
      "Bounding Box Spatial Localization — Precise coordinate regression with class labels and confidence scores.",
      "Non-Maximum Suppression (NMS) — Eliminates redundant candidate boxes for clean visual detection.",
      "Modular Computer Vision Architecture — Scalable pipeline easily adaptable to custom datasets and camera feeds."
    ],
    highlights: [
      { label: "Vision Pipeline", val: "Real-Time Multi-Class Object Detection & Spatial Localization" },
      { label: "Deep Learning", val: "TensorFlow Convolutional Neural Network Inference Engine" },
      { label: "Stream Processing", val: "OpenCV Frame Ingestion, Preprocessing & Dynamic Color Bounding" },
      { label: "Performance", val: "Optimized Inference Heuristics & Non-Maximum Suppression (NMS)" },
      { label: "Core Stack", val: "Python, OpenCV, TensorFlow, NumPy & Deep Vision Models" }
    ],
    featured: true,
    order: 6
  }
];


const initialCertificates = [
  {
    title: "Bachelor of Science in Computer Science (B.Sc.)",
    issuer: "Wollo University • Kombolcha Institute of Technology",
    credentialId: "CGPA 3.25 / 4.0 • Exit Exam: 55",
    issueYear: "2026",
    validUntil: "Degree Awarded (Mar 17, 2026)",
    skillsTags: ["Computer Science", "Algorithms", "Operating Systems", "Distributed Systems", "Software Engineering"],
    logoType: "meta",
    verifyUrl: "image/credentials/degree-certificate.jpg",
    fileUrl: "image/credentials/degree-certificate.jpg",
    image: "image/credentials/degree-certificate.jpg",
    status: "Graduated",
    description: "Conferred Bachelor of Science Degree in Computer Science with a Cumulative GPA of 3.25/4.0 from Kombolcha Institute of Technology, Wollo University.",
    order: 1
  },
  {
    title: "English Language Proficiency Certification",
    issuer: "Wollo University Registrar Office",
    credentialId: "Ref: KIOTR/0690/18",
    issueYear: "2026",
    validUntil: "Official Certification",
    skillsTags: ["English Medium of Instruction", "Technical Writing", "Academic Communication", "Professional Fluency"],
    logoType: "gcp",
    verifyUrl: "image/credentials/english-proficiency.jpg",
    fileUrl: "image/credentials/english-proficiency.jpg",
    image: "image/credentials/english-proficiency.jpg",
    status: "Certified",
    description: "Official certification by Associate Registrar Mr. Wubshet Girma confirming English as the medium of instruction across all four years of B.Sc. studies per Higher Education Proclamation No. 650/2009.",
    order: 2
  },
  {
    title: "Full Stack Web Development Training",
    issuer: "Cursa Platform • WB Web Development",
    credentialId: "CURSA-u7987959",
    issueYear: "2026",
    validUntil: "Perpetual",
    skillsTags: ["Full-Stack Web Development", "JavaScript", "React", "Node.js", "Express", "MongoDB"],
    logoType: "aws",
    verifyUrl: "image/credentials/cursa-fullstack-certificate.jpg",
    fileUrl: "image/credentials/cursa-fullstack-certificate.jpg",
    image: "image/credentials/cursa-fullstack-certificate.jpg",
    status: "Verified",
    description: "Comprehensive 26-hour training curriculum in modern full-stack web applications, REST API development, component lifecycle, and reactive UI architecture.",
    order: 3
  },
  {
    title: "AI-Optimized Web Development Workshop",
    issuer: "Wrench Wise Applied Engineering",
    credentialId: "WW-WW002-2026",
    issueYear: "2026",
    validUntil: "Perpetual",
    skillsTags: ["AI Integration", "Prompt Engineering", "Workflow Automation", "Modern Web Acceleration"],
    logoType: "mongodb",
    verifyUrl: "image/credentials/wrench-wise-certificate.jpg",
    fileUrl: "image/credentials/wrench-wise-certificate.jpg",
    image: "image/credentials/wrench-wise-certificate.jpg",
    status: "Verified",
    description: "Hands-on engineering workshop focused on leveraging artificial intelligence integration, LLM tooling, and custom automation scripts to build websites that AI can read, rank, and recommend.",
    order: 4
  },
  {
    title: "Food Systems Innovation Challenge 2026",
    issuer: "Wageningen University & Research • NFP",
    credentialId: "WUR-NFP-2026-FLS",
    issueYear: "2026",
    validUntil: "Honors",
    skillsTags: ["Systems Innovation", "AgriTech & Data", "Problem Solving", "Collaborative Engineering"],
    logoType: "docker",
    verifyUrl: "image/credentials/food-systems-challenge.jpg",
    fileUrl: "image/credentials/food-systems-challenge.jpg",
    image: "image/credentials/food-systems-challenge.jpg",
    status: "Recognized",
    description: "International technical innovation challenge focused on building resilient, scalable technology-driven solutions for food system data and resource management with Team Fresh Life Solutions.",
    order: 5
  },
  {
    title: "Technology and Innovation (Techno) Club",
    issuer: "Wollo University Techno Club",
    credentialId: "WU-TECHNO-2024",
    issueYear: "2024 - 2026",
    validUntil: "Active Alumni",
    skillsTags: ["Peer Collaboration", "Innovation Projects", "Tech Mentorship", "Hackathons"],
    logoType: "meta",
    verifyUrl: "image/credentials/techno-club-certificate.jpg",
    fileUrl: "image/credentials/techno-club-certificate.jpg",
    image: "image/credentials/techno-club-certificate.jpg",
    status: "Honored",
    description: "Active contributor and participant in university innovation showcases, collaborative coding sessions, and technology seminars. Issued October 26, 2024.",
    order: 6
  }
];

const initialSkills = [
  { name: ".NET", category: "Backend", proficiencyPct: 92, iconColor: "#512BD4", order: 1 },
  { name: "Angular", category: "Frontend", proficiencyPct: 93, iconColor: "#DD0031", order: 2 },
  { name: "TypeScript", category: "Frontend", proficiencyPct: 94, iconColor: "#3178C6", order: 3 },
  { name: "JavaScript & ES6+", category: "Frontend", proficiencyPct: 94, iconColor: "#F7DF1E", order: 4 },
  { name: "React", category: "Frontend", proficiencyPct: 94, iconColor: "#61DAFB", order: 5 },
  { name: "Node.js & Express", category: "Backend", proficiencyPct: 90, iconColor: "#339933", order: 6 },
  { name: "Systems Administration", category: "Infrastructure", proficiencyPct: 93, iconColor: "#ff5018", order: 7 },
  { name: "Network Architecture (TCP/IP, DNS)", category: "Networking", proficiencyPct: 89, iconColor: "#3d7eff", order: 8 },
  { name: "MongoDB & MERN Stack", category: "Database", proficiencyPct: 91, iconColor: "#47A248", order: 9 },
  { name: "MySQL & PostgreSQL", category: "Database", proficiencyPct: 88, iconColor: "#4169E1", order: 10 },
  { name: "Python & OpenCV", category: "AI & Tools", proficiencyPct: 87, iconColor: "#3776AB", order: 11 },
  { name: "AI Integration & Automation", category: "AI & Tools", proficiencyPct: 90, iconColor: "#8B5CF6", order: 12 },
  { name: "Git & Version Control", category: "Tools", proficiencyPct: 92, iconColor: "#F05032", order: 13 },
  { name: "IT Security & Support", category: "Infrastructure", proficiencyPct: 86, iconColor: "#10B981", order: 14 },
  { name: "ERP & Tech Project Management", category: "Enterprise", proficiencyPct: 88, iconColor: "#E5A93B", order: 15 }
];

const initialExperience = [
  {
    role: "IT & Software Development Intern",
    company: "Mada Walabu University Computing College",
    duration: "June 2025 - August 2025",
    period: "June 2025 - August 2025",
    location: "Bale Robe, Ethiopia",
    description: "Delivered full-stack web solutions and supported campus-wide systems administration, network infrastructure, and automation initiatives.",
    icon: "🏛️",
    badge: "June 2025",
    isCurrent: false,
    highlights: [
      "Systems Administration & TCP/IP, DNS Configuration",
      "Laravel & MERN Web Apps with AI Automation"
    ],
    order: 1
  },
  {
    role: "Full-Stack Developer Intern",
    company: "Qiyas Advanced Digital Skills Program (AAU / MoLS)",
    duration: "May 2026 - Present",
    period: "May 2026 - Present",
    location: "Addis Ababa, Ethiopia",
    description: "Engineering scalable frontend features and robust backend services using modern web frameworks within a high-caliber digital skills acceleration initiative.",
    icon: "🚀",
    badge: "May 2026 – Present",
    isCurrent: true,
    highlights: [
      "Scalable Frontend Features & Robust Backend Services",
      "Relational & Non-Relational Query Tuning, Agile Sprints"
    ],
    order: 2
  }
];

const initialTestimonials = [
  {
    name: "Kasahun Asbo Yalew (MSc)",
    role: "Batch Advisor & Lecturer",
    company: "Computer Science Dept, Kombolcha Institute of Technology, Wollo University",
    quote: "Lekibir is one of the most sincere, hardworking and dedicated students of his batch. He has impressed me with his inquisitive mind and ingenious ability to comprehend, analyze and assimilate software design concepts. His ability to grasp things conceptually and implement them practically is exceptional. Always a live wire, his questions in class are incisive and insightful. I take great pride in recommending him.",
    initials: "KA",
    avatarClass: "avatar-1",
    order: 1
  },
  {
    name: "Hussien Mekonnen Yimer",
    role: "Lecturer (Operating Systems & Distributed Systems)",
    company: "Department of Computer Science, Kombolcha Institute of Technology, Wollo University",
    quote: "Lekibir consistently demonstrated exceptional intellectual ability, a strong work ethic, and a genuine passion for understanding complex computing concepts. In particular, I was impressed by his ability to tackle challenging problems in system-level programming, configure and manage network services with precision, and grasp the intricacies of distributed systems architecture with remarkable clarity. I give my highest recommendation without reservation.",
    initials: "HM",
    avatarClass: "avatar-2",
    order: 2
  },
  {
    name: "Mohammed Oumer",
    role: "Lecturer (Advanced Programming & Mobile App Development)",
    company: "Department of Computer Science, Kombolcha Institute of Technology, Wollo University",
    quote: "Mr. Lekibir Mulatu has consistently demonstrated outstanding discipline, dedication, and perseverance in his academic work. In the Advanced Programming course, he showed a strong grasp of object-oriented programming concepts, problem-solving techniques, and algorithmic thinking. In Mobile Application Development, he further distinguished himself through his creativity, technical competence, and attention to detail, successfully developing functional and user-friendly applications. He is academically strong, highly responsible, and collaborative. I recommend him without any reservation.",
    initials: "MO",
    avatarClass: "avatar-5",
    order: 3
  },
  {
    name: "Mr. Wubshet Girma",
    role: "Associate Registrar",
    company: "Wollo University Registrar Office",
    quote: "Mr. Lekibir Mulatu Haile has completed his four-year Bachelor of Science Degree in Computer Science with English as the medium of instruction throughout his studies (Ref: KIOTR/0690/18). We are confident that he will be successful in his professional and academic endeavors at any global technology institution.",
    initials: "WG",
    avatarClass: "avatar-3",
    order: 4
  }
];

module.exports = {
  initialProjects,
  initialCertificates,
  initialSkills,
  initialExperience,
  initialTestimonials
};
