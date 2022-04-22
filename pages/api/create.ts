// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
// import prisma from '../../lib/prisma';

import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    let user = req.body;
    const savedUser = await prisma.user.create({
      data: user,
    });
    console.log("savedUser", savedUser);
    res.status(200).json({ savedUser, from: "CREATE" });
  } catch (error) {
    res.status(400).json({ message: "Something went wrong!" });
  }
}
