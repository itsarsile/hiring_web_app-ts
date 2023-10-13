import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcryptjs"
import { prisma } from "@/lib/prisma"
import { signJwt } from "@/lib/jwt"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: "Method not allowed" })
  }
  try {
    const { email, password: userPass } = req.body
    const user = await prisma.user.findUnique({
      where: {
        email,
      }
    })

    if (!user || !(await bcrypt.compare(userPass, user.password))) {
      return null
    }
    
    const { password, ...userWithoutPassword } = user
    const accessToken = signJwt(userWithoutPassword)
    console.log('accessToken', accessToken)
    res.setHeader('Set-Cookie', `token=${accessToken}`)
    return res.json({ user: userWithoutPassword })
  } catch (error) {

  }
}
