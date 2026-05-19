import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, TrendingDown, AlertTriangle, CheckCircle, Brain, Zap, Target, ArrowRight } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

const insights = [
    {
        type: 'warning', icon: '🛒', title: 'Food Spending Spike',
        description: 'You spent 35% more on food & beverages this week vs. your monthly average. Consider meal prepping to reduce costs.',
        impact: 'HIGH', color: 'rose',
        metric: '+$127', metricLabel: 'Above average',
    },
    {
        type: 'success', icon: '🚗', title: 'Transport Savings',
        description: 'Great job! Transportation expenses reduced by 12% this month. You\'ve been using ridesharing efficiently.',
        impact: 'POSITIVE', color: 'emerald',
        metric: '-$52', metricLabel: 'Saved vs last month',
    },
    {
        type: 'info', icon: '🎯', title: 'Savings Target On Track',
        description: 'At your current savings rate, your vacation goal of $50,000 will be achieved by July 2026. Keep it up!',
        impact: 'ON TRACK', color: 'cyan',
        metric: '85%', metricLabel: 'Goal completed',
    },
    {
        type: 'warning', icon: '🎬', title: 'Subscription Overload',
        description: 'You have 4 active digital subscriptions totaling $72/month. Review which are truly essential.',
        impact: 'MEDIUM', color: 'purple',
        metric: '$72/mo', metricLabel: 'Subscription costs',
    },
    {
        type: 'success', icon: '💰', title: 'Income Growth Detected',
        description: 'Your average monthly income has increased by 8.5% over the past 3 months. AI predicts continued growth.',
        impact: 'POSITIVE', color: 'emerald',
        metric: '+8.5%', metricLabel: 'Income growth',
    },
    {
        type: 'info', icon: '🔮', title: 'AI Spending Forecast',
        description: 'Based on your patterns, AI predicts total expenses of $4,100 next month. Budget accordingly.',
        impact: 'FORECAST', color: 'cyan',
        metric: '$4,100', metricLabel: 'Predicted spend',
    },
];

const colorMap = {
    rose: { bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.2)', text: 'text-rose-400', badge: 'bg-rose-500/15 text-rose-400 border-rose-500/20' },
    emerald: { bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)', text: 'text-emerald-400', badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20' },
    cyan: { bg: 'rgba(0,212,255,0.06)', border: 'rgba(0,212,255,0.18)', text: 'text-brand-cyan', badge: 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20' },
    purple: { bg: 'rgba(168,85,247,0.08)', border: 'rgba(168,85,247,0.2)', text: 'text-brand-purple', badge: 'bg-brand-purple/15 text-brand-purple border-brand-purple/20' },
};

const healthMetrics = [
    { label: 'Budget Adherence', value: 78, color: 'from-brand-cyan to-blue-500', note: 'Good' },
    { label: 'Savings Rate', value: 32, color: 'from-brand-purple to-pink-500', note: '32%' },
    { label: 'Expense Diversity', value: 65, color: 'from-emerald-500 to-teal-400', note: '6 categories' },
    { label: 'AI Confidence Score', value: 92, color: 'from-amber-500 to-orange-400', note: 'High' },
];

export default function Insights() {
    return (
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.1 }} className="space-y-6 pb-8">
            {/* Header */}
            <motion.div variants={fadeUp}>
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(0,212,255,0.3))', border: '1px solid rgba(168,85,247,0.3)' }}>
                        <Brain className="w-5 h-5 text-brand-purple" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight gradient-text">AI Insights</h1>
                        <p className="text-white/40 text-sm">Aura AI · Updated just now</p>
                    </div>
                </div>
            </motion.div>

            {/* Health Score */}
            <motion.div variants={fadeUp} className="glass-card p-6" style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.05), rgba(168,85,247,0.05))' }}>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <div>
                        <h3 className="font-bold text-base flex items-center gap-2">
                            <Zap className="w-4 h-4 text-brand-cyan" /> Financial Health Score
                        </h3>
                        <p className="text-white/40 text-xs mt-0.5">Based on your last 90 days</p>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-5xl font-black gradient-text">82</div>
                        <div className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full mt-1">Excellent</div>
                    </div>
                </div>
                <div className="space-y-4">
                    {healthMetrics.map(({ label, value, color, note }, i) => (
                        <div key={label}>
                            <div className="flex justify-between items-center mb-1.5">
                                <span className="text-sm text-white/60 font-medium">{label}</span>
                                <span className="text-xs font-bold text-white/70">{note}</span>
                            </div>
                            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${value}%` }}
                                    transition={{ duration: 1.2, ease: 'easeOut', delay: 0.4 + i * 0.1 }}
                                    className={`h-full rounded-full bg-gradient-to-r ${color}`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Insights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {insights.map((ins, i) => {
                    const colors = colorMap[ins.color];
                    return (
                        <motion.div
                            key={i}
                            variants={fadeUp}
                            whileHover={{ y: -4, borderColor: colors.border }}
                            className="glass-card p-5 transition-all cursor-pointer group"
                            style={{ background: colors.bg, borderColor: colors.border }}
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-3xl flex-shrink-0">{ins.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2 mb-2">
                                        <h3 className="font-bold text-sm text-white group-hover:text-brand-cyan transition-colors">{ins.title}</h3>
                                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${colors.badge}`}>{ins.impact}</span>
                                    </div>
                                    <p className="text-xs text-white/55 leading-relaxed mb-3">{ins.description}</p>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className={`text-lg font-black ${colors.text}`}>{ins.metric}</div>
                                            <div className="text-[10px] text-white/30">{ins.metricLabel}</div>
                                        </div>
                                        <Link to="/dashboard" className={`text-xs font-semibold flex items-center gap-1 ${colors.text} opacity-60 group-hover:opacity-100 transition-opacity`}>
                                            Details <ArrowRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* AI Prediction Banner */}
            <motion.div
                variants={fadeUp}
                className="glass-card p-6 relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.1), rgba(0,212,255,0.1))', borderColor: 'rgba(168,85,247,0.2)' }}
            >
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: 'radial-gradient(circle, #a855f7, transparent)' }} />
                <div className="relative z-10 flex items-start gap-5 flex-wrap">
                    <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(0,212,255,0.3))', border: '1px solid rgba(168,85,247,0.3)' }}>
                        <Sparkles className="w-6 h-6 text-brand-purple" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs text-brand-purple font-semibold uppercase tracking-widest mb-1">Aura AI Prediction</p>
                        <h3 className="text-lg font-bold text-white mb-2">You'll save $890 more by switching grocery stores</h3>
                        <p className="text-white/50 text-sm leading-relaxed">
                            Based on your Whole Foods spending pattern, switching to a local market 2x per week could save you approximately <strong className="text-emerald-400">$890 per year</strong> while maintaining your lifestyle.
                        </p>
                    </div>
                    <Link to="/expenses" className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2 flex-shrink-0">
                        Explore Plan <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </motion.div>
        </motion.div>
    );
}
