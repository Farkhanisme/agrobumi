import express from "express";
import {
  getSnapToken,
  getTransaction,
  updateTransaction,
} from "../controllers/PaymentControllers.js";

const router = express.Router();

router.post("/snap-token", getSnapToken);
router.get("/get-transaction", getTransaction);
router.post("update-transaction", updateTransaction);

export default router;
