import { v4 as uuid } from 'uuid'

import type { TProduct } from '../components/TableForm/TableForm'

export type TProductAPI = {
    name: string;
    price: number | string;
    category: string;
    inStock: boolean;
    brand: string
}

type TProductsAPI = {
    data: TProductAPI[],
    first: number,
    items: number
    last: number
    next: number | null
    pages: number
    prev: number | null
}

const mapNewProductToAPI = (newProduct: TProduct) => {
    return {
        ...newProduct,
        id: uuid()
    }
}
export const productsAPI = {
    get: async ({ pageParam = 0 }): Promise<TProductsAPI> => {
        const res = await fetch(`http://localhost:3000/products?_page=${pageParam}&_per_page=10`)
        return res.json()
    },
    create: async (newProduct: TProduct) => {
        const finalProduct = mapNewProductToAPI(newProduct)
        const res = await fetch('http://localhost:3000/products', {
            method: 'POST',
            headers: {
                'Content-type': 'Application/json',
            },
            body: JSON.stringify(finalProduct)
        })
        return res.json()
    }
}