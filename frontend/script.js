// ==========================================================================
// BACKGROUND CANVAS SCROLL ANIMATION (425-FRAME SEQUENCE)
// ==========================================================================
(() => {
  const canvas = document.getElementById('animation-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const FRAME_COUNT = 425;
  const images = new Array(FRAME_COUNT);
  const loaded = new Array(FRAME_COUNT).fill(false);

  // Pad frame numbers to 3 digits (ezgif-frame-001.jpg ... ezgif-frame-425.jpg)
  const getFrameSrc = (index) => {
    const num = String(index + 1).padStart(3, '0');
    return `image/ezgif-frame-${num}.jpg`;
  };

  // State
  let targetFrame = 0;
  let currentFrame = 0;
  let lastDrawnActualIndex = -1;
  const lerpFactor = 0.12; // Smooth scrolling inertia

  // Resize canvas according to display resolution and device pixel ratio
  const resizeCanvas = () => {
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    lastDrawnActualIndex = -1; // Force repaint on resize
    renderCurrentFrame();
  };

  // Find best available image (exact or nearest loaded neighbor)
  const getBestImage = (desiredIndex) => {
    if (loaded[desiredIndex] && images[desiredIndex]) {
      return { img: images[desiredIndex], actualIndex: desiredIndex };
    }

    for (let offset = 1; offset < FRAME_COUNT; offset++) {
      const prev = desiredIndex - offset;
      if (prev >= 0 && loaded[prev] && images[prev]) {
        return { img: images[prev], actualIndex: prev };
      }
      const next = desiredIndex + offset;
      if (next < FRAME_COUNT && loaded[next] && images[next]) {
        return { img: images[next], actualIndex: next };
      }
    }

    return null;
  };

  // Draw image on canvas preserving aspect ratio (cover mode: full page edge-to-edge)
  const drawImageToCanvas = (img) => {
    if (!img || !img.naturalWidth) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    const imgRatio = iw / ih;
    const canvasRatio = cw / ch;

    let drawWidth, drawHeight, dx, dy;

    if (canvasRatio > imgRatio) {
      drawWidth = cw;
      drawHeight = cw / imgRatio;
      dx = 0;
      dy = (ch - drawHeight) / 2;
    } else {
      drawHeight = ch;
      drawWidth = ch * imgRatio;
      dx = (cw - drawWidth) / 2;
      dy = 0;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, drawWidth, drawHeight);
  };

  const renderCurrentFrame = () => {
    const rounded = Math.round(currentFrame);
    const best = getBestImage(rounded);

    if (best && best.actualIndex !== lastDrawnActualIndex) {
      drawImageToCanvas(best.img);
      lastDrawnActualIndex = best.actualIndex;
    }
  };

  // Preload single image
  const loadImage = (index) => {
    if (images[index]) return;

    const img = new Image();
    images[index] = img;

    img.onload = () => {
      loaded[index] = true;
      const currentRounded = Math.round(currentFrame);
      if (lastDrawnActualIndex !== currentRounded && Math.abs(index - currentRounded) < Math.abs(lastDrawnActualIndex - currentRounded)) {
        renderCurrentFrame();
      }
    };

    img.src = getFrameSrc(index);
  };

  // Priority preloading strategy
  const startPreloading = () => {
    loadImage(0);
    const step = 10;
    for (let i = step; i < FRAME_COUNT; i += step) {
      loadImage(i);
    }
    for (let i = 1; i < FRAME_COUNT; i++) {
      if (i % step !== 0) {
        loadImage(i);
      }
    }
  };

  // Update scroll target frame based on page scroll position
  const onScroll = () => {
    const doc = document.documentElement;
    const scrollY = window.pageYOffset || doc.scrollTop || document.body.scrollTop || 0;
    const maxScroll = doc.scrollHeight - window.innerHeight;

    if (maxScroll <= 0) {
      targetFrame = 0;
      return;
    }

    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    targetFrame = progress * (FRAME_COUNT - 1);
  };

  const animate = () => {
    currentFrame += (targetFrame - currentFrame) * lerpFactor;
    renderCurrentFrame();
    requestAnimationFrame(animate);
  };

  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('scroll', onScroll, { passive: true });
  resizeCanvas();
  onScroll();
  startPreloading();
  requestAnimationFrame(animate);
})();

// ==========================================================================
// 3D ARC CARD DECK SHOWCASE (PREMIUM VIBECODING ERA UI)
// ==========================================================================
let fanDeckController = null;

(() => {
  function init3DFanDeck() {
    const stage = document.getElementById('fanDeckStage');
    const track = document.getElementById('fanDeckTrack');
    const prevBtn = document.getElementById('fanPrevBtn');
    const nextBtn = document.getElementById('fanNextBtn');
    const dotsContainer = document.getElementById('fanPaginationDots');
    const spotlightBar = document.getElementById('fanSpotlightBar');

    if (!stage || !track) return null;

    let cards = Array.from(track.querySelectorAll('.fan-card'));
    let totalCards = cards.length;
    let targetProgress = 0;
    let currentProgress = 0;
    let activeCardIndex = 0;
    const lerpSpeed = 0.12;
    let hasDraggedDistance = false;

    // Build or update pagination dots
    function renderDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.className = `fan-dot ${i === activeCardIndex ? 'is-active' : ''}`;
        dot.setAttribute('data-idx', i);
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          targetProgress = i;
        });
        dotsContainer.appendChild(dot);
      }
    }

    // Update active spotlight info bar
    function updateSpotlight(index) {
      if (index === activeCardIndex && spotlightBar.dataset.init) return;
      spotlightBar.dataset.init = 'true';
      activeCardIndex = index;

      const activeCard = cards[index];
      if (!activeCard) return;

      const title = activeCard.dataset.title || 'Featured Architecture';
      const category = activeCard.dataset.category || 'System Engineering';
      const desc = activeCard.dataset.desc || '';
      const gh = activeCard.dataset.gh || 'https://github.com/lakibir';

      const activeNumEl = document.getElementById('fanActiveNum');
      const totalNumEl = document.getElementById('fanTotalNum');
      const catEl = document.getElementById('fanSpotlightCat');
      const titleEl = document.getElementById('fanSpotlightTitle');
      const descEl = document.getElementById('fanSpotlightDesc');
      const ghEl = document.getElementById('fanSpotlightGh');
      const exploreBtn = document.getElementById('fanSpotlightExplore');

      if (activeNumEl) activeNumEl.textContent = String(index + 1).padStart(2, '0');
      if (totalNumEl) totalNumEl.textContent = String(totalCards).padStart(2, '0');
      if (catEl) catEl.textContent = category;
      if (titleEl) titleEl.textContent = title;
      if (descEl) descEl.textContent = desc;
      if (ghEl) ghEl.href = gh;
      if (exploreBtn) exploreBtn.href = `projects.html?id=${index + 1}`;

      // Update dots
      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.fan-dot');
        dots.forEach((dot, dIdx) => {
          dot.classList.toggle('is-active', dIdx === index);
        });
      }
    }

    // Attach card click handlers
    function bindCardClicks() {
      cards.forEach((card, idx) => {
        card.style.cursor = 'pointer';
        card.onclick = (e) => {
          if (hasDraggedDistance) return;
          e.preventDefault();
          targetProgress = idx;
          activeCardIndex = idx;
          updateSpotlight(idx);

          // Redirect to the project description in projects.html
          window.location.href = `projects.html?id=${idx + 1}`;
        };
      });

      // Also make the spotlight description clickable to redirect
      const spotlightInfo = document.querySelector('.fan-spotlight-info');
      if (spotlightInfo) {
        spotlightInfo.style.cursor = 'pointer';
        spotlightInfo.title = 'Click to view full project architecture & details';
        spotlightInfo.onclick = (e) => {
          e.preventDefault();
          window.location.href = `projects.html?id=${activeCardIndex + 1}`;
        };
      }
    }

    // Parabolic 3D Arc calculation
    function updatePositions(prog) {
      cards.forEach((card, idx) => {
        const offset = idx - prog;

        // Curved 3D Arc math:
        // x: horizontal distribution
        // y: downward parabolic drop
        // z: depth away from viewer
        // rotateY: perspective yaw turning toward center
        // rotateZ: subtle fan roll
        const x = offset * 185;
        const y = Math.pow(offset, 2) * 20;
        const z = -Math.abs(offset) * 80;
        const rotateY = -offset * 13;
        const rotateZ = offset * 5.5;
        const scale = Math.max(0.68, 1 - Math.abs(offset) * 0.08);
        const opacity = Math.max(0.2, 1 - Math.abs(offset) * 0.22);
        const zIndex = 100 - Math.round(Math.abs(offset) * 10);

        card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotateY.toFixed(1)}deg) rotateZ(${rotateZ.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        card.style.opacity = Math.abs(offset) > 3.8 ? '0' : opacity.toFixed(3);
        card.style.zIndex = zIndex;
        card.style.pointerEvents = Math.abs(offset) > 3.8 ? 'none' : 'auto';

        if (Math.abs(offset) < 0.5) {
          card.classList.add('is-active');
        } else {
          card.classList.remove('is-active');
        }
      });

      const nearestIdx = Math.min(Math.max(Math.round(prog), 0), totalCards - 1);
      updateSpotlight(nearestIdx);
    }

    // 1. Scroll-Driven Animation
    let isUserInteracting = false;
    let interactionTimeout = null;

    const onWindowScroll = () => {
      if (isUserInteracting) return;
      const section = document.getElementById('projects');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const winH = window.innerHeight;

      // Active range: when section top reaches 75% of viewport to when section bottom passes 25% of viewport
      const totalTravel = section.offsetHeight + winH * 0.4;
      const currentTravel = (winH * 0.75) - rect.top;

      if (currentTravel >= 0 && currentTravel <= totalTravel) {
        const ratio = Math.min(Math.max(currentTravel / totalTravel, 0), 1);
        targetProgress = ratio * (totalCards - 1);
      }
    };
    window.addEventListener('scroll', onWindowScroll, { passive: true });

    // 2. Mouse Wheel Navigation on stage
    let wheelTimeout = null;
    stage.addEventListener('wheel', (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 15) {
        isUserInteracting = true;
        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => { isUserInteracting = false; }, 1200);

        const dir = delta > 0 ? 1 : -1;
        targetProgress = Math.min(Math.max(targetProgress + dir * 0.4, 0), totalCards - 1);

        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
          targetProgress = Math.round(targetProgress);
        }, 150);
      }
    }, { passive: true });

    // 3. Pointer Drag / Touch Swipe Navigation
    let isPointerDown = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartProgress = 0;

    stage.addEventListener('pointerdown', (e) => {
      // Don't drag if clicking buttons or pagination dots
      if (e.target.closest('.fan-arrow-btn') || e.target.closest('.fan-dot')) return;
      isPointerDown = true;
      hasDraggedDistance = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      dragStartProgress = currentProgress;
    });

    stage.addEventListener('pointermove', (e) => {
      if (!isPointerDown) return;
      const diffX = e.clientX - dragStartX;
      const diffY = e.clientY - dragStartY;
      if (!hasDraggedDistance && (Math.abs(diffX) > 8 || Math.abs(diffY) > 8)) {
        hasDraggedDistance = true;
        isUserInteracting = true;
        try {
          stage.setPointerCapture(e.pointerId);
        } catch (err) { }
      }
      if (hasDraggedDistance) {
        targetProgress = Math.min(Math.max(dragStartProgress - (diffX / 220), 0), totalCards - 1);
      }
    });

    const finishDrag = (e) => {
      if (!isPointerDown) return;
      isPointerDown = false;
      if (hasDraggedDistance) {
        targetProgress = Math.round(targetProgress);
        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => { isUserInteracting = false; }, 1200);
        try {
          if (e && e.pointerId && stage.hasPointerCapture(e.pointerId)) {
            stage.releasePointerCapture(e.pointerId);
          }
        } catch (err) { }
        setTimeout(() => {
          hasDraggedDistance = false;
        }, 100);
      }
    };

    stage.addEventListener('pointerup', finishDrag);
    stage.addEventListener('pointercancel', finishDrag);

    // 4. Arrow Navigation
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isUserInteracting = true;
        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => { isUserInteracting = false; }, 1500);
        targetProgress = Math.max(0, Math.round(targetProgress) - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isUserInteracting = true;
        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => { isUserInteracting = false; }, 1500);
        targetProgress = Math.min(totalCards - 1, Math.round(targetProgress) + 1);
      });
    }

    // 5. 60 FPS Spring / Lerp Animation Loop
    let animId = null;
    function animate() {
      currentProgress += (targetProgress - currentProgress) * lerpSpeed;
      updatePositions(currentProgress);
      animId = requestAnimationFrame(animate);
    }

    // Init
    renderDots();
    bindCardClicks();
    onWindowScroll();
    animate();

    return {
      setProjects: (newProjects) => {
        if (!Array.isArray(newProjects) || newProjects.length === 0) return;
        track.innerHTML = newProjects.map((p, idx) => {
          const title = p.title || 'Flagship Architecture';
          const cat = p.category || 'System';
          const desc = p.description || p.subtitle || '';
          const gh = p.githubUrl || 'https://github.com/lakibir';
          const img = p.image || 'image/project-lms.jpg';
          const tags = (p.techStack && p.techStack.length ? p.techStack : (p.tags || ['Systems', 'Full-Stack'])).slice(0, 3);
          const metricPill = p.metrics ? p.metrics.split('•')[0].trim() : 'Live System';

          return `
            <div class="fan-card" data-index="${idx}" data-title="${escapeHtml(title)}" data-category="${escapeHtml(cat)}" data-desc="${escapeHtml(desc)}" data-gh="${escapeHtml(gh)}">
              <div class="fan-card-inner">
                <div class="fan-card-image-wrap">
                  <img src="${escapeHtml(img)}" alt="${escapeHtml(title)}" class="fan-card-img" onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'">
                  <div class="fan-card-glass-shine"></div>
                  <div class="fan-card-top-bar">
                    <span class="fan-category-pill">${escapeHtml(cat)}</span>
                    <span class="fan-live-indicator"><span class="fan-pulse-dot"></span> ${escapeHtml(metricPill)}</span>
                  </div>
                </div>
                <div class="fan-card-content">
                  <h3 class="fan-card-title">${escapeHtml(title)}</h3>
                  <div class="fan-card-quick-meta">
                    ${tags.map(t => `<span class="fan-tech-tag">${escapeHtml(t)}</span>`).join('')}
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join('');

        cards = Array.from(track.querySelectorAll('.fan-card'));
        totalCards = cards.length;
        targetProgress = Math.min(targetProgress, totalCards - 1);
        renderDots();
        bindCardClicks();
        updatePositions(currentProgress);
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      fanDeckController = init3DFanDeck();
    });
  } else {
    fanDeckController = init3DFanDeck();
  }
})();

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// ==========================================================================
// 3D ARC CERTIFICATES & CREDENTIALS CONTROLLER
// ==========================================================================
let certsFanController = null;

// ==========================================================================
// CERTIFICATE DOSSIER DATABASE & SMART RESOLVER
// ==========================================================================
const CERT_DOSSIER_DATABASE = {
  degree: {
    title: 'Bachelor of Science in Computer Science (B.Sc.)',
    shortTitle: 'B.Sc. in Computer Science',
    issuer: 'Wollo University • Kombolcha Institute of Technology',
    badge: 'VERIFIED DEGREE ACCREDITATION',
    credentialId: 'WU-KIOT-2026-CS',
    dateConferred: 'March 15, 2026',
    validity: 'Permanent Degree Award',
    status: 'Formally Conferred & Verified',
    honors: 'Honors Degree: 3.25 CGPA • National Exit Exam 55',
    recipient: 'Lekibir Mulatu',
    docUrl: 'image/credentials/degree-certificate.jpg',
    filename: 'lekibir-mulatu-bsc-computer-science-degree.jpg',
    description: 'Conferred Bachelor of Science Degree in Computer Science with a Cumulative GPA of 3.25/4.0 from Kombolcha Institute of Technology, Wollo University. Completed intensive four-year coursework in software engineering, algorithm design, relational & distributed database architectures, operating systems, and network infrastructure.',
    skills: ['Computer Science', 'Algorithms & Data Structures', 'Software Engineering', 'Database Systems', 'Operating Systems', 'Distributed Networks']
  },
  english: {
    title: 'English Language Proficiency Certification',
    shortTitle: 'English Language Proficiency',
    issuer: 'Wollo University Registrar Office',
    badge: 'OFFICIAL REGISTRAR CERTIFICATION',
    credentialId: 'Ref: KIOTR/0690/18',
    dateConferred: 'March 26, 2026',
    validity: 'Permanent University Record',
    status: 'Certified by Associate Registrar',
    honors: 'Medium of Instruction: English (Proclamation No. 650/2009)',
    recipient: 'Lekibir Mulatu',
    docUrl: 'image/credentials/english-proficiency.jpg',
    filename: 'lekibir-mulatu-english-proficiency-certification.jpg',
    description: 'Official university certification issued by Associate Registrar Mr. Wubshet Girma certifying that English was the sole medium of instruction across all four years of B.Sc. studies per Higher Education Proclamation No. 650/2009.',
    skills: ['English Medium of Instruction', 'Technical Writing', 'Academic Communication', 'Engineering Documentation', 'Oral Defense']
  },
  cursa: {
    title: 'Full Stack Web Development Training',
    shortTitle: 'Full Stack Web Development',
    issuer: 'Cursa Platform • WB Web Development',
    badge: 'CERTIFIED DEVELOPER SPECIALIZATION',
    credentialId: 'CURSA-u7987959',
    dateConferred: '2026',
    validity: 'Perpetual Professional Certification',
    status: 'Verified Developer Credential',
    honors: '26h 10m Accredited Coursework',
    recipient: 'Lekibir Mulatu Haile',
    docUrl: 'image/credentials/cursa-fullstack-certificate.jpg',
    filename: 'lekibir-mulatu-cursa-fullstack-certificate.jpg',
    description: 'Comprehensive 26-hour training curriculum covering modern full-stack web applications, REST API development, component lifecycle, MongoDB database schemas, Node.js backend services, and reactive UI architecture.',
    skills: ['Full-Stack Web Development', 'JavaScript (ES6+)', 'React.js', 'Node.js & Express', 'MongoDB & MERN', 'RESTful APIs']
  },
  wrench: {
    title: 'Build Websites That AI Can Read, Rank & Recommend',
    shortTitle: 'AI-Optimized Web Development',
    issuer: 'Wrench Wise Applied Engineering',
    badge: 'APPLIED AI WORKSHOP CERTIFICATION',
    credentialId: 'WW-WW002-2026',
    dateConferred: '2026',
    validity: 'Perpetual Engineering Credential',
    status: 'Certificate of Mastery',
    honors: 'Applied Generative AI in Production Web Systems',
    recipient: 'Lekibir Mulatu Haile',
    docUrl: 'image/credentials/wrench-wise-certificate.jpg',
    filename: 'lekibir-mulatu-wrench-wise-ai-certificate.jpg',
    description: 'Hands-on engineering workshop focused on leveraging artificial intelligence integration, LLM tooling, prompt engineering, semantic schemas, and custom automation scripts to build websites optimized for AI indexing, search discovery, and automated workflows.',
    skills: ['AI Integration', 'Prompt Engineering', 'Workflow Automation', 'Semantic Web Architecture', 'LLM Tooling', 'Web Acceleration']
  },
  food: {
    title: 'Food Systems Innovation Challenge 2026',
    shortTitle: 'Food Systems Challenge 2026',
    issuer: 'Wageningen University & Research • Netherlands Food Partnership',
    badge: 'GLOBAL INNOVATION CHALLENGE AWARD',
    credentialId: 'WUR-NFP-2026-FLS',
    dateConferred: '2026',
    validity: 'Honors & Global Innovation Recognition',
    status: 'International Challenge Finalist',
    honors: 'Nature-based Solutions Finalist • Team Fresh Life Solutions',
    recipient: 'Lekibre Mulatu',
    docUrl: 'image/credentials/food-systems-challenge.jpg',
    filename: 'lekibir-mulatu-food-systems-challenge-certificate.jpg',
    description: 'International technical innovation challenge organized by Wageningen University & Research (WUR) and the Netherlands Food Partnership (NFP), focused on engineering resilient, scalable technology-driven data solutions and logistical management for sustainable food systems.',
    skills: ['Systems Innovation', 'AgriTech & Data Systems', 'Collaborative Engineering', 'Systems Architecture', 'International Hackathon']
  },
  techno: {
    title: 'Technology & Innovation (Techno) Club',
    shortTitle: 'Technology & Innovation Club',
    issuer: 'Techno Club • Wollo University (Kombolcha Institute of Tech)',
    badge: 'COMMUNITY LEADERSHIP CERTIFICATION',
    credentialId: 'WU-TECHNO-2024',
    dateConferred: 'October 26, 2024',
    validity: 'Active Alumni Network',
    status: 'Honored Technical Contributor',
    honors: 'Technical Leadership & Campus Coding Community Member',
    recipient: 'Lekibir Mulatu Haile',
    docUrl: 'image/credentials/techno-club-certificate.jpg',
    filename: 'lekibir-mulatu-techno-club-certificate.jpg',
    description: 'Formal recognition for active technical contribution and leadership in university innovation showcases, student coding workshops, hackathons, and technology mentorship initiatives at Wollo University.',
    skills: ['Technical Leadership', 'Peer Mentorship', 'Hackathon Organization', 'Community Software Projects', 'Full-Stack Development']
  }
};

function resolveCertificateDocUrl(certOrDoc, title, issuer, badge) {
  let rawUrl = '';
  let fullTitle = title || '';
  let fullIssuer = issuer || '';
  let fullBadge = badge || '';

  if (typeof certOrDoc === 'string') {
    rawUrl = certOrDoc.trim();
  } else if (certOrDoc && typeof certOrDoc === 'object') {
    rawUrl = (certOrDoc.fileUrl || certOrDoc.image || certOrDoc.verifyUrl || certOrDoc.link || '').trim();
    if (!fullTitle) fullTitle = certOrDoc.title || '';
    if (!fullIssuer) fullIssuer = certOrDoc.issuer || '';
    if (!fullBadge) fullBadge = certOrDoc.badge || '';
  }

  if (rawUrl && rawUrl.match(/\.(jpg|jpeg|png|webp|svg)(\?.*)?$/i)) {
    return rawUrl;
  }

  const text = `${fullTitle} ${fullIssuer} ${fullBadge} ${rawUrl}`.toLowerCase();
  if (text.includes('english') || text.includes('proficiency') || text.includes('kiotr') || text.includes('wubshet')) {
    return CERT_DOSSIER_DATABASE.english.docUrl;
  }
  if (text.includes('hussien') || text.includes('chair')) {
    return 'image/credentials/recommendation-hussien.jpg';
  }
  if (text.includes('kasahun') || text.includes('asbo')) {
    return 'image/credentials/recommendation-kasahun.jpg';
  }
  if (text.includes('mohammed') || text.includes('oumer') || text.includes('omer')) {
    return 'image/credentials/recommendation-mohammed.jpg';
  }
  if (text.includes('cursa') || text.includes('full stack') || text.includes('mern') || text.includes('u7987959')) {
    return CERT_DOSSIER_DATABASE.cursa.docUrl;
  }
  if (text.includes('wrench') || text.includes('ai-optimized') || text.includes('ww002') || text.includes('rank & recommend')) {
    return CERT_DOSSIER_DATABASE.wrench.docUrl;
  }
  if (text.includes('wageningen') || text.includes('food systems') || text.includes('fresh life') || text.includes('wur')) {
    return CERT_DOSSIER_DATABASE.food.docUrl;
  }
  if (text.includes('techno') || text.includes('active membership') || text.includes('october 26')) {
    return CERT_DOSSIER_DATABASE.techno.docUrl;
  }
  return CERT_DOSSIER_DATABASE.degree.docUrl;
}

function getCertificateDossier(docUrl, title, issuer, badge, extraObj) {
  const text = `${title || ''} ${issuer || ''} ${badge || ''} ${docUrl || ''}`.toLowerCase();
  let key = 'degree';
  if (text.includes('english') || text.includes('proficiency') || text.includes('kiotr') || text.includes('wubshet')) {
    key = 'english';
  } else if (text.includes('cursa') || text.includes('full stack') || text.includes('mern') || text.includes('u7987959')) {
    key = 'cursa';
  } else if (text.includes('wrench') || text.includes('ai-optimized') || text.includes('ww002') || text.includes('rank & recommend')) {
    key = 'wrench';
  } else if (text.includes('wageningen') || text.includes('food systems') || text.includes('fresh life') || text.includes('wur')) {
    key = 'food';
  } else if (text.includes('techno') || text.includes('active membership') || text.includes('october 26')) {
    key = 'techno';
  } else if (text.includes('degree') || text.includes('bachelor') || text.includes('computer science') || text.includes('wollo')) {
    key = 'degree';
  }

  const base = CERT_DOSSIER_DATABASE[key] || CERT_DOSSIER_DATABASE.degree;
  const result = { ...base };

  if (extraObj && typeof extraObj === 'object') {
    if (extraObj.credentialId) result.credentialId = extraObj.credentialId;
    if (extraObj.issueYear) result.dateConferred = extraObj.issueYear;
    if (extraObj.validUntil) result.validity = extraObj.validUntil;
    if (extraObj.status) result.status = extraObj.status;
    if (extraObj.description) result.description = extraObj.description;
    if (Array.isArray(extraObj.skillsTags) && extraObj.skillsTags.length > 0) result.skills = extraObj.skillsTags;
  }

  if (title) result.title = title;
  if (issuer) result.issuer = issuer;
  if (docUrl) result.docUrl = resolveCertificateDocUrl(docUrl, title, issuer, badge);
  return result;
}

// Interactive Zoom, Pan & Viewer State
let certViewerState = {
  zoom: 1.0,
  rotate: 0,
  panX: 0,
  panY: 0,
  isDragging: false,
  dragStartX: 0,
  dragStartY: 0,
  initialPanX: 0,
  initialPanY: 0
};

function applyCertCanvasTransform() {
  const wrapper = document.getElementById('certTransformWrapper');
  const zoomDisplay = document.getElementById('certZoomLevel');
  if (wrapper) {
    wrapper.style.transform = `translate(${certViewerState.panX}px, ${certViewerState.panY}px) scale(${certViewerState.zoom}) rotate(${certViewerState.rotate}deg)`;
  }
  if (zoomDisplay) {
    zoomDisplay.textContent = `${Math.round(certViewerState.zoom * 100)}%`;
  }
}

function resetCertCanvasTransform() {
  certViewerState.zoom = 1.0;
  certViewerState.rotate = 0;
  certViewerState.panX = 0;
  certViewerState.panY = 0;
  applyCertCanvasTransform();
}

function showCertToast(message) {
  const toast = document.getElementById('certToast');
  const msgEl = document.getElementById('certToastMsg');
  if (!toast) return;
  if (msgEl) msgEl.textContent = message || 'Action completed';
  toast.classList.add('is-show');
  clearTimeout(toast._timeout);
  toast._timeout = setTimeout(() => {
    toast.classList.remove('is-show');
  }, 2600);
}

function openCertificateViewer(docUrl, title, issuer, badge, extraObj) {
  const modal = document.getElementById('certViewerModal');
  const img = document.getElementById('certModalImg');
  const loader = document.getElementById('certModalLoader');
  if (!modal || !img) return;

  const data = getCertificateDossier(docUrl, title, issuer, badge, extraObj);

  // 1. Populate Executive Header
  const titleEl = document.getElementById('certModalTitle');
  const issuerEl = document.getElementById('certModalIssuer');
  const badgeEl = document.getElementById('certModalBadge');
  const headerIdEl = document.getElementById('certModalHeaderId');
  const openBtn = document.getElementById('certModalOpenBtn');
  const downloadBtn = document.getElementById('certModalDownloadBtn');

  if (titleEl) titleEl.textContent = data.title;
  if (issuerEl) issuerEl.textContent = data.issuer;
  if (badgeEl) badgeEl.innerHTML = `<span class="cert-live-dot">●</span> ${data.badge}`;
  if (headerIdEl) headerIdEl.textContent = data.credentialId;
  if (openBtn) openBtn.href = data.docUrl;
  if (downloadBtn) {
    downloadBtn.href = data.docUrl;
    downloadBtn.setAttribute('download', data.filename || 'certificate.jpg');
  }

  // 2. Populate Comprehensive Dossier Panel
  const dossierTitle = document.getElementById('certDossierTitle');
  const dossierOrg = document.getElementById('certDossierOrg');
  const dossierStatus = document.getElementById('certDossierStatus');
  const dossierHonors = document.getElementById('certDossierHonors');
  const dossierId = document.getElementById('certDossierId');
  const dossierDate = document.getElementById('certDossierDate');
  const dossierValid = document.getElementById('certDossierValid');
  const dossierRecipient = document.getElementById('certDossierRecipient');
  const dossierDesc = document.getElementById('certDossierDesc');
  const dossierSkills = document.getElementById('certDossierSkills');
  const dossierDownloadBtn = document.getElementById('certDossierDownloadBtn');
  const dossierOpenBtn = document.getElementById('certDossierOpenBtn');

  if (dossierTitle) dossierTitle.textContent = data.title;
  if (dossierOrg) dossierOrg.textContent = data.issuer;
  if (dossierStatus) dossierStatus.textContent = data.status;
  if (dossierHonors) dossierHonors.textContent = data.honors;
  if (dossierId) dossierId.textContent = data.credentialId;
  if (dossierDate) dossierDate.textContent = data.dateConferred;
  if (dossierValid) dossierValid.textContent = data.validity;
  if (dossierRecipient) dossierRecipient.textContent = data.recipient;
  if (dossierDesc) dossierDesc.textContent = data.description;

  if (dossierSkills && Array.isArray(data.skills)) {
    dossierSkills.innerHTML = data.skills.map(s => `<span class="cert-skill-pill">${s}</span>`).join('');
  }
  if (dossierDownloadBtn) {
    dossierDownloadBtn.href = data.docUrl;
    dossierDownloadBtn.setAttribute('download', data.filename || 'certificate.jpg');
  }
  if (dossierOpenBtn) {
    dossierOpenBtn.href = data.docUrl;
  }

  // 3. Reset transform & image
  resetCertCanvasTransform();

  // Reset mobile tabs to scan
  const tabScan = document.getElementById('certTabScanBtn');
  const tabDossier = document.getElementById('certTabDossierBtn');
  const canvasPane = document.getElementById('certCanvasPane');
  const dossierPane = document.getElementById('certDossierPane');
  if (tabScan) tabScan.classList.add('is-active');
  if (tabDossier) tabDossier.classList.remove('is-active');
  if (canvasPane) canvasPane.classList.add('is-tab-active');
  if (dossierPane) dossierPane.classList.remove('is-tab-active');

  // 4. Load Document Image
  if (loader) {
    loader.style.display = 'flex';
    loader.innerHTML = '<div class="cert-spinner"></div><span>Rendering verified credential...</span>';
  }
  img.style.opacity = '0';
  img.onload = () => {
    if (loader) loader.style.display = 'none';
    img.style.opacity = '1';
  };
  img.onerror = () => {
    if (loader) {
      loader.innerHTML = '<span style="color:#f87171;">Could not load document preview scan.</span>';
    }
  };
  img.src = data.docUrl;
  if (img.complete && img.naturalWidth !== 0) {
    if (loader) loader.style.display = 'none';
    img.style.opacity = '1';
  }

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCertificateViewer() {
  const modal = document.getElementById('certViewerModal');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

window.resolveCertificateDocUrl = resolveCertificateDocUrl;
window.openCertificateViewer = openCertificateViewer;
window.closeCertificateViewer = closeCertificateViewer;
window.showCertToast = showCertToast;

// Global Setup for Certificate Controls (Zoom, Pan, Rotate, Print, Copy, Tabs)
(() => {
  // Zoom Controls
  const zoomInBtn = document.getElementById('certZoomInBtn');
  const zoomOutBtn = document.getElementById('certZoomOutBtn');
  const zoomResetBtn = document.getElementById('certZoomResetBtn');
  const rotateBtn = document.getElementById('certRotateBtn');
  const printBtn = document.getElementById('certModalPrintBtn');
  const copyIdBtn = document.getElementById('certCopyIdBtn');
  const shareBtn = document.getElementById('certDossierShareBtn');
  const viewport = document.getElementById('certCanvasViewport');

  if (zoomInBtn) {
    zoomInBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      certViewerState.zoom = Math.min(certViewerState.zoom + 0.25, 3.0);
      applyCertCanvasTransform();
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      certViewerState.zoom = Math.max(certViewerState.zoom - 0.25, 0.75);
      applyCertCanvasTransform();
    });
  }

  if (zoomResetBtn) {
    zoomResetBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      resetCertCanvasTransform();
    });
  }

  if (rotateBtn) {
    rotateBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      certViewerState.rotate = (certViewerState.rotate + 90) % 360;
      applyCertCanvasTransform();
    });
  }

  if (printBtn) {
    printBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const img = document.getElementById('certModalImg');
      if (!img || !img.src) return;
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>Print Credential - ${document.getElementById('certModalTitle')?.textContent || 'Document'}</title>
              <style>
                body { margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #fff; }
                img { max-width: 100%; max-height: 98vh; object-fit: contain; }
                @media print { body { -webkit-print-color-adjust: exact; } }
              </style>
            </head>
            <body>
              <img src="${img.src}" onload="window.print();window.close();" />
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    });
  }

  if (copyIdBtn) {
    copyIdBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const codeEl = document.getElementById('certDossierId');
      const val = codeEl ? codeEl.textContent.trim() : '';
      if (val && navigator.clipboard) {
        navigator.clipboard.writeText(val).then(() => {
          showCertToast(`Copied ID: ${val}`);
        }).catch(() => {
          showCertToast(`ID: ${val}`);
        });
      }
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const shareUrl = window.location.origin + window.location.pathname + '#certificates';
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl).then(() => {
          showCertToast('Credential showcase link copied!');
        });
      }
    });
  }

  // Interactive Viewport Pan & Drag
  if (viewport) {
    viewport.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // left click only
      certViewerState.isDragging = true;
      certViewerState.dragStartX = e.clientX;
      certViewerState.dragStartY = e.clientY;
      certViewerState.initialPanX = certViewerState.panX;
      certViewerState.initialPanY = certViewerState.panY;
      viewport.classList.add('is-dragging');
    });

    window.addEventListener('mousemove', (e) => {
      if (!certViewerState.isDragging) return;
      const dx = e.clientX - certViewerState.dragStartX;
      const dy = e.clientY - certViewerState.dragStartY;
      certViewerState.panX = certViewerState.initialPanX + dx;
      certViewerState.panY = certViewerState.initialPanY + dy;
      applyCertCanvasTransform();
    });

    window.addEventListener('mouseup', () => {
      if (certViewerState.isDragging) {
        certViewerState.isDragging = false;
        viewport.classList.remove('is-dragging');
      }
    });

    // Double-click toggle zoom
    viewport.addEventListener('dblclick', (e) => {
      e.preventDefault();
      if (certViewerState.zoom > 1.2) {
        resetCertCanvasTransform();
      } else {
        certViewerState.zoom = 1.75;
        applyCertCanvasTransform();
      }
    });

    // Mouse wheel zoom
    viewport.addEventListener('wheel', (e) => {
      e.preventDefault();
      if (e.deltaY < 0) {
        certViewerState.zoom = Math.min(certViewerState.zoom + 0.15, 3.0);
      } else {
        certViewerState.zoom = Math.max(certViewerState.zoom - 0.15, 0.75);
      }
      applyCertCanvasTransform();
    }, { passive: false });
  }

  // Mobile Tabs Switching
  const tabScanBtn = document.getElementById('certTabScanBtn');
  const tabDossierBtn = document.getElementById('certTabDossierBtn');
  const canvasPane = document.getElementById('certCanvasPane');
  const dossierPane = document.getElementById('certDossierPane');

  if (tabScanBtn && tabDossierBtn && canvasPane && dossierPane) {
    tabScanBtn.addEventListener('click', () => {
      tabScanBtn.classList.add('is-active');
      tabDossierBtn.classList.remove('is-active');
      canvasPane.classList.add('is-tab-active');
      dossierPane.classList.remove('is-tab-active');
    });

    tabDossierBtn.addEventListener('click', () => {
      tabDossierBtn.classList.add('is-active');
      tabScanBtn.classList.remove('is-active');
      dossierPane.classList.add('is-tab-active');
      canvasPane.classList.remove('is-tab-active');
    });
  }
})();

// Global delegated click listener for Certificate Viewer Modal
document.addEventListener('click', (e) => {
  // Ignore clicks inside the open certificate viewer modal (except close/backdrop)
  const isInsideModal = !!e.target.closest('#certViewerModal');
  if (isInsideModal) {
    if (e.target.closest('#certModalCloseBtn') || (e.target && e.target.id === 'certModalBackdrop')) {
      closeCertificateViewer();
    }
    return;
  }

  // 1. Direct triggers: View Document buttons, spotlight button, spotlight info
  const directBtn = e.target.closest('.cert-doc-btn, #certSpotlightBtn, .cert-spotlight-info');
  if (directBtn) {
    e.preventDefault();
    e.stopPropagation();

    let docUrl = '';
    let title = '';
    let issuer = '';
    let badge = '';

    if (directBtn.id === 'certSpotlightBtn' || directBtn.classList.contains('cert-spotlight-info')) {
      const activeCard = document.querySelector('#certDeckTrack .cert-fan-card.is-active') ||
        document.querySelector('#certDeckTrack .cert-fan-card');
      if (activeCard) {
        docUrl = activeCard.dataset.link || directBtn.getAttribute('href');
        title = activeCard.dataset.title;
        issuer = activeCard.dataset.issuer;
        badge = activeCard.dataset.badge;
      } else {
        docUrl = directBtn.getAttribute('href');
      }
    } else {
      const card = directBtn.closest('.cert-fan-card');
      if (card) {
        docUrl = card.dataset.link || directBtn.getAttribute('href');
        title = card.dataset.title;
        issuer = card.dataset.issuer;
        badge = card.dataset.badge;
      } else {
        docUrl = directBtn.getAttribute('href');
      }
    }

    openCertificateViewer(docUrl, title, issuer, badge);
    return;
  }

  // 2. Click on ANY certificate card in fan deck
  const card = e.target.closest('.cert-fan-card');
  if (card) {
    e.preventDefault();
    e.stopPropagation();
    const docBtn = card.querySelector('.cert-doc-btn');
    const docUrl = card.dataset.link || (docBtn ? docBtn.getAttribute('href') : '');
    const title = card.dataset.title || '';
    const issuer = card.dataset.issuer || '';
    const badge = card.dataset.badge || '';
    openCertificateViewer(docUrl, title, issuer, badge);
    return;
  }
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCertificateViewer();
  if (document.getElementById('certViewerModal')?.classList.contains('is-open')) {
    if (e.key === '+' || e.key === '=') {
      certViewerState.zoom = Math.min(certViewerState.zoom + 0.25, 3.0);
      applyCertCanvasTransform();
    } else if (e.key === '-' || e.key === '_') {
      certViewerState.zoom = Math.max(certViewerState.zoom - 0.25, 0.75);
      applyCertCanvasTransform();
    } else if (e.key === '0') {
      resetCertCanvasTransform();
    }
  }
});


(() => {
  function initCertificatesFanDeck() {
    const stage = document.getElementById('certDeckStage');
    const track = document.getElementById('certDeckTrack');
    const prevBtn = document.getElementById('certPrevBtn');
    const nextBtn = document.getElementById('certNextBtn');
    const dotsContainer = document.getElementById('certPaginationDots');
    const spotlightBar = document.getElementById('certSpotlightBar');

    if (!stage || !track) return null;

    let cards = Array.from(track.querySelectorAll('.cert-fan-card'));
    let totalCards = cards.length;
    let targetProgress = 0;
    let currentProgress = 0;
    let activeCardIndex = 0;
    const lerpSpeed = 0.12;

    function renderDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement('div');
        dot.className = `cert-dot ${i === activeCardIndex ? 'is-active' : ''}`;
        dot.setAttribute('data-idx', i);
        dot.addEventListener('click', (e) => {
          e.stopPropagation();
          targetProgress = i;
        });
        dotsContainer.appendChild(dot);
      }
    }

    function updateSpotlight(index) {
      if (index === activeCardIndex && spotlightBar && spotlightBar.dataset.init) return;
      if (spotlightBar) spotlightBar.dataset.init = 'true';
      activeCardIndex = index;

      const activeCard = cards[index];
      if (!activeCard) return;

      const title = activeCard.dataset.title || 'Verified Credential';
      const issuer = activeCard.dataset.issuer || 'Institutional Verification';
      const badge = activeCard.dataset.badge || 'Accredited Credential';
      const link = resolveCertificateDocUrl(activeCard.dataset.link, title, issuer, badge);
      activeCard.dataset.link = link;

      const activeNumEl = document.getElementById('certActiveNum');
      const totalNumEl = document.getElementById('certTotalNum');
      const badgeEl = document.getElementById('certSpotlightBadge');
      const titleEl = document.getElementById('certSpotlightTitle');
      const issuerEl = document.getElementById('certSpotlightIssuer');
      const btnEl = document.getElementById('certSpotlightBtn');

      if (activeNumEl) activeNumEl.textContent = String(index + 1).padStart(2, '0');
      if (totalNumEl) totalNumEl.textContent = String(totalCards).padStart(2, '0');
      if (badgeEl) badgeEl.textContent = badge;
      if (titleEl) titleEl.textContent = title;
      if (issuerEl) issuerEl.textContent = issuer;
      if (btnEl) btnEl.href = link;

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.cert-dot');
        dots.forEach((dot, dIdx) => {
          dot.classList.toggle('is-active', dIdx === index);
        });
      }
    }

    function bindDocumentButtons() {
      const docBtns = track.querySelectorAll('.cert-doc-btn');
      docBtns.forEach((btn) => {
        btn.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          const card = btn.closest('.cert-fan-card');
          const idx = cards.indexOf(card);
          if (idx !== -1) {
            targetProgress = idx;
            activeCardIndex = idx;
            updateSpotlight(idx);
          }
          const docUrl = (card && card.dataset.link) ? card.dataset.link : btn.getAttribute('href');
          const title = card ? card.dataset.title : '';
          const issuer = card ? card.dataset.issuer : '';
          const badge = card ? card.dataset.badge : '';
          openCertificateViewer(docUrl, title, issuer, badge);
        };
      });
    }

    let hasDraggedDistance = false;

    function bindCardClicks() {
      bindDocumentButtons();
      cards.forEach((card, idx) => {
        card.onclick = (e) => {
          if (hasDraggedDistance) return;
          e.preventDefault();
          e.stopPropagation();

          targetProgress = idx;
          activeCardIndex = idx;
          updateSpotlight(idx);

          const docBtn = card.querySelector('.cert-doc-btn');
          const docUrl = card.dataset.link || (docBtn ? docBtn.getAttribute('href') : '');
          const title = card.dataset.title || '';
          const issuer = card.dataset.issuer || '';
          const badge = card.dataset.badge || '';

          openCertificateViewer(docUrl, title, issuer, badge);
        };
      });

      const spotlightInfo = document.querySelector('.cert-spotlight-info');
      if (spotlightInfo) {
        spotlightInfo.style.cursor = 'pointer';
        spotlightInfo.title = 'Click to view document & credential dossier';
        spotlightInfo.onclick = (e) => {
          e.preventDefault();
          const activeCard = cards[activeCardIndex] || cards[0];
          if (activeCard) {
            const docBtn = activeCard.querySelector('.cert-doc-btn');
            const docUrl = activeCard.dataset.link || (docBtn ? docBtn.getAttribute('href') : '');
            openCertificateViewer(docUrl, activeCard.dataset.title, activeCard.dataset.issuer, activeCard.dataset.badge);
          }
        };
      }
    }

    function updatePositions(prog) {
      cards.forEach((card, idx) => {
        const offset = idx - prog;

        const x = offset * 180;
        const y = Math.pow(offset, 2) * 18;
        const z = -Math.abs(offset) * 80;
        const rotateY = -offset * 14;
        const rotateZ = offset * 5.5;
        const scale = Math.max(0.68, 1 - Math.abs(offset) * 0.08);
        const opacity = Math.max(0.2, 1 - Math.abs(offset) * 0.22);
        const zIndex = 100 - Math.round(Math.abs(offset) * 10);

        card.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${rotateY.toFixed(1)}deg) rotateZ(${rotateZ.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        card.style.opacity = Math.abs(offset) > 3.8 ? '0' : opacity.toFixed(3);
        card.style.zIndex = zIndex;
        card.style.pointerEvents = Math.abs(offset) > 3.8 ? 'none' : 'auto';

        if (Math.abs(offset) < 0.5) {
          card.classList.add('is-active');
        } else {
          card.classList.remove('is-active');
        }
      });

      const nearestIdx = Math.min(Math.max(Math.round(prog), 0), totalCards - 1);
      updateSpotlight(nearestIdx);
    }

    // 1. Scroll-Driven Gliding & Changing
    let isUserInteracting = false;
    let interactionTimeout = null;

    const onWindowScroll = () => {
      if (isUserInteracting) return;
      const section = document.getElementById('certificates');
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const winH = window.innerHeight;

      const totalTravel = section.offsetHeight + winH * 0.4;
      const currentTravel = (winH * 0.75) - rect.top;

      if (currentTravel >= 0 && currentTravel <= totalTravel) {
        const ratio = Math.min(Math.max(currentTravel / totalTravel, 0), 1);
        targetProgress = ratio * (totalCards - 1);
      }
    };
    window.addEventListener('scroll', onWindowScroll, { passive: true });

    // 2. Mouse Wheel Navigation
    let wheelTimeout = null;
    stage.addEventListener('wheel', (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) > 15) {
        isUserInteracting = true;
        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => { isUserInteracting = false; }, 1200);

        const dir = delta > 0 ? 1 : -1;
        targetProgress = Math.min(Math.max(targetProgress + dir * 0.4, 0), totalCards - 1);

        clearTimeout(wheelTimeout);
        wheelTimeout = setTimeout(() => {
          targetProgress = Math.round(targetProgress);
        }, 150);
      }
    }, { passive: true });

    // 3. Pointer Drag / Touch Swipe
    let isPointerDown = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartProgress = 0;

    stage.addEventListener('pointerdown', (e) => {
      if (e.target.closest('.cert-arrow-btn') || e.target.closest('.cert-dot') || e.target.closest('#certViewerModal')) return;
      isPointerDown = true;
      hasDraggedDistance = false;
      dragStartX = e.clientX;
      dragStartY = e.clientY;
      dragStartProgress = currentProgress;
    });

    stage.addEventListener('pointermove', (e) => {
      if (!isPointerDown) return;
      const diffX = e.clientX - dragStartX;
      const diffY = e.clientY - dragStartY;
      if (!hasDraggedDistance && (Math.abs(diffX) > 8 || Math.abs(diffY) > 8)) {
        hasDraggedDistance = true;
        isUserInteracting = true;
        try {
          stage.setPointerCapture(e.pointerId);
        } catch (err) { }
      }
      if (hasDraggedDistance) {
        targetProgress = Math.min(Math.max(dragStartProgress - (diffX / 220), 0), totalCards - 1);
      }
    });

    const finishDrag = (e) => {
      if (!isPointerDown) return;
      isPointerDown = false;
      if (hasDraggedDistance) {
        targetProgress = Math.round(targetProgress);
        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => { isUserInteracting = false; }, 1200);
        try {
          if (e && e.pointerId && stage.hasPointerCapture(e.pointerId)) {
            stage.releasePointerCapture(e.pointerId);
          }
        } catch (err) { }
        setTimeout(() => {
          hasDraggedDistance = false;
        }, 100);
      }
    };

    stage.addEventListener('pointerup', finishDrag);
    stage.addEventListener('pointercancel', finishDrag);

    // 4. Arrow Navigation
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isUserInteracting = true;
        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => { isUserInteracting = false; }, 1500);
        targetProgress = Math.max(0, Math.round(targetProgress) - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isUserInteracting = true;
        clearTimeout(interactionTimeout);
        interactionTimeout = setTimeout(() => { isUserInteracting = false; }, 1500);
        targetProgress = Math.min(totalCards - 1, Math.round(targetProgress) + 1);
      });
    }

    // 5. 60 FPS LERP Animation Loop
    function animate() {
      currentProgress += (targetProgress - currentProgress) * lerpSpeed;
      updatePositions(currentProgress);
      requestAnimationFrame(animate);
    }

    renderDots();
    bindCardClicks();
    onWindowScroll();
    animate();

    return {
      setCertificates: (certs) => {
        if (!Array.isArray(certs) || certs.length === 0) return;
        track.innerHTML = certs.map((c, idx) => {
          const title = c.title || 'Verified Credential';
          const issuer = c.issuer || 'Institutional Verification';
          const badge = c.badge || (issuer.toLowerCase().includes('degree') ? 'Honors Degree: 3.25 CGPA' : 'Verified');
          const link = resolveCertificateDocUrl(c, title, issuer, badge);
          const serial = c.credentialId || c.serial || `WU-KIOT-${2026 - idx}-${String(title.slice(0, 4)).toUpperCase().replace(/[^A-Z]/g, 'X')}`;

          let icon = '🎓';
          let orgName = 'WOLLO UNIVERSITY';
          let statusText = '✓ ACCREDITED';
          let ribbonText = 'OFFICIAL DEGREE ACCREDITATION';
          let colorStyle = '';
          let sealColorStyle = '';

          const lowIssuer = issuer.toLowerCase();
          const lowTitle = title.toLowerCase();

          if (lowIssuer.includes('registrar') || lowTitle.includes('english')) {
            icon = '📜';
            orgName = 'UNIVERSITY REGISTRAR';
            statusText = '✓ OFFICIAL';
            ribbonText = 'OFFICIAL LANGUAGE ACCREDITATION';
            colorStyle = 'style="color: #60a5fa; border-color: rgba(96, 165, 250, 0.4); background: rgba(59, 130, 246, 0.1);"';
            sealColorStyle = 'style="color: #60a5fa; background: radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, rgba(30, 58, 138, 0.1) 70%); border-color: rgba(96, 165, 250, 0.5);"';
          } else if (lowIssuer.includes('chair') || lowTitle.includes('hussien') || lowIssuer.includes('hussien')) {
            icon = '🏛️';
            orgName = 'COMPUTING COLLEGE';
            statusText = '✓ ENDORSED';
            ribbonText = 'DEPARTMENT CHAIR ENDORSEMENT';
            colorStyle = 'style="color: #34d399; border-color: rgba(52, 211, 153, 0.4); background: rgba(16, 185, 129, 0.1);"';
            sealColorStyle = 'style="color: #34d399; background: radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(6, 78, 59, 0.1) 70%); border-color: rgba(52, 211, 153, 0.5);"';
          } else if (lowIssuer.includes('kasahun') || lowTitle.includes('software')) {
            icon = '✍️';
            orgName = 'SOFTWARE ENGINEERING';
            statusText = '✓ ENDORSED';
            ribbonText = 'SENIOR FACULTY ENDORSEMENT';
            colorStyle = 'style="color: #c084fc; border-color: rgba(192, 132, 252, 0.4); background: rgba(147, 51, 234, 0.1);"';
            sealColorStyle = 'style="color: #c084fc; background: radial-gradient(circle, rgba(147, 51, 234, 0.25) 0%, rgba(88, 28, 135, 0.1) 70%); border-color: rgba(192, 132, 252, 0.5);"';
          } else if (lowIssuer.includes('cursa')) {
            icon = '💻';
            orgName = 'CURSA PLATFORM';
            statusText = '✓ CERTIFIED';
            ribbonText = 'ENGINEERING SPECIALIZATION';
          } else if (lowIssuer.includes('wrench')) {
            icon = '⚡';
            orgName = 'WRENCH WISE';
            statusText = '✓ COMPLETED';
            ribbonText = 'APPLIED AI WORKSHOP';
            colorStyle = 'style="color: #ff7a45; border-color: rgba(255, 122, 69, 0.4); background: rgba(255, 80, 24, 0.1);"';
            sealColorStyle = 'style="color: #ff7a45; background: radial-gradient(circle, rgba(255, 80, 24, 0.25) 0%, rgba(154, 52, 18, 0.1) 70%); border-color: rgba(255, 122, 69, 0.5);"';
          } else if (lowIssuer.includes('wageningen')) {
            icon = '🌱';
            orgName = 'WAGENINGEN UNIVERSITY';
            statusText = '✓ AWARD';
            ribbonText = 'GLOBAL INNOVATION CHALLENGE';
            colorStyle = 'style="color: #34d399; border-color: rgba(52, 211, 153, 0.4); background: rgba(16, 185, 129, 0.1);"';
            sealColorStyle = 'style="color: #34d399; background: radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(6, 78, 59, 0.1) 70%); border-color: rgba(52, 211, 153, 0.5);"';
          } else if (lowIssuer.includes('new boston') || lowTitle.includes('angular') || lowTitle.includes('techno') || lowIssuer.includes('techno')) {
            icon = '🏛️';
            orgName = 'TECHNO CLUB';
            statusText = '✓ MEMBER';
            ribbonText = 'ACTIVE MEMBERSHIP CERTIFICATION';
            colorStyle = 'style="color: #38bdf8; border-color: rgba(56, 189, 248, 0.4); background: rgba(56, 189, 248, 0.1);"';
            sealColorStyle = 'style="color: #38bdf8; background: radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, rgba(14, 116, 144, 0.1) 70%); border-color: rgba(56, 189, 248, 0.5);"';
          } else {
            orgName = issuer.split('•')[0].trim().toUpperCase();
          }

          return `
            <div class="cert-fan-card" data-index="${idx}" data-title="${escapeHtml(title)}" data-issuer="${escapeHtml(issuer)}" data-badge="${escapeHtml(badge)}" data-link="${escapeHtml(link)}">
              <div class="cert-fan-card-inner">
                <div class="cert-card-topbar">
                  <div class="cert-card-org">
                    <span class="cert-card-icon">${icon}</span>
                    <span class="cert-card-org-name">${escapeHtml(orgName)}</span>
                  </div>
                  <span class="cert-card-status" ${colorStyle}>${escapeHtml(statusText)}</span>
                </div>
                <div class="cert-card-crest-wrap">
                  <div class="cert-gold-seal" ${sealColorStyle}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.3-4.8-2.5-4.8 2.5.9-5.3-3.8-3.7 5.3-.8L12 2z"/>
                    </svg>
                  </div>
                  <div class="cert-ribbon-sub">${escapeHtml(ribbonText)}</div>
                </div>
                <div class="cert-card-main-body">
                  <span class="cert-recipient-sub">${escapeHtml(issuer)}</span>
                  <h4 class="cert-degree-name">${escapeHtml(title)}</h4>
                  <span class="cert-conferred-text">Awarded to <strong>Lekibir Mulatu</strong></span>
                  <div class="cert-distinction-pill">
                    <span class="star-icon">★</span>
                    <span>${escapeHtml(badge)}</span>
                  </div>
                </div>
                <div class="cert-card-bottom-bar">
                  <div class="cert-serial-col">
                    <span class="cert-serial-lbl">VERIFICATION ID</span>
                    <span class="cert-serial-val">${escapeHtml(serial)}</span>
                  </div>
                  <a href="${escapeHtml(link)}" class="cert-doc-btn" aria-label="View Verified Document">
                    <span>View Verified Document</span>
                    <span class="arrow">↗</span>
                  </a>
                </div>
              </div>
            </div>
          `;
        }).join('');

        cards = Array.from(track.querySelectorAll('.cert-fan-card'));
        totalCards = cards.length;
        targetProgress = Math.min(targetProgress, totalCards - 1);
        bindDocumentButtons();
        renderDots();
        bindCardClicks();
        updatePositions(currentProgress);
      }
    };
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      certsFanController = initCertificatesFanDeck();
    });
  } else {
    certsFanController = initCertificatesFanDeck();
  }
})();

(() => {
  // Scroll Reveal for Project and Certification details
  let scrollObserver = null;
  const initScrollReveal = () => {
    const revealElements = document.querySelectorAll('.scroll-reveal:not(.in-view)');
    if (!revealElements.length) return;

    if ('IntersectionObserver' in window) {
      if (!scrollObserver) {
        scrollObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              scrollObserver.unobserve(entry.target);
            }
          });
        }, {
          threshold: 0.08,
          rootMargin: '0px 0px -40px 0px'
        });
      }
      revealElements.forEach(el => scrollObserver.observe(el));
    } else {
      // Fallback
      revealElements.forEach(el => el.classList.add('in-view'));
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal);
  } else {
    initScrollReveal();
  }

  // Portfolio Contact Form Submission to Node.js & MongoDB API
  document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('portfolio-contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const msgInput = document.getElementById('contact-message');
      const statusBox = document.getElementById('contact-status-msg');
      const submitBtn = document.getElementById('btn-submit-contact');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const message = msgInput.value.trim();

      if (!name || !email || !message) return;

      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>Sending...</span>';
      statusBox.style.display = 'none';

      // Dynamic API Base URL (auto-connects via config.js or smart fallback)
      const API_BASE = typeof getPortfolioApiBase === 'function' 
        ? getPortfolioApiBase() 
        : ((typeof window !== 'undefined' && window.location && (window.location.protocol === 'file:' || (window.location.port && window.location.port !== '5000'))) ? 'http://localhost:5000/api' : '/api');

      try {
        const res = await fetch(`${API_BASE}/contact`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message, subject: 'Portfolio Inquiry' })
        });

        const data = await res.json();

        if (res.ok) {
          statusBox.style.display = 'block';
          statusBox.style.background = 'rgba(16, 185, 129, 0.15)';
          statusBox.style.color = '#10b981';
          statusBox.style.border = '1px solid rgba(16, 185, 129, 0.3)';
          statusBox.textContent = '✓ Message sent successfully! I will get back to you shortly.';
          contactForm.reset();
        } else {
          throw new Error(data.message || 'Submission failed');
        }
      } catch (err) {
        statusBox.style.display = 'block';
        statusBox.style.background = 'rgba(239, 68, 68, 0.15)';
        statusBox.style.color = '#ef4444';
        statusBox.style.border = '1px solid rgba(239, 68, 68, 0.3)';
        statusBox.textContent = '✕ Error: ' + err.message;
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Message</span>';
      }
    });
  });

  // Instant Independent Sync for Active Resume / CV (Runs immediately with cache-busting)
  async function syncActiveCv() {
    const API_BASE = typeof getPortfolioApiBase === 'function'
      ? getPortfolioApiBase()
      : ((typeof window !== 'undefined' && window.location && (window.location.protocol === 'file:' || (window.location.port && window.location.port !== '5000'))) ? 'http://localhost:5000/api' : '/api');

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
      console.warn('Immediate CV sync warning:', err.message);
    }
  }

  // Trigger CV sync immediately as script executes
  syncActiveCv();

  // Dynamic MongoDB Backend Sync for Home Page
  async function loadHomeDynamicContent() {
    const API_BASE = typeof getPortfolioApiBase === 'function'
      ? getPortfolioApiBase()
      : ((typeof window !== 'undefined' && window.location && (window.location.protocol === 'file:' || (window.location.port && window.location.port !== '5000'))) ? 'http://localhost:5000/api' : '/api');

    // 1. Sync Featured Projects Showcase into 3D Fan Deck
    try {
      const res = await fetch(`${API_BASE}/projects`);
      if (res.ok) {
        const projects = await res.json();
        if (fanDeckController && Array.isArray(projects) && projects.length > 0) {
          fanDeckController.setProjects(projects);
        }
      }
    } catch (err) {
      console.warn('Home projects backend sync bypassed, keeping static preview:', err.message);
    }

    // 1b. Sync Certificates into 3D Fan Deck
    try {
      const res = await fetch(`${API_BASE}/certificates`);
      if (res.ok) {
        const certs = await res.json();
        if (certsFanController && Array.isArray(certs) && certs.length > 0) {
          certsFanController.setCertificates(certs);
        }
      }
    } catch (err) {
      console.warn('Certificates backend sync bypassed, keeping static preview:', err.message);
    }

    // 2. Sync Client Testimonials
    try {
      const res = await fetch(`${API_BASE}/testimonials`);
      if (res.ok) {
        const testimonials = await res.json();
        const testGrid = document.querySelector('.testimonials-grid');
        if (testGrid && Array.isArray(testimonials) && testimonials.length > 0) {
          testGrid.innerHTML = testimonials.map((t, idx) => {
            const initials = (t.name || 'Client')
              .split(' ')
              .map(n => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);
            const role = t.role || t.position || 'Client';
            return `
              <div class="testimonial-card scroll-reveal">
                <div class="quote-icon">“</div>
                <div class="testimonial-quote-wrap">
                  <p class="testimonial-quote">
                    ${escapeHtml(t.quote)}
                  </p>
                  <button class="testimonial-more-btn" type="button" aria-expanded="false">
                    <span class="more-text">Show more</span> <span class="more-icon">▾</span>
                  </button>
                </div>
                <div class="testimonial-author-wrap">
                  <div class="author-avatar avatar-${(idx % 2) + 1}">${initials}</div>
                  <div class="author-meta">
                    <span class="author-name">${escapeHtml(t.name)}</span>
                    <span class="author-role">${escapeHtml(role)} ${t.company ? 'at ' + escapeHtml(t.company) : ''}</span>
                  </div>
                </div>
              </div>
            `;
          }).join('');
          initScrollReveal();
        }
      }
    } catch (err) {
      console.warn('Testimonials backend sync bypassed, keeping static preview:', err.message);
    }

    // 3. Sync Active Resume / CV Links
    await syncActiveCv();

    // Helper: Generate crisp vector SVG tech icon for any technology name
    function getTechSkillIcon(name, color = '#ff5018') {
      const n = (name || '').toLowerCase().trim();

      if (n === '.net' || n === 'dotnet' || n.includes('.net') || n.includes('c#') || n.includes('csharp')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="11" fill="#512BD4"/><path fill="#FFFFFF" d="M6.2 14.8a1.1 1.1 0 1 1 0-2.2 1.1 1.1 0 0 1 0 2.2zm2.6-.2h1.5l2.4-4.8v4.8h1.4V7.6h-1.5L10.2 12V7.6H8.8v7zm7.6.1c1.8 0 2.8-1.1 2.8-2.6v-.1c0-1.6-1-2.5-2.7-2.5h-2.2v5.2h2.1zm-0.7-4.1h.6c.9 0 1.4.4 1.4 1.3v.1c0 .9-.5 1.3-1.4 1.3h-.6v-2.7z"/></svg>`;
      }
      if (n.includes('angular')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24"><path fill="#E23237" d="M12 2L2 5.5l1.6 12.8L12 22.5l8.4-4.2L22 5.5 12 2z"/><path fill="#B52E31" d="M12 2v20.5l8.4-4.2L22 5.5 12 2z"/><path fill="#FFFFFF" d="M12 4.5l-5.6 12.5h2l1.1-2.8h5l1.1 2.8h2L12 4.5zm1.8 8h-3.6l1.8-4.4 1.8 4.4z"/></svg>`;
      }
      if (n.includes('typescript') || n === 'ts') {
        return `<svg width="40" height="40" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#3178C6"/><path fill="#FFFFFF" d="M3.2 12.3h6v2.2h-1.8v7.2H5.1v-7.2H3.2v-2.2zm7.6 5.8c.4.7 1.1 1.2 2 1.2 1 0 1.6-.6 1.6-1.4 0-1-.7-1.3-1.8-1.8-1.6-.7-2.6-1.4-2.6-3.1 0-1.6 1.2-2.8 3-2.8 1.3 0 2.2.5 2.8 1.6l-1.4 1c-.3-.5-.8-.8-1.5-.8-.8 0-1.3.5-1.3 1.1 0 .7.5 1.1 1.6 1.6 1.7.7 2.8 1.5 2.8 3.3 0 1.9-1.5 3-3.4 3-1.9 0-3.1-.9-3.7-2.1l1.9-1z"/></svg>`;
      }
      if (n.includes('react')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none"><ellipse cx="12" cy="12" rx="10" ry="4.2" stroke="#61DAFB" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" stroke="#61DAFB" stroke-width="1.5"/><ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" stroke="#61DAFB" stroke-width="1.5"/><circle cx="12" cy="12" r="1.8" fill="#61DAFB"/></svg>`;
      }
      if (n.includes('python')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24"><path fill="#3776AB" d="M11.93 1.01c-3.14 0-5.06 1.37-5.06 3.51v2.54h5.16v.77H4.37C2.26 7.83 1 9.77 1 12.06c0 2.45 1.48 4.23 4.23 4.23h1.83v-2.45c0-1.88 1.58-3.41 3.46-3.41h5.12V8.97c0-2.45-1.99-3.95-4.71-3.95h-1v-.9c0-1.92 1.34-3.11 3.27-3.11h3.3V1.01h-4.57zM8.9 2.58c.45 0 .81.36.81.81s-.36.81-.81.81-.81-.36-.81-.81.36-.81.81-.81z"/><path fill="#FFD43B" d="M12.07 22.99c3.14 0 5.06-1.37 5.06-3.51v-2.54h-5.16v-.77h7.66c2.11 0 3.37-1.94 3.37-4.23 0-2.45-1.48-4.23-4.23-4.23h-1.83v2.45c0 1.88-1.58 3.41-3.46 3.41H8.36v1.46c0 2.45 1.99 3.95 4.71 3.95h1v.9c0 1.92-1.34 3.11-3.27 3.11h-3.3v2.4h4.57zm3.03-1.57c-.45 0-.81-.36-.81-.81s.36-.81.81-.81.81.36.81.81-.36.81-.81.81z"/></svg>`;
      }
      if (n.includes('django')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="#0C4B33"><path d="M11.146 0h3.337v15.656c-1.026.17-1.854.24-2.868.24-3.509 0-5.328-1.534-5.328-4.512 0-2.946 1.88-4.72 4.859-4.72.632 0 1.009.052 1.487.189l-.487-6.853zm.034 9.176c-.342-.086-.718-.12-1.042-.12-1.453 0-2.342.786-2.342 2.153 0 1.35.855 2.12 2.376 2.12.325 0 .65-.034 1.008-.103V9.176zM15.42 6.54h3.334v10.51c-1.025.171-1.854.24-2.868.24-3.509 0-5.328-1.534-5.328-4.513 0-2.946 1.88-4.72 4.862-4.72.632 0 1.009.052 1.487.189l-.487-1.706zm.034 4.546c-.342-.086-.718-.12-1.042-.12-1.453 0-2.342.786-2.342 2.153 0 1.35.855 2.12 2.376 2.12.325 0 .65-.034 1.008-.103v-4.05zM20.25 10.375h3.75v13.625h-3.75zM20.25 5.5h3.75v3.25h-3.75z"/></svg>`;
      }
      if (n.includes('node') || n.includes('express')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="#339933"><path d="M12 0L1.6 6v12L12 24l10.4-6V6L12 0zm0 2.3l8.4 4.8v9.7L12 21.7l-8.4-4.8V7.1L12 2.3zm-1.8 7.3c-.3 0-.6.1-.8.3l-2.4 1.4c-.5.3-.8.8-.8 1.4v2.8c0 .6.3 1.1.8 1.4l2.4 1.4c.5.3 1.1.3 1.6 0l2.4-1.4c.5-.3.8-.8.8-1.4v-2.8c0-.6-.3-1.1-.8-1.4l-2.4-1.4c-.2-.2-.5-.3-.8-.3z"/></svg>`;
      }
      if (n.includes('docker')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="#2496ED"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.186.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.186.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.186.186.186m5.893 2.715h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186h-2.12a.186.186 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.928 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.185-.186H2.208a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185M23.98 12.5a6.04 6.04 0 00-2.483-2.029c-.198-.093-.41-.044-.54.12-.298.374-.664.717-1.08 1.018-.175.127-.417.078-.54-.108-.344-.52-.806-.92-1.353-1.166-.192-.086-.414-.015-.526.166-.374.607-.88 1.096-1.472 1.428-.155.087-.354.048-.466-.092a7.1 7.1 0 00-1.748-1.503c-.22-.128-.498-.035-.615.197-.478.95-1.18 1.706-2.035 2.19-.153.086-.347.054-.463-.078a6.56 6.56 0 00-1.89-1.4c-.218-.106-.484-.022-.601.196-.464.863-1.125 1.554-1.924 2.012-.15.086-.342.057-.458-.073a6.76 6.76 0 00-1.986-1.492c-.22-.114-.49-.033-.607.188-.415.787-.99 1.433-1.68 1.887-.146.096-.34.076-.462-.05A7.6 7.6 0 00.1 12.5a.31.31 0 00-.1.226c0 4.974 4.54 9.006 10.144 9.006 5.253 0 9.57-3.55 10.07-8.192.836.213 1.882.164 2.684-.33.19-.118.24-.37.106-.547l-.025-.034-.999-1.129z"/></svg>`;
      }
      if (n.includes('mongo')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="#47A248"><path d="M17.193 9.555c-1.264-5.328-4.57-7.794-4.887-8.03-.238-.17-.55-.262-.806-.262-.257 0-.568.092-.806.262-.317.236-3.623 2.702-4.887 8.03-1.488 6.275 1.706 10.99 4.887 13.048v.006c.238.15.513.226.792.226.279 0 .554-.076.792-.226v-.006c3.18-2.057 6.375-6.773 4.915-13.048zm-5.693 11.23v-8.847c0-.282.227-.51.51-.51.282 0 .51.228.51.51v8.847c-2.316-1.57-4.502-4.997-3.414-9.697.944-4.077 3.09-6.304 3.934-7.07 1.02.923 3.195 3.328 3.934 7.07 1.088 4.7-1.154 8.127-3.474 9.697z"/></svg>`;
      }
      if (n.includes('postgres')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="#4169E1"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-1.82.62-3.49 1.64-4.83l2.87 2.87c-.12.42-.19.86-.19 1.32 0 2.56 2.08 4.64 4.64 4.64.46 0 .9-.07 1.32-.19l2.87 2.87C15.49 19.38 13.82 20 12 20zm5.36-3.17l-2.87-2.87c.12-.42.19-.86.19-1.32 0-2.56-2.08-4.64-4.64-4.64-.46 0-.9.07-1.32.19L5.85 5.32C7.38 4.07 9.57 3.32 12 3.32c4.78 0 8.68 3.9 8.68 8.68 0 2.43-.75 4.62-2 6.15-.42-.38-.9-.69-1.32-.98z"/></svg>`;
      }
      if (n.includes('sql') || n.includes('database')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="#4479A1"><path d="M16.53 10.74c-.27-.72-.6-1.4-.99-2.03-.52-.83-1.15-1.55-1.87-2.13-.74-.59-1.58-1.03-2.48-1.31-.9-.28-1.85-.38-2.8-.29-.94.09-1.84.37-2.67.83-.82.46-1.53 1.08-2.09 1.84-.57.75-.97 1.63-1.18 2.58-.21.95-.21 1.94 0 2.9.21.96.61 1.84 1.18 2.6.56.76 1.27 1.38 2.09 1.84.83.46 1.73.74 2.67.83.95.09 1.9-.01 2.8-.29.9-.28 1.74-.72 2.48-1.31.72-.58 1.35-1.3 1.87-2.13.39-.63.72-1.31.99-2.03.35.31.74.57 1.16.78.43.21.89.35 1.37.42.48.06.96.04 1.43-.07.47-.11.91-.31 1.3-.58.39-.28.72-.63.97-1.04.25-.42.41-.89.47-1.38.06-.49.02-.99-.12-1.46-.14-.47-.38-.9-.7-1.25-.32-.35-.72-.63-1.17-.8-.45-.18-.94-.25-1.43-.22-.49.03-.97.16-1.41.38-.44.22-.83.52-1.14.89z"/></svg>`;
      }
      if (n.includes('flutter')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24"><path fill="#02569B" d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37z"/><path fill="#0175C2" d="M14.286 10.37L7.98 16.677 11.686 20.38l6.3-6.3h3.7l-7.4-7.409v3.7z"/><path fill="#29B6F6" d="M11.686 20.38l3.7 3.62h7.4l-7.4-7.32-3.7 3.7z"/></svg>`;
      }
      if (n.includes('dart')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24"><path fill="#0175C2" d="M4.11 2.69l7.07 7.07L4.11 16.83l-1.42-1.42 5.66-5.65L2.69 4.11z"/><path fill="#02569B" d="M12.6 11.18l7.07 7.07-7.07 7.06-1.42-1.41 5.66-5.65-5.66-5.66z"/><path fill="#0175C2" d="M19.67 4.11l-7.07 7.07 7.07 7.07 1.42-1.41-5.66-5.65 5.66-5.66z"/><path fill="#29B6F6" d="M11.18 12.6l-7.07 7.07 7.07 7.07 1.42-1.42-5.66-5.65 5.66-5.66z"/></svg>`;
      }
      if (n.includes('firebase')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24"><path fill="#FFA000" d="M3.89 15.67L6.44 2.82c.07-.34.46-.48.72-.26l3.39 3.06-6.66 10.05z"/><path fill="#F57C00" d="M13.62 9.07l-3.07-3.45-6.66 10.05 9.73-6.6z"/><path fill="#FFCA28" d="M20.11 15.67l-2.55-12.85c-.07-.34-.46-.48-.72-.26l-3.22 3.19 6.49 9.92z"/><path fill="#FFA000" d="M3.89 15.67L12 22.88l8.11-7.21-3.69-5.6-4.42 2.95-6.11-4.02z"/></svg>`;
      }
      if (n.includes('next')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="#FFFFFF"><circle cx="12" cy="12" r="11" fill="#000000" stroke="#FFFFFF" stroke-width="1.5"/><path d="M14.5 8h2v8h-2v-4.5l-4.5 4.5h-1.5v-8h2v4.5L14.5 8z" fill="#FFFFFF"/></svg>`;
      }
      if (n.includes('tailwind')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="#38BDF8"><path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"/></svg>`;
      }
      if (n.includes('javascript') || n === 'js' || n.includes('es6')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path fill="#000000" d="M6.5 17.5c.5.8 1.4 1.3 2.5 1.3 1.3 0 2.1-.7 2.1-1.7 0-1.2-.8-1.6-2.2-2.2-2-.8-3.3-1.8-3.3-3.9 0-2 1.5-3.5 3.8-3.5 1.6 0 2.8.6 3.6 2l-1.7 1.1c-.4-.7-1-1.1-1.9-1.1-1 0-1.7.6-1.7 1.4 0 .9.6 1.3 2 1.9 2.2.9 3.5 1.9 3.5 4.2 0 2.4-1.8 3.8-4.3 3.8-2.4 0-3.9-1.2-4.6-2.6l2.2-.8zm9.5-9.8h2.3v7.9c0 1.9-.9 2.8-2.7 2.8-.8 0-1.6-.2-2.1-.6l.7-1.7c.4.3.7.4 1.2.4.7 0 1.1-.4 1.1-1.2V7.7h-.5z"/></svg>`;
      }
      if (n.includes('aws') || n.includes('cloud')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24"><path fill="#FF9900" d="M12 18.2c4.4 0 8.3-1.6 10.7-4.1.4-.4.2-1-.3-.7-3 1.9-6.8 3-10.4 3-3.7 0-7.3-1.1-10.3-3-.5-.3-.7.3-.3.7 2.4 2.5 6.2 4.1 10.3 4.1z"/><path fill="#FF9900" d="M22.8 13.5c-.3-.4-1.8-.2-2.7 0-.3.1-.3.3 0 .5.9.6 1.8 1.2 2.6 1.8.2.2.4.1.4-.1.1-.7.1-1.7-.3-2.2z"/><path fill="#FFFFFF" d="M7.1 12.3c-.6 0-1.1-.2-1.5-.6-.4-.4-.6-1-.6-1.7 0-.8.2-1.4.7-1.8.5-.4 1.1-.6 1.9-.6.7 0 1.3.1 1.8.3v-.4c0-.6-.1-1-.4-1.2-.3-.2-.7-.3-1.2-.3-.6 0-1.2.1-1.8.4-.2.1-.4 0-.5-.2l-.4-.8c-.1-.2 0-.4.2-.5.8-.4 1.7-.6 2.7-.6 1.1 0 1.9.3 2.5.8.6.5.9 1.3.9 2.4v4.4c0 .3.1.5.3.6.1.1.2.2.2.3 0 .1-.1.3-.3.3h-1.2c-.2 0-.3-.1-.4-.3l-.1-.5c-.6.6-1.4.9-2.2.9zm.6-1.5c.5 0 1-.2 1.4-.5.4-.3.6-.8.6-1.3v-.5c-.4-.2-.9-.3-1.5-.3-.5 0-.9.1-1.2.4-.3.2-.4.6-.4 1 0 .4.1.7.3.9.3.2.5.3.8.3z"/></svg>`;
      }
      if (n.includes('redis')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="#DC382D"><path d="M21.57 6.47L12.5.4a1 1 0 00-1 0L2.43 6.47a1 1 0 00-.43.83v9.4a1 1 0 00.43.83l9.07 6.07a1 1 0 001 0l9.07-6.07a1 1 0 00.43-.83v-9.4a1 1 0 00-.43-.83zM12 2.2l7.65 5.12-2.9 1.94L9.1 4.14 12 2.2zm-8 6.44l2.84-1.9 7.65 5.12-2.84 1.9L4 8.64zm8 13.16l-7.65-5.12V10.3l7.65 5.12v6.38zm1-6.38l7.65-5.12v6.38L13 21.8V15.42z"/></svg>`;
      }
      if (n.includes('system') || n.includes('admin') || n.includes('network') || n.includes('tcp') || n.includes('dns') || n.includes('linux')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`;
      }
      if (n.includes('git')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="#F05032"><path d="M23.546 10.93L13.067.452a1.5 1.5 0 00-2.124 0L8.831 2.564l3.199 3.2a1.787 1.787 0 011.696.425c.677.676.716 1.748.125 2.47l3.082 3.082a1.787 1.787 0 012.471.125 1.787 1.787 0 010 2.527 1.787 1.787 0 01-2.527 0 1.79 1.79 0 01-.176-2.316l-2.894-2.894v7.712a1.79 1.79 0 01.442.296 1.787 1.787 0 010 2.527 1.787 1.787 0 01-2.527 0 1.787 1.787 0 010-2.527 1.787 1.787 0 01.554-.373V9.612a1.787 1.787 0 01-.554-.373 1.79 1.79 0 01-.425-1.696L8.435 4.344.454 12.325a1.5 1.5 0 000 2.124l10.476 10.478a1.5 1.5 0 002.124 0l10.492-10.479a1.5 1.5 0 000-2.518z"/></svg>`;
      }
      if (n.includes('api') || n.includes('rest')) {
        return `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7c0-2.21 1.79-4 4-4v0c2.21 0 4 1.79 4 4v1c0 1.1-.9 2-2 2h-4c-1.1 0-2 .9-2 2v1c0 2.21 1.79 4 4 4v0c2.21 0 4-1.79 4-4"/><path d="M14 7c0-2.21 1.79-4 4-4v0c2.21 0 4 1.79 4 4v1c0 1.1-.9 2-2 2h-4c-1.1 0-2 .9-2 2v1c0 2.21 1.79 4 4 4v0c2.21 0 4-1.79 4-4"/><circle cx="12" cy="12" r="2" fill="#60A5FA"/></svg>`;
      }

      // Default: Modern Tech Chip Badge with first letter
      const initial = (name || 'S').trim().charAt(0).toUpperCase();
      return `<svg width="40" height="40" viewBox="0 0 24 24"><polygon points="12 2 21 7 21 17 12 22 3 17 3 7" fill="none" stroke="${color}" stroke-width="1.8"/><text x="12" y="16" fill="${color}" font-size="11" font-weight="800" font-family="sans-serif" text-anchor="middle">${initial}</text></svg>`;
    }

    // 4. Sync Skills & Tech Stack
    try {
      const res = await fetch(`${API_BASE}/skills`);
      if (res.ok) {
        const skills = await res.json();
        const marqueeGroups = document.querySelectorAll('.skills-marquee-group');
        if (marqueeGroups.length > 0 && Array.isArray(skills) && skills.length > 0) {
          const cardsHtml = skills.map(s => {
            const pct = s.proficiencyPct ?? s.level ?? 90;
            const color = s.iconColor || s.color || '#ff5018';
            const iconSvg = s.iconSvg && s.iconSvg.trim().startsWith('<svg') ? s.iconSvg : getTechSkillIcon(s.name, color);
            return `
              <div class="tech-card scroll-reveal" title="${escapeHtml(s.name)} — ${pct}% Proficiency (${escapeHtml(s.category || 'Core')})">
                <div class="tech-icon-wrap">
                  ${iconSvg}
                </div>
                <span class="tech-name">${escapeHtml(s.name)}</span>
              </div>
            `;
          }).join('');

          marqueeGroups.forEach(group => {
            group.innerHTML = cardsHtml;
          });
          initScrollReveal();
        }
      }
    } catch (err) {
      console.warn('Skills backend sync bypassed, keeping static preview:', err.message);
    }

    // 5. Sync Work Experience Timeline
    try {
      const res = await fetch(`${API_BASE}/experience`);
      if (res.ok) {
        const experiences = await res.json();
        const stepsMatrix = document.querySelector('.timeline-steps-matrix');
        if (stepsMatrix && Array.isArray(experiences) && experiences.length > 0) {
          // Minimal line SVG icons matching modern roadmap reference UI
          const TIMELINE_ICONS = [
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>',
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path></svg>',
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"></rect><path d="M3 9h18"></path><path d="M9 21V9"></path></svg>',
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>',
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3L12 3z"></path></svg>',
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m18 16 4-4-4-4"></path><path d="m6 8-4 4 4 4"></path><path d="m14.5 4-5 16"></path></svg>'
          ];

          const timelineSteps = [];
          const sorted = [...experiences].sort((a, b) => (a.order ?? 1) - (b.order ?? 1));

          sorted.forEach((e) => {
            const isCur = Boolean(e.isCurrent || (e.duration && e.duration.toLowerCase().includes('present')));
            const mainBadge = isCur ? 'May 2026 – Present' : (e.duration ? e.duration.replace('-', '–') : (e.badge || 'Milestone'));
            const mainDesc = Array.isArray(e.description) ? e.description.join(' • ') : (e.description || '');

            // 1. Primary role milestone pill
            timelineSteps.push({
              iconIndex: isCur ? 3 : 0,
              label: `${e.company} — ${e.role}`,
              badge: mainBadge,
              isCurrent: isCur,
              title: `${e.company} (${e.duration || e.period || ''}): ${mainDesc}`
            });

            // 2. Sub-milestones / key highlights
            if (Array.isArray(e.highlights) && e.highlights.length > 0) {
              e.highlights.forEach((h, hIdx) => {
                let hBadge = 'Core Impact';
                const lower = h.toLowerCase();
                let iconIdx = isCur ? (hIdx === 0 ? 4 : 5) : (hIdx === 0 ? 1 : 2);

                if (lower.includes('tcp') || lower.includes('network') || lower.includes('systems admin') || lower.includes('infrastructure')) {
                  hBadge = 'Infrastructure';
                  iconIdx = 1;
                } else if (lower.includes('ai') || lower.includes('automation') || lower.includes('mern') || lower.includes('laravel')) {
                  hBadge = 'Full-Stack & AI';
                  iconIdx = 2;
                } else if (lower.includes('frontend') || lower.includes('react') || lower.includes('modern web') || lower.includes('services')) {
                  hBadge = 'Modern Web';
                  iconIdx = 4;
                } else if (lower.includes('database') || lower.includes('sql') || lower.includes('query') || lower.includes('sla') || lower.includes('sprint')) {
                  hBadge = 'Database & SLA';
                  iconIdx = 5;
                }

                timelineSteps.push({
                  iconIndex: iconIdx,
                  label: h,
                  badge: hBadge,
                  isCurrent: false,
                  title: `${e.company} Key Deliverable: ${h}`
                });
              });
            }
          });

          // Render into staggered rows matching the 4-column reference layout
          stepsMatrix.innerHTML = timelineSteps.map((step, idx) => {
            const rowClass = `step-row-${(idx % 6) + 1}`;
            const svgIcon = TIMELINE_ICONS[step.iconIndex % TIMELINE_ICONS.length];

            return `
              <div class="step-row ${rowClass}">
                <div class="step-pill ${step.isCurrent ? 'step-pill-current' : ''}" title="${escapeHtml(step.title)}">
                  <span class="step-icon">${svgIcon}</span>
                  <span class="step-label">${escapeHtml(step.label)}</span>
                  <span class="step-badge ${step.isCurrent ? 'step-badge-active' : ''}">
                    ${step.isCurrent ? '<span class="live-dot">●</span> ' : ''}${escapeHtml(step.badge)}
                  </span>
                </div>
              </div>
            `;
          }).join('');

          initScrollReveal();
        }
      }
    } catch (err) {
      console.warn('Experience backend sync bypassed, keeping static preview:', err.message);
    }
  }

  function escapeHtml(text) {
    if (!text) return '';
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHomeDynamicContent);
  } else {
    loadHomeDynamicContent();
  }
})();


// Show More / Show Less for Recommendations / Testimonials
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.testimonial-more-btn');
  if (!btn) return;
  e.preventDefault();

  const parent = btn.closest('.testimonial-quote-wrap') || btn.closest('.testimonial-card');
  if (!parent) return;

  const quote = parent.querySelector('.testimonial-quote');
  if (!quote) return;

  const isExpanded = quote.classList.toggle('is-expanded');
  btn.classList.toggle('is-active', isExpanded);
  btn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');

  const textSpan = btn.querySelector('.more-text');
  if (textSpan) {
    textSpan.textContent = isExpanded ? 'Show less' : 'Show more';
  }
});

// Smooth in-page anchor navigation for header links (e.g. clicking Certificates)
document.addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  const targetId = link.getAttribute('href');
  if (!targetId || targetId === '#' || targetId === '#home') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (history.pushState) {
      history.pushState(null, '', window.location.pathname);
    }
    return;
  }

  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    e.preventDefault();
    targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (history.pushState) {
      history.pushState(null, '', targetId);
    } else {
      window.location.hash = targetId;
    }
  }
});

// Smooth scroll to target if page is loaded with hash like #certificates
window.addEventListener('DOMContentLoaded', () => {
  if (window.location.hash) {
    const targetElement = document.querySelector(window.location.hash);
    if (targetElement) {
      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 350);
    }
  }
});

/* ==========================================================================
   MOBILE HAMBURGER MENU & SCROLLED NAVBAR LOGIC
   ========================================================================== */
(() => {
  const initNavInteractions = () => {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    const mobileBackdrop = document.getElementById('mobileNavBackdrop');
    const mobileDrawerClose = document.getElementById('mobileDrawerClose');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-btn-cta');
    const navbar = document.getElementById('mainNavbar') || document.querySelector('.navbar');

    // Scrolled Navbar background blur state
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

    // Close drawer when an anchor link is clicked and smoothly navigate
    mobileLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        const targetId = link.getAttribute('data-target') || (href && href.startsWith('#') ? href : null);

        closeDrawer();

        if (targetId) {
          if (targetId === '#' || targetId === '#home') {
            e.preventDefault();
            setTimeout(() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              if (history.pushState) history.pushState(null, '', window.location.pathname);
            }, 120);
            return;
          }

          const targetEl = document.querySelector(targetId);
          if (targetEl) {
            e.preventDefault();
            setTimeout(() => {
              targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
              if (history.pushState) {
                history.pushState(null, '', targetId);
              }
            }, 120);
          }
        }
      });
    });

    const drawerBrand = document.querySelector('.mobile-drawer-brand');
    if (drawerBrand) {
      drawerBrand.addEventListener('click', (e) => {
        e.preventDefault();
        closeDrawer();
        window.scrollTo({ top: 0, behavior: 'smooth' });
        if (history.pushState) history.pushState(null, '', window.location.pathname);
      });
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initNavInteractions);
  } else {
    initNavInteractions();
  }
})();

