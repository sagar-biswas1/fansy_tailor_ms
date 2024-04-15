// src/models/Order.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface Order extends Document {
  customerID: string; // Assuming userID is a string
  orderSlipNo: string;
  orderStatus: string;
  customerName: string;
  customerEmail: string;
  customerNumber: string;
  price: number;
  orderDate: Date;
  deliveryDate: Date;
}

const OrderSchema: Schema = new Schema({
  customerID: { type: String, required: true },
  orderSlipNo: { type: String, required: true },
  orderStatus: { type: String, required: true },
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerNumber: { type: String, required: true },
  price: { type: Number, required: true },
  orderDate: { type: Date, required: true },
  deliveryDate: { type: Date, required: true },
});

export default mongoose.model<Order>('Order', OrderSchema);
