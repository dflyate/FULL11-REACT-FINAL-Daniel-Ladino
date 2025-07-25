import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getMethod = async(req: Request, res: Response) => {
    try {
        const result = await prisma.productos.findMany();
        return res.status(200).json(result);        
    } catch (error) {
        console.log("error::controller::productos", error);
        return res.status(500).json(error);
    }
}

const getMethodById = async(req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const result = await prisma.productos.findUnique({ where: {id: parseInt(id)}});
        return res.status(200).json(result);        
    } catch (error) {
        console.log("error::controller::productos", error);
        return res.status(500).json(error);
    }
}

const getMethodByCategoriaId = async(req: Request, res: Response) => {
    const {categoriaId} = req.params;
    try {
        const result = await prisma.productos.findMany({ where: {categoriaId: parseInt(categoriaId)}});
        return res.status(200).json(result);    
    } catch (error) {
        console.log("error::controller::productos", error);
        return res.status(500).json(error);
    }
}

const postMethod = async(req: Request, res: Response) => {
    try {
        const {body} = req
        const data = {
          ...body,
          categoriaId: Number(body.categoriaId)
        };
        console.log(data)
        const result = await prisma.productos.create({data: data});
        return res.status(200).json(result);        
    } catch (error) {
        console.log("error::controller::productos", error);
        return res.status(500).json(error);
    }
}

const putMethod = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {body} = req
    body.fechaActualizacion = new Date();
    try {
        const result = await prisma.productos.update({
            where: {id: parseInt(id)},
            data: body
        });
        return res.status(200).json(result);        
    } catch (error) {
        console.log("error::controller::productos", error);
        return res.status(500).json(error);
    }
}

const deleteMethod = async(req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const result = await prisma.productos.delete({
            where: {id: parseInt(id)}
        });
        return res.status(200).json(result);        
    } catch (error) {
        console.log("error::controller::productos", error);
        return res.status(500).json(error);
    }
}

export {
    getMethod,
    getMethodById,
    getMethodByCategoriaId,
    postMethod,
    putMethod,
    deleteMethod 
}