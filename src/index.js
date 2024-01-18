// require('dotenv').config({path:"./env"})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js"
dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
        console.log(`Application Error: ${error.message}. Stack Trace: ${error.stack}`);
        throw error
    })
    app.listen(process.env.PORT || 8000, ()=> {
        console.log(`Server is successfully running at port : ${process.env.PORT || 8000}`);
    })
  })
  .catch((err) => {
    console.log(
      `Failed to connect to MongoDB server. Please check root index.js Error :: ${err.message}. Stack Trace: ${err.stack}`
    );
  });

/*
import express from "express";
const app = express()
(async()=> {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error)=> {
            console.log(`ERROR: ${error}`);
            throw error

        })

        app.listen(process.env.PORT, ()=> {
            console.log("My server is listening at port 8000");
        })
    }catch (error){
        console.log("ERROR", error );
    }
})()
*/
