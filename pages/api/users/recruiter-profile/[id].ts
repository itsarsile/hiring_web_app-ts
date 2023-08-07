import { prisma } from "@/lib/prisma";
import { getToken } from "next-auth/jwt";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .get(async (req, res) => {
    const { id } = req.query;
    try {
      const company = await prisma.recruiterProfile.findUnique({
        where: {
          userId: Number(id),
        },
      });

      if (company) {
        return res.status(200).json({ company: company });
      }

      return res.status(404).json({ error: "User not found" });
    } catch (error) {
      console.error("Error fetching user data: ", error);
    }
  })
  .patch(async (req, res) => {
    const { id } = req.query;
    const {
      companyName,
      companySegment,
      companyInfo,
      companyDomicile,
      companyEmail,
      companyPhone,
    } = req.body;

    try {
      const response = await prisma.recruiterProfile.update({
        where: {
          userId: Number(id),
        },
        data: {
          companyName,
          companySegment,
          companyInfo,
          companyDomicile,
          companyEmail,
          companyPhone,
        },
      });
      res.status(201).json({ message: "User updated successfully", response });
    } catch (error) {
      console.error("Error during user update:", error);
    }
  });

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
