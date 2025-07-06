import { Router } from "express";
import { seatBooking, getBooking } from "../controllers/booking.controller";
import { authenticationChecking } from "../middleware/auth.middleware";

const router = Router();

router.post("/", authenticationChecking, seatBooking);
router.get("/:bookingId", authenticationChecking, getBooking);

export default router;
