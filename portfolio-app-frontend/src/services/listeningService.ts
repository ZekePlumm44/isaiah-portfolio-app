import axios from "axios";
import { ListeningStatus } from "../types/ListeningStatus";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
  
export const fetchCurrentlyPlaying = async (): Promise<ListeningStatus | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/spotify/currently-playing`);
    if (response.data.message) {
      return null;
    }
    return response.data as ListeningStatus;
  } catch (error) {
    console.error("Error fetching currently playing song:", error);
    throw new Error("Failed to fetch currently playing song.");
  }
};
