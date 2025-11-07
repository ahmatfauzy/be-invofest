// controllers/AdminController.ts
import type { Request, Response } from "express";
import { prisma } from "../utils/prisma";
import { CompetitionType } from "@prisma/client";

export const listParticipants = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { competition, degree, participantType } = req.query;
  const filters: any = {};
  if (competition) filters.competition = competition as CompetitionType; // <-- cast
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

export const listCompetition = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { competition } = req.params;
  const competitionEnum = competition as CompetitionType;

  const list = await prisma.competitionRegistration.findMany({
    where: { competition: competitionEnum },
    orderBy: { createdAt: "desc" },
  });

  const individual = list
    .filter((r) => r.participantType === "INDIVIDU")
    .map((r) => ({
      id: r.id,
      fullName: r.fullName!,
      leaderEmail: r.email,
      leaderPhone: r.whatsapp,
      school: r.school || "-",
      registrationType: r.participantType,
      paymentMethod: "Transfer",
      memberCard: r.memberCardUrl,
      paymentUrl: r.paymentUrl,
      igFollow: r.igFollowUrl,
    }));

  const team = list
    .filter((r) => r.participantType === "TEAM")
    .map((r) => ({
      id: r.id,
      teamName: r.teamName!,
      leaderName: r.leaderName!,
      leaderEmail: r.email,
      leaderPhone: r.whatsapp,
      school: r.school || "-",
      registrationType: r.participantType,
      paymentMethod: "Transfer",
      memberCard: r.memberCardUrl,
      paymentUrl: r.paymentUrl,
      igFollow: r.igFollowUrl,
    }));

  res.json({ individual, team });
};

export const getDashboardStats = async (
  _: Request,
  res: Response
): Promise<void> => {
  try {
    const [seminar, talkshow, workshop, poster, uiux, web] = await Promise.all([
      prisma.seminarRegistration.count(),
      prisma.talkshowRegistration.count(),
      prisma.workshopRegistration.count(),
      prisma.competitionRegistration.count({
        where: { competition: CompetitionType.POSTER },
      }),
      prisma.competitionRegistration.count({
        where: { competition: CompetitionType.UIUX },
      }),
      prisma.competitionRegistration.count({
        where: { competition: CompetitionType.WEB },
      }),
    ]);

    res.json({
      message: "OK",
      data: {
        seminar,
        talkshow,
        workshop,
        poster,
        uiux,
        webDesign: web,
      },
    });
  } catch (error: any) {
    console.error("[v0] Database connection error:", error.message);
    res.status(503).json({
      message: "Database connection error",
      error: error.message,
      data: {
        seminar: 0,
        talkshow: 0,
        workshop: 0,
        poster: 0,
        uiux: 0,
        webDesign: 0,
      },
    });
  }
};
