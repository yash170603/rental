import express from 'express';
import { getProperties,getProperty,createProperty} from '../controllers/propertyControllers';
import multer from 'multer';
import { authMiddleware } from '../middleware/authMiddleware';



const propertyRouter = express.Router();
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

propertyRouter.get("/", getProperties);
propertyRouter.get("/:id",getProperty);

propertyRouter.post("/",authMiddleware(["manager"]),upload.array("photos"),createProperty); 


export default propertyRouter;