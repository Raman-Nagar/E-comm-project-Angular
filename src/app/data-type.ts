export interface IsignUp {
    name: string,
    email: string,
    password: string,
}
export interface IlogIN {
    email: string,
    password: string,
}
export interface Iproduct {
    name: string,
    price: number,
    color: string,
    category: string,
    image: string,
    description: string,
    id: number,
    quantity: undefined | number,
    productId: undefined | number,
}
export interface Icart {
    name: string,
    price: number,
    color: string,
    category: string,
    image: string,
    description: string,
    id: number | undefined,
    quantity: undefined | number,
    userId: undefined | number,
    productId: undefined | number,
}
export interface IpriceSummary {
    price: number,
    discount: number,
    tax: number,
    delivery: number,
    total: number,
}
export interface Iorder {
    email: string,
    address: string,
    contact: string,
    totalPrice: number,
    userId: number,
    id: number|undefined,
}