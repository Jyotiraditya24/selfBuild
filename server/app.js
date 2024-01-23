import express from "express";

const port = 3001

const app = express();

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})

app.get("/",(req,resp)=>{
    resp.send("Hello");
})