const express = require('express');
const quizRouter = express.Router();
const Quiz = require('../model/quiz');




quizRouter.post('/create', async (req, res) => {
  try {
    const { creator, title, description, questions } = req.body;
    const quiz = await Quiz.create({ creator, title, description, questions });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(400).json({ "message": 'Error occured' });
  }
});



//*********************************************************************************************** */



quizRouter.delete('/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params;
    await Quiz.findByIdAndDelete(quizId);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ error: 'Error occured' });
  }
});



//*********************************************************************************************** */



quizRouter.put('/:quizId', async (req, res) => {
  try {
    const { quizId } = req.params;
    const { title, description } = req.body;
    const quiz = await Quiz.findByIdAndUpdate(
      quizId,
      { title, description },
      { new: true }
    );
    res.json(quiz);
  } catch (error) {
    res.status(400).json({ error: 'Error occured' });
  }
});





module.exports = {quizRouter};
