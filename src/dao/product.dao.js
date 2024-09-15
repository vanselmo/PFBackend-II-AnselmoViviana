import ProductModel from './models/product.model.js';

class ProductDAO {
    async getProducts({ limit = 10, page = 1, sort, query } = {}) {
        try {
            const skip = (page - 1) * limit;
            let queryOptions = {};

            if (query) {
                queryOptions.category = query;
            }

            const sortOptions = {};
            if (sort) {
                if (sort === 'asc' || sort === 'desc') {
                    sortOptions.price = sort === 'asc' ? 1 : -1;
                }
            }

            const products = await ProductModel
                .find(queryOptions)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit);

            const totalProducts = await ProductModel.countDocuments(queryOptions);
            const totalPages = Math.ceil(totalProducts / limit);
            const hasPrevPage = page > 1;
            const hasNextPage = page < totalPages;

            return {
                docs: products,
                totalPages,
                prevPage: hasPrevPage ? page - 1 : null,
                nextPage: hasNextPage ? page + 1 : null,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink: hasPrevPage ? `/api/products?limit=${limit}&page=${page - 1}&sort=${sort}&query=${query}` : null,
                nextLink: hasNextPage ? `/api/products?limit=${limit}&page=${page + 1}&sort=${sort}&query=${query}` : null,
            };
        } catch (error) {
            throw new Error('Error en el DAO de productos: ' + error.message);
        }
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
