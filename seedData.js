/**
 * Initial Seed Data for Lekibir Mulatu's Portfolio MongoDB Collections
 * Junior Software Engineer | Systems & IT Administrator
 */

const initialProjects = [
  {
    title: "Ethio Temhert LMS Learning Management",
    category: "Full-Stack / EdTech",
    subtitle: "Cloud Learning Management & Virtual Classrooms",
    description: "Institutional e-learning platform featuring course curriculum delivery, real-time student performance tracking, assessment sandboxes, and interactive lecture modules.",
    image: "image/project-lms.jpg",
    liveDemoUrl: "#contact",
    githubUrl: "https://github.com/lakibir",
    metrics: "Scalable LMS Architecture • Multi-Tenant",
    techStack: ["React", "Node.js", "Express", "MongoDB", "RESTful APIs", "MERN Stack"],
    highlights: [
      { label: "Architecture", val: "Modular MERN Stack E-Learning Portal" },
      { label: "Features", val: "Automated Grading & Student Progress Telemetry" },
      { label: "Security", val: "JWT Authentication & Role-Based Access Control" }
    ],
    featured: true,
    order: 1
  },
  {
    title: "Hotel Management System",
    category: "Enterprise & Systems",
    subtitle: "Hospitality Operations & Reservation Engine",
    description: "End-to-end hotel operations and hospitality platform covering room inventory, reservation pipelines, guest check-in/out automation, and integrated billing reconciliation.",
    image: "image/project-mern.jpg",
    liveDemoUrl: "#contact",
    githubUrl: "https://github.com/lakibir",
    metrics: "Full Reservation Cycle • Zero Discrepancy",
    techStack: ["React", "Node.js", "MySQL", "PostgreSQL", "Express", "RESTful APIs"],
    highlights: [
      { label: "Workflow", val: "Automated Guest Check-in/Check-out Pipelines" },
      { label: "Database", val: "Relational Schema with ACID Transaction Safety" },
      { label: "Billing", val: "Automated Folio Generation & Revenue Tracking" }
    ],
    featured: true,
    order: 2
  },
  {
    title: "Object Detection Python OpenCV",
    category: "AI & Computer Vision",
    subtitle: "Real-Time Computer Vision & Image Processing",
    description: "High-performance visual perception engine developed using Python and OpenCV for live object detection, multi-class bounding-box classification, and automated video stream analysis.",
    image: "image/project-fitlife.jpg",
    liveDemoUrl: "#contact",
    githubUrl: "https://github.com/lakibir",
    metrics: "Real-Time 30+ FPS Inference • Multi-Class Detection",
    techStack: ["Python", "OpenCV", "Machine Learning", "AI Integration", "NumPy"],
    highlights: [
      { label: "Performance", val: "Real-Time Object Localization & Tracking" },
      { label: "Processing", val: "Optimized Computer Vision Pipeline" },
      { label: "Integration", val: "Camera Telemetry & Spatial Annotation" }
    ],
    featured: true,
    order: 3
  },
  {
    title: "Inventory Management System In OOP",
    category: "Backend & Systems",
    subtitle: "Object-Oriented Enterprise Asset & Stock OS",
    description: "Robust enterprise inventory system architected with strict Object-Oriented Programming (OOP) design patterns, stock level alerts, supplier logistics, and audit trail ledger.",
    image: "image/project-student.jpg",
    liveDemoUrl: "#contact",
    githubUrl: "https://github.com/lakibir",
    metrics: "Strict OOP Design Patterns • Real-Time Stock Auditing",
    techStack: ["OOP Principles", "Java", "C++", "MySQL", "Data Structures", "Design Patterns"],
    highlights: [
      { label: "Design", val: "Polymorphism, Inheritance & Encapsulated Models" },
      { label: "Auditability", val: "Complete Stock Tracking & Reorder Heuristics" },
      { label: "Scalability", val: "Modular Catalog Architecture" }
    ],
    featured: true,
    order: 4
  },
  {
    title: "Hotel Advertisement System",
    category: "Marketing & Web",
    subtitle: "Targeted Hospitality Promotion & Booking Engine",
    description: "Dynamic marketing and promotional web engine enabling hotels to showcase luxury accommodations, package deals, seasonal discounts, and drive high-conversion direct booking traffic.",
    image: "image/project-1.jpg",
    liveDemoUrl: "#contact",
    githubUrl: "https://github.com/lakibir",
    metrics: "High-Conversion Landing Engine • Responsive UI",
    techStack: ["HTML5", "CSS3", "JavaScript", "React", "Digital Marketing Systems", "SEO"],
    highlights: [
      { label: "Conversion", val: "Engaging Visual Promotional Campaigns" },
      { label: "Design", val: "Fluid Mobile-First Responsive Layouts" },
      { label: "SEO", val: "Optimized Meta Tags & High Performance Lighthouse" }
    ],
    featured: true,
    order: 5
  },
  {
    title: "Enterprise Web Apps & Systems Automation",
    category: "Full-Stack / Systems",
    subtitle: "Mada Walabu University Computing College",
    description: "Secure web systems developed during IT & Software Development internship integrating Laravel and MERN stacks with PostgreSQL/MySQL databases and AI-driven automation workflows.",
    image: "image/project-equb.jpg",
    liveDemoUrl: "#contact",
    githubUrl: "https://github.com/lakibir",
    metrics: "Production Deployed • AI Workflow Automation",
    techStack: ["Laravel", "MERN Stack", "React", "Node.js", "PostgreSQL", "AI Integration"],
    highlights: [
      { label: "Security", val: "Enterprise Authentication & Database Mapping" },
      { label: "Networks", val: "TCP/IP & DNS Service Configuration" },
      { label: "Automation", val: "AI-Assisted Workflow Scripting" }
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
    status: "Certified",
    description: "Official certification by Associate Registrar Mr. Wubshet Girma confirming English as the medium of instruction across all four years of B.Sc. studies per Higher Education Proclamation No. 650/2009.",
    order: 2
  },
  {
    title: "Full Stack Web Development Training",
    issuer: "Cursa Platform",
    credentialId: "CURSA-FSW-VERIFIED",
    issueYear: "2025",
    validUntil: "Perpetual",
    skillsTags: ["Full-Stack Web Development", "JavaScript", "React", "Node.js", "Express", "MongoDB"],
    logoType: "aws",
    verifyUrl: "#contact",
    status: "Verified",
    description: "Comprehensive training curriculum in modern full-stack web applications, REST API development, component lifecycle, and reactive UI architecture.",
    order: 3
  },
  {
    title: "AI-Optimized Web Development Workshop",
    issuer: "Wrench Wise",
    credentialId: "WW-AI-OPT-2025",
    issueYear: "2025",
    validUntil: "Perpetual",
    skillsTags: ["AI Integration", "Prompt Engineering", "Workflow Automation", "Modern Web Acceleration"],
    logoType: "mongodb",
    verifyUrl: "#contact",
    status: "Verified",
    description: "Hands-on engineering workshop focused on leveraging artificial intelligence integration, LLM tooling, and custom automation scripts to accelerate web engineering pipelines.",
    order: 4
  },
  {
    title: "Food Systems Innovation Challenge 2026",
    issuer: "Wageningen University & Research",
    credentialId: "WUR-FSIC-2026",
    issueYear: "2026",
    validUntil: "Honors",
    skillsTags: ["Systems Innovation", "AgriTech & Data", "Problem Solving", "Collaborative Engineering"],
    logoType: "docker",
    verifyUrl: "#contact",
    status: "Recognized",
    description: "International technical innovation challenge focused on building resilient, scalable technology-driven solutions for food system data and resource management.",
    order: 5
  },
  {
    title: "Angular 2 for Beginners",
    issuer: "The New Boston (via Cursa)",
    credentialId: "TNB-ANG2-CURSA",
    issueYear: "2024",
    validUntil: "Perpetual",
    skillsTags: ["AngularJS / Angular", "TypeScript", "Dependency Injection", "Component Architecture"],
    logoType: "postgres",
    verifyUrl: "#contact",
    status: "Verified",
    description: "Foundational mastery in Angular single-page application structure, two-way data binding, TypeScript interfaces, and reusable service modules.",
    order: 6
  },
  {
    title: "Technology and Innovation (Techno) Club",
    issuer: "Wollo University",
    credentialId: "WU-TECHNO-MEMBER",
    issueYear: "2024 - 2026",
    validUntil: "Active Alumni",
    skillsTags: ["Peer Collaboration", "Innovation Projects", "Tech Mentorship", "Hackathons"],
    logoType: "meta",
    verifyUrl: "#contact",
    status: "Honored",
    description: "Active contributor and participant in university innovation showcases, collaborative coding sessions, and technology seminars.",
    order: 7
  }
];

const initialSkills = [
  { name: "JavaScript & ES6+", category: "Frontend", proficiencyPct: 94, iconColor: "#F7DF1E", order: 1 },
  { name: "React & AngularJS", category: "Frontend", proficiencyPct: 92, iconColor: "#61DAFB", order: 2 },
  { name: "Node.js & Express", category: "Backend", proficiencyPct: 90, iconColor: "#339933", order: 3 },
  { name: "Systems Administration", category: "Infrastructure", proficiencyPct: 93, iconColor: "#ff5018", order: 4 },
  { name: "Network Architecture (TCP/IP, DNS)", category: "Networking", proficiencyPct: 89, iconColor: "#3d7eff", order: 5 },
  { name: "MongoDB & MERN Stack", category: "Database", proficiencyPct: 91, iconColor: "#47A248", order: 6 },
  { name: "MySQL & PostgreSQL", category: "Database", proficiencyPct: 88, iconColor: "#4169E1", order: 7 },
  { name: "Python & OpenCV", category: "AI & Tools", proficiencyPct: 87, iconColor: "#3776AB", order: 8 },
  { name: "AI Integration & Automation", category: "AI & Tools", proficiencyPct: 90, iconColor: "#8B5CF6", order: 9 },
  { name: "Git & Version Control", category: "Tools", proficiencyPct: 92, iconColor: "#F05032", order: 10 },
  { name: "IT Security & Support", category: "Infrastructure", proficiencyPct: 86, iconColor: "#10B981", order: 11 },
  { name: "ERP & Tech Project Management", category: "Enterprise", proficiencyPct: 88, iconColor: "#E5A93B", order: 12 }
];

const initialExperience = [
  {
    role: "Full-Stack Developer Intern",
    company: "Qiyas Advanced Digital Skills Program (AAU / MoLS)",
    duration: "May 2026 - Present",
    location: "Addis Ababa, Ethiopia",
    description: "Engineering scalable frontend features and robust backend services using modern web frameworks within a high-caliber digital skills acceleration initiative.",
    highlights: [
      "Engineered scalable frontend features and robust backend services using modern web frameworks",
      "Optimized relational and non-relational database designs, query performance, and data mapping",
      "Collaborated in agile sprint planning and peer code reviews to accelerate deployment timelines"
    ],
    order: 1
  },
  {
    role: "IT & Software Development Intern",
    company: "Mada Walabu University Computing College",
    duration: "June 2025 - August 2025",
    location: "Bale Robe, Ethiopia",
    description: "Delivered full-stack web solutions and supported campus-wide systems administration, network infrastructure, and automation initiatives.",
    highlights: [
      "Developed secure Laravel and MERN stack web applications integrated with PostgreSQL/MySQL databases",
      "Assisted with systems administration, network architecture maintenance, and TCP/IP/DNS configurations",
      "Leveraged AI integration and custom automation scripting to optimize infrastructure workflows"
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
    name: "Mr. Wubshet Girma",
    role: "Associate Registrar",
    company: "Wollo University Registrar Office",
    quote: "Mr. Lekibir Mulatu Haile has completed his four-year Bachelor of Science Degree in Computer Science with English as the medium of instruction throughout his studies (Ref: KIOTR/0690/18). We are confident that he will be successful in his professional and academic endeavors at any global technology institution.",
    initials: "WG",
    avatarClass: "avatar-3",
    order: 3
  }
];

module.exports = {
  initialProjects,
  initialCertificates,
  initialSkills,
  initialExperience,
  initialTestimonials
};
