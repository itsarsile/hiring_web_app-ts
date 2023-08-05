import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const users = await prisma.user.findMany({
        where: {
            role: 'WORKER',
        },
        select: {
            id: true,
            name: true,
            skills: true,
            photo: true,
            workerProfile: {
                select: {
                  currentJob: true,
                  workPlace: true,
                    province: {
                        select: {
                            cities: true,
                        }
                    }
                }
            },
        }
    });

    return res.status(200).json({ users: users });
  } catch (error) {
    console.error("Error fetching user data: ", error);
  }
}
