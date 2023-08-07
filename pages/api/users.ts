// api/users/search.ts
import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

const DEFAULT_ITEMS_PER_PAGE = 1;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || DEFAULT_ITEMS_PER_PAGE;
  const { query, filter } = req.query; // Get the search query and filter from query parameters
  console.log(query, filter)
  try {
    let whereCondition: any = {
      role: 'WORKER',
    };

    if (filter === "name") {
      whereCondition.name = {
        contains: (query as string).toLowerCase(),
      };
    }

    const totalUsers = await prisma.user.count({
      where: whereCondition,
    });

    const users = await prisma.user.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: whereCondition,
      select: {
        id: true,
        name: true,
        skills: true,
        photo: true,
        workerProfile: {
          select: {
            currentJob: true,
            workPlace: true,
          }
        },
      }
    });

    const totalPages = Math.ceil(totalUsers / limit);

    return res.status(200).json({ users: users, totalPages: totalPages });
  } catch (error) {
    console.error("Error fetching user data: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
