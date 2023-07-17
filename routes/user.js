const express = require("express");
const mongoose=require("mongoose")
const cors = require("cors");
const { UserModel } = require("../model/user");
const userRouter = express.Router();
require("dotenv").config();


userRouter.post("/register", async(req, res)=> {
    const { username, email } = req.body
    try {
        const ispresent = await UserModel.findOne({ email })
        if(ispresent){
            return res.status(400).json({ message : 'user already exist...please login directly!' })
        }

        const user = new UserModel({ username, email })
        await user.save()
        res.status(200).json({ msg : 'Registertion Successful' })
    } catch (error) {
        res.status(400).send({ msg: "unable to register" })
    }
})






module.exports = {
    userRouter
  };