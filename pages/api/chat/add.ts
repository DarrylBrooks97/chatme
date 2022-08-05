import Pusher from 'pusher';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method, headers } = req;
  const { roomName, message, userName } = body;

  const allowedOrigins = [
    `https://chatme-xi.vercel.app/room/${roomName}`,
    'http://localhost:3000/',
  ];

  if (
    !allowedOrigins.includes(headers.origin as string) &&
    process.env.NODE_ENV !== 'development'
  ) {
    res.setHeader('Cache-Control', 'public, max-age=1800');
    res.status(403).json({
      error: 'Forbidden',
    });
    return;
  }

  if (method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID as string,
    key: process.env.PUSHER_API_KEY as string,
    secret: process.env.PUSHER_API_KEY_SECRET as string,
    cluster: process.env.PUSHER_CLUSTER as string,
  });

  const r = await pusher?.trigger(`cache-${roomName}`, 'new-message', {
    message,
    userName,
    time: new Date().toISOString(),
  });

  if (!r.ok) {
    res.status(400).json({
      message: 'Message failed sending',
    });
  }

  res.status(200).json({
    message: 'Message sent',
  });
}
