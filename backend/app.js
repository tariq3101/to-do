const express = require("express");
const app = express();
const cors = require("cors")
require("./connection/conn")
const auth = require("./routes/auth")
const list = require("./routes/list")
const dotenv = require("dotenv");
dotenv.config()

app.use(express.json())

app.use(cors())

app.get("/", (req, res) =>{
    res.send("Hello");
});

app.use("/api/v1", auth)
app.use("/api/v2", list)

app.listen(process.env.PORT, () =>{
    console.log("Server Start...")
})