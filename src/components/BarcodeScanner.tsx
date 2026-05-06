import React, { useState, useRef, ChangeEvent, KeyboardEvent } from 'react';

interface BarcodeScannerProps {
  onScan?: (code: string) => void;
  disabled?: boolean;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan, disabled = false }) => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleScan = () => {
    if (inputValue.trim()) {
      onScan?.(inputValue.trim());
      setInputValue('');
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleScan();
    }
  };

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter or scan barcode"
        disabled={disabled}
        style={{
          padding: '8px',
          fontSize: '16px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          flex: 1
        }}
      />
      <button
        onClick={handleScan}
        disabled={disabled}
        style={{
          padding: '8px 16px',
          backgroundColor: disabled ? '#ccc' : '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: disabled ? 'not-allowed' : 'pointer'
        }}
      >
        Scan
      </button>
    </div>
  );
};

export default BarcodeScanner;
