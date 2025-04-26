import express from "express";
import {
  createSubscription,
  verifySubscription,
  cancelSubscription,
  getSubscription,
} from "../controllers/razorpayController";

const router = express.Router();

// Create a new subscription
router.post("/subscriptions", createSubscription);

// Verify subscription payment
router.post("/verify-subscription", verifySubscription);

// Cancel subscription
router.post("/subscriptions/:subscriptionId/cancel", cancelSubscription);

// Get subscription details
router.get("/subscriptions/:subscriptionId", getSubscription);

export default router; 