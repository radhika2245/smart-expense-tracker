import express from 'express';
import Expense from '../models/Expense.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
    .get(protect, async (req, res) => {
        try {
            const expenses = await Expense.find({ user: req.user._id }).sort({ date: -1 });
            res.json(expenses);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
    .post(protect, async (req, res) => {
        try {
            const { amount, category, title, date, isSubscription } = req.body;
            const expense = new Expense({
                user: req.user._id,
                amount, category, title, date, isSubscription
            });
            const createdExpense = await expense.save();
            res.status(201).json(createdExpense);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

router.route('/:id')
    .delete(protect, async (req, res) => {
        try {
            const expense = await Expense.findById(req.params.id);
            if (expense && expense.user.toString() === req.user._id.toString()) {
                await expense.deleteOne();
                res.json({ message: 'Expense removed' });
            } else {
                res.status(404).json({ message: 'Expense not found or unauthorized' });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

export default router;
