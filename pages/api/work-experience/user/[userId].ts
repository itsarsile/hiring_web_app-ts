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
  })
  .patch(async (req, res) => {
    const { experienceId } = req.body;

    try {
      const response = await prisma.experience.update({
        where: {
          id: Number(experienceId),
        },
        data: {
          position: req.body.position,
          companyName: req.body.companyName,
          description: req.body.description,
          startAt: req.body.startAt,
          endedAt: req.body.endedAt,
        },
      });

      res.status(200).json({ message: "Experience updated successfully", response });
    } catch (error) {
      console.error("Error during experience update:", error);
      res.status(500).json({ error: "An error occurred during update" });
    }
  })
  .delete(async (req, res) => {
    const { experienceId } = req.body;

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
