import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin : "http://localhost:5173",
    methods : ["GET","POST","PUT","DELETE"],
    credentials : true
}));

import userRouter from './routes/user.routes.js';
import otpRouter from './routes/otp.routes.js';

app.use('/api/v1/users', userRouter);
app.use('/api/v1/otp', otpRouter);

export default app;