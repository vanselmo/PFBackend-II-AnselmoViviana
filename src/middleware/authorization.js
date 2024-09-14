export function onlyAdmin(req, res, next) {
    if(req.user.role === "admin") {
        next();
    } else {
        res.status(403).send("Usuario no autorizado")
    }
}

export function onlyUser(req, res, next) {
    if(req.user.role === "user") {
        next();
    } else {
        res.status(403).send("Usuario no autorizado")
    }
}