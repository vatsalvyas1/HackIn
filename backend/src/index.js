import 'dotenv/config';
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import app from "./app.js";
import {createServer} from "http";
import { initSocket } from './socket/socket.js';

dotenv.config(
    {path : "../.env"}
);

const server = createServer(app);

connectDB()
.then(() =>{
    const port = process.env.PORT || 5000;

    server.listen(port , () =>{
        console.log(`Server is running on port ${port}`);
    });

    initSocket(server);
})
.catch((err) => {
    console.log("MongoDB error found : ",err);
});

app.get("/",(req,res)=>{
    res.send("Server Started");
})