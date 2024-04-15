import { OrderCreateSchema } from "../schemas";
import { z } from 'zod';
// controllers/orderController.ts
import { Request, Response } from "express";
import Order, { Order as OrderModel } from "../models/Order";

const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const newBody={...req.body}
    console.log(newBody)
    newBody.orderDate = new Date(newBody.orderDate).toISOString();
    newBody.deliveryDate = new Date(newBody.deliveryDate).toISOString();
    console.log(newBody);
    const parsedBody = OrderCreateSchema.parse(newBody);
    // parsedBody.orderDate= new Date();
    // parsedBody.deliveryDate= new Date();
    const order = new Order(parsedBody);
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Zod validation error
      console.log("error 22")
      res.status(400).json({ message: error.errors });
    } else {
      // Other error (e.g., database error)
      console.log("error 26")
      res.status(500).json({ message: (error as Error).message });
    }
  }
};

export default createOrder;
