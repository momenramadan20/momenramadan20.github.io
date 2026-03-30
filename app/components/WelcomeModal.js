'use client';

import { useState, useEffect } from 'react';

export default function WelcomeModal() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  if (!visible) return null;

  return (
    <div className={`welcome-modal ${visible ? 'visible' : ''}`}>
      <div className="welcome-modal-content">
        <h2>Welcome to my portfolio page!</h2>
        <p>
          Hi there! I&apos;m Momen Ayman Ramadan. Feel free to explore my CV
          and get in touch.
        </p>
        <button className="btn btn-primary" onClick={() => setVisible(false)}>
          Let&apos;s Go!
        </button>
      </div>
    </div>
  );
}
