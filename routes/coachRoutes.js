import expres from "express";
import { getAllCoach } from "../controller/coachController.js";
const coachRouter = expres.Router();

coachRouter.get('/allCoach', getAllCoach)

export default coachRouter;
