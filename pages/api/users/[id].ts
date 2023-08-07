import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .get(async (req, res) => {
    const { id } = req.query;
    try {
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        select: {
          id: true,
          name: true,
          bio: true,
          photo: true,
          skills: true,
          domicile: true,
          portfolios: {
            select: {
              portfolio: {
                select: {
                  id: true,
                  title: true,
                  photo: true,
                  link: true,
                  types: true,
                },
              },
            },
          },
          experiences: {
            select: {
              experience: {
                select: {
                  id: true,
                  companyName: true,
                  description: true,
                  endedAt: true,
                  startAt: true,
                  position: true,
                },
              },
            },
          },
          workerProfile: {
            select: {
              workPlace: true,
              currentJob: true,
            },
          },
          recruiterProfile: {
            select: {
              companyName: true,
              companySegment: true,
              companyInfo: true,
              companyDomicile: true,
              companyEmail: true,
              companyPhone: true,
            },
          },
          password: false,
        },
      });

      if (user) {
        return res.status(200).json({ user: user });
      }

      return res.status(404).json({ error: "User not found" });
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  })
  .patch(async (req, res) => {
    const { id } = req.query;
    const { name, workPlace, domicile, currentJob, bio, avatar } =
      req.body;
    try {
      await prisma.user.update({
        where: { id: Number(id) },
        data: {
          name,
          bio,
          domicile,
          photo: avatar,
          workerProfile: {
            update: {
              currentJob,
              workPlace,
            }
          }
        },
      });
      return res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
      console.error("Error during updating profile:", error);
    }
  });

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
