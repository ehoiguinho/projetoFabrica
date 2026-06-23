import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next){
    try {
        let token = req.cookies.token;

        if(!token){
            return res.status(401).json({
                msg: "Token não informado!"
            });
        }

        let payload = jwt.verify(token, process.env.JWT_SECRET);

        req.adminLogado = payload;

        next();

    } catch(error) {
        return res.status(401).json({
            msg: "Token inválido ou expirado!"
        });
    }
}