import { Router } from "express";
import authRoutes from "./auth.route";
import trainRoutes from "./train.routes";
import bookingRoutes from "./booking.route";
const router = Router();

router.use("/auth", authRoutes);
router.use("/trains", trainRoutes);
router.use("/bookings", bookingRoutes);
export default router;
