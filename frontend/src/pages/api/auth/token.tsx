import type { NextApiRequest, NextApiResponse } from 'next';

const REDIRECT_URI = process.env.NEXT_PUBLIC_CALENDLY_REDIRECT_URI;
const CLIENT_ID = process.env.NEXT_PUBLIC_CALENDLY_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_CALENDLY_CLIENT_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { code } = req.body;

  const encodedParams = new URLSearchParams({
    grant_type: 'authorization_code',
    code: code as string,
    redirect_uri: REDIRECT_URI as string,
  });

  const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');

  try {
    const response = await fetch('https://auth.calendly.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`,
      },
      body: encodedParams.toString(),
    });
    const data = await response.json();
    // console.log(response.status, data);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to exchange token' });
  }
}