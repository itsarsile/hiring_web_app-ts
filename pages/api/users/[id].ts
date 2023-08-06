import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";

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
                position: true
              }
            }
          }
        },
        workerProfile: {
          select: {
            workPlace: true,
            currentJob: true,
            province: {
              select: {
                name: true,
                cities: {
                  select: {
                    name: true,
                  },
                },
              },
            },
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
    const { name, workPlace, currentJob, bio } = req.body
    try {
      const response = await prisma.user.update({
        where: { id: Number(id) },
        data: {
          name,
          bio,
          workerProfile :{
            update: {
              currentJob,
              workPlace
            }
          }
        }
      })

    } catch (error) {
      console.error("Error during updating profile:", error);
      
    }
  })

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
