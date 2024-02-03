import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getMethod = async(req: Request, res: Response) => {
    try {
        const result = await prisma.pedidos.findMany();
        return res.status(200).json(result);        
    } catch (error) {
        console.log("error::controller::pedidos", error);
        return res.status(500).json(error);
    }
}

const getMethodById = async(req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const result = await prisma.pedidos.findUnique({ where: {id: id}});
        return res.status(200).json(result);        
    } catch (error) {
        console.log("error::controller::pedidos", error);
        return res.status(500).json(error);
    }
}

const postMethod = async(req: Request, res: Response) => {
    try {
        const {body} = req
        let subtotal = 0;
        let total = 0;

        //array de pedidos items
        body.pedidosItems = body.pedidosItems.map( (item: any) => {
            const nuevoObjeto = {productoId: item.productoId, subtotal: (item.precio * item.cantidad).toString(), cantidad: item.cantidad}
            return nuevoObjeto;
        });

        //construcción del objeto pedido
        total = body.pedidosItems.reduce((acumulador:number, item: any) => acumulador + parseInt(item.subtotal), 0);
        let bodyPedido = {clienteId:'',subtotal:'',total:'',pedidosItems: {}}
        bodyPedido.clienteId = body.clienteId
        bodyPedido.subtotal = total.toString();
        bodyPedido.total = total.toString();
        bodyPedido.pedidosItems = {create: body.pedidosItems};

        console.log(bodyPedido)
        console.log(body.pedidosItems)

        const resultPedido = await prisma.pedidos.create({data: bodyPedido});
        //const resultItems = await prisma.pedidosItems.createMany({data: body.pedidosItems});
        console.log("finalizado");
        return res.status(200).json(resultPedido);  

    } catch (error) {
        console.log("error::controller::pedidos", error);
        return res.status(500).json(error);
    }
}

const putMethod = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {body} = req
    try {
        const result = await prisma.pedidos.update({
            where: {id: id},
            data: body
        });
        return res.status(200).json(result);        
    } catch (error) {
        console.log("error::controller::pedidos", error);
        return res.status(500).json(error);
    }
}

const deleteMethod = async(req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const result = await prisma.pedidos.delete({
            where: {id: id}
        });
        return res.status(200).json(result);        
    } catch (error) {
        console.log("error::controller::pedidos", error);
        return res.status(500).json(error);
    }
}

export {
    getMethod,
    getMethodById,
    postMethod,
    putMethod,
    deleteMethod 
}