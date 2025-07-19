import { useState, useEffect } from 'react';
import { PortfolioData } from '../types';
import { initialPortfolioData } from '../data/portfolioData';
import { db } from '../firebase'; // Import our new firebase config
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

export const usePortfolioData = () => {
  // Start with the initial data, so the site doesn't break while loading
  const [data, setData] = useState<PortfolioData>(initialPortfolioData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reference to our specific document in Firestore
    const docRef = doc(db, "portfolio", "mainData");

    // onSnapshot listens for real-time changes to the document
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        console.log("✅ Fetched data from Firebase!");
        setData(docSnap.data() as PortfolioData);
      } else {
        // This case should not happen if you've run the seed script
        console.log("No such document in Firebase! Showing default data.");
      }
      setLoading(false);
    }, (error) => {
      console.error("❌ Error fetching data from Firebase: ", error);
      setLoading(false);
    });

    // Cleanup function to stop listening when the component unmounts
    return () => unsubscribe();
  }, []); // The empty array ensures this effect runs only once on mount

  const updateData = async (newData: Partial<PortfolioData>) => {
    const docRef = doc(db, "portfolio", "mainData");
    try {
      // We use { merge: true } to only update the fields that have changed,
      // without overwriting the entire document.
      await setDoc(docRef, newData, { merge: true });
      console.log("✅ Data successfully updated in Firebase!");
    } catch (error) {
      console.error("❌ Error updating data in Firebase: ", error);
    }
  };

  return { data, loading, updateData };
};
