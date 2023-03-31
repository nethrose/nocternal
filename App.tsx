import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  return (
    <div>
      <LandingPage title="Welcome to Nocternal" description="The Nocternal Operations Center" />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

export default App;
