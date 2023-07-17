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
            return res.status(400).json({ msg : 'user already exist...' })
        }

        const user = new UserModel({ username, email })
        await user.save()
        res.status(200).json({ msg : 'Registertion Successful' })
    } catch (error) {
        res.status(400).send({ msg: "unable to register" })
    }
})



//****************************************************************************** */



userRouter.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: 'Failed to fetch users' });
    }
})




module.exports = {
    userRouter
  };