import userService from "../services/user.service.js";
import jwt from "jsonwebtoken";
import UserDTO from "../dto/user.dto.js";

class UserController {
    async register(req, res) {
        const { first_name, last_name, email, age, password, role } = req.body;

        try {
            const username = `${first_name} ${last_name}`;
            const newUser = await userService.registerUser({ first_name, last_name, email, age, role, password, username });

            const token = jwt.sign({
                user: username,
                email: newUser.email,
                role: newUser.role
            }, process.env.JWT_SECRET || "codersecret", { expiresIn: "1h" });

            res.cookie("coderCookieToken", token, { maxAge: 3600000, httpOnly: true });

            if (newUser.role === "admin") {
                res.redirect("/realtimeproducts");
            } else if (newUser.role === "user") {
                res.redirect("/");
            } else {
                res.status(403).send("Rol no autorizado");
            }
        } catch (error) {
            console.error("Error al registrar usuario: ", error);
            res.status(500).send("Error interno del servidor");
        }
    }

    async login(req, res) {
        const { username, password } = req.body;

        try {
            const user = await userService.loginUser(username, password);

            const token = jwt.sign({
                user: `${user.first_name} ${user.last_name}`,
                email: user.email,
                role: user.role
            }, process.env.JWT_SECRET || "codersecret", { expiresIn: "1h" });

            res.cookie("coderCookieToken", token, { maxAge: 3600000, httpOnly: true });

            if (user.role === "admin") {
                res.redirect("/realtimeproducts");
            } else if (user.role === "user") {
                res.redirect("/");
            } else {
                res.status(403).send("El usuario no tiene un rol autorizado.");
            }
        } catch (error) {
            console.error("Error al iniciar sesión: ", error);
            res.status(500).send("Error interno del servidor");
        }

    }
    async current(req, res) {
        if (req.user) {
            const user = req.user;
            const userDTO = new UserDTO(user);
            res.render("home", { user: userDTO });
        } else {
            res.status(401).send("Usuario no autorizado");
        }
    }

    logout(req, res) {
        res.clearCookie("coderCookieToken");
        res.status(200).json({ message: "Logout exitoso" });   
    }
}

export default new UserController();
