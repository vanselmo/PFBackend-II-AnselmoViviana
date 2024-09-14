import userDao from '../dao/user.dao.js';

class UserRepository {
    async createUser(userData) {
        return await userDao.save(userData);
    }

    async getUserById(id) {
        return await userDao.findById(id);
    }

    async getUserByEmail(email) {
        return await userDao.findOne({ email });
    }
    async getUserByEmailOrUsername(emailOrUsername) {
        return await userDao.findOne({
            $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
        });
    }
    async getUserByCartId(cartId) {
        return await userDao.findOne({ cart: cartId }); 
    }
    async updateUser(id, updateData) {
        return await userDao.updateUser(id, updateData);
    }

    async isEmailTaken(email) {
        const user = await userDao.findOne({ email });
        return !!user;
    }

}

export default new UserRepository();
