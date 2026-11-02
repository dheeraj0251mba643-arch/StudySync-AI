import { Flashcard, QuizQuestion, SprintPackage, StudentProfile } from '../types';

export const DEFAULT_STUDENT_PROFILE: StudentProfile = {
  name: 'Dheeraj Pratap Singh',
  email: 'dheeraj.0251mba643@dgu.ac.in',
  university: 'DBS Global University',
  studentId: '0251MBA643',
  targetCourse: 'organic-chemistry',
  examDate: '2026-11-20',
  manualHoursSpentWeekly: 6,
};

export const INITIAL_FLASHCARDS: Flashcard[] = [
  // Organic Chemistry
  {
    id: 'orgo-1',
    subject: 'organic-chemistry',
    topic: 'Substitution Reactions',
    front: 'What solvent and substrate conditions definitively favor SN2 over SN1?',
    back: 'Primary (1°) or unhindered secondary (2°) electrophilic carbons, strong unhindered nucleophiles (e.g. NaCN, I⁻, N3⁻), and Polar Aprotic Solvents (DMSO, DMF, Acetone, Acetonitrile).',
    clinicalNote: 'Pharmaceutical synthesis of antineoplastic alkylating agents depends heavily on precise bimolecular backside displacement (Walden inversion).',
    mechanismOrKeyPoint: 'Concerted backside nucleophilic attack with 100% inversion of stereochemical configuration; rate = k[substrate][nucleophile].',
    mastery: 'new',
    reviewCount: 0,
  },
  {
    id: 'orgo-2',
    subject: 'organic-chemistry',
    topic: 'Elimination Mechanisms',
    front: 'How do you predict Hofmann vs. Zaitsev elimination regioselectivity in E2 reactions?',
    back: 'Bulky, sterically hindered bases (e.g. Potassium tert-butoxide, LDA) yield the less substituted, less stable alkene (Hofmann product). Small, unhindered bases (e.g. NaOCH3, NaOEt, NaOH) yield the more substituted, thermodynamically stable alkene (Zaitsev product).',
    clinicalNote: 'Regiochemical stereospecificity determines potency in steroid synthesis and drug hormone analogue stability.',
    mechanismOrKeyPoint: 'Requires strict anti-periplanar (180° dihedral angle) alignment between the leaving group and beta-hydrogen in chair or Newman conformations.',
    mastery: 'learning',
    reviewCount: 1,
  },
  {
    id: 'orgo-3',
    subject: 'organic-chemistry',
    topic: 'Carbonyl Chemistry',
    front: 'What is the product when an ester reacts with 2 equivalents of a Grignard Reagent (R-MgBr), followed by aqueous acidic workup?',
    back: 'A tertiary alcohol with two identical alkyl groups derived from the Grignard reagent.',
    clinicalNote: 'Used in the commercial total synthesis of antihistamines and local anaesthetics like procaine and lidocaine precursors.',
    mechanismOrKeyPoint: '1st equivalent attacks ester carbonyl -> tetrahedral intermediate collapses displacing alkoxide leaving group to form a ketone intermediate -> 2nd equivalent immediately attacks more reactive ketone -> tertiary alcohol.',
    mastery: 'new',
    reviewCount: 0,
  },
  {
    id: 'orgo-4',
    subject: 'organic-chemistry',
    topic: 'Spectroscopy',
    front: 'In 1H-NMR, what chemical shift (ppm) indicates an aldehyde proton vs. a carboxylic acid proton?',
    back: 'Aldehyde (-CHO): 9.0 to 10.0 ppm (singlet or doublet if adjacent alpha proton exists). Carboxylic acid (-COOH): 10.5 to 12.5 ppm (broad singlet due to hydrogen bonding exchange).',
    clinicalNote: 'Rapid distinction is critical in identifying toxic metabolites in clinical pharmacology assays.',
    mechanismOrKeyPoint: 'Heavy deshielding occurs due to proximity to strongly electronegative carbonyl oxygen and magnetic anisotropy of the pi-bond system.',
    mastery: 'mastered',
    reviewCount: 3,
  },
  {
    id: 'orgo-5',
    subject: 'organic-chemistry',
    topic: 'Aromaticity',
    front: 'What are the 4 strict criteria required for a molecule to be classified as Aromatic by Hückel’s Rule?',
    back: '1. Cyclic\n2. Fully conjugated (every ring atom has an unhybridized p-orbital)\n3. Planar geometry\n4. Possesses exactly [4n + 2] pi electrons (where n is a non-negative integer: 2, 6, 10, 14...).',
    clinicalNote: 'Aromatic rings (such as benzene and pyridine) are foundational pharmacophores that stack between DNA base pairs in chemotherapeutic intercalation.',
    mechanismOrKeyPoint: 'Molecules with 4n pi electrons meeting criteria 1-3 are Anti-Aromatic and destabilized relative to open-chain analogues.',
    mastery: 'learning',
    reviewCount: 2,
  },

  // Human Anatomy
  {
    id: 'anat-1',
    subject: 'human-anatomy',
    topic: 'Cranial Nerves',
    front: 'Which cranial nerve provides parasympathetic innervation to thoracic and most abdominal viscera, and what cranial foramen does it traverse?',
    back: 'Cranial Nerve X (Vagus Nerve). It exits the posterior cranial fossa via the Jugular Foramen along with CN IX (Glossopharyngeal) and CN XI (Accessory).',
    clinicalNote: 'Vagal nerve stimulation modulates heart rate (SA/AV nodal inhibition) and gastric motility; damage causes dysphagia, hoarseness, and loss of gag reflex (efferent limb).',
    mechanismOrKeyPoint: 'Nucleus ambiguus (motor to pharyngeal/laryngeal muscles), Dorsal motor nucleus of vagus (parasympathetics), Solitary tract nucleus (visceral sensation & taste).',
    mastery: 'new',
    reviewCount: 0,
  },
  {
    id: 'anat-2',
    subject: 'human-anatomy',
    topic: 'Upper Extremity / Brachial Plexus',
    front: 'A patient fractures the surgical neck of the humerus. Which nerve and accompanying blood vessel are at acute risk of injury?',
    back: 'Axillary Nerve (C5-C6) and the Posterior Circumflex Humeral Artery.',
    clinicalNote: 'Leads to paralysis and atrophy of the deltoid and teres minor muscles, resulting in loss of shoulder abduction past 15° and sensory loss over the lateral shoulder ("regimental badge area").',
    mechanismOrKeyPoint: 'Passes through the quadrangular space bounded by teres minor (superior), teres major (inferior), triceps long head (medial), and humerus (lateral).',
    mastery: 'learning',
    reviewCount: 1,
  },
  {
    id: 'anat-3',
    subject: 'human-anatomy',
    topic: 'Cardiovascular Anatomy',
    front: 'Which coronary artery specifically supplies the Sinoatrial (SA) node and Atrioventricular (AV) node in a right-dominant heart circulation?',
    back: 'The Right Coronary Artery (RCA) supplies the SA node in ~60% of individuals via the SA nodal artery, and supplies the AV node in ~85-90% of individuals via the AV nodal branch.',
    clinicalNote: 'Inferior wall myocardial infarction (involving RCA occlusion) commonly presents with profound sinus bradycardia or complete heart block.',
    mechanismOrKeyPoint: 'Heart dominance is determined by which artery supplies the Posterior Descending Artery (PDA), which runs in the posterior interventricular sulcus.',
    mastery: 'mastered',
    reviewCount: 4,
  },
  {
    id: 'anat-4',
    subject: 'human-anatomy',
    topic: 'Neuroanatomy & Spinal Cord',
    front: 'What is the precise somatotopic path and decussation site of the Spinothalamic Tract (pain & temperature)?',
    back: '1st order neuron cell bodies in Dorsal Root Ganglion -> enter Lissauer’s tract -> synapse in substantia gelatinosa -> 2nd order neuron fibers decussate immediately in the anterior white commissure (within 1-2 spinal segments) -> ascend to VPL of thalamus.',
    clinicalNote: 'Syringomyelia (fluid-filled cyst within central canal) first compresses the crossing anterior white commissure fibers, causing bilateral "cape-like" loss of pain and temperature in upper extremities.',
    mechanismOrKeyPoint: 'Contrast with Dorsal Column-Medial Lemniscal pathway (DCML), which ascends ipsilaterally and decussates in the medulla.',
    mastery: 'learning',
    reviewCount: 2,
  },
  {
    id: 'anat-5',
    subject: 'human-anatomy',
    topic: 'Lower Extremity Anatomy',
    front: 'What are the anatomical boundaries and contents of the Femoral Triangle from lateral to medial?',
    back: 'Boundaries: Inguinal ligament (superior), Sartorius (lateral), Adductor longus (medial).\nContents (Lateral to Medial - "NAVeL"): Nerve (Femoral nerve), Artery (Femoral artery), Vein (Femoral vein), empty space (femoral canal), Lymphatics.',
    clinicalNote: 'Femoral nerve is outside the femoral sheath. Femoral hernias protrude through the femoral ring into the femoral canal, medial to the femoral vein.',
    mechanismOrKeyPoint: 'High clinical yield for vascular access (femoral line placement, cardiac catheterization via right femoral artery puncture).',
    mastery: 'new',
    reviewCount: 0,
  },
];

export const MOCK_QUIZ_QUESTIONS: QuizQuestion[] = [
  // Organic Chemistry Quizzes
  {
    id: 'q-orgo-1',
    subject: 'organic-chemistry',
    topic: 'Reaction Mechanisms (SN1 / SN2)',
    clinicalVignette: 'A chemical biology researcher is synthesizing a targeted dopamine receptor agonist. In the final step, (2R)-2-bromobutane is reacted with sodium cyanide (NaCN) dissolved in dimethyl sulfoxide (DMSO).',
    question: 'What is the major stereochemical and mechanistic outcome of this reaction?',
    options: [
      {
        text: '(2S)-2-methylbutanenitrile via an SN2 mechanism with inversion of configuration',
        isCorrect: true,
        rationale: 'Correct! (2R)-2-bromobutane is a secondary alkyl halide. NaCN is a strong, unhindered nucleophile and DMSO is a polar aprotic solvent, strongly favoring bimolecular SN2 substitution. Backside attack forces 100% stereochemical Walden inversion from (R) to (S).'
      },
      {
        text: 'A 50:50 racemic mixture of (2R) and (2S) enantiomers via an SN1 planar carbocation intermediate',
        isCorrect: false,
        rationale: 'Incorrect. SN1 requires weak nucleophiles and polar protic solvents (e.g. H2O, EtOH) to stabilize carbocations. DMSO is polar aprotic and cyanide is an excellent nucleophile, preventing carbocation formation.'
      },
      {
        text: '2-butene as the major product via Zaitsev E2 elimination',
        isCorrect: false,
        rationale: 'Incorrect. While cyanide is a good nucleophile, it is a weak Brønsted base (pKa of HCN is 9.2). Elimination requires strong Brønsted bases like alkoxides or hydroxides.'
      },
      {
        text: '(2R)-2-methylbutanenitrile with retention of stereochemistry via front-side attack',
        isCorrect: false,
        rationale: 'Incorrect. SN2 reactions never proceed with retention of configuration because the nucleophile must attack the back lobe of the C-Br sigma antibonding orbital (sigma*).'
      }
    ],
    highYieldYieldFactor: 'Tested on ~92% of university pre-med Orgo midterms & MCAT Chem/Phys'
  },
  {
    id: 'q-orgo-2',
    subject: 'organic-chemistry',
    topic: 'Carbonyls & Enolates',
    clinicalVignette: 'During the synthesis of a non-steroidal anti-inflammatory drug (NSAID), a student treats cyclohexanone with lithium diisopropylamide (LDA) at -78 °C in tetrahydrofuran (THF), followed by addition of methyl iodide.',
    question: 'Why is LDA specifically employed rather than sodium ethoxide (NaOEt) at room temperature?',
    options: [
      {
        text: 'To selectively deprotonate the less sterically hindered alpha-carbon and form the kinetic enolate irreversibly',
        isCorrect: true,
        rationale: 'Correct! LDA is a very bulky, strong, non-nucleophilic base (pKa ~36). At cryogenic temperature (-78 °C), it selectively extracts the most accessible proton at the fastest rate (kinetic control), forming the kinetic enolate with zero competing nucleophilic addition.'
      },
      {
        text: 'To promote reversible thermodynamic enolate formation with higher alkene substitution',
        isCorrect: false,
        rationale: 'Incorrect. Thermodynamic enolates require small bases (NaOEt, KOtBu with heat) and higher temperatures allowing equilibrium.'
      },
      {
        text: 'To act as a nucleophile that attacks the carbonyl carbon directly forming a tertiary alcohol',
        isCorrect: false,
        rationale: 'Incorrect. The two bulky isopropyl groups prevent LDA from acting as a nucleophile at the carbonyl carbon; it behaves strictly as a base.'
      },
      {
        text: 'To protonate the carbonyl oxygen and generate an enol rather than an enolate',
        isCorrect: false,
        rationale: 'Incorrect. LDA is a strong base, not an acid. It deprotonates alpha-protons to produce an enolate anion.'
      }
    ],
    highYieldYieldFactor: 'Essential Carbonyl Core: 95% Pre-Med exam frequency'
  },

  // Human Anatomy Quizzes
  {
    id: 'q-anat-1',
    subject: 'human-anatomy',
    topic: 'Cranial Nerve Clinical Examination',
    clinicalVignette: 'A 24-year-old pre-med student suffers a motorcycle collision and exhibits an absent right corneal reflex when the right cornea is touched with a cotton wisp, and neither eye blinks. However, when the left cornea is touched, both eyes blink normally.',
    question: 'Which cranial nerve sensory or motor pathway is defective in this patient?',
    options: [
      {
        text: 'Right Trigeminal Nerve (CN V1, Ophthalmic division) afferent limb defect',
        isCorrect: true,
        rationale: 'Correct! The corneal reflex afferent sensory limb is mediated by the ophthalmic division of the Trigeminal nerve (CN V1). Touching the right cornea failed to produce any bilateral blink, but touching the left cornea stimulated both eyes to blink normally, proving the bilateral facial motor nerves (CN VII) are intact. The sensory afferent on the right is damaged.'
      },
      {
        text: 'Right Facial Nerve (CN VII) motor efferent limb defect',
        isCorrect: false,
        rationale: 'Incorrect. If the right CN VII were damaged, stimulating the left eye would cause only the left eye to blink (no consensual right blink). But here, left corneal stimulation blinked both eyes normally.'
      },
      {
        text: 'Left Optic Nerve (CN II) sensory limb defect',
        isCorrect: false,
        rationale: 'Incorrect. CN II mediates the pupillary light reflex, not the tactile corneal blink reflex (which is CN V1 to CN VII).'
      },
      {
        text: 'Oculomotor Nerve (CN III) parasympathetic defect',
        isCorrect: false,
        rationale: 'Incorrect. CN III controls extraocular muscle movement and pupillary constriction, not the orbicularis oculi eyelid closure.'
      }
    ],
    highYieldYieldFactor: 'Board Classic & Med School Anatomy Practical Favorite'
  },
  {
    id: 'q-anat-2',
    subject: 'human-anatomy',
    topic: 'Upper Extremity & Hand Innervation',
    clinicalVignette: 'A 42-year-old laboratory technician reports persistent burning tingling in her thumb, index finger, and lateral half of the ring finger. Physical exam demonstrates wasting of the thenar eminence and a positive Phalen’s test.',
    question: 'Which anatomical structure is responsible for compressing the affected nerve?',
    options: [
      {
        text: 'Flexor Retinaculum (Transverse Carpal Ligament) compressing the Median Nerve',
        isCorrect: true,
        rationale: 'Correct! The symptoms and physical findings describe classic Carpal Tunnel Syndrome. The median nerve passes beneath the flexor retinaculum alongside the 9 flexor tendons (4 FDS, 4 FDP, 1 FPL). Compression impairs sensation to the lateral 3.5 digits and leads to thenar muscular atrophy.'
      },
      {
        text: 'Guyon’s Canal ligament compressing the Ulnar Nerve',
        isCorrect: false,
        rationale: 'Incorrect. Guyon’s canal houses the ulnar nerve and artery; ulnar entrapment impairs sensation to the medial 1.5 digits and causes hypothenar/interossei wasting.'
      },
      {
        text: 'Supinator muscle arcade of Frohse compressing the Deep Radial Nerve',
        isCorrect: false,
        rationale: 'Incorrect. Compresses the posterior interosseous nerve (pure motor), producing wrist/finger drop with no sensory loss.'
      },
      {
        text: 'Coracobrachialis muscle compressing the Musculocutaneous Nerve',
        isCorrect: false,
        rationale: 'Incorrect. Musculocutaneous nerve innervates anterior arm flexors (biceps, brachialis) and lateral forearm sensation, not the hand.'
      }
    ],
    highYieldYieldFactor: '100% High-Yield Cadaver & Clinical Correlation'
  }
];

export const SPRINT_PACKAGES: SprintPackage[] = [
  {
    id: 'sprint-orgo-mech',
    title: '1-on-1 Organic Chem Mechanism Mastery Sprint',
    subject: 'organic-chemistry',
    durationMinutes: 45,
    priceUsd: 38,
    instructorName: 'Sarah Chen, M.D. Candidate',
    instructorTitle: 'Harvard Medical School · 100th Percentile Orgo TA',
    instructorSchool: 'Harvard University',
    instructorScore: '100th %ile MCAT Chem/Phys',
    badgeLabel: 'Most Booked Before Midterms',
    description: 'High-speed diagnostic drill on curved-arrow formalism, SN1/SN2/E1/E2 stereospecificity, and tricky multi-step retro-synthesis shortcuts tailored to your syllabus.',
    curriculumHighlights: [
      'Personalized review of your past exam / midterm weak areas',
      'The "3-Question Eliminator" algorithm for substitution vs elimination',
      'High-yield retro-synthesis roadmap & cheat sheet export',
      '15-minute mock oral quiz with live diagnostic scoring'
    ],
    slots: [
      { id: 's1-1', dateStr: '2026-11-05', dayLabel: 'Thu, Nov 5', time: '11:00 AM EST', isBooked: false },
      { id: 's1-2', dateStr: '2026-11-05', dayLabel: 'Thu, Nov 5', time: '02:30 PM EST', isBooked: false },
      { id: 's1-3', dateStr: '2026-11-06', dayLabel: 'Fri, Nov 6', time: '09:00 AM EST', isBooked: false },
      { id: 's1-4', dateStr: '2026-11-06', dayLabel: 'Fri, Nov 6', time: '04:00 PM EST', isBooked: false },
      { id: 's1-5', dateStr: '2026-11-07', dayLabel: 'Sat, Nov 7', time: '01:00 PM EST', isBooked: false },
      { id: 's1-6', dateStr: '2026-11-08', dayLabel: 'Sun, Nov 8', time: '10:00 AM EST', isBooked: false },
    ]
  },
  {
    id: 'sprint-anat-cadaver',
    title: 'Anatomy Lab Practical & Cadaver Mock Oral Sprint',
    subject: 'human-anatomy',
    durationMinutes: 60,
    priceUsd: 48,
    instructorName: 'Marcus Vance, M.S., MS2',
    instructorTitle: 'Johns Hopkins Med · Anatomy Teaching Fellow',
    instructorSchool: 'Johns Hopkins School of Medicine',
    instructorScore: 'Top 1% Anatomy Practical Honors',
    badgeLabel: 'Lab Practical Essential',
    description: 'Simulated 30-station timed pin-test walkthrough, cranial nerve foramina spatial orientation, and high-yield clinical lesions (brachial plexus, stroke vascular territories).',
    curriculumHighlights: [
      'Visual dissection pin-identification rapid fire drills',
      'Cranial Nerve I-XII exit foramina & functional modalities',
      'Clinical vignette correlation for high-stakes test questions',
      'Custom downloadable lab anatomy checklist & mnemonics'
    ],
    slots: [
      { id: 's2-1', dateStr: '2026-11-05', dayLabel: 'Thu, Nov 5', time: '12:30 PM EST', isBooked: false },
      { id: 's2-2', dateStr: '2026-11-05', dayLabel: 'Thu, Nov 5', time: '05:00 PM EST', isBooked: false },
      { id: 's2-3', dateStr: '2026-11-06', dayLabel: 'Fri, Nov 6', time: '11:30 AM EST', isBooked: false },
      { id: 's2-4', dateStr: '2026-11-07', dayLabel: 'Sat, Nov 7', time: '03:30 PM EST', isBooked: false },
      { id: 's2-5', dateStr: '2026-11-09', dayLabel: 'Mon, Nov 9', time: '02:00 PM EST', isBooked: false },
    ]
  },
  {
    id: 'sprint-exam-rescue',
    title: '72-Hour Midterm Exam Rescue & Active Recall Blitz',
    subject: 'organic-chemistry',
    durationMinutes: 90,
    priceUsd: 65,
    instructorName: 'Dr. Elena Rostova, Ph.D.',
    instructorTitle: 'Former Stanford Pre-Med Advisor & Chemistry Lecturer',
    instructorSchool: 'Stanford University',
    instructorScore: '12+ Yrs Pre-Med Mentorship',
    badgeLabel: 'Comprehensive Final Sprint',
    description: 'Complete high-yield syllabus triage for students cramming 3-4 weeks of missed or dense material into an intense, stress-free structured mastery plan.',
    curriculumHighlights: [
      'Full syllabus triage: identifying the 20% content yielding 80% exam points',
      'Error analysis on your past problem sets and midterms',
      'Custom 72-hour day-by-day active recall study schedule',
      'Dedicated emergency Q&A on your toughest course mechanisms'
    ],
    slots: [
      { id: 's3-1', dateStr: '2026-11-06', dayLabel: 'Fri, Nov 6', time: '06:00 PM EST', isBooked: false },
      { id: 's3-2', dateStr: '2026-11-07', dayLabel: 'Sat, Nov 7', time: '11:00 AM EST', isBooked: false },
      { id: 's3-3', dateStr: '2026-11-08', dayLabel: 'Sun, Nov 8', time: '03:00 PM EST', isBooked: false },
      { id: 's3-4', dateStr: '2026-11-09', dayLabel: 'Mon, Nov 9', time: '05:30 PM EST', isBooked: false },
    ]
  }
];
