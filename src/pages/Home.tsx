// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1 style={{ color: '#333' }}>Welcome to APP-QQv2</h1>
      <p style={{ fontSize: '18px', margin: '20px 0' }}>Landing page with CTA for scanner.</p>
      <button 
        onClick={() => navigate('/scanner')}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '15px 30px',
          border: 'none',
          borderRadius: '5px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Go to Scanner
      </button>
    </div>
  );
};

export default Home;