// src/pages/AdminPage.tsx
import React from 'react';

const AdminPage: React.FC = () => {
  const mockData = [
    { id: 1, name: 'Product A', status: 'active', sales: 150 },
    { id: 2, name: 'Product B', status: 'inactive', sales: 80 },
    { id: 3, name: 'Product C', status: 'active', sales: 220 },
    { id: 4, name: 'Product D', status: 'pending', sales: 45 }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ color: '#333' }}>Admin Panel</h1>
      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <thead>
          <tr style={{ backgroundColor: '#f8f9fa' }}>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Name</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Status</th>
            <th style={{ border: '1px solid #ddd', padding: '12px', textAlign: 'left' }}>Sales</th>
          </tr>
        </thead>
        <tbody>
          {mockData.map((item) => (
            <tr key={item.id} style={{ backgroundColor: item.status === 'active' ? '#d4edda' : '#f8d7da' }}>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{item.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{item.name}</td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>
                <span style={{ 
                  color: item.status === 'active' ? '#155724' : '#721c24',
                  fontWeight: 'bold' 
                }}>{item.status}</span>
              </td>
              <td style={{ border: '1px solid #ddd', padding: '12px' }}>{item.sales}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;