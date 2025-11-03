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
