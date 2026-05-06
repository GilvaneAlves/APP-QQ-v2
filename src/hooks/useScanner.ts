import { useCallback, useEffect, useRef, useState } from 'react';
import type { DetectedBarcode } from '@/types/BarcodeDetector';

export const useScanner = () => {
    const [isScanning, setIsScanning] = useState(false);
    const [detected, setDetected] = useState<DetectedBarcode | null>(null);
    const [error, setError] = useState<string | null>(null);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const rafRef = useRef<number>(0);
    const streamRef = useRef<MediaStream | null>(null);
    const isScanningRef = useRef(false);

    useEffect(() => {
        isScanningRef.current = isScanning;
    }, [isScanning]);

    const startScan = useCallback(async () => {
        try {
            setError(null);
            setDetected(null);
            setIsScanning(true);
            isScanningRef.current = true;

            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
            });
            streamRef.current = stream;

            const video = videoRef.current;
            if (!video) throw new Error('Video ref not available');

            video.srcObject = stream;
            await video.play();

            const canvas = canvasRef.current;
            if (!canvas) throw new Error('Canvas ref not available');

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            if (!('BarcodeDetector' in window)) {
                throw new Error('BarcodeDetector not supported in this browser');
            }

            const detector = new window.BarcodeDetector({
                formats: ['qr_code', 'code_128', 'code_39', 'ean_13', 'ean_8'],
            });

            const scanLoop = () => {
                if (!isScanningRef.current) return;

                const video = videoRef.current;
                const canvas = canvasRef.current;
                if (!video || !canvas || video.readyState !== 4) {
                    rafRef.current = requestAnimationFrame(scanLoop);
                    return;
                }

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    rafRef.current = requestAnimationFrame(scanLoop);
                    return;
                }

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                detector
                    .detect(canvas)
                    .then((barcodes) => {
                        if (barcodes.length > 0) {
                            setDetected(barcodes[0]);
                        }
                    })
                    .catch((err) => {
                        console.error('Detection error:', err);
                    })
                    .finally(() => {
                        rafRef.current = requestAnimationFrame(scanLoop);
                    });
            };

            rafRef.current = requestAnimationFrame(scanLoop);
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Failed to start scanner';
            setError(message);
            setIsScanning(false);
            isScanningRef.current = false;
        }
    }, []);

    const stopScan = useCallback(() => {
        isScanningRef.current = false;
        setIsScanning(false);

        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = 0;
        }

        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => track.stop());
            streamRef.current = null;
        }
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
        videoRef,
        canvasRef,
        error,
    };
};