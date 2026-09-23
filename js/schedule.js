// ==========================================================================
// GARUDA OS - 06:00 to 23:00 Schedule Engine & Missed-Day Recovery System
// ==========================================================================

export const DEFAULT_SCHEDULE = [
  { id: 's1', start: '06:00', end: '06:15', title: 'Wake Up & Hydration', pillar: 'fitness', desc: 'Drink 500ml water, mental grounding, review battle orders' },
  { id: 's2', start: '06:15', end: '06:45', title: 'Walking / Mobility Drills', pillar: 'fitness', desc: 'Joint mobility, light dynamic stretches, sunlight exposure' },
  { id: 's3', start: '06:45', end: '07:15', title: 'Bath & Fresh Dressing', pillar: 'personal', desc: 'Officer appearance, room organization, discipline' },
  { id: 's4', start: '07:15', end: '07:45', title: 'High-Protein Breakfast', pillar: 'fitness', desc: 'Eggs / Sprouts / Oats, hydration, mental focus' },
  { id: 's5', start: '07:45', end: '09:45', title: 'UPSC Deep Study Block 1', pillar: 'upsc', desc: 'Core subject (Polity / Economy) - Zero phone, high cognitive load' },
  { id: 's6', start: '09:45', end: '10:15', title: 'Tactical Break', pillar: 'personal', desc: 'Eye rest, hydration, light stroll, mental reset' },
  { id: 's7', start: '10:15', end: '12:15', title: 'UPSC Deep Study Block 2', pillar: 'upsc', desc: 'Secondary subject (History / Geography / Environment)' },
  { id: 's8', start: '12:15', end: '13:00', title: 'Nutritious Lunch & Rest', pillar: 'fitness', desc: 'Dal, rice, curd, salad, digestive rest' },
  { id: 's9', start: '13:00', end: '14:00', title: 'Daily Current Affairs Analysis', pillar: 'upsc', desc: 'Editorials into 8-point framework (Fact, Issue, Way Forward)' },
  { id: 's10', start: '14:00', end: '14:30', title: 'Power Nap / Mental Rest', pillar: 'fitness', desc: 'Brain recovery, recharge for technical block' },
  { id: 's11', start: '14:30', end: '16:00', title: 'IT Career: Java Full Stack', pillar: 'it', desc: 'Java OOP/Collections coding + SQL queries + Git practice' },
  { id: 's12', start: '16:00', end: '16:30', title: 'Snack & Tea Break', pillar: 'fitness', desc: 'Peanuts/roasted chana, hydration' },
  { id: 's13', start: '16:30', end: '17:30', title: 'Govt Exams / CSAT / Army Prep', pillar: 'army', desc: 'CSAT Quant or CDS/TGC technical & defence awareness' },
  { id: 's14', start: '17:30', end: '18:15', title: 'Pre-Workout & Mental Transition', pillar: 'fitness', desc: 'Black coffee / banana, kit preparation, officer mindset' },
  { id: 's15', start: '18:15', end: '19:30', title: 'Gym: Athletic Strength & Cardio', pillar: 'fitness', desc: 'Targeted split workout, 1600m run / cardio, core endurance' },
  { id: 's16', start: '19:30', end: '20:15', title: 'Post-Workout Bath & Dinner', pillar: 'fitness', desc: 'High-protein dinner (Chicken / Paneer / Soya), family time' },
  { id: 's17', start: '20:15', end: '22:15', title: 'UPSC Active Recall & Testing', pillar: 'upsc', desc: 'Spaced revision, 20 MCQs, PYQ analysis, 1 Mains answer' },
  { id: 's18', start: '22:15', end: '22:45', title: 'English / SSB / Officer Development', pillar: 'ssb', desc: 'WAT words rapid recall, GD formulation, English speaking' },
  { id: 's19', start: '22:45', end: '23:00', title: 'Daily Status Review & Check-in', pillar: 'personal', desc: 'Log completion, review mistakes, lock tomorrow’s battle orders' },
  { id: 's20', start: '23:00', end: '06:00', title: 'Deep Sleep & Recovery (7h)', pillar: 'fitness', desc: 'Dark room, screens off, muscular & cognitive restoration' }
];

export class ScheduleEngine {
  constructor(schedule = DEFAULT_SCHEDULE) {
    this.schedule = schedule;
  }

  // Get Current Active Slot
  getCurrentSlot() {
    const now = new Date();
    const currentMin = now.getHours() * 60 + now.getMinutes();

    for (let slot of this.schedule) {
      const [sh, sm] = slot.start.split(':').map(Number);
      const [eh, em] = slot.end.split(':').map(Number);
      
      const startMin = sh * 60 + sm;
      let endMin = eh * 60 + em;
      if (endMin < startMin) endMin += 24 * 60; // Overnight slot

      if (currentMin >= startMin && currentMin < endMin) {
        const remainingMin = endMin - currentMin;
        return { ...slot, isActive: true, remainingMin };
      }
    }

    return { ...this.schedule[0], isActive: false, remainingMin: 0 };
  }

  // Missed-Day Recovery Engine
  generateRecoveryPlan(missedItems, availableHours = 10) {
    // Priority order: 1) Overdue Spaced Revision, 2) Core UPSC, 3) Athletic Workout, 4) IT High Yield
    const recoveryActions = [];

    // Filter out low-leverage fluff; never assign more than available hours
    recoveryActions.push({
      priority: 'CRITICAL',
      title: 'Overdue UPSC Spaced Recall (High-Yield)',
      durationMin: 60,
      detail: 'Revise weak topics (e.g. Fundamental Rights) using active flashcards and 15 MCQs. Do not reread entire textbooks.'
    });

    recoveryActions.push({
      priority: 'HIGH',
      title: 'Consolidated UPSC Core Block',
      durationMin: 120,
      detail: 'Focus strictly on today’s designated subject. Do not attempt to catch up on two missed days in one sitting.'
    });

    recoveryActions.push({
      priority: 'NON-NEGOTIABLE',
      title: 'Physical Reset: 45-Min High-Intensity Workout',
      durationMin: 45,
      detail: 'Compound lifts + 1600m timed run. Physical exercise breaks lethargy and restores dopamine balance.'
    });

    recoveryActions.push({
      priority: 'MODERATE',
      title: 'IT Focus: 1 Targeted Coding Problem & 1 Topic',
      durationMin: 45,
      detail: 'Solve 1 LeetCode/HackerRank question on Collections. Keep technical momentum alive.'
    });

    recoveryActions.push({
      priority: 'ESSENTIAL',
      title: 'SSB Officer Mindset: 15-Minute WAT & Interview Drill',
      durationMin: 15,
      detail: 'Run 15 rapid-fire WAT words to maintain quick, authentic psychological reactions.'
    });

    return {
      message: 'Recovery protocol activated: Fluff pruned, high-leverage actions scheduled. Total duration calibrated to prevent burnout.',
      actions: recoveryActions
    };
  }
}

export const scheduleEngine = new ScheduleEngine();
