export type BarcodeFormat =
    | "aztec"
    | "codabar"
    | "code_128"
    | "code_39"
    | "code_93"
    | "data_matrix"
    | "ean_13"
    | "ean_8"
    | "i2of5"
    | "itf"
    | "pdf417"
    | "qr_code"
    | "unknown";

export interface Point2D {
    readonly x: number;
    readonly y: number;
}

export interface DetectedBarcode {
    readonly boundingBox: DOMRectReadOnly;
    readonly cornerPoints: ReadonlyArray<Point2D>;
    readonly rawValue: string;
    readonly format: BarcodeFormat;
}

export interface BarcodeDetectorOptions {
    formats?: BarcodeFormat[];
}

export interface BarcodeDetector {
    detect(image: ImageBitmapSource): Promise<DetectedBarcode[]>;
}

// Augment the global Window interface to include BarcodeDetector
declare global {
    interface Window {
        BarcodeDetector: new (options?: BarcodeDetectorOptions) => BarcodeDetector;
    }
}