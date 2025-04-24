import express from 'express';
import { initiatePayment, verifyPayment, createSubscription } from '../controllers/paymentController';

const router = express.Router();

router.post('/get-payment', initiatePayment);
router.post('/verify/:txnid', verifyPayment);
router.post('/create-subscription', createSubscription);

export default router; 