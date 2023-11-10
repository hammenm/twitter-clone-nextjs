import { NextApiRequest, NextApiResponse } from 'next';
import { getAuthUser } from '@/lib/auth';
import prisma from '@/lib/db';

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { tweetId } = req.query;

  const user = await getAuthUser(req);

  if (!user) {
    res.status(401).json({ error: 'not authenticated' });
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

  const favorite = await prisma.like.create({
    data: {
      tweetId: tweet.id,
      userHandle: user.handle,
    },
  });

  res.status(200).json({ favorite });
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
