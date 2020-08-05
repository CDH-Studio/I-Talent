import { Request, Response } from "express";
import prisma from "../../../database";

async function countHiddenUsers(_request: Request, response: Response) {
  try {
    const hiddenUserCount = await prisma.user.count({
      where: {
        status: "HIDDEN",
      },
    });

    response.status(200).json(hiddenUserCount);
  } catch (error) {
    console.log(error);
    response.status(500).send("Error getting hidden user count");
  }
}

async function countInactiveUsers(_request: Request, response: Response) {
  try {
    const inactiveUserCount = await prisma.user.count({
      where: {
        status: "INACTIVE",
      },
    });

    response.status(200).json(inactiveUserCount);
  } catch (error) {
    console.log(error);
    response.status(500).send("Error getting inactive user count");
  }
}

async function countUsers(_request: Request, response: Response) {
  try {
    const userCount = await prisma.user.count();

    response.status(200).json(userCount);
  } catch (error) {
    console.log(error);
    response.status(500).send("Error getting user count");
  }
}

async function countExFeederUsers(_request: Request, response: Response) {
  try {
    const exFeederUserCount = await prisma.user.count({
      where: {
        exFeeder: true,
      },
    });

    response.status(200).json(exFeederUserCount);
  } catch (error) {
    console.log(error);
    response.status(500).send("Error getting exFeeder user count");
  }
}

export default {
  countHiddenUsers,
  countInactiveUsers,
  countUsers,
  countExFeederUsers,
};
