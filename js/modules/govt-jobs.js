// ==========================================================================
// GARUDA OS - Central & Andhra Pradesh Government Job Radar Module
// ==========================================================================

import { store } from '../store.js';
import { GOVT_JOBS_DATABASE } from '../data/jobs-data.js';

export function renderGovtJobsView(container) {
  const jobs = store.state.govtJobs || GOVT_JOBS_DATABASE;

  container.innerHTML = `
    <div class="view-header" style="margin-bottom: 1.25rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <h2>🏛️ Government Opportunities & Recruitment Radar</h2>
          <p>Central Government • Andhra Pradesh State Services • Defence & PSUs for B.Tech ECE</p>
        </div>
        <span class="meta-chip">Verified Against Official Eligibility Criteria</span>
      </div>
    </div>

    <!-- Filter Buttons -->
    <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem; margin-bottom: 1rem;">
      <button class="btn btn-sm job-filter-btn active" data-filter="all">All (${jobs.length})</button>
      <button class="btn btn-sm job-filter-btn" data-filter="Defence">🪖 Defence & Armed Forces</button>
      <button class="btn btn-sm job-filter-btn" data-filter="Civil">📚 UPSC Civil Services</button>
      <button class="btn btn-sm job-filter-btn" data-filter="Andhra">🏛️ Andhra Pradesh (APPSC)</button>
      <button class="btn btn-sm job-filter-btn" data-filter="PSU">🔬 PSUs / Core ECE</button>
    </div>

    <div id="jobs-list-container" style="display: flex; flex-direction: column; gap: 0.85rem;"></div>
  `;

  const listContainer = container.querySelector('#jobs-list-container');
  const filterBtns = container.querySelectorAll('.job-filter-btn');

  function renderFiltered(filterType) {
    let filtered = jobs;
    if (filterType === 'Defence') filtered = jobs.filter(j => j.category.includes('Defence') || j.category.includes('Armed'));
    else if (filterType === 'Civil') filtered = jobs.filter(j => j.category.includes('Civil'));
    else if (filterType === 'Andhra') filtered = jobs.filter(j => j.category.includes('Andhra'));
    else if (filterType === 'PSU') filtered = jobs.filter(j => j.category.includes('PSU'));

    listContainer.innerHTML = filtered.map(job => `
      <div class="job-radar-card">
        <div class="job-header-row">
          <div>
            <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 0.25rem;">
              <span class="job-org-badge">${job.organization}</span>
              <span class="badge badge-strong">${job.applicationStatus}</span>
            </div>
            <h3 style="font-size: 1.05rem; color: var(--text-primary);">${job.postName}</h3>
          </div>
          <span class="job-deadline-text">${job.deadline}</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem; font-size: 0.82rem; color: var(--text-secondary); margin: 0.75rem 0;">
          <div><strong>Eligibility:</strong> ${job.degreeRequired}</div>
          <div><strong>Age Range:</strong> ${job.minAge} to ${job.maxAge} Years</div>
          <div><strong>Pay Scale:</strong> ${job.salary}</div>
          <div><strong>Stages:</strong> ${job.stages}</div>
        </div>

        <div style="display: flex; align-items: center; justify-content: space-between; border-top: 1px solid var(--border-subtle); padding-top: 0.65rem; margin-top: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
          <div style="display: flex; align-items: center; gap: 0.4rem;">
            <label style="font-size: 0.75rem; color: var(--text-muted);">Application Status:</label>
            <select class="job-status-select" data-job-id="${job.id}" style="padding: 0.25rem 0.5rem; font-size: 0.75rem;">
              <option ${job.applicationStatus === 'Eligible & Target' ? 'selected' : ''}>Eligible & Target</option>
              <option ${job.applicationStatus === 'Eligible' ? 'selected' : ''}>Eligible</option>
              <option ${job.applicationStatus === 'Applied' ? 'selected' : ''}>Applied</option>
              <option ${job.applicationStatus === 'Exam Approaching' ? 'selected' : ''}>Exam Approaching</option>
              <option ${job.applicationStatus === 'Exam Completed' ? 'selected' : ''}>Exam Completed</option>
              <option ${job.applicationStatus === 'Result Pending' ? 'selected' : ''}>Result Pending</option>
              <option ${job.applicationStatus === 'Selected' ? 'selected' : ''}>Selected</option>
            </select>
          </div>
          <a href="${job.officialUrl}" target="_blank" class="btn btn-outline btn-sm">Official Notification Portal ↗</a>
        </div>
      </div>
    `).join('');

    // Attach status dropdown change
    listContainer.querySelectorAll('.job-status-select').forEach(sel => {
      sel.addEventListener('change', (e) => {
        const jid = sel.dataset.jobId;
        const target = jobs.find(j => j.id === jid);
        if (target) {
          target.applicationStatus = e.target.value;
          store.saveState();
        }
      });
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderFiltered(btn.dataset.filter);
    });
  });

  renderFiltered('all');
}
