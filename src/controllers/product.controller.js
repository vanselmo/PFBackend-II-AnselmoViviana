import ProductService from '../services/product.service.js';

class ProductController {
    static async getProducts(req, res) {
        try {
            const { limit = 10, page = 1, sort, query } = req.query;
            const products = await ProductService.getProducts({
                limit: parseInt(limit),
                page: parseInt(page),
                sort,
                query,
            });

            res.json({
                status: 'success',
                payload: products,
                totalPages: products.totalPages,
                prevPage: products.prevPage,
                nextPage: products.nextPage,
                page: products.page,
                hasPrevPage: products.hasPrevPage,
                hasNextPage: products.hasNextPage,
                prevLink: products.hasPrevPage ? `/api/products?limit=${limit}&page=${products.prevPage}&sort=${sort}&query=${query}` : null,
                nextLink: products.hasNextPage ? `/api/products?limit=${limit}&page=${products.nextPage}&sort=${sort}&query=${query}` : null,
            });

        } catch (error) {
            console.error("Error al obtener productos", error);
            res.status(500).json({ status: 'error', error: "Error interno del servidor" });
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
