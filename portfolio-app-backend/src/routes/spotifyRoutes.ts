import { Router, Request, Response } from "express";
import { getCurrentlyPlaying } from "../controllers/spotifyController";

const router = Router();

router.get("/currently-playing", getCurrentlyPlaying);

export default router;
