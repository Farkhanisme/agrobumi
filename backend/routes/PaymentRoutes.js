import express from "express";
import {
  emailNotif,
  getSnapToken,
  getTransaction,
  getUser,
  updateTransaction,
} from "../controllers/PaymentControllers.js";

const router = express.Router();

router.post("/snap-token", getSnapToken);
router.post("/send-notification", emailNotif);
router.get("/get-transaction", getTransaction);
router.post("/update-transaction/:order_id", updateTransaction);
router.get("/get-user", getUser);

export default router;
