import ProductDAO from '../dao/product.dao.js';

class ProductRepository {
    async getProducts({ limit = 10, page = 1, sort, query } = {}) {
        try {
            return await ProductDAO.getProducts({ limit, page, sort, query });
        } catch (error) {
            throw new Error('Error en el repositorio de productos: ' + error.message);
        }
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
