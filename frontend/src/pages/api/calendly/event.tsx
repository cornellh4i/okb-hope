import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { eventURI, token } = req.body;

  try {
    const response = await fetch(eventURI, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }
    });

    console.log("Response status:", response.status);
    const data = await response.json();
    console.log("Response data:", data);

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: 'Failed to get event' });
  }
}