import React from 'react';

function LandingPage({ title, description }) {
  console.log('Rendering LandingPage...');
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export default LandingPage;
