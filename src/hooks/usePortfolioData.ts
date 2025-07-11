import { useState, useEffect } from 'react';
import { PortfolioData } from '../types';
import { initialPortfolioData } from '../data/portfolioData';

export const usePortfolioData = () => {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('portfolioData');
    return saved ? JSON.parse(saved) : initialPortfolioData;
  });

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  const updateData = (newData: Partial<PortfolioData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  return { data, updateData };
};