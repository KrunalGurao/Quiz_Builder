const express = require('express');
const quizRouter = express.Router();
const Quiz = require('../model/quiz');
const cors = require('cors')


quizRouter.use(cors())

quizRouter.post('/create', async (req, res) => {
  try {
    const { creator, title, description, questions } = req.body;
    const quiz = new Quiz({ creator, title, description, questions });
    res.status(200).json(quiz);
  } catch (error) {
    res.status(400).json(error);
  }
});




//*********************************************************************************************** */



quizRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Quiz.findByIdAndDelete(id);
    res.status(200).end();
  } catch (error) {
    res.status(400).json({ error: 'Error occured' });
  }
});



//*********************************************************************************************** */



quizRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const quiz = await Quiz.findByIdAndUpdate(
      id,
      { title, description },
      { new: true }
    );
    res.json(quiz);
  } catch (error) {
    res.status(400).json({ error: 'Error occured' });
  }
});


//************************************************************************************** */


quizRouter.get('/quiz',async (req, res) => {
    try{
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (error) {
        res.status(400).json('Failed to retrieve quiz data');
    }
})






module.exports = {quizRouter};
