import { Request, Response } from 'express';
import axios from 'axios';
import { ReadingStatus } from '../types/readingStatus';

const LITERAL_USER_ID = process.env.LITERAL_USER_ID || '';
const LITERAL_ACCESS_TOKEN = process.env.LITERAL_ACCESS_TOKEN || '';
const LITERAL_API_URL = process.env.LITERAL_API_URL || '';

let cachedReadingStatus: ReadingStatus | null = null;

export async function fetchCurrentlyReading() {
  const apiUrl = LITERAL_API_URL;
  const token = LITERAL_ACCESS_TOKEN;

  if (!token) {
    console.error('LITERAL_ACCESS_TOKEN is not configured in the environment variables.');
    return;
  }

  try {
    const response = await axios.post(apiUrl, {
      query: `
        query booksByReadingStateAndProfile($profileId: String!) {
          booksByReadingStateAndProfile(
            limit: 1
            offset: 0
            readingStatus: IS_READING
            profileId: $profileId
          ) {
            slug
            title
            cover
            authors {
              name
            }
            gradientColors
          }
        }
      `,
      variables: {
        profileId: LITERAL_USER_ID,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const book = response.data.data.booksByReadingStateAndProfile[0];
    cachedReadingStatus = {
      title: book.title,
      cover: book.cover,
      authors: book.authors.map((author: { name: string }) => author.name),
      url: `https://literal.club/book/${book.slug}`,
      gradientColors: book.gradientColors,
    };
  } catch (error: unknown) {
    console.error(error);
    if (axios.isAxiosError(error)) {
      console.error(
        'An unexpected error occurred while communicating with Literal.club API.',
        error,
      );
    } else {
      console.error('Failed to fetch currently reading book', error);
    }
  }
}

export const getCurrentlyReading = async (req: Request, res: Response): Promise<void> => {
  if (cachedReadingStatus) {
    res.status(200).json(cachedReadingStatus);
  } else {
    res.status(200).json({ message: 'Nothing currently reading' });
  }
};
