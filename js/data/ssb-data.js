// ==========================================================================
// GARUDA OS - SSB Preparation Bank: OIR, PPDT, TAT, WAT, SRT, SD, GD, Interview
// ==========================================================================

export const SSB_OIR_QUESTIONS = [
  {
    id: 'oir-1',
    type: 'Verbal Analogy',
    question: 'Soldier : Army :: Sailor : ?',
    options: ['A. Ship', 'B. Navy', 'C. Ocean', 'D. Captain'],
    correct: 1,
    explanation: 'A soldier is a member of an Army; a sailor is a member of a Navy.'
  },
  {
    id: 'oir-2',
    type: 'Number Series',
    question: 'Find the next number in series: 3, 7, 15, 31, 63, ?',
    options: ['A. 95', 'B. 127', 'C. 126', 'D. 128'],
    correct: 1,
    explanation: 'Pattern: (3*2)+1 = 7, (7*2)+1 = 15, (15*2)+1 = 31, (31*2)+1 = 63, (63*2)+1 = 127.'
  },
  {
    id: 'oir-3',
    type: 'Coding-Decoding',
    question: 'In a code, LEADER is written as ELDARE. How is OFFICER written in that code?',
    options: ['A. FOIFCRE', 'B. FOIFECR', 'C. FOFICER', 'D. FOIECFR'],
    correct: 1,
    explanation: 'Adjacent pairs are swapped: (L-E -> E-L), (A-D -> D-A), (E-R -> R-E). For OFFICER: (O-F -> F-O), (F-I -> I-F), (C-E -> E-C), leaving R -> FOIFECR.'
  },
  {
    id: 'oir-4',
    type: 'Logical Venn / Classification',
    question: 'Which word does NOT belong with the others: Radar, Sonar, Lidar, Periscope?',
    options: ['A. Radar', 'B. Sonar', 'C. Lidar', 'D. Periscope'],
    correct: 3,
    explanation: 'Radar, Sonar, and Lidar are active wave detection/ranging sensor systems (Radio, Sound, Light); a periscope is a passive optical observation tool.'
  }
];

export const SSB_PPDT_CASES = [
  {
    id: 'ppdt-1',
    title: 'Rural Development / Agricultural Crisis',
    imageUrl: './assets/images/hero_banner.jpg',
    sceneDescription: 'A hazy black-and-white scene showing two young men standing near a damaged irrigation canal and an elderly villager holding agricultural tools.',
    guidance: 'Hero should show initiative, organizing ability, resourcefulness, and empathy. Never fabricate an alien attack or accident; address the realistic problem in front of you.'
  },
  {
    id: 'ppdt-2',
    title: 'Disaster Relief / Flash Flood Situation',
    imageUrl: './assets/images/hero_banner.jpg',
    sceneDescription: 'A scene depicting waterlogged village huts with two individuals carrying relief material and directing people towards higher ground.',
    guidance: 'Identify immediate danger, organize rescue priorities (elderly, children), establish communication with local administration, set up clean water distribution.'
  }
];

export const SSB_WAT_WORDS = [
  'DUTY', 'RISK', 'LEADER', 'FEAR', 'WEAPON', 'DEFEAT', 'SACRIFICE', 'COURAGE',
  'CHALLENGE', 'ENEMY', 'PEACE', 'VICTORY', 'ORDER', 'RESPONSIBILITY', 'FAIL',
  'TEAM', 'TIRED', 'DEATH', 'SOLITUDE', 'SPEED', 'ACCIDENT', 'COMMAND', 'HELP',
  'DARKNESS', 'INITIATIVE', 'DECISION', 'PRESSURE', 'ANGER', 'DISCIPLINE', 'HONOUR',
  'DIFFICULTY', 'WAR', 'OBEY', 'STRONG', 'FAMILY', 'ATTACK', 'COMPROMISE', 'TRUTH',
  'PATIENCE', 'SOLDIER', 'NATION', 'PROBLEM', 'FRIEND', 'DANGER', 'RESOLVE', 'SUCCESS'
];

export const SSB_SRT_SITUATIONS = [
  {
    id: 'srt-1',
    scenario: 'He was traveling in a train at night when suddenly someone pulled the emergency chain and shouting started that dacoits had entered the adjoining coach. He...',
    officerApproach: 'Stayed calm, instructed passengers to lock doors, alerted RPF/TTE via emergency helpline 139, mobilized 2-3 sturdy youth, armed themselves with available metal rods, and moved to assist passengers while awaiting police arrival.'
  },
  {
    id: 'srt-2',
    scenario: 'His team was preparing for the final-year B.Tech project presentation tomorrow morning, when at 10 PM the main circuit board burnt out due to voltage fluctuation. He...',
    officerApproach: 'Maintained composure, assessed the damage, retrieved the backup circuit components from college lab store, delegated testing of individual modules, re-soldered the connections by 2 AM, verified output, and delivered a successful presentation.'
  },
  {
    id: 'srt-3',
    scenario: 'During a trek in the Himalayas, his team leader slipped and fractured his ankle with bad weather closing in. He...',
    officerApproach: 'Administered first aid, immobilized the fractured leg using trek poles and splints, pitched emergency shelter tent to protect from weather, sent coordinates to base camp via satellite/cell signal, kept the leader warm, and evacuated him safely.'
  },
  {
    id: 'srt-4',
    scenario: 'He noticed that his roommate in the hostel was quietly slipping into acute depression, skipping classes and having suicidal thoughts. He...',
    officerApproach: 'Spent time talking empathetically with him, listened without judgement, informed the college counselor and his parents discreetly, engaged him in daily physical exercise and hostel activities, ensuring he received professional psychological support.'
  }
];

export const SSB_GD_TOPICS = [
  {
    id: 'gd-1',
    title: 'Agnipath Scheme: Impact on Indian Armed Forces Preparedness',
    category: 'National Security & Defence Modernisation',
    brief: 'Deliberate on whether the 4-year tour of duty infuses youthful agility and tech-savvy soldiers or whether it challenges unit cohesion and specialized operational training in regimental centers.',
    keyPoints: [
      'Youthful profile: Reduces average age of Armed Forces from 32 to 26 years.',
      'Technology absorption: Young recruits adapt faster to digital battlefields and drone warfare.',
      'Training cycle concerns: 6 months training compared to traditional longer cycles.',
      'Civil-military transition: Reskilling and absorption into CAPFs/state police/private sector.'
    ]
  },
  {
    id: 'gd-2',
    title: 'Theaterisation of Indian Armed Forces: Opportunities and Hurdles',
    category: 'Military Organization & Strategic Reforms',
    brief: 'Assess the integration of Army, Navy, and Air Force under unified geographic theater commanders (Northern, Western, Maritime, Air Defence) vs traditional service silos.',
    keyPoints: [
      'Jointness and synergy: Single commander responsible for entire geographic theater.',
      'Asset optimization: Shared logistics, intelligence, air defence umbrellas.',
      'Service specific doctrines: IAF concerns regarding slicing limited fighter squadrons.',
      'Command culture: Harmonizing command hierarchies and administrative chains.'
    ]
  },
  {
    id: 'gd-3',
    title: 'Artificial Intelligence & Autonomous Weapons: The Changing Face of Warfare',
    category: 'Technology & Future Combat',
    brief: 'Explore the strategic implications of autonomous drone swarms, AI target recognition, cyber warfare, and ethical accountability on the Line of Actual Control.',
    keyPoints: [
      'Asymmetric advantage: Affordable drones challenging multi-million-dollar armor and radar installations.',
      'High-altitude electronic warfare: Border surveillance along Ladakh and Arunachal.',
      'Human-in-the-loop dilemma: Ethical dilemmas in automated lethal decision-making.',
      'Indigenous R&D: Importance of DRDO, iDEX, and Indian tech startups for military self-reliance.'
    ]
  }
];

export const SSB_INTERVIEW_QUESTIONS = [
  {
    category: 'Personal / PIQ & Motivation',
    question: 'You are completing your B.Tech in Electronics & Communication. Why do you want to join the Indian Army as an officer instead of joining an IT MNC with a high package?',
    rubricGuide: 'Clear, authentic answer. Do not give film-dialogue patriotism. Emphasize officer leadership, dynamic lifestyle, operational responsibility, service to the nation, and direct application of technical skills in Signals/EME/Armoured Corps.'
  },
  {
    category: 'Academic / Technical (B.Tech ECE)',
    question: 'How will your knowledge of Electronics and Communication Engineering be directly useful to the Indian Army in modern operational theaters?',
    rubricGuide: 'Mention Software Defined Radios (SDR), EW (Electronic Warfare), tactical satellite communications, radar signal processing (Rajendra, Aslesha), counter-drone jamming systems, and cyber security.'
  },
  {
    category: 'Defence Awareness',
    question: 'Explain the Command structure of the Indian Army. How many operational commands are there and who heads them?',
    rubricGuide: 'Explain the 7 Commands (6 operational + 1 training command ARTRAC), headed by Army Commanders (Lt Generals / GOC-in-C), with precise headquarters (Udhampur, Chandimandir, Kolkata, Pune, Lucknow, Jaipur, Shimla).'
  },
  {
    category: 'Self-Awareness & Failures',
    question: 'Tell me about a significant failure in your life. How did you react, what did you learn, and what would you do differently today?',
    rubricGuide: 'Genuine vulnerability, no boastful fake failure ("I work too hard"). Show emotional maturity, accountability without blaming teammates, and actionable recovery.'
  }
];
