// models/Quiz.js

const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    title: String,
    questions: [
        {
            question: String,
            options: [String],
            correctAnswer: Number,
        },
    ],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdByName: String,
});

module.exports = mongoose.model('Quiz', quizSchema);
