'use client'

import { useState, useEffect } from 'react';
import { styles } from '@/app/styles';

const randomSearchTerms: string[] = [
  "artificial intelligence", "machine learning", "web development",
  "space exploration", "quantum computing", "climate change",
  "sustainable energy", "cryptocurrency", "blockchain", "augmented reality",
  "virtual reality", "robotics", "electric cars", "self-driving cars",
  "big data", "5G technology", "nanotechnology", "biotechnology",
  "cloud computing", "cybersecurity", "IoT", "automation",
  "genetics", "health tech", "gaming industry", "digital marketing",
  "data science", "e-commerce", "fintech", "artificial organs"
];

export default function Home() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentSearch, setCurrentSearch] = useState<number>(0);

  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Function to open each URL in a new tab and close it after 10 seconds
  const performRandomSearches = (): void => {
    setIsLoading(true);
    setCountdown(10);

    randomSearchTerms.forEach((term: string, index: number) => {
      setTimeout(() => {
        const url = `https://www.bing.com/search?q=${encodeURIComponent(term)}`;
        const newTab = window.open(url, '_blank');

        setCurrentSearch(index + 1); // Update the current search count
        setCountdown(10); // Reset countdown timer for each search

        // Close the tab after 10 seconds
        setTimeout(() => {
          if (newTab) {
            newTab.close();
          }
        }, 13000); // Close the tab 13 seconds after opening
      }, index * 10000); // Open each tab with a 10-second delay
    });

    // Reset loading state after all searches are done
    setTimeout(() => setIsLoading(false), randomSearchTerms.length * 10000);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Random Bing Search</h1>
      <button onClick={performRandomSearches} style={styles.button} disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Perform 30 Random Searches'}
      </button>

      {isLoading && (
        <div style={styles.timer}>
          <p>Current search: {currentSearch} / {randomSearchTerms.length}</p>
          <p>Next search in: {countdown} seconds</p>
        </div>
      )}
    </div>
  );
}


