import { Request, Response } from "express";
import multer from "multer";
import { prisma } from "../utils/prisma";
import { uploadBuffer } from "../services/cloudinary";

const upload = multer({ storage: multer.memoryStorage() });

const cpUpload = upload.fields([
  { name: "memberCard", maxCount: 1 },
  { name: "payment", maxCount: 1 },
  { name: "igFollow", maxCount: 1 },
]);

export const registComp = [
  cpUpload,
  async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        competition,
        participantType,
        degree,
        email,
        fullName,
        teamName,
        school,
        leaderName,
      } = req.body;

      const files = req.files as {
        [fieldname: string]: Express.Multer.File[];
      };

      /* upload buffer → Cloudinary */
      const memberCardUrl = (await uploadBuffer(files.memberCard[0].buffer))
        .secure_url;
      const paymentUrl = (await uploadBuffer(files.payment[0].buffer))
        .secure_url;
      const igFollowUrl = (await uploadBuffer(files.igFollow[0].buffer))
        .secure_url;

      const data = await prisma.competitionRegistration.create({
        data: {
          competition,
          participantType,
          degree,
          email,
          fullName: participantType === "INDIVIDU" ? fullName : null,
          teamName: participantType === "TEAM" ? teamName : null,
          school,
          leaderName: participantType === "TEAM" ? leaderName : null,
          memberCardUrl,
          paymentUrl,
          igFollowUrl,
        },
      });
      res.json({ message: "Registration success", data });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },
];
