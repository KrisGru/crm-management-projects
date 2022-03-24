// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from 'next';
// import prisma from '../../lib/prisma';
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

export default async function signIn(req: NextApiRequest, res: NextApiResponse) {
  if(req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed'})
  }
  try {
    const {email, password }= req.body
    console.log(email)
    const user = await prisma.user.findMany({
      where: {
        email,
        password,
      },
    })
    if(user.length === 0) {
      throw new Error
    }
    res.status(200).json({user, from: "SIGNIN" })
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong!' })
  }
}
