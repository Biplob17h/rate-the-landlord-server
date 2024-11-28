import express from "express";
import { createAResource, deleteAResource, getAllResourceBySort, getAResource, updateAResource } from "../controllers/resourceControllers.js";

const resourceRouter = express.Router();

resourceRouter.post('/create', createAResource)


resourceRouter.get('/single/:id', getAResource)
resourceRouter.post('/all', getAllResourceBySort)


resourceRouter.post('/update', updateAResource)


resourceRouter.post('/delete/:id', deleteAResource)

export default resourceRouter;
