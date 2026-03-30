'use client';

import { useState, useEffect } from 'react';

export default function GitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.github.com/users/momenramadan20/repos?sort=updated&per_page=6'
        );

        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data = await response.json();
        setRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  return (
    <section className="section" id="github-repos">
      <h2>GitHub Repositories</h2>

      {loading && <p className="loading-text">Loading repositories...</p>}

      {error && (
        <p className="error-message">
          Failed to load repositories: {error}
        </p>
      )}

      {!loading && !error && repos.length === 0 && (
        <p className="loading-text">No public repositories found.</p>
      )}

      {!loading && !error && repos.length > 0 && (
        <div className="repos-grid">
          {repos.map((repo) => (
            <div className="repo-card" key={repo.id}>
              <h4>
                <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description || 'No description provided.'}</p>
              <div className="repo-meta">
                {repo.language && <span>{repo.language}</span>}
                <span>&#9733; {repo.stargazers_count}</span>
                <span>Forks: {repo.forks_count}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
