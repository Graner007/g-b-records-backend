import jwt, { JwtPayload } from "jsonwebtoken";
import { Request } from 'express';

export const APP_SECRET = "YeXjit3lNqsE1mSqwS4DnproXHJD9of1dD0nKg5aqcozJfIFLwRHjfjPmEAbP1pp5IxvgO7C1U7G8Inh5XTa2eBBqftqTuOXzlZHm2LPzl5mdAyr8XbWFGvBS4K8Y96PYhUCBlRbDICatweWKO7kuDv0LebaSJq2QNoKmTEsqW1erbLtzTdcVCc9cPIpT98XgAJT6jfE";

const getTokenPayload = (token: string): string | JwtPayload => { return jwt.verify(token, APP_SECRET); }

export const getUserId = (req: Request, authToken?: string) => {
    if (req) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace('Bearer ', '');
            if (!token) { throw new Error('No token found'); }
            const { userId }: any = getTokenPayload(token);
            return userId;
        }
    } 
    else if (authToken) {
        const { userId }: any = getTokenPayload(authToken);
        return userId;
    }
    
    throw new Error('Not authenticated');
}