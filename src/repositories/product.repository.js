import ProductDAO from '../dao/product.dao.js';

class ProductRepository {
    async getAll(filter = {}) {
        return await ProductDAO.getAll(filter);
    }

    async getById(productId) {
        return await ProductDAO.getById(productId);
    }

    async create(productData) {
        return await ProductDAO.create(productData);
    }

    async update(productId, updateData) {
        return await ProductDAO.update(productId, updateData);
    }

    async updateStock(productId, quantity) {
        try {
            return await ProductDAO.updateStock(productId, quantity);
        } catch (error) {
            console.error('Error actualizando el stock en el Repository:', error);
            throw new Error('No se pudo actualizar el stock');
        }
    }
    
    async delete(productId) {
        return await ProductDAO.delete(productId);
    }
}

export default new ProductRepository();
