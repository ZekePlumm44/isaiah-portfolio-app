import { Request, Response } from "express";
import axios from "axios";

interface Book {
  title: string;
  cover: string;
  authors: string[];
}

export const getCurrentlyReading = async (req: Request, res: Response): Promise<void> => {
  const apiUrl = "https://literal.club/graphql";
  const token = process.env.LITERAL_ACCESS_TOKEN;

  if (!token) {
    res.status(500).json({ error: "LITERAL_ACCESS_TOKEN is not configured in the environment variables." });
    return;
  }

  try {
    const query = `
      query {
        booksByReadingStateAndProfile(state: CURRENTLY_READING) {
          id
          title
          cover
          authors {
            id
            name
          }
        }
      }
    `;

    const response = await axios.post(
      apiUrl,
      { query },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    const books = response.data.data.booksByReadingStateAndProfile;
    if (!books || books.length === 0) {
      res.status(200).json({ message: "No books currently being read." });
      return;
    }

    const firstBook = books[0];
    const formattedBook: Book = {
      title: firstBook.title,
      cover: firstBook.cover,
      authors: firstBook.authors.map((author: { name: string }) => author.name),
    };

    res.status(200).json(formattedBook);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      res.status(error.response?.status || 500).json({
        error: error.response?.data || "Failed to fetch currently reading book",
      });
    } else {
      res.status(500).json({ error: "An unexpected error occurred while communicating with Literal.club API." });
    }
  }
};
