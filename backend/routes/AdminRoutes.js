import express from "express";
import {
  ambilLibur,
  deleteUser,
  hapusLibur,
  login,
  signup,
  tambahLibur,
  updateUser,
} from "../controllers/AdminControllers.js";

const router = express.Router();

router.post("/login", login);
router.post("/sign-up", signup);
router.post("/tambah-libur", tambahLibur);
router.get("/ambil-libur", ambilLibur);
router.post("/hapus-libur/:id", hapusLibur);
router.post("/update-users/:id", updateUser);
router.post("/delete-users/:id", deleteUser);

export default router;
