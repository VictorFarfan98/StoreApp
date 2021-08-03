/**
 * The Product interface.
 */
export interface Product {
    /**
     * The Id of the product.
     */
    productId: number;
    /**
     * The Name of the product.
     */
    name: string;
    /**
     * The price of the product.
     */
    price: number;
    /**
     * The available stock of the product.
     */
    stock: number;
    /**
     * The datetime of the creation of the product.
     */
    createdAt: string | any;
    /**
     * The datetime of the last update of the product.
     */
    updatedAt: string | any;
}
