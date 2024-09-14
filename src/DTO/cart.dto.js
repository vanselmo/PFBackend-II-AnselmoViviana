class CartDTO {
    constructor(cart) {
        this.id = cart._id;
        this.userId = cart.userId;
        this.products = cart.products.map(product => ({
            productId: product.productId,
            quantity: product.quantity,
            price: product.product.price
        }));
        this.total = this.products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
    }
}

export default CartDTO;
