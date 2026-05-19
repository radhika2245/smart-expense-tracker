import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: String, required: true },
    limit: { type: Number, required: true },
    spent: { type: Number, default: 0 },
    month: { type: String, required: true } // format: YYYY-MM
}, { timestamps: true });

export default mongoose.model('Budget', budgetSchema);
