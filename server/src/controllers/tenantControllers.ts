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
    res.status(500).json({message:"Error updating tenant"});
    console.log("this is the error at updating tenant",error)
  }
};

export const getCurrentResidences = async (
  req: Request,
  res: Response
): Promise<void> => {
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
};

export const addFavoriteProperty = async (req: Request, res: Response) => {};

export const removeFavoriteProperty = async (req: Request, res: Response) => {};
