import express from "express"
import dotenv from "dotenv"
import bodyParser from "body-parser"
import cors from "cors"
import helmet from "helmet" // helps in securing the express app by setting various HTTP headers or basically saves from various attacks like XSS, clickjacking,
//  etc.--> somone might add  bad script in the website. and when the user clicks on the website, the script will run and the user's data will be stolen.
import morgan from "morgan" // helps in logging the request in the console
import { authMiddleware } from "./middleware/authMiddleware"
import tenantRouter from "./routes/tenantRoutes"
import managerRouter from "./routes/managerRoutes"

dotenv.config()
const app= express()
app.use(bodyParser.json())
app.use(cors())
app.use(helmet.crossOriginResourcePolicy({policy:"cross-origin"}));
app.use(morgan("common"))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get('/', authMiddleware(["manager"]),(req,res)=>{
    res.send("this is home  route, bbbbband welcome sir i dont know man")
});

app.use("/tenants", authMiddleware(["tenant"]),tenantRouter )
app.use("/managers", authMiddleware(["manager"]),managerRouter)
 
const port= process.env.PORT || 3003
app.listen(port,()=>{
    console.log(`server is  running on port ${port}`)
});