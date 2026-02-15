import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({
  path: path.join(__dirname, ".env"),
});
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import authroute from "./routes/auth.route.js";
import sessionroute from "./routes/session.route.js";
import questionroute from "./routes/question.route.js";
import protect from "./middleware/authmiddleware.js";
import { generateinterviewquestion } from "./controllers/aicontroller.js";
import { generateconceptexplanation } from "./controllers/aicontroller.js";

const app = express();

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/api/v1/auth", authroute);
app.use("/api/v1/session", sessionroute);
app.use("/api/v1/question", questionroute);

app.post(
  "/api/ai/generate-question",
  protect,
  generateinterviewquestion
);

app.post(
  "/api/ai/generate-explanation",
  protect,
 generateconceptexplanation
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {

  await connectDB();
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
