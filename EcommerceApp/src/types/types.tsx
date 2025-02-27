export interface Product {
    id: string;
    name: string;
    price: string;
    image: string;
    quantity: number;
    description: string; 
    stock: number;
}
export interface CartItem extends Product {
    quantity: number;
}
