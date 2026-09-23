// ==========================================================================
// GARUDA OS - Indian Army Officer Mission Module
// Entry Pathways, Defence Knowledge Bank, Commands, Ranks, Operations, Weapons
// ==========================================================================

import { store } from '../store.js';
import { ARMY_OFFICER_ENTRIES, ARMY_COMMANDS, ARMY_RANKS_ORDER, MAJOR_MILITARY_OPERATIONS, INDIGENOUS_DEFENCE_TECH, OFFICER_LIKE_QUALITIES } from '../data/defence-data.js';

export function renderArmyView(container) {
  const profile = store.state.profile;

  container.innerHTML = `
    <div class="view-header" style="margin-bottom: 1.25rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <h2>🪖 Indian Army Officer Preparation Mission</h2>
          <p>Primary Ambition: Commissioning into the Indian Army • CDS, TGC & SSC-Tech Pathways</p>
        </div>
        <span class="badge badge-strong" style="padding: 0.4rem 0.8rem; font-size: 0.8rem;">
          TARGET: 🇮🇳 INDIAN ARMY OFFICER
        </span>
      </div>
    </div>

    <!-- Hero Cadet Pride Card -->
    <div class="card card-olive" style="margin-bottom: 1.25rem;">
      <div style="display: flex; align-items: center; gap: 1rem; flex-wrap: wrap;">
        <span style="font-size: 2.5rem;">⚔️</span>
        <div style="flex: 1;">
          <h3 style="color: #86EFAC; margin-bottom: 0.25rem;">The Officer's Creed</h3>
          <p style="font-size: 0.85rem; font-style: italic; color: var(--text-primary); margin-bottom: 0.25rem;">
            "The safety, honour and welfare of your country come first, always and every time. The honour, welfare and comfort of the men you command come next. Your own ease, comfort and safety come last, always and every time."
          </p>
          <span style="font-size: 0.72rem; color: var(--accent-gold); font-weight: 700; text-transform: uppercase;">— Field Marshal Philip Chetwode</span>
        </div>
      </div>
    </div>

    <!-- Army Sub-tabs -->
    <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle);">
      <button class="btn btn-sm army-tab-btn active" data-tab="entries">🎯 Officer Entry Pathways</button>
      <button class="btn btn-sm army-tab-btn" data-tab="commands">🗺️ 7 Army Commands & HQs</button>
      <button class="btn btn-sm army-tab-btn" data-tab="ranks">⭐ Ranks & Insignia</button>
      <button class="btn btn-sm army-tab-btn" data-tab="operations">🛡️ Landmark Military Operations</button>
      <button class="btn btn-sm army-tab-btn" data-tab="weapons">🚀 Indigenous Weapon Systems</button>
      <button class="btn btn-sm army-tab-btn" data-tab="olq">🧠 15 Officer Qualities (OLQ)</button>
    </div>

    <div id="army-subview-content"></div>
  `;

  const subview = container.querySelector('#army-subview-content');
  const tabs = container.querySelectorAll('.army-tab-btn');

  function switchTab(tabName) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
    if (tabName === 'entries') renderEntries(subview, profile);
    else if (tabName === 'commands') renderCommands(subview);
    else if (tabName === 'ranks') renderRanks(subview);
    else if (tabName === 'operations') renderOperations(subview);
    else if (tabName === 'weapons') renderWeapons(subview);
    else if (tabName === 'olq') renderOLQ(subview);
  }

  tabs.forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));
  renderEntries(subview, profile);
}

// 1. Officer Entry Schemes & Live Eligibility Matcher
function renderEntries(container, profile) {
  container.innerHTML = `
    <div class="card card-gold" style="margin-bottom: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <span style="font-weight: 700; font-size: 0.95rem;">Automated Eligibility Verification Engine</span>
          <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">
            Candidate Profile: Age <strong>${profile.age}</strong> • Degree <strong>${profile.btechBranch}</strong> • CGPA <strong>${profile.cgpa}</strong> • Grad <strong>${profile.graduationYear}</strong>
          </div>
        </div>
        <span class="badge badge-strong">100% Eligible for 4 Pathways</span>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.85rem;">
      ${ARMY_OFFICER_ENTRIES.map(e => `
        <div class="army-entry-card">
          <div class="army-entry-header">
            <div>
              <h3 style="font-size: 1.05rem; margin-bottom: 0.2rem;">${e.name}</h3>
              <span style="font-size: 0.75rem; color: var(--text-muted);">${e.type} • Academy: <strong>${e.trainingAcademy}</strong> (${e.trainingDuration})</span>
            </div>
            <span class="army-eligibility-badge eligibility-yes">ELIGIBLE ✅</span>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.65rem; font-size: 0.85rem; margin: 0.75rem 0; color: var(--text-secondary);">
            <div><strong>Age Range:</strong> ${e.minAge} to ${e.maxAge} Years</div>
            <div><strong>Education:</strong> ${e.education}</div>
            <div><strong>Selection Filter:</strong> ${e.examRequired}</div>
            <div><strong>SSB Stage:</strong> ${e.ssbRequired}</div>
            <div><strong>Cycle:</strong> ${e.notificationCycles}</div>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.5rem; margin-top: 0.5rem;">
            <a href="${e.officialSite}" target="_blank" class="btn btn-outline btn-sm">Official Portal Link ↗</a>
            <button class="btn btn-primary btn-sm" onclick="alert('Entry ${e.name} is tracked in your active battle orders.')">Track Pathway</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 2. 7 Army Commands & HQs
function renderCommands(container) {
  container.innerHTML = `
    <div class="card card-gold">
      <h3 style="color: var(--accent-gold); margin-bottom: 0.35rem;">🗺️ Indian Army Command Structure</h3>
      <p style="font-size: 0.85rem; margin-bottom: 0;">The Indian Army is organized into 6 Operational Commands and 1 Training Command, each commanded by a General Officer Commanding-in-Chief (GOC-in-C) with the rank of Lieutenant General.</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.85rem;">
      ${ARMY_COMMANDS.map(c => `
        <div class="card" style="margin-bottom: 0; border-left: 3px solid var(--accent-gold);">
          <div style="font-weight: 800; font-size: 1rem; color: var(--text-primary); margin-bottom: 0.25rem;">${c.name}</div>
          <div style="font-size: 0.85rem; color: var(--accent-gold); font-weight: 700; margin-bottom: 0.4rem;">HQ: ${c.hq}</div>
          <p style="font-size: 0.82rem; margin-bottom: 0;">${c.role}</p>
        </div>
      `).join('')}
    </div>
  `;
}

// 3. Ranks and Insignia
function renderRanks(container) {
  container.innerHTML = `
    <div class="card card-gold">
      <h3 style="color: var(--accent-gold); margin-bottom: 0.35rem;">⭐ Indian Army Officer Ranks Hierarchy</h3>
      <p style="font-size: 0.85rem; margin-bottom: 0;">Commissioned ranks in ascending order of responsibility and command hierarchy.</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.65rem;">
      ${ARMY_RANKS_ORDER.map((r, i) => `
        <div class="card" style="margin-bottom: 0; display: flex; align-items: center; justify-content: space-between; gap: 1rem; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 0.85rem;">
            <div class="step-num">${i + 1}</div>
            <div>
              <div style="font-weight: 800; font-size: 1rem; color: var(--text-primary);">${r.rank}</div>
              <div style="font-size: 0.8rem; color: var(--accent-gold); font-weight: 600;">Insignia: ${r.stars}</div>
            </div>
          </div>
          <div style="font-size: 0.82rem; color: var(--text-secondary); max-width: 320px; text-align: right;">
            ${r.role}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 4. Operations
function renderOperations(container) {
  container.innerHTML = `
    <div class="card card-gold">
      <h3 style="color: var(--accent-gold); margin-bottom: 0.35rem;">🛡️ Landmark Military Operations & History</h3>
      <p style="font-size: 0.85rem; margin-bottom: 0;">Study historical military operations to develop tactical and strategic awareness for SSB and defence interviews.</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      ${MAJOR_MILITARY_OPERATIONS.map(op => `
        <div class="card" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <span style="font-weight: 800; font-size: 1.05rem; color: var(--text-primary);">${op.name}</span>
            <span class="badge badge-revised">${op.year}</span>
          </div>
          <p style="font-size: 0.88rem; margin-bottom: 0;">${op.detail}</p>
        </div>
      `).join('')}
    </div>
  `;
}

// 5. Indigenous Weapons
function renderWeapons(container) {
  container.innerHTML = `
    <div class="card card-gold">
      <h3 style="color: var(--accent-gold); margin-bottom: 0.35rem;">🚀 Indigenous Defence Technology & Platforms (Atmanirbhar Bharat)</h3>
      <p style="font-size: 0.85rem; margin-bottom: 0;">Crucial for B.Tech ECE engineering knowledge during SSB Technical interviews and UPSC GS-III.</p>
    </div>

    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.85rem;">
      ${INDIGENOUS_DEFENCE_TECH.map(w => `
        <div class="card" style="margin-bottom: 0;">
          <div style="font-weight: 800; font-size: 1.05rem; color: var(--accent-gold); margin-bottom: 0.2rem;">${w.name}</div>
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-bottom: 0.5rem;">${w.type} • Developed by <strong>${w.agency}</strong></div>
          <p style="font-size: 0.82rem; margin-bottom: 0;">${w.specs}</p>
        </div>
      `).join('')}
    </div>
  `;
}

// 6. OLQ Framework
function renderOLQ(container) {
  container.innerHTML = `
    <div class="card card-gold">
      <h3 style="color: var(--accent-gold); margin-bottom: 0.35rem;">🧠 The 15 Officer Like Qualities (OLQ)</h3>
      <p style="font-size: 0.85rem; margin-bottom: 0;">The SSB evaluates personality holistically across 4 interconnected psychological factors.</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.85rem;">
      ${OFFICER_LIKE_QUALITIES.map(f => `
        <div class="card" style="margin-bottom: 0;">
          <h4 style="color: var(--accent-gold); margin-bottom: 0.5rem;">${f.factor}</h4>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${f.qualities.map(q => `
              <span class="meta-chip" style="font-size: 0.82rem; padding: 0.4rem 0.75rem;">
                ⚔️ ${q}
              </span>
            `).join('')}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
