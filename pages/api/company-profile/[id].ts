import { prisma } from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .get(async (req, res) => {
    const { id } = req.query;
    try {
      const companyProfile = await prisma.recruiterProfile.findUnique({
        where: {
          userId: Number(id),
        },
      });
      return res.status(200).json({ companyProfile });
    } catch (error: any) {
      console.error(error.message);
      return res.json({ message: "Couldn't find company profile" });
    }
  })
  .put(async (req, res) => {
    const { id } = req.query;
    const {
      companyName,
      companyEmail,
      companyPhone,
      companySegment,
      companyInfo,
    } = req.body;

    try {
      const updatedCompany = await prisma.recruiterProfile.update({
        where: {
          userId: Number(id),
        },
        data: {
          companyName,
          companyEmail,
          companyInfo,
          companyPhone,
          companySegment,
        },
      });

      return res
        .status(201)
        .json({
          message: "Success updating company information",
          updatedCompany,
        });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error });
    }
  });

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
