import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { text } = req.body;

  const user = await getAuthUser(req);

  if (!user) {
    res.status(401).json({ error: 'not authenticated' });
    return;
  }

  const tweet = await prisma.tweet.create({
    data: {
      text,
      authorHandle: user.handle,
    },
  });

  res.status(200).json({ tweet });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'POST':
      return POST(req, res);
    default:
      res.status(405).json({ error: 'method not allowed, please use POST' });
  }
}
