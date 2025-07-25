import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const tokenMiddlware = (req: Request, res: Response, next: NextFunction) => {

    console.log("mostrando req", req.originalUrl);
    console.log("mostrando method", req.method);

    //validar rutas permitidas o publicas
    if(req.originalUrl == '/api/usuarios' && req.method == 'POST'){
        return next();
    }

    if(req.originalUrl == '/api/usuarios/login' && req.method == 'POST'){
        return next();
    }

    const bearerToken = req.headers.authorization;
    const tokenHandler = bearerToken?.replace('Bearer ', '');

    if(!tokenHandler) return res.status(401).json({message: 'Authorization header is mandatory'});

    //Verificar el token
    jwt.verify(tokenHandler, 'u-catalunya-2023',  (err:any, decoded:any) => {
        if(err) return res.status(401).json({message: 'Token is invalid'});
        next();
    })

}

export {
    tokenMiddlware
}