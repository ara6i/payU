import express from 'express';
import { initiatePayment, verifyPayment } from '../controllers/paymentController';

const router = express.Router();

router.post('/get-payment', initiatePayment);
router.post('/verify/:txnid', verifyPayment);

export default router; 