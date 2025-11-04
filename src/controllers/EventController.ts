import { Request, Response } from "express";
import multer from "multer";
import { prisma } from "../utils/prisma";
import { uploadBuffer } from "../services/cloudinary";

const upload = multer({ storage: multer.memoryStorage() });
const uploadFields = upload.fields([
  { name: "payment", maxCount: 1 },
  { name: "igFollow", maxCount: 1 },
]);

/* ~~~~~~~~~~ SEMINAR ~~~~~~~~~~ */
export const registSeminar = [
  uploadFields,
  async (req: Request, res: Response): Promise<void> => {
    const { email, fullName, category, whatsapp, institution } = req.body;
    const files = req.files as any;

    const paymentUrl = (await uploadBuffer(files.payment[0].buffer)).secure_url;
    const igFollowUrl = (await uploadBuffer(files.igFollow[0].buffer))
      .secure_url;

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

/* ~~~~~~~~~~ WORKSHOP ~~~~~~~~~~ */
export const registWorkshop = [
  uploadFields,
  async (req: Request, res: Response): Promise<void> => {
    const { email, fullName, workshop, category, whatsapp, institution } =
      req.body;
    const files = req.files as any;

    const paymentUrl = (await uploadBuffer(files.payment[0].buffer)).secure_url;
    const igFollowUrl = (await uploadBuffer(files.igFollow[0].buffer))
      .secure_url;

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

/* ~~~~~~~~~~ TALKSHOW ~~~~~~~~~~ */
export const registTalkshow = [
  uploadFields,
  async (req: Request, res: Response): Promise<void> => {
    const { email, fullName, category, whatsapp, institution } = req.body;
    const files = req.files as any;

    const paymentUrl = (await uploadBuffer(files.payment[0].buffer)).secure_url;
    const igFollowUrl = (await uploadBuffer(files.igFollow[0].buffer))
      .secure_url;

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
