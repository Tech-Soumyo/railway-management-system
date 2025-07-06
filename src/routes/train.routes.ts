import { Router } from "express";
import {
  checkAvailabilityOfTrain,
  createTrain,
} from "../controllers/train.controller";
import { restrictToAdmin } from "../middleware/admin.middleware";

const router = Router();

router.post("/", restrictToAdmin, createTrain);
router.get("/availability", checkAvailabilityOfTrain);

export default router;
