// src/server.ts
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { createOrder, getOrders } from './controllers';
import dotenv from 'dotenv';
import updateOrder from './controllers/updateOrder';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 4008;

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL || '')
.then(() => {
  console.log("MongoDB connected successfully");
})
.catch((error: Error) => {
  console.error("MongoDB connection error:", error.message);
});

// Middleware
app.use(bodyParser.json());

//health
app.get('/health', (_req, res) => {
	res.status(200).json({ status: 'UP' });
});

// Routes
// Routes
app.get('/order', getOrders);
app.post('/order', createOrder);
app.put('/order/:id', updateOrder);


// 404 handler
app.use((_req, res) => {
	res.status(404).json({ message: 'Not found' });
});

// Error handler
app.use((err, _req, res, _next) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Internal server error...' });
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
