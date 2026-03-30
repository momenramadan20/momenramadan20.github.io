'use client';

import { useState, useEffect } from 'react';
import WelcomeModal from './components/WelcomeModal';
import Navigation from './components/Navigation';
import GitHubRepos from './components/GitHubRepos';
import QuoteGenerator from './components/QuoteGenerator';

export default function Home() {
  // ===== Dark Mode =====
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('darkMode') === 'true') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
    }
  }, []);

  function toggleDarkMode() {
    const newVal = !darkMode;
    setDarkMode(newVal);
    document.body.classList.toggle('dark-mode', newVal);
    localStorage.setItem('darkMode', newVal);
  }

  // ===== Section Visibility =====
  const [showProjects, setShowProjects] = useState(true);
  const [showSkills, setShowSkills] = useState(true);
  const [showActivities, setShowActivities] = useState(true);

  // ===== Project Details =====
  const [projectOpen, setProjectOpen] = useState({});

  function toggleProject(key) {
    setProjectOpen((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  // ===== Dynamic Skills =====
  const [technicalSkills, setTechnicalSkills] = useState([
    'Windows OS – Excellent',
    'Linux – Beginner',
    'Microsoft Office – Proficient',
    'C++ – Intermediate',
  ]);
  const [newSkill, setNewSkill] = useState('');
  const [skillMessage, setSkillMessage] = useState({ text: '', type: '' });

  function addSkill() {
    setSkillMessage({ text: '', type: '' });
    const skill = newSkill.trim();

    if (!skill) {
      setSkillMessage({ text: 'Please enter a skill.', type: 'error' });
      return;
    }

    setTechnicalSkills((prev) => [...prev, skill]);
    setSkillMessage({ text: `"${skill}" has been added!`, type: 'success' });
    setNewSkill('');
  }

  // ===== Contact Form =====
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState({});
  const [formSuccess, setFormSuccess] = useState('');

  function handleContactSubmit(e) {
    e.preventDefault();
    const errors = {};
    setFormSuccess('');

    if (!formData.name.trim()) errors.name = 'Name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) errors.message = 'Message is required.';

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      setFormSuccess(`Thank you, ${formData.name.trim()}! Your message has been sent successfully.`);
      setFormData({ name: '', email: '', message: '' });
    }
  }

  // ===== Projects Data =====
  const projects = [
    {
      key: 'cpp',
      name: 'C++ Applications Suite',
      details:
        'Created multiple C++ applications including phone-call minute calculators, IELTS score calculators, letter-GPA converters, and a Zodiac sign calculator based on user birthdate.',
    },
    {
      key: 'temp',
      name: 'Temperature Conversion App',
      details:
        'Built a temperature conversion application supporting multiple measurement units including Celsius, Fahrenheit, and Kelvin.',
    },
    {
      key: 'games',
      name: 'Classic Games in C++',
      details:
        'Developed classic games in C++ such as Paper, Rock, Scissors with user input handling and game logic.',
    },
  ];

  return (
    <>
      <WelcomeModal />
      <Navigation />

      {/* Header */}
      <header className="header">
        <div className="header-content">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/profile.jpg"
            alt="Momen Ayman Ramadan"
            className="profile-img"
          />
          <div className="header-text">
            <h1>Momen Ayman Ramadan</h1>
            <p className="title">
              Management of Information &amp; Communication Technology Student
            </p>
            <p className="subtitle">The American University in Cairo</p>
          </div>
        </div>
        <button className="btn btn-toggle" onClick={toggleDarkMode}>
          {darkMode ? '\u2604 Light Mode' : '\uD83C\uDF19 Dark Mode'}
        </button>
      </header>

      {/* Main Content */}
      <main className="container">
        {/* Profile */}
        <section className="section" id="profile">
          <h2>Profile</h2>
          <p>
            Motivated MICT student at The American University in Cairo with a
            strong academic record (GPA 3.636) and hands-on experience in CRM,
            programming, and community service. Passionate about leveraging
            technology to solve real-world problems. USAID Scholars Activity
            Scholarship recipient.
          </p>
        </section>

        {/* Education */}
        <section className="section" id="education">
          <h2>Education</h2>
          <div className="card">
            <h3>
              Bachelor of Management of Information and Communication Technology
              (MICT)
            </h3>
            <p className="institution">The American University in Cairo (AUC)</p>
            <p className="date">Expected Graduation: Spring 2027</p>
            <p>
              <strong>GPA:</strong> 3.636
            </p>
            <p>
              <strong>Scholarship:</strong> USAID Scholars Activity Scholarship
            </p>
          </div>
          <div className="card">
            <h3>Thanawiya Amma – Arts</h3>
            <p className="institution">Al Noor School</p>
            <p className="date">2021</p>
            <p>
              <strong>Average:</strong> 94.27%
            </p>
          </div>
        </section>

        {/* Experience */}
        <section className="section" id="experience">
          <h2>Experience</h2>
          <div className="card">
            <h3>CRM Specialist Intern</h3>
            <p className="institution">E&amp;Egypt</p>
            <p className="date">August 2024</p>
          </div>
        </section>

        {/* Projects */}
        <section className="section" id="projects">
          <h2>Academic Projects</h2>
          <button
            className="btn btn-section-toggle"
            onClick={() => setShowProjects(!showProjects)}
          >
            {showProjects ? 'Hide' : 'Show'} Projects
          </button>
          {showProjects && (
            <div className="project-list">
              {projects.map((proj) => (
                <div className="project-item" key={proj.key}>
                  <div className="project-header">
                    <span>{proj.name}</span>
                    <button
                      className="btn btn-sm"
                      onClick={() => toggleProject(proj.key)}
                    >
                      {projectOpen[proj.key] ? 'Hide Details' : 'Show Details'}
                    </button>
                  </div>
                  {projectOpen[proj.key] && (
                    <div className="project-details">
                      <p>{proj.details}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Skills */}
        <section className="section" id="skills">
          <h2>Skills</h2>
          <button
            className="btn btn-section-toggle"
            onClick={() => setShowSkills(!showSkills)}
          >
            {showSkills ? 'Hide' : 'Show'} Skills
          </button>
          {showSkills && (
            <>
              <div className="skills-grid">
                <div className="skill-category">
                  <h3>Languages</h3>
                  <ul>
                    <li>Arabic – Fluent (spoken &amp; written)</li>
                    <li>English – Fluent (spoken &amp; written)</li>
                    <li>Spanish – Beginner</li>
                  </ul>
                </div>
                <div className="skill-category">
                  <h3>Technical</h3>
                  <ul>
                    {technicalSkills.map((skill, i) => (
                      <li key={i}>{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="add-skill-box">
                <h3>Add a New Skill</h3>
                <div className="add-skill-form">
                  <input
                    type="text"
                    placeholder="e.g. Python – Intermediate"
                    maxLength={100}
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                  />
                  <button className="btn btn-primary" onClick={addSkill}>
                    Add
                  </button>
                </div>
                {skillMessage.text && (
                  <p
                    className={`form-message ${
                      skillMessage.type === 'error'
                        ? 'error-text'
                        : 'success-text'
                    }`}
                  >
                    {skillMessage.text}
                  </p>
                )}
              </div>
            </>
          )}
        </section>

        {/* GitHub Repos – API Integration */}
        <GitHubRepos />

        {/* Quote Generator – API Integration */}
        <QuoteGenerator />

        {/* Activities */}
        <section className="section" id="activities">
          <h2>Extracurricular Activities</h2>
          <button
            className="btn btn-section-toggle"
            onClick={() => setShowActivities(!showActivities)}
          >
            {showActivities ? 'Hide' : 'Show'} Activities
          </button>
          {showActivities && (
            <ul className="activity-list">
              <li>
                <strong>Volunteering in Action (VIA) Club, AUC</strong> –
                Fundraising &amp; Children&apos;s Committees
                <span className="date-tag">Sep 2025 – Present</span>
              </li>
              <li>
                <strong>EDAFA Association</strong> – Volunteer
                <span className="date-tag">Jan 2024 – Jan 2025</span>
              </li>
              <li>
                <strong>Windows OS Instructor</strong> – Taught fundamentals of
                Windows operating system
                <span className="date-tag">Dec 2021 – Mar 2022</span>
              </li>
              <li>
                <strong>Ayadina Charity</strong> – Volunteer
                <span className="date-tag">Jan 2018 – Mar 2019</span>
              </li>
            </ul>
          )}
        </section>

        {/* Contact */}
        <section className="section" id="contact">
          <h2>Contact</h2>
          <div className="contact-grid">
            <div className="contact-item">
              <span className="contact-label">Email</span>
              <a href="mailto:momen.abdelsalam@aucegypt.edu">
                momen.abdelsalam@aucegypt.edu
              </a>
            </div>
            <div className="contact-item">
              <span className="contact-label">Phone</span>
              <span>01023701678</span>
            </div>
            <div className="contact-item">
              <span className="contact-label">Location</span>
              <span>Cairo, Egypt</span>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <h3>Send me a Message</h3>
            <form noValidate onSubmit={handleContactSubmit}>
              <div className="form-group">
                <label htmlFor="contact-name">
                  Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  placeholder="Your full name"
                  maxLength={100}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                {formErrors.name && (
                  <span className="error-text">{formErrors.name}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="contact-email">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  placeholder="your.email@example.com"
                  maxLength={100}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
                {formErrors.email && (
                  <span className="error-text">{formErrors.email}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="contact-message">
                  Message <span className="required">*</span>
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Write your message here..."
                  maxLength={1000}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                />
                {formErrors.message && (
                  <span className="error-text">{formErrors.message}</span>
                )}
              </div>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
              {formSuccess && (
                <p className="form-message success-text">{formSuccess}</p>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 Momen Ayman Ramadan. All rights reserved.</p>
      </footer>
    </>
  );
}
