import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .get(async (req, res) => {
    const { userId } = req.query;
    try {
      const response = await prisma.userExperience.findMany({
        where: {
          userId: Number(userId),
        },
        include: {
          experience: true,
        }
      })
      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching work experience data: ", error);
    }
  })
  .post(async (req, res) => {
    const { userId } = req.query;
    const { position, companyName, description, startAt, endedAt } = req.body;

    try {
      const response = await prisma.experience.create({
        data: {
            companyName,
            position,
            description,
            startAt,
            endedAt,
            users: {
                create: {
                    user: {
                        connect: {
                            id: Number(userId)
                        }
                    }
                }
            }
        }
      })
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
