'use client';

import { useState, useEffect, useCallback } from 'react';

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('https://dummyjson.com/quotes/random');

      if (!response.ok) {
        throw new Error(`Quotes API error: ${response.status}`);
      }

      const data = await response.json();
      setQuote(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchQuote();
  }, [fetchQuote]);

  return (
    <section className="section" id="quote">
      <h2>Motivational Quote</h2>
      <div className="quote-box">
        {loading && <p className="loading-text">Loading quote...</p>}

        {error && (
          <p className="error-message">Failed to load quote: {error}</p>
        )}

        {!loading && !error && quote && (
          <>
            <p className="quote-text">&ldquo;{quote.quote}&rdquo;</p>
            <p className="quote-author">&mdash; {quote.author}</p>
          </>
        )}

        <button className="btn-quote" onClick={fetchQuote} disabled={loading}>
          {loading ? 'Loading...' : 'New Quote'}
        </button>
      </div>
    </section>
  );
}
