// src/controllers/CompetitionController.ts
import { Request, Response } from "express";
import multer from "multer";
import { prisma } from "../utils/prisma";
import { uploadToCloudinary } from "../services/cloudinary";
import fs from "fs";

const upload = multer({ dest: "uploads/" });

// middleware untuk multiple file
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

      // upload ke cloudinary
      const memberCardUrl = (await uploadToCloudinary(files.memberCard[0].path)).secure_url;
      const paymentUrl = (await uploadToCloudinary(files.payment[0].path)).secure_url;
      const igFollowUrl = (await uploadToCloudinary(files.igFollow[0].path)).secure_url;

      // hapus file lokal
      Object.values(files).flat().forEach((f) => fs.unlinkSync(f.path));

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