// src/pages/SearchPage.tsx
import React, { useState } from 'react';

const SearchPage: React.FC = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock search action
    console.log('Searching for:', query);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#333' }}>Search Page</h1>
      <form onSubmit={handleSearch} style={{ margin: '20px 0' }}>
        <input 
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter search query..."
          style={{
            width: '400px',
            padding: '12px',
            fontSize: '16px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            marginRight: '10px'
          }}
        />
        <button 
          type="submit"
          style={{
            backgroundColor: '#28a745',
            color: 'white',
            padding: '12px 20px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchPage;