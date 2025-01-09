import express from 'express';

const app = express();

function getHandler(){
    console.log("get handler function running")
} 


app.get("/",getHandler
)

app.post("/",
    ()=>{
        console.log("Hello World Post Request")
    }
)


app.listen(
    3001,
    ()=>{
        console.log("app run on port 3001");
    }
)