import jwt, {  JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import constants from '../Configs/constants';


export interface CustomRequest extends Request {
 token: string | JwtPayload;
}


export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
  console.log(req.header('Authorization'));
  
   const token = req.header('Authorization')?.replace('Bearer ', '');
console.log(token);

   if (!token) {
     throw new Error();
   }

   const decoded = jwt.verify(token, constants.jwtSecret);
   (req as CustomRequest).token = decoded;

   next();
 } catch (err) {
   return res.status(401).send('Please authenticate');
 }
};