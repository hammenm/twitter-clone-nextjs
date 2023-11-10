const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const alan = await prisma.user.upsert({
    where: { handle: 'alan' },
    update: {},
    create: {
      handle: 'alan',
      name: 'Alan Smith',
      password: 'password',
      avatar: 'https://randomuser.me/api/portraits/men/89.jpg',
    },
  });
  const kylie = await prisma.user.upsert({
    where: { handle: 'kylie' },
    update: {},
    create: {
      handle: 'kylie',
      name: 'Kylie Flores',
      password: 'password',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      tweets: {
        create: [
          {
            text: 'What a beautiful day!',
            comments: {
              create: [
                {
                  text: 'I agree!',
                  author: { connect: { handle: 'alan' } },
                },
              ],
            },
          },
        ],
      },
    },
  });
  const perry = await prisma.user.upsert({
    where: { handle: 'perry' },
    update: {},
    create: {
      handle: 'perry',
      name: 'Perry Foster',
      password: 'password',
      avatar: 'https://randomuser.me/api/portraits/men/50.jpg',
      tweets: {
        create: [
          {
            text: 'Hello World',
            comments: {
              create: [
                {
                  text: 'Nice tweet!',
                  author: { connect: { handle: 'kylie' } },
                },
                {
                  text: 'What ?',
                  author: { connect: { handle: 'alan' } },
                  likes: {
                    create: [
                      {
                        user: { connect: { handle: 'kylie' } },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  });
  console.log({ alan, kylie, perry });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
