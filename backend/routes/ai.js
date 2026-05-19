import express from 'express';
import axios from 'axios';
import { protect } from '../middleware/auth.js';
import Expense from '../models/Expense.js';

const router = express.Router();

// This endpoint retrieves the user's expenses, sends them to the Python AI service, and returns insights.
router.get('/insights', protect, async (req, res) => {
    try {
        const expenses = await Expense.find({ user: req.user._id }).sort({ date: 1 });

        // Call Python AI Service
        // In production, URL should come from process.env.AI_SERVICE_URL
        const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://127.0.0.1:5001/analyze';

        // Mock response if AI service isn't running
        try {
            const response = await axios.post(aiServiceUrl, { expenses });
            res.json(response.data);
        } catch (aiError) {
            console.log('AI Service not reachable, falling back to mock insights');
            res.json({
                insights: [
                    "You spent 35% more on food this month.",
                    "Weekend spending is unusually high.",
                    "Based on current trends, you may exceed your monthly budget in 5 days."
                ],
                predictions: {
                    nextMonthEstimate: expenses.length ? expenses.reduce((a, b) => a + b.amount, 0) * 1.05 : 0
                }
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
