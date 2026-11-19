import { email } from "zod";
import { registerSchema } from "../modules/auth/auth.schema.js";
import { prisma } from '../infrastructure/prisma.js';
import  { app }  from '../app.js';
import request from 'supertest';

describe('Register Schema', () =>{
  test('should accept valid user data', () => {
    const result = registerSchema.safeParse({
      email: 'ahmed@gmail.com',
      password: 'StrongPassword123'
    });
    expect(result.success).toBe(true)
  })
  test('should reject password less than 8 char',()=>{
    const result = registerSchema.safeParse({
      email:"max@mail.com",
      password:'123'
    });
    expect(result.success).toBe(false);
  })
  test('should reject invalid email', () => {
    const result = registerSchema.safeParse({
        email: 'ahmedgmail.com',
        password: 'StrongPassword123',
    });

    expect(result.success).toBe(false);
})
  test('should reject empty input',()=>{
    const result = registerSchema.safeParse({});
    expect(result.success).toBe(false);
  })
})

describe('Given email and password',()=>{

  test("Should respond with a 201 status code",async ()=>{
    const responseResult = await request(app).post('/api/v1/auth/register').send({
      email:`test-${Date.now()}@mail.com`,
      password:'qwertyuiop'
    });
    expect(responseResult.statusCode).toBe(201)
  })
  test('register with incorrect password',async()=>{
    const falseRegister = await request(app).post('/api/v1/auth/register').send({
      email:`test-${Date.now()}@mail.com`,
      password:1235456
    });
    expect(falseRegister.statusCode).toBe(400)
  })

  test('register with mail is already exists',async()=>{
    const email = `test-duplicate-${Date.now()}@mail.com`;
    await request(app).post('/api/v1/auth/register').send({
    email,
    password: 'qwertyuiop',
  });

  const response = await request(app).post('/api/v1/auth/register').send({
    email,
    password: 'qwertyuiop',
  });
    expect(response.statusCode).toBe(409);
  })
})
afterAll(async()=>{
  await prisma.$disconnect();
})
// describe('Register Service',()=>{
//   test('register new user',async ()=>{
//     const register = await prisma.user.create({
//       data:{
//         email:'test@mail.com',
//         passwordHash:'1234567890'
//     }
//     })
//     expect(register.id).toBeDefined();
//     expect(register.email).toBe('test@mail.com')
//   })
// })  