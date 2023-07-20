const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title: {
        type: String,
       
    },
    answerOptions: {
        type: [String],
        
    },
    correctOptions: {
        type: [String],
       
    },
});

const quizSchema = new mongoose.Schema({
    creator: {
        type: String,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    questions: {
        type: [questionSchema],
        required: true,
        // validate: [arrayLimit, 'Quizzes must have between 2 and 10 questions.'],
    },
});

// function arrayLimit(ele) {
//     return ele.length >= 2 && ele.length <= 10;
// }

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
