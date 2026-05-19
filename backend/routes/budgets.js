import express from 'express';
import Budget from '../models/Budget.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(protect, async (req, res) => {
        try {
            const budgets = await Budget.find({ user: req.user._id });
            res.json(budgets);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
    .post(protect, async (req, res) => {
        try {
            const { category, limit, month } = req.body;
            const budget = new Budget({ user: req.user._id, category, limit, month });
            const createdBudget = await budget.save();
            res.status(201).json(createdBudget);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

export default router;
