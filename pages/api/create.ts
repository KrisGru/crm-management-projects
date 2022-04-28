// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { NextApiRequest, NextApiResponse } from "next";
// import prisma from '../../lib/prisma';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function create(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    // let user = req.body;
    const savedUser = await prisma.user.create({
      data: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        role: req.body.role,
        email: req.body.email,
        avatar: req.body.avatar,
        password: req.body.password,
      },
    });
    console.log("savedUser", savedUser);
    res.status(200).json(savedUser);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong!" });
  }
}
