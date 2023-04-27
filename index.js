import express from "express";
import { config } from "dotenv";
import DBConnect from "./config/database.js";
import userRouter from "./routes/userRouter.js";
config();

const app = express();

// add middelware
app.use(express.json());

app.get("/", (req,res) => {
     res.send("welcome to my default routes")
})

app.use("/api/v1", userRouter)


const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
     console.log(`Server is working at  http://localhost:${PORT}`);
})
// mongodb connection function call
DBConnect()



