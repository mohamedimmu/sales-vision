import express from "express";
import { getStats } from "../controllers/sales.js";

const router = express.Router();

router.get("/stats", getStats);

export default router;
