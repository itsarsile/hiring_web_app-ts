// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { createRouter, expressWrapper } from 'next-connect'

const router = createRouter<NextApiRequest, NextApiResponse>();

router
.get((req, res) => {
  return res.status(200).json({ message: 'Hello!' })
})

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});
