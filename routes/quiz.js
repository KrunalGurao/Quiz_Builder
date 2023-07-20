const express = require('express');
const quizRouter = express.Router();
const Quiz = require('../model/quiz');
const cors = require('cors')


quizRouter.use(cors())

quizRouter.post("/create", async (req, res) => {
  try {
      const { creator, title, description, questions, leaderboard } = req.body

      const addQuiz = new Quiz({ creator, title, description, questions, leaderboard: [] })
      await addQuiz.save()
      res.status(200).send({ msg: "Quiz Added sucessfully", ok: true })
  } catch (error) {
      res.status(400).send({ msg: error.message })
  }
})

//*************************************************************************************************


quizRouter.delete("/delete/:id/:email", async (req, res) => {
  try {
      const { id, email } = req.params
      const user = await Quiz.findOne({ _id: id })

      if (user.creator != email) {
          return res.status(400).send({ msg: "You are not authorized" })
      }
      const deletequiz = await Quiz.findByIdAndDelete({ _id: id })
      return res.status(200).send({ msg: "Quiz Deleted" })
  } catch (error) {
      return res.status(400).send({ msg: error.message })
  }
})


//*************************************************************************************************


quizRouter.get("/", async (req, res) => {
  try {
      const data = await Quiz.find()
      res.status(200).send(data)
  } catch (error) {
      res.status(400).send({ msg: error.message })
  }
})


//*************************************************************************************************


quizRouter.get("/particular", async (req, res) => {
  try {
      const quizId = req.query.id
      const quizdata = await Quiz.findById(quizId)
      return res.status(200).send(quizdata)
  } catch (error) {
      return res.status(400).send({ msg: error.message })
  }
})






module.exports = {quizRouter};
