import { newPayment, checkStatus } from "./../Controllers/paymentController.js";
import express from "express";
const router = express();

router.post("/payment", newPayment);
router.get("/check-status", checkStatus);

export default router;
