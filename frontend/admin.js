/**
 * admin.js — Full Node.js & MongoDB Administrative Management System
 * Supports full CRUD (Create, Read, Update, Delete) across Projects, Certifications,
 * Skills, Work Experience, Client Testimonials, Inquiries Inbox, and CV / Resume Management.
 */

// Automatically resolve backend API URL (supports local, Vercel, and Render deployments)
const API_BASE = typeof getPortfolioApiBase === 'function' ? getPortfolioApiBase() : (() => {
  if (typeof window !== 'undefined' && window.location) {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';
    if (isLocal && window.location.port && window.location.port !== '5000') {
      return 'http://localhost:5000/api';
    }
  }
  return '/api';
})();

// Current State
let currentTab = 'projects';
let cache = {
  projects: [],
  certificates: [],
  skills: [],
  experience: [],
  testimonials: [],
  messages: [],
  cv: null
};

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(message, isError = false) {
  const toast = document.getElementById('admin-toast');
  const toastMsg = document.getElementById('toast-msg');
  if (!toast) return;

  toastMsg.textContent = message;
  toast.style.borderColor = isError ? '#ef4444' : '#10b981';
  toast.style.background = isError ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.25)';
  toast.style.display = 'flex';
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
    toast.style.display = 'none';
  }, 3500);
}

// ==========================================
// KPI & BADGE COUNTERS & DB STATUS
// ==========================================
async function refreshStats() {
  const dbStatusText = document.getElementById('db-status-text');
  const dbStatusPill = document.getElementById('db-status-pill');

  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const stats = await res.json();

    // Update DB status to green online
    if (dbStatusText) dbStatusText.textContent = 'MongoDB Online';
    if (dbStatusPill) {
      dbStatusPill.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      dbStatusPill.style.color = '#10b981';
    }

    // KPI cards
    setElText('stat-projects', stats.projects ?? 0);
    setElText('stat-certs', stats.certificates ?? 0);
    setElText('stat-skills', stats.skills ?? 0);
    setElText('stat-exp', stats.experience ?? 0);
    setElText('stat-testimonials', stats.testimonials ?? 0);
    setElText('stat-messages', stats.totalMessages ?? 0);
    setElText('stat-cv', stats.cv ? 'Active' : 'Ready');

    // Tab badges
    setElText('badge-projects', stats.projects ?? 0);
    setElText('badge-certs', stats.certificates ?? 0);
    setElText('badge-skills', stats.skills ?? 0);
    setElText('badge-exp', stats.experience ?? 0);
    setElText('badge-testimonials', stats.testimonials ?? 0);
    setElText('badge-messages', stats.unreadMessages !== undefined ? `${stats.unreadMessages} new` : (stats.totalMessages ?? 0));
    setElText('badge-cv', 'Active');
  } catch (err) {
    console.error('Failed to load stats:', err);
    if (dbStatusText) dbStatusText.textContent = 'Server Offline (Run npm start)';
    if (dbStatusPill) {
      dbStatusPill.style.borderColor = 'rgba(239, 68, 68, 0.4)';
      dbStatusPill.style.color = '#ef4444';
    }
  }
}

function setElText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

// ==========================================
// TAB SWITCHING
// ==========================================
function switchTab(tabName) {
  currentTab = tabName;

  // Toggle Tab Buttons
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabName);
  });

  // Toggle Sections
  const sectionIds = {
    projects: 'sec-projects',
    certificates: 'sec-certificates',
    skills: 'sec-skills',
    experience: 'sec-experience',
    testimonials: 'sec-testimonials',
    messages: 'sec-messages',
    cv: 'sec-cv'
  };

  Object.entries(sectionIds).forEach(([key, secId]) => {
    const sec = document.getElementById(secId);
    if (sec) sec.classList.toggle('active', key === tabName);
  });

  loadTabData(tabName);
}

// ==========================================
// DATA FETCHING & RENDERING
// ==========================================
async function loadTabData(tabName = currentTab) {
  if (tabName === 'cv') {
    return loadCvData();
  }

  const endpoint = tabName === 'messages' ? 'contact' : tabName;
  try {
    const res = await fetch(`${API_BASE}/${endpoint}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    cache[tabName] = data;

    renderTable(tabName, data);
    refreshStats();
  } catch (err) {
    console.error(`Failed to load ${tabName}:`, err);
    showToast(`Failed to load ${tabName}: ${err.message}`, true);
  }
}

function renderTable(tabName, data) {
  switch (tabName) {
    case 'projects':
      renderProjects(data);
      break;
    case 'certificates':
      renderCertificates(data);
      break;
    case 'skills':
      renderSkills(data);
      break;
    case 'experience':
      renderExperience(data);
      break;
    case 'testimonials':
      renderTestimonials(data);
      break;
    case 'messages':
      renderMessages(data);
      break;
  }
}

// 1. Projects Table
function renderProjects(items) {
  const tbody = document.getElementById('projects-table-body');
  if (!tbody) return;

  if (!items || items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--color-text-dim); padding: 30px;">No projects found in MongoDB. Click "+ Add New Project" to add one.</td></tr>`;
    return;
  }

  tbody.innerHTML = items.map(p => {
    const tech = (p.tags && p.tags.length ? p.tags : (p.techStack || []));
    const feats = Array.isArray(p.features) && p.features.length ? p.features : (Array.isArray(p.highlights) ? p.highlights.map(h => typeof h === 'object' ? (h.val || h.label) : h) : []);
    const live = p.liveUrl || p.liveDemoUrl || '';
    const gh = p.githubUrl || '';
    return `
      <tr>
        <td>
          <img src="${escapeHtml(p.image || 'image/project-mern.jpg')}" style="width: 52px; height: 38px; object-fit: cover; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1);" onerror="this.src='https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&q=80'">
        </td>
        <td>
          <strong style="color: #ffffff;">${escapeHtml(p.title)}</strong>
          <div style="font-size: 12px; color: var(--color-text-dim); margin-top: 2px;">${escapeHtml(p.subtitle || '')}</div>
        </td>
        <td><span class="table-badge badge-primary">${escapeHtml(p.category || 'General')}</span></td>
        <td>
          <div style="display: flex; flex-wrap: wrap; gap: 4px; max-width: 180px;">
            ${tech.slice(0, 3).map(t => `<span class="table-badge badge-neutral" style="font-size: 10px;">${escapeHtml(t)}</span>`).join('')}
            ${tech.length > 3 ? `<span style="font-size: 10px; color: var(--color-text-dim);">+${tech.length - 3}</span>` : ''}
          </div>
        </td>
        <td>
          <div style="display: flex; flex-direction: column; gap: 4px; font-size: 11px;">
            ${gh ? `<a href="${escapeHtml(gh)}" target="_blank" style="color: #ff7a59; display: inline-flex; align-items: center; gap: 4px; text-decoration: none;"><span>🐙 GitHub</span> ↗</a>` : `<span style="color: var(--color-text-dim);">No Repo</span>`}
            ${live ? `<a href="${escapeHtml(live)}" target="_blank" style="color: #10b981; display: inline-flex; align-items: center; gap: 4px; text-decoration: none;"><span>🚀 Live</span> ↗</a>` : ''}
          </div>
        </td>
        <td>
          <div style="max-width: 200px;">
            ${feats.length > 0
              ? `<span class="table-badge badge-success" style="font-size: 11px;">⚡ ${feats.length} Features</span>
                 <div style="font-size: 11px; color: var(--color-text-dim); margin-top: 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${escapeHtml(feats[0])}</div>`
              : `<span style="font-size: 11px; color: var(--color-text-dim); font-style: italic;">None</span>`}
          </div>
        </td>
        <td>
          <div class="table-actions">
            <button class="btn-action edit" onclick="editProject('${p._id}')" title="Edit">✎</button>
            <button class="btn-action delete" onclick="deleteItem('projects', '${p._id}')" title="Delete">🗑</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// 2. Certificates Table
function renderCertificates(items) {
  const tbody = document.getElementById('certs-table-body');
  if (!tbody) return;

  if (!items || items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--color-text-dim); padding: 30px;">No certificates found. Click "+ Add New Certificate" to add your verified credentials.</td></tr>`;
    return;
  }

  tbody.innerHTML = items.map(c => `
    <tr>
      <td><strong style="color: #ffffff;">${escapeHtml(c.title)}</strong></td>
      <td><span class="table-badge badge-primary">${escapeHtml(c.issuer)}</span></td>
      <td style="font-family: monospace; font-size: 12px; color: #ff7a59;">${escapeHtml(c.credentialId || 'VERIFIED')}</td>
      <td>${escapeHtml(c.issueYear || c.year || c.issueDate || '2024')}</td>
      <td><span class="table-badge badge-success">${escapeHtml(c.status || 'Active • Verified')}</span></td>
      <td>
        <div class="table-actions">
          <button class="btn-action edit" onclick="editCertificate('${c._id}')" title="Edit">✎</button>
          <button class="btn-action delete" onclick="deleteItem('certificates', '${c._id}')" title="Delete">🗑</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// 3. Skills Table
function renderSkills(items) {
  const tbody = document.getElementById('skills-table-body');
  if (!tbody) return;

  if (!items || items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--color-text-dim); padding: 30px;">No skills registered. Click "+ Add New Skill" to register technologies.</td></tr>`;
    return;
  }

  tbody.innerHTML = items.map(s => {
    const pct = s.proficiencyPct ?? s.level ?? 85;
    const color = s.iconColor || s.color || '#ff5018';
    return `
      <tr>
        <td>
          <strong style="color: #ffffff;">${escapeHtml(s.name)}</strong>
        </td>
        <td><span class="table-badge badge-neutral">${escapeHtml(s.category || 'General')}</span></td>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <div style="flex: 1; max-width: 140px; height: 6px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden;">
              <div style="width: ${pct}%; height: 100%; background: ${color}; border-radius: 99px;"></div>
            </div>
            <span style="font-size: 12px; font-weight: 600; color: #ffffff;">${pct}%</span>
          </div>
        </td>
        <td>
          <div class="table-actions">
            <button class="btn-action edit" onclick="editSkill('${s._id}')" title="Edit">✎</button>
            <button class="btn-action delete" onclick="deleteItem('skills', '${s._id}')" title="Delete">🗑</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// Rank Preset Helper
window.setRankBadge = function(badgeText) {
  const badgeInput = document.getElementById('e-badge');
  if (badgeInput) {
    badgeInput.value = badgeText;
    badgeInput.focus();
    showToast(`Rank badge selected: "${badgeText}"`);
  }
};

// 4. Experience Table
function renderExperience(items) {
  const tbody = document.getElementById('experience-table-body');
  if (!tbody) return;

  if (!items || items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; color: var(--color-text-dim); padding: 30px;">No experience records found. Click "+ Add Experience" to add career history.</td></tr>`;
    return;
  }

  tbody.innerHTML = items.map((e, idx) => {
    const isCur = Boolean(e.isCurrent || (e.duration && e.duration.toLowerCase().includes('present')));
    const icon = e.icon || (isCur ? '🚀' : '🏛️');
    const hList = Array.isArray(e.highlights) ? e.highlights : [];
    const highlightsCount = hList.length;
    const highlightsPreview = hList.slice(0, 2).map(h => `<div style="font-size: 11px; color: var(--color-text-dim); text-overflow: ellipsis; overflow: hidden; white-space: nowrap; max-width: 240px;">• ${escapeHtml(h)}</div>`).join('');
    const moreHighlights = highlightsCount > 2 ? `<div style="font-size: 10px; color: #ff7a59; margin-top: 2px;">+${highlightsCount - 2} more impact points</div>` : '';

    const rankNum = e.order ?? (idx + 1);
    let rankBadgeHtml = `<div class="rank-badge-pill rank-badge-standard">RANK #${rankNum}</div>`;
    if (rankNum === 1 || isCur) {
      rankBadgeHtml = `<div class="rank-badge-pill rank-badge-gold"><span>🥇</span> <strong>RANK #1</strong></div>`;
    } else if (rankNum === 2) {
      rankBadgeHtml = `<div class="rank-badge-pill rank-badge-silver"><span>🥈</span> <strong>RANK #2</strong></div>`;
    } else if (rankNum === 3) {
      rankBadgeHtml = `<div class="rank-badge-pill rank-badge-bronze"><span>🥉</span> <strong>RANK #3</strong></div>`;
    }

    const postLabel = e.badge || (isCur ? '🥇 Rank #1 • Current Focus' : `Rank #${rankNum} Milestone`);

    return `
      <tr>
        <td>
          ${rankBadgeHtml}
        </td>
        <td>
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 20px; line-height: 1;">${escapeHtml(icon)}</span>
            <div>
              <strong style="color: #ffffff; display: block; font-size: 14px;">${escapeHtml(e.role)}</strong>
              <span style="font-size: 12px; color: #a5b4fc;">${escapeHtml(e.company)}</span>
            </div>
          </div>
        </td>
        <td>
          <div style="display: inline-flex; align-items: center; gap: 6px; padding: 4px 11px; border-radius: 999px; background: rgba(255,80,24,0.12); border: 1px solid rgba(255,80,24,0.35); color: #ff7a59; font-size: 11.5px; font-weight: 700; letter-spacing: 0.02em; white-space: nowrap;">
            <span>🎖️</span>
            <span>${escapeHtml(postLabel)}</span>
          </div>
        </td>
        <td>
          <div style="font-size: 13px; font-weight: 600; color: #ffffff;">${escapeHtml(e.duration || e.period || '2023 - Present')}</div>
          <div style="font-size: 11px; color: var(--color-text-dim); margin-top: 2px;">📍 ${escapeHtml(e.location || 'Addis Ababa, Ethiopia')}</div>
        </td>
        <td>
          ${isCur
            ? `<span class="table-badge badge-success" style="display: inline-flex; align-items: center; gap: 5px;"><span class="status-dot"></span> Active • Live</span>`
            : `<span class="table-badge" style="background: rgba(255,255,255,0.06); color: var(--color-text-dim);">Milestone</span>`
          }
        </td>
        <td style="max-width: 250px;">
          ${highlightsCount > 0 ? (highlightsPreview + moreHighlights) : `<span style="font-size: 11px; color: var(--color-text-dim); font-style: italic;">No bullet points</span>`}
        </td>
        <td>
          <div class="table-actions">
            <button class="btn-action edit" onclick="editExperience('${e._id}')" title="Edit Experience">✎</button>
            <button class="btn-action delete" onclick="deleteItem('experience', '${e._id}')" title="Delete Experience">🗑</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// 5. Testimonials Table
function renderTestimonials(items) {
  const tbody = document.getElementById('testimonials-table-body');
  if (!tbody) return;

  if (!items || items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--color-text-dim); padding: 30px;">No client testimonials registered. Click "+ Add Testimonial" to add testimonials.</td></tr>`;
    return;
  }

  tbody.innerHTML = items.map(t => `
    <tr>
      <td><strong style="color: #ffffff;">${escapeHtml(t.name)}</strong></td>
      <td>
        <div style="font-size: 13px; color: #ffffff;">${escapeHtml(t.role || t.position || '')}</div>
        <div style="font-size: 11px; color: var(--color-text-dim);">${escapeHtml(t.company || '')}</div>
      </td>
      <td style="max-width: 320px; font-size: 12px; color: #cbd5e1; font-style: italic;">
        "${escapeHtml(t.quote)}"
      </td>
      <td>
        <div class="table-actions">
          <button class="btn-action edit" onclick="editTestimonial('${t._id}')" title="Edit">✎</button>
          <button class="btn-action delete" onclick="deleteItem('testimonials', '${t._id}')" title="Delete">🗑</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// 6. Messages Table
function renderMessages(items) {
  const tbody = document.getElementById('messages-table-body');
  if (!tbody) return;

  if (!items || items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--color-text-dim); padding: 30px;">No inquiries received yet.</td></tr>`;
    return;
  }

  tbody.innerHTML = items.map(m => `
    <tr style="${!m.read ? 'background: rgba(255, 80, 24, 0.05);' : ''}">
      <td><strong style="color: #ffffff;">${escapeHtml(m.name)}</strong></td>
      <td><a href="mailto:${escapeHtml(m.email)}" style="color: #ff7a59; text-decoration: none;">${escapeHtml(m.email)}</a></td>
      <td style="max-width: 280px; font-size: 12px; color: #cbd5e1;">${escapeHtml(m.message)}</td>
      <td style="font-size: 12px; color: var(--color-text-dim);">${new Date(m.createdAt).toLocaleDateString()}</td>
      <td>
        <button class="table-badge ${m.read ? 'badge-neutral' : 'badge-primary'}" onclick="toggleMessageRead('${m._id}', ${!m.read})" style="cursor: pointer; border: none;">
          ${m.read ? 'Read' : 'New • Mark Read'}
        </button>
      </td>
      <td>
        <div class="table-actions">
          <a href="mailto:${m.email}?subject=Re: Portfolio Inquiry" class="btn-action edit" title="Reply">✉</a>
          <button class="btn-action delete" onclick="deleteItem('contact', '${m._id}')" title="Delete">🗑</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// Toggle Message Read
async function toggleMessageRead(id, status) {
  try {
    const res = await fetch(`${API_BASE}/contact/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ read: status })
    });
    if (!res.ok) throw new Error('Status update failed');
    showToast(`Marked as ${status ? 'read' : 'unread'}`);
    loadTabData('messages');
  } catch (err) {
    showToast(err.message, true);
  }
}

// ==========================================
// CV / RESUME MANAGER
// ==========================================
async function loadCvData() {
  try {
    const res = await fetch(`${API_BASE}/cv`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const cv = await res.json();
    cache.cv = cv;

    // Populate Info card
    setElText('cv-filename', cv.fileName || 'lekibir-resume.jpg');
    setElText('cv-filesize', cv.fileSize || '216 KB');
    setElText('cv-filetype', cv.fileType || 'image/jpeg');
    setElText('cv-updated', cv.uploadedAt ? new Date(cv.uploadedAt).toLocaleString() : 'Active');

    const statusBadge = document.getElementById('cv-status-badge');
    if (statusBadge) {
      statusBadge.textContent = cv.isDefault ? 'Default Resume' : 'Custom Upload';
    }

    const urlDisplay = document.getElementById('cv-fileurl-display');
    if (urlDisplay) urlDisplay.value = cv.fileUrl || 'image/credentials/lekibir-resume.jpg';

    const cleanUrl = cv.fileUrl || 'image/credentials/lekibir-resume.jpg';
    const timestamp = cv.timestamp || (cv.uploadedAt ? new Date(cv.uploadedAt).getTime() : Date.now());
    const displayUrl = cleanUrl.startsWith('http') ? cleanUrl : (cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`);
    const busterUrl = cv.directUrl || `${displayUrl}${displayUrl.includes('?') ? '&' : '?'}t=${timestamp}`;

    // Top buttons
    const btnExt = document.getElementById('btn-view-cv-ext');
    if (btnExt) btnExt.href = busterUrl;

    // Populate Custom URL form with current value if external
    const customUrlInput = document.getElementById('cv-custom-url');
    if (customUrlInput && cv.fileUrl && cv.fileUrl.startsWith('http')) {
      customUrlInput.value = cv.fileUrl;
    }

    // Render Preview
    const previewWrap = document.getElementById('cv-preview-frame-wrap');
    if (previewWrap) {
      const isPdf = cleanUrl.toLowerCase().endsWith('.pdf');
      if (isPdf) {
        previewWrap.innerHTML = `<iframe src="${busterUrl}" class="cv-preview-iframe" title="CV Document Preview"></iframe>`;
      } else {
        previewWrap.innerHTML = `
          <img src="${busterUrl}" alt="CV Preview" class="cv-preview-img" onerror="this.src='image/credentials/lekibir-resume.jpg'">
        `;
      }
    }

    refreshStats();
  } catch (err) {
    console.error('Failed to load CV data:', err);
    showToast(`Failed to load CV data: ${err.message}`, true);
  }
}

// Copy CV URL to Clipboard
document.getElementById('btn-copy-cv-link')?.addEventListener('click', () => {
  const urlDisplay = document.getElementById('cv-fileurl-display');
  if (urlDisplay) {
    const fullUrl = urlDisplay.value.startsWith('http')
      ? urlDisplay.value
      : `${window.location.origin}/${urlDisplay.value.replace(/^\//, '')}`;
    navigator.clipboard.writeText(fullUrl).then(() => {
      showToast('CV link copied to clipboard!');
    }).catch(() => {
      showToast('Could not copy link to clipboard', true);
    });
  }
});

// CV File Drag and Drop & Input change
const cvFileInput = document.getElementById('cv-file-input');
const cvDropZone = document.getElementById('cv-drop-zone');
const cvDropLabel = document.getElementById('cv-drop-label');
const btnUploadCvSubmit = document.getElementById('btn-upload-cv-submit');

if (cvFileInput) {
  cvFileInput.addEventListener('change', () => {
    if (cvFileInput.files && cvFileInput.files[0]) {
      const file = cvFileInput.files[0];
      if (cvDropLabel) cvDropLabel.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      if (btnUploadCvSubmit) btnUploadCvSubmit.disabled = false;
    }
  });
}

if (cvDropZone) {
  ['dragenter', 'dragover'].forEach(name => {
    cvDropZone.addEventListener(name, (e) => {
      e.preventDefault();
      cvDropZone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(name => {
    cvDropZone.addEventListener(name, (e) => {
      e.preventDefault();
      cvDropZone.classList.remove('dragover');
    });
  });

  cvDropZone.addEventListener('drop', (e) => {
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      cvFileInput.files = e.dataTransfer.files;
      const file = e.dataTransfer.files[0];
      if (cvDropLabel) cvDropLabel.textContent = `Selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`;
      if (btnUploadCvSubmit) btnUploadCvSubmit.disabled = false;
    }
  });
}

// CV File Upload Form Submit
document.getElementById('form-cv-upload')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!cvFileInput.files || !cvFileInput.files[0]) {
    showToast('Please select a file first', true);
    return;
  }

  const formData = new FormData();
  formData.append('cvFile', cvFileInput.files[0]);

  if (btnUploadCvSubmit) {
    btnUploadCvSubmit.disabled = true;
    btnUploadCvSubmit.innerHTML = '<span>Uploading...</span>';
  }

  try {
    const res = await fetch(`${API_BASE}/cv/upload`, {
      method: 'POST',
      body: formData
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Upload failed');
    showToast('Resume uploaded and applied to portfolio successfully!');
    if (cvDropLabel) cvDropLabel.textContent = 'Click or Drag & Drop to Choose File';
    cvFileInput.value = '';
    loadCvData();
  } catch (err) {
    showToast(err.message, true);
  } finally {
    if (btnUploadCvSubmit) {
      btnUploadCvSubmit.disabled = true;
      btnUploadCvSubmit.innerHTML = '<span>Upload & Apply to Portfolio</span>';
    }
  }
});

// CV Custom URL Form Submit
document.getElementById('form-cv-url')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const customUrl = document.getElementById('cv-custom-url').value.trim();
  if (!customUrl) {
    showToast('Please enter a valid link', true);
    return;
  }

  try {
    const res = await fetch(`${API_BASE}/cv`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fileUrl: customUrl, fileName: 'External Hosted Resume' })
    });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Failed to update URL');
    showToast('External resume link updated successfully!');
    loadCvData();
  } catch (err) {
    showToast(err.message, true);
  }
});

// Reset CV to Default
document.getElementById('btn-reset-cv')?.addEventListener('click', async () => {
  if (!confirm('Reset resume to the default original portfolio document?')) return;
  try {
    const res = await fetch(`${API_BASE}/cv/reset`, { method: 'POST' });
    const result = await res.json();
    if (!res.ok) throw new Error(result.error || 'Reset failed');
    showToast('Resume restored to default portfolio version!');
    loadCvData();
  } catch (err) {
    showToast(err.message, true);
  }
});

// ==========================================
// MODAL CONTROLLERS & FORM SUBMISSIONS
// ==========================================
function closeModals() {
  document.querySelectorAll('.admin-modal-overlay').forEach(m => m.classList.remove('active'));
}

// 1. Project Modal
function openProjectModal() {
  document.getElementById('project-modal-heading').textContent = 'Add New Project';
  document.getElementById('p-id').value = '';
  document.getElementById('form-project').reset();
  const ghInput = document.getElementById('p-github');
  if (ghInput) ghInput.value = '';
  const featInput = document.getElementById('p-features');
  if (featInput) featInput.value = '';
  document.getElementById('modal-project').classList.add('active');
}

function editProject(id) {
  const p = cache.projects.find(item => item._id === id);
  if (!p) return;
  const tech = (p.tags && p.tags.length ? p.tags : (p.techStack || []));
  const feats = Array.isArray(p.features) && p.features.length ? p.features : (Array.isArray(p.highlights) ? p.highlights.map(h => typeof h === 'object' ? `${h.label}: ${h.val}` : h) : []);

  document.getElementById('project-modal-heading').textContent = `Edit Project: ${p.title}`;
  document.getElementById('p-id').value = p._id;
  document.getElementById('p-title').value = p.title || '';
  document.getElementById('p-category').value = p.category || '';
  document.getElementById('p-subtitle').value = p.subtitle || '';
  document.getElementById('p-desc').value = p.description || '';
  document.getElementById('p-image').value = p.image || '';
  document.getElementById('p-metrics').value = p.metrics || '';
  document.getElementById('p-tech').value = tech.join(', ');
  document.getElementById('p-demo').value = p.liveUrl || p.liveDemoUrl || p.demoUrl || '';

  const ghInput = document.getElementById('p-github');
  if (ghInput) ghInput.value = p.githubUrl || '';

  const featInput = document.getElementById('p-features');
  if (featInput) featInput.value = feats.join('\n');

  document.getElementById('modal-project').classList.add('active');
}

document.getElementById('form-project')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('p-id').value;
  const tagsArr = document.getElementById('p-tech').value.split(',').map(s => s.trim()).filter(Boolean);
  const liveVal = document.getElementById('p-demo').value.trim();
  const ghVal = document.getElementById('p-github') ? document.getElementById('p-github').value.trim() : '';
  const featText = document.getElementById('p-features') ? document.getElementById('p-features').value.trim() : '';
  const featuresArr = featText ? featText.split('\n').map(s => s.trim().replace(/^[-•*]\s*/, '')).filter(Boolean) : [];

  const payload = {
    title: document.getElementById('p-title').value.trim(),
    category: document.getElementById('p-category').value.trim(),
    subtitle: document.getElementById('p-subtitle').value.trim(),
    description: document.getElementById('p-desc').value.trim(),
    image: document.getElementById('p-image').value.trim() || 'image/project-mern.jpg',
    metrics: document.getElementById('p-metrics').value.trim(),
    tags: tagsArr,
    techStack: tagsArr,
    liveUrl: liveVal,
    liveDemoUrl: liveVal,
    githubUrl: ghVal,
    features: featuresArr
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_BASE}/projects/${id}` : `${API_BASE}/projects`;

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to save project');
    closeModals();
    showToast(`Project ${id ? 'updated' : 'created'} successfully!`);
    loadTabData('projects');
  } catch (err) {
    showToast(err.message, true);
  }
});

// 2. Certificate Modal
function openCertificateModal() {
  document.getElementById('cert-modal-heading').textContent = 'Add New Certificate';
  document.getElementById('c-id').value = '';
  document.getElementById('form-certificate').reset();
  document.getElementById('modal-certificate').classList.add('active');
}

function editCertificate(id) {
  const c = cache.certificates.find(item => item._id === id);
  if (!c) return;
  const skillsList = (c.skills && c.skills.length ? c.skills : (c.skillsTags || []));
  document.getElementById('cert-modal-heading').textContent = `Edit Certificate: ${c.title}`;
  document.getElementById('c-id').value = c._id;
  document.getElementById('c-title').value = c.title || '';
  document.getElementById('c-issuer').value = c.issuer || '';
  document.getElementById('c-cred-id').value = c.credentialId || '';
  document.getElementById('c-year').value = c.issueYear || c.year || c.issueDate || '';
  document.getElementById('c-valid').value = c.validUntil || '';
  document.getElementById('c-skills').value = skillsList.join(', ');
  document.getElementById('c-desc').value = c.description || '';
  document.getElementById('modal-certificate').classList.add('active');
}

document.getElementById('form-certificate')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('c-id').value;
  const yearVal = document.getElementById('c-year').value.trim();
  const skillsArr = document.getElementById('c-skills').value.split(',').map(s => s.trim()).filter(Boolean);

  const payload = {
    title: document.getElementById('c-title').value.trim(),
    issuer: document.getElementById('c-issuer').value.trim(),
    credentialId: document.getElementById('c-cred-id').value.trim(),
    issueYear: yearVal,
    year: yearVal,
    validUntil: document.getElementById('c-valid').value.trim(),
    skills: skillsArr,
    skillsTags: skillsArr,
    description: document.getElementById('c-desc').value.trim()
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_BASE}/certificates/${id}` : `${API_BASE}/certificates`;

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to save certificate');
    closeModals();
    showToast(`Certificate ${id ? 'updated' : 'saved'} successfully!`);
    loadTabData('certificates');
  } catch (err) {
    showToast(err.message, true);
  }
});

// 3. Skill Modal
function openSkillModal() {
  document.getElementById('skill-modal-heading').textContent = 'Add New Skill';
  document.getElementById('s-id').value = '';
  document.getElementById('form-skill').reset();
  document.getElementById('modal-skill').classList.add('active');
}

function editSkill(id) {
  const s = cache.skills.find(item => item._id === id);
  if (!s) return;
  document.getElementById('skill-modal-heading').textContent = `Edit Skill: ${s.name}`;
  document.getElementById('s-id').value = s._id;
  document.getElementById('s-name').value = s.name || '';
  document.getElementById('s-category').value = s.category || '';
  document.getElementById('s-pct').value = s.proficiencyPct ?? s.level ?? 90;
  document.getElementById('s-color').value = s.iconColor || s.color || '#ff5018';
  document.getElementById('modal-skill').classList.add('active');
}

document.getElementById('form-skill')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('s-id').value;
  const pctVal = Number(document.getElementById('s-pct').value) || 85;
  const colorVal = document.getElementById('s-color').value.trim() || '#ff5018';

  const payload = {
    name: document.getElementById('s-name').value.trim(),
    category: document.getElementById('s-category').value.trim() || 'General',
    proficiencyPct: pctVal,
    level: pctVal,
    iconColor: colorVal,
    color: colorVal
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_BASE}/skills/${id}` : `${API_BASE}/skills`;

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to save skill');
    closeModals();
    showToast(`Skill ${id ? 'updated' : 'saved'} successfully!`);
    loadTabData('skills');
  } catch (err) {
    showToast(err.message, true);
  }
});

// 4. Experience Modal
function openExperienceModal() {
  document.getElementById('exp-modal-heading').textContent = 'Add Work Experience';
  document.getElementById('e-id').value = '';
  document.getElementById('form-experience').reset();

  const startInput = document.getElementById('e-start-date');
  if (startInput) startInput.value = '';
  const endInput = document.getElementById('e-end-date');
  if (endInput) endInput.value = 'Present';

  const nextOrder = (cache.experience && cache.experience.length) ? cache.experience.length + 1 : 1;
  const orderInput = document.getElementById('e-order');
  if (orderInput) orderInput.value = nextOrder;

  const iconInput = document.getElementById('e-icon');
  if (iconInput) iconInput.value = '🚀';

  const curInput = document.getElementById('e-current');
  if (curInput) curInput.checked = true;

  const locInput = document.getElementById('e-location');
  if (locInput) locInput.value = 'Addis Ababa, Ethiopia';

  document.getElementById('modal-experience').classList.add('active');
}

function editExperience(id) {
  const ex = cache.experience.find(item => item._id === id);
  if (!ex) return;
  document.getElementById('exp-modal-heading').textContent = `Edit Experience: ${ex.role}`;
  document.getElementById('e-id').value = ex._id;
  document.getElementById('e-role').value = ex.role || '';
  document.getElementById('e-company').value = ex.company || '';

  // Separate start and end date extraction
  let startVal = ex.startDate || '';
  let endVal = ex.endDate || '';
  if (!startVal && (ex.duration || ex.period)) {
    const rawDur = ex.duration || ex.period || '';
    const parts = rawDur.split(/\s*[-–—]\s*/);
    startVal = parts[0] ? parts[0].trim() : '';
    endVal = parts[1] ? parts[1].trim() : (rawDur.toLowerCase().includes('present') ? 'Present' : '');
  }

  const startInput = document.getElementById('e-start-date');
  if (startInput) startInput.value = startVal;
  const endInput = document.getElementById('e-end-date');
  if (endInput) endInput.value = endVal || 'Present';

  const durInput = document.getElementById('e-duration');
  if (durInput) durInput.value = ex.duration || ex.period || '';

  document.getElementById('e-location').value = ex.location || '';
  document.getElementById('e-icon').value = ex.icon || '🚀';
  document.getElementById('e-badge').value = ex.badge || ex.duration || '';
  document.getElementById('e-order').value = ex.order ?? 1;

  const isCur = Boolean(ex.isCurrent || (endVal && endVal.toLowerCase().includes('present')) || (ex.duration && ex.duration.toLowerCase().includes('present')));
  const curCheckbox = document.getElementById('e-current');
  if (curCheckbox) curCheckbox.checked = isCur;

  document.getElementById('e-desc').value = Array.isArray(ex.description) ? ex.description.join('\n') : (ex.description || '');

  const hList = Array.isArray(ex.highlights) ? ex.highlights.join('\n') : '';
  const highlightsEl = document.getElementById('e-highlights');
  if (highlightsEl) highlightsEl.value = hList;

  document.getElementById('modal-experience').classList.add('active');
}

document.getElementById('form-experience')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('e-id').value;
  const descText = document.getElementById('e-desc').value.trim();

  const startVal = document.getElementById('e-start-date') ? document.getElementById('e-start-date').value.trim() : '';
  const endVal = document.getElementById('e-end-date') ? document.getElementById('e-end-date').value.trim() : '';
  const durVal = startVal && endVal ? `${startVal} – ${endVal}` : (startVal || endVal || 'Present');

  const highlightsEl = document.getElementById('e-highlights');
  const highlightsText = highlightsEl ? highlightsEl.value.trim() : '';

  const highlightsList = highlightsText
    ? highlightsText.split('\n').map(s => s.trim().replace(/^[-•*]\s*/, '')).filter(Boolean)
    : [];

  const curCheckbox = document.getElementById('e-current');
  const isCurrentChecked = curCheckbox ? curCheckbox.checked : (endVal.toLowerCase().includes('present'));

  const iconVal = document.getElementById('e-icon')?.value.trim() || '🚀';
  const badgeVal = document.getElementById('e-badge')?.value.trim() || durVal;
  const orderVal = parseInt(document.getElementById('e-order')?.value, 10) || 1;

  const payload = {
    role: document.getElementById('e-role').value.trim(),
    company: document.getElementById('e-company').value.trim(),
    startDate: startVal,
    endDate: endVal,
    duration: durVal,
    period: durVal,
    location: document.getElementById('e-location').value.trim() || 'Addis Ababa, Ethiopia',
    icon: iconVal,
    badge: badgeVal,
    order: orderVal,
    isCurrent: isCurrentChecked,
    description: descText,
    highlights: highlightsList
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_BASE}/experience/${id}` : `${API_BASE}/experience`;

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to save experience');
    closeModals();
    showToast(`Experience ${id ? 'updated' : 'saved'} successfully!`);
    loadTabData('experience');
  } catch (err) {
    showToast(err.message, true);
  }
});

// 5. Testimonial Modal
function openTestimonialModal() {
  document.getElementById('t-modal-heading').textContent = 'Add Testimonial';
  document.getElementById('t-id').value = '';
  document.getElementById('form-testimonial').reset();
  document.getElementById('modal-testimonial').classList.add('active');
}

function editTestimonial(id) {
  const t = cache.testimonials.find(item => item._id === id);
  if (!t) return;
  document.getElementById('t-modal-heading').textContent = `Edit Testimonial: ${t.name}`;
  document.getElementById('t-id').value = t._id;
  document.getElementById('t-name').value = t.name || '';
  document.getElementById('t-role').value = t.role || t.position || '';
  document.getElementById('t-company').value = t.company || '';
  document.getElementById('t-quote').value = t.quote || '';
  document.getElementById('modal-testimonial').classList.add('active');
}

document.getElementById('form-testimonial')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('t-id').value;
  const roleVal = document.getElementById('t-role').value.trim() || 'Client';

  const payload = {
    name: document.getElementById('t-name').value.trim(),
    role: roleVal,
    position: roleVal,
    company: document.getElementById('t-company').value.trim(),
    quote: document.getElementById('t-quote').value.trim()
  };

  const method = id ? 'PUT' : 'POST';
  const url = id ? `${API_BASE}/testimonials/${id}` : `${API_BASE}/testimonials`;

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('Failed to save testimonial');
    closeModals();
    showToast(`Testimonial ${id ? 'updated' : 'saved'} successfully!`);
    loadTabData('testimonials');
  } catch (err) {
    showToast(err.message, true);
  }
});

// ==========================================
// DELETE HANDLER
// ==========================================
async function deleteItem(resource, id) {
  if (!confirm(`Are you sure you want to delete this item? This action will permanently remove it from MongoDB.`)) {
    return;
  }

  const endpoint = resource === 'messages' ? 'contact' : resource;
  try {
    const res = await fetch(`${API_BASE}/${endpoint}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Delete operation failed');
    showToast('Item deleted successfully from database');
    loadTabData(currentTab);
  } catch (err) {
    showToast(err.message, true);
  }
}

// ==========================================
// RESEED DATABASE
// ==========================================
async function reseedDatabase() {
  if (!confirm('This will reset and seed all MongoDB collections with default portfolio demo data. Proceed?')) {
    return;
  }
  try {
    const res = await fetch(`${API_BASE}/stats/reseed`, { method: 'POST' });
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || 'Reseed failed');
    showToast(data.message || 'Database reset & re-seeded successfully!');
    loadTabData(currentTab);
  } catch (err) {
    showToast(err.message, true);
  }
}

// Helpers
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Close modals when clicking backdrop
document.querySelectorAll('.admin-modal-overlay').forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModals();
  });
});

// ==========================================
// ADMIN AUTHENTICATION CONTROLLER
// ==========================================
function isUserAuthenticated() {
  return sessionStorage.getItem('folioblox_admin_auth') === 'true' ||
         localStorage.getItem('folioblox_admin_auth') === 'true';
}

function showLoginScreen() {
  const loginScreen = document.getElementById('adminLoginScreen');
  const dashboard = document.getElementById('adminDashboardWrapper');
  if (loginScreen) {
    loginScreen.classList.remove('is-hidden');
    loginScreen.style.display = 'flex';
  }
  if (dashboard) {
    dashboard.style.display = 'none';
  }
}

function showDashboard() {
  const loginScreen = document.getElementById('adminLoginScreen');
  const dashboard = document.getElementById('adminDashboardWrapper');
  if (loginScreen) {
    loginScreen.classList.add('is-hidden');
    setTimeout(() => {
      loginScreen.style.display = 'none';
    }, 350);
  }
  if (dashboard) {
    dashboard.style.display = 'flex';
  }
}

async function handleAdminLogin(e) {
  e.preventDefault();
  const userIn = document.getElementById('login-username');
  const passIn = document.getElementById('login-password');
  const errorAlert = document.getElementById('loginErrorAlert');
  const errorMsg = document.getElementById('loginErrorMsg');
  const submitBtn = document.getElementById('loginSubmitBtn');

  const username = userIn ? userIn.value.trim() : '';
  const password = passIn ? passIn.value : '';

  if (!username || !password) {
    if (errorAlert) {
      if (errorMsg) errorMsg.textContent = 'Please enter both username and password.';
      errorAlert.classList.add('is-visible');
    }
    return;
  }

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>Verifying credentials...</span>';
  }

  try {
    let authenticated = false;

    // 1. Try server-side authentication
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        authenticated = true;
      }
    } catch (netErr) {
      // Fallback to client-side validation if backend is momentarily unreachable
    }

    // 2. Client-side fallback check (user: lekibir / pass: lake1122@)
    if (!authenticated && username === 'lekibir' && password === 'lake1122@') {
      authenticated = true;
    }

    if (authenticated) {
      sessionStorage.setItem('folioblox_admin_auth', 'true');
      localStorage.setItem('folioblox_admin_auth', 'true');
      if (errorAlert) errorAlert.classList.remove('is-visible');
      showToast('Welcome back, Lekibir!');
      showDashboard();
      switchTab('projects');
      refreshStats();
    } else {
      if (errorAlert) {
        if (errorMsg) errorMsg.textContent = 'Invalid username or password. Please verify your credentials.';
        errorAlert.classList.remove('is-visible');
        void errorAlert.offsetWidth; // trigger reflow for animation
        errorAlert.classList.add('is-visible');
      }
      if (passIn) {
        passIn.value = '';
        passIn.focus();
      }
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = `<span>Sign In to Control Center</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>`;
    }
  }
}

function handleAdminLogout() {
  if (confirm('Are you sure you want to log out from the Admin Control Center?')) {
    sessionStorage.removeItem('folioblox_admin_auth');
    localStorage.removeItem('folioblox_admin_auth');
    showLoginScreen();
    const userIn = document.getElementById('login-username');
    const passIn = document.getElementById('login-password');
    if (userIn) userIn.value = '';
    if (passIn) passIn.value = '';
    showToast('Logged out successfully.');
  }
}

// Initial boot & route protection
document.addEventListener('DOMContentLoaded', () => {
  // Attach Login Form
  const loginForm = document.getElementById('adminLoginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleAdminLogin);
  }

  // Attach Password Toggle Eye
  const togglePassBtn = document.getElementById('togglePasswordBtn');
  const passIn = document.getElementById('login-password');
  if (togglePassBtn && passIn) {
    togglePassBtn.addEventListener('click', () => {
      const isPass = passIn.getAttribute('type') === 'password';
      passIn.setAttribute('type', isPass ? 'text' : 'password');
      togglePassBtn.innerHTML = isPass ? `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
          <line x1="1" y1="1" x2="23" y2="23"></line>
        </svg>` : `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>`;
    });
  }

  // Attach Logout button
  const logoutBtn = document.getElementById('btn-admin-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleAdminLogout);
  }

  // Attach Tab clicks
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      if (tab) switchTab(tab);
    });
  });

  // Attach Reseed button
  const reseedBtn = document.getElementById('btn-reseed-db');
  if (reseedBtn) {
    reseedBtn.addEventListener('click', reseedDatabase);
  }

  // Check authentication gate
  if (isUserAuthenticated()) {
    showDashboard();
    // Update DB status pill
    const dbStatusText = document.getElementById('db-status-text');
    if (dbStatusText) {
      dbStatusText.textContent = 'MongoDB Online';
    }
    // Load initial tab & stats
    switchTab('projects');
    refreshStats();
  } else {
    showLoginScreen();
  }
});
