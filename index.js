import express from 'express';
import bodyParser from 'body-parser';



const app = express();

const mongoURL = "mongodb+srv://admin:admin@12345@clustermern.xn93y.mongodb.net/?retryWrites=true&w=majority&appName=ClusterMERN"

app.use(bodyParser.json())

app.get("/",
    (req,res)=>{
        console.log(req.body)
        console.log("Hello World this is get request")

        res.json(
            {
                message: "Hello World Response"
            }
        )
    }
)

app.post("/",
    (req,res)=>{
        console.log(req.body);
        console.log("Hello World Post Request")
        res.json({
                message:"Response from the Post" + req.body.name
            })
    }
)


app.listen(
    3001,
    ()=>{
        console.log("app run on port 3001");
    }
)