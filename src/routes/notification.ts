import express from "express";
import { authenticate } from "@/middlewares/authentication";
import { getNotification, readNotification } from "@/controllers/notification";
import { errorHandler } from "@/middlewares/errorHandler";

const router = express.Router();

router.get("/notifications", authenticate, getNotification, errorHandler)
router.post("/notifications/:id/read", authenticate, readNotification, errorHandler)

export default router;
