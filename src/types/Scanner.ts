export type ScanFormat =
    | 'aztec'
    | 'codabar'
    | 'code_128'
    | 'code_39'
    | 'code_93'
    | 'data_matrix'
    | 'ean_13'
    | 'ean_8'
    | 'itf'
    | 'pdf_417'
    | 'qr_code'
    | 'upc_a'
    | 'upc_e';

export interface ScanResult {
    code: string;
    format: ScanFormat;
    timestamp: number;
}

export interface ScanError {
    message: string;
    code: string;
}

export interface CameraPermission {
    state: 'granted' | 'denied' | 'prompt';
    message: string;
}

export interface ScannerConfig {
    formats: ScanFormat[];
    autoDetect: boolean;
}