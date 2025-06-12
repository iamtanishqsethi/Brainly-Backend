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

const userAuth = async (req: Request, res: Response, next: NextFunction)=> {
  try {
    const cookies=req.cookies
    const { token } = cookies
    
    if (!token) {
      throw new Error("Token not found");
    }
    
    const decodedValue = jwt.verify(token, process.env.JWT_KEY!) as {_id:string};
    
    const user = await User.findById(decodedValue._id);
    
    if (!user) {
      throw new Error("User not found");
    }
    
    req.user = user;
    next();
  } catch (err:any) {
    res.status(404).send(err.message);
  }
};

export { userAuth };