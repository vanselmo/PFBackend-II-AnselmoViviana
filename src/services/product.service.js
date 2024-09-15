import ProductRepository from '../repositories/product.repository.js';

class ProductService {
    async getProducts({ limit = 10, page = 1, sort, query } = {}) {
        try {
            return await ProductRepository.getProducts({ limit, page, sort, query });
        } catch (error) {
            throw new Error('Error en el servicio de productos: ' + error.message);
        }
    }

    async getProductById(productId) {
        return await ProductRepository.getById(productId);
    }

    async createProduct(productData) {
        return await ProductRepository.create(productData);
    }

    async updateProduct(productId, updateData) {
        return await ProductRepository.update(productId, updateData);
    }

    async deleteProduct(productId) {
        return await ProductRepository.delete(productId);
    }
}

export default new ProductService();
