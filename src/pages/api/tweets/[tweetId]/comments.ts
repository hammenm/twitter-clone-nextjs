import { NextApiRequest, NextApiResponse } from 'next';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/db';

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { tweetId } = req.query;
  const { text } = req.body;

  const user = await getAuthUser(req);

  if (!user) {
    res.status(401).json({ error: 'not authenticated' });
    return;
  }

  if (!text) {
    res.status(400).json({ error: 'text is required' });
    return;
  }

  if (typeof text !== 'string') {
    res.status(400).json({ error: 'text must be a string' });
    return;
  }

  const tweet = await prisma.tweet.findUnique({
    where: {
      id: Number(tweetId),
    },
  });

  if (!tweet) {
    res.status(404).json({ error: 'tweet not found' });
    return;
  }

  const comment = await prisma.tweet.create({
    data: {
      authorHandle: user.handle,
      text,
      parentTweetId: tweet.id,
    },
  });

  res.status(200).json({ comment });
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
