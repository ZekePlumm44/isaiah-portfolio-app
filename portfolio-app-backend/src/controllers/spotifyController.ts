import axios from "axios";
import querystring from "querystring";
import { Request, Response } from "express";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID || "";
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET || "";
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI || "http://localhost:5000/api/spotify/callback";

let accessToken = "";
let refreshToken = "";

interface ListeningStatus {
    song: string;
    artists: string[];
    album: string;
    albumArt: string;
    isPlaying: boolean;
    spotifyUrl: string;
  }

//Redirect User for Authorization
export const authorizeSpotify = (req: Request, res: Response) => {
  const scopes = [
    "user-read-playback-state",
    "user-read-currently-playing",
  ].join(" ");

  const queryParams = querystring.stringify({
    client_id: SPOTIFY_CLIENT_ID,
    response_type: "code",
    redirect_uri: SPOTIFY_REDIRECT_URI,
    scope: scopes,
  });

  res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
};

//Handle Spotify Callback
export const handleSpotifyCallback = async (req: Request, res: Response): Promise<void> => {
  const authorizationCode = req.query.code as string;

  if (!authorizationCode) {
    res.status(400).send("Authorization code not provided");
    return;
  }

  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      querystring.stringify({
        code: authorizationCode,
        redirect_uri: SPOTIFY_REDIRECT_URI,
        grant_type: "authorization_code",
      }),
      {
        headers: {
          Authorization: `Basic ${Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64")}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    accessToken = response.data.access_token;
    refreshToken = response.data.refresh_token;

    res.status(200).json({ message: "Authorization successful!" });
  } catch (error) {
    console.error("Error during Spotify authorization:", error);
    res.status(500).json({ error: "Failed to authorize with Spotify." });
  }
};

//Fetch Currently Playing Song
export const getCurrentlyPlaying = async (req: Request, res: Response): Promise<void> => {
    if (!accessToken) {
      res.status(401).json({ error: "Unauthorized. Please authenticate with Spotify." });
      return;
    }
  
    try {
      const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      if (response.status === 204 || !response.data) {
        res.status(200).json({
          message: "No song is currently playing.",
        });
        return;
      }
  
      const data = response.data;
      const currentlyPlaying: ListeningStatus = {
        song: data.item.name,
        artists: data.item.artists.map((artist: any) => artist.name),
        album: data.item.album.name,
        albumArt: data.item.album.images[0].url,
        isPlaying: data.is_playing,
        spotifyUrl: data.item.external_urls.spotify,
      };
  
      res.status(200).json(currentlyPlaying);
      return;
    } catch (error) {
      console.error("Error fetching currently playing song:", error);
      res.status(500).json({ error: "Failed to fetch currently playing song." });
      return;
    }
  };