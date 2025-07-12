export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  category: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  link: string;
  tags: string[];
  visible: boolean;
}

export interface Internship {
  company: string;
  role: string;
  duration: string;
  description: string[];
}

// --- MAIN CHANGE IS HERE ---
// We are adding the new fields to the PersonalInfo interface
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  linkedin: string;
  github: string;
  college: string;
  cgpa: string;
  about: string;
  currentlyExploring: string[];
  resumeLink: string;
  professionalSummary: string;
  tagline?: string;
  loopingTexts?: string[];
  profileImage?: string;
}

export interface PortfolioData {
  personalInfo: PersonalInfo;
  skills: SkillCategory[];
  projects: Project[];
  internship: Internship;
}
