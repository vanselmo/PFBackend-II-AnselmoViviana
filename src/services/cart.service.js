import CartRepository from "../repositories/cart.repository.js";
import ProductRepository from "../repositories/product.repository.js";
import TicketService from "./ticket.service.js";
import UserRepository from "../repositories/user.repository.js";

class CartService {

    async getAllCarts() {
        return await CartRepository.getAll();
    }

    async getCartById(cartId) {
        return await CartRepository.getById(cartId);
    }


    async addProductToCart(cartId, productId, quantity = 1) {
        try {
            const cart = await CartRepository.getById(cartId);
            if (!cart) throw new Error("Carrito no encontrado.");

            const product = await ProductRepository.getById(productId);
            if (!product) throw new Error("Producto no encontrado.");

            const productInCart = cart.products.find(p => p.product._id.toString() === productId);
            const totalQuantity = productInCart ? productInCart.quantity + quantity : quantity;

            if (totalQuantity > product.stock) {
                throw new Error("Stock insuficiente para este producto.");
            }

            const updatedCart = await CartRepository.addProductToCart(cartId, productId, quantity);
            return updatedCart;
        } catch (error) {
            console.error("Error al agregar el producto al carrito:", error);
            throw new Error("Error al agregar el producto al carrito.");
        }
    }
    async removeProduct(cartId, productId) {
        const updatedCart = await CartRepository.removeProduct(cartId, productId);
        return updatedCart;
    }

    async clearCart(cartId) {
        return await CartRepository.clearCart(cartId);
    }
    async purchaseCart(cartId) {
        const cart = await CartRepository.getById(cartId);
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
  
        for (const item of cart.products) {
            const product = await ProductRepository.getById(item.product._id);
            if (product.stock < item.quantity) {
                throw new Error(`Stock insuficiente para el producto ${product.name}`);
            }
            await ProductRepository.updateStock(item.product._id, -item.quantity); 
        }
        const user = await UserRepository.getUserByCartId(cartId);
        if (!user) {
            throw new Error('Usuario no encontrado para este carrito');
        }
    
        const userEmail = user.email;

        const ticket = await TicketService.generateTicket(cart, userEmail);
        await this.clearCart(cartId);
        return ticket;
    }
    
}

export default new CartService();
