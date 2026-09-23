// ==========================================================================
// GARUDA OS - UPSC Syllabus, Topics, MCQs, PYQs, Flashcards & Spaced Schedules
// ==========================================================================

export const UPSC_SUBJECTS = [
  { id: 'polity', name: 'Indian Polity & Governance', icon: '🏛️', paper: 'GS-II / Prelims GS-I', totalTopics: 28 },
  { id: 'history', name: 'Modern Indian History & Culture', icon: '📜', paper: 'GS-I / Prelims GS-I', totalTopics: 32 },
  { id: 'geography', name: 'Indian & World Geography', icon: '🌍', paper: 'GS-I / Prelims GS-I', totalTopics: 24 },
  { id: 'economy', name: 'Indian Economy & Development', icon: '📈', paper: 'GS-III / Prelims GS-I', totalTopics: 26 },
  { id: 'environment', name: 'Environment & Ecology', icon: '🌿', paper: 'GS-III / Prelims GS-I', totalTopics: 20 },
  { id: 'science_tech', name: 'Science & Technology', icon: '🔬', paper: 'GS-III / Prelims GS-I', totalTopics: 18 },
  { id: 'security', name: 'Internal Security & Defence', icon: '🛡️', paper: 'GS-III', totalTopics: 14 },
  { id: 'ethics', name: 'Ethics, Integrity & Aptitude', icon: '⚖️', paper: 'GS-IV', totalTopics: 16 },
  { id: 'ir', name: 'International Relations', icon: '🌐', paper: 'GS-II', totalTopics: 15 },
  { id: 'csat', name: 'CSAT (Quant, Reasoning, Reading)', icon: '📐', paper: 'Prelims Paper-II', totalTopics: 22 }
];

export const UPSC_TOPICS_DATABASE = [
  {
    id: 'polity-preamble',
    subjectId: 'polity',
    title: 'Preamble to the Indian Constitution',
    status: 'Strong',
    lastRevised: '2026-09-18',
    revisionCount: 2,
    accuracy: 88,
    lesson: {
      intro: 'The Preamble serves as the preface or introduction to the Constitution of India, embodying the ideals and aspirations of the nation.',
      simpleExp: 'Think of the Preamble as the identity card of the Constitution. It declares who gives the Constitution authority (the people of India), what kind of state India is, and what objectives it seeks to secure.',
      detailedExp: 'Based on Pandit Nehru’s Objective Resolution adopted on Jan 22, 1947, the Preamble was amended once by the 42nd Constitutional Amendment Act, 1976, adding three words: Socialist, Secular, and Integrity. In the landmark Kesavananda Bharati case (1973), the Supreme Court held that the Preamble is an integral part of the Constitution and can be amended under Article 368 without altering the Basic Structure.',
      realLife: 'When the Supreme Court adjudicates whether a law violates citizen rights or equality, judges look to the Preamble’s vision of Justice, Liberty, and Equality to interpret ambiguous statutory provisions.',
      coreFacts: [
        'Adopted on 26th November 1949 by Constituent Assembly.',
        '42nd CAA 1976 added: Socialist, Secular, Integrity.',
        'Berubari Union (1960): Not part of Constitution (overruled later).',
        'Kesavananda Bharati (1973): Part of Constitution, subject to Basic Structure doctrine.',
        'Non-justiciable: Enforceability cannot be claimed in courts on its own.'
      ],
      upscRelevance: 'Very high yield for Prelims (exact sequence of words, justiciability, amendment history) and Mains GS-II (Constitutional philosophy and constitutional morality).',
      prelimsAngle: 'Order: Sovereign, Socialist, Secular, Democratic, Republic. Non-justiciable and neither a source of power to legislature nor a prohibition upon legislative powers.',
      mainsAngle: 'Discuss how the Preamble acts as a guiding compass during constitutional crises and judicial review.',
      currentAffairsLink: 'Recent debates regarding petitions challenging the words "Socialist" and "Secular" in the Supreme Court.',
      mainsQuestion: '“The Preamble represents the quintessential soul of our constitutional architecture.” Examine how judicial interpretations have evolved regarding its status and amendability. (150 words / 10 marks)'
    }
  },
  {
    id: 'polity-fundamental-rights',
    subjectId: 'polity',
    title: 'Fundamental Rights (Articles 12 to 35)',
    status: 'Weak',
    lastRevised: '2026-09-12',
    revisionCount: 1,
    accuracy: 62,
    lesson: {
      intro: 'Part III of the Constitution (Articles 12-35) enshrines Fundamental Rights, described as the Magna Carta of India.',
      simpleExp: 'Fundamental Rights protect citizens against arbitrary state action and promote political democracy by guaranteeing basic civil liberties.',
      detailedExp: 'Covers Right to Equality (14-18), Right to Freedom (19-22), Right against Exploitation (23-24), Freedom of Religion (25-28), Cultural & Educational Rights (29-30), and Right to Constitutional Remedies (Article 32). In Maneka Gandhi case (1978), the Supreme Court expanded Article 21 from "procedure established by law" to include "due process of law".',
      realLife: 'When a citizen files a writ petition under Article 32 (Habeas Corpus or Mandamus) against illegal police detention or denial of passport, they invoke Part III directly before the Supreme Court.',
      coreFacts: [
        'Articles 15, 16, 19, 29, 30 are available ONLY to Indian citizens.',
        'Articles 20 and 21 CANNOT be suspended even during National Emergency.',
        'Article 32 was termed "heart and soul of the Constitution" by Dr. B.R. Ambedkar.',
        'Puttaswamy Judgement (2017) affirmed Right to Privacy as a fundamental right under Article 21.'
      ],
      upscRelevance: 'Every year at least 2-3 Prelims MCQs and 1 Mains question stem directly from Fundamental Rights.',
      prelimsAngle: 'Exact scope of Art 14 reasonable classification, Art 19 reasonable restrictions, Art 21 facets, Art 32 writs vs Art 226 high court jurisdiction.',
      mainsAngle: 'Tension between Individual Fundamental Rights and Directive Principles (DPSP), Doctrine of Proportionality in state surveillance.',
      currentAffairsLink: 'Digital Personal Data Protection Act 2023, preventive detention guidelines by SC.',
      mainsQuestion: 'Analyse the evolution of Article 21 from A.K. Gopalan to K.S. Puttaswamy. How has judicial activism enriched the canvas of human rights in India? (250 words / 15 marks)'
    }
  },
  {
    id: 'polity-dpsp',
    subjectId: 'polity',
    title: 'Directive Principles of State Policy (Part IV)',
    status: 'Learning',
    lastRevised: '2026-09-22',
    revisionCount: 0,
    accuracy: 70,
    lesson: {
      intro: 'Part IV (Articles 36-51) contains Directive Principles of State Policy, borrowed from the Irish Constitution.',
      simpleExp: 'DPSPs are affirmative directions and goals set for the State to establish economic and social democracy and a welfare state.',
      detailedExp: 'Classified broadly into Socialistic (Arts 38, 39, 41, 42, 43), Gandhian (Arts 40, 43, 46, 47, 48), and Liberal-Intellectual principles (Arts 44, 45, 48, 48A, 49, 50, 51). Though non-justiciable per Article 37, they are fundamental in the governance of the country.',
      realLife: 'Maternity Benefit Act, Panchayati Raj 73rd Amendment (Art 40), MGNREGA (Art 41), and Environmental Protection laws (Art 48A) are all legislative enactments translating DPSP into statutory reality.',
      coreFacts: [
        'Non-justiciable under Article 37.',
        'Minerva Mills case (1980): The Indian Constitution is founded on the bedrock of the balance between Part III and Part IV.',
        'Article 44: Uniform Civil Code.',
        'Article 50: Separation of judiciary from executive.'
      ],
      upscRelevance: 'Distinction between fundamental rights and DPSPs; Article 44 UCC debates.',
      prelimsAngle: 'Identify whether a given directive is in Part IV or outside Part IV (e.g. Arts 335, 350A, 351).',
      mainsAngle: 'Evaluate the role of DPSPs in reducing socio-economic inequality and shaping welfare state jurisprudence.',
      currentAffairsLink: 'Uniform Civil Code implementation in Uttarakhand and 22nd Law Commission deliberations.',
      mainsQuestion: '“Directive Principles of State Policy are not mere pious homilies, but the constitutional blueprint for an egalitarian society.” Discuss with landmark judicial precedents. (150 words / 10 marks)'
    }
  },
  {
    id: 'economy-monetary',
    subjectId: 'economy',
    title: 'Monetary Policy & RBI Framework',
    status: 'Learning',
    lastRevised: '2026-09-21',
    revisionCount: 1,
    accuracy: 75,
    lesson: {
      intro: 'Monetary Policy Framework regulates the supply of money, interest rates, and credit to achieve macroeconomic objectives.',
      simpleExp: 'RBI uses tools like Repo Rate, Reverse Repo, SDF, and CRR to control inflation while supporting economic growth.',
      detailedExp: 'Under the amended RBI Act (2016), India adopted Flexible Inflation Targeting (FIT) targeting 4% (+/- 2%) CPI inflation. The Monetary Policy Committee (MPC) consists of 6 members (3 RBI, 3 Government appointed) headed by the RBI Governor who has a casting vote.',
      realLife: 'When vegetables and fuel prices push inflation above 6%, RBI raises the Repo Rate to make bank borrowing costlier, curbing consumer demand and cooling prices.',
      coreFacts: [
        'MPC has 6 members; quorum is 4 members.',
        'Standing Deposit Facility (SDF) absorbs liquidity without collateral.',
        'Marginal Standing Facility (MSF) is penal borrowing rate for overnight emergency bank funds.',
        'Open Market Operations (OMO) involves purchase/sale of government securities.'
      ],
      upscRelevance: 'Core macroeconomics for Prelims (liquidity instruments, bond yield curve) and Mains GS-III (inflation dynamics, growth tradeoff).',
      prelimsAngle: 'What happens to rupee value and bond yields when RBI increases Repo Rate? Impact of expansionary vs contractionary policy.',
      mainsAngle: 'Assess the effectiveness of the Flexible Inflation Targeting framework in navigating post-pandemic supply chain shocks.',
      currentAffairsLink: 'RBI MPC bi-monthly resolution, liquidity stance withdrawal of accommodation.',
      mainsQuestion: 'Explain the mechanism through which RBI’s Monetary Policy Committee regulates headline inflation. What are the structural limitations of monetary policy in curbing food-driven inflation? (250 words / 15 marks)'
    }
  },
  {
    id: 'history-1857',
    subjectId: 'history',
    title: 'Revolt of 1857 & Administrative Transition',
    status: 'Learning',
    lastRevised: '2026-09-19',
    revisionCount: 1,
    accuracy: 80,
    lesson: {
      intro: 'The Revolt of 1857 was a major watershed in Indian history, marking the end of East India Company rule and the direct assumption of sovereignty by the British Crown.',
      simpleExp: 'Widespread discontent among sepoys, dispossessed rulers, peasants, and religious leaders erupted into an armed rebellion against British exploitation.',
      detailedExp: 'Roots lay in economic ruin of artisans, Doctrine of Lapse (Dalhousie annexing Satara, Jhansi, Nagpur), racial arrogance of officers, and the immediate trigger of Enfield rifle cartridges greased with cow/pig fat. Led by Bahadur Shah Zafar as nominal leader, with key centers: Delhi, Kanpur (Nana Saheb), Lucknow (Begum Hazrat Mahal), Jhansi (Rani Lakshmibai), and Arrah (Kunwar Singh). Followed by the Government of India Act 1858 (Queen’s Proclamation) abolishing the Company and creating the office of Secretary of State.',
      realLife: 'Modern military ceremonies, cantonment organization, and martial races theory in British recruitment were legacy reorganizations stemming from lessons learned in 1857.',
      coreFacts: [
        'Immediate trigger: Introduction of 1853 Enfield rifle cartridge.',
        'Mangal Pandey revolted at Barrackpore on 29 March 1857.',
        'Act of 1858 replaced Court of Directors and Board of Control with Secretary of State for India.',
        'Governor-General received the additional title of Viceroy (Lord Canning was first Viceroy).',
        'Peel Commission reorganized Indian army: European to Indian ratio increased to 1:2 in Bengal.'
      ],
      upscRelevance: 'High frequency for Prelims (regional leaders, administrative acts) and Mains GS-I (causes, character, and legacy).',
      prelimsAngle: 'Who led the revolt where: Kunwar Singh (Bihar), Maulvi Ahmadullah (Faizabad), Khan Bahadur Khan (Bareilly). Act of 1858 institutional changes.',
      mainsAngle: 'Was the 1857 Revolt a mere Sepoy Mutiny or the First War of Indian Independence? Analyze historiographical views.',
      currentAffairsLink: 'Commemoration of unsung heroes of 1857 under Azadi Ka Amrit Mahotsav.',
      mainsQuestion: '“The Revolt of 1857 was the culmination of recurrent, big and small local rebellions against colonial rule.” Elucidate. (150 words / 10 marks)'
    }
  },
  {
    id: 'geography-monsoon',
    subjectId: 'geography',
    title: 'Indian Monsoon Mechanism & Climate Dynamics',
    status: 'Learning',
    lastRevised: '2026-09-20',
    revisionCount: 0,
    accuracy: 72,
    lesson: {
      intro: 'The Indian Monsoon is a seasonal reversal of wind system that delivers more than 75% of India’s annual precipitation.',
      simpleExp: 'During summer, the intense heating of the Indian subcontinent creates a deep low pressure over northwest India and the Tibetan plateau, pulling moisture-laden winds from the southern Indian Ocean.',
      detailedExp: 'Driven by differential heating of land and sea, shifting of Inter-Tropical Convergence Zone (ITCZ) northward to the Ganga plain (Monsoon Trough), presence of Somali Jet Stream, Tropical Easterly Jet (TEJ), and high-altitude Tibetan anticyclone. Teleconnections include El Niño-Southern Oscillation (ENSO), Indian Ocean Dipole (IOD - positive IOD favors monsoon), and Madden-Julian Oscillation (MJO).',
      realLife: 'Monsoon onset in Kerala around June 1 determines sowing decisions for Kharif crops (rice, pulses, cotton), impacting food inflation, GDP growth, and rural consumption across India.',
      coreFacts: [
        'South-West Monsoon splits into Arabian Sea Branch and Bay of Bengal Branch.',
        'Western Ghats receive heavy orographic rainfall on windward side; Deccan plateau lies in rain-shadow.',
        'Mawsynram in Khasi Hills receives world’s highest rainfall due to funnel-shaped relief.',
        'Retreating monsoon (North-East) brings major rainfall to Tamil Nadu coast (Coromandel Coast) in Oct-Nov.'
      ],
      upscRelevance: 'Perennial Prelims favorite (ITCZ, El Niño, IOD) and Mains GS-I (monsoon variability and water security).',
      prelimsAngle: 'Distinguish between Positive IOD (cooler west Indian Ocean vs warmer east) and El Niño impact. Mechanism of Western Disturbances in winter.',
      mainsAngle: 'How does climate change exacerbate erratic precipitation, flash droughts, and extreme weather events during the Indian Monsoon?',
      currentAffairsLink: 'IMD long-range monsoon forecasts, El Niño transition to La Niña in late 2026.',
      mainsQuestion: 'Examine the multi-factor mechanism governing the onset and progression of the South-West Monsoon over the Indian subcontinent. (250 words / 15 marks)'
    }
  },
  {
    id: 'environment-biodiversity',
    subjectId: 'environment',
    title: 'Biodiversity Hotspots & Protected Area Network',
    status: 'Strong',
    lastRevised: '2026-09-17',
    revisionCount: 2,
    accuracy: 85,
    lesson: {
      intro: 'Biodiversity Hotspots are biogeographic regions that are both significant reservoirs of biodiversity and threatened with destruction.',
      simpleExp: 'Special regions on Earth packed with unique wildlife and plants found nowhere else, but which have lost at least 70% of their original habitat.',
      detailedExp: 'Criteria defined by Norman Myers: 1) Must contain at least 1,500 species of vascular plants as endemics (>0.5% of world total); 2) Must have lost at least 70% of primary vegetation. India has 4 Hotspots: Western Ghats, Eastern Himalayas, Indo-Burma, and Sundaland (Nicobar Islands). Protected Area Network in India functions under Wildlife (Protection) Act, 1972: National Parks, Wildlife Sanctuaries, Conservation Reserves, and Community Reserves.',
      realLife: 'Silent Valley National Park in Western Ghats preserves the endangered Lion-tailed Macaque and unique tropical evergreen rainforest ecosystems.',
      coreFacts: [
        'National Parks have highest degree of protection; human activities/grazing completely prohibited.',
        'Wildlife Sanctuaries permit certain limited rights (like livestock grazing) subject to Chief Wildlife Warden.',
        'WPA 1972 Amendment Act 2022 rationalized schedules from 6 to 4 schedules.',
        'Ramsar Sites in India: Over 80 wetlands of international importance.'
      ],
      upscRelevance: 'At least 5-7 questions every year in Prelims cover National Parks, river crossings, and endemic flora/fauna.',
      prelimsAngle: 'Location of National Parks along rivers (e.g. Kaziranga along Brahmaputra, Keoladeo at confluence of Gambhir and Banganga). Species conservation status (IUCN).',
      mainsAngle: 'Evaluate the efficacy of community reserves and eco-sensitive zones in mitigating Human-Wildlife Conflict.',
      currentAffairsLink: 'Project Cheetah translocations in Kuno and Gandhi Sagar Sanctuary.',
      mainsQuestion: 'Critically assess the Protected Area Network under the Wildlife (Protection) Act, 1972. How have recent legislative amendments addressed community participation in conservation? (150 words / 10 marks)'
    }
  }
];

export const UPSC_MCQ_BANK = [
  {
    id: 'mcq-1',
    subjectId: 'polity',
    topicId: 'polity-fundamental-rights',
    question: 'With reference to the Constitution of India, which one of the following rights is available to BOTH Indian citizens and foreign nationals in India?',
    options: [
      { text: 'A. Prohibition of discrimination on grounds of religion, race, caste, sex or place of birth (Article 15)', isCorrect: false, trap: 'Article 15 is exclusively for Indian citizens.' },
      { text: 'B. Equality of opportunity in matters of public employment (Article 16)', isCorrect: false, trap: 'Article 16 applies strictly to citizens.' },
      { text: 'C. Protection of life and personal liberty (Article 21)', isCorrect: true, explanation: 'Article 21 states that no person (citizen or foreigner) shall be deprived of his life or personal liberty except according to procedure established by law.' },
      { text: 'D. Protection of language, script and culture of minorities (Article 29)', isCorrect: false, trap: 'Article 29 is reserved solely for Indian citizens.' }
    ],
    difficulty: 'Medium',
    pyqRef: 'UPSC CSE Prelims 2018'
  },
  {
    id: 'mcq-2',
    subjectId: 'polity',
    topicId: 'polity-preamble',
    question: 'The Preamble to the Constitution of India is:',
    options: [
      { text: 'A. A part of the Constitution; but has no legal effect', isCorrect: false, trap: 'It does have legal significance as an interpretive aid.' },
      { text: 'B. Not a part of the Constitution and has no legal effect', isCorrect: false, trap: 'Overruled by Kesavananda Bharati case.' },
      { text: 'C. A part of the Constitution and has the same legal effect as any other part', isCorrect: false, trap: 'It is non-justiciable on its own, unlike enforceable provisions.' },
      { text: 'D. A part of the Constitution; but has no legal effect independently of other parts', isCorrect: true, explanation: 'The Supreme Court in Kesavananda Bharati (1973) held that Preamble is an integral part of the Constitution, but it is non-justiciable independently without other operative articles.' }
    ],
    difficulty: 'Hard',
    pyqRef: 'UPSC CSE Prelims 2020'
  },
  {
    id: 'mcq-3',
    subjectId: 'economy',
    topicId: 'economy-monetary',
    question: 'If the RBI decides to adopt an expansionary monetary policy, which of the following would it NOT do?',
    options: [
      { text: '1. Cut and optimize the Statutory Liquidity Ratio (SLR)', isCorrect: false, trap: 'Cutting SLR increases lending liquidity, which is expansionary.' },
      { text: '2. Increase the Marginal Standing Facility (MSF) rate', isCorrect: true, explanation: 'Increasing MSF rate increases borrowing costs for banks, which is contractionary (tight money policy), NOT expansionary. Therefore RBI would NOT do this.' },
      { text: '3. Cut the Bank Rate and Repo Rate', isCorrect: false, trap: 'Cutting repo rate lowers lending rates, promoting expansion.' },
      { text: '4. Undertake Open Market purchases of Government Securities', isCorrect: false, trap: 'Buying G-Secs injects cash into the banking system, which is expansionary.' }
    ],
    difficulty: 'Medium',
    pyqRef: 'UPSC CSE Prelims 2020'
  },
  {
    id: 'mcq-4',
    subjectId: 'polity',
    topicId: 'polity-dpsp',
    question: 'According to the Constitution of India, which of the following are fundamental for the governance of the country?',
    options: [
      { text: 'A. Fundamental Rights', isCorrect: false, trap: 'FRs are fundamental for individual liberty, not governance of the country per Art 37.' },
      { text: 'B. Fundamental Duties', isCorrect: false, trap: 'FDs are moral obligations for citizens.' },
      { text: 'C. Directive Principles of State Policy', isCorrect: true, explanation: 'Article 37 explicitly states: "The principles therein laid down are nevertheless fundamental in the governance of the country and it shall be the duty of the State to apply these principles in making laws."' },
      { text: 'D. Fundamental Rights and Fundamental Duties', isCorrect: false, trap: 'Common confusion trap.' }
    ],
    difficulty: 'Medium',
    pyqRef: 'UPSC CSE Prelims 2013'
  },
  {
    id: 'mcq-5',
    subjectId: 'history',
    topicId: 'history-1857',
    question: 'With reference to the Revolt of 1857, which of the following pairs of leaders and their primary centers of rebellion is/are correctly matched?\n1. Kunwar Singh — Arrah (Bihar)\n2. Nana Saheb — Kanpur\n3. Begum Hazrat Mahal — Bareilly',
    options: [
      { text: 'A. 1 and 2 only', isCorrect: true, explanation: 'Kunwar Singh led from Arrah/Jagdishpur (Bihar), Nana Saheb led at Kanpur. Begum Hazrat Mahal led the revolt at Lucknow, while Khan Bahadur Khan led at Bareilly.' },
      { text: 'B. 2 and 3 only', isCorrect: false, trap: 'Begum Hazrat Mahal led at Lucknow, not Bareilly.' },
      { text: 'C. 1 and 3 only', isCorrect: false, trap: 'Pair 3 is incorrect.' },
      { text: 'D. 1, 2 and 3', isCorrect: false, trap: 'All are not matched.' }
    ],
    difficulty: 'Medium',
    pyqRef: 'UPSC CSE Prelims Standard'
  },
  {
    id: 'mcq-6',
    subjectId: 'geography',
    topicId: 'geography-monsoon',
    question: 'Consider the following statements regarding the Indian Monsoon:\n1. A positive Indian Ocean Dipole (IOD) characterized by warmer sea surface temperatures in the western Indian Ocean generally favors Indian monsoon rainfall.\n2. El Niño conditions in the equatorial Pacific Ocean typically result in above-normal rainfall during the South-West Monsoon.',
    options: [
      { text: 'A. 1 only', isCorrect: true, explanation: 'Statement 1 is correct: A positive IOD leads to more cloud formation and moisture transport towards India, aiding the monsoon. Statement 2 is incorrect: El Niño is strongly associated with deficient/drought conditions in India, whereas La Niña favors above-normal rainfall.' },
      { text: 'B. 2 only', isCorrect: false, trap: 'El Niño typically suppresses Indian monsoon.' },
      { text: 'C. Both 1 and 2', isCorrect: false, trap: 'Statement 2 is false.' },
      { text: 'D. Neither 1 nor 2', isCorrect: false, trap: 'Statement 1 is true.' }
    ],
    difficulty: 'Hard',
    pyqRef: 'UPSC CSE Prelims 2017'
  },
  {
    id: 'mcq-7',
    subjectId: 'environment',
    topicId: 'environment-biodiversity',
    question: 'In India, in which one of the following types of protected areas are local people NOT allowed to collect and use biomass or graze livestock?',
    options: [
      { text: 'A. Biosphere Reserves', isCorrect: false, trap: 'Buffer and transition zones permit sustainable traditional use.' },
      { text: 'B. National Parks', isCorrect: true, explanation: 'Under Section 35(6) of the Wildlife Protection Act, 1972, no grazing of any livestock is permitted inside a National Park, and human activities are strictly restricted compared to sanctuaries.' },
      { text: 'C. Wetlands declared under Ramsar Convention', isCorrect: false, trap: 'Ramsar encourages "wise use" by local communities.' },
      { text: 'D. Wildlife Sanctuaries', isCorrect: false, trap: 'Chief Wildlife Warden can permit limited regulated grazing in sanctuaries under Sec 29.' }
    ],
    difficulty: 'Medium',
    pyqRef: 'UPSC CSE Prelims 2012'
  }
];

export const UPSC_FLASHCARDS = [
  { id: 'fc-1', topicId: 'polity-fundamental-rights', front: 'Which Fundamental Rights are available ONLY to Indian Citizens?', back: 'Articles 15, 16, 19, 29, and 30.' },
  { id: 'fc-2', topicId: 'polity-fundamental-rights', front: 'Which Articles cannot be suspended even during a National Emergency (Article 352)?', back: 'Articles 20 (Protection in respect of conviction for offences) and Article 21 (Protection of life and personal liberty).' },
  { id: 'fc-3', topicId: 'polity-preamble', front: 'What were the 3 words added to the Preamble by the 42nd Amendment Act, 1976?', back: 'Socialist, Secular, and Integrity.' },
  { id: 'fc-4', topicId: 'economy-monetary', front: 'What is the constitution and voting power of the RBI Monetary Policy Committee (MPC)?', back: '6 members (3 RBI + 3 GoI). Quorum is 4. Governor chairs with a casting vote in case of tie. Target: 4% +/- 2% CPI.' },
  { id: 'fc-5', topicId: 'history-1857', front: 'Which Act transferred governance of India from the East India Company directly to the British Crown?', back: 'Government of India Act, 1858 (Act for the Better Government of India).' },
  { id: 'fc-6', topicId: 'geography-monsoon', front: 'What is the difference between positive IOD and negative IOD for the Indian Monsoon?', back: 'Positive IOD: Western Indian Ocean is warmer than Eastern -> Enhances Indian Monsoon. Negative IOD: Eastern Indian Ocean is warmer -> Suppresses Indian Monsoon.' },
  { id: 'fc-7', topicId: 'environment-biodiversity', front: 'What are the 4 designated Biodiversity Hotspots covering parts of India?', back: '1) Western Ghats, 2) Eastern Himalayas, 3) Indo-Burma, 4) Sundaland (Nicobar Islands).' }
];

export const SPACED_REPETITION_INTERVALS = [0, 1, 3, 7, 15, 30, 60]; // Days for spaced recall
