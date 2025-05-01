import React from 'react';
import './Privacy.css';


function Privacy() {
  return (
    <div className="privacy-container">
    <h1 className="privacy-header">Privacy Policy</h1>

    <p className="privacy-intro">
      Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information.
    </p>

    <div className="privacy-section">
      <h3>1. Information We Collect</h3>
      <p>
        We collect personal information like name, email, phone number, and payment details when you book a ticket with us.
      </p>
    </div>

      <h3>2. How We Use Your Information</h3>
      <p>
        Your information is used to process bookings, send notifications, and improve our services. 
        We do not sell your personal information to third parties.
      </p>

      <h3>3. Data Security</h3>
      <p>
        We implement strong security measures to protect your data against unauthorized access and misuse.
      </p>

      <h3>4. Cookies</h3>
      <p>
        Our website may use cookies to enhance your browsing experience. You can control cookies through your browser settings.
      </p>

      <h3>5. Third-Party Services</h3>
      <p>
        We may use third-party services (like payment gateways) that have their own privacy policies.
        We are not responsible for the practices of these third parties.
      </p>

      <h3>6. Changes to This Policy</h3>
      <p>
        We may update our Privacy Policy from time to time. Any changes will be posted on this page.
      </p>

      <p className="privacy-footer">
        If you have any questions about this Privacy Policy, please contact our support team.
      </p>
    </div>
  );
}

export default Privacy;
