export interface ApiResponse<T = unknown> {
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
}

export interface ProductData {
    id?: string;
    name: string;
    description?: string;
    price: number;
    barcode?: string;
}

export function isValidBarcode(barcode: string): boolean {
    const num: string = barcode.replace(/[^\d]/g, '');
    const len: number = num.length;
    if (![8, 12, 13, 14].includes(len)) {
        return false;
    }
    const digits: number[] = num.split('').map(Number);
    const checkDigit: number = digits.pop() ?? 0;
    let sum: number = 0;
    let weight: number = 3;
    for (let i: number = digits.length - 1; i >= 0; i--) {
        sum += digits[i] * weight;
        weight = 4 - weight;
    }
    const expected: number = (10 - (sum % 10)) % 10;
    return checkDigit === expected;
}

export function isValidEmail(email: string): boolean {
    const emailRegex: RegExp = /^[\w\-.]+@[\w\-.]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.toLowerCase());
}

export function isValidProductData(data: unknown): data is ProductData {
    if (typeof data !== 'object' || data === null) {
        return false;
    }
    const product = data as Record<string, unknown>;
    return (
        typeof product.name === 'string' &&
        product.name.trim().length > 0 &&
        typeof product.price === 'number' &&
        product.price >= 0 &&
        (product.id === undefined || typeof product.id === 'string') &&
        (product.description === undefined || typeof product.description === 'string') &&
        (product.barcode === undefined || isValidBarcode(product.barcode as string))
    );
}

export function sanitizeInput(input: string): string {
    const div: HTMLDivElement = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

export function validateApiResponse<T>(response: unknown): response is ApiResponse<T> {
    if (typeof response !== 'object' || response === null) {
        return false;
    }
    const resp = response as Record<string, unknown>;
    return (
        typeof resp.success === 'boolean' &&
        (resp.success ? resp.data !== undefined : resp.error !== undefined || resp.message !== undefined)
    );
}

export function normalizeBarcode(barcode: string): string {
    return barcode.replace(/[^\d]/g, '');
}