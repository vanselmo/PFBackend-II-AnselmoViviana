import CartService from '../services/cart.service.js';

class CartController {
    static async createCart(req, res) {
        try {
            const newCart = await CartService.createCart();
            res.status(201).json(newCart);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    static async getCartById(req, res) {
        const id = req.params.cid;

        try {
            const cart = await CartService.getCartById(id);
            if (!cart) {
                return res.status(404).json({ error: "No existe un carrito con ese ID" });
            }
            return res.json(cart.products);
        } catch (error) {
            res.status(500).json("Error interno del servidor");
        }
    }

    static async addProductToCart(req, res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        try {
            const cart = await CartService.addProductToCart(cartId, productId);
            res.json(cart);
        } catch (error) {
            console.log(error);
            res.status(400).send("Error: no se puede agregar el producto al carrito");
        }
    }

    static async clearCart(req, res) {
        const id = req.params.cid;
        try {
            await CartService.clearCart(id);
            res.json({ message: "El carrito ha sido vaciado" });
        } catch (error) {
            res.status(500).json({ error: "Error al vaciar el carrito" });
        }
    }

    static async removeProductFromCart(req, res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        try {
            await CartService.removeProductFromCart(cartId, productId);
            res.json({ message: "El producto ha sido eliminado del carrito" });
        } catch (error) {
            console.error(error);
            res.status(400).json({ error: "Error: no se pudo eliminar el producto del carrito" });
        }
    }

    static async updateProductQuantity(req, res) {
        const cartId = req.params.cid;
        const productId = req.params.pid;
        const newQuantity = parseInt(req.body.quantity);

        if (newQuantity < 0) {
            return res.status(400).json({ error: 'Por favor, proporciona una cantidad válida.' });
        }

        try {
            const updatedCart = await CartService.updateProductQuantity(cartId, productId, newQuantity);
            res.json({
                message: "La cantidad del producto ha sido actualizada correctamente.",
                cart: updatedCart
            });
        } catch (error) {
            res.status(400).json({ error: "Hubo un problema al actualizar la cantidad del producto. Por favor, intenta de nuevo." });
        }
    }

    static async updateCart(req, res) {
        const cartId = req.params.cid;
        const newProducts = req.body.products;

        if (!Array.isArray(newProducts)) {
            return res.status(400).json({ error: 'Proporciona una lista de productos válida.' });
        }

        try {
            await CartService.updateCart(cartId, newProducts);
            res.json({ message: "El carrito ha sido actualizado" });
        } catch (error) {
            res.status(400).json({ error: "Error: no se pudo actualizar el carrito" });
        }
    }

    static async purchaseCart(req, res) {
        const cartId = req.params.cid;
        try {
            const result = await CartService.purchaseCart(cartId);
            res.json(result);
        } catch (error) {
            console.error(error);
            res.status(500).send("Error interno en el servidor");
        }
    }
}

export default CartController;
