import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction, response, request } from "express";
import { decode } from "punycode";

interface DecodedToken extends JwtPayload {
  sub: string; // congnito id . might be something else, gotta check during test
  "custom:role"?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}
 

// this is an higher order function, as this return different function,
//this means that this function just recieves the aray of roles,
//and then returns a function that takes the request, response and next function as arguements
// this is the middleware function that is used in the express app

export const authMiddleware = (allowedRules: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(" ")[1]; // i dont know what the fuck is happening here rn, find it

    if (!token) {
      res.status(401).json({
        message: "unauthorized",
      });
      return;
    }

    try {
      const decoded = jwt.decode(token) as DecodedToken;
      const userRole = decoded["custom:role"] || "";

      req.user = {
        id: decoded.sub,  // this is cognito id 
        role: userRole,
      };

      const hasAccess = allowedRules.includes(userRole.toLowerCase());
      if (!hasAccess) {
        res.status(403).json({
          message: "Access denied",
        });
      }
    } catch (error: any) {
      console.error("Failed to ddecode token", error);
      res.status(400).json({ message: "Invalid token" });
      return;
    }

    next();
  };
};













// PAYLOAD:DATA

// {
//   "sub": "301cf9fc-f0b1-707a-68f2-bf90f22fbcbe",
//   "email_verified": true,
//   "iss": "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_AHh8njOgh",
//   "cognito:username": "yashtalreja17",
//   "origin_jti": "f5b432aa-c3d8-4ee7-997c-79ed0ed4f2c8",
//   "aud": "52tk6h2e8g2df26bn379lj58e5",
//   "event_id": "b3553c9d-721c-4f56-aace-463bd9dad1aa",
//   "token_use": "id",
//   "auth_time": 1742343708,
//   "exp": 1742347308,
//   "custom:role": "tenant",
//   "iat": 1742343708,
//   "jti": "074eb87b-8076-47dc-b8b5-44d8f9ab1f4f",
//   "email": "ciheri8958@isorax.com"
// }