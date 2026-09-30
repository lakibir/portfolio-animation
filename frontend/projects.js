/**
 * projects.js — Interactive showcase logic for Folioblox Projects & Certifications
 */

(() => {
  // Comprehensive Project Data for Quick View Modal - Lekibir Mulatu
  const projectsData = {
    1: {
      title: "Eleni Epoxy",
      category: "Full-Stack / E-Commerce & Logistics",
      image: "image/project-eleni.jpg",
      description: "Eleni Epoxy is an end-to-end e-commerce and logistics management platform tailored for custom resin and epoxy art commerce. Built with a decoupled client-server architecture, it bridges the gap between storefront retail, artisan inventory workflows, and last-mile order dispatch.",
      githubUrl: "https://github.com/lakibir/eleni.git",
      liveUrl: "https://github.com/lakibir/eleni.git",
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
      tech: ["ASP.NET Core 8", "C#", "Angular 17+", "TypeScript", "PostgreSQL 15+", "Entity Framework Core", "Tailwind CSS", "Docker", "JWT Bearer", "Serilog", "FluentValidation", "OpenAPI / Swagger"]
    },
    2: {
      title: "Farmer to Market",
      category: "Full-Stack / AgriTech",
      image: "image/project-farmer.jpg",
      description: "Farmer-to-Market is a digital agricultural marketplace designed to connect farmers directly with buyers, making it easier to discover, sell, and purchase agricultural products online. The platform focuses on reducing unnecessary intermediaries while improving market access, transparency, and convenience for both farmers and buyers.",
      githubUrl: "https://github.com/lakibir/Farmer-to-Market.git",
      liveUrl: "https://farmer-to-market-k34t.vercel.app/",
      features: [
        "🌾 Farmer Product Listings — Farmers can showcase their agricultural products with relevant details.",
        "🛒 Online Marketplace — Buyers can browse and discover available agricultural products.",
        "🔎 Product Discovery — Search and explore products through a digital marketplace.",
        "👨🌾 Direct Farmer-to-Buyer Connection — Creates a direct channel between producers and customers.",
        "📦 Order & Product Management — Supports the process of managing agricultural products and transactions.",
        "📊 Market Access — Helps farmers reach a wider customer base beyond traditional local markets.",
        "📱 Responsive Interface — Designed for convenient access across modern devices."
      ],
      highlights: [
        { label: "Listings", val: "🌾 Farmer Product Listings — Showcase agricultural produce with full details" },
        { label: "Marketplace", val: "🛒 Online Marketplace — Direct Farmer-to-Buyer Connection" },
        { label: "Discovery", val: "🔎 Product Discovery — Search and explore agricultural products" },
        { label: "Management", val: "📦 Order & Product Management — Streamlined transactions" },
        { label: "Interface", val: "📱 Responsive Cross-Device UI & 📊 Wider Market Access" }
      ],
      tech: ["Angular", "TypeScript", "ASP.NET Core", ".NET 10", "Entity Framework Core", "SQL Server", "REST API", "JWT"]
    },
    3: {
      title: "EthioTemhret LMS",
      category: "Full-Stack / EdTech",
      image: "image/project-lms.jpg",
      description: "EthioTemhret LMS is a comprehensive web-based education management platform designed to centralize academic, student, teacher, parent, and administrative operations. The system provides educational institutions with a structured digital environment for managing users, academic information, institutional activities, and learning-related workflows.",
      githubUrl: "https://github.com/lakibir/student-management",
      liveUrl: "#contact",
      features: [
        "MVC-based Laravel architecture",
        "Database-driven application design with Eloquent ORM",
        "Role-based access control (Student, Teacher, Parent, Admin, Super Admin)",
        "Centralized Student, Teacher, Parent & Academic Data Management",
        "Server-Rendered Blade Interface with HTML, CSS, Bootstrap & JavaScript",
        "Structured routing, controllers, migrations, and relational schema",
        "Responsive administrative dashboard and institutional operations"
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
      tech: ["Laravel", "PHP", "MySQL", "Blade", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Composer", "NPM", "Git"]
    },
    4: {
      title: "MERN Blog CMS",
      category: "Full-Stack / Content Management",
      image: "image/project-blog.jpg",
      description: "A full-stack blogging and content management platform that enables users to discover and interact with published articles while providing administrators with tools to manage blog content, users, comments, and publishing workflows. The application combines a responsive React frontend with a Node.js and Express backend connected to MongoDB.",
      githubUrl: "https://github.com/lakibir/mern_blog_website_cms",
      liveUrl: "https://mern-blog-website-cms.onrender.com/",
      features: [
        "User registration and authentication",
        "Secure login and protected routes",
        "Blog creation and content management",
        "Blog article browsing and reading",
        "Comment functionality",
        "User account management",
        "Password reset workflow",
        "Email OTP verification",
        "Image upload and media management",
        "RESTful API architecture",
        "MongoDB data persistence",
        "Responsive web interface"
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
      tech: ["React", "JavaScript", "Node.js", "Express.js", "MongoDB", "Mongoose", "RESTful APIs", "JWT", "HTML5", "CSS3", "Vite", "Cloudinary"]
    },
    5: {
      title: "Hotel Management System",
      category: "Full-Stack / Hospitality",
      image: "image/project-hotel.jpg",
      description: "A hotel management platform designed to streamline hotel operations by providing a centralized system for managing rooms, guests, reservations, bookings, and day-to-day hotel activities. The system organizes hospitality workflows into a structured digital platform for more efficient management and service delivery.",
      githubUrl: "https://github.com/lakibir/hotel-management",
      liveUrl: "#contact",
      features: [
        "Room and room-status management",
        "Guest information management",
        "Room reservation and booking workflows",
        "Check-in and check-out management",
        "Room availability tracking",
        "Customer record management",
        "Administrative management",
        "Centralized hotel data",
        "Dashboard-oriented management",
        "Structured CRUD operations"
      ],
      highlights: [
        { label: "Architecture", val: "Structured Hotel Management Application" },
        { label: "Management", val: "Centralized Rooms, Guests & Reservation Data" },
        { label: "Operations", val: "Booking, Availability & Guest Management Workflows" },
        { label: "User Experience", val: "Organized Interface for Hotel Operations" },
        { label: "Database", val: "Structured Data Management for Hotel Operations" },
        { label: "Development", val: "CRUD-Based Management & Business Workflows" }
      ],
      tech: ["React", "Node.js", "Express", "MySQL", "PostgreSQL", "RESTful APIs", "JavaScript", "HTML5", "CSS3"]
    },
    6: {
      title: "Object Detection & Computer Vision",
      category: "Computer Vision / AI",
      image: "image/project-object-detection.png",
      description: "A computer vision project focused on detecting and identifying objects within images or video streams. Engineered with Python, OpenCV for high-throughput image and video frame processing, and TensorFlow for deep neural network inference, classification, and real-time bounding box localization.",
      githubUrl: "https://github.com/lakibir/object-detection",
      liveUrl: "#contact",
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
      tech: ["Python", "OpenCV", "TensorFlow", "Computer Vision", "Deep Learning", "NumPy", "CNN"]
    }
  };

  // Alias lookups so slug and both new and legacy identifiers work
  projectsData['eleni'] = projectsData[1];
  projectsData['eleni-epoxy'] = projectsData[1];
  projectsData['farmer'] = projectsData[2];
  projectsData['lms'] = projectsData[3];
  projectsData['blog'] = projectsData[4];
  projectsData['hotel'] = projectsData[5];
  projectsData['ai'] = projectsData[6];


  // DOM Elements
  const projectsView = document.getElementById('projects') || document.getElementById('projects-view-container');
  const navProjectsLink = document.getElementById('nav-link-projects');

  const searchInput = document.getElementById('project-search-input');
  const categoryFilters = document.querySelectorAll('.filter-pill-btn');
  let projectCards = document.querySelectorAll('.project-card-full');
  let emptyState = document.getElementById('empty-search-state');
  const btnResetSearch = document.getElementById('btn-reset-search');
  const projectsTotalCount = document.getElementById('projects-total-count');

  // Modal Elements
  const projectModal = document.getElementById('project-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalImg = document.getElementById('modal-img');
  const modalCategory = document.getElementById('modal-category');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalHighlights = document.getElementById('modal-highlights');
  const modalTechList = document.getElementById('modal-tech-list');

  let currentCategory = 'all';
  let searchQuery = '';

  // -------------------------------------------------------------
  // PROJECT FILTERING & LIVE SEARCH
  // -------------------------------------------------------------
  const applyFilters = () => {
    let visibleCount = 0;
    const query = searchQuery.trim().toLowerCase();

    projectCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardTitle = card.getAttribute('data-title') || '';
      const cardTags = card.getAttribute('data-tags') || '';
      const cardText = (cardTitle + ' ' + cardTags).toLowerCase();

      const matchesCategory = currentCategory === 'all' || cardCategory === currentCategory;
      const matchesSearch = query === '' || cardText.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyState) {
      emptyState.style.display = visibleCount === 0 ? 'flex' : 'none';
    }

    if (projectsTotalCount) {
      projectsTotalCount.textContent = visibleCount;
    }
  };

  // Category filter clicks
  categoryFilters.forEach(btn => {
    btn.addEventListener('click', () => {
      categoryFilters.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.getAttribute('data-category');
      applyFilters();
    });
  });

  // Search input typing
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      applyFilters();
    });
  }

  // Reset filters button
  if (btnResetSearch) {
    btnResetSearch.addEventListener('click', () => {
      searchQuery = '';
      currentCategory = 'all';
      if (searchInput) searchInput.value = '';
      categoryFilters.forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-category') === 'all');
      });
      applyFilters();
    });
  }

  // -------------------------------------------------------------
  // PROJECT DETAILS MODAL
  // -------------------------------------------------------------
  window.openProjectModal = (id) => {
    const data = projectsData[id];
    if (!data || !projectModal) return;

    modalImg.src = data.image;
    modalImg.alt = data.title;
    modalCategory.textContent = data.category;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.description;

    // Highlights
    if (modalHighlights) {
      const hlList = Array.isArray(data.highlights) ? data.highlights : [];
      modalHighlights.innerHTML = hlList.map(hl => `
        <div class="modal-hl-item">
          <span class="modal-hl-title">${hl.label || 'Highlight'}</span>
          <span class="modal-hl-val">${hl.val || hl}</span>
        </div>
      `).join('');
    }

    // Professional Features
    const featWrap = document.getElementById('modal-features-container');
    const featList = document.getElementById('modal-features-list');
    const features = Array.isArray(data.features) && data.features.length
      ? data.features
      : (Array.isArray(data.highlights) ? data.highlights.map(h => typeof h === 'object' ? h.val : h) : []);

    if (featWrap && featList) {
      if (features.length > 0) {
        featList.innerHTML = features.map(f => `
          <div style="font-size: 13px; color: #e2e8f0; display: flex; align-items: flex-start; gap: 8px;">
            <span style="color: #ff5018; font-weight: bold; margin-top: 1px;">✓</span>
            <span>${f}</span>
          </div>
        `).join('');
        featWrap.style.display = 'block';
      } else {
        featWrap.style.display = 'none';
      }
    }

    // Tech stack
    if (modalTechList) {
      modalTechList.innerHTML = `
        <div style="display: flex; flex-wrap: wrap; gap: 8px;">
          ${(data.tech || []).map(t => `<span class="tech-tag-pill">${t}</span>`).join('')}
        </div>
      `;
    }

    // Action buttons (Live demo and GitHub Repo)
    const demoBtn = document.getElementById('modal-demo-btn');
    if (demoBtn) {
      const liveHref = data.liveUrl || '#contact';
      demoBtn.href = liveHref;
      demoBtn.target = (liveHref.startsWith('http')) ? '_blank' : '_self';
    }

    const ghBtn = document.getElementById('modal-github-btn');
    if (ghBtn) {
      ghBtn.href = data.githubUrl || 'https://github.com/lakibir';
    }

    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeProjectModal);
  }

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // Escape key to close active project modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
    }
  });

  // -------------------------------------------------------------
  // DYNAMIC MONGODB BACKEND SYNCHRONIZATION
  // -------------------------------------------------------------
  const mapCategoryToPill = (cat = '') => {
    const c = cat.toLowerCase();
    if (c.includes('edtech') || c.includes('lms') || c.includes('learning')) return 'edtech';
    if (c.includes('content') || c.includes('cms') || c.includes('blog')) return 'cms';
    if (c.includes('hospitality') || c.includes('hotel')) return 'hospitality';
    if (c.includes('ai') || c.includes('opencv') || c.includes('vision') || c.includes('detection')) return 'ai';
    if (c.includes('ecommerce') || c.includes('e-commerce') || c.includes('logistics') || c.includes('epoxy') || c.includes('resin')) return 'ecommerce';
    if (c.includes('oop') || c.includes('inventory') || c.includes('system') || c.includes('database')) return 'fintech';
    if (c.includes('advertisement') || c.includes('design')) return 'design';
    if (c.includes('agri') || c.includes('farmer') || c.includes('market') || c.includes('web') || c.includes('full-stack')) return 'mern';
    return 'mern';
  };

  const API_BASE = typeof getPortfolioApiBase === 'function'
    ? getPortfolioApiBase()
    : ((typeof window !== 'undefined' && window.location && (window.location.protocol === 'file:' || (window.location.port && window.location.port !== '5000'))) ? 'http://localhost:5000/api' : '/api');

  async function syncProjectsWithBackend() {
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (!res.ok) return;
      const projects = await res.json();
      if (!Array.isArray(projects) || projects.length === 0) return;

      const grid = document.getElementById('projects-grid');
      if (!grid) return;

      // Update in-memory quick view data
      projects.forEach((p, idx) => {
        const idKey = p._id || (idx + 1);
        const feats = Array.isArray(p.features) && p.features.length
          ? p.features
          : (Array.isArray(p.highlights) ? p.highlights.map(h => typeof h === 'object' ? h.val : h) : []);

        const projectItem = {
          title: p.title,
          category: p.category || 'Full-Stack',
          image: p.image || 'image/project-mern.jpg',
          description: p.description || '',
          githubUrl: p.githubUrl || 'https://github.com/lakibir',
          liveUrl: p.liveUrl || p.liveDemoUrl || '#contact',
          features: feats,
          highlights: Array.isArray(p.highlights) && p.highlights.length ? p.highlights : [
            { label: 'Metrics', val: p.metrics || 'Sub-40ms P99 Latency' },
            { label: 'Category', val: p.category || 'Full-Stack' },
            { label: 'Status', val: p.featured ? 'Featured System' : 'Active System' },
            { label: 'Architecture', val: 'Scalable Microservices' }
          ],
          tech: p.tags && p.tags.length ? p.tags : ['JavaScript', 'Node.js', 'MongoDB']
        };

        projectsData[idKey] = projectItem;
        projectsData[idx + 1] = projectItem;
        projectsData[String(idx + 1)] = projectItem;
      });

      // Render cards from MongoDB
      const cardsHtml = projects.map((p, idx) => {
        const idKey = p._id || (idx + 1);
        const pillCat = mapCategoryToPill(p.category);
        const tagsClean = (p.tags || []).map(t => String(t).toLowerCase().replace(/[^a-z0-9]/g, '')).join(' ');
        const tagsList = p.tags && p.tags.length ? p.tags : ['Node.js', 'MongoDB'];
        const feats = Array.isArray(p.features) && p.features.length
          ? p.features
          : (Array.isArray(p.highlights) ? p.highlights.map(h => typeof h === 'object' ? h.val : h) : []);
        const ghUrl = p.githubUrl || 'https://github.com/lakibir';
        const liveUrl = p.liveUrl || p.liveDemoUrl || '#contact';

        return `
          <article class="project-card-full" data-category="${pillCat}" data-title="${p.title.toLowerCase()}"
            data-tags="${tagsClean}" data-project-id="${idKey}" data-numeric-id="${idx + 1}">
            <div class="project-thumb-box" onclick="openProjectModal('${idKey}')">
              <img src="${p.image || 'image/project-mern.jpg'}" alt="${p.title}" class="project-thumb-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'">
              <div class="project-thumb-overlay"></div>
              <span class="thumb-tag-badge">${p.category || 'Full-Stack'}</span>
              <span class="thumb-status-badge">
                <span class="status-dot"></span> ${p.featured ? 'Featured' : 'Production Live'}
              </span>
              <button class="thumb-quick-btn" aria-label="Quick View">
                <span>Quick View</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </button>
            </div>

            <div class="project-card-body">
              <div class="project-card-header">
                <h3 class="project-card-title">${p.title}</h3>
                <p class="project-card-desc">${p.description || ''}</p>
              </div>

              ${p.metrics ? `
                <div class="project-metrics-row">
                  <span class="card-metric-pill">${p.metrics}</span>
                </div>
              ` : ''}

              ${feats.length > 0 ? `
                <div class="project-features-chips" style="display: flex; flex-wrap: wrap; gap: 6px; margin: 8px 0;">
                  ${feats.slice(0, 3).map(f => `<span class="card-feature-pill" style="font-size: 11px; padding: 3px 8px; border-radius: 6px; background: rgba(255,80,24,0.1); border: 1px solid rgba(255,80,24,0.25); color: #ff7a59; display: inline-flex; align-items: center; gap: 4px;">⚡ ${f}</span>`).join('')}
                </div>
              ` : ''}

              <div class="project-tech-tags">
                ${tagsList.slice(0, 6).map(t => `<span class="tech-tag-pill">${t}</span>`).join('')}
              </div>

              <div class="project-card-footer">
                <div style="display: flex; gap: 8px; align-items: center; flex-wrap: wrap;">
                  <a href="${liveUrl}" target="${liveUrl.startsWith('http') ? '_blank' : '_self'}" class="btn-card-primary">
                    <span>Live Demo</span>
                    <span style="font-size: 14px;">↗</span>
                  </a>
                  <a href="${ghUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-secondary" style="display: inline-flex; align-items: center; gap: 6px; text-decoration: none;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path>
                    </svg>
                    <span>GitHub Repo</span>
                  </a>
                </div>
                <button class="btn-card-details" onclick="openProjectModal('${idKey}')">View Architecture</button>
              </div>
            </div>
          </article>
        `;
      }).join('');

      // Retain the empty state container
      grid.innerHTML = cardsHtml + `
        <div class="projects-empty-state" id="empty-search-state" style="display: none;">
          <div class="empty-icon">🔍</div>
          <h3 class="empty-title">No matching projects found</h3>
          <p class="empty-desc">We couldn't find any projects matching your search criteria. Try a different search term or reset the filter.</p>
          <button class="btn-reset-filters" id="btn-reset-search">Reset Filters</button>
        </div>
      `;

      // Update counters
      const countEl = document.getElementById('projects-total-count');
      if (countEl) countEl.textContent = projects.length;

      const metricNum = document.querySelector('.pmetric-item:first-child .pmetric-num');
      if (metricNum) metricNum.textContent = `${projects.length}+`;

      // Re-query cards and re-apply filters
      projectCards = document.querySelectorAll('.project-card-full');
      emptyState = document.getElementById('empty-search-state');
      const resetBtn = document.getElementById('btn-reset-search');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          searchQuery = '';
          currentCategory = 'all';
          if (searchInput) searchInput.value = '';
          categoryFilters.forEach(b => b.classList.toggle('active', b.getAttribute('data-category') === 'all'));
          applyFilters();
        });
      }
      applyFilters();
      // If URL has target project id, resolve it with synced data
      checkUrlForProject();
    } catch (err) {
      console.warn('Backend sync for projects bypassed, keeping static preview:', err.message);
    }
  }

  async function syncCvWithBackend() {
    try {
      const res = await fetch(`${API_BASE}/cv?_t=${Date.now()}`);
      if (!res.ok) return;
      const cv = await res.json();
      if (!cv || !cv.fileUrl) return;

      const timestamp = cv.timestamp || Date.now();
      let targetUrl = cv.directUrl;
      if (!targetUrl) {
        if (cv.fileUrl.startsWith('http://') || cv.fileUrl.startsWith('https://')) {
          targetUrl = cv.fileUrl;
        } else {
          const cleanRel = cv.fileUrl.startsWith('/') ? cv.fileUrl : `/${cv.fileUrl}`;
          targetUrl = `${cleanRel}?t=${timestamp}`;
        }
      }

      // Update all Resume/CV anchor tags on projects page
      const selectors = [
        '[data-cv-link]',
        'a[href*="resume"]',
        'a[href*="lekibir-resume"]',
        'a[href="/cv"]',
        'a[href="cv"]',
        '.btn-cv-link'
      ];
      document.querySelectorAll(selectors.join(', ')).forEach(a => {
        if (a.hasAttribute('download') || (a.textContent && a.textContent.toLowerCase().includes('download'))) {
          a.href = `${API_BASE}/cv/download`;
          if (cv.fileName) a.setAttribute('download', cv.fileName);
        } else {
          a.href = targetUrl;
        }
        a.setAttribute('data-synced-cv', 'true');
      });
    } catch (err) {
      console.warn('Backend sync for CV bypassed:', err.message);
    }
  }

  // -------------------------------------------------------------
  // CARD CLICK TO SHOW PROJECT DESCRIPTION
  // -------------------------------------------------------------
  // Delegated click listener on project cards: clicking anywhere on a project card opens its description modal
  document.addEventListener('click', (e) => {
    // If clicking directly on an anchor link (Demo/GitHub) or button with its own handler, don't intercept
    if (e.target.closest('a') || e.target.closest('.thumb-quick-btn') || e.target.closest('.btn-card-details')) {
      return;
    }
    const card = e.target.closest('.project-card-full');
    if (card) {
      const pid = card.getAttribute('data-project-id') || card.getAttribute('data-numeric-id');
      if (pid && typeof window.openProjectModal === 'function') {
        e.preventDefault();
        window.openProjectModal(pid);
      }
    }
  });

  // -------------------------------------------------------------
  // URL QUERY PARSING & AUTO-OPEN PROJECT DESCRIPTION
  // -------------------------------------------------------------
  let hasAutoOpenedModal = false;

  function checkUrlForProject() {
    const params = new URLSearchParams(window.location.search);
    let targetId = params.get('id') || params.get('project');

    if (!targetId && window.location.hash) {
      const match = window.location.hash.match(/project[-_]?(\w+)/i);
      if (match) targetId = match[1];
    }

    if (!targetId) return;

    const tryOpen = () => {
      // Find card by data-project-id or data-numeric-id
      let card = document.querySelector(`.project-card-full[data-project-id="${targetId}"]`)
        || document.querySelector(`.project-card-full[data-numeric-id="${targetId}"]`);

      // If numeric targetId (e.g. 1-6), fallback to nth card if not matched by attribute
      if (!card && !isNaN(targetId)) {
        const idx = parseInt(targetId, 10) - 1;
        const allCards = document.querySelectorAll('.project-card-full');
        if (allCards && allCards[idx]) {
          card = allCards[idx];
        }
      }

      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        card.classList.add('highlight-target-card');
        setTimeout(() => card.classList.remove('highlight-target-card'), 3000);
      }

      // Check if project exists in projectsData
      let resolvedData = projectsData[targetId];
      if (!resolvedData && card) {
        const cid = card.getAttribute('data-project-id');
        if (cid && projectsData[cid]) {
          targetId = cid;
          resolvedData = projectsData[cid];
        }
      }

      if (resolvedData && typeof window.openProjectModal === 'function' && !hasAutoOpenedModal) {
        hasAutoOpenedModal = true;
        window.openProjectModal(targetId);
      }
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => setTimeout(tryOpen, 150));
    } else {
      setTimeout(tryOpen, 150);
    }
  }

  // Mobile Hamburger Menu & Scrolled Navbar Logic for projects.html
  const initNavInteractions = () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    const mobileBackdrop = document.getElementById('mobileNavBackdrop');
    const mobileDrawerClose = document.getElementById('mobileDrawerClose');
    const navbar = document.getElementById('mainNavbar') || document.querySelector('.navbar');

    if (navbar) {
      const handleNavbarScroll = () => {
        if (window.scrollY > 20) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      };
      window.addEventListener('scroll', handleNavbarScroll, { passive: true });
      handleNavbarScroll();
    }

    if (!hamburgerBtn || !mobileDrawer) return;

    const openDrawer = () => {
      mobileDrawer.classList.add('is-open');
      if (mobileBackdrop) mobileBackdrop.classList.add('is-open');
      hamburgerBtn.classList.add('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      mobileDrawer.setAttribute('aria-hidden', 'false');
      document.body.classList.add('mobile-nav-active');
    };

    const closeDrawer = () => {
      mobileDrawer.classList.remove('is-open');
      if (mobileBackdrop) mobileBackdrop.classList.remove('is-open');
      hamburgerBtn.classList.remove('is-active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('mobile-nav-active');
    };

    hamburgerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (mobileDrawer.classList.contains('is-open')) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (mobileDrawerClose) {
      mobileDrawerClose.addEventListener('click', (e) => {
        e.stopPropagation();
        closeDrawer();
      });
    }

    if (mobileBackdrop) {
      mobileBackdrop.addEventListener('click', closeDrawer);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
        closeDrawer();
      }
    });

    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-btn-cta');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });
  };

  initNavInteractions();

  // Trigger initial URL check and backend sync on load
  checkUrlForProject();
  syncProjectsWithBackend();
  syncCvWithBackend();

})();


