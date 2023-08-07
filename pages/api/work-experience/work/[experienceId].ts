import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .get(async (req, res) => {
    const { experienceId } = req.query;
    try {
      const response = await prisma.userExperience.findMany({
        where: {
          experienceId: Number(experienceId),
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
  .delete(async (req, res) => {
    const { experienceId } = req.query;

    try {
      const response = await prisma.experience.delete({
        where: {
          id: Number(experienceId),
        },
      });

      res.status(200).json({ message: "Experience deleted successfully", response });
    } catch (error) {
      console.error("Error during experience deletion:", error);
      res.status(500).json({ error: "An error occurred during deletion" });
    }
  })
  .get("/:experienceId", async (req, res) => {
    const { experienceId } = req.query;

    try {
      const response = await prisma.experience.findUnique({
        where: {
          id: Number(experienceId),
        },
      });

      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching specific work experience data: ", error);
      res.status(500).json({ error: "An error occurred during retrieval" });
    }
  });

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
