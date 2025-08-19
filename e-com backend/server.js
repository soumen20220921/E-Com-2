import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser"; // Explicitly importing body-parser
import { Db } from "./Db/db.js";
import userRouters from "./Routes/userRouter.js";
import productRouter from "./Routes/productRouter.js";
import cartRouter from "./Routes/cartRoutes.js";
import addressRouter from "./Routes/addressRoutes.js";
import paymentRouter from "./Routes/paymentRouter.js";
import phonepeRouter from "./Routes/phonepeRoute.js";
import { Image } from "./Models/uploadImage.js";
import path from "path";
import { fileURLToPath } from "url"; // Import for ES module __dirname
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static("../uploads"));

// Middleware to increase payload size
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

// If using body-parser explicitly (optional, for compatibility)
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

// Enable CORS
app.use(cors());

// Database connection
Db();

// Debug middleware to log request size
// app.use((req, res, next) => {
//     console.log(`Request size: ${req.headers["content-length"] || "unknown"} bytes`);
//     next();
// });

// Test routes
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// Routers
app.use("/api/user", userRouters);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/phonepe", phonepeRouter);

// Serve image by ID
app.get("/img/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id); // Ensure asynchronous operation is handled
    if (!image) {
      return res
        .status(404)
        .json({ message: "Image not found", success: false });
    }
    const imagePath = path.join(__dirname, "../uploads", image.filename);
    res.sendFile(imagePath);
  } catch (error) {
    res.status(500).json({
      message: "Error occurred while fetching image",
      success: false,
      ErrorMessage: error.message,
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
