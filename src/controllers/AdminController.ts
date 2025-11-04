import { Request, Response } from "express";
import { prisma } from "../utils/prisma";

export const listParticipants = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { competition, degree, participantType } = req.query;
  const filters: any = {};
  if (competition) filters.competition = competition;
  if (degree) filters.degree = degree;
  if (participantType) filters.participantType = participantType;

  const list = await prisma.competitionRegistration.findMany({
    where: filters,
    orderBy: { createdAt: "desc" },
  });
  res.json(list);
};

export const listSeminar = async (_: Request, res: Response): Promise<void> => {
  const data = await prisma.seminarRegistration.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(data);
};
export const listWorkshop = async (
  _: Request,
  res: Response
): Promise<void> => {
  const data = await prisma.workshopRegistration.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(data);
};
export const listTalkshow = async (
  _: Request,
  res: Response
): Promise<void> => {
  const data = await prisma.talkshowRegistration.findMany({
    orderBy: { createdAt: "desc" },
  });
  res.json(data);
};
