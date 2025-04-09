import express  from "express";
import { getTenants, updateTenants, getCurrentResidences,createTenants,addFavoriteProperty,removeFavoriteProperty} from "../controllers/tenantControllers";

const tenantRouter= express.Router();

tenantRouter.get("/:cognitoId", getTenants);
tenantRouter.post("/", createTenants);
tenantRouter.put("/:cognitoId", updateTenants);
tenantRouter.get("/:cognitoId/current-residences",getCurrentResidences);
tenantRouter.post("/:cognitoId/favorites/:propertyId",addFavoriteProperty);
tenantRouter.delete("/:cognitoId/favorites/:propertyId",removeFavoriteProperty);


export default tenantRouter;
