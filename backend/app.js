const express=require("express");
const app=express();
const cors=require("cors");
const cookieParser=require('cookie-parser');
const bodyParser=require("body-parser");
const router = require("./routes/userRoutes");
const adminRouter= require("./routes/adminRoutes");
const verifierRouter=require("./routes/verifierRoutes");

app.use(cors({
    origin: 'http://localhost:3000', // Adjust as needed
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api/v1", router);
app.use("/api/v1/admin/", adminRouter);
app.use("/api/v1/verifier", verifierRouter);

module.exports=app;