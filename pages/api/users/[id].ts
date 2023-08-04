import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import {createRouter, expressWrapper} from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.
get(async (req, res) => {
  const { id } = req.query;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: {
        name: true,
        bio: true,
        skills: true,
        photo: true,
        workerProfile: {
          select: {
            workPlace: true,
            province: {
              include: {
                cities: true,
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

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
