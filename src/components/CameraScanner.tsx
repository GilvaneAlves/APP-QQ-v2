import React from 'react';
import { useScanner } from '@/hooks/useScanner';

const CameraScanner: React.FC = () => {
  const { startScan, stopScan, isScanning, detected, videoRef, canvasRef, error } = useScanner();

  return (
    <div style={{ textAlign: 'center', padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Camera Scanner</h2>

      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '400px',
          height: '400px',
          margin: '0 auto 20px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '2px solid #ddd',
        }}
      >
        <video
          ref={videoRef}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          autoPlay
          muted
          playsInline
        />
        <canvas ref={canvasRef} style={{ display: 'none' }} />

        {detected && (
          <div
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(76, 175, 80, 0.9)',
              color: 'white',
              padding: '10px 15px',
              borderRadius: '6px',
              fontSize: '14px',
              maxWidth: '90%',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {detected.rawValue}
          </div>
        )}
      </div>

      {error && <div style={{ color: 'red', marginBottom: '15px', fontWeight: 'bold' }}>Error: {error}</div>}

      <div>
        <button
          onClick={startScan}
          disabled={isScanning}
          style={{
            padding: '10px 20px',
            marginRight: '10px',
            backgroundColor: isScanning ? '#ccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: isScanning ? 'not-allowed' : 'pointer',
            fontSize: '14px',
          }}
        >
          Start Scan
        </button>
        <button
          onClick={stopScan}
          disabled={!isScanning}
          style={{
            padding: '10px 20px',
            backgroundColor: !isScanning ? '#ccc' : '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: !isScanning ? 'not-allowed' : 'pointer',
            fontSize: '14px',
          }}
        >
          Stop Scan
        </button>
      </div>

      {detected && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#e8f5e9', borderRadius: '6px' }}>
          <strong>Detected Barcode:</strong>
          <p style={{ margin: '8px 0 0 0' }}>
            <code>{detected.rawValue}</code>
          </p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px', color: '#666' }}>Format: {detected.format}</p>
        </div>
      )}
    </div>
  );
};

export default CameraScanner;