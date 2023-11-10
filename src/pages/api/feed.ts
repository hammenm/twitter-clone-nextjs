import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const tweets = await prisma.tweet.findMany({
    include: {
      author: true,
      likes: true,
      comments: {
        include: {
          author: true,
          likes: true,
        },
      },
    },
    where: {
      parentTweetId: null,
    },
    orderBy: {
      timestamp: 'desc',
    },
  });
  res.status(200).json(tweets);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  switch (req.method) {
    case 'GET':
      return GET(req, res);
    default:
      return res
        .status(405)
        .json({ error: 'method not allowed, please use GET' });
  }
}
