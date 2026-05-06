import React, { useState, useCallback } from 'react';
import BarcodeScanner from './BarcodeScanner';
import { SearchService } from '@services/SearchService';
import type { Product } from '@services/SearchService';

interface BarcodeSearchFormProps {
  onSearch?: (result: Product | null) => void;
}

const BarcodeSearchForm: React.FC<BarcodeSearchFormProps> = ({ onSearch }) => {
  const [result, setResult] = useState<Product | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleScan = useCallback(async (barcode: string) => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await SearchService.searchByBarcode(barcode);
      
      if (response.success && response.data && response.data.length > 0) {
        const product = response.data[0];
        setResult(product);
        onSearch?.(product);
      } else {
        setError('Product not found for this barcode.');
        onSearch?.(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Search failed';
      setError(errorMessage);
      onSearch?.(null);
    } finally {
      setLoading(false);
    }
  }, [onSearch]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <BarcodeScanner onScan={handleScan} disabled={loading} />

      {loading && (
        <div style={{ textAlign: 'center', color: '#666' }}>
          Searching...
        </div>
      )}

      {error && (
        <div style={{ padding: '12px', backgroundColor: '#f8d7da', color: '#721c24', borderRadius: '4px', border: '1px solid #f5c6cb' }}>
          {error}
        </div>
      )}

      {result && (
        <div style={{ padding: '15px', backgroundColor: '#d4edda', color: '#155724', borderRadius: '4px', border: '1px solid #c3e6cb' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>Product Found:</h4>
          <p><strong>Name:</strong> {result.name}</p>
          <p><strong>Price:</strong> ${result.price.toFixed(2)}</p>
          <p><strong>Category:</strong> {result.category}</p>
        </div>
      )}
    </div>
  );
};

export default BarcodeSearchForm;
