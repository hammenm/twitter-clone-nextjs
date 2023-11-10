import type { NextApiRequest, NextApiResponse } from 'next';
import { sign } from 'jsonwebtoken';
import prisma from '@/lib/db';
import { User } from '@prisma/client';

async function POST(req: NextApiRequest, res: NextApiResponse) {
  const { name, handle, password } = req.body;

  const avatarNumber = Math.floor(Math.random() * 9);
  const user = await prisma.user.create({
    data: {
      name,
      handle,
      password,
      avatar: `https://randomuser.me/api/portraits/lego/${avatarNumber}.jpg`,
    },
  });

  const userCopied = { ...user } as Partial<User>;
  delete userCopied.password;

  res.status(200).json({
    user,
    token: sign(userCopied, process.env.JWT_SECRET as string, {
      expiresIn: '1d',
    }),
  });
}

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'method not allowed, please use POST' });
    return;
  }

  return POST(req, res);
}
