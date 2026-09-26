/**
 * projects.js — Interactive showcase logic for Folioblox Projects & Certifications
 */

(() => {
  // Comprehensive Project Data for Quick View Modal - Lekibir Mulatu
  const projectsData = {
    1: {
      title: "Ethio Temhert LMS Learning Management",
      category: "Full-Stack / EdTech",
      image: "image/project-lms.jpg",
      description: "An institutional e-learning portal designed for scalable academic curriculum delivery, real-time student performance tracking, online quiz assessments, and structured interactive course modules. Built with a responsive MERN stack architecture and role-based access control.",
      highlights: [
        { label: "Architecture", val: "Modular MERN Stack E-Learning Portal" },
        { label: "Features", val: "Automated Grading & Student Progress Telemetry" },
        { label: "Security", val: "JWT Authentication & Granular RBAC Permissions" },
        { label: "Integrations", val: "RESTful API Data Pipelines & Storage" }
      ],
      tech: ["React", "Node.js", "Express", "MongoDB", "RESTful APIs", "MERN Stack", "Tailwind CSS"]
    },
    2: {
      title: "Hotel Management System",
      category: "Enterprise & Systems",
      image: "image/project-mern.jpg",
      description: "An end-to-end hotel operations and hospitality management platform covering room inventory tracking, guest check-in/out pipelines, multi-channel reservation processing, and automated folio billing reconciliation with zero administrative discrepancy.",
      highlights: [
        { label: "Workflow", val: "Automated Guest Check-in/Check-out Pipelines" },
        { label: "Database", val: "Relational Schema with ACID Transaction Safety" },
        { label: "Billing", val: "Automated Folio Generation & Revenue Tracking" },
        { label: "Integrity", val: "Audit Log Trail for Operational Transparency" }
      ],
      tech: ["React", "Node.js", "MySQL", "PostgreSQL", "Express", "RESTful APIs", "JavaScript"]
    },
    3: {
      title: "Object Detection Python OpenCV",
      category: "AI & Computer Vision",
      image: "image/project-fitlife.jpg",
      description: "A high-performance visual perception application engineered using Python and OpenCV for real-time video stream processing, multi-class bounding-box classification, feature extraction, and automated telemetry alerts.",
      highlights: [
        { label: "Performance", val: "Real-Time 30+ FPS Computer Vision Inference" },
        { label: "Processing", val: "Optimized Multi-Class Object Localization" },
        { label: "Tooling", val: "NumPy Matrix Acceleration & Video Pipeline" },
        { label: "Integration", val: "Camera Telemetry & Spatial Annotation GUI" }
      ],
      tech: ["Python", "OpenCV", "Machine Learning", "AI Integration", "NumPy"]
    },
    4: {
      title: "Inventory Management System In OOP",
      category: "Backend & Systems",
      image: "image/project-student.jpg",
      description: "A robust enterprise inventory system architected with strict Object-Oriented Programming (OOP) design patterns, real-time stock level monitoring, supplier logistics tracking, and an immutable transaction audit ledger.",
      highlights: [
        { label: "Design", val: "Polymorphism, Inheritance & Encapsulated Models" },
        { label: "Auditability", val: "Complete Stock Tracking & Reorder Heuristics" },
        { label: "Scalability", val: "Modular Catalog Architecture" },
        { label: "Database", val: "Optimized Relational Schema & Indexing" }
      ],
      tech: ["Java", "C++", "OOP Principles", "MySQL", "Data Structures", "Design Patterns"]
    },
    5: {
      title: "Hotel Advertisement System",
      category: "Marketing & Web",
      image: "image/project-1.jpg",
      description: "A dynamic marketing and promotional web engine enabling hotels to showcase luxury accommodations, package deals, seasonal discounts, and drive high-conversion direct booking traffic with responsive mobile layouts and SEO optimizations.",
      highlights: [
        { label: "Conversion", val: "Engaging Visual Promotional Campaigns" },
        { label: "Design", val: "Fluid Mobile-First Responsive Layouts" },
        { label: "SEO", val: "Optimized Meta Tags & High Performance Lighthouse" },
        { label: "Analytics", val: "Click-Through Tracking & Campaign Insights" }
      ],
      tech: ["HTML5", "CSS3", "JavaScript", "React", "Digital Marketing Systems", "SEO"]
    },
    6: {
      title: "Enterprise Web Apps & Systems Automation",
      category: "Full-Stack / Systems",
      image: "image/project-equb.jpg",
      description: "Full-stack enterprise applications developed during the Mada Walabu University Computing College internship. Features secure Laravel and MERN stack implementations, PostgreSQL/MySQL database integration, network infrastructure maintenance, and custom AI-driven automation scripting.",
      highlights: [
        { label: "Security", val: "Enterprise Authentication & Database Mapping" },
        { label: "Networks", val: "TCP/IP & DNS Service Configuration" },
        { label: "Automation", val: "AI-Assisted Workflow Scripting" },
        { label: "Deployment", val: "Continuous Testing & Production SLA" }
      ],
      tech: ["Laravel", "MERN Stack", "React", "Node.js", "PostgreSQL", "Systems Administration", "AI Integration"]
    }
  };

  // DOM Elements
  const tabBtnProjects = document.getElementById('tab-btn-projects');
  const tabBtnCerts = document.getElementById('tab-btn-certs');
  const projectsView = document.getElementById('projects') || document.getElementById('projects-view-container');
  const certsView = document.getElementById('certificates') || document.getElementById('certs-view-container');
  const navProjectsLink = document.getElementById('nav-link-projects');
  const navCertsLink = document.getElementById('nav-link-certs');

  const searchInput = document.getElementById('project-search-input');
  const categoryFilters = document.querySelectorAll('.filter-pill-btn');
  const projectCards = document.querySelectorAll('.project-card-full');
  const emptyState = document.getElementById('empty-search-state');
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

  // Cert Modal Elements
  const certModal = document.getElementById('cert-modal');
  const certModalCloseBtn = document.getElementById('cert-modal-close-btn');
  const certModalName = document.getElementById('cert-modal-name');
  const certModalIssuer = document.getElementById('cert-modal-issuer');
  const certModalId = document.getElementById('cert-modal-id');
  const certModalValid = document.getElementById('cert-modal-valid');
  const certModalDesc = document.getElementById('cert-modal-desc');

  let currentCategory = 'all';
  let searchQuery = '';

  // -------------------------------------------------------------
  // MASTER TAB SWITCHER & SMOOTH SCROLL NAVIGATION
  // Both sections remain continuously visible on scroll
  // -------------------------------------------------------------
  const scrollToTarget = (targetTab, updateHash = true) => {
    if (targetTab === 'certs' || targetTab === 'certificates' || targetTab === 'certs-view') {
      tabBtnCerts?.classList.add('active');
      tabBtnCerts?.setAttribute('aria-selected', 'true');
      tabBtnProjects?.classList.remove('active');
      tabBtnProjects?.setAttribute('aria-selected', 'false');

      if (navCertsLink) navCertsLink.classList.add('active');
      if (navProjectsLink) navProjectsLink.classList.remove('active');

      if (certsView) {
        certsView.scrollIntoView({ behavior: 'smooth' });
      }

      if (updateHash) {
        history.replaceState(null, '', '#certificates');
      }
    } else {
      tabBtnProjects?.classList.add('active');
      tabBtnProjects?.setAttribute('aria-selected', 'true');
      tabBtnCerts?.classList.remove('active');
      tabBtnCerts?.setAttribute('aria-selected', 'false');

      if (navProjectsLink) navProjectsLink.classList.add('active');
      if (navCertsLink) navCertsLink.classList.remove('active');

      if (projectsView) {
        projectsView.scrollIntoView({ behavior: 'smooth' });
      }

      if (updateHash) {
        history.replaceState(null, '', '#projects');
      }
    }
  };

  if (tabBtnProjects) {
    tabBtnProjects.addEventListener('click', () => scrollToTarget('projects'));
  }

  if (tabBtnCerts) {
    tabBtnCerts.addEventListener('click', () => scrollToTarget('certs'));
  }

  if (navCertsLink) {
    navCertsLink.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTarget('certs');
    });
  }

  if (navProjectsLink) {
    navProjectsLink.addEventListener('click', (e) => {
      e.preventDefault();
      scrollToTarget('projects');
    });
  }

  // Scroll Spy: Keep active tab button highlighted based on scroll position
  const onPageScroll = () => {
    if (!certsView) return;
    const certsRect = certsView.getBoundingClientRect();
    if (certsRect.top <= 260) {
      tabBtnCerts?.classList.add('active');
      tabBtnCerts?.setAttribute('aria-selected', 'true');
      tabBtnProjects?.classList.remove('active');
      tabBtnProjects?.setAttribute('aria-selected', 'false');
      if (navCertsLink) navCertsLink.classList.add('active');
      if (navProjectsLink) navProjectsLink.classList.remove('active');
    } else {
      tabBtnProjects?.classList.add('active');
      tabBtnProjects?.setAttribute('aria-selected', 'true');
      tabBtnCerts?.classList.remove('active');
      tabBtnCerts?.setAttribute('aria-selected', 'false');
      if (navProjectsLink) navProjectsLink.classList.add('active');
      if (navCertsLink) navCertsLink.classList.remove('active');
    }
  };

  window.addEventListener('scroll', onPageScroll, { passive: true });

  // Handle URL hash on load (#certificates vs #projects)
  const handleHashChange = () => {
    const hash = window.location.hash.toLowerCase();
    if (hash === '#certificates' || hash === '#certs') {
      setTimeout(() => scrollToTarget('certs', false), 150);
    }
  };

  window.addEventListener('hashchange', handleHashChange);
  handleHashChange();

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
    modalHighlights.innerHTML = data.highlights.map(hl => `
      <div class="modal-hl-item">
        <span class="modal-hl-title">${hl.label}</span>
        <span class="modal-hl-val">${hl.val}</span>
      </div>
    `).join('');

    // Tech stack
    modalTechList.innerHTML = `
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        ${data.tech.map(t => `<span class="tech-tag-pill">${t}</span>`).join('')}
      </div>
    `;

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

  // -------------------------------------------------------------
  // CREDENTIAL VERIFICATION MODAL
  // -------------------------------------------------------------
  const certModalDocBtn = document.getElementById('cert-modal-doc-link');

  window.openCertModal = (name, issuer, id, valid, desc, docLink) => {
    if (!certModal) return;
    certModalName.textContent = name;
    certModalIssuer.textContent = issuer;
    certModalId.textContent = id;
    certModalValid.textContent = valid;
    certModalDesc.textContent = desc;

    if (certModalDocBtn) {
      if (docLink && docLink.trim() !== '') {
        certModalDocBtn.href = docLink;
        certModalDocBtn.style.display = 'inline-flex';
      } else {
        certModalDocBtn.style.display = 'none';
      }
    }

    certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  window.closeCertModal = () => {
    if (!certModal) return;
    certModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (certModalCloseBtn) {
    certModalCloseBtn.addEventListener('click', window.closeCertModal);
  }

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        window.closeCertModal();
      }
    });
  }

  // Escape key to close any active modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      window.closeCertModal();
    }
  });

  // -------------------------------------------------------------
  // DYNAMIC MONGODB BACKEND SYNCHRONIZATION
  // -------------------------------------------------------------
  const mapCategoryToPill = (cat = '') => {
    const c = cat.toLowerCase();
    if (c.includes('edtech') || c.includes('lms') || c.includes('learning')) return 'edtech';
    if (c.includes('ai') || c.includes('opencv') || c.includes('vision') || c.includes('detection')) return 'ai';
    if (c.includes('oop') || c.includes('inventory') || c.includes('hotel') || c.includes('system') || c.includes('database')) return 'fintech';
    if (c.includes('market') || c.includes('advertisement') || c.includes('design')) return 'design';
    return 'mern';
  };

  async function syncProjectsWithBackend() {
    try {
      const res = await fetch('/api/projects');
      if (!res.ok) return;
      const projects = await res.json();
      if (!Array.isArray(projects) || projects.length === 0) return;

      const grid = document.getElementById('projects-grid');
      if (!grid) return;

      // Update in-memory quick view data
      projects.forEach((p, idx) => {
        const idKey = p._id || (idx + 1);
        projectsData[idKey] = {
          title: p.title,
          category: p.category || 'Full-Stack',
          image: p.image || 'image/project-mern.jpg',
          description: p.description || '',
          highlights: [
            { label: 'Metrics', val: p.metrics || 'Sub-40ms P99 Latency' },
            { label: 'Category', val: p.category || 'Full-Stack' },
            { label: 'Status', val: p.featured ? 'Featured System' : 'Active System' },
            { label: 'Architecture', val: 'Scalable Microservices' }
          ],
          tech: p.tags && p.tags.length ? p.tags : ['JavaScript', 'Node.js', 'MongoDB']
        };
      });

      // Render cards from MongoDB
      const cardsHtml = projects.map((p, idx) => {
        const idKey = p._id || (idx + 1);
        const pillCat = mapCategoryToPill(p.category);
        const tagsClean = (p.tags || []).map(t => String(t).toLowerCase().replace(/[^a-z0-9]/g, '')).join(' ');
        const tagsList = p.tags && p.tags.length ? p.tags : ['Node.js', 'MongoDB'];

        return `
          <article class="project-card-full" data-category="${pillCat}" data-title="${p.title.toLowerCase()}"
            data-tags="${tagsClean}" data-project-id="${idKey}">
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

              <div class="project-tech-tags">
                ${tagsList.slice(0, 6).map(t => `<span class="tech-tag-pill">${t}</span>`).join('')}
              </div>

              <div class="project-card-footer">
                <div style="display: flex; gap: 10px; align-items: center;">
                  <a href="${p.liveUrl || '#contact'}" target="${p.liveUrl && p.liveUrl.startsWith('http') ? '_blank' : '_self'}" class="btn-card-primary">
                    <span>Live Demo</span>
                    <span style="font-size: 14px;">↗</span>
                  </a>
                  ${p.githubUrl ? `
                    <a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" class="btn-card-secondary">
                      <span>GitHub</span>
                    </a>
                  ` : ''}
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
    } catch (err) {
      console.warn('Backend sync for projects bypassed, keeping static preview:', err.message);
    }
  }

  async function syncCertificatesWithBackend() {
    try {
      const res = await fetch('/api/certificates');
      if (!res.ok) return;
      const certs = await res.json();
      if (!Array.isArray(certs) || certs.length === 0) return;

      const certGrid = document.querySelector('.cert-showcase-grid');
      if (!certGrid) return;

      const certsHtml = certs.map(c => {
        const icon = c.title.includes('Degree') ? '🎓' : c.title.includes('English') ? '📜' : c.title.includes('Full') ? '💻' : c.title.includes('AI') ? '⚡' : c.title.includes('Food') ? '🌱' : c.title.includes('Angular') ? '🅰️' : '🚀';
        return `
        <div class="cert-card-enhanced">
          <div class="cert-card-top">
            <div class="cert-logo-wrap" style="background: rgba(255, 107, 0, 0.15); font-size: 20px; display: flex; align-items: center; justify-content: center;">
              ${icon}
            </div>
            <span class="cert-status-badge">
              <span class="status-dot"></span> Verified
            </span>
          </div>

          <div class="cert-info">
            <h3 class="cert-name">${c.title}</h3>
            <p class="cert-issuer">${c.issuer}</p>
            <div class="cert-meta-row">
              <span class="cert-meta-tag">Issued: ${c.year || c.issueDate || '2026'}</span>
              <span class="cert-meta-tag">ID: ${c.credentialId || 'VERIFIED'}</span>
            </div>
          </div>

          <div class="cert-skills-tags">
            ${(c.skills || []).map(s => `<span class="skill-pill">${s}</span>`).join('')}
          </div>

          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="cert-verify-btn" style="flex: 1;" onclick="openCertModal('${c.title.replace(/'/g, "\\'")}', '${c.issuer.replace(/'/g, "\\'")}', '${(c.credentialId || 'VERIFIED').replace(/'/g, "\\'")}', '${(c.validUntil || '2026 - Perpetual').replace(/'/g, "\\'")}', '${(c.description || 'Verified Technical Credential').replace(/'/g, "\\'")}', '${(c.link || '').replace(/'/g, "\\'")}')">
              <span>View Credential Details</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
            ${c.link ? `<a href="${c.link}" target="_blank" class="cert-verify-btn" style="background: rgba(255,107,0,0.15); border-color: rgba(255,107,0,0.4); color: var(--color-orange); text-decoration: none; padding: 10px 14px; border-radius: 8px; font-size: 13px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px;"><span>View Scan</span> ↗</a>` : ''}
          </div>
        </div>
      `;
      }).join('');

      certGrid.innerHTML = certsHtml;

      // Update badge counts
      const certBadge = document.querySelector('#tab-btn-certs .tab-badge-count');
      if (certBadge) certBadge.textContent = certs.length;

      const certMetric = document.querySelector('.pmetric-item:nth-child(3) .pmetric-num');
      if (certMetric) certMetric.textContent = certs.length;
    } catch (err) {
      console.warn('Backend sync for certificates bypassed, keeping static preview:', err.message);
    }
  }

  // Trigger Backend Sync on load
  syncProjectsWithBackend();
  syncCertificatesWithBackend();

})();

