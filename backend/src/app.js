import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
const allowedOrigins = [
  "http://localhost:5173",
  "https://hack-in-sooty.vercel.app"
];

// app.use(cors({
//   origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//           callback(null, true);
//       } else {
//           callback(new Error("Not allowed by CORS"));
//       }
//   },
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));

app.use(cors({
  origin: true, // Allow all origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
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
// import otpRouter from './routes/otp.routes.js';
import authRouter from './routes/auth.routes.js';
import teamRouter from './routes/team.routes.js';
import projectRouter from './routes/project.routes.js';
import feedRouter from './routes/feed.routes.js';
import messageRouter from './routes/message.routes.js';

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
// app.use('/api/v1/otp', otpRouter);
app.use('/api/v1/team',teamRouter);
app.use('/api/v1/project',projectRouter);
app.use('/api/v1/feed',feedRouter);
app.use('/api/v1/message',messageRouter);

export default app;