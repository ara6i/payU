import 'colors';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import paymentRoutes from './routes/paymentRoutes';

dotenv.config({
  path: './.env'
});

const app = express();
const port = process.env.PORT || 4500;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// routes
app.use('/', paymentRoutes);

// run the application
app.listen(port, () => {
  console.log(`the app is listen at http://localhost:${port}`.bgCyan.white);
}); 