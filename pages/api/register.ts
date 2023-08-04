import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";


export default function handler(req:NextApiRequest, res: NextApiResponse) {
    const prisma = new PrismaClient()
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { name, email, phone, password, roles } = req.body;

    try {
        const existingUser = await prisma.f
    } catch (error) {
        
    } 
}