import { Router } from "express";
import { authorizeSpotify, handleSpotifyCallback, getCurrentlyPlaying } from "../controllers/spotifyController";

const router = Router();

router.get("/authorize", authorizeSpotify);
router.get("/callback", handleSpotifyCallback);
router.get("/currently-playing", getCurrentlyPlaying);

export default router;
