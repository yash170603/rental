import express from 'express';
import { getManager,createManager,updateManager,getManagerProperties } from '../controllers/managerControllers';

const managerRouter = express.Router();

managerRouter.get("/:cognitoId", getManager);
managerRouter.post("/", createManager);
managerRouter.put("/:cognitoId", updateManager);
managerRouter.get("/:cognitoId/properties",getManagerProperties);


export default managerRouter;