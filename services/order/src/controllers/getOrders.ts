// controllers/orderController.ts
import { Request, Response } from "express";
import Order, { Order as OrderModel } from "../models/Order";

 const getOrders = async (req: Request, res: Response) => {
  try {
    const orders: OrderModel[] = await Order.find();
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: (error as Error).message });
  }
};


export default getOrders