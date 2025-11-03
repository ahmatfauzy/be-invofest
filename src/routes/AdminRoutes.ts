import express from "express";
import { authAdmin } from "../middlewares/authAdmin";
import { listParticipants } from "../controllers/AdminController";

const router = express.Router();
router.use(authAdmin as any); 
router.get("/participants", listParticipants);
export default router;
