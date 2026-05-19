import mongoose from 'mongoose';

const aiInsightSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ['alert', 'recommendation', 'prediction', 'analysis'], required: true },
    message: { type: String, required: true },
    data: { type: mongoose.Schema.Types.Mixed }, // Arbitrary JSON data related to insight
    isRead: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('AIInsight', aiInsightSchema);
