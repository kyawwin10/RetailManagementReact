export type GetAllSalePayload = {
    saleID: string
    productID: string
    quantitySold: number
    totalAmount: number
    totalProfit: number
    salesDate: string
}

export type ProductSalePayload = {
    productID: string
    quantitySold: number
}

export type SaleReportPayload = {
    totalPrice: string
    totalProfit: string
}