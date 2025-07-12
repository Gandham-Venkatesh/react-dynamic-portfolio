import { PortfolioData } from '../types';

export const initialPortfolioData: PortfolioData = {
  
  personalInfo: {
    name: "Gandham Venkatesh",
    title: "🚀 Passionate Developer | 🛠️ Tech Explorer | 🎓 B.Tech 4th Year Student",
    email: "sparkyvenkat999@gmail.com",
    linkedin: "https://linkedin.com/in/venkateshgandham",
    github: "https://github.com/Gandham-Venkatesh",
    college: "Nalla Narsimha Reddy Group of Institutions",
    cgpa: "8.85",
    about: "Hey there! I'm Gandham Venkatesh, a 4th-year B.Tech student specializing in Artificial Intelligence and Machine Learning at Nalla Narsimha Reddy Group of Institutions (CGPA: 8.85).\n\nI'm a passionate full-stack developer who loves building AI-powered, offline-first tools, web apps, and developer utilities. From integrating TinyLLaMA models in Android apps to creating full-stack projects using React, Flask, FastAPI, and Node.js, I thrive on learning and shipping useful tools.\n\nWhether it's writing clean APIs, building full dashboards, or creating LLM tools that run without internet, I'm always excited to build, break, and learn something new.",
    currentlyExploring: [
      "Agentic AI systems",
      "LangChain and LlamaIndex", 
      "n8n automation workflows",
      "React + Flask full-stack architecture",
      "Offline LLaMA tools"
    ],
    resumeLink: "https://drive.google.com/file/d/1vk_JOPiHLglAaOlKBd4cPD-ISHpTYhWc/view?usp=drive_link",
    professionalSummary: "A highly motivated and fast-learning Full Stack Developer & AI Enthusiast, currently pursuing B.Tech in Artificial Intelligence and Machine Learning with a CGPA of 8.85.\n\nSkilled in building production-ready web apps using React, Node.js, FastAPI, and Flask, and developing smart tools using Python, TinyLLaMA, and n8n. Completed an internship at TURTIL, where I developed an AI-based recommendation engine and rule-driven nudging system.\n\nStrong in REST API design, microservice integration, offline AI deployment (llama.cpp + Termux), and project architecture.",
    tagline: "I craft AI-powered, full-stack tools that blend intelligence with impact.",
    loopingTexts: [
      "Tech Enthusiast",
      "AI Explorer",
      "Full Stack Developer",
      "Automation Builder",
      "Offline GPT Creator",
      "Python & React Dev",
      "TinyLLaMA Integrator",
      "Agentic AI Engineer",
      "LLM Tinkerer",
      "n8n Workflow Architect",
      "FastAPI Lover",
      "Creative Debugger",
      "Visionary Coder",
      "Open Source Contributor"
    ],
    profileImage: "/profile.jpg"
  },
  skills: [
    {
      category: "Languages",
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "Python", level: 88 },
        { name: "Java", level: 82 },
        { name: "C", level: 75 }
      ]
    },
    {
      category: "Frontend",
      skills: [
        { name: "React", level: 92 },
        { name: "HTML/CSS", level: 95 },
        { name: "TailwindCSS", level: 88 },
        { name: "JavaScript", level: 80 }
      ]
    },
    {
      category: "Backend",
      skills: [
        { name: "Node.js", level: 87 },
        { name: "Express.js", level: 85 },
        { name: "Flask", level: 83 },
        { name: "FastAPI", level: 80 }
      ]
    },
    {
      category: "AI/ML Tools",
      skills: [
        { name: "TinyLLaMA", level: 85 },
        { name: "scikit-learn", level: 82 },
        { name: "LangChain", level: 78 },
        { name: "llama.cpp", level: 80 }
      ]
    },
    {
      category: "Databases",
      skills: [
        { name: "SQLite", level: 85 },
        { name: "PostgreSQL", level: 70 }
      ]
    },
    {
      category: "Dev Tools",
      skills: [
        { name: "Git/GitHub", level: 90 },
        { name: "Docker", level: 78 },
        { name: "VS Code", level: 95 },
        { name: "Postman", level: 85 }
      ]
    }
  ],
  projects: [
    {
      id: "1",
      name: "Offline GPT",
      description: "Fully offline AI chatbot built using Android + Termux + TinyLLaMA, using FastAPI and llama.cpp for local inference.",
      link: "https://github.com/Gandham-Venkatesh/OfflineGPT-Android",
      tags: ["AI", "Android", "Python", "FastAPI"],
      visible: true
    },
    {
      id: "2", 
      name: "CineRecommend",
      description: "Movie recommendation web app with React (TypeScript), Flask backend, JWT auth, and AI logic.",
      link: "https://github.com/Gandham-Venkatesh/CineRecommend-Full-Stack",
      tags: ["React", "Flask", "AI", "Full Stack"],
      visible: true
    },
    {
      id: "3",
      name: "Weather Forecast API",
      description: "Express.js REST API fetching live weather data using OpenWeatherMap.",
      link: "https://github.com/Gandham-Venkatesh/weather-api-node",
      tags: ["Node.js", "API", "Express"],
      visible: true
    },
    {
      id: "4",
      name: "Node CLI To-Do",
      description: "Command-line todo manager using Node.js, yargs, inquirer, and fs for persistent local storage.",
      link: "https://github.com/Gandham-Venkatesh/node-cli-todo",
      tags: ["Node.js", "CLI", "JavaScript"],
      visible: true
    },
    {
      id: "5",
      name: "Pokémon App", 
      description: "Responsive React app using PokéAPI to search and display Pokémon data.",
      link: "https://github.com/Gandham-Venkatesh/pokemon-react-app",
      tags: ["React", "API", "JavaScript"],
      visible: true
    },
    {
      id: "6",
      name: "HardType",
      description: "Typing speed game using JavaScript that tracks real-time WPM and gives instant feedback.",
      link: "https://github.com/Gandham-Venkatesh/typing-tutor",
      tags: ["JavaScript", "Game", "Web"],
      visible: true
    }
  ],
  internship: {
    company: "TURTIL",
    role: "Software Developer Intern", 
    duration: "May 2025 – June 2025",
    description: [
      "Built an AI-powered attention engine using Python, FastAPI, and scikit-learn.",
      "Created REST APIs and integrated ML models for nudge generation.",
      "Dockerized the app and delivered production-ready code with full documentation.",
      "Collaborated in a 2-member agile team and completed all tasks ahead of deadline."
    ]
  }
};