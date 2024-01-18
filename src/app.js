import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

let corsOptions ={
    origin: process.env.CORS_ORIGIN,
    credentials: true,

} 
app.use(cors(corsOptions))

///This middleware is used to parse incoming requests with JSON payloads. 
app.use(express.json({limit:"20kb"})) 
///This middleware is used to parse incoming requests with URL-encoded payloads.
app.use(express.urlencoded({extended: true, limit:"20kb"})) 
app.use(express.static("public"))
app.use(cookieParser())


/// routes import 
import userRouter from './routes/user.routes.js';

/// routes declaration  
app.use("/api/v1/users", userRouter)

/// http://localhost:8000/api/users/register 
export { app }