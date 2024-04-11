import dotenv from "dotenv"

import connectDB from "./db/index.js"
import {app} from "./app.js"

dotenv.config({
    path: "./env"
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`server is running at port : ${process.env.PORT} `);
    })
})
.catch((err)=> {
    console.log("MONGO db connection failed !!!", err)
});















//one way of connecting database---not professional apporach

// import express from "express"


// function connectDB(){}

// (async () =>{
//     try {
//         mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//         app.on("error",()=> {
//             console.log("ERR:",error);
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//            console.log(`App is listening on port ${process.env.PORT}`);
//         })
        
//     } catch (error) {
//         console.error("Error")
//         throw err
//     }
// })()