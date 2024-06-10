const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');

// Create a new quiz
router.post('/', async (req, res) => {
    const newQuiz = new Quiz(req.body);
    try {
        const quiz = await newQuiz.save();
        res.status(201).json(quiz);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find();
        res.status(200).json(quizzes);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get a single quiz by ID
router.get('/:id', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        res.status(200).json(quiz);
    } catch (err) {
        res.status(404).json({ error: 'Quiz not found' });
    }
});

router.post('/:id/submit', async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) return res.status(404).json({ error: 'Quiz not found' });

        const { answers } = req.body;
        let score = 0;

        quiz.questions.forEach((question, index) => {
            if (question.correctAnswer === answers[index]) {
                score++;
            }
        });

        res.status(200).json({ score });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a quiz by ID
router.delete('/:id', async (req, res) => {
    try {
        await Quiz.findByIdAndDelete(req.params.id);
        res.status(204).json({ message: 'Quiz deleted' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;