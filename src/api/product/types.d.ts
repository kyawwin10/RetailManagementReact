import exp from "constants"

export type GetAllProductyPayload = {
    productID: string
    productName: string
    price: number
    stock: number
    profitPerItem: number
}

export type ProductAddPayload = {
    productName: string
    price: number
    stock: number
    profitPerItem: number
}

export type ProductUpdatePayload = {
    productID: string
    productName: string
    price: number
    stock: number
    profitPerItem: number
}

export type ProductDeletePayload = {
    productID: string
}

export type CartPayload = {
    productID: string
    productName: string
    price: number
    quantity: number
    stock: number
}