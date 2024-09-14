import { Router } from "express";
import CartController from '../controllers/cart.controller.js';

const cartsRouter = Router();

cartsRouter.post("/", CartController.createCart);
cartsRouter.get("/:cid", CartController.getCartById);
cartsRouter.post("/:cid/products/:pid", CartController.addProductToCart);
cartsRouter.delete("/:cid", CartController.clearCart);
cartsRouter.delete("/:cid/products/:pid", CartController.removeProductFromCart);
cartsRouter.put("/:cid/products/:pid", CartController.updateProductQuantity);
cartsRouter.put("/:cid", CartController.updateCart);
cartsRouter.get("/:cid/purchase", CartController.purchaseCart);

export default cartsRouter;
