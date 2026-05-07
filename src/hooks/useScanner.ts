import { useCallback, useEffect, useRef, useState } from 'react';
import type { DetectedBarcode } from '@/types/BarcodeDetector';
import { ScannerService } from '@/services/ScannerService';

const useScanner = () => {
    const [isScanning, setIsScanning] = useState<boolean>(false);
    const [detected, setDetected] = useState<DetectedBarcode | null>(null);
    const [error, setError] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const serviceRef = useRef<ScannerService | null>(null);

    const startScan = useCallback(async () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) {
            setError('Video or canvas elements are not ready. Ensure they are rendered and refs are attached.');
            return;
        }

        if (isScanning) {
            return;
        }

        try {
            setIsScanning(true);
            setDetected(null);
            setError(null);

            if (!serviceRef.current) {
                serviceRef.current = new ScannerService();
                serviceRef.current.onDetected = (barcode: DetectedBarcode) => {
                    setDetected(barcode);
                };
                serviceRef.current.onError = (err: Error) => {
                    setError(err.message);
                    setIsScanning(false);
                };
                serviceRef.current.onScanningChange = (scanning: boolean) => {
                    setIsScanning(scanning);
                };
            }

            await serviceRef.current.startScan(video, canvas);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to start scanning';
            setError(errorMessage);
            setIsScanning(false);
        }
    }, [isScanning]);

    const stopScan = useCallback(() => {
        serviceRef.current?.stopScan();
        setIsScanning(false);
        setDetected(null);
        setError(null);
    }, []);

    useEffect(() => {
        return () => {
            stopScan();
        };
    }, [stopScan]);

    return {
        startScan,
        stopScan,
        isScanning,
        detected,
        error,
        videoRef,
        canvasRef,
    };
};

export { useScanner };