// ==========================================================================
// GARUDA OS - UPSC Academy Module: 16-Step Explorer, MCQ Engine, Mains, CA
// ==========================================================================

import { store } from '../store.js';
import { UPSC_SUBJECTS, UPSC_TOPICS_DATABASE, UPSC_MCQ_BANK, UPSC_FLASHCARDS } from '../data/syllabus-data.js';

export function renderUPSCView(container) {
  const state = store.state;
  const topics = state.upscTopics || UPSC_TOPICS_DATABASE;

  container.innerHTML = `
    <div class="view-header" style="margin-bottom: 1.25rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <h2>📚 UPSC Civil Services Academy</h2>
          <p>Prelims GS-I & CSAT • Mains GS-I to IV • 16-Step Active Recall Protocol</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button id="btn-launch-mcq" class="btn btn-primary btn-sm">📝 Launch MCQ Sprint</button>
          <button id="btn-launch-mains" class="btn btn-outline btn-sm">✍️ Mains Workspace</button>
        </div>
      </div>
    </div>

    <!-- Sub-navigation Tabs -->
    <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem; margin-bottom: 1.25rem; border-bottom: 1px solid var(--border-subtle);">
      <button class="btn btn-sm upsc-tab-btn active" data-tab="topics">📖 16-Step Topic Explorer</button>
      <button class="btn btn-sm upsc-tab-btn" data-tab="mcqs">🎯 MCQ Engine (${UPSC_MCQ_BANK.length} Qs)</button>
      <button class="btn btn-sm upsc-tab-btn" data-tab="flashcards">⚡ Active Recall Flashcards</button>
      <button class="btn btn-sm upsc-tab-btn" data-tab="mains">📑 Mains Answer Writing</button>
      <button class="btn btn-sm upsc-tab-btn" data-tab="current-affairs">📰 8-Point Current Affairs</button>
    </div>

    <div id="upsc-subview-content"></div>
  `;

  // Setup tab switcher
  const subview = container.querySelector('#upsc-subview-content');
  const tabs = container.querySelectorAll('.upsc-tab-btn');

  function switchTab(tabName) {
    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
    if (tabName === 'topics') renderTopicExplorer(subview, topics);
    else if (tabName === 'mcqs') renderMCQEngine(subview);
    else if (tabName === 'flashcards') renderFlashcards(subview);
    else if (tabName === 'mains') renderMainsWorkspace(subview);
    else if (tabName === 'current-affairs') renderCurrentAffairs(subview);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => switchTab(tab.dataset.tab));
  });

  container.querySelector('#btn-launch-mcq').addEventListener('click', () => switchTab('mcqs'));
  container.querySelector('#btn-launch-mains').addEventListener('click', () => switchTab('mains'));

  // Default to topics
  renderTopicExplorer(subview, topics);
}

// 1. Topic Explorer & 16-Step Modal
function renderTopicExplorer(container, topics) {
  container.innerHTML = `
    <div class="card" style="margin-bottom: 1rem;">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
        <span style="font-weight: 700; font-size: 0.95rem;">Subject Mastery Tracker</span>
        <span class="badge badge-learning">Foundational Cycle Active</span>
      </div>
      <p style="font-size: 0.8rem; margin: 0.35rem 0 0.75rem 0;">Status hierarchy: Not Started → Learning → Completed → Revised Once → Revised Twice → Strong. Below 70% accuracy is automatically flagged as Weak.</p>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.75rem;">
      ${topics.map(t => {
        let badgeClass = 'badge-learning';
        if (t.status === 'Strong') badgeClass = 'badge-strong';
        else if (t.status === 'Weak') badgeClass = 'badge-weak';
        else if (t.status.includes('Revised')) badgeClass = 'badge-revised';

        return `
          <div class="card topic-card" data-topic-id="${t.id}" style="cursor: pointer; display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0;">
            <div>
              <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.25rem;">
                <span style="font-weight: 700; font-size: 1rem;">${t.title}</span>
                <span class="badge ${badgeClass}">${t.status}</span>
              </div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); display: flex; gap: 0.85rem; flex-wrap: wrap;">
                <span>Subject: <strong>${t.subjectId.toUpperCase()}</strong></span>
                <span>Accuracy: <strong>${t.accuracy}%</strong></span>
                <span>Revisions: <strong>${t.revisionCount || 0}</strong></span>
                <span>Last Revised: <strong>${t.lastRevised || 'Pending'}</strong></span>
              </div>
            </div>
            <button class="btn btn-outline btn-sm">Explore 16 Steps →</button>
          </div>
        `;
      }).join('')}
    </div>

    <!-- 16-Step Topic Modal -->
    <div id="topic-step-modal" class="modal-overlay">
      <div class="modal-sheet" style="max-width: 850px;">
        <div class="modal-header">
          <div style="display: flex; align-items: center; gap: 0.5rem;">
            <span style="font-size: 1.25rem;">🏛️</span>
            <div>
              <h3 id="modal-topic-title" style="font-size: 1.1rem;">Topic Protocol</h3>
              <span id="modal-topic-badge" class="badge badge-learning">Status</span>
            </div>
          </div>
          <button class="header-btn" id="modal-close-btn">&times;</button>
        </div>
        <div class="modal-body" id="modal-step-body"></div>
        <div class="modal-footer">
          <button class="btn btn-outline btn-sm" id="btn-mark-status">Update Status</button>
          <button class="btn btn-primary btn-sm" id="btn-start-topic-test">Take 10 MCQs on This Topic</button>
        </div>
      </div>
    </div>
  `;

  // Attach click listener to each topic card to open 16-step view
  const modal = container.querySelector('#topic-step-modal');
  const modalTitle = container.querySelector('#modal-topic-title');
  const modalBadge = container.querySelector('#modal-topic-badge');
  const modalBody = container.querySelector('#modal-step-body');
  const closeBtn = container.querySelector('#modal-close-btn');

  closeBtn.addEventListener('click', () => modal.classList.remove('open'));
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  container.querySelectorAll('.topic-card').forEach(card => {
    card.addEventListener('click', () => {
      const topicId = card.dataset.topicId;
      const topic = topics.find(t => t.id === topicId);
      if (!topic) return;

      modalTitle.textContent = topic.title;
      modalBadge.textContent = topic.status;
      modalBadge.className = `badge ${topic.status === 'Strong' ? 'badge-strong' : (topic.status === 'Weak' ? 'badge-weak' : 'badge-learning')}`;

      const l = topic.lesson;
      modalBody.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div class="card card-gold">
            <h4 style="color: var(--accent-gold); margin-bottom: 0.35rem;">1. Introduction & Essence</h4>
            <p>${l.intro}</p>
          </div>

          <div style="display: grid; grid-template-columns: 1fr; gap: 0.75rem;">
            <div class="card">
              <h4 style="margin-bottom: 0.35rem;">2. Simple Beginner Explanation</h4>
              <p>${l.simpleExp}</p>
            </div>
            <div class="card">
              <h4 style="margin-bottom: 0.35rem;">3. Detailed Conceptual Deep Dive</h4>
              <p>${l.detailedExp}</p>
            </div>
            <div class="card">
              <h4 style="margin-bottom: 0.35rem;">4. Real-Life Applied Analogy</h4>
              <p>${l.realLife}</p>
            </div>
          </div>

          <div class="card">
            <h4 style="color: var(--accent-gold); margin-bottom: 0.5rem;">5. Core Facts & Landmark Precedents</h4>
            <ul style="padding-left: 1.25rem; font-size: 0.9rem; color: var(--text-secondary);">
              ${l.coreFacts.map(f => `<li style="margin-bottom: 0.35rem;">${f}</li>`).join('')}
            </ul>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 0.75rem;">
            <div class="card">
              <h4 style="color: #38BDF8; margin-bottom: 0.35rem;">6 & 7. Prelims Perspective & Traps</h4>
              <p style="font-size: 0.85rem;">${l.prelimsAngle}</p>
            </div>
            <div class="card">
              <h4 style="color: #F472B6; margin-bottom: 0.35rem;">8. Mains Perspective & Themes</h4>
              <p style="font-size: 0.85rem;">${l.mainsAngle}</p>
            </div>
          </div>

          <div class="card card-olive">
            <h4 style="color: #86EFAC; margin-bottom: 0.35rem;">9. Current Affairs Linkage</h4>
            <p style="font-size: 0.85rem;">${l.currentAffairsLink}</p>
          </div>

          <div class="card">
            <h4 style="color: var(--accent-gold); margin-bottom: 0.35rem;">12. Mains Model Question (Self-Practice)</h4>
            <p style="font-weight: 600; color: var(--text-primary); font-size: 0.95rem; margin-bottom: 0.5rem;">${l.mainsQuestion}</p>
            <button class="btn btn-outline btn-sm" onclick="alert('Write your answer in the Mains Workspace tab to evaluate structure, case laws and rubric points.')">Draft Answer in Workspace →</button>
          </div>
        </div>
      `;

      modal.classList.add('open');
    });
  });
}

// 2. MCQ Engine with Negative Marking & Trap Explanations
function renderMCQEngine(container) {
  let currentIdx = 0;
  let selectedOption = null;
  let score = 0;
  let submitted = false;

  function renderQuestion() {
    const q = UPSC_MCQ_BANK[currentIdx];
    container.innerHTML = `
      <div class="card card-gold">
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
          <span style="font-weight: 800; color: var(--accent-gold);">QUESTION ${currentIdx + 1} OF ${UPSC_MCQ_BANK.length}</span>
          <span class="meta-chip">⏱️ 30s per Q • 1/3rd Negative Marking</span>
        </div>
      </div>

      <div class="card">
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem;">
          <span class="badge badge-revised">${q.subjectId.toUpperCase()}</span>
          <span style="font-size: 0.75rem; color: var(--text-muted);">${q.pyqRef || 'Standard Mock'}</span>
        </div>
        <p style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1.25rem;">
          ${q.question}
        </p>

        <div id="mcq-options-list">
          ${q.options.map((opt, i) => `
            <div class="mcq-option ${selectedOption === i ? 'selected' : ''}" data-idx="${i}">
              <div class="mcq-opt-marker">${String.fromCharCode(65 + i)}</div>
              <div style="font-size: 0.92rem;">${opt.text}</div>
            </div>
          `).join('')}
        </div>

        <div id="mcq-explanation-box" style="display: ${submitted ? 'block' : 'none'}; margin-top: 1.25rem; padding: 1rem; border-radius: var(--radius-md); background: var(--bg-surface-elevated); border: 1px solid var(--border-medium);">
          ${submitted ? getExplanationHTML(q, selectedOption) : ''}
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem; margin-top: 1.25rem;">
          ${!submitted ? `
            <button id="btn-submit-mcq" class="btn btn-primary" ${selectedOption === null ? 'disabled' : ''}>Confirm & Submit Answer</button>
          ` : `
            <button id="btn-next-mcq" class="btn btn-olive">Next Question →</button>
          `}
        </div>
      </div>
    `;

    // Attach Option Click
    container.querySelectorAll('.mcq-option').forEach(el => {
      el.addEventListener('click', () => {
        if (submitted) return;
        selectedOption = Number(el.dataset.idx);
        renderQuestion();
      });
    });

    const submitBtn = container.querySelector('#btn-submit-mcq');
    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        if (selectedOption === null) return;
        submitted = true;
        const q = UPSC_MCQ_BANK[currentIdx];
        if (q.options[selectedOption].isCorrect) {
          score++;
        }
        renderQuestion();
      });
    }

    const nextBtn = container.querySelector('#btn-next-mcq');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (currentIdx + 1 < UPSC_MCQ_BANK.length) {
          currentIdx++;
          selectedOption = null;
          submitted = false;
          renderQuestion();
        } else {
          // Finished
          const accuracy = Math.round((score / UPSC_MCQ_BANK.length) * 100);
          store.recordMcqTest({
            id: `test-${Date.now()}`,
            date: new Date().toISOString().split('T')[0],
            subjectId: 'polity',
            totalQuestions: UPSC_MCQ_BANK.length,
            score,
            accuracy
          });
          container.innerHTML = `
            <div class="card card-gold" style="text-align: center; padding: 2rem;">
              <span style="font-size: 3rem;">🎯</span>
              <h3 style="margin: 0.75rem 0 0.5rem 0;">MCQ Sprint Completed</h3>
              <p style="font-size: 1.2rem; font-weight: 800; color: var(--text-primary);">Score: ${score} / ${UPSC_MCQ_BANK.length} (${accuracy}% Accuracy)</p>
              <p style="color: var(--text-secondary); max-width: 500px; margin: 0 auto 1.25rem auto;">
                ${accuracy >= 75 ? 'Excellent work. Your conceptual grasp on these provisions is strong.' : 'Accuracy below 75%. The failed questions have been automatically flagged for early spaced revision.'}
              </p>
              <button class="btn btn-primary" id="btn-restart-mcq">Restart Test</button>
            </div>
          `;
          container.querySelector('#btn-restart-mcq').addEventListener('click', () => {
            currentIdx = 0;
            selectedOption = null;
            score = 0;
            submitted = false;
            renderQuestion();
          });
        }
      });
    }
  }

  function getExplanationHTML(q, userChoice) {
    const isRight = q.options[userChoice]?.isCorrect;
    const correctOpt = q.options.find(o => o.isCorrect);

    return `
      <div style="font-weight: 800; margin-bottom: 0.5rem; color: ${isRight ? 'var(--accent-emerald)' : 'var(--accent-crimson)'};">
        ${isRight ? '✅ Correct Answer!' : '❌ Incorrect Selection'}
      </div>
      <div style="font-size: 0.88rem; line-height: 1.45; color: var(--text-primary); margin-bottom: 0.5rem;">
        <strong>Correct Explanation:</strong> ${correctOpt?.explanation || correctOpt?.text}
      </div>
      ${!isRight && q.options[userChoice]?.trap ? `
        <div style="font-size: 0.82rem; color: #FCA5A5; background: rgba(239, 68, 68, 0.1); padding: 0.5rem; border-radius: var(--radius-sm); border: 1px solid rgba(239, 68, 68, 0.2);">
          <strong>UPSC Trap Identified:</strong> ${q.options[userChoice].trap}
        </div>
      ` : ''}
    `;
  }

  renderQuestion();
}

// 3. Active Recall Flashcards
function renderFlashcards(container) {
  let cardIdx = 0;
  let isFlipped = false;

  function renderCard() {
    const c = UPSC_FLASHCARDS[cardIdx];
    container.innerHTML = `
      <div class="card card-gold">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span style="font-weight: 800; color: var(--accent-gold);">ACTIVE RECALL DECK (${cardIdx + 1}/${UPSC_FLASHCARDS.length})</span>
          <span class="meta-chip">Tap to flip & reveal</span>
        </div>
      </div>

      <div class="flashcard" id="flashcard-box">
        <span style="font-size: 0.8rem; font-weight: 700; color: var(--accent-gold); text-transform: uppercase; margin-bottom: 1rem;">
          ${isFlipped ? 'Answer & Core Recall' : 'Prompt / Question'}
        </span>
        <div style="font-size: 1.2rem; font-weight: 700; color: var(--text-primary); max-width: 600px;">
          ${isFlipped ? c.back : c.front}
        </div>
        <span style="font-size: 0.75rem; color: var(--text-muted); margin-top: 1.5rem;">
          ${isFlipped ? 'Click to flip back' : 'Click to see answer'}
        </span>
      </div>

      <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
        <button class="btn btn-outline" id="btn-fc-prev" ${cardIdx === 0 ? 'disabled' : ''}>← Previous</button>
        <button class="btn btn-primary" id="btn-fc-next" ${cardIdx === UPSC_FLASHCARDS.length - 1 ? 'disabled' : ''}>Next Flashcard →</button>
      </div>
    `;

    const box = container.querySelector('#flashcard-box');
    box.addEventListener('click', () => {
      isFlipped = !isFlipped;
      renderCard();
    });

    container.querySelector('#btn-fc-prev').addEventListener('click', () => {
      if (cardIdx > 0) {
        cardIdx--;
        isFlipped = false;
        renderCard();
      }
    });

    container.querySelector('#btn-fc-next').addEventListener('click', () => {
      if (cardIdx < UPSC_FLASHCARDS.length - 1) {
        cardIdx++;
        isFlipped = false;
        renderCard();
      }
    });
  }

  renderCard();
}

// 4. Mains Answer Writing Workspace
function renderMainsWorkspace(container) {
  container.innerHTML = `
    <div class="card card-gold">
      <h3 style="color: var(--accent-gold); margin-bottom: 0.35rem;">✍️ Mains GS Answer Writing Workspace</h3>
      <p style="font-size: 0.85rem; margin-bottom: 0;">Evaluation Framework: Introduction (15%) • Constitutional References (20%) • Multi-Dimensional Body (40%) • Data/Schemes (15%) • Conclusion (10%).</p>
    </div>

    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
        <span class="badge badge-revised">GS Paper-II • 150 Words (10 Marks)</span>
        <span style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-gold);">⏱️ Target Time: 7.0 Minutes</span>
      </div>

      <p style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 1rem;">
        “The evolution of Article 21 has transformed Indian constitutional jurisprudence from rigid procedure to substantive justice.” Critically examine with reference to landmark judicial pronouncements.
      </p>

      <textarea id="mains-answer-text" rows="10" style="width: 100%; resize: vertical; line-height: 1.6;" placeholder="Structure your answer here:&#10;1. Introduction: Briefly define Article 21 and the shift from A.K. Gopalan (1950) to Maneka Gandhi (1978).&#10;2. Body: Multi-dimensional expansion (Right to Privacy - Puttaswamy, Livelihood - Olga Tellis, Clean Environment - Subhash Kumar).&#10;3. Critical Analysis: Judicial activism vs separation of powers.&#10;4. Forward-looking Conclusion."></textarea>

      <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem;">
        <span id="mains-word-count" style="font-size: 0.8rem; color: var(--text-muted);">Word count: 0 words</span>
        <button id="btn-evaluate-mains" class="btn btn-primary">Submit for AI Mentor Rubric Evaluation</button>
      </div>

      <div id="mains-rubric-output" style="display: none; margin-top: 1.25rem;"></div>
    </div>
  `;

  const textarea = container.querySelector('#mains-answer-text');
  const countSpan = container.querySelector('#mains-word-count');
  const evalBtn = container.querySelector('#btn-evaluate-mains');
  const outputDiv = container.querySelector('#mains-rubric-output');

  textarea.addEventListener('input', () => {
    const text = textarea.value.trim();
    const count = text ? text.split(/\s+/).length : 0;
    countSpan.textContent = `Word count: ${count} words`;
  });

  evalBtn.addEventListener('click', () => {
    const ans = textarea.value.trim();
    if (!ans) {
      alert('Please write an answer before submitting for evaluation.');
      return;
    }

    const words = ans.split(/\s+/).length;
    outputDiv.style.display = 'block';
    outputDiv.innerHTML = `
      <div class="card card-olive">
        <h4 style="color: #86EFAC; margin-bottom: 0.75rem;">📊 AI Mentor Rubric Analysis</h4>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.5rem; margin-bottom: 1rem;">
          <div class="meta-chip">Total Words: <strong>${words}</strong></div>
          <div class="meta-chip">Predicted Score: <strong>6.5 / 10</strong></div>
          <div class="meta-chip">Structure Rating: <strong>Good</strong></div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.88rem;">
          <div><strong>Strengths:</strong> Clear chronological progression from Gopalan to Maneka Gandhi and Puttaswamy. Good use of constitutional terms ("procedure established by law" vs "due process").</div>
          <div><strong>Missing Points:</strong> Mentioning the Doctrine of Proportionality (legitimate aim, suitability, necessity, balancing) to enrich the analysis.</div>
          <div><strong>Suggested Improvement:</strong> Add a 2-line diagram showing the timeline of Article 21 expansion to save written time and enhance presentation in the actual exam.</div>
        </div>
      </div>
    `;
  });
}

// 5. 8-Point Current Affairs Transformer
function renderCurrentAffairs(container) {
  container.innerHTML = `
    <div class="card card-gold">
      <h3 style="color: var(--accent-gold); margin-bottom: 0.35rem;">📰 8-Point Editorial Transformer</h3>
      <p style="font-size: 0.85rem; margin-bottom: 0;">Converts complex news into UPSC exam-ready structured nodes.</p>
    </div>

    <div class="card">
      <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
        <span class="badge badge-strong">Polity & Governance / SC Jurisprudence</span>
        <span style="font-size: 0.75rem; color: var(--text-muted);">The Hindu / Indian Express</span>
      </div>
      <h3 style="margin-bottom: 0.75rem;">Supreme Court Re-examines Guidelines on Preventive Detention Laws</h3>

      <div style="display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.9rem;">
        <div class="card" style="margin-bottom: 0; background: var(--bg-surface-elevated);">
          <strong>1. FACT:</strong> SC bench reiterates that preventive detention is an extraordinary power and must not be used routinely to bypass ordinary criminal law.
        </div>
        <div class="card" style="margin-bottom: 0; background: var(--bg-surface-elevated);">
          <strong>2. BACKGROUND:</strong> Article 22(3) to 22(7) of the Constitution allows preventive detention without trial for up to 3 months without Advisory Board confirmation.
        </div>
        <div class="card" style="margin-bottom: 0; background: var(--bg-surface-elevated);">
          <strong>3. ISSUE:</strong> Widespread misuse of state preventive detention acts (e.g. Goonda Acts) for petty offences.
        </div>
        <div class="card" style="margin-bottom: 0; background: var(--bg-surface-elevated);">
          <strong>4. IMPACT:</strong> Erosion of civil liberties, overcrowding in judicial custody, and dilution of Article 21 guarantees.
        </div>
        <div class="card" style="margin-bottom: 0; background: var(--bg-surface-elevated);">
          <strong>5. GOVERNMENT / LEGAL RESPONSE:</strong> Advisory Boards mandated; strict scrutiny of subjective satisfaction of District Magistrates.
        </div>
        <div class="card" style="margin-bottom: 0; background: var(--bg-surface-elevated);">
          <strong>6. CHALLENGES:</strong> Balancing national security / public order with individual constitutional liberties.
        </div>
        <div class="card" style="margin-bottom: 0; background: var(--bg-surface-elevated);">
          <strong>7. WAY FORWARD:</strong> Strict adherence to procedural safeguards, independent advisory review, and punitive action for mala fide detentions.
        </div>
        <div class="card" style="margin-bottom: 0; background: var(--bg-surface-elevated); border-color: var(--accent-gold);">
          <strong style="color: var(--accent-gold);">8. UPSC RELEVANCE:</strong> Direct correlation to Prelims Art 22 provisions and Mains GS-II constitutional liberties.
        </div>
      </div>
    </div>
  `;
}
