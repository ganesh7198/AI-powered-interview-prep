import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import cors from 'cors'
import path from 'path'
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url'
import { connectDB } from './config/db.js';
import authroute from "./routes/auth.route.js"
import sessionroute from "./routes/session.route.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors({
	origin: "*",
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
}));


app.use(cookieParser())
app.use(express.urlencoded());

app.use(express.json());
app.use("/api/v1/auth",authroute)
app.use("/api/v1/session",sessionroute)
//app.use("/api/v1/question",questionroute)
//app.use("/api/ai/generate-question",generateinterviewquestion);
//app.use("/api/ai/generate-explanation",generateconceptexplanation);


app.use('/uploads', express.static(path.join(__dirname, "uploads")));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	connectDB();
	console.log(`App listening at http://localhost:${PORT}`);
});
