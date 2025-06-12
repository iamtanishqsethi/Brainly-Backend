import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/User";

// Extend the Request interface to include user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

interface JwtPayload {
  _id: string;
  [key: string]: any;
}

const userAuth = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const cookies = req.cookies;
    const { token } = cookies;
    
    if (!token) {
      throw new Error("Token not found");
    }
    
    const decodedValue = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
    
    const user = await User.findById(decodedValue._id);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    req.user = user;
    next();
  } catch (err) {
    res.status(404).send(err);
  }
};

export { userAuth };