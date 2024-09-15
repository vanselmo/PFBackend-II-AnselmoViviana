import CartDao from "../dao/cart.dao.js";

class CartRepository {
    async createcart() {
        return await CartDao.create();
    }

    async getAll() {
        return await CartDao.getAll();
    }

    async getById(cartId) {
        return await CartDao.getById(cartId);
    }

    async addProductToCart(cartId, productId, quantity) {
        const cart = await this.getById(cartId);

        const productIndex = cart.products.findIndex(p => p.product._id.toString() === productId);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        return await CartDao.update(cartId, cart);  
    }

    async addProduct(cartId, productId, quantity) {
        const cart = await getById(cartId);
        const productIndex = cart.products.findIndex(p => p.product._id.toString()  === productId);

        if (productIndex !== -1) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ productId, quantity });
        }
        return await CartDao.update(cartId, cart);
    }

    async removeProductFromCart(cartId, productId) {
        const cart = await this.getById(cartId);
        cart.products = cart.products.filter(p => p.product._id.toString() !== productId);

        return await CartDao.update(cartId, cart);
    }
    async clearCart(cartId) {
        const cart = await this.getById(cartId);
        cart.products = [];
        return await CartDao.update(cartId, cart);
    }
    async updateProductQuantity(cartId, updatedCart) {
        return await CartDao.update(cartId, updatedCart); 
    }
}

export default new CartRepository();