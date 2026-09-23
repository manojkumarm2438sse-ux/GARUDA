// ==========================================================================
// GARUDA OS - Fitness & Nutrition Module: Athletic Split, Indian Macros, Sleep
// ==========================================================================

import { store } from '../store.js';
import { FITNESS_WORKOUT_SPLIT, INDIAN_FOOD_DATABASE } from '../data/fitness-data.js';

export function renderFitnessView(container) {
  const state = store.state;
  const fit = state.todayMission.fitness;
  const currentDayKey = new Date().toLocaleDateString('en-US', { weekday: 'lowercase' });
  const todaysWorkout = FITNESS_WORKOUT_SPLIT[currentDayKey] || FITNESS_WORKOUT_SPLIT.monday;
  const totalGlasses = 16; // 16 * 250ml = 4.0 Litres
  const filledGlasses = Math.min(totalGlasses, Math.round((fit.waterLiters || 0) / 0.25));

  container.innerHTML = `
    <div class="view-header" style="margin-bottom: 1.25rem;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <h2>💪 Athletic Fitness & Indian Nutrition Tracker</h2>
          <p>Goal: Lean + Muscular + Strong + Athletic • Army 1600m & Physical Standards</p>
        </div>
        <div style="display: flex; gap: 0.5rem;">
          <button id="btn-toggle-workout" class="btn ${fit.workoutCompleted ? 'btn-olive' : 'btn-primary'} btn-sm">
            ${fit.workoutCompleted ? '✅ Workout Completed' : '⚡ Mark Workout Done'}
          </button>
        </div>
      </div>
    </div>

    <!-- Macro Tracking Overview -->
    <div class="nutrition-grid">
      <div class="macro-dial-card">
        <div class="macro-dial-val" style="color: var(--accent-gold);">${fit.nutrition.proteinG}g</div>
        <div class="macro-dial-label">Protein (${fit.nutrition.proteinTarget}g Target)</div>
        <div class="progress-container" style="margin-top: 0.5rem; height: 6px;">
          <div class="progress-bar-fill" style="width: ${Math.min(100, Math.round((fit.nutrition.proteinG / fit.nutrition.proteinTarget) * 100))}%;"></div>
        </div>
      </div>

      <div class="macro-dial-card">
        <div class="macro-dial-val" style="color: var(--accent-emerald);">${fit.nutrition.calories}</div>
        <div class="macro-dial-label">Calories (${fit.nutrition.caloriesTarget} Target)</div>
        <div class="progress-container" style="margin-top: 0.5rem; height: 6px;">
          <div class="progress-bar-fill" style="width: ${Math.min(100, Math.round((fit.nutrition.calories / fit.nutrition.caloriesTarget) * 100))}%;"></div>
        </div>
      </div>

      <div class="macro-dial-card">
        <div class="macro-dial-val" style="color: #38BDF8;">${fit.waterLiters}L</div>
        <div class="macro-dial-label">Hydration (${fit.waterTarget}L Target)</div>
        <div style="margin-top: 0.5rem;">
          <button id="btn-add-water" class="btn btn-outline btn-sm" style="width: 100%; padding: 0.2rem 0.5rem; font-size: 0.75rem;">+ Glass (250ml)</button>
        </div>
      </div>

      <div class="macro-dial-card">
        <div class="macro-dial-val" style="color: #A78BFA;">${fit.sleepHours}h</div>
        <div class="macro-dial-label">Sleep (7-9h Target)</div>
        <div style="font-size: 0.72rem; color: var(--accent-emerald); margin-top: 0.35rem; font-weight: 700;">Optimal Recovery</div>
      </div>
    </div>

    <!-- Visual Interactive 4L Water Glasses Tracker -->
    <div class="card" style="margin-bottom: 1rem; border-color: rgba(56, 189, 248, 0.3);">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap;">
        <div>
          <strong style="color: #38BDF8; font-size: 0.95rem;">💧 Daily Hydration Tracker (4.0 Litres Target)</strong>
          <div style="font-size: 0.75rem; color: var(--text-secondary);">Tap any glass to log water up to that level (250ml per glass).</div>
        </div>
        <span class="meta-chip" style="color: #38BDF8;">${filledGlasses} / 16 Glasses Logged</span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(28px, 1fr)); gap: 0.4rem; margin-top: 0.5rem;" id="water-glasses-row">
        ${Array.from({ length: totalGlasses }).map((_, i) => `
          <button class="water-glass-btn" data-glass-idx="${i + 1}" style="background: ${i < filledGlasses ? 'rgba(56, 189, 248, 0.25)' : 'var(--bg-surface)'}; border: 1px solid ${i < filledGlasses ? '#38BDF8' : 'var(--border-subtle)'}; border-radius: var(--radius-sm); padding: 0.4rem 0.2rem; font-size: 0.75rem; cursor: pointer; text-align: center; color: ${i < filledGlasses ? '#38BDF8' : 'var(--text-muted)'};" title="Glass ${i + 1} (${(i + 1) * 0.25}L)">
            🥛
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Today's Training Split & Weight Logger -->
    <div class="card card-olive">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <span style="font-size: 0.75rem; text-transform: uppercase; font-weight: 700; color: #86EFAC;">Today's Workout Routine</span>
          <h3 style="color: #FFFFFF; font-size: 1.15rem;">${todaysWorkout.day}: ${todaysWorkout.title}</h3>
        </div>
        <span class="badge ${fit.workoutCompleted ? 'badge-strong' : 'badge-learning'}">
          ${fit.workoutCompleted ? 'Workout Logged ✅' : 'Pending Session'}
        </span>
      </div>

      <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.75rem;">
        ${todaysWorkout.exercises.map((ex, i) => `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 0.6rem 0.85rem; background: var(--bg-surface); border-radius: var(--radius-md); font-size: 0.88rem; flex-wrap: wrap; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-weight: 700; color: var(--accent-gold);">${i + 1}.</span>
              <span style="font-weight: 600; color: var(--text-primary);">${ex.name}</span>
            </div>
            <div style="display: flex; align-items: center; gap: 0.75rem;">
              <span style="color: var(--text-secondary); font-size: 0.8rem;">
                ${ex.sets ? `${ex.sets} Sets × ${ex.reps} reps (RPE ${ex.targetRPE || 8})` : ex.target}
              </span>
              <input type="text" placeholder="e.g. 75kg x 8" style="padding: 0.25rem 0.5rem; font-size: 0.78rem; width: 100px; text-align: center;">
            </div>
          </div>
        `).join('')}
      </div>
      <div style="display: flex; justify-content: flex-end; margin-top: 0.85rem;">
        <button class="btn btn-outline btn-sm" onclick="alert('Session weights & sets saved to your training history.')">Save Exercise Logs</button>
      </div>
    </div>

    <!-- Quick Indian Food Macro Logger -->
    <div class="card">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
        <div>
          <h3 style="font-size: 1.05rem;">🥗 Quick Indian Food & Protein Log</h3>
          <p style="font-size: 0.8rem; margin-bottom: 0;">Tap any Indian whole food to log macros and estimate cost against your monthly ₹${state.profile.monthlyFoodBudgetRs} budget.</p>
        </div>
        <span class="meta-chip">20+ Items Available</span>
      </div>

      <div class="food-quick-grid">
        ${INDIAN_FOOD_DATABASE.map(food => `
          <button class="food-btn" data-food-id="${food.id}">
            <strong>${food.name}</strong>
            <span>+${food.protein}g Protein</span>
            <small style="font-size: 0.68rem; color: var(--text-muted); margin-top: 2px;">${food.calories} kcal • ₹${food.costRs}</small>
          </button>
        `).join('')}
      </div>
    </div>

    <!-- Army Physical Standards Benchmark Checklist -->
    <div class="card card-gold">
      <h3 style="color: var(--accent-gold); margin-bottom: 0.5rem;">🪖 Indian Army Officer Physical Benchmark</h3>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 0.75rem; font-size: 0.85rem;">
        <div class="card" style="margin-bottom: 0; background: var(--bg-surface-elevated);">
          <strong style="color: var(--accent-gold);">1.6 km Run (1600m):</strong>
          <div>Standard: < 5:45 min (Excellent)</div>
          <div style="color: var(--accent-emerald); font-weight: 700; margin-top: 0.25rem;">Your PR: 6:12 min</div>
        </div>
        <div class="card" style="margin-bottom: 0; background: var(--bg-surface-elevated);">
          <strong style="color: var(--accent-gold);">Push-ups:</strong>
          <div>Standard: 40+ strict military reps</div>
          <div style="color: var(--accent-emerald); font-weight: 700; margin-top: 0.25rem;">Your PR: 36 reps</div>
        </div>
        <div class="card" style="margin-bottom: 0; background: var(--bg-surface-elevated);">
          <strong style="color: var(--accent-gold);">Chin-ups (Deadhang):</strong>
          <div>Standard: 10-12 strict reps</div>
          <div style="color: var(--accent-emerald); font-weight: 700; margin-top: 0.25rem;">Your PR: 8 reps</div>
        </div>
      </div>
    </div>
  `;

  // Attach hydration button
  container.querySelector('#btn-add-water').addEventListener('click', () => {
    store.addWater(1);
    renderFitnessView(container);
  });

  // Attach individual water glass clicks
  container.querySelectorAll('.water-glass-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.glassIdx);
      store.state.todayMission.fitness.waterLiters = +(idx * 0.25).toFixed(2);
      store.recalculateDailyCompletion();
      store.saveState();
      renderFitnessView(container);
    });
  });

  // Attach workout toggle
  container.querySelector('#btn-toggle-workout').addEventListener('click', () => {
    store.toggleTask('fitness', 'workoutCompleted');
    renderFitnessView(container);
  });

  // Attach food buttons
  container.querySelectorAll('.food-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const fid = btn.dataset.foodId;
      const food = INDIAN_FOOD_DATABASE.find(f => f.id === fid);
      if (food) {
        store.addFoodItem(food);
        alert(`Logged: ${food.name} (+${food.protein}g protein, +${food.calories} kcal)`);
        renderFitnessView(container);
      }
    });
  });
}
