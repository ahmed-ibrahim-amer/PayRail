import  type { Request , Response } from 'express';
import { loginSchema, registerSchema } from './auth.schema.js';
import { loginUser, registerUser  } from './auth.service.js';
import { BadRequestError } from '../../common/error.js';


export async function register(req:Request , res:Response) {
    const parsed = registerSchema.safeParse(req.body);
        if(!parsed.success){
            throw new BadRequestError(parsed.error.issues.map((i)=> i.message).join(','));
        }
    const user = await registerUser(parsed.data);
    
        res.status(201).json({
            user
        })
}

export async function login(req:Request , res: Response){
    const parsed = loginSchema.safeParse(req.body);
        if(!parsed.success){
            throw new BadRequestError(parsed.error.issues.map((i)=> i.message).join(','));
        }
    const result = await loginUser(parsed.data);
    res.status(200).json(result)   
}