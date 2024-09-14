import ProductRepository from '../repositories/product.repository.js';

class ProductService {
    async getAllProducts(filter = {}) {
        return await ProductRepository.getAll(filter);
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
