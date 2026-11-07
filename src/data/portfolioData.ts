export interface Project {
  id: string;
  title: string;
  tagline: string;
  tags: string[];
  description: string;
  bullets: string[];
  impact: string;
  architecture: string[];
  githubUrl: string;
  liveDemoUrl?: string;
}

export interface Achievement {
  id: string;
  title: string;
  year?: string;
  category: 'Gold Championship' | 'Representative' | 'Tournament';
  organizerOrRegion: string;
  description: string;
  highlight: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  score: string;
  details: string;
}

export interface SkillCategory {
  category: string;
  iconName: string;
  skills: string[];
}

export interface CertificationItem {
  name: string;
  issuer: string;
  description: string;
}

export const PERSONAL_INFO = {
  name: "SHARIQUE SAYEED RAHMAN",
  shortName: "SHARIQUE",
  roles: ["AI & Technology Consultant", "Solutions Architect", "AI & Data Science Specialist"],
  tagline: "Bridging technical AI capabilities with tangible business value.",
  bio: "Strategic AI Consultant with a B.Tech in Artificial Intelligence & Data Science (2026), bridging technical AI capabilities with tangible enterprise value. Experienced in evaluating AI feasibility, designing GenAI automated workflows, and translating complex machine learning models into actionable enterprise solutions. Proven leader with strong stakeholder communication, athletic discipline, and cross-functional team execution.",
  email: "ssrahman2002@gmail.com",
  phone: "+91 7991190790",
  location: "Jamshedpur, Jharkhand, India",
  linkedin: "https://linkedin.com/in/sharique-sayeed-rahman",
  github: "https://github.com/Shariquee14", // standard profile link
  resumePdf: "./assets/sharique_sayeed_rahman_resume.pdf",
  portraitImg: "./assets/portrait.jpg",
};

export const PROJECTS: Project[] = [
  {
    id: "portfolio-website",
    title: "Personal Portfolio Website",
    tagline: "Responsive Web Design // Interactive AI-Assisted Development",
    tags: ["HTML5", "CSS3", "JavaScript", "Responsive Web Design", "AI-Assisted Development"],
    description: "Designed and developed a responsive personal portfolio website featuring professional experience, skills, projects, certifications, and interactive sections.",
    bullets: [
      "Designed and developed a responsive personal portfolio website featuring professional experience, skills, projects, certifications, and interactive sections.",
      "Created the website using AI-assisted development based on my own ideas and design planning, while personally reviewing, testing, and refining its content and functionality."
    ],
    impact: "Delivers a responsive, multi-view digital portfolio with smooth transitions and zero layout shifts across desktop and mobile devices.",
    architecture: ["React & TypeScript Core", "Tailwind CSS & Framer Motion", "Vite Production Pipeline"],
    githubUrl: "https://github.com/Shariquee14/Sharique-Sayeed-Rahman-Portfolio",
    liveDemoUrl: "https://shariquee14.github.io/Sharique-Sayeed-Rahman-Portfolio/",
  },
  {
    id: "smart-resume-builder",
    title: "Smart Resume Builder",
    tagline: "Python & Flask // ATS Skill Evaluation & AI-Based Summary Enhancement",
    tags: ["Python", "Flask", "NLP", "AI Integration", "HTML/CSS/JavaScript"],
    description: "Developed an AI-powered resume builder that analyzes job descriptions, identifies required skills, and evaluates resume compatibility using ATS scoring.",
    bullets: [
      "Developed an AI-powered resume builder that analyzes job descriptions, identifies required skills, and evaluates resume compatibility using ATS scoring.",
      "Implemented resume customization, AI-based summary enhancement, and PDF generation to help users create job-specific resumes."
    ],
    impact: "Automates ATS scoring diagnostics and targeted skill alignment to optimize job application qualification rates.",
    architecture: ["Flask Backend Engine", "NLP ATS Competency Parser", "Dynamic PDF Generation Pipeline"],
    githubUrl: "https://github.com/Shariquee14/smart-resume-builder",
  },
  {
    id: "genai-analytics",
    title: "GenAI Business Analytics & Strategy Simulation",
    tagline: "Forage // Enterprise GenAI Workflows & Strategic Decision Pipelines",
    tags: ["Forage", "Generative AI", "Strategic Analysis", "Enterprise Workflows"],
    description: "Designed AI-driven solution frameworks during the Forage GenAI Data Analytics simulation to streamline complex business reporting pipelines and provide data-backed executive decision models.",
    bullets: [
      "Designed AI-driven solution frameworks during the Forage GenAI Data Analytics simulation to streamline complex business reporting pipelines.",
      "Translated technical analytical findings into executive-level summary presentations, defining strategic implementation roadmaps and ROI impacts."
    ],
    impact: "Reduced reporting turnaround latency while aligning AI adoption directly with strategic business objectives.",
    architecture: ["GenAI Prompt Architecture", "Automated Data Ingestion", "Executive ROI Synthesizer"],
    githubUrl: "https://github.com/Shariquee14/genai-business-analytics",
  },
  {
    id: "climate-risk-analytics",
    title: "Decision-Support Climate Risk Analytics Model",
    tagline: "Python & ML // Weather Risk Forecasting & Resource Allocation",
    tags: ["Python", "Predictive Modeling", "Decision Trees", "Risk Analytics"],
    description: "Developed a predictive weather forecasting model as a decision-support prototype for climate risk evaluation and agricultural/municipal resource allocation.",
    bullets: [
      "Developed a predictive weather forecasting model as a decision-support prototype for climate risk evaluation and resource allocation."
    ],
    impact: "Provided actionable early-warning alerts and predictive meteorological risk projections for proactive resource allocation.",
    architecture: ["Pandas Data Pipeline", "Decision Trees & Ensemble Models", "Risk Threshold Evaluation Engine"],
    githubUrl: "https://github.com/Shariquee14/climate-risk-analytics",
  }
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "asisc-2017",
    title: "21st ASISC Regional Basketball Tournament",
    year: "2017",
    category: "Gold Championship",
    organizerOrRegion: "Bihar & Jharkhand Region",
    description: "Winner / Gold Champion in the prestigious Association of Schools for the Indian School Certificate (ASISC) regional tournament.",
    highlight: "Regional Gold Champion"
  },
  {
    id: "asisc-2018",
    title: "22nd ASISC Regional Basketball Tournament",
    year: "2018",
    category: "Gold Championship",
    organizerOrRegion: "Bihar & Jharkhand Region",
    description: "Defended and retained title as Winner / Gold Champion back-to-back across the Bihar & Jharkhand interstate region.",
    highlight: "Back-to-Back Gold Champion"
  },
  {
    id: "tata-motors",
    title: "Tata Motors Inter School Basketball Tournament",
    year: "Gold Champion",
    category: "Tournament",
    organizerOrRegion: "Tata Motors Sports Department, Jamshedpur",
    description: "Secured 1st Place / Gold Champion in the highly competitive tournament organized by Tata Motors Sports Department.",
    highlight: "Tata Motors Gold Champion"
  },
  {
    id: "josh-fest",
    title: "JOSH Basketball Tournament",
    year: "Gold Champion",
    category: "Tournament",
    organizerOrRegion: "Jamshedpur Open School Hoop Fest",
    description: "Champion at the city-wide open hoop fest tournament demonstrating exceptional court vision and clutch shooting.",
    highlight: "Hoop Fest Champion"
  },
  {
    id: "school-champ",
    title: "School Level Basketball Championship",
    year: "Gold Champion",
    category: "Tournament",
    organizerOrRegion: "Inter-House",
    description: "Led team as prime offensive playmaker and captain to the Winner / Gold Champion title.",
    highlight: "School Gold Champion"
  },
  {
    id: "district-rep",
    title: "District Level Sports Representative",
    year: "Multi-Sport",
    category: "Representative",
    organizerOrRegion: "District Sports Association",
    description: "Active multi-sport player in Basketball (District Level), Volleyball, and Badminton; demonstrated athletic discipline, team leadership, and tactical execution under high pressure.",
    highlight: "Triple-Sport Athlete"
  }
];

export const EDUCATION: EducationItem[] = [
  {
    id: "btech",
    degree: "Bachelor of Technology (B.Tech) — Artificial Intelligence & Data Science",
    institution: "Technocrats Institute of Technology, Bhopal",
    period: "2022 – 2026",
    score: "CGPA: 6.53",
    details: "Specialized coursework in AI Feasibility, Machine Learning, Deep Neural Architectures, Big Data Analytics, SQL Database Design, and Software Engineering Systems."
  },
  {
    id: "intermediate",
    degree: "Intermediate (Class XII) — Science",
    institution: "Karim City College, Jamshedpur",
    period: "2020 – 2022",
    score: "Percentage: 74.80%",
    details: "Mathematics, Physics, Chemistry, and Computer Applications with high academic discipline."
  },
  {
    id: "matriculation",
    degree: "Secondary School Examination (Class X)",
    institution: "Esteem High School",
    period: "2019 – 2020",
    score: "Percentage: 66.20%",
    details: "Foundational academic training with active leadership in state & regional athletic championships."
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "AI Consulting & Strategy",
    iconName: "Cpu",
    skills: [
      "Generative AI Integration",
      "Enterprise Solution Architecture",
      "AI Feasibility Analysis",
      "Business Process Automation",
      "Technology ROI Evaluation",
      "AI Adoption Roadmaps"
    ]
  },
  {
    category: "Technical Core",
    iconName: "Code2",
    skills: [
      "Python",
      "GenAI & Prompt Engineering",
      "Scikit-learn",
      "Pandas & NumPy",
      "NLP Fundamentals",
      "SQL & Relational Databases",
      "System Design Basics",
      "RESTful API Development"
    ]
  },
  {
    category: "Strategic & Analytical",
    iconName: "BarChart3",
    skills: [
      "Data Storytelling",
      "Stakeholder Communication",
      "Requirement Gathering",
      "Tech ROI Analysis",
      "Strategic Problem Solving",
      "Executive Presentations"
    ]
  },
  {
    category: "Methodologies & Team",
    iconName: "Users",
    skills: [
      "Agile / Scrum Principles",
      "Cross-functional Leadership",
      "Team Collaboration",
      "Time Management",
      "Sprint Coordination",
      "Athletic Team Execution"
    ]
  },
  {
    category: "Tools & Productivity",
    iconName: "Wrench",
    skills: [
      "GitHub & Version Control",
      "VS Code",
      "MS PowerPoint",
      "MS Excel",
      "MS Word",
      "Interactive Presentation Tools"
    ]
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    name: "GenAI Powered Data Analytics Job Simulation",
    issuer: "Forage",
    description: "Gained practical enterprise exposure to Generative AI workflows, advanced prompt engineering, and business data analytics."
  },
  {
    name: "RamrajTech Technical Certification",
    issuer: "RamrajTech",
    description: "Completed structured practical training in programming, software engineering principles, and core computer science concepts."
  }
];

export interface CardConfig {
  id: 'edits' | 'projects' | 'contact' | 'me' | 'sports' | 'skills' | 'youtube';
  route: string;
  title: string;
  badge: string;
  categoryLabel: string;
  rotationDeg: number;
  offsetX: number;
  offsetY: number;
  zIndex: number;
  cardTheme: 'edits-violet' | 'dark-cosmic' | 'red-accent' | 'portrait-center' | 'white-athletic' | 'dark-ornate' | 'youtube-crimson';
}

export const HERO_CARDS: CardConfig[] = [
  {
    id: 'edits',
    route: '/edits',
    title: 'EDITS & REELS',
    badge: '4K // REELS',
    categoryLabel: 'POST-PRODUCTION',
    rotationDeg: -30,
    offsetX: -380,
    offsetY: 48,
    zIndex: 8,
    cardTheme: 'edits-violet',
  },
  {
    id: 'projects',
    route: '/projects',
    title: 'PROJECTS & GITHUB',
    badge: 'AI & REPOS',
    categoryLabel: 'CODE // SYSTEMS',
    rotationDeg: -20,
    offsetX: -250,
    offsetY: 26,
    zIndex: 12,
    cardTheme: 'dark-cosmic',
  },
  {
    id: 'contact',
    route: '/contact',
    title: 'CONTACT US',
    badge: 'CONNECT',
    categoryLabel: 'TRANSMISSION',
    rotationDeg: -10,
    offsetX: -125,
    offsetY: 8,
    zIndex: 22,
    cardTheme: 'red-accent',
  },
  {
    id: 'me',
    route: '/about',
    title: 'ME',
    badge: 'SHARIQUE S. RAHMAN',
    categoryLabel: 'IDENTITY',
    rotationDeg: 0,
    offsetX: 0,
    offsetY: -10,
    zIndex: 40,
    cardTheme: 'portrait-center',
  },
  {
    id: 'sports',
    route: '/achievements',
    title: 'SPORTS & ACHIEVEMENTS',
    badge: '1:1 // GOLD',
    categoryLabel: 'ATHLETICS',
    rotationDeg: 10,
    offsetX: 125,
    offsetY: 8,
    zIndex: 22,
    cardTheme: 'white-athletic',
  },
  {
    id: 'skills',
    route: '/skills-education',
    title: 'SKILLS & EDUCATION',
    badge: 'B.TECH // 2026',
    categoryLabel: 'EXPERTISE',
    rotationDeg: 20,
    offsetX: 250,
    offsetY: 26,
    zIndex: 12,
    cardTheme: 'dark-ornate',
  },
  {
    id: 'youtube',
    route: '/youtube',
    title: 'YOUTUBE',
    badge: 'SHARIQLOGZ',
    categoryLabel: 'PLAYLISTS // AI',
    rotationDeg: 30,
    offsetX: 380,
    offsetY: 48,
    zIndex: 8,
    cardTheme: 'youtube-crimson',
  },
];
