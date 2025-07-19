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

// --- NEW TYPES FOR EXPERIENCE AND EDUCATION ---

// This new type allows for multiple experience entries
export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
}

// This new type is for the education timeline
export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  duration: string; // Or you can use a 'cgpa' field if you prefer
}


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
  // We are replacing 'internship' with an array 'experiences'
  experiences: ExperienceItem[]; 
  education: EducationItem[]; // Adding education array
}
