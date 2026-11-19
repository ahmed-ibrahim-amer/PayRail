import jwt, { SignOptions } from 'jsonwebtoken';
import { env } from '../../config/env.js';
import { UnauthorizedError } from '../../common/error.js';


export interface TokenPayload{
    sub: string;
    role:string;
}
export function generateAccessToken(payload: TokenPayload): string {
    const  options: SignOptions = {
        expiresIn: env.JWT_EXPIRES_IN as SignOptions['expiresIn'],
    };
    return jwt.sign(payload, env.JWT_SECRET,options);
}

export function verifyAccessToken(token: string): TokenPayload {
    try{
        return jwt.verify(token , env.JWT_SECRET) as TokenPayload;
    }catch {
        throw new UnauthorizedError("Invalid or expired  token");
    }
}