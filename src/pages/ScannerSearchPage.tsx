import React, { useState } from 'react';
import BarcodeSearchForm from '@components/BarcodeSearchForm';
import type { Product } from '@services/SearchService';

const ScannerSearchPage: React.FC = () => {
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);

  const handleSearch = (product: Product | null) => {
    if (product) {
      setSearchPerformed(true);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={{ backgroundColor: '#007bff', padding: '20px', textAlign: 'center', color: 'white' }}>
        <h1 style={{ margin: 0 }}>Barcode Scanner</h1>
        <p style={{ margin: '5px 0 0 0' }}>Scan or enter a barcode to find products</p>
      </header>

      <main style={{ flex: 1, padding: '40px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <BarcodeSearchForm onSearch={handleSearch} />
        {searchPerformed && (
          <p style={{ marginTop: '20px', color: '#666', fontSize: '14px' }}>
            Search completed successfully
          </p>
        )}
      </main>

      <footer style={{ backgroundColor: '#f0f0f0', padding: '20px', textAlign: 'center', borderTop: '1px solid #ddd' }}>
        <p style={{ margin: 0, color: '#666', fontSize: '14px' }}>
          &copy; 2024 APP-QQ Scanner. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default ScannerSearchPage;