import React from 'react';
import { useScanner } from '../hooks/useScanner';

const CameraScanner: React.FC = () => {
  const {
    startScan,
    stopScan,
    isScanning,
    detected,
    error,
    videoRef,
    canvasRef
  } = useScanner();

  const handleStartScan = async (): Promise<void> => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      });

      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        await video.play();
        await startScan();
      }
    } catch (err: unknown) {
      console.error('Failed to access camera:', err);
    }
  };

  const handleStopScan = (): void => {
    stopScan();

    const video = videoRef.current;
    const stream = video?.srcObject as MediaStream | null;
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <div style={{ position: 'relative', width: '100%', height: '300px' }}>
        <video
          ref={videoRef}
          playsInline
          muted
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px'
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            borderRadius: '8px'
          }}
        />
      </div>
      <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
        <button
          onClick={handleStartScan}
          disabled={isScanning}
          style={{ flex: 1, padding: '12px', fontSize: '16px' }}
        >
          Start Scan
        </button>
        <button
          onClick={handleStopScan}
          disabled={!isScanning}
          style={{ flex: 1, padding: '12px', fontSize: '16px' }}
        >
          Stop
        </button>
      </div>
      {error && (
        <div style={{ marginTop: '16px', color: 'red', padding: '8px', background: '#fee' }}>
          {error}
        </div>
      )}
      {detected && (
        <div style={{ marginTop: '16px', padding: '16px', background: '#efe', borderRadius: '8px' }}>
          <h3>Barcode Detected!</h3>
          <p><strong>Format:</strong> {detected.format}</p>
          <p><strong>Value:</strong> {detected.rawValue}</p>
        </div>
      )}
    </div>
  );
};

export default CameraScanner;