import ProductModel from './models/product.model.js';

class ProductDAO {
    async getAll(filter = {}) {
        return await ProductModel.find(filter);
    }

    async getById(productId) {
        return await ProductModel.findById(productId);
    }

    async create(productData) {
        return await ProductModel.create(productData);
    }

    async update(productId, updateData) {
        return await ProductModel.findByIdAndUpdate(productId, updateData, { new: true });
    }

    async delete(productId) {
        return await ProductModel.findByIdAndDelete(productId);
    }

    async updateStock(productId, quantity) {
        try {
            return await ProductModel.findByIdAndUpdate(
                productId,
                { $inc: { stock: quantity } },
                { new: true }
            );
        } catch (error) {
            console.error('Error actualizando el stock en el DAO:', error);
            throw new Error('No se pudo actualizar el stock en la base de datos');
        }
    }
    

    async getByCategory(category) {
        return await ProductModel.find({ category });
    }
}

export default new ProductDAO;
