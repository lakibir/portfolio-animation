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

    // Search outwards for nearest loaded frame
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
      // If the newly loaded frame is what we are currently looking at, redraw immediately
      const currentRounded = Math.round(currentFrame);
      if (lastDrawnActualIndex !== currentRounded && Math.abs(index - currentRounded) < Math.abs(lastDrawnActualIndex - currentRounded)) {
        renderCurrentFrame();
      }
    };

    img.src = getFrameSrc(index);
  };

  // Smart priority preloading strategy
  const startPreloading = () => {
    // 1. Immediately load frame 0 for instant initial display
    loadImage(0);

    // 2. Load evenly spaced anchor frames across the timeline so fast scrolling is responsive
    const step = 10;
    for (let i = step; i < FRAME_COUNT; i += step) {
      loadImage(i);
    }

    // 3. Progressively load all remaining frames in order
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

  // Continuous animation loop for smooth linear interpolation (LERP)
  const animate = () => {
    // Smoothly step towards target frame
    currentFrame += (targetFrame - currentFrame) * lerpFactor;

    renderCurrentFrame();

    requestAnimationFrame(animate);
  };

  // Initialize
  window.addEventListener('resize', resizeCanvas);
  window.addEventListener('scroll', onScroll, { passive: true });
  resizeCanvas();
  onScroll();
  startPreloading();
  requestAnimationFrame(animate);

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

      try {
        const res = await fetch('/api/contact', {
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

  // Dynamic MongoDB Backend Sync for Home Page
  async function loadHomeDynamicContent() {
    // 1. Sync Featured Projects Showcase
    try {
      const res = await fetch('/api/projects');
      if (res.ok) {
        const projects = await res.json();
        const grid = document.querySelector('.showcase-grid');
        if (grid && Array.isArray(projects) && projects.length > 0) {
          // Take top 4 featured or ordered projects
          const featured = projects.slice(0, 4);
          grid.innerHTML = featured.map(p => `
            <div class="showcase-card scroll-reveal">
              <div class="card-image-wrapper">
                <img src="${p.image || 'image/project-mern.jpg'}" alt="${escapeHtml(p.title)}" class="card-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80'">
                <div class="card-img-overlay"></div>
                <div class="showcase-card-badges">
                  <span class="showcase-cat-pill">${escapeHtml(p.category || 'Full-Stack')}</span>
                  <span class="showcase-live-pill"><span class="status-dot"></span> Live</span>
                </div>
              </div>
              <div class="showcase-info-panel">
                <div class="showcase-header-group">
                  <span class="showcase-project-subtitle">${escapeHtml(p.subtitle || 'Enterprise Architecture')}</span>
                  <h3 class="showcase-project-title">${escapeHtml(p.title)}</h3>
                </div>
                <p class="showcase-project-desc">${escapeHtml(p.description || '')}</p>
                ${p.metrics ? `<div class="showcase-metric-pill">${escapeHtml(p.metrics)}</div>` : ''}
                <div class="showcase-tech-chips">
                  ${(p.tags || ['Node.js', 'MongoDB', 'React']).slice(0, 6).map(t => `<span class="mini-tech-pill">${escapeHtml(t)}</span>`).join('')}
                </div>
                <a href="projects.html" class="showcase-explore-btn">
                  <span>View Full System Details</span>
                  <span class="arrow">↗</span>
                </a>
              </div>
            </div>
          `).join('');
          initScrollReveal();
        }
      }
    } catch (err) {
      console.warn('Home projects backend sync bypassed, keeping static preview:', err.message);
    }

    // 2. Sync Client Testimonials
    try {
      const res = await fetch('/api/testimonials');
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
                    <span class="author-role">${escapeHtml(t.position || t.role || '')} ${t.company ? 'at ' + escapeHtml(t.company) : ''}</span>
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
