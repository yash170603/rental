import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { wktToGeoJSON } from "@terraformer/wkt";

const prisma = new PrismaClient();

export const getManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { cognitoId } = req.params;
  try {
    const manager = await prisma.manager.findUnique({
      where: {
        cognitoId,
      },
    });

    if (!manager) {
      res.json(404).json({
        message: "no such manager found",
      });
    }

    res.status(200).json(manager);
  } catch (error: any) {
    console.log("this is the error at getmanager controller", error);
    res.status(500).json({
      message: "Error retrieving manager",
      error: error.message,
    });
  }
};

export const createManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId, name, email, phoneNumber } = req.body;
  } catch (error: any) {
    console.log(
      "this is the error at createManager controller at line ",
      error
    );
  }
};

export const updateManager = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;
    const { name, email, phoneNumber } = req.body;

    const updateRespone = await prisma.manager.update({
      where: { cognitoId: cognitoId },
      data: {
        name,
        email,
        phoneNumber,
      },
    });
    console.log("this is the update manager respone", updateManager);
    if (!updateRespone) {
      res.status(400).json({
        message: "somethings not right here",
      });
    }

    res.status(200).json({
      message: "updated user successfully",
    });
  } catch (error) {
    console.log("this is error at updateManger catch block", error);
    res.status(500).json({
      message: "Internal Server error",
    });
  }
};

export const getManagerProperties = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { cognitoId } = req.params;

//     const manager = await prisma.manager.findUnique({
//       where: { cognitoId },
//     });

    const properties = await prisma.property.findMany({
      where: {
        managerCognitoId: cognitoId,
      },
      include: {
        location: true,
      },
    });

    const propertiesWithFormattedLocation = await Promise.all(
      properties.map(async (property) => {
        const coordinates: { coordinates: string }[] =
          await prisma.$queryRaw`SELECT ST_asText(coordinates) as coordinates from "Location" where id = ${property.location.id}`;

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

    res.status(200).json({
      propertiesWithFormattedLocation,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: `Error retrieving property: ${error.message}` });
  }
};
