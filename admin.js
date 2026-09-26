/**
 * admin.js — Full Node.js & MongoDB Administrative Management System
 * Supports full CRUD (Create, Read, Update, Delete) across Projects, Certifications,
 * Skills, Work Experience, Client Testimonials, and Contact Messages Inbox.
 */

const API_BASE = '/api';

// Current State
let currentTab = 'projects';
let cache = {
  projects: [],
  certificates: [],
  skills: [],
  experience: [],
  testimonials: [],
  messages: []
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
  toast.style.background = isError ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)';
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// ==========================================
// KPI & BADGE COUNTERS
// ==========================================
async function refreshStats() {
  try {
    const res = await fetch(`${API_BASE}/stats`);
    if (!res.ok) return;
    const stats = await res.json();

    // KPI cards
    setElText('stat-projects', stats.projects ?? 0);
    setElText('stat-certs', stats.certificates ?? 0);
    setElText('stat-skills', stats.skills ?? 0);
    setElText('stat-exp', stats.experience ?? 0);
    setElText('stat-testimonials', stats.testimonials ?? 0);
    setElText('stat-messages', stats.totalMessages ?? 0);

    // Tab badges
    setElText('badge-projects', stats.projects ?? 0);
    setElText('badge-certs', stats.certificates ?? 0);
    setElText('badge-skills', stats.skills ?? 0);
    setElText('badge-exp', stats.experience ?? 0);
    setElText('badge-testimonials', stats.testimonials ?? 0);
    setElText('badge-messages', stats.unreadMessages !== undefined ? `${stats.unreadMessages} new` : (stats.totalMessages ?? 0));
  } catch (err) {
    console.error('Failed to load stats:', err);
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
    messages: 'sec-messages'
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

  tbody.innerHTML = items.map(p => `
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
        <div style="display: flex; flex-wrap: wrap; gap: 4px; max-width: 220px;">
          ${(p.tags || []).slice(0, 4).map(t => `<span class="table-badge badge-neutral" style="font-size: 10px;">${escapeHtml(t)}</span>`).join('')}
          ${(p.tags || []).length > 4 ? `<span style="font-size: 10px; color: var(--color-text-dim);">+${p.tags.length - 4}</span>` : ''}
        </div>
      </td>
      <td>
        <span style="font-size: 12px; color: #ff7a59;">${escapeHtml(p.metrics || p.featured ? 'Featured' : 'Standard')}</span>
      </td>
      <td>
        <div class="table-actions">
          <button class="btn-action edit" onclick="editProject('${p._id}')" title="Edit">✎</button>
          <button class="btn-action delete" onclick="deleteItem('projects', '${p._id}')" title="Delete">🗑</button>
        </div>
      </td>
    </tr>
  `).join('');
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
      <td>${escapeHtml(c.year || c.issueDate || '2024')}</td>
      <td><span class="table-badge badge-success">Active • Verified</span></td>
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
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--color-text-dim); padding: 30px;">No skills registered.</td></tr>`;
    return;
  }

  tbody.innerHTML = items.map(s => `
    <tr>
      <td>
        <strong style="color: #ffffff;">${escapeHtml(s.name)}</strong>
      </td>
      <td><span class="table-badge badge-neutral">${escapeHtml(s.category || 'General')}</span></td>
      <td>
        <div style="display: flex; align-items: center; gap: 8px;">
          <div style="flex: 1; max-width: 140px; height: 6px; background: rgba(255,255,255,0.08); border-radius: 99px; overflow: hidden;">
            <div style="width: ${s.level || 85}%; height: 100%; background: ${s.color || '#ff5018'}; border-radius: 99px;"></div>
          </div>
          <span style="font-size: 12px; font-weight: 600; color: #ffffff;">${s.level || 85}%</span>
        </div>
      </td>
      <td>
        <div class="table-actions">
          <button class="btn-action edit" onclick="editSkill('${s._id}')" title="Edit">✎</button>
          <button class="btn-action delete" onclick="deleteItem('skills', '${s._id}')" title="Delete">🗑</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// 4. Experience Table
function renderExperience(items) {
  const tbody = document.getElementById('experience-table-body');
  if (!tbody) return;

  if (!items || items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align: center; color: var(--color-text-dim); padding: 30px;">No experience records found.</td></tr>`;
    return;
  }

  tbody.innerHTML = items.map(e => `
    <tr>
      <td><strong style="color: #ffffff;">${escapeHtml(e.role)}</strong></td>
      <td><span class="table-badge badge-primary">${escapeHtml(e.company)}</span></td>
      <td style="font-size: 13px; color: var(--color-text-dim);">${escapeHtml(e.period || e.duration || '2023 - Present')}</td>
      <td style="max-width: 280px; font-size: 12px; color: #cbd5e1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
        ${escapeHtml(Array.isArray(e.description) ? e.description.join(' • ') : (e.description || ''))}
      </td>
      <td>
        <div class="table-actions">
          <button class="btn-action edit" onclick="editExperience('${e._id}')" title="Edit">✎</button>
          <button class="btn-action delete" onclick="deleteItem('experience', '${e._id}')" title="Delete">🗑</button>
        </div>
      </td>
    </tr>
  `).join('');
}

// 5. Testimonials Table
function renderTestimonials(items) {
  const tbody = document.getElementById('testimonials-table-body');
  if (!tbody) return;

  if (!items || items.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--color-text-dim); padding: 30px;">No client testimonials registered.</td></tr>`;
    return;
  }

  tbody.innerHTML = items.map(t => `
    <tr>
      <td><strong style="color: #ffffff;">${escapeHtml(t.name)}</strong></td>
      <td>
        <div style="font-size: 13px; color: #ffffff;">${escapeHtml(t.position || t.role || '')}</div>
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
    tbody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--color-text-dim); padding: 30px;">No messages received yet.</td></tr>`;
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
  document.getElementById('modal-project').classList.add('active');
}

function editProject(id) {
  const p = cache.projects.find(item => item._id === id);
  if (!p) return;
  document.getElementById('project-modal-heading').textContent = `Edit Project: ${p.title}`;
  document.getElementById('p-id').value = p._id;
  document.getElementById('p-title').value = p.title || '';
  document.getElementById('p-category').value = p.category || '';
  document.getElementById('p-subtitle').value = p.subtitle || '';
  document.getElementById('p-desc').value = p.description || '';
  document.getElementById('p-image').value = p.image || '';
  document.getElementById('p-metrics').value = p.metrics || '';
  document.getElementById('p-tech').value = (p.tags || []).join(', ');
  document.getElementById('p-demo').value = p.liveUrl || p.demoUrl || '';
  document.getElementById('modal-project').classList.add('active');
}

document.getElementById('form-project')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('p-id').value;
  const payload = {
    title: document.getElementById('p-title').value.trim(),
    category: document.getElementById('p-category').value.trim(),
    subtitle: document.getElementById('p-subtitle').value.trim(),
    description: document.getElementById('p-desc').value.trim(),
    image: document.getElementById('p-image').value.trim() || 'image/project-mern.jpg',
    metrics: document.getElementById('p-metrics').value.trim(),
    tags: document.getElementById('p-tech').value.split(',').map(s => s.trim()).filter(Boolean),
    liveUrl: document.getElementById('p-demo').value.trim()
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
  document.getElementById('cert-modal-heading').textContent = `Edit Certificate: ${c.title}`;
  document.getElementById('c-id').value = c._id;
  document.getElementById('c-title').value = c.title || '';
  document.getElementById('c-issuer').value = c.issuer || '';
  document.getElementById('c-cred-id').value = c.credentialId || '';
  document.getElementById('c-year').value = c.year || c.issueDate || '';
  document.getElementById('c-valid').value = c.validUntil || '';
  document.getElementById('c-skills').value = (c.skills || []).join(', ');
  document.getElementById('c-desc').value = c.description || '';
  document.getElementById('modal-certificate').classList.add('active');
}

document.getElementById('form-certificate')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('c-id').value;
  const payload = {
    title: document.getElementById('c-title').value.trim(),
    issuer: document.getElementById('c-issuer').value.trim(),
    credentialId: document.getElementById('c-cred-id').value.trim(),
    year: document.getElementById('c-year').value.trim(),
    validUntil: document.getElementById('c-valid').value.trim(),
    skills: document.getElementById('c-skills').value.split(',').map(s => s.trim()).filter(Boolean),
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
  document.getElementById('s-pct').value = s.level || 90;
  document.getElementById('s-color').value = s.color || '#ff5018';
  document.getElementById('modal-skill').classList.add('active');
}

document.getElementById('form-skill')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('s-id').value;
  const payload = {
    name: document.getElementById('s-name').value.trim(),
    category: document.getElementById('s-category').value.trim() || 'General',
    level: Number(document.getElementById('s-pct').value) || 85,
    color: document.getElementById('s-color').value.trim() || '#ff5018'
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
  document.getElementById('modal-experience').classList.add('active');
}

function editExperience(id) {
  const ex = cache.experience.find(item => item._id === id);
  if (!ex) return;
  document.getElementById('exp-modal-heading').textContent = `Edit Experience: ${ex.role}`;
  document.getElementById('e-id').value = ex._id;
  document.getElementById('e-role').value = ex.role || '';
  document.getElementById('e-company').value = ex.company || '';
  document.getElementById('e-duration').value = ex.period || ex.duration || '';
  document.getElementById('e-location').value = ex.location || '';
  document.getElementById('e-desc').value = Array.isArray(ex.description) ? ex.description.join('\n') : (ex.description || '');
  document.getElementById('modal-experience').classList.add('active');
}

document.getElementById('form-experience')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('e-id').value;
  const payload = {
    role: document.getElementById('e-role').value.trim(),
    company: document.getElementById('e-company').value.trim(),
    period: document.getElementById('e-duration').value.trim(),
    location: document.getElementById('e-location').value.trim(),
    description: document.getElementById('e-desc').value.split('\n').map(s => s.trim()).filter(Boolean)
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
  document.getElementById('t-role').value = t.position || t.role || '';
  document.getElementById('t-company').value = t.company || '';
  document.getElementById('t-quote').value = t.quote || '';
  document.getElementById('modal-testimonial').classList.add('active');
}

document.getElementById('form-testimonial')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('t-id').value;
  const payload = {
    name: document.getElementById('t-name').value.trim(),
    position: document.getElementById('t-role').value.trim(),
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

// Initial boot
document.addEventListener('DOMContentLoaded', () => {
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

  // Update DB status pill
  const dbStatusText = document.getElementById('db-status-text');
  if (dbStatusText) {
    dbStatusText.textContent = 'MongoDB Online';
  }

  // Load initial tab & stats
  switchTab('projects');
  refreshStats();
});
