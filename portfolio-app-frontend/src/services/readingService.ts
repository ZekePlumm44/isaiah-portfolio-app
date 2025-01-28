import axios from "axios";
import { ReadingStatus } from "../types/readingStatus";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

export const fetchCurrentlyReading = async (): Promise<ReadingStatus | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/reading/currently-reading`);
    
    if (response.data.message) {
      return null;
    }
    return response.data as ReadingStatus;
  } catch (error) {
    console.error("Error fetching currently reading book:", error);
    throw new Error("Failed to fetch currently reading book.");
  }
};
