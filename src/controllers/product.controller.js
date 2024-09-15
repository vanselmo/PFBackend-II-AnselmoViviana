import ProductService from '../services/product.service.js';

class ProductController {
    static async getProducts(req, res) {
        const { limit = 10, page = 1, sort, query } = req.query;

        try {
            const products = await ProductService.getProducts({ limit, page, sort, query });
            res.json(products);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los productos' });
        }
    }
    static async getProductById(req, res) {
    const id = req.params.pid;

    try {
        const product = await ProductService.getProductById(id);
        if (!product) {
            return res.status(404).json("No se encontró el producto");
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el producto" });
    }
}

    static async addProduct(req, res) {
    const newProduct = req.body;

    try {
        await ProductService.addProduct(newProduct);
        res.status(201).json({ message: "Producto agregado exitosamente" });
    } catch (error) {
        console.error("Error al agregar producto", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

    static async updateProduct(req, res) {
    const id = req.params.pid;
    const updatedFields = req.body;

    try {
        await ProductService.updateProduct(id, updatedFields);
        res.json({ message: "Producto actualizado" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el producto" });
    }
}

    static async deleteProduct(req, res) {
    const id = req.params.pid;

    try {
        await ProductService.deleteProduct(id);
        res.json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
}
}

export default ProductController;
