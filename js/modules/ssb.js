// ==========================================================================
// GARUDA OS - SSB Preparation Module: OIR, PPDT, WAT, SRT, SD, GD, Interview
// ==========================================================================

import { store } from '../store.js';
import { SSB_OIR_QUESTIONS, SSB_PPDT_CASES, SSB_WAT_WORDS, SSB_SRT_SITUATIONS, SSB_GD_TOPICS, SSB_INTERVIEW_QUESTIONS } from '../data/ssb-data.js';

export function renderSSBView(container) {
  container.innerHTML = `
    <div class="view-header" style="margin-bottom: 1.25rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <h2>🎖️ SSB Officer Selection Simulator</h2>
          <p>5-Day Services Selection Board • Stage-1 Screening & Stage-2 Psychology & Interview</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button id="btn-quick-wat" class="btn btn-primary btn-sm">⚡ 15s WAT Sprint</button>
          <button id="btn-quick-ppdt" class="btn btn-outline btn-sm">🖼️ PPDT Simulator</button>
        </div>
      </div>
    </div>

    <!-- SSB Sub-tabs -->
    <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle);">
      <button class="btn btn-sm ssb-tab-btn active" data-tab="stage1">📋 Stage-1: OIR & PPDT</button>
      <button class="btn btn-sm ssb-tab-btn" data-tab="wat">⏱️ Rapid-Fire WAT (60 Words)</button>
      <button class="btn btn-sm ssb-tab-btn" data-tab="srt">🚨 Situation Reaction Test (SRT)</button>
      <button class="btn btn-sm ssb-tab-btn" data-tab="gd">🗣️ Group Discussion (GD) Arena</button>
      <button class="btn btn-sm ssb-tab-btn" data-tab="interview">🎤 Mock Personal Interview</button>
      <button class="btn btn-sm ssb-tab-btn" data-tab="sd">📝 Self Description (SD)</button>
    </div>

    <div id="ssb-subview-content"></div>
  `;

  const subview = container.querySelector('#ssb-subview-content');
  const tabs = container.querySelectorAll('.ssb-tab-btn');

  function switchTab(tabName) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
    if (tabName === 'stage1') renderStage1(subview);
    else if (tabName === 'wat') renderWAT(subview);
    else if (tabName === 'srt') renderSRT(subview);
    else if (tabName === 'gd') renderGD(subview);
    else if (tabName === 'interview') renderInterview(subview);
    else if (tabName === 'sd') renderSD(subview);
  }

  tabs.forEach(tab => tab.addEventListener('click', () => switchTab(tab.dataset.tab)));
  container.querySelector('#btn-quick-wat').addEventListener('click', () => switchTab('wat'));
  container.querySelector('#btn-quick-ppdt').addEventListener('click', () => switchTab('stage1'));

  renderStage1(subview);
}

// 1. Stage-1: OIR Reasoning & PPDT Simulator
function renderStage1(container) {
  container.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr; gap: 1rem;">
      <!-- OIR Reasoning Section -->
      <div class="card card-gold">
        <h3 style="color: var(--accent-gold); margin-bottom: 0.35rem;">1. Officer Intelligence Rating (OIR) Practice</h3>
        <p style="font-size: 0.85rem; margin-bottom: 1rem;">High OIR score (OIR-1 or OIR-2) is critical for clearing Stage-1 screening.</p>
        
        <div style="display: flex; flex-direction: column; gap: 0.75rem;">
          ${SSB_OIR_QUESTIONS.map((q, idx) => `
            <div class="card" style="margin-bottom: 0; background: var(--bg-surface-elevated);">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
                <span style="font-weight: 700; color: var(--text-primary); font-size: 0.95rem;">Q${idx + 1}: ${q.type}</span>
                <span class="badge badge-revised">OIR Test</span>
              </div>
              <p style="font-weight: 600; color: var(--text-primary); margin-bottom: 0.5rem;">${q.question}</p>
              <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 0.4rem; margin-bottom: 0.5rem;">
                ${q.options.map((opt, oIdx) => `
                  <button class="btn btn-outline btn-sm oir-opt-btn" data-qid="${q.id}" data-opt="${oIdx}" style="justify-content: flex-start;">${opt}</button>
                `).join('')}
              </div>
              <div id="oir-exp-${q.id}" style="display: none; font-size: 0.82rem; color: var(--accent-emerald); padding-top: 0.35rem; border-top: 1px dashed var(--border-subtle);">
                <strong>Answer:</strong> ${q.options[q.correct]} — ${q.explanation}
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- PPDT Simulation Section -->
      <div class="card card-olive">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <h3 style="color: #86EFAC; font-size: 1.15rem; margin-bottom: 0.2rem;">2. Picture Perception & Description Test (PPDT)</h3>
            <p style="font-size: 0.8rem; color: var(--text-primary); margin-bottom: 0;">30s Picture Exposure → 1 Min Box Marking (Sex, Age, Mood) → 3 Min Story Writing</p>
          </div>
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span id="ppdt-timer-display" style="font-family: var(--font-mono); font-size: 1.1rem; font-weight: 800; color: var(--accent-gold); background: var(--bg-surface); padding: 0.35rem 0.75rem; border-radius: var(--radius-md); border: 1px solid var(--border-medium);">
              03:00
            </span>
            <button id="btn-start-ppdt-timer" class="btn btn-primary btn-sm">▶ Start 3-Min Timer</button>
          </div>
        </div>

        <div style="text-align: center; margin-bottom: 1rem;">
          <img src="./assets/images/hero_banner.jpg" alt="PPDT Scene" style="width: 100%; max-height: 220px; object-fit: cover; border-radius: var(--radius-md); filter: grayscale(100%) contrast(120%); border: 2px solid var(--border-medium);">
          <div style="font-size: 0.78rem; color: var(--text-muted); margin-top: 0.35rem;">Simulated hazy scene: Observe number of characters, central hero, age, mood, and surrounding objects.</div>
        </div>

        <!-- Interactive PPDT Character Box Marking Area -->
        <div style="background: var(--bg-surface-elevated); padding: 0.85rem; border-radius: var(--radius-md); margin-bottom: 1rem; border: 1px solid var(--border-medium);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
            <strong style="color: var(--accent-gold); font-size: 0.85rem;">PPDT Box Marking (Square Box Representation):</strong>
            <span style="font-size: 0.75rem; color: var(--text-muted);">Click box to drop character circle (e.g. M 22 +)</span>
          </div>

          <div id="interactive-ppdt-box" class="ssb-ppdt-box" style="position: relative; width: 100%; max-width: 320px; height: 160px; background: rgba(0,0,0,0.4); border: 2px dashed var(--accent-gold); margin: 0 auto; border-radius: var(--radius-md); cursor: crosshair;">
            <div id="ppdt-marker-target" style="position: absolute; top: 40%; left: 45%; border: 2px solid #FFFFFF; border-radius: var(--radius-full); width: 44px; height: 44px; background: rgba(245, 158, 11, 0.85); color: #0B0F19; font-weight: 800; font-size: 0.72rem; display: flex; flex-direction: column; align-items: center; justify-content: center;">
              <span>M 22</span>
              <span>(+)</span>
            </div>
          </div>
          <div style="text-align: center; font-size: 0.75rem; color: var(--text-secondary); margin-top: 0.4rem;">
            Marking convention: <strong>M</strong> (Male) / <strong>F</strong> (Female), Age, and Mood: <strong>+</strong> (Positive), <strong>-</strong> (Negative), <strong>0</strong> (Neutral). Encircle the Chief Hero.
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; margin-bottom: 1rem;">
          <div>
            <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-secondary);">Chief Hero Character Details</label>
            <input type="text" id="ppdt-hero-details" value="Male, 22 Years, Positive Mood (+)" style="width: 100%; margin-top: 0.25rem;">
          </div>
          <div>
            <label style="font-size: 0.78rem; font-weight: 700; color: var(--text-secondary);">Main Action of the Story</label>
            <input type="text" id="ppdt-action-input" placeholder="e.g. Organizing canal repair & desilting with villagers" style="width: 100%; margin-top: 0.25rem;">
          </div>
        </div>

        <textarea id="ppdt-story-textarea" rows="6" style="width: 100%; line-height: 1.5; font-size: 0.92rem;" placeholder="Write story within 3 minutes:&#10;1. Past: What led to this event?&#10;2. Present: What is the hero currently doing with his team (practical steps, initiative)?&#10;3. Future: What was the constructive, successful outcome?"></textarea>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem; flex-wrap: wrap; gap: 0.5rem;">
          <span id="ppdt-word-counter" style="font-size: 0.8rem; color: var(--text-muted);">Word count: 0 words</span>
          <button class="btn btn-primary btn-sm" id="btn-save-ppdt-story">Save Story & Begin 1-Min Narration Drill →</button>
        </div>
      </div>
    </div>
  `;

  // Attach PPDT timer logic
  const timerDisplay = container.querySelector('#ppdt-timer-display');
  const startTimerBtn = container.querySelector('#btn-start-ppdt-timer');
  const storyText = container.querySelector('#ppdt-story-textarea');
  const wordCounter = container.querySelector('#ppdt-word-counter');
  let ppdtSeconds = 180;
  let timerId = null;

  if (startTimerBtn) {
    startTimerBtn.addEventListener('click', () => {
      if (timerId) {
        clearInterval(timerId);
        timerId = null;
        startTimerBtn.textContent = '▶ Resume Timer';
        return;
      }

      startTimerBtn.textContent = '⏸ Pause Timer';
      timerId = setInterval(() => {
        ppdtSeconds--;
        const m = Math.floor(ppdtSeconds / 60);
        const s = ppdtSeconds % 60;
        timerDisplay.textContent = `0${m}:${s < 10 ? '0' : ''}${s}`;

        if (ppdtSeconds <= 0) {
          clearInterval(timerId);
          timerId = null;
          timerDisplay.textContent = 'TIME UP!';
          timerDisplay.style.color = 'var(--accent-crimson)';
          alert('⏱️ Time Up! Lay down your pen. In the SSB, you are given strictly 3 minutes for story writing.');
        }
      }, 1000);
    });
  }

  if (storyText) {
    storyText.addEventListener('input', () => {
      const words = storyText.value.trim() ? storyText.value.trim().split(/\s+/).length : 0;
      wordCounter.textContent = `Word count: ${words} words (Optimal: 90-120 words)`;
    });
  }

  const saveStoryBtn = container.querySelector('#btn-save-ppdt-story');
  if (saveStoryBtn) {
    saveStoryBtn.addEventListener('click', () => {
      if (!storyText.value.trim()) {
        alert('Please draft your story first.');
        return;
      }
      alert('PPDT Story logged successfully!\n\n1-Minute Narration Checklist:\n• Sit upright with hands on knees.\n• Maintain steady eye contact across the semi-circle.\n• Speak in a firm, audible voice without saying "Sir" repeatedly.\n• Complete narration in 50-55 seconds without looking at the Assessors.');
    });
  }

  // Attach OIR option reveal
  container.querySelectorAll('.oir-opt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const qid = btn.dataset.qid;
      const optIdx = Number(btn.dataset.opt);
      const q = SSB_OIR_QUESTIONS.find(item => item.id === qid);
      const expDiv = container.querySelector(`#oir-exp-${qid}`);

      if (optIdx === q.correct) {
        btn.style.borderColor = 'var(--accent-emerald)';
        btn.style.color = 'var(--accent-emerald)';
      } else {
        btn.style.borderColor = 'var(--accent-crimson)';
        btn.style.color = 'var(--accent-crimson)';
      }
      expDiv.style.display = 'block';
    });
  });
}

// 2. WAT Rapid-Fire 15s Simulator
function renderWAT(container) {
  let wordIdx = 0;
  let timerInterval = null;
  let secondsLeft = 15;
  const userResponses = [];

  function startSimulator() {
    renderWordCard();
  }

  function renderWordCard() {
    clearInterval(timerInterval);
    secondsLeft = 15;
    const currentWord = SSB_WAT_WORDS[wordIdx];

    container.innerHTML = `
      <div class="card card-gold">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 800; color: var(--accent-gold);">WORD ASSOCIATION TEST (${wordIdx + 1} / ${SSB_WAT_WORDS.length})</span>
          <span class="meta-chip">⏱️ 15s Countdown</span>
        </div>
      </div>

      <div class="wat-card-display">
        <div class="wat-word">${currentWord}</div>
        <div style="font-size: 0.9rem; color: var(--text-muted); margin-top: 0.5rem;">Spontaneous, positive, natural officer thought</div>
        <div class="wat-timer-bar" id="wat-timer-indicator"></div>
      </div>

      <div class="card" style="margin-top: 1rem;">
        <input type="text" id="wat-sentence-input" placeholder="Type quick spontaneous association sentence..." style="width: 100%; font-size: 1.1rem; padding: 0.85rem;" autofocus>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem;">
          <span id="wat-time-display" style="font-family: var(--font-mono); font-weight: 700; color: var(--accent-gold);">15 Seconds</span>
          <button id="btn-next-wat" class="btn btn-primary">Next Word →</button>
        </div>
      </div>
    `;

    const input = container.querySelector('#wat-sentence-input');
    const timeDisplay = container.querySelector('#wat-time-display');
    const timerBar = container.querySelector('#wat-timer-indicator');
    const nextBtn = container.querySelector('#btn-next-wat');

    input.focus();

    timerInterval = setInterval(() => {
      secondsLeft--;
      timeDisplay.textContent = `${secondsLeft} Seconds`;
      timerBar.style.width = `${(secondsLeft / 15) * 100}%`;

      if (secondsLeft <= 0) {
        advanceWord(input.value.trim());
      }
    }, 1000);

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') advanceWord(input.value.trim());
    });

    nextBtn.addEventListener('click', () => advanceWord(input.value.trim()));
  }

  function advanceWord(response) {
    clearInterval(timerInterval);
    userResponses.push({ word: SSB_WAT_WORDS[wordIdx], response: response || '(No Response / Hesitated)' });

    if (wordIdx + 1 < SSB_WAT_WORDS.length) {
      wordIdx++;
      renderWordCard();
    } else {
      // Completed all words
      container.innerHTML = `
        <div class="card card-gold" style="text-align: center; padding: 2rem;">
          <span style="font-size: 3rem;">🎖️</span>
          <h3 style="margin: 0.5rem 0;">WAT Rapid-Fire Session Complete</h3>
          <p style="color: var(--text-secondary); margin-bottom: 1.25rem;">You completed responses for all ${SSB_WAT_WORDS.length} words. Authentic spontaneous thinking reflected below:</p>

          <div style="max-height: 350px; overflow-y: auto; text-align: left; background: var(--bg-surface-elevated); padding: 1rem; border-radius: var(--radius-md); border: 1px solid var(--border-medium); margin-bottom: 1.25rem;">
            ${userResponses.map((r, i) => `
              <div style="font-size: 0.85rem; padding: 0.35rem 0; border-bottom: 1px solid var(--border-subtle);">
                <strong style="color: var(--accent-gold);">${i + 1}. ${r.word}:</strong> ${r.response}
              </div>
            `).join('')}
          </div>

          <button class="btn btn-primary" id="btn-restart-wat">Restart Drill</button>
        </div>
      `;
      container.querySelector('#btn-restart-wat').addEventListener('click', () => {
        wordIdx = 0;
        userResponses.length = 0;
        startSimulator();
      });
    }
  }

  startSimulator();
}

// 3. Situation Reaction Test (SRT)
function renderSRT(container) {
  container.innerHTML = `
    <div class="card card-gold">
      <h3 style="color: var(--accent-gold); margin-bottom: 0.35rem;">🚨 Situation Reaction Test (SRT) Drill</h3>
      <p style="font-size: 0.85rem; margin-bottom: 0;">Officer mindset: Swift action, resourcefulness, composure, teamwork, and moral courage. No unrealistic movie heroics.</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.85rem;">
      ${SSB_SRT_SITUATIONS.map((s, idx) => `
        <div class="card" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
            <span style="font-weight: 700; color: var(--accent-gold);">Situation #${idx + 1}</span>
            <span class="badge badge-revised">Psychology Test</span>
          </div>
          <p style="font-weight: 600; color: var(--text-primary); font-size: 0.95rem; margin-bottom: 0.65rem;">
            ${s.scenario}
          </p>

          <input type="text" placeholder="Your immediate action..." style="width: 100%; margin-bottom: 0.5rem;">

          <div style="background: var(--bg-surface-elevated); border: 1px dashed var(--accent-olive-light); border-radius: var(--radius-md); padding: 0.65rem; font-size: 0.82rem; color: #86EFAC;">
            <strong>Officer Model Action:</strong> ${s.officerApproach}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 4. Group Discussion (GD) Arena
function renderGD(container) {
  container.innerHTML = `
    <div class="card card-gold">
      <h3 style="color: var(--accent-gold); margin-bottom: 0.35rem;">🗣️ SSB Group Discussion (GD) Arena</h3>
      <p style="font-size: 0.85rem; margin-bottom: 0;">Rules: Respectful contribution, data-backed reasoning, active listening, and synthesizing group consensus. Never shout or dominate aggressively.</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 1rem;">
      ${SSB_GD_TOPICS.map(gd => `
        <div class="card" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <h3 style="font-size: 1.05rem;">${gd.title}</h3>
            <span class="badge badge-strong">${gd.category}</span>
          </div>
          <p style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 0.75rem;">${gd.brief}</p>

          <div style="background: var(--bg-surface-elevated); border-radius: var(--radius-md); padding: 0.75rem; margin-bottom: 0.75rem;">
            <strong style="color: var(--accent-gold); font-size: 0.82rem; text-transform: uppercase;">Key Strategic Angles to Deliberate:</strong>
            <ul style="padding-left: 1.25rem; margin-top: 0.35rem; font-size: 0.85rem; color: var(--text-secondary);">
              ${gd.keyPoints.map(kp => `<li style="margin-bottom: 0.2rem;">${kp}</li>`).join('')}
            </ul>
          </div>

          <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
            <button class="btn btn-outline btn-sm" onclick="alert('Start 3-Minute Preparation Countdown on your stopwatch. Note down your Opening, 3 Arguments, and Conclusion.')">Start 3-Min Prep</button>
            <button class="btn btn-primary btn-sm" onclick="alert('Rehearse delivering your opening statement aloud for 60 seconds with clear modulation.')">Practice Speaking Aloud</button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 5. Personal Interview
function renderInterview(container) {
  container.innerHTML = `
    <div class="card card-gold">
      <h3 style="color: var(--accent-gold); margin-bottom: 0.35rem;">🎤 SSB Mock Personal Interview Simulator</h3>
      <p style="font-size: 0.85rem; margin-bottom: 0;">Interviewing Officer (IO) evaluations focus on clarity, authenticity, emotional stability, and honesty.</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.85rem;">
      ${SSB_INTERVIEW_QUESTIONS.map(q => `
        <div class="card" style="margin-bottom: 0;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
            <span class="badge badge-revised">${q.category}</span>
            <span style="font-size: 0.75rem; color: var(--text-muted);">IO Question</span>
          </div>
          <p style="font-weight: 700; font-size: 1rem; color: var(--text-primary); margin-bottom: 0.65rem;">${q.question}</p>
          <textarea rows="3" placeholder="Draft your authentic response..." style="width: 100%; margin-bottom: 0.5rem;"></textarea>
          <div style="background: var(--bg-surface-elevated); border-left: 3px solid var(--accent-gold); padding: 0.65rem; border-radius: var(--radius-sm); font-size: 0.82rem; color: var(--text-secondary);">
            <strong style="color: var(--accent-gold);">IO Evaluation Rubric:</strong> ${q.rubricGuide}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 6. Self Description (SD)
function renderSD(container) {
  container.innerHTML = `
    <div class="card card-gold">
      <h3 style="color: var(--accent-gold); margin-bottom: 0.35rem;">📝 Self Description (SD) Test Preparation</h3>
      <p style="font-size: 0.85rem; margin-bottom: 0;">Write genuine perceptions reflecting your true personality traits.</p>
    </div>

    <div class="card">
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <label style="font-weight: 700; color: var(--accent-gold); font-size: 0.9rem;">1. Parents' Opinion about You</label>
          <textarea rows="3" placeholder="What your father and mother genuinely think of your discipline, reliability, and emotional maturity..." style="width: 100%; margin-top: 0.25rem;"></textarea>
        </div>
        <div>
          <label style="font-weight: 700; color: var(--accent-gold); font-size: 0.9rem;">2. Professors / Teachers' Opinion</label>
          <textarea rows="3" placeholder="How your B.Tech ECE faculty perceive your academic consistency, project teamwork, and conduct..." style="width: 100%; margin-top: 0.25rem;"></textarea>
        </div>
        <div>
          <label style="font-weight: 700; color: var(--accent-gold); font-size: 0.9rem;">3. Friends & Peers' Opinion</label>
          <textarea rows="3" placeholder="What your hostel mates and close friends say about your loyalty, helpfulness, and sense of humor..." style="width: 100%; margin-top: 0.25rem;"></textarea>
        </div>
        <div>
          <label style="font-weight: 700; color: var(--accent-gold); font-size: 0.9rem;">4. Self Appraisal (Strengths & Areas of Improvement)</label>
          <textarea rows="3" placeholder="Honest self appraisal of your core strengths and areas you are actively working to develop..." style="width: 100%; margin-top: 0.25rem;"></textarea>
        </div>
        <div style="display: flex; justify-content: flex-end;">
          <button class="btn btn-primary" onclick="alert('Self-Description responses saved. Review monthly to track your personal evolution.')">Save Self-Description Blueprint</button>
        </div>
      </div>
    </div>
  `;
}
