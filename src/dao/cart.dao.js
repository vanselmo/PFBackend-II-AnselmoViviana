import CartModel from './models/cart.model.js';

class CartDao {
    async create() {
        const newCart = new CartModel();
        return await newCart.save();
    }
    async getById(cartId) {
        return await CartModel.findById(cartId).populate('products.product');
    }

    async addProduct(cartId, product) {
        return await CartModel.findByIdAndUpdate(
            cartId,
            { $push: { products: product } },
            { new: true }
        ).populate('products.product');
    }

    async removeProduct(cartId, productId) {
        return await CartModel.findByIdAndUpdate(
            cartId,
            { $pull: { products: { product: productId } } },
            { new: true }
        ).populate('products.product');
    }

    async clearCart(cartId) {
        return await CartModel.findByIdAndUpdate(
            cartId,
            { products: [] },
            { new: true }
        );
    }
    async update(cartId, updatedCart) {
        return await CartModel.findByIdAndUpdate(cartId, updatedCart, { new: true }).populate('products.product');
    }

    async updateProductQuantity(cartId, productId, quantity) {
        return await CartModel.updateOne(
            { _id: cartId, 'products.product': productId },
            { $set: { 'products.$.quantity': quantity } }
        );
    }
}

export default new CartDao();