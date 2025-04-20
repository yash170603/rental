import e, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";

const prisma = new PrismaClient();

export const getTenants = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const tenant = await prisma.tenant.findUnique({
      where: {
        cognitoId,
      },
      include: {
        favorites: true,
      },
    });

    console.log("this is the tenant at line 22", tenant);

    if (tenant) {
      res.json(tenant);
    } else {
      res.status(404).json({
        message: "Tenant not found",
      });
    }
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving tenant ${error.message}` });
  }
};

export const createTenants = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body;
    console.log("this is the request body");
    console.log(req.body);
    const tenant = await prisma.tenant.create({
      data: {
        cognitoId,
        name,
        email,
        phoneNumber,
      },
    });
    console.log("this is the tenant being created", tenant);
    res.status(201).json(tenant);
  } catch (error: any) {
    console.log("error in creating tenant", error);
    res.status(500).json({
      message: `Error creating tenant ${error.message}`,
    });
  }
};

export const updateTenants = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { cognitoId } = req.params;
  const { name, email, phoneNumber } = req.body;
  try {
    const updateTenant = await prisma.tenant.update({
      where: {
        cognitoId,
      },
      data: {
        name,
        email,
        phoneNumber,
      },
    });

    res.json(updateTenant);
  } catch (error: any) {
    res.status(500).json({ message: "Error updating tenant" });
    console.log("this is the error at updating tenant", error);
  }
};

export const getCurrentResidences = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const properties = await prisma.property.findMany({
      where: {
        tenants: {
          some: {
            cognitoId,
          },
        },
      },
      include: {
        location: true,
      },
    });

    const residenciesWithFormattedLocation = await Promise.all(
      properties.map(async (property) => {
        const coordinates: { coordinates: string }[] =
          await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates from "Loaction" where id =${property.location.id}`;

        const geoJSON: any = wktToGeoJSON(coordinates[0]?.coordinates || "");
        const longitude = geoJSON.coordinates[0];
        const latitude = geoJSON.coordinates[1];

        return {
          ...property,
          location: {
            ...property.location,
            coordinates: {
              longitude,
              latitude,
            },
          },
        };
      })
    );

    res.status(200).json(residenciesWithFormattedLocation);
  } catch (error: any) {
    console.log("There was an error fetching current residences");
    res.status(500).json({
      message: `THere was an error fetching current residences ${error?.message}`,
    });
  }
};

export const addFavoriteProperty = async (req: Request, res: Response) => {
  try {
    const { cognitoId, propertyId } = req.params;
    const tenant = await prisma.tenant.findUnique({
      where: {
        cognitoId,
      },
      include: {
        favorites: true, // first extract the tenant along with existing fav properties
      },
    });
    const propertyNumber = Number(propertyId);
    const existingFavorites = tenant?.favorites || [];// this is only extracting the fav properties from the tenatnt oject above 

    if (!existingFavorites.some((fav) => fav.id === propertyNumber)) { // this some returns a boolean value
      // if the property is not already in the favorites, add it
      const updatedTenant = await prisma.tenant.update({
        where: {
          cognitoId,
        },
        data: {
          favorites: {
            connect: {// what is this connect doing?  It adds the property with that propertyNumber to the existing favorites list of the current tenant.

              //It's like saying: “Hey Prisma, just link this existing property to the tenant’s list of favorites.”
              id: propertyNumber,
            },
          },
        },
        include: { favorites: true },
      });
      res.status(200).json(updatedTenant);
    }
     else{
      res.status(409).json({
        message: "Property already in favorites",
      });
     }
   
  } catch (error: any) {
    console.log("There was an error fetching fav properties for tenatn");
    res.status(500).json({
      message: `There was an internal error fetching fav properties,${error.message}`,
    });
  }
};
export const removeFavoriteProperty = async (req: Request, res: Response) => {
  try {
    const { cognitoId, propertyId } = req.params;
   
    const propertyNumber = Number(propertyId); 
      const updatedTenant = await prisma.tenant.update({
        where: {
          cognitoId,
        },
        data: {
          favorites: {
            disconnect: { 
              id: propertyNumber,
            },
          },
        },
        include: { favorites: true },
      });
   

    res.status(200).json(updatedTenant);

  } catch (error: any) {
    console.log("There was an error fetching fav properties for tenatn");
    res.status(500).json({
      message: `There was an internal error removing fav properties,${error.message}`,
    });
  }
};

