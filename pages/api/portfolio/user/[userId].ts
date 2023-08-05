import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .get(async (req, res) => {
    const { userId } = req.query;
    try {
      const response = await prisma.userPortfolio.findMany({
        where: {
          userId: Number(userId),
        },
        include: {
          portfolio: true,
        }
      })
      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching portfolio data: ", error);
    }
  })
  .post(async (req, res) => {
    const { userId } = req.query;
    const { title, link, types, photo } = req.body;

    try {
      const response = await prisma.portfolio.create({
        data: {
          title,
          link,
          types,
          photo,
          users: {
            create: {
              user: {
                connect: {
                  id: Number(userId),
                },
              },
            },
          },
        },
      });
      res
        .status(200)
        .json({ message: "Portfolio created successfully", response });
    } catch (error) {
      console.error("Error during portfolio creation:", error);
    }
  });

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
