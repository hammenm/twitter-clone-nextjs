import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

async function GET(req: NextApiRequest, res: NextApiResponse) {
  const { userHandle } = req.query;

  const user = await prisma.user.findUnique({
    where: {
      handle: String(userHandle),
    },
    include: {
      tweets: {
        where: {
          parentTweetId: null,
        },
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
        orderBy: {
          timestamp: 'desc',
        },
      },
    },
  });

  if (!user) {
    res.status(404).json({ error: 'user not found' });
    return;
  }

  res.status(200).json(user);
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
