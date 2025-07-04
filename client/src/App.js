import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    degree: '',
    department: '',
    college: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Countdown Timer Logic
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [timerEnded, setTimerEnded] = useState(false);

  function calculateTimeLeft() {
    const targetDate = new Date('2025-07-07T12:00:00');
    const now = new Date();
    const difference = targetDate - now;

    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    } else {
      timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
      };
      setTimerEnded(true); // Mark as ended
    }

    return timeLeft;
  }

  useEffect(() => {
    if (timerEnded) return;

    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, timerEnded]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setSuccess(false);

    try {
      const response = await fetch('https://java-course.onrender.com/enroll ', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: '', email: '', phone: '', degree: '', department: '', college: '' });
        setMessage('Thank you! You are successfully enrolled.');
      } else {
        setMessage('Failed to submit. Please try again.');
      }
    } catch (err) {
      setMessage('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Destructure timeLeft values
  const { days, hours, minutes, seconds } = timeLeft;

  return (
    <div className="App">
      <header>
        <h1>Java Programming</h1>
        <p className="author">Code With Spidy 🕷️ By Ajay M</p>
      </header>

      {/* Why Java Section */}
      <section className="section why-java">
        <h2>Why Learn Java?</h2>
        <p>
          Java is one of the most popular programming languages used worldwide due to its robustness,
          platform independence, and strong community support. It powers Android apps, enterprise-level
          applications, and large-scale systems. Learning Java opens doors to countless opportunities in
          software development, making it a must-have skill for aspiring developers.
        </p>
      </section>

      {/* Course Overview */}
      <section className="section course-overview">
        <h2>Course Overview (July 7 to July 11, 2025)</h2>
        <div className="day-plan">
          <div className="day">
            <h3>Day 1</h3>
            <ul>
              <li>Java Overview</li>
              <li>JVM</li>
              <li>Variables / Identifiers</li>
              <li>Data Types / Type Casting</li>
              <li>Input / Output</li>
              <li>Practice Problems</li>
            </ul>
          </div>
          <div className="day">
            <h3>Day 2</h3>
            <ul>
              <li>Operators</li>
              <li>Conditional Statements</li>
              <li>Switch</li>
              <li>Java Math</li>
              <li>String / StringBuilder</li>
              <li>String Methods</li>
              <li>Practice Problems</li>
            </ul>
          </div>
          <div className="day">
            <h3>Day 3</h3>
            <ul>
              <li>Loops – For, While</li>
              <li>Constraints (Break / Continue)</li>
              <li>Nested Loops</li>
              <li>Pattern Problems (Easy to Medium)</li>
              <li>Practice Problems</li>
            </ul>
          </div>
          <div className="day">
            <h3>Day 4</h3>
            <ul>
              <li>Arrays</li>
              <li>2D Arrays</li>
              <li>Traversals</li>
              <li>Practice Problems</li>
            </ul>
          </div>
          <div className="day">
            <h3>Day 5</h3>
            <ul>
              <li>Collections (ArrayList, HashSet, HashMap)</li>
              <li>Static Functions</li>
              <li>Full Course Overview</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Course Fee Section */}
      <section className="section course-fee">
        <h2>Course Fee</h2>
        <div className="fee-card">
          <h3>Only ₹249 <span className="money-emoji">💰</span></h3>
          <p><strong>Super affordable for a life-changing skill!</strong></p>
          <ul className="fee-reasons">
            <li>✅ Industry-ready Java skills in just 5 days</li>
            <li>✅ Practical coding + Interview prep</li>
            <li>✅ Lifetime access to Materials and Notes</li>
            <li>✅ Placement guidance & support</li>
          </ul>
          <p className="emotional-note">
            <span className="sparkle">✨</span> We believe education should be accessible to everyone.
            That's why we keep it low-cost — so you can invest in your future without stress. Don't miss this chance!
            <span className="rocket">🚀</span>
          </p>
        </div>
      </section>

      {/* Countdown Timer Section */}
      <section className="section countdown-section">
        <h2>Registration Closes In</h2>
        {!timerEnded ? (
          <div className="timer">
            <div className="time-box">
              <span className="value">{days}</span>
              <span className="label">Days</span>
            </div>
            <div className="time-box">
              <span className="value">{hours}</span>
              <span className="label">Hours</span>
            </div>
            <div className="time-box">
              <span className="value">{minutes}</span>
              <span className="label">Minutes</span>
            </div>
            <div className="time-box">
              <span className="value">{seconds}</span>
              <span className="label">Seconds</span>
            </div>
          </div>
        ) : (
          <p className="closing-text"><strong>Registrations are closed. Stay tuned for next batch!</strong></p>
        )}
        {!timerEnded && <p className="closing-text">Don’t miss out! Seats are limited.</p>}
      </section>

      {/* Enroll Button */}
      <section className="enroll-section">
        <button onClick={() => setShowForm(true)}>Enroll Now</button>
      </section>

      {/* Modal Form */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="close-btn" onClick={() => setShowForm(false)}>✖</button>
            <h2>Enroll in Java Course</h2>
            <form onSubmit={handleSubmit}>
              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required />
              <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required />
              <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} required />
              <input type="text" name="degree" placeholder="Degree" value={formData.degree} onChange={handleChange} />
              <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleChange} />
              <input type="text" name="college" placeholder="College" value={formData.college} onChange={handleChange} />

              <button type="submit" disabled={loading}>
                {loading ? (
                  <span className="spinner"></span>
                ) : success ? (
                  "Submitted!"
                ) : (
                  "Submit"
                )}
              </button>
              {message && <p className={`form-message ${success ? 'success' : ''}`}>{message}</p>}
            </form>
          </div>
        </div>
      )}

     {/* Full Page Success Screen */}
      {success && (
        <div className="success-fullscreen">
          <div className="success-content">
            <div className="checkmark-circle">
              <span className="checkmark">&#10003;</span>
            </div>
            <h2>Successfully Enrolled!</h2>
            <p>We'll contact you soon 😊</p>
          </div>
        </div>
      )}

      <footer>
        <p>&copy; 2025 Java Course | Designed with ❤️</p>
      </footer>
    </div>
  );
}

export default App;