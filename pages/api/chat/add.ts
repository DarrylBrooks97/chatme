import { NextApiRequest, NextApiResponse } from 'next';
import Pusher from 'pusher';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;

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

  const { roomName, message, userName } = body;

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
