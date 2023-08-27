import { IUser } from "./Models/user";
import { Express } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: IUser["_id"];
      username?: IUser["username"];
      files?: any; // Replace 'any' with a proper type if possible
    }
  }
}
