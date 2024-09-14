import UserModel from './models/user.model.js';

class UserDao {
    async findById(id) {
        return await UserModel.findById(id);
    }
    async findOne(query) {
        return await UserModel.findOne(query);
    }
    async save(userdata) {
        const user = new UserModel(userdata);
        return await user.save();
    }
    async updateUser(id, updateData) {
        return await UserModel.findByIdAndUpdate(id, updateData, { new: true });
    }
}

export default new UserDao();
