interface Product {
    id: string;
    name: string;
    barcode: string;
    category: string;
    price: number;
}

interface SearchFilters {
    category?: string;
    minPrice?: number;
    maxPrice?: number;
}

interface SearchResponse {
    success: boolean;
    data?: Product[];
    error?: string;
}

class SearchService {
    private static mockProducts: Product[] = [
        { id: '1', name: 'Apple', barcode: '0123456789012', category: 'Fruit', price: 1.99 },
        { id: '2', name: 'Banana', barcode: '0123456789013', category: 'Fruit', price: 0.99 },
        { id: '3', name: 'Milk', barcode: '0123456789014', category: 'Dairy', price: 3.49 },
        { id: '4', name: 'Bread', barcode: '0123456789015', category: 'Bakery', price: 2.29 },
    ];

    private static cache = new Map<string, Product[]>();

    private static getCacheKey(type: 'barcode' | 'name' | 'filters', query: string | SearchFilters): string {
        if (type === 'barcode' || type === 'name') {
            return `${type}:${query}`;
        }
        return `filters:${JSON.stringify(query)}`;
    }

    private static validateBarcode(barcode: string): boolean {
        const clean = barcode.trim();
        return clean.length >= 12;
    }

    private static validateName(name: string): boolean {
        const clean = name.trim();
        return clean.length >= 2;
    }

    private static validateFilters(filters: SearchFilters): boolean {
        // Validate if filters object exists and has valid properties
        if (!filters || (Object.keys(filters).length === 0)) return false;

        // Validate price ranges if provided
        if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
            if (filters.minPrice > filters.maxPrice) return false;
        }

        return true;
    }

    static async searchByBarcode(barcode: string): Promise<SearchResponse> {
        try {
            if (!this.validateBarcode(barcode)) {
                return { success: false, error: 'Invalid barcode. Must be at least 12 characters.' };
            }
            const cleanBarcode = barcode.trim();
            const cacheKey = this.getCacheKey('barcode', cleanBarcode);
            if (this.cache.has(cacheKey)) {
                return { success: true, data: this.cache.get(cacheKey)! };
            }
            const product = this.mockProducts.find(p => p.barcode === cleanBarcode);
            if (product) {
                const result = [product];
                this.cache.set(cacheKey, result);
                return { success: true, data: result };
            }
            return { success: false, error: 'Product not found for this barcode.' };
        } catch (error) {
            return { success: false, error: `Search error: ${(error as Error).message}` };
        }
    }

    static async searchByName(name: string): Promise<SearchResponse> {
        try {
            if (!this.validateName(name)) {
                return { success: false, error: 'Invalid name. Must be at least 2 characters.' };
            }
            const cleanName = name.trim().toLowerCase();
            const cacheKey = this.getCacheKey('name', cleanName);
            if (this.cache.has(cacheKey)) {
                return { success: true, data: this.cache.get(cacheKey)! };
            }
            const products = this.mockProducts.filter(p =>
                p.name.toLowerCase().includes(cleanName)
            );
            this.cache.set(cacheKey, products);
            return { success: true, data: products };
        } catch (error) {
            return { success: false, error: `Search error: ${(error as Error).message}` };
        }
    }

    static async searchByFilters(filters: SearchFilters): Promise<SearchResponse> {
        try {
            if (!this.validateFilters(filters)) {
                return { success: false, error: 'Invalid filters provided.' };
            }
            const cacheKey = this.getCacheKey('filters', filters);
            if (this.cache.has(cacheKey)) {
                return { success: true, data: this.cache.get(cacheKey)! };
            }
            const results = this.mockProducts.filter(p => {
                if (filters.category && p.category !== filters.category) return false;
                if (filters.minPrice !== undefined && p.price < filters.minPrice!) return false;
                if (filters.maxPrice !== undefined && p.price > filters.maxPrice!) return false;
                return true;
            });
            this.cache.set(cacheKey, results);
            return { success: true, data: results };
        } catch (error) {
            return { success: false, error: `Search error: ${(error as Error).message}` };
        }
    }
}

export { SearchService };
export type { Product, SearchFilters, SearchResponse };