const express = require('express');
const quizController = require('../controllers/quizController');
const router = express.Router();

router.post('/', quizController.createQuiz);
router.get('/', quizController.getAllQuizzes);
router.get('/:id', quizController.getQuizById);
router.post('/:id/submit', quizController.submitQuiz);
router.delete('/:id', quizController.deleteQuiz);

module.exports = router;
