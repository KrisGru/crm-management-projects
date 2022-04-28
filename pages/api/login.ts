import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        role: true,
        email: true,
        avatar: true,
        password: true,
      },
    });
    console.log("user Login api", user);
    if (!user.id) {
      throw new Error();
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong!" });
  }
}
