import { OrderUpdateSchema } from "../schemas"
import { Request, Response } from "express";
import { z } from "zod";
import Order, { Order as OrderModel } from "../models/Order";
const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const newBody = { ...req.body };
    newBody.orderDate = new Date(newBody.orderDate).toISOString();
    newBody.deliveryDate = new Date(newBody.deliveryDate).toISOString();
    // Validate request body against Zod schema
    const validatedData = OrderUpdateSchema.parse(newBody);

    // Find the order by ID
    const orderId = req.params.id;
    const existingOrder = await Order.findById(orderId);
    if (!existingOrder) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    // Update the order
    Object.assign(existingOrder, validatedData);
    const updatedOrder = await existingOrder.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Zod validation error
      res.status(400).json({ message: error.errors });
    } else {
      // Other error (e.g., database error)
      res.status(500).json({ message: (error as Error).message });
    }
  }
};

export default updateOrder;
