import 'colors';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import paymentRoutes from './routes/paymentRoutes';
import razorpayRoutes from './routes/razorpayRoutes';

const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use('/', paymentRoutes);
app.use('/razorpay', razorpayRoutes);

// run the application
app.listen(port, () => {
  console.log(`the app is listen at http://localhost:${port}`.bgCyan.white);
}); 