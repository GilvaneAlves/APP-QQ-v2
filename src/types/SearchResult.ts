export interface SearchResult {
    success: boolean;
    data?: unknown[];
    error?: string;
}

export interface ScanResult {
    code: string;
    format: string;
    timestamp: string;
}

export interface ScannerState {
    isSupported: boolean;
    isScanning: boolean;
    lastScan?: ScanResult;
    error?: string;
}