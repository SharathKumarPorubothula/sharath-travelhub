import React from 'react';
import './AdminInfo.css';

const FAQPage = () => {
  return (
    <div className="admin-info-page">
      <h2>Frequently Asked Questions</h2>
      <ul>
        <li><strong>How do I book a ticket?</strong> - Use the search on the home page to find and book buses.</li>
        <li><strong>Can I cancel a ticket?</strong> - Yes, use the Cancel Ticket option under Support.</li>
        <li><strong>How do I contact support?</strong> - Visit the Help Center page for support options.</li>
      </ul>
    </div>
  );
};

export default FAQPage;
