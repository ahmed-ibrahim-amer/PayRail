import bcrypt from 'bcryptjs';
import { BadRequestError, ConflictError, UnauthorizedError } from '../../common/error.js';
import type { RegisterInput } from './auth.schema.js';
import { prisma } from '../../infrastructure/prisma.js';
import {env} from '../../config/env.js';
import type { LoginInput } from './auth.schema.js';
import { generateAccessToken } from './token.service';








export async function registerUser ({ email, password }: RegisterInput) {
    // 1. Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser) {
        throw new ConflictError('Email already registered');
    }

    // 2. Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // 3. Create user
    const user = await prisma.user.create({
        data: {
            email,
            passwordHash,
        },
        select: {
            id: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });

    return user;
}

export async function loginUser ({email,password}:LoginInput){
    const user = await prisma.user.findUnique({where:{email}});
        // if(!user){
        //     throw new ConflictError()
        // }
        const isValid = user ? await bcrypt.compare(password , user.passwordHash): false;
            if(!user || !isValid){
                throw new UnauthorizedError("Invalid email or password");
            }
        const token  = generateAccessToken({sub:user.id , role: user.role});
        
        return {
            token 
            ,user:{id:user.id , email:user.email , role: user.role}
        };
}