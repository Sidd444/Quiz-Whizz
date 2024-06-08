const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: Number, required: true }  
});

const QuizSchema = new Schema({
    title: { type: String, required: true },
    questions: [QuestionSchema]
});

module.exports = mongoose.model('Quiz', QuizSchema);
