import { Router } from "express";
import { authorizeSpotify, handleSpotifyCallback, getCurrentlyPlaying } from "../controllers/spotifyController";

const router = Router();
// Spotify routes

router.get("/authorize", authorizeSpotify); // Step 1: Authorize
router.get("/callback", handleSpotifyCallback); // Step 2: Handle Callback
router.get("/currently-playing", getCurrentlyPlaying); // Step 3: Fetch Currently Playing

export default router;
