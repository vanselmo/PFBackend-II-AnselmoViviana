import userRepository from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../util/util.js"
import CartRepository from "../repositories/cart.repository.js";

class UserService {
    async registerUser(userData) {
        const userExist = await userRepository.getUserByEmailOrUsername(userData.email, userData.username);

        if (userExist) throw new Error("El usuario ya existe");

        const newCart = await CartRepository.createcart();
        userData.cart = newCart._id;
        userData.password = createHash(userData.password);

        return await userRepository.createUser(userData);
    }

    async loginUser(usernameOrEmail, password) {
        const user = await userRepository.getUserByEmailOrUsername(usernameOrEmail);
        if (!user || !isValidPassword(user, password)) {
            throw new Error('Usuario y/o contraseña incorrectos.');
        }
        return user; 
    }
}

export default new UserService();