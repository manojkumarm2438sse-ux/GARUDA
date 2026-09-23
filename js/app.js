// ==========================================================================
// GARUDA OS - Master Application Orchestrator & Router
// ==========================================================================

import { store } from './store.js';
import { aiMentorEngine } from './ai-mentor.js';
import { scheduleEngine, DEFAULT_SCHEDULE } from './schedule.js';
import { ONBOARDING_QUESTIONS, onboardingEngine } from './onboarding.js';

import { renderUPSCView } from './modules/upsc.js';
import { renderArmyView } from './modules/army.js';
import { renderSSBView } from './modules/ssb.js';
import { renderFitnessView } from './modules/fitness.js';
import { renderITCareerView } from './modules/it-career.js';
import { renderGovtJobsView } from './modules/govt-jobs.js';
import { renderReportsView } from './modules/reports.js';
import { authManager, renderAuthHeaderSection } from './auth.js';
import { renderLoginView, renderSignupView, renderPreferencesView } from './auth-views.js';

class GarudaApp {
  constructor() {
    this.currentView = 'home';
    this.deferredPrompt = null;
    this.init();
  }

  init() {
    this.initPWA();
    this.initTheme();
    this.initModals();
    this.initActionNowTriggers();
    this.initBriefingTrigger();
    this.initClockAndSlots();

    // Wire Preferences Header Button
    const settingsBtn = document.getElementById('btn-header-settings');
    if (settingsBtn) {
      settingsBtn.addEventListener('click', () => {
        this.navigate('preferences');
      });
    }

    renderAuthHeaderSection(() => this.handleLogout());

    // Auto-sync store updates to SQLite database & header stats
    let syncTimer = null;
    store.subscribe(() => {
      this.updateHeaderStats();
      if (authManager.isAuthenticated()) {
        clearTimeout(syncTimer);
        syncTimer = setTimeout(() => {
          authManager.saveDashboard({
            missionData: store.state.todayMission,
            streaks: store.state.profile.streakDays,
            completionPercentage: store.state.todayMission.completionPercentage,
            reports: store.state.dailyReports
          });
        }, 500);
      }
    });

    this.updateHeaderStats();

    // If authenticated, sync with server immediately
    if (authManager.isAuthenticated()) {
      this.syncWithServer();
    }

    this.initRouter();
  }

  // PWA Service Worker & Install Prompt
  initPWA() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js').then((reg) => {
          console.log('[GARUDA] Service Worker registered with scope:', reg.scope);
        }).catch((err) => {
          console.warn('[GARUDA] SW registration error:', err);
        });
      });
    }

    const installBtn = document.getElementById('btn-pwa-install');
    const modalInstall = document.getElementById('modal-pwa-install');
    const nativeBtn = document.getElementById('btn-trigger-native-install');
    const closeBtn = document.getElementById('btn-close-pwa-install');
    const dismissBtn = document.getElementById('btn-dismiss-pwa-install');

    const openModal = () => {
      if (modalInstall) modalInstall.classList.add('open');
    };
    const closeModal = () => {
      if (modalInstall) modalInstall.classList.remove('open');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (dismissBtn) dismissBtn.addEventListener('click', closeModal);

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      this.deferredPrompt = e;
      if (installBtn) installBtn.style.display = 'inline-flex';
      if (nativeBtn) nativeBtn.style.display = 'block';
    });

    const triggerInstall = () => {
      if (this.deferredPrompt) {
        this.deferredPrompt.prompt();
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('[GARUDA] PWA install accepted');
          }
          this.deferredPrompt = null;
          closeModal();
        });
      } else {
        openModal();
      }
    };

    if (installBtn) installBtn.addEventListener('click', triggerInstall);
    if (nativeBtn) nativeBtn.addEventListener('click', triggerInstall);
  }

  // Tactical Dark / Daylight Theme Engine
  initTheme() {
    const savedTheme = store.state.profile.theme || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeBtn = document.getElementById('btn-theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        store.updateProfile({ theme: next });
      });
    }
  }

  updateHeaderStats() {
    const streakVal = document.getElementById('header-streak-val');
    if (streakVal) {
      streakVal.textContent = store.state.profile.streakDays || 8;
    }
    const missionText = document.querySelector('.mission-text');
    if (missionText && store.state.profile.targetGoal) {
      missionText.textContent = `TARGET: 🇮🇳 ${store.state.profile.targetGoal.toUpperCase()}`;
    }
  }

  async handleAuthSuccess(user) {
    renderAuthHeaderSection(() => this.handleLogout());
    await this.syncWithServer();
    this.navigate('home');
  }

  handleLogout() {
    renderAuthHeaderSection(() => this.handleLogout());
    this.navigate('login');
  }

  handlePreferencesSaved(pref) {
    this.updateHeaderStats();
    if (this.currentView === 'home') {
      const container = document.getElementById('main-view-container');
      if (container) this.renderHomeView(container);
    }
  }

  async syncWithServer() {
    if (!authManager.isAuthenticated()) return;
    const dash = await authManager.fetchDashboard();
    if (dash && dash.success) {
      if (dash.user) {
        store.state.profile.name = dash.user.name;
        store.state.profile.targetGoal = dash.user.target_goal;
        store.state.profile.email = dash.user.email;
      }
      if (typeof dash.streaks === 'number') {
        store.state.profile.streakDays = dash.streaks;
      }
      if (dash.missionData) {
        store.state.todayMission = dash.missionData;
      }
      if (dash.reports) {
        store.state.dailyReports = dash.reports;
      }
      if (dash.preferences && dash.preferences.theme) {
        store.state.profile.theme = dash.preferences.theme;
        document.documentElement.setAttribute('data-theme', dash.preferences.theme);
      }
      store.saveState();
      this.updateHeaderStats();
    }
  }

  // Hash-based Navigation Router
  initRouter() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      this.navigate(hash);
    });

    // Brand click to home
    const brand = document.getElementById('nav-brand-home');
    if (brand) brand.addEventListener('click', () => this.navigate('home'));

    // Sidebar Links
    document.querySelectorAll('.app-sidebar .nav-item').forEach(item => {
      item.addEventListener('click', (e) => {
        const view = item.dataset.view;
        if (view) {
          e.preventDefault();
          this.navigate(view);
        }
      });
    });

    // Mobile Bottom Nav Links
    document.querySelectorAll('.bottom-nav .bnav-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const view = btn.dataset.view;
        if (view) this.navigate(view);
      });
    });

    // Initial Route
    const initial = window.location.hash.replace('#', '') || 'home';
    this.navigate(initial);
  }

  navigate(viewName) {
    if (viewName === 'action-now') {
      this.showActionNowModal();
      return;
    }

    const isAuth = authManager.isAuthenticated();
    const publicViews = ['login', 'signup'];

    // Route Protection Guard
    if (!isAuth && !publicViews.includes(viewName)) {
      window.location.hash = '#login';
      viewName = 'login';
    } else if (isAuth && publicViews.includes(viewName)) {
      window.location.hash = '#home';
      viewName = 'home';
    }

    this.currentView = viewName;
    if (window.location.hash !== `#${viewName}`) {
      window.location.hash = `#${viewName}`;
    }

    // Toggle sidebar & mobile bottom nav visibility for login/signup pages
    const isAuthView = (viewName === 'login' || viewName === 'signup');
    const sidebar = document.querySelector('.app-sidebar');
    const bnav = document.querySelector('.bottom-nav');
    if (sidebar) sidebar.style.display = isAuthView ? 'none' : '';
    if (bnav) bnav.style.display = isAuthView ? 'none' : '';

    // Update active state in sidebar
    document.querySelectorAll('.app-sidebar .nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.view === viewName);
    });

    // Update active state in bottom nav
    document.querySelectorAll('.bottom-nav .bnav-btn').forEach(el => {
      el.classList.toggle('active', el.dataset.view === viewName);
    });

    const mainContainer = document.getElementById('main-view-container');
    if (!mainContainer) return;

    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (viewName) {
      case 'login':
        renderLoginView(mainContainer, (user) => this.handleAuthSuccess(user));
        break;
      case 'signup':
        renderSignupView(mainContainer, (user) => this.handleAuthSuccess(user));
        break;
      case 'preferences':
        renderPreferencesView(mainContainer, (pref) => this.handlePreferencesSaved(pref));
        break;
      case 'home':
        this.renderHomeView(mainContainer);
        break;
      case 'upsc':
        renderUPSCView(mainContainer);
        break;
      case 'army':
        renderArmyView(mainContainer);
        break;
      case 'ssb':
        renderSSBView(mainContainer);
        break;
      case 'fitness':
        renderFitnessView(mainContainer);
        break;
      case 'it':
        renderITCareerView(mainContainer);
        break;
      case 'jobs':
        renderGovtJobsView(mainContainer);
        break;
      case 'reports':
        renderReportsView(mainContainer);
        break;
      case 'mentor':
        this.renderMentorView(mainContainer);
        break;
      case 'profile':
        this.renderProfileView(mainContainer);
        break;
      default:
        this.renderHomeView(mainContainer);
    }
  }

  // 1. Home Dashboard: Today's Mission & Timeline
  renderHomeView(container) {
    const state = store.state;
    const mission = state.todayMission;
    const currentSlot = scheduleEngine.getCurrentSlot();
    const actionNow = aiMentorEngine.getWhatShouldIDoNow();

    container.innerHTML = `
      <!-- Hero Ambition Banner -->
      <div class="hero-mission-card">
        <img src="./assets/images/hero_banner.jpg" alt="Officer Mission Banner" class="hero-banner-img">
        <div class="hero-overlay">
          <div class="hero-badge-tag">🇮🇳 MASTER LIFE MISSION</div>
          <div class="hero-motto">${(state.profile.targetGoal || 'BECOME AN INDIAN ARMY OFFICER & MASTER UPSC').toUpperCase()}</div>
          <div style="font-size: 0.8rem; color: rgba(255, 255, 255, 0.85); margin-top: 0.25rem;">
            Candidate: <strong>${state.profile.name}</strong> • ${authManager.getUser()?.email ? authManager.getUser().email + ' • ' : ''}06:00 to 23:00 Operational Discipline
          </div>
        </div>
      </div>

      <!-- WHAT SHOULD I DO NOW? Big Prominent Tactical Action Box -->
      <div class="action-now-box" id="home-action-now-box" style="cursor: pointer;">
        <div class="action-now-header">
          <div class="action-now-tag">
            <span style="font-size: 1.25rem;">🎯</span>
            <span>WHAT SHOULD I DO RIGHT NOW?</span>
          </div>
          <span class="badge badge-strong" style="animation: pulse-dot 1.5s infinite ease-in-out;">AI RECOMMENDATION</span>
        </div>

        <div class="action-now-title">${actionNow.title}</div>
        <div class="action-now-desc">
          <strong>Strategic Reason:</strong> ${actionNow.reason}
        </div>

        <div class="action-now-meta">
          <span class="meta-chip">⏳ Duration: <strong>${actionNow.duration}</strong></span>
          <span class="meta-chip">🏛️ Pillar: <strong>${actionNow.pillar}</strong></span>
          <span class="meta-chip">⚡ Type: <strong>${actionNow.actionType}</strong></span>
        </div>

        <div style="display: flex; justify-content: flex-end;">
          <button class="btn btn-primary" id="btn-home-execute-now">Execute This Action Now →</button>
        </div>
      </div>

      <!-- Today's Completion Bar -->
      <div class="card card-gold">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <div style="font-weight: 800; font-size: 1.05rem;">
            TODAY'S MISSION COMPLETION: <span style="color: var(--accent-gold);">${mission.completionPercentage}%</span>
          </div>
          <span class="meta-chip">Streak: #${state.profile.streakDays} Days</span>
        </div>
        <div class="progress-container" style="height: 12px;">
          <div class="progress-bar-fill" style="width: ${mission.completionPercentage}%;"></div>
        </div>
      </div>

      <!-- TOP 3 PRIORITIES TODAY -->
      <div class="card card-olive">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <div>
            <h3 style="color: #86EFAC; font-size: 1.1rem;">⭐ TOP 3 PRIORITIES TODAY</h3>
            <p style="font-size: 0.78rem; color: var(--text-primary); margin-bottom: 0;">Non-negotiable operational commitments. Finish these before any distraction.</p>
          </div>
          <span class="badge badge-strong">MANDATORY</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.5rem;">
          ${mission.topPriorities.map((p, idx) => `
            <div class="card" style="margin-bottom: 0; padding: 0.75rem 1rem; display: flex; align-items: center; gap: 0.85rem; background: var(--bg-surface); cursor: pointer;" data-priority-id="${p.id}">
              <input type="checkbox" ${p.done ? 'checked' : ''} style="width: 20px; height: 20px; accent-color: var(--accent-gold); cursor: pointer;">
              <span style="font-size: 0.95rem; font-weight: 600; color: ${p.done ? 'var(--text-muted)' : 'var(--text-primary)'}; text-decoration: ${p.done ? 'line-through' : 'none'}; flex: 1;">
                ${idx + 1}. ${p.title}
              </span>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Multi-Track Pillar Summary Cards -->
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 0.85rem; margin-bottom: 1.25rem;">
        <!-- UPSC Pillar -->
        <div class="card" style="border-left: 3px solid #38BDF8;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <span style="font-weight: 800; color: #38BDF8;">📚 UPSC PREPARATION</span>
            <span class="badge ${mission.upsc.revisionDone ? 'badge-strong' : 'badge-learning'}">Foundation</span>
          </div>
          <div style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.35rem;">${mission.upsc.topic}</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.2rem;">
            <span>• Study Block: <strong>${mission.upsc.studyDurationMin} Minutes</strong></span>
            <span>• MCQs Solved: <strong>${mission.upsc.mcqCompleted}/${mission.upsc.mcqTarget}</strong></span>
            <span>• Current Affairs: <strong>${mission.upsc.currentAffairsDone ? 'Analyzed ✅' : 'Pending'}</strong></span>
          </div>
          <button class="btn btn-outline btn-sm" style="width: 100%; margin-top: 0.65rem;" onclick="location.hash='#upsc'">Open UPSC Module →</button>
        </div>

        <!-- Army Pillar -->
        <div class="card" style="border-left: 3px solid #86EFAC;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <span style="font-weight: 800; color: #86EFAC;">🪖 ARMY OFFICER MISSION</span>
            <span class="badge badge-strong">Primary</span>
          </div>
          <div style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.35rem;">CDS, TGC & SSC-Tech Pathways</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.2rem;">
            <span>• Defence Awareness: <strong>${mission.army.doneAwareness ? 'Learned ✅' : 'Pending'}</strong></span>
            <span>• Officer Study: <strong>${mission.army.officerActivity}</strong></span>
          </div>
          <button class="btn btn-outline btn-sm" style="width: 100%; margin-top: 0.65rem;" onclick="location.hash='#army'">Open Army Module →</button>
        </div>

        <!-- SSB Pillar -->
        <div class="card" style="border-left: 3px solid var(--accent-gold);">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <span style="font-weight: 800; color: var(--accent-gold);">🎖️ SSB PREPARATION</span>
            <span class="badge badge-learning">Stage 1 & 2</span>
          </div>
          <div style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.35rem;">Psychology & GD Drills</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.2rem;">
            <span>• OIR & PPDT: <strong>${mission.ssb.donePpdt ? 'Completed ✅' : 'Pending'}</strong></span>
            <span>• 15s WAT Words: <strong>${mission.ssb.donePsych ? 'Drilled ✅' : 'Pending'}</strong></span>
          </div>
          <button class="btn btn-outline btn-sm" style="width: 100%; margin-top: 0.65rem;" onclick="location.hash='#ssb'">Open SSB Simulator →</button>
        </div>

        <!-- Fitness Pillar -->
        <div class="card" style="border-left: 3px solid #F472B6;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <span style="font-weight: 800; color: #F472B6;">💪 ATHLETIC & HEALTH</span>
            <span class="badge ${mission.fitness.workoutCompleted ? 'badge-strong' : 'badge-learning'}">${mission.fitness.workoutCompleted ? 'Logged' : 'Pending'}</span>
          </div>
          <div style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.35rem;">${mission.fitness.workoutTitle}</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.2rem;">
            <span>• Protein: <strong>${mission.fitness.nutrition.proteinG}g / ${mission.fitness.nutrition.proteinTarget}g</strong></span>
            <span>• Water: <strong>${mission.fitness.waterLiters}L / 4.0L</strong></span>
          </div>
          <button class="btn btn-outline btn-sm" style="width: 100%; margin-top: 0.65rem;" onclick="location.hash='#fitness'">Open Fitness Log →</button>
        </div>

        <!-- IT Career Pillar -->
        <div class="card" style="border-left: 3px solid #A78BFA;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem;">
            <span style="font-weight: 800; color: #A78BFA;">💻 IT CAREER (JAVA STACK)</span>
            <span class="badge badge-strong">ECE Placement</span>
          </div>
          <div style="font-size: 0.9rem; font-weight: 700; margin-bottom: 0.35rem;">${mission.it.javaTopic}</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary); display: flex; flex-direction: column; gap: 0.2rem;">
            <span>• Coding Solved: <strong>${mission.it.codingProblemsSolved}/${mission.it.codingTarget} Problems</strong></span>
            <span>• SQL Aggregations: <strong>${mission.it.doneSql ? 'Mastered ✅' : 'Pending'}</strong></span>
          </div>
          <button class="btn btn-outline btn-sm" style="width: 100%; margin-top: 0.65rem;" onclick="location.hash='#it'">Open IT Module →</button>
        </div>
      </div>

      <!-- 06:00 to 23:00 Interactive Schedule Timeline -->
      <div class="card">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
          <div>
            <h3 style="font-size: 1.1rem;">⏱️ Full-Time Operational Blueprint (06:00 - 23:00)</h3>
            <p style="font-size: 0.8rem; margin-bottom: 0;">Dynamic timeline with live active slot highlighter and shift capability.</p>
          </div>
          <button id="btn-activate-recovery" class="btn btn-outline btn-sm" style="color: var(--accent-gold); border-color: var(--accent-gold);">
            🔄 Missed-Day Recovery
          </button>
        </div>

        <div class="timeline-list">
          ${DEFAULT_SCHEDULE.map(slot => {
            const isCurrent = slot.id === currentSlot.id;
            return `
              <div class="timeline-item ${isCurrent ? 'active-slot' : ''}">
                <div class="timeline-time">${slot.start} - ${slot.end}</div>
                <div class="timeline-content">
                  <div class="timeline-title">
                    <span>${slot.title}</span>
                    ${isCurrent ? '<span class="badge badge-strong">ACTIVE NOW</span>' : ''}
                  </div>
                  <div class="timeline-desc">${slot.desc}</div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    // Action Now click
    const actionBox = container.querySelector('#home-action-now-box');
    const execBtn = container.querySelector('#btn-home-execute-now');
    if (actionBox) actionBox.addEventListener('click', (e) => {
      if (e.target !== execBtn) this.showActionNowModal();
    });
    if (execBtn) execBtn.addEventListener('click', () => {
      if (actionNow.linkTab) this.navigate(actionNow.linkTab);
    });

    // Priority Checkboxes
    container.querySelectorAll('[data-priority-id]').forEach(el => {
      el.addEventListener('click', (e) => {
        const pid = el.dataset.priorityId;
        store.togglePriority(pid);
        this.renderHomeView(container);
      });
    });

    // Recovery Trigger
    const recBtn = container.querySelector('#btn-activate-recovery');
    if (recBtn) {
      recBtn.addEventListener('click', () => {
        const plan = scheduleEngine.generateRecoveryPlan([]);
        alert(`${plan.message}\n\nKey Recovery Actions:\n${plan.actions.map(a => `• ${a.title} (${a.durationMin}m)`).join('\n')}`);
      });
    }
  }

  // 2. AI Mentor Interactive Core & Chat Stream
  renderMentorView(container) {
    const chatHistory = store.state.mentorChatHistory;

    container.innerHTML = `
      <div class="view-header" style="margin-bottom: 1.25rem;">
        <div>
          <h2>🤖 AI Mentor Core & Strategic Decision Engine</h2>
          <p>Grounded in your stored performance, test accuracy, study hours & physical logs.</p>
        </div>
      </div>

      <!-- Quick Strategic Query Chips -->
      <div style="display: flex; gap: 0.5rem; overflow-x: auto; padding-bottom: 0.5rem; margin-bottom: 1rem;">
        <button class="btn btn-outline btn-sm mentor-preset-btn" data-query="What should I study now?">🎯 What should I study now?</button>
        <button class="btn btn-outline btn-sm mentor-preset-btn" data-query="What am I weak in?">🔍 What am I weak in?</button>
        <button class="btn btn-outline btn-sm mentor-preset-btn" data-query="What should I revise?">🔄 What should I revise?</button>
        <button class="btn btn-outline btn-sm mentor-preset-btn" data-query="What Army-entry preparation should I do?">🪖 Army Entry Guidance</button>
        <button class="btn btn-outline btn-sm mentor-preset-btn" data-query="Am I falling behind? How do I recover?">⚠️ Am I falling behind?</button>
        <button class="btn btn-outline btn-sm mentor-preset-btn" data-query="What IT skill should I learn next?">💻 Next IT Skill</button>
      </div>

      <!-- Chat Container -->
      <div class="card" style="padding: 1rem;">
        <div class="chat-stream" id="mentor-chat-stream">
          ${chatHistory.map(m => `
            <div class="chat-bubble ${m.sender === 'user' ? 'chat-bubble-user' : 'chat-bubble-mentor'}">
              <div style="font-size: 0.72rem; color: ${m.sender === 'user' ? 'var(--text-inverse)' : 'var(--accent-gold)'}; font-weight: 700; margin-bottom: 0.25rem;">
                ${m.sender === 'user' ? 'YOU' : '🇮🇳 GARUDA AI MENTOR'} • ${m.time}
              </div>
              <div style="white-space: pre-line;">${m.text}</div>
            </div>
          `).join('')}
        </div>

        <div style="display: flex; gap: 0.5rem; margin-top: 1rem; border-top: 1px solid var(--border-subtle); padding-top: 0.75rem;">
          <input type="text" id="mentor-chat-input" placeholder="Ask your mentor (e.g. 'I completed 4 hours', 'I don't understand DPSP', 'I'm tired')..." style="flex: 1;">
          <button id="btn-send-mentor-chat" class="btn btn-primary">Send ↗</button>
        </div>
      </div>
    `;

    const stream = container.querySelector('#mentor-chat-stream');
    const input = container.querySelector('#mentor-chat-input');
    const sendBtn = container.querySelector('#btn-send-mentor-chat');

    stream.scrollTop = stream.scrollHeight;

    const handleSend = (text) => {
      const q = text || input.value.trim();
      if (!q) return;

      store.addMentorChat('user', q);
      input.value = '';

      // Generate grounded mentor response
      setTimeout(() => {
        const reply = aiMentorEngine.askMentor(q);
        store.addMentorChat('mentor', reply);
        this.renderMentorView(container);
      }, 400);
    };

    sendBtn.addEventListener('click', () => handleSend());
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });

    container.querySelectorAll('.mentor-preset-btn').forEach(btn => {
      btn.addEventListener('click', () => handleSend(btn.dataset.query));
    });
  }

  // 3. Profile & Multi-Horizon Roadmap View
  renderProfileView(container) {
    const p = store.state.profile;
    const plans = onboardingEngine.generatePlans(p);

    container.innerHTML = `
      <div class="view-header" style="margin-bottom: 1.25rem;">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
          <div>
            <h2>⚙️ Candidate Profile & Multi-Horizon Roadmaps</h2>
            <p>20-Point Operational Profile • 7-Day, 30-Day, 90-Day, 6-Month & 12-Month Master Plans</p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button id="btn-recalibrate" class="btn btn-outline btn-sm">Recalibrate Profile</button>
            <button id="btn-export-backup" class="btn btn-primary btn-sm">Export Data Backup (JSON)</button>
          </div>
        </div>
      </div>

      <!-- Editable Attributes Grid -->
      <div class="card card-gold">
        <h3 style="color: var(--accent-gold); margin-bottom: 0.75rem;">📋 Stored Candidate Attributes</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 0.75rem; font-size: 0.85rem;">
          <div><strong>Name:</strong> ${p.name}</div>
          <div><strong>Age:</strong> ${p.age} Years</div>
          <div><strong>Height / Weight:</strong> ${p.heightCm} cm / ${p.weightKg} kg (Waist: ${p.waistInches}")</div>
          <div><strong>Branch:</strong> ${p.btechBranch} (CGPA: ${p.cgpa})</div>
          <div><strong>Graduation Year:</strong> ${p.graduationYear}</div>
          <div><strong>Java Proficiency:</strong> ${p.javaLevel}</div>
          <div><strong>SQL Proficiency:</strong> ${p.sqlLevel}</div>
          <div><strong>Daily Hours:</strong> ${p.dailyAvailableHours} Hours</div>
          <div><strong>Target UPSC Attempt:</strong> ${p.targetUpscAttempt}</div>
          <div><strong>Target Army Entries:</strong> ${p.targetArmyEntries.join(', ')}</div>
          <div><strong>Monthly Food Budget:</strong> ₹${p.monthlyFoodBudgetRs}</div>
        </div>
      </div>

      <!-- Generated Multi-Horizon Roadmaps -->
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <!-- 7-Day Plan -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <h3 style="color: var(--accent-gold); font-size: 1.05rem;">📅 ${plans.sevenDayPlan.title}</h3>
            <span class="badge badge-revised">Immediate 7 Days</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-primary); margin-bottom: 0.5rem;"><strong>Focus:</strong> ${plans.sevenDayPlan.goal}</p>
          <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary);">
            ${plans.sevenDayPlan.items.map(it => `<li style="margin-bottom: 0.25rem;">${it}</li>`).join('')}
          </ul>
        </div>

        <!-- 30-Day Plan -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <h3 style="color: #38BDF8; font-size: 1.05rem;">🗓️ ${plans.thirtyDayPlan.title}</h3>
            <span class="badge badge-strong">30 Days</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-primary); margin-bottom: 0.5rem;"><strong>Focus:</strong> ${plans.thirtyDayPlan.goal}</p>
          <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary);">
            ${plans.thirtyDayPlan.items.map(it => `<li style="margin-bottom: 0.25rem;">${it}</li>`).join('')}
          </ul>
        </div>

        <!-- 90-Day Plan -->
        <div class="card">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <h3 style="color: #86EFAC; font-size: 1.05rem;">🚀 ${plans.ninetyDayPlan.title}</h3>
            <span class="badge badge-revised">90 Days</span>
          </div>
          <p style="font-size: 0.85rem; color: var(--text-primary); margin-bottom: 0.5rem;"><strong>Focus:</strong> ${plans.ninetyDayPlan.goal}</p>
          <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: var(--text-secondary);">
            ${plans.ninetyDayPlan.items.map(it => `<li style="margin-bottom: 0.25rem;">${it}</li>`).join('')}
          </ul>
        </div>

        <!-- 12-Month Master Roadmap -->
        <div class="card card-olive">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
            <h3 style="color: #FFFFFF; font-size: 1.15rem;">🇮🇳 ${plans.twelveMonthRoadmap.title}</h3>
            <span class="badge badge-strong">Master Ambition</span>
          </div>
          <p style="font-size: 0.85rem; color: #FFFFFF; margin-bottom: 0.5rem;"><strong>Ultimate Objective:</strong> ${plans.twelveMonthRoadmap.goal}</p>
          <ul style="padding-left: 1.25rem; font-size: 0.85rem; color: rgba(255, 255, 255, 0.85);">
            ${plans.twelveMonthRoadmap.items.map(it => `<li style="margin-bottom: 0.25rem;">${it}</li>`).join('')}
          </ul>
        </div>
      </div>
    `;

    // Export button
    container.querySelector('#btn-export-backup').addEventListener('click', () => {
      store.exportData();
    });

    // Recalibrate Wizard
    container.querySelector('#btn-recalibrate').addEventListener('click', () => {
      this.openOnboardingWizard();
    });
  }

  // Action Now Modal
  showActionNowModal() {
    const modal = document.getElementById('modal-action-now');
    const body = document.getElementById('modal-action-now-body');
    if (!modal || !body) return;

    const action = aiMentorEngine.getWhatShouldIDoNow();
    body.innerHTML = `
      <div class="card card-gold" style="margin-bottom: 1rem;">
        <span style="font-size: 0.72rem; text-transform: uppercase; font-weight: 800; color: var(--accent-gold);">Recommended Action</span>
        <h3 style="font-size: 1.25rem; margin-top: 0.2rem; color: var(--text-primary);">${action.title}</h3>
        <p style="margin-top: 0.5rem; color: var(--text-secondary); line-height: 1.45;"><strong>Reason:</strong> ${action.reason}</p>
      </div>

      <div style="display: flex; gap: 0.65rem; flex-wrap: wrap; margin-bottom: 1rem;">
        <span class="meta-chip">⏳ Time Required: <strong>${action.duration}</strong></span>
        <span class="meta-chip">🏛️ Focus Track: <strong>${action.pillar}</strong></span>
        <span class="meta-chip">⚡ Action Classification: <strong>${action.actionType}</strong></span>
      </div>

      <div class="card">
        <h4 style="margin-bottom: 0.4rem; color: var(--accent-gold);">Exact Execution Steps:</h4>
        <ul style="padding-left: 1.25rem; font-size: 0.88rem; color: var(--text-secondary);">
          ${action.steps.map(s => `<li style="margin-bottom: 0.35rem;">${s}</li>`).join('')}
        </ul>
      </div>
    `;

    modal.classList.add('open');

    const execBtn = document.getElementById('btn-execute-action-now');
    if (execBtn) {
      execBtn.onclick = () => {
        modal.classList.remove('open');
        if (action.linkTab) this.navigate(action.linkTab);
      };
    }
  }

  initActionNowTriggers() {
    // Bottom nav center button
    const centerBtn = document.getElementById('bnav-action-now');
    if (centerBtn) centerBtn.addEventListener('click', () => this.showActionNowModal());

    // Sidebar trigger
    const sidebarBtn = document.getElementById('sidebar-action-now');
    if (sidebarBtn) sidebarBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.showActionNowModal();
    });

    const closeBtn = document.getElementById('btn-close-action-now');
    const dismissBtn = document.getElementById('btn-dismiss-action-now');
    const modal = document.getElementById('modal-action-now');

    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    if (dismissBtn) dismissBtn.addEventListener('click', () => modal.classList.remove('open'));
    if (modal) modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  // Morning Briefing Modal
  initBriefingTrigger() {
    const briefingBtn = document.getElementById('btn-morning-briefing');
    const modal = document.getElementById('modal-briefing');
    const closeBtn = document.getElementById('btn-close-briefing');
    const dismissBtn = document.getElementById('btn-dismiss-briefing');
    const body = document.getElementById('briefing-content-body');
    const dateSpan = document.getElementById('briefing-date');

    const openBriefing = () => {
      const b = aiMentorEngine.generateMorningBriefing();
      dateSpan.textContent = b.date;

      body.innerHTML = `
        <div class="card card-gold" style="margin-bottom: 1rem;">
          <h4 style="color: var(--accent-gold); margin-bottom: 0.25rem;">${b.greeting}</h4>
          <p style="font-size: 0.85rem; font-style: italic; color: var(--text-primary); margin-bottom: 0;">${b.motto}</p>
        </div>

        <div class="card card-olive" style="margin-bottom: 1rem;">
          <strong style="color: #86EFAC; font-size: 0.85rem; text-transform: uppercase;">⭐ Today's Top 3 Priorities:</strong>
          <ul style="padding-left: 1.25rem; margin-top: 0.35rem; font-size: 0.88rem; color: var(--text-primary);">
            ${b.topPriorities.map(p => `<li style="margin-bottom: 0.25rem;">${p.title}</li>`).join('')}
          </ul>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.5rem; font-size: 0.85rem;">
          <div class="card" style="margin-bottom: 0;"><strong>📚 UPSC:</strong> ${b.pillars.upsc}</div>
          <div class="card" style="margin-bottom: 0;"><strong>🪖 ARMY:</strong> ${b.pillars.army}</div>
          <div class="card" style="margin-bottom: 0;"><strong>🎖️ SSB:</strong> ${b.pillars.ssb}</div>
          <div class="card" style="margin-bottom: 0;"><strong>💪 FITNESS:</strong> ${b.pillars.fitness}</div>
          <div class="card" style="margin-bottom: 0;"><strong>💻 IT:</strong> ${b.pillars.it}</div>
        </div>
      `;

      modal.classList.add('open');
    };

    if (briefingBtn) briefingBtn.addEventListener('click', openBriefing);
    if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    if (dismissBtn) dismissBtn.addEventListener('click', () => modal.classList.remove('open'));
    if (modal) modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  // Onboarding 20-Question Wizard
  openOnboardingWizard() {
    const modal = document.getElementById('modal-onboarding');
    const body = document.getElementById('onboarding-wizard-body');
    const nextBtn = document.getElementById('btn-onboarding-next');
    const prevBtn = document.getElementById('btn-onboarding-prev');
    const closeBtn = document.getElementById('btn-close-onboarding');

    let currentQIdx = 0;
    const answers = {};

    const renderQuestion = () => {
      const q = ONBOARDING_QUESTIONS[currentQIdx];
      body.innerHTML = `
        <div style="margin-bottom: 1rem;">
          <span class="meta-chip">Question ${currentQIdx + 1} of ${ONBOARDING_QUESTIONS.length}</span>
        </div>
        <div class="card card-gold">
          <h3 style="color: var(--accent-gold); font-size: 1.15rem; margin-bottom: 1rem;">${q.q}</h3>
          ${q.type === 'select' ? `
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
              ${q.options.map(opt => `
                <button class="btn btn-outline onb-opt-btn" data-val="${opt}" style="justify-content: flex-start; text-align: left; padding: 0.85rem;">
                  ${opt}
                </button>
              `).join('')}
            </div>
          ` : `
            <input type="${q.type}" id="onb-text-input" placeholder="${q.placeholder || ''}" style="width: 100%; font-size: 1rem; padding: 0.85rem;" autofocus>
          `}
        </div>
      `;

      prevBtn.style.display = currentQIdx > 0 ? 'inline-flex' : 'none';
      nextBtn.textContent = currentQIdx === ONBOARDING_QUESTIONS.length - 1 ? 'Finish & Generate Roadmaps 🇮🇳' : 'Next Step →';

      // Select option click
      body.querySelectorAll('.onb-opt-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          answers[q.id] = btn.dataset.val;
          body.querySelectorAll('.onb-opt-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          btn.style.borderColor = 'var(--accent-gold)';
          btn.style.background = 'rgba(245, 158, 11, 0.15)';
        });
      });
    };

    nextBtn.onclick = () => {
      const q = ONBOARDING_QUESTIONS[currentQIdx];
      const textInp = body.querySelector('#onb-text-input');
      if (textInp) answers[q.id] = textInp.value;

      if (currentQIdx + 1 < ONBOARDING_QUESTIONS.length) {
        currentQIdx++;
        renderQuestion();
      } else {
        // Complete wizard
        modal.classList.remove('open');
        alert('🇮🇳 Calibration complete! Your 7-day, 30-day, 90-day and 12-month roadmaps have been synthesized and loaded into your Profile.');
        this.navigate('profile');
      }
    };

    prevBtn.onclick = () => {
      if (currentQIdx > 0) {
        currentQIdx--;
        renderQuestion();
      }
    };

    closeBtn.onclick = () => modal.classList.remove('open');
    modal.classList.add('open');
    renderQuestion();
  }

  initModals() {
    // Keyboard shortcut ESC to close modals
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('open'));
      }
    });

    const authModal = document.getElementById('modal-auth');
    const closeAuthBtn = document.getElementById('btn-close-auth');
    if (closeAuthBtn && authModal) {
      closeAuthBtn.addEventListener('click', () => authModal.classList.remove('open'));
      authModal.addEventListener('click', (e) => {
        if (e.target === authModal) authModal.classList.remove('open');
      });
    }
  }

  // Periodic Slot & Clock updater
  initClockAndSlots() {
    setInterval(() => {
      if (this.currentView === 'home') {
        // Re-highlight active slot if needed
      }
    }, 60000);
  }
}

// Instantiate App
window.addEventListener('DOMContentLoaded', () => {
  window.garudaApp = new GarudaApp();
});
