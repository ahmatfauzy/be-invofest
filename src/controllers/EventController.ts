import { Request, Response } from "express";
import multer from "multer";
import { prisma } from "../utils/prisma";
import { uploadToCloudinary } from "../services/cloudinary";
import fs from "fs";

const upload = multer({ dest: "uploads/" });
const uploadFields = upload.fields([
  { name: "payment", maxCount: 1 },
  { name: "igFollow", maxCount: 1 },
]);

// Seminar 
export const registSeminar = [
  uploadFields,
  async (req: Request, res: Response): Promise<void> => {
    const { email, fullName, category, whatsapp, institution } = req.body;
    const files = req.files as any;
    const paymentUrl = (await uploadToCloudinary(files.payment[0].path))
      .secure_url;
    const igFollowUrl = (await uploadToCloudinary(files.igFollow[0].path))
      .secure_url;
    files.payment.forEach((f: any) => fs.unlinkSync(f.path));
    files.igFollow.forEach((f: any) => fs.unlinkSync(f.path));

    const data = await prisma.seminarRegistration.create({
      data: {
        email,
        fullName,
        category,
        whatsapp,
        institution,
        paymentUrl,
        igFollowUrl,
      },
    });
    res.json({ message: "Seminar registered", data });
  },
];

//  Workshop
export const registWorkshop = [
  uploadFields,
  async (req: Request, res: Response): Promise<void> => {
    const { email, fullName, workshop, category, whatsapp, institution } =
      req.body;
    const files = req.files as any;
    const paymentUrl = (await uploadToCloudinary(files.payment[0].path))
      .secure_url;
    const igFollowUrl = (await uploadToCloudinary(files.igFollow[0].path))
      .secure_url;
    files.payment.forEach((f: any) => fs.unlinkSync(f.path));
    files.igFollow.forEach((f: any) => fs.unlinkSync(f.path));

    const data = await prisma.workshopRegistration.create({
      data: {
        email,
        fullName,
        workshop,
        category,
        whatsapp,
        institution,
        paymentUrl,
        igFollowUrl,
      },
    });
    res.json({ message: "Workshop registered", data });
  },
];

// Talkshow
export const registTalkshow = [
  uploadFields,
  async (req: Request, res: Response): Promise<void> => {
    const { email, fullName, category, whatsapp, institution } = req.body;
    const files = req.files as any;
    const paymentUrl = (await uploadToCloudinary(files.payment[0].path))
      .secure_url;
    const igFollowUrl = (await uploadToCloudinary(files.igFollow[0].path))
      .secure_url;
    files.payment.forEach((f: any) => fs.unlinkSync(f.path));
    files.igFollow.forEach((f: any) => fs.unlinkSync(f.path));

    const data = await prisma.talkshowRegistration.create({
      data: {
        email,
        fullName,
        category,
        whatsapp,
        institution,
        paymentUrl,
        igFollowUrl,
      },
    });
    res.json({ message: "Talkshow registered", data });
  },
];
