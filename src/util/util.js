import bcrypt from "bcrypt";

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

const calculateTotal = (products) => {
    let total = 0;

    products.array.forEach(item => {
        total += item.product.price * item.quantity
    })

    return total;
}

export { createHash, isValidPassword, calculateTotal };