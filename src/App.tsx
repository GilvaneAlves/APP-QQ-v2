import { useState, useCallback } from 'react';
import { BarcodeScanner } from './components';
import { SearchService } from './services';
import type { Product } from './services';

interface SearchResponse {
  success: boolean;
  data?: Product[];
  error?: string;
}

const App = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScan = useCallback(async (barcode: string) => {
    setLoading(true);
    setError('');
    setProducts([]);

    try {
      const result: SearchResponse = await SearchService.searchByBarcode(barcode);
      if (result.success && result.data) {
        setProducts(result.data);
      } else {
        setError(result.error || 'Search failed');
      }
    } catch {
      setError('An error occurred during search');
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Product Scanner</h1>
      <BarcodeScanner onScan={handleScan} disabled={loading} />
      {loading && <div style={{ marginTop: '10px', color: 'blue' }}>Scanning...</div>}
      {error && (
        <div style={{ marginTop: '10px', color: 'red' }}>
          Error: {error}
        </div>
      )}
      {products.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Found Products:</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {products.map((product, index) => (
              <li key={index} style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                <pre style={{ margin: 0, fontSize: '14px' }}>{JSON.stringify(product, null, 2)}</pre>
              </li>
            ))}
          </ul>
        </div>
      )}
      {!loading && products.length === 0 && !error && (
        <p style={{ marginTop: '20px', color: 'gray' }}>Scan a barcode to find products</p>
      )}
    </div>
  );
};

export default App;
