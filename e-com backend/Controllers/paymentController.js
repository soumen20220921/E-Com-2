import dotenv from "dotenv";
import pkg from "pg-sdk-node";
import { Payment } from "../Models/PaymentSchema.js";
import { Product } from "../Models/ProductSchema.js";
const { StandardCheckoutClient, Env, StandardCheckoutPayRequest } = pkg;
import mongoose from "mongoose";

dotenv.config();

const clientId = `TEST-DARSHONLINE_2504141`;
const clientSecret = "ZGQ4MDM2MmMtZWJmNC00YmE3LTgwNjgtOTllNmZmYTg1Yzdm";
const clientVersion = 1;
// const env = Env.PRODUCTION;
const env = Env.SANDBOX; // Use TEST environment for development

const client = StandardCheckoutClient.getInstance(
  clientId,
  clientSecret,
  clientVersion,
  env
);

export const newPayment = async (req, res) => {
  try {
    const { amount, MUID, transactionId, cartItems, usershipping, userId } =
      req.body;

    if (
      !userId ||
      !amount ||
      !usershipping ||
      !MUID ||
      !transactionId ||
      !cartItems
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const merchantOrderId = transactionId; // Use transactionId from frontend
    const redirectUrl = `http://localhost:8000/api/phonepe/check-status?merchantOrderId=${merchantOrderId}`;

    const request = StandardCheckoutPayRequest.builder()
      .merchantOrderId(merchantOrderId)
      .amount(amount * 100) // PhonePe expects amount in paise
      .redirectUrl(redirectUrl)
      .build();

    const response = await client.pay(request);
    if (response) {
      const orderConfirm = await Payment.create({
        marchentId: MUID,
        transactionId,
        amount,
        orderItems: cartItems,
        userId,
        userShipping: usershipping,
        payStatus: "Not Paid",
        orderAccept: false,
        orderReject: false,
        trackingId: "",
      });
    }
    console.log("Redirecting to PhonePe:", response.redirectUrl);

    // Send redirect URL to frontend
    res.status(200).json({ redirectUrl: response.redirectUrl });
  } catch (error) {
    console.error("Error in newPayment:", error.message);
    res.status(500).json({
      message: error,
      success: false,
    });
  }
};

export const checkStatus = async (req, res) => {
  try {
    const { merchantOrderId } = req.query;
    console.log("Checking status for merchantOrderId:", merchantOrderId);
    if (!merchantOrderId) {
      return res.redirect("http://localhost:3001");
    }

    // Get payment status from PhonePe
    const response = await client.getOrderStatus(merchantOrderId);
    const state = response.state;
    console.log("Order status from PhonePe:", state);

    // Find the payment record using merchantOrderId (transactionId)
    let orderConfirm = null;

    if (state === "COMPLETED") {
      orderConfirm = await Payment.findOneAndUpdate(
        { transactionId: merchantOrderId },
        { payStatus: "paid" },
        { new: true }
      );
    } else {
      orderConfirm = await Payment.findOne({ transactionId: merchantOrderId });
    }

    if (!orderConfirm) {
      console.log("❌ Payment not found for:", merchantOrderId);
      return res.redirect("http://localhost:3001");
    }

    // Only update inventory if payment is successful
    if (state === "COMPLETED") {
      const cartItems = orderConfirm.orderItems;

      const findAndUpdateProduct = async (productId, qty) => {
        try {
          const objectId = new mongoose.Types.ObjectId(productId);
          const product = await Product.findById(objectId);

          if (!product) {
            console.log(`❌ Product not found: ${productId}`);
            return;
          }

          const newQty = (Number(product.Quantity) || 0) - qty;
          await Product.findByIdAndUpdate(
            objectId,
            { Quantity: newQty },
            { new: true }
          );
        } catch (error) {
          console.error("❌ Error updating product:", error.message);
        }
      };

      const updatePromises = cartItems.map((item) =>
        findAndUpdateProduct(item.productId, item.qty)
      );
      await Promise.all(updatePromises);
    }

    // Redirect based on status
    if (state === "COMPLETED") {
      return res.redirect("http://localhost:3001");
    } else {
      return res.redirect("hhttp://localhost:3001");
    }
  } catch (error) {
    console.error("Error in checkStatus:", error);
    return res.redirect("http://localhost:3001");
  }
};
