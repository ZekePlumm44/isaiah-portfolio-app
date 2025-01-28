import axios from "axios";
import { ListeningStatus } from "../types/listeningStatus";

// Use Vite's way to access environment variables
const apiUrl = import.meta.env.API_BASE_URL;

export const fetchCurrentlyPlaying = async (): Promise<ListeningStatus | null> => {
  try {
    const response = await axios.get(`${apiUrl}/api/spotify/currently-playing`);
    console.log(response.data);
    if (response.data.message) {
      return null;
    }
    return response.data as ListeningStatus;
  } catch (error) {
    console.error("Error fetching currently playing song:", error);
    throw new Error("Failed to fetch currently playing song.");
  }
};
