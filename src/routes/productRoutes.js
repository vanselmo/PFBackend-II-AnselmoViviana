import { Router } from 'express';
import ProductController from '../controllers/product.controller.js';

const productsRouter = Router();

productsRouter.get("/", ProductController.getProducts);
productsRouter.get("/:pid", ProductController.getProductById);
productsRouter.post("/", ProductController.addProduct);
productsRouter.put("/:pid", ProductController.updateProduct);
productsRouter.delete("/:pid", ProductController.deleteProduct);

export default productsRouter;
