import express from "express";
import { authAdmin } from "../middlewares/authAdmin";
import { listParticipants } from "../controllers/AdminController";
import {
  listSeminar,
  listWorkshop,
  listTalkshow,
} from "../controllers/AdminController";

const router = express.Router();
router.use(authAdmin as any);
router.get("/participants", listParticipants);
router.get("/seminar", listSeminar);
router.get("/workshop", listWorkshop);
router.get("/talkshow", listTalkshow);

export default router;
