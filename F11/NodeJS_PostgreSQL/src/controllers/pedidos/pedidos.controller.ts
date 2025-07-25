import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { Prisma } from '@prisma/client';

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
        const result = await prisma.pedidos.findUnique({ where: {id: parseInt(id)}});
        return res.status(200).json(result);        
    } catch (error) {
        console.log("error::controller::pedidos", error);
        return res.status(500).json(error);
    }
}

const postMethod = async (req: Request, res: Response) => {
  try {
    const { body } = req;

    // Convertir clienteId a número
    const clienteId = Number(body.clienteId);

    // Validar y mapear los pedidosItems
    let subtotal = 0;
    const pedidosItems = body.pedidosItems.map((item: any) => {
      const itemSubtotal = Number(item.precio) * Number(item.cantidad);
      subtotal += itemSubtotal;

      return {
        productoId: Number(item.productoId),
        cantidad: Number(item.cantidad),
        subtotal: new Prisma.Decimal(itemSubtotal),
      };
    });

    // Crear el objeto del pedido
    const bodyPedido = {
      clienteId, // number
      subtotal: new Prisma.Decimal(subtotal),
      total: new Prisma.Decimal(subtotal), // en este caso subtotal y total son iguales
      pedidosItems: {
        create: pedidosItems,
      },
    };

    // Crear pedido y sus items
    const resultPedido = await prisma.pedidos.create({
      data: bodyPedido,
    });

    console.log("Pedido creado correctamente");
    return res.status(200).json(resultPedido);

  } catch (error) {
    console.log("error::controller::pedidos", error);
    return res.status(500).json({ error: "Error al crear el pedido", detalles: error });
  }
};

const putMethod = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {body} = req
    try {
        const result = await prisma.pedidos.update({
            where: {id: parseInt(id)},
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
            where: {id: parseInt(id)}
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