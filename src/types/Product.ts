export interface Product {
    id: string
    name: string
    barcode: string
    price: number
    description: string
    stores: string[]
}

export interface ScanResult {
    success: boolean
    barcode?: string
    error?: string
}