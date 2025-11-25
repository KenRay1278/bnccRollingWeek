import { Router } from "express";
import {
  getFeedbacks,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} from "../controllers/feedbackController.js";

const router = Router();

router.get("/", getFeedbacks);
router.post("/", createFeedback);
router.put("/:id", updateFeedback);
router.delete("/:id", deleteFeedback);

export default router;