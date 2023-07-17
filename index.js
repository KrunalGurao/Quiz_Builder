const express = require("express");
const { connection } = require('./db');
const { userRouter } = require("./routes/user");
const cors = require("cors");
require("dotenv").config();



const app = express();
app.use(express.json());
app.use(cors());




app.use("user", userRouter);




app.listen(process.env.port, async () => {
  try {
    await connection;

    console.log("*****************Connected to server*****************");
  } catch (error) {
    console.log("NOT CONNECTED", error);
  }
});


