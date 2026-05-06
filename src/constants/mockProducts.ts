import { Product } from '../types/Product'

export const MOCK_PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Produto Exemplo 1',
        barcode: '123456789',
        price: 49.99,
        description: 'Descrição do produto 1',
        stores: ['Loja A', 'Loja B'],
    },
    {
        id: '2',
        name: 'Produto Exemplo 2',
        barcode: '987654321',
        price: 99.99,
        description: 'Descrição do produto 2',
        stores: ['Loja C'],
    },
]