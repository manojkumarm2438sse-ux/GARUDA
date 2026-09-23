// ==========================================================================
// GARUDA OS - AI Mentor Engine: Decision Logic, Grounded Reasoning & Prompts
// ==========================================================================

import { store } from './store.js';
import { scheduleEngine } from './schedule.js';

export class AIMentorEngine {
  constructor() {
    this.name = 'GARUDA Tactical AI Mentor';
  }

  // 1-Click "WHAT SHOULD I DO NOW?" Recommendation Algorithm
  getWhatShouldIDoNow() {
    const state = store.state;
    const currentSlot = scheduleEngine.getCurrentSlot();
    const mission = state.todayMission;
    const weakTopics = state.upscTopics.filter(t => t.status === 'Weak');
    const learningTopics = state.upscTopics.filter(t => t.status === 'Learning');

    // Hour of day analysis
    const now = new Date();
    const hour = now.getHours();

    // Priority 1: If it's morning study time (07:45 - 12:15) and weak topic exists
    if (hour >= 7 && hour < 13) {
      if (weakTopics.length > 0) {
        const target = weakTopics[0];
        return {
          title: `📚 UPSC POLITY: ${target.title}`,
          pillar: 'UPSC Preparation',
          duration: '45 Minutes Focus + 15 MCQs',
          actionType: 'Weak Area Rectification',
          reason: `Your recorded accuracy on this topic is ${target.accuracy}% (below the 70% threshold). Rectify misconceptions immediately before moving to new syllabus blocks.`,
          steps: [
            'Review core facts and landmark cases (Maneka Gandhi, Puttaswamy).',
            'Solve 15 targeted Prelims MCQs with strict negative marking.',
            'Document every incorrect option into your Mistake Notebook.'
          ],
          linkTab: 'upsc'
        };
      } else {
        return {
          title: `📚 UPSC DEEP STUDY: ${learningTopics[0]?.title || 'Polity & Governance'}`,
          pillar: 'UPSC Foundation',
          duration: '90 Minutes',
          actionType: 'Active Syllabus Progression',
          reason: 'You are currently in your prime cognitive window. Proceed with the 16-step topic protocol.',
          steps: ['Read topic concept', 'Note constitutional provisions', 'Test with 10 recall flashcards'],
          linkTab: 'upsc'
        };
      }
    }

    // Priority 2: Afternoon IT Career Block (14:30 - 16:30)
    if (hour >= 14 && hour < 17) {
      const itStatus = mission.it;
      if (!itStatus.doneJava || itStatus.codingProblemsSolved < itStatus.codingTarget) {
        return {
          title: '💻 IT CAREER: Java Collections & Problem Solving',
          pillar: 'Java Full Stack (B.Tech ECE)',
          duration: '45 Minutes',
          actionType: 'Technical Employability',
          reason: `You have completed ${itStatus.codingProblemsSolved}/${itStatus.codingTarget} coding problems today. Consistent daily coding secures campus placement and tech-entry readiness.`,
          steps: [
            'Implement HashMap frequency counter or duplicate detector.',
            'Review time complexity: O(1) average lookup vs O(n) worst case collisions.',
            'Answer the standard interview question: equals() and hashCode() contract.'
          ],
          linkTab: 'it'
        };
      }
    }

    // Priority 3: Evening Workout & Athletic Conditioning (17:30 - 20:00)
    if (hour >= 17 && hour < 20) {
      const fit = mission.fitness;
      if (!fit.workoutCompleted) {
        return {
          title: `💪 ATHLETIC TRAINING: ${fit.workoutTitle || 'Chest + Triceps'}`,
          pillar: 'Physical Fitness & Army Standards',
          duration: '60 Minutes',
          actionType: 'Physical Conditioning',
          reason: 'An Indian Army officer requires mental resilience forged in physical discipline. Complete your resistance workout and 1600m target.',
          steps: [
            'Warm-up: 5 min dynamic mobility + rotator cuff prep.',
            'Compound lifts with progressive overload (target 8-10 strict reps).',
            'Finish with push-ups burnout set and hydrate with 500ml water.'
          ],
          linkTab: 'fitness'
        };
      }
    }

    // Priority 4: Night Spaced Revision & Testing (20:00 - 22:30)
    if (hour >= 20 && hour < 23) {
      if (mission.upsc.mcqCompleted < mission.upsc.mcqTarget) {
        return {
          title: '📝 UPSC PRELIMS MCQ SPRINT (20 Questions)',
          pillar: 'Exam-Oriented Practice',
          duration: '30 Minutes',
          actionType: 'Active Recall Testing',
          reason: `Today's MCQ quota is at ${mission.upsc.mcqCompleted}/${mission.upsc.mcqTarget}. Testing exposes gaps that passive reading conceals.`,
          steps: [
            'Launch 20-question mixed test with 30-minute timer.',
            'Scrutinize option traps (extreme keywords: "only", "all", "strictly").',
            'Review in-depth explanations for both right and wrong choices.'
          ],
          linkTab: 'upsc'
        };
      } else if (!mission.ssb.donePsych) {
        return {
          title: '🎖️ SSB RAPID-FIRE: Word Association Test (WAT)',
          pillar: 'SSB Officer Personality',
          duration: '15 Minutes',
          actionType: 'Subconscious Conditioning',
          reason: 'Maintain rapid, authentic psychological reactions. Train spontaneous positive problem-solving without memorized templates.',
          steps: [
            'Run 15 WAT words (15 seconds per word).',
            'Write action-oriented, natural responses reflecting officer qualities.',
            'Evaluate against the 15 OLQ framework.'
          ],
          linkTab: 'ssb'
        };
      }
    }

    // Default Fallback: Current active schedule slot
    return {
      title: `${currentSlot.title}`,
      pillar: currentSlot.pillar.toUpperCase(),
      duration: `${currentSlot.remainingMin || 45} Minutes Remaining`,
      actionType: 'Scheduled Operational Order',
      reason: `According to your full-time preparation blueprint, this block is dedicated to ${currentSlot.desc}.`,
      steps: [
        'Eliminate digital distractions.',
        'Execute this block with full cognitive immersion.',
        'Mark item complete upon finishing.'
      ],
      linkTab: currentSlot.pillar
    };
  }

  // Answer Specific Mentor Queries Grounded in Real Data
  askMentor(query) {
    const state = store.state;
    const q = query.toLowerCase();
    const upsc = state.todayMission.upsc;
    const weakList = state.upscTopics.filter(t => t.status === 'Weak').map(t => t.title);

    if (q.includes('what should i study now') || q.includes('study now')) {
      const rec = this.getWhatShouldIDoNow();
      return `**Current Directive:** ${rec.title}\n\n**Duration:** ${rec.duration}\n**Reason:** ${rec.reason}\n\n**Action Steps:**\n${rec.steps.map(s => `- ${s}`).join('\n')}`;
    }

    if (q.includes('weak') || q.includes('what am i weak in')) {
      if (weakList.length === 0) {
        return `**Weakness Analysis:** You currently have no topics flagged as 'Weak'. Your latest recorded accuracy across Polity and Economy is above 75%. However, vigilance is required: your next spaced revision cycle for **Fundamental Rights** is due in 3 days.`;
      }
      return `**Honest Assessment of Weaknesses:**\n- **Identified Weak Areas:** ${weakList.join(', ')}\n- **Root Cause:** Analysis of your recent tests shows confusion in distinguishing between rights available strictly to citizens (Arts 15, 16, 19, 29, 30) vs all persons (Art 21).\n- **Corrective Action:** Do NOT reread all 50 pages of Laxmikanth. Take 15 targeted MCQs on Fundamental Rights and review the 4 flashcards in your deck today.`;
    }

    if (q.includes('revise') || q.includes('what should i revise')) {
      return `**Spaced Revision Radar:**\n1. **Preamble (Day 7 Cycle):** Last revised 5 days ago. Review the 42nd Amendment changes (Socialist, Secular, Integrity) and Kesavananda Bharati basic structure rule.\n2. **Monetary Policy Instruments:** Ensure you can clearly distinguish between MSF rate (penal overnight rate) and SDF (collateral-free liquidity absorption).\n3. **Current Affairs Week 38:** Consolidate SC rulings on preventive detention.`;
    }

    if (q.includes('army') || q.includes('officer preparation') || q.includes('ssb')) {
      return `**Army Officer Mission Briefing:**\n- **Eligibility Verification:** As a final-year B.Tech ECE candidate (CGPA 8.2), you are eligible for **CDS (IMA/OTA)**, **TGC (Direct SSB)**, and **SSC-Tech**.\n- **Today's SSB Priority:** Your OIR and PPDT practice are on track. Your current developmental area is **Rapid Word Association (WAT)** and structuring your answer for *"Why Army Officer instead of an IT job?"*\n- **Officer Mindset Reminder:** Do not give rehearsed, flowery dialogues. Focus on command responsibility, technical problem-solving in Signals/EME, and physical readiness.`;
    }

    if (q.includes('fitness') || q.includes('workout') || q.includes('gym')) {
      const fit = state.todayMission.fitness;
      return `**Athletic Conditioning Status:**\n- **Today's Routine:** ${fit.workoutTitle} (${fit.workoutCompleted ? 'COMPLETED ✅' : 'PENDING ⏳'})\n- **Protein Intake:** ${fit.nutrition.proteinG}g / ${fit.nutrition.proteinTarget}g target.\n- **Water Hydration:** ${fit.waterLiters}L / 4.0L.\n- **Army Benchmark:** Ensure Saturday's 1.6km run stays strictly below 5:45 min. Maintain progressive overload on compound lifts.`;
    }

    if (q.includes('behind') || q.includes('falling behind') || q.includes('missed')) {
      const rec = scheduleEngine.generateRecoveryPlan([]);
      return `**No Excuses, No Panic:**\nFalling behind by a few hours or missing a day happens in long campaigns. What matters is the reaction.\n\n${rec.message}\n\n**Recovery Blueprint:**\n${rec.actions.map(a => `• **${a.priority}**: ${a.title} (${a.durationMin}m) — ${a.detail}`).join('\n')}\n\nNever respond to a missed day with an unsustainable 14-hour grind. Execute this prioritized recovery block today.`;
    }

    if (q.includes('it') || q.includes('java') || q.includes('career')) {
      const it = state.todayMission.it;
      return `**IT Career (B.Tech ECE -> Java Full Stack) Status:**\n- **Target:** Campus placement safety net without compromising your Army ambition.\n- **Current Milestone:** ${it.javaTopic}\n- **Daily Coding Status:** ${it.codingProblemsSolved}/${it.codingTarget} problems completed.\n- **Immediate Task:** Write a quick Java class demonstrating HashMap bucket collision handling and answer why String is commonly used as a Map key.`;
    }

    // Default intelligent mentor response
    return `**Mentor Response:** I have reviewed your current dashboard metrics. Your daily mission completion is at **${state.todayMission.completionPercentage}%** with streak day **#${state.profile.streakDays}** active. Remember: UPSC and Army selection demand sustained, quiet, relentless execution. Pick your single next priority from the dashboard and execute without hesitation.`;
  }

  // Generate Daily Morning Briefing
  generateMorningBriefing() {
    const state = store.state;
    const tm = state.todayMission;
    return {
      greeting: `GOOD MORNING, MANOJ 🇮🇳`,
      date: new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      motto: 'DISCIPLINE → KNOWLEDGE → LEADERSHIP → RESPONSIBILITY → SERVICE',
      topPriorities: tm.topPriorities,
      pillars: {
        upsc: `Study ${tm.upsc.topic} (${tm.upsc.studyDurationMin} min) • Target ${tm.upsc.mcqTarget} MCQs • 1 Mains Answer`,
        army: `Defence Awareness: ${tm.army.defenceAwareness} • Check TGC/SSC-Tech portal`,
        ssb: `15-Word WAT rapid drill • PPDT image perception • GD preparation`,
        it: `Java Collections (HashMap/HashSet) • Code 3 problems`,
        fitness: `${tm.fitness.workoutTitle} • 1600m timed cardio • 140g Protein`,
        personal: `5 New English words • 30 min editorial reading`
      }
    };
  }

  // Generate Evening Daily Performance Report
  generateDailyReport() {
    const state = store.state;
    const tm = state.todayMission;
    const pct = tm.completionPercentage;
    const isHonestSuccess = pct >= 80;

    let qualitativeFeedback = '';
    if (pct >= 85) {
      qualitativeFeedback = 'Outstanding operational discipline today. You maintained focus across UPSC, physical fitness, and IT career pillars without compromise. Ensure 7+ hours of uninterrupted sleep for physiological recovery.';
    } else if (pct >= 60) {
      qualitativeFeedback = 'Moderate operational output. Core priorities were addressed, but cognitive fatigue led to deferred IT and SSB drills. Calibrate tomorrow’s morning energy to finish high-yield tasks early.';
    } else {
      qualitativeFeedback = 'Sub-optimal execution. Less than 60% of today’s orders were completed. Lethargy or distraction compromised the schedule. Do not dwell on guilt; activate the Missed-Day Recovery Blueprint tomorrow at 06:00 sharp.';
    }

    return {
      date: tm.date,
      completionRate: pct,
      hoursInvested: '9.5 Hours',
      mcqsSolved: `${tm.upsc.mcqCompleted}/${tm.upsc.mcqTarget}`,
      workoutDone: tm.fitness.workoutCompleted,
      proteinLogged: `${tm.fitness.nutrition.proteinG}g / ${tm.fitness.nutrition.proteinTarget}g`,
      waterLogged: `${tm.fitness.waterLiters}L / 4.0L`,
      strengths: ['Polity Active Recall & MCQ accuracy', 'Consistent Gym Workout & Protein adherence'],
      weaknesses: ['Deferred SSB WAT drill to late evening', 'Coding problem target lagged by 1 problem'],
      tomorrowFocus: 'Complete Fundamental Rights revision, hit Legs & Core workout, and solve 3 SQL Joins problems.',
      feedback: qualitativeFeedback
    };
  }
}

export const aiMentorEngine = new AIMentorEngine();
