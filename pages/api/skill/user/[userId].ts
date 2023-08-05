import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .get(async (req, res) => {
    const { userId } = req.query;
    try {
      const response = await prisma.user.findMany({
        where: {id: Number(userId)},
        select: {
            skills: true,
        }
      })
      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching work experience data: ", error);
    }
  })
  .patch(async (req, res) => {
    const { userId } = req.query;
    const { skills } = req.body;
    const skillsString = skills.join(", ")
    try {
      const response = await prisma.user.update({
        where: { id: Number(userId) },
        data: {
          skills: skillsString,
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
