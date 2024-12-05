import express from "express";
import { ambilLibur, hapusLibur, login, signup, tambahLibur } from "../controllers/AdminControllers.js";

const router = express.Router();

router.post("/login", login);
router.post("/sign-up", signup);
router.post("/tambah-libur", tambahLibur)
router.get("/ambil-libur", ambilLibur)
router.post("/hapus-libur/:id", hapusLibur)

export default router;
