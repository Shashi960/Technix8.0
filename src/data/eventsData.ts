import { FestEvent } from "@/types";

export const eventsData: FestEvent[] = [
  // 1. STARK PROTOCOL — Coding and Debugging
  {
    id: "stark-protocol",
    title: "STARK PROTOCOL — Coding and Debugging",
    marvelCharacter: "IRON MAN — Tony Stark",
    characterTitle: "Genius. Billionaire. Code Architect.",
    category: "Technical",
    shortDescription: "Test your programming logic, algorithmic optimization, and rapid code debugging under Stark Industries' highest pressure protocol.",
    fullDescription: "Welcome to Stark Industries R&D. When critical algorithmic anomalies disrupt the core reactor grid, Tony Stark initiates the Stark Protocol. Competitors face complex modern codebases filled with memory leaks, race conditions, and algorithmic bottlenecks. Only the sharpest engineers will debug the mainframe and earn the arc reactor certification.",
    visualDirection: "Iron Man nanotech armor, holographic debugger interfaces, circuit motifs, red and gold illumination.",
    heroTheme: {
      accentColor: "#E23636", // Stark Crimson Red
      glowColor: "rgba(226, 54, 54, 0.45)",
      badgeBg: "rgba(226, 54, 54, 0.15)",
      heroGradient: "linear-gradient(135deg, rgba(226,54,54,0.3) 0%, rgba(245,158,11,0.15) 100%)",
    },
    teamSize: {
      min: 1,
      max: 2,
      label: "Individual or Team of 2",
    },
    registrationFee: "Placeholder (To be finalized by fest committee)",
    venue: "Main Computer Center - Lab 301",
    scheduleTime: "Day 1 - 10:00 AM to 01:00 PM",
    rounds: [
      {
        roundNumber: 1,
        title: "Round 1: Jarvis Syntax Audit",
        duration: "45 Mins",
        description: "Speed debugging: Identify and patch memory leaks, race conditions, and logic traps across multi-language snippets.",
      },
      {
        roundNumber: 2,
        title: "Round 2: Arc Reactor Optimization",
        duration: "75 Mins",
        description: "Algorithmic problem solving: Implement optimal data structures under tight time and memory limits.",
      },
      {
        roundNumber: 3,
        title: "Round 3: Nanotech Mainframe Final",
        duration: "60 Mins",
        description: "Live system challenge: Reverse engineer a corrupted codebase and deploy the operational Stark firewall.",
      },
    ],
    rules: [
      "Languages permitted: C, C++, Java, Python.",
      "Participants may register individually or in teams of up to 2.",
      "External AI tools, web searching, or personal mobile devices are strictly prohibited during the offline rounds.",
      "Decisions made by the technical evaluation panel are final.",
    ],
    eligibility: "Open to all enrolled undergraduate and postgraduate students with a valid college ID.",
    coordinators: [
      {
        name: "Prof. Lead Coordinator",
        role: "Faculty Coordinator",
        phone: "+91 98000 00001",
        email: "starkprotocol@technixfest.org",
      },
      {
        name: "Student Lead",
        role: "Student Coordinator",
        phone: "+91 98000 00002",
        email: "starktech@technixfest.org",
      },
    ],
    image: "/images/technix/events/stark-protocol.webp",
    avatarIcon: "Cpu",
  },

  // 2. SHIELD: COMMAND THE CHAOS — IT Manager
  {
    id: "shield-command-chaos",
    title: "SHIELD: COMMAND THE CHAOS — IT Manager",
    marvelCharacter: "NICK FURY — Strategic Director",
    characterTitle: "Director of Strategic Homeland Operations",
    category: "Technical",
    shortDescription: "Demonstrate enterprise leadership, crisis mitigation, IT resource management, and strategic corporate decision-making.",
    fullDescription: "Director Nick Fury needs commanders who can command the chaos when global systems fail. S.H.I.E.L.D. Command The Chaos is the flagship IT Manager showdown testing enterprise infrastructure strategy, data breach containment, executive pitching, and psychological calmness under interrogation.",
    visualDirection: "S.H.I.E.L.D. tactical command center, radar grids, mission monitors, steel grey and tactical blue.",
    heroTheme: {
      accentColor: "#38BDF8", // Tactical Blue
      glowColor: "rgba(56, 189, 248, 0.45)",
      badgeBg: "rgba(56, 189, 248, 0.15)",
      heroGradient: "linear-gradient(135deg, rgba(56,189,248,0.25) 0%, rgba(30,41,59,0.3) 100%)",
    },
    teamSize: {
      min: 1,
      max: 1,
      label: "Individual Participation Only",
    },
    registrationFee: "Placeholder (To be finalized by fest committee)",
    venue: "S.H.I.E.L.D. Boardroom - Seminar Hall 2",
    scheduleTime: "Day 1 & Day 2 Multi-Stage",
    rounds: [
      {
        roundNumber: 1,
        title: "Stage 1: Level 7 Aptitude & Strategic Profiling",
        duration: "45 Mins",
        description: "Psychometric profiling, corporate case analytics, and IT infrastructure decision matrices.",
      },
      {
        roundNumber: 2,
        title: "Stage 2: Helicarrier Crisis Management",
        duration: "60 Mins",
        description: "Real-time enterprise crisis scenario: Address server breach, data ransom, and public press interrogations.",
      },
      {
        roundNumber: 3,
        title: "Stage 3: Executive Council Pitch",
        duration: "30 Mins",
        description: "Defend your tech budget, organizational roadmap, and modernization plan before industry jury.",
      },
    ],
    rules: [
      "Strict professional business attire is recommended.",
      "Individual entry only; no cross-college proxy representations.",
      "Case materials will be distributed 30 minutes before each round.",
      "Evaluation prioritizes articulation, tech depth, leadership poise, and crisis mitigation.",
    ],
    eligibility: "UG/PG students across IT, CS, Management, and Engineering streams.",
    coordinators: [
      {
        name: "Dr. Faculty Director",
        role: "Faculty Coordinator",
        phone: "+91 98000 00003",
        email: "shield@technixfest.org",
      },
      {
        name: "Senior Student Lead",
        role: "Student Coordinator",
        phone: "+91 98000 00004",
        email: "nickfury.cmd@technixfest.org",
      },
    ],
    image: "/images/technix/events/shield-command-chaos.webp",
    avatarIcon: "ShieldAlert",
  },

  // 3. THE INFINITY IQ CHALLENGE — IT Quiz
  {
    id: "infinity-iq-challenge",
    title: "THE INFINITY IQ CHALLENGE — IT Quiz",
    marvelCharacter: "DOCTOR STRANGE — Master of the Mystic Arts",
    characterTitle: "Sorcerer Supreme of Knowledge",
    category: "Technical",
    shortDescription: "Navigate logic puzzles, computer science trivia, tech lore, and mind-bending riddles through the digital multiverse.",
    fullDescription: "From the depths of the Kamar-Taj archives to cutting-edge AI breakthroughs, Doctor Strange summons the sharpest minds. The Infinity IQ Challenge spans computer architecture, cryptographic riddles, tech history, cyber lore, and rapid-fire buzzers.",
    visualDirection: "Mystic mandalas, eldritch portal rings, cosmic knowledge grids, mystic purple and eldritch gold.",
    heroTheme: {
      accentColor: "#A855F7", // Mystic Purple
      glowColor: "rgba(168, 85, 247, 0.45)",
      badgeBg: "rgba(168, 85, 247, 0.15)",
      heroGradient: "linear-gradient(135deg, rgba(168,85,247,0.3) 0%, rgba(245,158,11,0.2) 100%)",
    },
    teamSize: {
      min: 2,
      max: 2,
      label: "Team of 2",
    },
    registrationFee: "Placeholder (To be finalized by fest committee)",
    venue: "Sanctum Auditorium - Hall A",
    scheduleTime: "Day 1 - 02:00 PM to 05:00 PM",
    rounds: [
      {
        roundNumber: 1,
        title: "Dimension 1: The Mirror Preliminary",
        duration: "30 Mins",
        description: "Pen-and-paper written screening test spanning tech history, algorithms, and logic mysteries.",
      },
      {
        roundNumber: 2,
        title: "Dimension 2: Astral Audio-Visuals",
        duration: "45 Mins",
        description: "Identify tech founders, obscure hardware patents, decipher encoded audio clips, and solve visual puzzles.",
      },
      {
        roundNumber: 3,
        title: "Dimension 3: The Dark Dimension Buzzer Finale",
        duration: "60 Mins",
        description: "High-stakes buzzer face-off with positive and negative scoring across advanced tech topics.",
      },
    ],
    rules: [
      "Each team must comprise exactly 2 members.",
      "Use of smartphones, smartwatches, or external aids leads to immediate disqualification.",
      "Top 6 teams from the preliminary round advance to the onstage buzzer finale.",
      "Quizmaster's ruling is absolute and binding.",
    ],
    eligibility: "Open to all verified college students.",
    coordinators: [
      {
        name: "Prof. Quiz Convener",
        role: "Faculty Coordinator",
        phone: "+91 98000 00005",
        email: "infinityiq@technixfest.org",
      },
      {
        name: "Student Quizmaster",
        role: "Student Coordinator",
        phone: "+91 98000 00006",
        email: "strange.quiz@technixfest.org",
      },
    ],
    image: "/images/technix/events/infinity-iq-challenge.webp",
    avatarIcon: "Sparkles",
  },

  // 4. MARVEL IN MOTION — Photography/Videography
  {
    id: "marvel-in-motion",
    title: "MARVEL IN MOTION — Photography/Videography",
    marvelCharacter: "SPIDER-MAN — Peter Parker",
    characterTitle: "Daily Bugle Visual Journalist",
    category: "Non-Technical",
    shortDescription: "Capture the festival's raw cinematic energy, street photography, and short-form video reels across campus.",
    fullDescription: "Peter Parker made his name capturing high-stakes action across New York City. Marvel In Motion challenges photographers and videographers to document the electric atmosphere of Technix 8.0 through cinematic angles, creative color grading, and dynamic reel storytelling.",
    visualDirection: "Camera apertures, film frames, dynamic street angles, web motifs, crimson red and electric blue.",
    heroTheme: {
      accentColor: "#EF4444", // Spidey Red
      glowColor: "rgba(239, 68, 68, 0.45)",
      badgeBg: "rgba(239, 68, 68, 0.15)",
      heroGradient: "linear-gradient(135deg, rgba(239,68,68,0.3) 0%, rgba(59,130,246,0.2) 100%)",
    },
    teamSize: {
      min: 1,
      max: 2,
      label: "Individual or Team of 2",
    },
    registrationFee: "Placeholder (To be finalized by fest committee)",
    venue: "Media Center - Room 102 & Campus-Wide",
    scheduleTime: "Day 1 & Day 2 (Submission by Day 2, 03:00 PM)",
    rounds: [
      {
        roundNumber: 1,
        title: "Assignment 1: Street Photography Spotlight",
        duration: "Full Day 1",
        description: "Submit 3 raw and graded high-resolution photos capturing authentic festival moments.",
      },
      {
        roundNumber: 2,
        title: "Assignment 2: The Bugle 60-Second Cinematic Reel",
        duration: "Day 2 Morning",
        description: "Produce a high-energy 60-second video reel with original transitions, typography, and sound design.",
      },
    ],
    rules: [
      "All submissions must be captured strictly within the Technix 8.0 festival grounds.",
      "DSLRs, mirrorless cameras, and flagship smartphones are permitted.",
      "Basic color grading and sound design are allowed; pre-rendered stock footage is prohibited.",
      "Plagiarism or submission of pre-existing media results in instant disqualification.",
    ],
    eligibility: "Open to all enrolled college students passionate about visual arts.",
    coordinators: [
      {
        name: "Prof. Media Advisor",
        role: "Faculty Coordinator",
        phone: "+91 98000 00007",
        email: "marvelinmotion@technixfest.org",
      },
      {
        name: "Student Media Lead",
        role: "Student Coordinator",
        phone: "+91 98000 00008",
        email: "spidey.lens@technixfest.org",
      },
    ],
    image: "/images/technix/events/marvel-in-motion.webp",
    avatarIcon: "Camera",
  },

  // 5. THE TESSERACT HEIST — Treasure Hunt
  {
    id: "tesseract-heist",
    title: "THE TESSERACT HEIST — Treasure Hunt",
    marvelCharacter: "LOKI — God of Stories & Mischief",
    characterTitle: "Architect of Mischief & Timelines",
    category: "Non-Technical",
    shortDescription: "Decipher encrypted ciphers, hidden clues, and timeline anomalies in an adrenaline-fueled campus treasure hunt.",
    fullDescription: "Loki has concealed the Space Stone across a fractured campus timeline. Teams must race across coordinates, solve cryptographic riddles, unlock physical puzzle boxes, and evade deceptive misdirections before the timeline collapses.",
    visualDirection: "Tesseract cube glow, emerald green shadows, ancient Norse runes, gold and cosmic blue.",
    heroTheme: {
      accentColor: "#10B981", // Loki Emerald Green
      glowColor: "rgba(16, 185, 129, 0.45)",
      badgeBg: "rgba(16, 185, 129, 0.15)",
      heroGradient: "linear-gradient(135deg, rgba(16,185,129,0.3) 0%, rgba(56,189,248,0.2) 100%)",
    },
    teamSize: {
      min: 3,
      max: 4,
      label: "Team of 3 to 4",
    },
    registrationFee: "Placeholder (To be finalized by fest committee)",
    venue: "Central Plaza - Assembly Flagpole",
    scheduleTime: "Day 2 - 10:00 AM to 01:00 PM",
    rounds: [
      {
        roundNumber: 1,
        title: "Phase 1: TVA Cryptographic Clearance",
        duration: "45 Mins",
        description: "Solve cipher sheets, Morse clues, and logic grids to acquire the first physical sector map.",
      },
      {
        roundNumber: 2,
        title: "Phase 2: The Timeline Field Sprint",
        duration: "75 Mins",
        description: "Navigate real-world campus checkpoints, decrypt coordinates, and complete tactical mini-tasks.",
      },
      {
        roundNumber: 3,
        title: "Phase 3: The Tesseract Vault Extraction",
        duration: "30 Mins",
        description: "Final puzzle lockbox extraction challenge under time pressure for the top qualifying teams.",
      },
    ],
    rules: [
      "Teams must consist of 3 or 4 registered participants.",
      "Physical tampering with campus property or unauthorized entry into restricted zones is forbidden.",
      "All clues must be retrieved and logged in sequence; skipping checkpoints voids the run.",
      "First team to correctly unlock the final vault wins.",
    ],
    eligibility: "Open to all registered college attendees.",
    coordinators: [
      {
        name: "Prof. Event Lead",
        role: "Faculty Coordinator",
        phone: "+91 98000 00009",
        email: "tesseract@technixfest.org",
      },
      {
        name: "Student Lead",
        role: "Student Coordinator",
        phone: "+91 98000 00010",
        email: "loki.heist@technixfest.org",
      },
    ],
    image: "/images/technix/events/tesseract-heist.webp",
    avatarIcon: "Compass",
  },

  // 6. AVENGERS: BATTLEWORLD — Gaming
  {
    id: "avengers-battleworld",
    title: "AVENGERS: BATTLEWORLD — Gaming",
    marvelCharacter: "THOR & HULK — Asgardian Gladiator & Green Goliath",
    characterTitle: "Champions of the Grandmaster Arena",
    category: "Gaming",
    shortDescription: "Clash in high-stakes esports showdowns across tactical shooters, fighting games, and battle royale arenas.",
    fullDescription: "Welcome to the Grandmaster's Battleworld! Thor and Hulk summon the fiercest esports competitors to test their reflexes, aim, teamwork, and tactical coordination in an electrifying LAN tournament featuring popular competitive titles.",
    visualDirection: "Sakaar arena metal, lightning strikes, neon tournament scoreboards, battle red and electric gold.",
    heroTheme: {
      accentColor: "#F59E0B", // Arena Gold
      glowColor: "rgba(245, 158, 11, 0.45)",
      badgeBg: "rgba(245, 158, 11, 0.15)",
      heroGradient: "linear-gradient(135deg, rgba(245,158,11,0.3) 0%, rgba(239,68,68,0.2) 100%)",
    },
    teamSize: {
      min: 4,
      max: 5,
      label: "Squad of 4 or 5",
    },
    registrationFee: "Placeholder (To be finalized by fest committee)",
    venue: "Main Esports Arena - Seminar Hall 1",
    scheduleTime: "Day 1 & Day 2 (Knockouts to Grand Finals)",
    rounds: [
      {
        roundNumber: 1,
        title: "Stage 1: Group Stage Knockouts",
        duration: "Day 1 Afternoon",
        description: "Single-elimination best-of-1 bracket across registered collegiate squads.",
      },
      {
        roundNumber: 2,
        title: "Stage 2: Semifinal Gauntlet",
        duration: "Day 2 Morning",
        description: "Best-of-3 high-intensity series with map vetos and tactical coach pauses.",
      },
      {
        roundNumber: 3,
        title: "Stage 3: Battleworld Grand Finals",
        duration: "Day 2 Afternoon",
        description: "Best-of-5 championship match projected live with live casting and audience commentary.",
      },
    ],
    rules: [
      "Official tournament platforms and titles to be specified in the player rulebook.",
      "Hardware cheating, script injection, and third-party exploits result in an instant team ban.",
      "Players may bring their own branded peripherals (mice, keyboards, headsets).",
      "Tournament admins' decisions on disputes, disconnections, and remakes are final.",
    ],
    eligibility: "Open to all verified college student esports squads.",
    coordinators: [
      {
        name: "Prof. Esports Advisor",
        role: "Faculty Coordinator",
        phone: "+91 98000 00011",
        email: "battleworld@technixfest.org",
      },
      {
        name: "Student Tournament Admin",
        role: "Student Coordinator",
        phone: "+91 98000 00012",
        email: "arena.gaming@technixfest.org",
      },
    ],
    image: "/images/technix/events/avengers-battleworld.webp",
    avatarIcon: "Gamepad2",
  },

  // 7. COSMIC SHOWCASE — Cultural
  {
    id: "cosmic-showcase",
    title: "COSMIC SHOWCASE — Cultural",
    marvelCharacter: "STAR-LORD — Peter Quill & Guardians",
    characterTitle: "Leader of the Galactic Sound & Stage",
    category: "Cultural",
    shortDescription: "Electrify the stage with musical performances, street dance crews, acoustic sets, and theatrical talent.",
    fullDescription: "Inspired by Star-Lord's mixtape-driven universe, Cosmic Showcase celebrates stage performance, musical battles, band showdowns, choreography, and artistic expression under festival concert lights.",
    visualDirection: "Cassette synthwave neon, deep space cosmic lasers, concert stage beams, magenta, violet, and cyan.",
    heroTheme: {
      accentColor: "#EC4899", // Neon Magenta
      glowColor: "rgba(236, 72, 153, 0.45)",
      badgeBg: "rgba(236, 72, 153, 0.15)",
      heroGradient: "linear-gradient(135deg, rgba(236,72,153,0.3) 0%, rgba(168,85,247,0.2) 100%)",
    },
    teamSize: {
      min: 1,
      max: 12,
      label: "Solo to Group Troupe (Up to 12)",
    },
    registrationFee: "Placeholder (To be finalized by fest committee)",
    venue: "Open Air Amphitheatre - Main Festival Stage",
    scheduleTime: "Day 2 - 04:30 PM Onwards",
    rounds: [
      {
        roundNumber: 1,
        title: "Act 1: Acoustic & Band Showdowns",
        duration: "04:30 PM – 06:30 PM",
        description: "Live musical ensemble and solo vocal performances evaluated on arrangement, vocals, and presence.",
      },
      {
        roundNumber: 2,
        title: "Act 2: The Cosmic Dance Troupe Battles",
        duration: "06:45 PM – 09:30 PM",
        description: "Choreographed crew dance showdowns, street battles, and cultural drama performances.",
      },
    ],
    rules: [
      "Maximum stage time per team: 10 minutes (including setup and clearance).",
      "Audio tracks must be submitted in MP3/WAV format to the sound desk at least 2 hours before the event.",
      "Obscenity, offensive language, or hazardous props (fire, water, glass) are strictly prohibited.",
      "Judges' evaluation on musicality, choreography, synchronization, and crowd impact is final.",
    ],
    eligibility: "Open to all enrolled undergraduate and postgraduate students.",
    coordinators: [
      {
        name: "Prof. Cultural Secretary",
        role: "Faculty Coordinator",
        phone: "+91 98000 00013",
        email: "cosmicshowcase@technixfest.org",
      },
      {
        name: "Student Stage Manager",
        role: "Student Coordinator",
        phone: "+91 98000 00014",
        email: "starlord.stage@technixfest.org",
      },
    ],
    image: "/images/technix/events/cosmic-showcase.webp",
    avatarIcon: "Music",
  },

  // 8. STARK LABS: INTERFACE INFINITY — Web Designing
  {
    id: "interface-infinity",
    title: "STARK LABS: INTERFACE INFINITY — Web Designing",
    marvelCharacter: "STARK & ALLIES — Interface Protocol",
    characterTitle: "Architects of the Next-Gen Digital Experience",
    category: "Technical",
    shortDescription: "Engineer responsive, aesthetically stunning, and highly interactive web interfaces and UI designs under timed sprints.",
    fullDescription: "When Stark Labs pioneers new consumer tech, every pixel, transition, and micro-interaction matters. Interface Infinity challenges frontend developers and UI/UX designers to build high-performance, responsive, accessible web interfaces that push modern browser capabilities to the limit.",
    visualDirection: "Modern browser frames, responsive UI grids, glassmorphism, glowing micro-interactions, cyan and indigo.",
    heroTheme: {
      accentColor: "#06B6D4", // Cyber Cyan
      glowColor: "rgba(6, 182, 212, 0.45)",
      badgeBg: "rgba(6, 182, 212, 0.15)",
      heroGradient: "linear-gradient(135deg, rgba(6,182,212,0.3) 0%, rgba(99,102,241,0.2) 100%)",
    },
    teamSize: {
      min: 1,
      max: 2,
      label: "Individual or Team of 2",
    },
    registrationFee: "Placeholder (To be finalized by fest committee)",
    venue: "Design Lab 204 - Computing Wing",
    scheduleTime: "Day 1 - 01:30 PM to 04:30 PM",
    rounds: [
      {
        roundNumber: 1,
        title: "Sprint 1: The Design Dossier & Wireframe",
        duration: "45 Mins",
        description: "Deconstruct the creative prompt and design high-fidelity components and typography hierarchy.",
      },
      {
        roundNumber: 2,
        title: "Sprint 2: Code Construction & Interaction Sprint",
        duration: "105 Mins",
        description: "Implement the responsive interface using HTML/CSS/JS or modern web frameworks with custom micro-animations.",
      },
      {
        roundNumber: 3,
        title: "Sprint 3: Jury Live Walkthrough",
        duration: "30 Mins",
        description: "Present accessibility, responsive fluidity, performance score, and design rationale to the jury.",
      },
    ],
    rules: [
      "Permitted frameworks: Vanilla HTML/CSS/JS, React/Next.js, Vue, or Tailwind CSS.",
      "Pre-built full-page commercial templates are strictly prohibited; boilerplates must be blank.",
      "Submissions are evaluated on visual aesthetic, responsiveness, micro-animations, code cleanliness, and accessibility.",
      "Decisions made by the creative jury are final.",
    ],
    eligibility: "Open to all enrolled college students with a passion for web engineering and design.",
    coordinators: [
      {
        name: "Prof. Web Architect",
        role: "Faculty Coordinator",
        phone: "+91 98000 00015",
        email: "interfaceinfinity@technixfest.org",
      },
      {
        name: "Student Design Lead",
        role: "Student Coordinator",
        phone: "+91 98000 00016",
        email: "starklabs.ui@technixfest.org",
      },
    ],
    image: "/images/technix/events/interface-infinity.webp",
    avatarIcon: "Layout",
  },

  // 9. PROJECT: WHAT IF...? — Surprise Event
  {
    id: "project-what-if",
    title: "PROJECT: WHAT IF...? — Surprise Event",
    marvelCharacter: "THE WATCHER & MULTIVERSE — Classified Protocol",
    characterTitle: "Observer of Infinite Possibilities",
    category: "Non-Technical",
    shortDescription: "A classified surprise showdown where rules, realities, and challenges warp. Expect the unexpected.",
    fullDescription: "Time. Space. Reality. It's more than a linear path. It's a prism of endless possibility. Project: What If...? is Technix 8.0's top-secret surprise event. The exact challenge is sealed in the Watcher's vault and will only be unveiled when participants step onto the arena floor.",
    visualDirection: "Multiverse timeline fractals, cosmic prism reflections, shifting reality warps, deep violet and cosmic gold.",
    heroTheme: {
      accentColor: "#8B5CF6", // Multiverse Violet
      glowColor: "rgba(139, 92, 246, 0.45)",
      badgeBg: "rgba(139, 92, 246, 0.15)",
      heroGradient: "linear-gradient(135deg, rgba(139,92,246,0.3) 0%, rgba(236,72,153,0.2) 100%)",
    },
    teamSize: {
      min: 1,
      max: 2,
      label: "Individual or Team of 2",
    },
    registrationFee: "Placeholder (To be finalized by fest committee)",
    venue: "Secret Dimensional Arena - Announced on Day 2",
    scheduleTime: "Day 2 - 02:00 PM to 04:00 PM",
    rounds: [
      {
        roundNumber: 1,
        title: "Reality Warp: Classified Challenge",
        duration: "120 Mins",
        description: "The operational briefing will be unsealed simultaneously to all teams at 02:00 PM.",
      },
    ],
    rules: [
      "Participants must be ready to adapt to impromptu cognitive, creative, or tactical tasks.",
      "Specific round instructions will be delivered live by the presiding Watchers.",
      "Teams must follow all on-the-spot safety and integrity guidelines.",
      "Highest overall performance score claims the Multiversal Trophy.",
    ],
    eligibility: "Open to all enrolled college students with clearance.",
    coordinators: [
      {
        name: "Prof. Classified Advisor",
        role: "Faculty Coordinator",
        phone: "+91 98000 00017",
        email: "whatif@technixfest.org",
      },
      {
        name: "Student Multiverse Lead",
        role: "Student Coordinator",
        phone: "+91 98000 00018",
        email: "watcher@technixfest.org",
      },
    ],
    isTBD: true,
    image: "/images/technix/events/project-what-if.webp",
    avatarIcon: "HelpCircle",
  },
];
