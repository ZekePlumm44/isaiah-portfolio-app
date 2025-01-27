import { Router } from "express";
import { getUserMedia } from "../controllers/photoController";

const router = Router();

router.get("/media", getUserMedia);

export default router;

