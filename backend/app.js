import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import PaymentRoutes from "./routes/PaymentRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";

const app = express();

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", PaymentRoutes);
app.use("/", AdminRoutes);

export default app;
