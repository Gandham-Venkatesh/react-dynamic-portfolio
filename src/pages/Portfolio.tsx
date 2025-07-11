import React, { useState, useEffect } from 'react';
import ParticleBackground from '../components/ParticleBackground';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import About from '../components/About';
import Resume from '../components/Resume';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Skills from '../components/Skills';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import { usePortfolioData } from '../hooks/usePortfolioData';

const Portfolio: React.FC = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  const { data } = usePortfolioData();

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'dark bg-gray-900' : 'bg-white'} transition-colors duration-300`}>
      <ParticleBackground />
      <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero darkMode={darkMode} personalInfo={data.personalInfo} />
      <About darkMode={darkMode} personalInfo={data.personalInfo} />
      <Resume darkMode={darkMode} personalInfo={data.personalInfo} />
      <Projects darkMode={darkMode} projects={data.projects} />
      <Experience darkMode={darkMode} internship={data.internship} />
      <Skills darkMode={darkMode} skills={data.skills} />
      <Contact darkMode={darkMode} personalInfo={data.personalInfo} />
      <Footer darkMode={darkMode} />
    </div>
  );
};

export default Portfolio;