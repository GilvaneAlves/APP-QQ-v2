import type { DetectedBarcode, BarcodeDetector } from '@/types/BarcodeDetector';

export class ScannerService {
    public onDetected?: (barcode: DetectedBarcode) => void;
    public onError?: (error: Error) => void;
    public onScanningChange?: (scanning: boolean) => void;

    private detector?: BarcodeDetector;
    private animationFrameId?: number;
    private scanning: boolean = false;

    public async startScan(video: HTMLVideoElement, canvas: HTMLCanvasElement): Promise<void> {
        if (this.scanning) {
            return;
        }

        try {
            if (!window.BarcodeDetector) {
                throw new Error('Barcode Detection API not supported in this browser.');
            }

            this.detector = new window.BarcodeDetector();

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                throw new Error('Cannot get 2D context from canvas');
            }

            if (video.videoWidth === 0 || video.videoHeight === 0) {
                throw new Error('Video dimensions not available. Ensure video is loaded and playing.');
            }

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            this.scanning = true;
            this.onScanningChange?.(true);

            const scan = () => {
                if (!this.scanning || !this.detector) {
                    return;
                }

                if (video.videoWidth === 0 || video.videoHeight === 0) {
                    this.animationFrameId = requestAnimationFrame(scan);
                    return;
                }

                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

                this.detector.detect(canvas)
                    .then((barcodes) => {
                        barcodes.forEach((barcode) => {
                            this.onDetected?.(barcode);
                        });
                    })
                    .catch((error) => {
                        this.onError?.(error);
                    });

                this.animationFrameId = requestAnimationFrame(scan);
            };

            scan();
        } catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            this.onError?.(err);
            this.scanning = false;
            this.onScanningChange?.(false);
        }
    }

    public stopScan(): void {
        if (!this.scanning) {
            return;
        }

        this.scanning = false;

        if (this.animationFrameId !== undefined) {
            cancelAnimationFrame(this.animationFrameId);
            this.animationFrameId = undefined;
        }

        this.onScanningChange?.(false);
    }
}