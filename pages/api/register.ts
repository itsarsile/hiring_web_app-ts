import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, password, roles } = req.body;
  const DEFAULT_PHOTO = '/default.webp'

  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role: roles,
        photo: DEFAULT_PHOTO
      },
    })
    if (user.role === 'WORKER') {
      await prisma.workerProfile.create({
        data: {
          userId: user.id,
        }
      })
    }
    if (user.role === 'RECRUITER') {
      await prisma.workerProfile.create({
        data: {
          userId: user.id
        }
      })
    }
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "An error occurred during registration" });
  }
}
