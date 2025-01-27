import { Router } from "express";
import { submitContactForm } from "../controllers/contactController";
import contactRateLimiter from "../middleware/contactRateLimiter";

const router = Router();
router.post("/", contactRateLimiter, submitContactForm);

export default router;
 