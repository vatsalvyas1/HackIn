import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin : "http://localhost:5173",
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
}));

app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({
        mongoUrl: `${process.env.MONGODB_URI}/hackin`,
        collectionName: "sessions",
        ttl: 14 * 24 * 60 * 60, // 14 days expiry
      }),
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000, // 14 days
      },
    })
  );

import userRouter from './routes/user.routes.js';
import otpRouter from './routes/otp.routes.js';
import authRouter from './routes/auth.routes.js';


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/otp', otpRouter);

export default app;