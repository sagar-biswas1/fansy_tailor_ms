import { z } from 'zod';


// Define Zod schema for order data validation
export const OrderCreateSchema = z.object({
  customerID: z.string(),
  orderSlipNo: z.string(),
  orderStatus: z.string(),
  customerName: z.string(),
  customerEmail:z.string(),
  customerNumber: z.string(),
  price: z.number(),
  orderDate: z.string().pipe(z.coerce.date()).optional(),
  deliveryDate: z.string().pipe(z.coerce.date()).optional(),
});

export const OrderUpdateSchema =OrderCreateSchema.partial()
