import { Request, Response } from "express";
import axios from "axios";
/**
 * Fetches the currently reading list from Literal.club API
 */
export const getCurrentlyReading = async (req: Request, res: Response): Promise<void> => {
  const apiUrl = "https://literal.club/api/v1/me"; // Replace with the actual Literal.club endpoint
  const token = process.env.LITERAL_ACCESS_TOKEN;

  if (!token) {
    res.status(500).json({ error: "LITERAL_ACCESS_TOKEN is not configured in the environment variables." });
    return;
  }

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    res.status(200).json(response.data); // Return the data to the frontend
  } catch (error: unknown) {
    console.error("Literal.club API error:", error);

    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json({
        error: error.response?.data || "Failed to fetch currently reading list",
      });
    } else {
      res.status(500).json({ error: "An unexpected error occurred while communicating with Literal.club API." });
    }
  }
};
