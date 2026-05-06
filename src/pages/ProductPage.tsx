// src/pages/ProductPage.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

type Params = {
  id: string;
};

const ProductPage: React.FC = () => {
  const { id } = useParams<Params>();

  // Mock product data based on ID
  const product = {
    id: id || 'unknown',
    name: `Product ${id || 'Demo' }`,
    description: 'Detailed product description.',
    price: 99.99,
    image: 'https://via.placeholder.com/300x200'
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#333' }}>{product.name}</h1>
      <img 
        src={product.image} 
        alt={product.name}
        style={{ width: '300px', height: '200px', objectFit: 'cover', borderRadius: '8px' }}
      />
      <p style={{ fontSize: '18px', margin: '20px 0' }}>{product.description}</p>
      <p style={{ fontSize: '24px', color: '#28a745', fontWeight: 'bold' }}>
        Price: ${product.price}
      </p>
    </div>
  );
};

export default ProductPage;