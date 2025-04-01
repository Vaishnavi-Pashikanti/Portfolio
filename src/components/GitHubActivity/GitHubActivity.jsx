// GitHubActivity.js - Component to display GitHub contributions and repos
import React, { useState, useEffect } from 'react';
import './GitHubActivity.css';

const GitHubActivity = ({ username, darkMode }) => {
  const [repos, setRepos] = useState([]);
  const [contributionData, setContributionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch user's repositories
    const fetchRepos = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        
        // Get more details for each repo (languages used)
        const reposWithDetails = await Promise.all(
          data.map(async (repo) => {
            const languagesResponse = await fetch(repo.languages_url);
            const languagesData = await languagesResponse.json();
            
            return {
              ...repo,
              languages: languagesData
            };
          })
        );
        
        setRepos(reposWithDetails);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    // Simulate contribution data (in a real app, you'd fetch this via GitHub API or a backend)
    const generateMockContributionData = () => {
      const today = new Date();
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(today.getFullYear() - 1);
      
      const data = [];
      let currentDate = new Date(oneYearAgo);
      
      while (currentDate <= today) {
        const contributions = Math.floor(Math.random() * 10); // Random number 0-9
        data.push({
          date: new Date(currentDate),
          count: contributions
        });
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      return data;
    };

    setContributionData(generateMockContributionData());
    fetchRepos();
  }, [username]);

  if (loading) {
    return <div className="github-loading">Loading GitHub data...</div>;
  }

  if (error) {
    return <div className="github-error">Error: {error}</div>;
  }

  return (
    <div className={`github-activity ${darkMode ? 'dark' : 'light'}`}>
      <div className="github-header">
        {/* <h2>GitHub Activity</h2> */}
        <a 
          href={`https://github.com/${username}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="github-profile-link"
        >
        
          View Profile
        </a>
        <img 
          src="https://ghchart.rshah.org/Vaishnavi-Pashikanti"  
          alt="GitHub Contributions"
          style={{
            width: "100%", 
            maxWidth: "600px", 
            margin: "20px auto", 
            display: "block",
            borderRadius: "10px",
            backgroundColor: "#0D1117"
          }}
        />
      </div>
    </div>
  );
};

export default GitHubActivity;
