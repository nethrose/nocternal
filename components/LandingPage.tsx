import React from 'react';

interface LandingPageProps {
  title: string;
  description: string;
}

const LandingPage: React.FC<LandingPageProps> = ({ title, description }) => {
  console.log('Rendering LandingPage...');
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export default LandingPage;
