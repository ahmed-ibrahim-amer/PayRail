import express from 'express';
import { prisma } from './infrastructure/prisma.js';
import pinoHttp from 'pino-http';
import { logger } from '../src/common/logger.js';
import { errorHandler, NotFoundHandler } from '../src/middlewares/error.middleware.js';


export const app  = express();

app.use(express.json());

app.use(pinoHttp({ logger }));

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/health' , async (req,res)=>{
    try{
        await prisma.$queryRaw`SELECT 1`;
        res.status(200).json({status: 'ok' , database: 'up' });
    }catch(error){
        res.status(503).json({status:'error',database:'down'})
    }
})

//middlewares for error handlers
app.use(NotFoundHandler);
app.use(errorHandler);
