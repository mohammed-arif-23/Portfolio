export type VisualStatus = 'available' | 'missing';

export interface PortfolioVisual {
  status: VisualStatus;
  src: string | null;
  alt: string;
  note: string;
}

export interface PortfolioContact {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  portfolioUrl: string;
  linkedinUrl: string;
  githubUrl: string;
}

export interface InstitutionalScreen {
  institution: string;
  href: string;
  src: string;
  alt: string;
  status: 'available';
  captureType: 'real-site-capture';
}

export interface ProofMetric {
  id: string;
  value: string;
  label: string;
  context: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  role: string;
  period: string | null;
  technologies: readonly string[];
  highlights: readonly string[];
  visual: PortfolioVisual;
}

export interface ProfessionalExperience {
  employer: string;
  location: string;
  role: string;
  period: string;
  highlights: readonly string[];
  visual: PortfolioVisual;
}

export interface SkillGroup {
  category: string;
  items: readonly string[];
}

export interface EducationEntry {
  institution: string;
  qualification: string;
  result: string;
  period: string;
}

export interface Credential {
  type: 'course' | 'award' | 'internship';
  title: string;
  issuer: string;
  year: string;
  detail: string | null;
}

export const contact = {
  name: 'T Mohammed Arif',
  title: 'Full Stack Developer & Technical Product Builder',
  location: 'Salem, Tamil Nadu, India',
  email: 'mohammedarif2303@gmail.com',
  phone: '+917904645033',
  portfolioUrl: 'https://arif.zone.id',
  linkedinUrl: 'https://linkedin.com/in/mohammedarif2303',
  githubUrl: 'https://github.com/mohammed-arif-23',
} as const satisfies PortfolioContact;

export const institutionalScreens = [
  {
    institution: 'AVS Engineering College',
    href: 'https://www.avsenggcollege.ac.in/',
    src: '/images/project-thumb-avsengg.png',
    alt: 'AVS Engineering College website interface',
    status: 'available',
    captureType: 'real-site-capture',
  },
  {
    institution: "Sakthi Kailash Women's College",
    href: 'https://www.sakthikailashcollege.org/',
    src: '/images/project-thumb-sswc.png',
    alt: "Sakthi Kailash Women's College website interface",
    status: 'available',
    captureType: 'real-site-capture',
  },
  {
    institution: 'AVS College of Arts & Science',
    href: 'https://www.avscollegeomalur.edu.in/',
    src: '/images/project-thumb-avsomalur.png',
    alt: 'AVS College of Arts and Science website interface',
    status: 'available',
    captureType: 'real-site-capture',
  },
] as const satisfies readonly InstitutionalScreen[];

export const proofMetrics = [
  {
    id: 'concurrent-users',
    value: '3K',
    label: 'Concurrent users',
    context: 'Peak semester-result traffic',
  },
  {
    id: 'hits',
    value: '142K',
    label: 'Hits',
    context: 'Within approximately 30 minutes',
  },
  {
    id: 'page-views',
    value: '39K',
    label: 'Page views',
    context: 'Within approximately 30 minutes',
  },
  {
    id: 'bandwidth',
    value: '43 GB',
    label: 'Bandwidth',
    context: 'Within approximately 30 minutes',
  },
  {
    id: 'peak-recovery',
    value: '<15 min',
    label: 'Peak-load recovery',
    context: 'Production semester-result event',
  },
  {
    id: 'load-time',
    value: '40%',
    label: 'Faster load times',
    context: 'Institutional website optimization',
  },
  {
    id: 'mobile-engagement',
    value: '60%',
    label: 'Higher mobile engagement',
    context: 'Institutional website optimization',
  },
  {
    id: 'user-experience',
    value: '30%',
    label: 'Improved user experience',
    context: 'Institutional website optimization',
  },
] as const satisfies readonly ProofMetric[];

export const institutionalProject = {
  id: 'institutional-platforms',
  title: 'Institutional Web Platforms & High-Traffic Result Portal',
  role: 'Full Stack Developer',
  period: null,
  technologies: ['PHP', 'MySQL', 'AJAX', 'Responsive frontend logic'],
  highlights: [
    'Architected and maintained scalable websites for AVS Engineering College, Sakthi Kailash Women\'s College, and AVS College of Arts & Science.',
    'Built and deployed a production-grade semester result portal with student verification through register number and date of birth.',
    'Optimized peak result lookup to reduce lookup overhead and improve scalability compared with a single-index approach.',
    'Used AI-assisted workflows for content structure, interface refinement, debugging, and rapid iteration, with manual production review.',
  ],
  visual: {
    status: 'available',
    src: '/images/project-thumb-avsengg.png',
    alt: 'AVS Engineering College website interface',
    note: 'Three real institutional homepage captures are available in institutionalScreens; result-portal and traffic-evidence captures are still missing.',
  },
} as const satisfies PortfolioProject;

export const valliExperience = {
  employer: 'Valli Super Specialty Hospital',
  location: 'Salem',
  role: 'Software Technician - Healthcare IT & Digital Systems',
  period: 'Nov 2025 - Present',
  highlights: [
    'Managed and optimized hospital software, hardware, and internal data workflows while supporting medical and administrative teams.',
    'Streamlined secure data handling and administrative workflows using SQL, MongoDB, and minimal internal interfaces.',
    'Contributed to the hospital website, healthcare communication assets, event information flows, and patient-facing digital content.',
    'Worked on SEO, GEO / AI-search visibility, and Google Business Profile readiness across search, maps, and AI-assisted discovery surfaces.',
    'Used AI-assisted workflows for page hierarchy, healthcare communication copy, campaign iteration, and consistent digital standards.',
  ],
  visual: {
    status: 'available',
    src: '/images/case-valli-home.jpg',
    alt: 'Valli Super Specialty Hospital public website',
    note: 'Verified live public website capture',
  },
} as const satisfies ProfessionalExperience;

export const hashPrimeProject = {
  id: 'hash-prime',
  title: 'Hash Prime Crypto Investment Platform',
  role: 'Lead Developer & Designer',
  period: 'Early 2026',
  technologies: [],
  highlights: [
    'Designed and developed a responsive landing page and digital brand system focused on feature clarity, credibility signals, and onboarding.',
    'Engineered a secure custom CMS with dedicated admin workflows for content management, updates, and operational control.',
    'Used AI-assisted development workflows with manual review for reliability and security.',
    'Handled domain configuration, SSL setup, encrypted hosting, deployment, and custom branding implementation.',
  ],
  visual: {
    status: 'available',
    src: '/images/case-hashprime-business.jpg',
    alt: 'Hash Prime business website',
    note: 'Verified live public business capture; a second features capture is available at /images/case-hashprime-features.jpg.',
  },
} as const satisfies PortfolioProject;

export const healthcareConferenceProject = {
  id: 'healthcare-conference-systems',
  title: 'Healthcare Conference Digital Systems',
  role: 'Digital Systems & Campaign Workflow',
  period: null,
  technologies: [],
  highlights: [
    'Planned and designed event branding, registration creatives, session overview layouts, pamphlets, and Meta ad campaign assets.',
    'Created reusable visual systems for medical event promotion with clear hierarchy for healthcare stakeholders.',
    'Translated clinical and event requirements into high-trust assets across print, social, and digital channels.',
  ],
  visual: {
    status: 'missing',
    src: null,
    alt: 'Healthcare conference digital campaign system',
    note: 'No named conference visual or verified campaign capture is available in the portfolio assets.',
  },
} as const satisfies PortfolioProject;

export const automationProject = {
  id: 'automation-internal-tools',
  title: 'Automation & Internal Tools',
  role: 'Python / Workflow Automation',
  period: null,
  technologies: ['Python', 'CSV workflows', 'AI-assisted planning', 'Prompt-driven workflow design'],
  highlights: [
    'Built local tools for CSV-driven bulk email workflows, image text extraction, and print-focused image enhancement.',
    'Created workflows to reduce repetitive event communication, campaign preparation, and administrative processing tasks.',
    'Used AI-assisted planning and prompt-driven workflow design to prototype utilities, structure scripts, and improve debugging speed.',
  ],
  visual: {
    status: 'missing',
    src: null,
    alt: 'Automation and internal tools workflow',
    note: 'No verified interface or input-to-output capture is available in the portfolio assets.',
  },
} as const satisfies PortfolioProject;

export const skills = [
  {
    category: 'Frontend',
    items: ['Next.js', 'React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive UI'],
  },
  {
    category: 'Backend & APIs',
    items: ['Node.js', 'REST APIs', 'Authentication', 'API Integration', 'Validation', 'Error Handling', 'Frontend-Backend Integration'],
  },
  {
    category: 'Databases',
    items: ['MongoDB', 'MySQL', 'Supabase', 'Firebase'],
  },
  {
    category: 'Production, SEO & Growth',
    items: ['Git', 'cPanel Hosting', 'Domain Configuration', 'Traffic Monitoring', 'SEO', 'GEO / AI-Search Visibility', 'Google Business Profile (GMB)', 'Performance Optimization'],
  },
  {
    category: 'Automation & AI Workflows',
    items: ['Python Automation', 'CSV Workflows', 'AI-Assisted Development', 'Prompt Engineering', 'AI-Assisted Debugging', 'Content Structuring'],
  },
  {
    category: 'UI/UX & Visual Systems',
    items: ['Visual Hierarchy', 'Information Architecture', 'Design Systems', 'Digital Campaign Layouts', 'Print-ready Asset Preparation'],
  },
] as const satisfies readonly SkillGroup[];

export const education = [
  {
    institution: 'AVS Engineering College, Salem',
    qualification: 'B.Tech Information Technology',
    result: 'CGPA: 8.55',
    period: '2023 - 2027',
  },
  {
    institution: "St. Paul's HSS, Salem",
    qualification: '12th Standard',
    result: '86.4%',
    period: '2023',
  },
] as const satisfies readonly EducationEntry[];

export const awardsAndCredentials = [
  {
    type: 'course',
    title: 'Course Completion in React.js',
    issuer: 'Infosys Springboard',
    year: '2024',
    detail: null,
  },
  {
    type: 'award',
    title: '1st Place in Web Development - Spring Fest',
    issuer: 'KSR College of Technology',
    year: '2024',
    detail: null,
  },
  {
    type: 'award',
    title: '1st Place in Code Debugging',
    issuer: 'Mahendra Institutions of Technology',
    year: '2024',
    detail: null,
  },
  {
    type: 'internship',
    title: 'CUDA Python and NVIDIA Boards Internship',
    issuer: 'ADVI Group of Technologies',
    year: '2025',
    detail: '25 days',
  },
] as const satisfies readonly Credential[];

export const portfolioContent = {
  contact,
  institutionalProject,
  institutionalScreens,
  proofMetrics,
  valliExperience,
  hashPrimeProject,
  healthcareConferenceProject,
  automationProject,
  skills,
  education,
  awardsAndCredentials,
} as const;
