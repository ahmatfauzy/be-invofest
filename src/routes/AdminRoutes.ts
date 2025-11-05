import express from "express";
import { authAdmin } from "../middlewares/authAdmin";
import {
  listParticipants,
  listSeminar,
  listWorkshop,
  listTalkshow,
  listCompetition,
  getDashboardStats,
} from "../controllers/AdminController";

const router = express.Router();
router.use(authAdmin as any);

router.get("/participants", listParticipants);
router.get("/seminar", listSeminar);
router.get("/workshop", listWorkshop);
router.get("/talkshow", listTalkshow);
router.get("/competition/:competition", listCompetition); // UIUX | WEB | POSTER
router.get("/dashboard", getDashboardStats);

export default router;