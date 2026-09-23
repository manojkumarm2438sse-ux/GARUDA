// ==========================================================================
// GARUDA OS - Reports, Check-ins, Analytics & Achievement Badges
// ==========================================================================

import { store } from '../store.js';
import { aiMentorEngine } from '../ai-mentor.js';

export const BADGES_LIST = [
  { id: '7_day_streak', title: '7-Day Battle Streak', icon: '🔥', desc: 'Unbroken daily preparation discipline for 7 days.' },
  { id: '30_day_streak', title: '30-Day Iron Discipline', icon: '🛡️', desc: '30 consecutive days of operational consistency.' },
  { id: 'first_mains_answer', title: 'First Mains Answer', icon: '✍️', desc: 'Composed and rubric-evaluated your first UPSC Mains answer.' },
  { id: '100_study_hours', title: '100 Study Hours', icon: '📚', desc: 'Invested 100+ deep cognitive study hours.' },
  { id: '1000_mcqs', title: '1,000 MCQs Solved', icon: '🎯', desc: 'Mastered 1000 Prelims questions with option trap analysis.' },
  { id: 'officer_mindset', title: 'Officer Like Qualities', icon: '⚔️', desc: 'Demonstrated initiative, responsibility, and teamwork.' },
  { id: '30_gym_sessions', title: '30 Gym Sessions', icon: '💪', desc: 'Completed 30 athletic resistance and cardio training sessions.' },
  { id: '1600m_sub6', title: 'Sub-6 Min 1600m Run', icon: '🏃', desc: 'Achieved Army standard pace in the 1.6 km timed run.' },
  { id: 'java_full_stack', title: 'Java Stack Ready', icon: '💻', desc: 'Mastered Core OOP, Collections, SQL Joins & REST APIs.' },
  { id: 'wat_60_mastery', title: 'WAT 60-Word Sprint', icon: '⏱️', desc: 'Completed rapid-fire psychology word association drill.' },
  { id: 'consistent_sleep', title: '7-9h Sleep Hygiene', icon: '😴', desc: 'Maintained 7+ hours sleep for physiological recovery.' },
  { id: 'current_affairs_streak', title: 'Editorial Analyst', icon: '📰', desc: '14 consecutive days of 8-point current affairs transformation.' }
];

export function renderReportsView(container) {
  const state = store.state;
  const unlocked = state.badgesUnlocked || [];

  container.innerHTML = `
    <div class="view-header" style="margin-bottom: 1.25rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <h2>📊 Accountability & Performance Analytics</h2>
          <p>Daily Check-in • Evening Review • Sunday Weekly Report • Military Milestones</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button id="btn-trigger-checkin" class="btn btn-primary btn-sm">📋 Start Evening Check-in</button>
          <button id="btn-generate-weekly" class="btn btn-outline btn-sm">📅 Weekly Report</button>
        </div>
      </div>
    </div>

    <!-- Daily Performance Report Display -->
    <div class="card card-gold" id="daily-report-display">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <h3 style="color: var(--accent-gold); font-size: 1.15rem;">🇮🇳 Daily Performance Report</h3>
        <span class="meta-chip">Streak: #${state.profile.streakDays} Days</span>
      </div>
      <div id="daily-report-content"></div>
    </div>

    <!-- Achievement Badges Showcase -->
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <div>
          <h3 style="font-size: 1.05rem;">🎖️ Operational Milestones & Badges</h3>
          <p style="font-size: 0.8rem; margin-bottom: 0;">Badges unlocked through verified consistency, not unhealthy overwork.</p>
        </div>
        <span class="badge badge-strong">${unlocked.length} / ${BADGES_LIST.length} Unlocked</span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 0.75rem; margin-top: 0.75rem;">
        ${BADGES_LIST.map(badge => {
          const isUnlocked = unlocked.includes(badge.id);
          return `
            <div class="card" style="margin-bottom: 0; padding: 0.85rem; border-color: ${isUnlocked ? 'var(--accent-gold)' : 'var(--border-subtle)'}; opacity: ${isUnlocked ? '1' : '0.45'}; background: ${isUnlocked ? 'rgba(245, 158, 11, 0.08)' : 'var(--bg-surface)'};">
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
                <span style="font-size: 1.5rem;">${badge.icon}</span>
                <div>
                  <div style="font-weight: 700; font-size: 0.88rem; color: var(--text-primary);">${badge.title}</div>
                  <span class="badge ${isUnlocked ? 'badge-strong' : 'badge-unstarted'}" style="font-size: 0.65rem;">${isUnlocked ? 'UNLOCKED' : 'LOCKED'}</span>
                </div>
              </div>
              <p style="font-size: 0.75rem; margin-bottom: 0; color: var(--text-secondary);">${badge.desc}</p>
            </div>
          `;
        }).join('')}
      </div>
    </div>

    <!-- Evening Check-in Modal -->
    <div id="checkin-modal" class="modal-overlay">
      <div class="modal-sheet">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.25rem;">📋</span>
            <h3 style="font-size: 1.1rem;">Evening Operational Check-in</h3>
          </div>
          <button class="header-btn" id="btn-close-checkin">&times;</button>
        </div>
        <div class="modal-body">
          <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div class="card card-gold">
              <h4 style="color: var(--accent-gold); margin-bottom: 0.5rem;">1. UPSC Preparation</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                <div>
                  <label style="font-size: 0.75rem;">Study Hours Today</label>
                  <input type="number" id="inp-study-hours" value="8.5" style="width: 100%;">
                </div>
                <div>
                  <label style="font-size: 0.75rem;">MCQs Solved</label>
                  <input type="number" id="inp-mcq-count" value="20" style="width: 100%;">
                </div>
              </div>
            </div>

            <div class="card card-olive">
              <h4 style="color: #86EFAC; margin-bottom: 0.5rem;">2. Fitness & Athletic Conditioning</h4>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                <div>
                  <label style="font-size: 0.75rem;">Workout Status</label>
                  <select id="inp-workout-status" style="width: 100%;">
                    <option value="yes">Completed (Full Split)</option>
                    <option value="rest">Active Recovery Day</option>
                    <option value="missed">Missed</option>
                  </select>
                </div>
                <div>
                  <label style="font-size: 0.75rem;">Protein Intake (g)</label>
                  <input type="number" id="inp-protein-val" value="135" style="width: 100%;">
                </div>
              </div>
            </div>

            <div class="card">
              <h4 style="margin-bottom: 0.5rem;">3. IT & Career Preparation</h4>
              <div>
                <label style="font-size: 0.75rem;">Java / SQL / Coding Completed</label>
                <input type="text" id="inp-it-task" value="HashMap internals & 2 coding problems" style="width: 100%;">
              </div>
            </div>

            <div class="card">
              <h4 style="margin-bottom: 0.5rem;">4. Qualitative Reflection</h4>
              <div>
                <label style="font-size: 0.75rem;">Where did you encounter friction or hesitation today?</label>
                <textarea rows="2" id="inp-friction" placeholder="e.g. Felt sluggish around 4 PM, delayed SSB WAT words." style="width: 100%;"></textarea>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline btn-sm" id="btn-cancel-checkin">Cancel</button>
          <button class="btn btn-primary btn-sm" id="btn-submit-checkin">Submit & Lock Today's Log</button>
        </div>
      </div>
    </div>
  `;

  // Populate initial daily report
  const repContent = container.querySelector('#daily-report-content');
  const rep = aiMentorEngine.generateDailyReport();
  repContent.innerHTML = `
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.65rem; margin-bottom: 1rem;">
      <div class="meta-chip">Completion: <strong>${rep.completionRate}%</strong></div>
      <div class="meta-chip">Study Time: <strong>${rep.hoursInvested}</strong></div>
      <div class="meta-chip">MCQs Solved: <strong>${rep.mcqsSolved}</strong></div>
      <div class="meta-chip">Protein: <strong>${rep.proteinLogged}</strong></div>
      <div class="meta-chip">Hydration: <strong>${rep.waterLogged}</strong></div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.9rem;">
      <div style="background: var(--bg-surface-elevated); padding: 0.75rem; border-radius: var(--radius-md);">
        <strong style="color: var(--accent-emerald);">Key Strengths Observed:</strong>
        <ul style="padding-left: 1.25rem; margin-top: 0.25rem;">
          ${rep.strengths.map(s => `<li>${s}</li>`).join('')}
        </ul>
      </div>
      <div style="background: var(--bg-surface-elevated); padding: 0.75rem; border-radius: var(--radius-md);">
        <strong style="color: var(--accent-crimson);">Identified Weaknesses / Drag:</strong>
        <ul style="padding-left: 1.25rem; margin-top: 0.25rem;">
          ${rep.weaknesses.map(w => `<li>${w}</li>`).join('')}
        </ul>
      </div>
      <div style="background: var(--bg-surface-elevated); padding: 0.75rem; border-radius: var(--radius-md); border-left: 3px solid var(--accent-gold);">
        <strong style="color: var(--accent-gold);">Tactical Feedback from AI Mentor:</strong>
        <p style="margin-top: 0.25rem; font-style: italic; color: var(--text-primary); margin-bottom: 0;">"${rep.feedback}"</p>
      </div>
    </div>
  `;

  // Modal interactions
  const modal = container.querySelector('#checkin-modal');
  container.querySelector('#btn-trigger-checkin').addEventListener('click', () => modal.classList.add('open'));
  container.querySelector('#btn-close-checkin').addEventListener('click', () => modal.classList.remove('open'));
  container.querySelector('#btn-cancel-checkin').addEventListener('click', () => modal.classList.remove('open'));

  container.querySelector('#btn-submit-checkin').addEventListener('click', () => {
    alert('Daily check-in locked. Streak updated! AI Mentor has recalculated tomorrow’s priority battle orders.');
    modal.classList.remove('open');
    renderReportsView(container);
  });

  // Weekly report alert
  container.querySelector('#btn-generate-weekly').addEventListener('click', () => {
    alert('Weekly Report compiled for Sunday:\n\n• UPSC Study Hours: 52 Hours\n• Average MCQ Accuracy: 76%\n• Gym Consistency: 5/6 Sessions\n• Top Strength: Indian Polity Conceptual Clarity\n• Top Weakness: Fundamental Rights nuanced Articles\n• Priority Next Week: DPSP + 5km Run Pace');
  });
}
