import express from 'express';

const app = express();



app.listen(
    3001,
    ()=>{
        console.log("app run on port 3001");
    }
)