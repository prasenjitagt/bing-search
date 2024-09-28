'use client'
import { useState, useEffect } from 'react';

// Array of random search terms
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
  // Type annotations for state variables
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [currentSearch, setCurrentSearch] = useState<number>(0);

  // Effect hook for updating countdown timer
  useEffect(() => {
    if (countdown !== null && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer); // Clear timer when the component unmounts
    }
  }, [countdown]);

  // Function to open random Bing searches every 10 seconds
  const performRandomSearches = (): void => {
    setIsLoading(true);
    setCountdown(10); // Set initial countdown for the first search

    randomSearchTerms.forEach((term: string, index: number) => {
      setTimeout(() => {
        const url = `https://www.bing.com/search?q=${encodeURIComponent(term)}`;
        window.open(url, '_blank');
        setCurrentSearch(index + 1); // Update the current search count
        setCountdown(10); // Reset the countdown timer for each search
      }, index * 10000); // 10 seconds delay per URL
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

// Styles object for inline styling
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '20px',
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
  },
  timer: {
    marginTop: '20px',
    fontSize: '1.5rem',
    color: '#555',
  }
};
