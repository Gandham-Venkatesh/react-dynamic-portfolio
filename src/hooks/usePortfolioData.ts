import { useState, useEffect } from 'react';
import { PortfolioData } from '../types';
import { initialPortfolioData } from '../data/portfolioData';
import _ from 'lodash'; // Make sure lodash is installed

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData>(() => {
    try {
      const saved = localStorage.getItem('portfolioData');
      if (saved) {
        const savedData = JSON.parse(saved);
        
        // --- SIMPLIFIED & CORRECTED LOGIC ---
        // We always merge the data from the code (initialPortfolioData)
        // on top of the saved data. This ensures any updates in the code
        // (like your tagline change) are always reflected, while preserving 
        // user edits from the admin dashboard on other fields.
        console.log("Merging saved data with initial data from code.");
        return _.merge({}, savedData, initialPortfolioData);
      }
    } catch (error) {
      console.error("Failed to process portfolio data from localStorage", error);
    }
    // No saved data or error, return fresh initial data
    return initialPortfolioData;
  });

  useEffect(() => {
    // This effect saves data back to localStorage whenever it changes.
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  const updateData = (newData: Partial<PortfolioData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  return { data, updateData };
};
