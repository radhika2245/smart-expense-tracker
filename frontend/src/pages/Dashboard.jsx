import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    ArrowUpRight, ArrowDownRight, Wallet, Activity, CreditCard,
    Sparkles, Target, Zap, X, Check, Loader2, TrendingUp,
    ShoppingCart, Car, Utensils, Heart, Gamepad2
} from 'lucide-react';
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement,
    LineElement, Title, Tooltip, Filler, Legend, BarElement
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale, LinearScale, PointElement, LineElement,
    Title, Tooltip, Filler, Legend, BarElement
);

// ─── Animated Counter ──────────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }) {
    const motionVal = useMotionValue(0);
    const spring = useSpring(motionVal, { mass: 0.6, stiffness: 80, damping: 18 });
    const [display, setDisplay] = useState('0');

    useEffect(() => {
        motionVal.set(value);
    }, [value, motionVal]);

    useEffect(() => {
        return spring.on('change', (v) => {
            setDisplay(prefix + v.toLocaleString('en-IN', {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            }) + suffix);
        });
    }, [spring, prefix, suffix, decimals]);

    return <span>{display}</span>;
}

// ─── Toast ─────────────────────────────────────────────────────────────────────
function Toast({ msg, type = 'success', onClose }) {
    useEffect(() => {
        const t = setTimeout(onClose, 3500);
        return () => clearTimeout(t);
    }, [onClose]);

    return (
        <motion.div
            initial={{ opacity: 0, y: -60, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -40, scale: 0.95, transition: { duration: 0.2 } }}
            className={`fixed top-6 right-6 z-[200] flex items-center gap-3 px-5 py-4 rounded-2xl glass-card
                ${type === 'success' ? 'border-emerald-500/30 shadow-[0_0_25px_rgba(16,185,129,0.15)]' : 'border-rose-500/30 shadow-[0_0_25px_rgba(244,63,94,0.15)]'}`}
        >
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${type === 'success' ? 'bg-emerald-500/20' : 'bg-rose-500/20'}`}>
                <Check className={`w-4 h-4 ${type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`} />
            </div>
            <p className="font-medium text-sm text-white">{msg}</p>
            <button onClick={onClose} className="ml-2 text-white/30 hover:text-white/70 transition-colors">
                <X className="w-4 h-4" />
            </button>
        </motion.div>
    );
}

// ─── Add Record Modal ──────────────────────────────────────────────────────────
const CATEGORIES = ['Electronics', 'Groceries', 'Food & Beverage', 'Entertainment', 'Transport', 'Health', 'Shopping', 'Utilities', 'Salary', 'Freelance', 'Other'];
const catIcons = { 'Food & Beverage': Utensils, 'Transport': Car, 'Health': Heart, 'Entertainment': Gamepad2, Shopping: ShoppingCart };

function AddRecordModal({ onClose, onSave }) {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setForm] = useState({
        title: '', amount: '', category: 'Groceries', type: 'expense',
        date: new Date().toISOString().split('T')[0], notes: ''
    });
    const [errors, setErrors] = useState({});

    const validate = () => {
        const e = {};
        if (!form.title.trim()) e.title = 'Title is required';
        if (!form.amount || isNaN(parseFloat(form.amount)) || parseFloat(form.amount) <= 0) e.amount = 'Enter a valid amount';
        if (!form.date) e.date = 'Date is required';
        return e;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errs = validate();
        if (Object.keys(errs).length) { setErrors(errs); return; }
        setIsSubmitting(true);

        // Simulate API call
        await new Promise(r => setTimeout(r, 900));

        onSave({
            id: Date.now(),
            name: form.title,
            cat: form.category,
            type: form.type,
            amt: parseFloat(form.amount),
            date: new Date(form.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            notes: form.notes
        });
        setIsSubmitting(false);
    };

    const setField = (k, v) => {
        setForm(f => ({ ...f, [k]: v }));
        setErrors(e => ({ ...e, [k]: undefined }));
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0"
                style={{ background: 'rgba(2, 6, 16, 0.85)', backdropFilter: 'blur(12px)' }}
            />

            {/* Modal */}
            <motion.div
                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                onClick={e => e.stopPropagation()}
                className="relative w-full max-w-[480px] rounded-3xl overflow-hidden"
                style={{
                    background: 'rgba(8, 12, 35, 0.95)',
                    border: '1px solid rgba(0, 212, 255, 0.2)',
                    boxShadow: '0 0 0 1px rgba(0,212,255,0.05), 0 40px 80px rgba(0,0,0,0.6), 0 0 60px rgba(0,212,255,0.08)',
                }}
            >
                {/* Top gradient */}
                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.6), rgba(168,85,247,0.6), transparent)' }} />

                {/* Header */}
                <div className="flex items-center justify-between px-7 pt-7 pb-5">
                    <div>
                        <h2 className="text-xl font-bold text-white">New Transaction</h2>
                        <p className="text-xs text-white/40 mt-0.5">Add a record to your financial history</p>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(255,255,255,0.08)' }}
                        whileTap={{ scale: 0.92 }}
                        onClick={onClose}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-white/40 hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </motion.button>
                </div>

                <form onSubmit={handleSubmit} className="px-7 pb-7 space-y-4">
                    {/* Type Toggle */}
                    <div className="flex p-1 rounded-xl gap-1" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.05)' }}>
                        {['expense', 'income'].map(t => (
                            <button
                                key={t}
                                type="button"
                                onClick={() => setField('type', t)}
                                className={`flex-1 py-2.5 rounded-xl font-semibold text-sm capitalize transition-all duration-200 ${form.type === t
                                    ? t === 'expense'
                                        ? 'bg-rose-500/20 text-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.15)] border border-rose-500/20'
                                        : 'bg-emerald-500/20 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] border border-emerald-500/20'
                                    : 'text-white/40 hover:text-white/70'
                                    }`}
                            >
                                {t === 'expense' ? '↓ Expense' : '↑ Income'}
                            </button>
                        ))}
                    </div>

                    {/* Amount */}
                    <div>
                        <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-1.5">Amount</label>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 font-bold text-lg">₹</span>
                            <input
                                type="number"
                                step="0.01"
                                value={form.amount}
                                onChange={e => setField('amount', e.target.value)}
                                placeholder="0.00"
                                className={`input-field pl-9 text-2xl font-bold py-4 ${errors.amount ? 'border-rose-500/50' : ''}`}
                            />
                        </div>
                        {errors.amount && <p className="text-rose-400 text-xs mt-1">{errors.amount}</p>}
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-1.5">Title</label>
                        <input
                            type="text"
                            value={form.title}
                            onChange={e => setField('title', e.target.value)}
                            placeholder="e.g. Netflix Subscription"
                            className={`input-field ${errors.title ? 'border-rose-500/50' : ''}`}
                        />
                        {errors.title && <p className="text-rose-400 text-xs mt-1">{errors.title}</p>}
                    </div>

                    {/* Category + Date */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-1.5">Category</label>
                            <select
                                value={form.category}
                                onChange={e => setField('category', e.target.value)}
                                className="input-field appearance-none cursor-pointer"
                            >
                                {CATEGORIES.map(c => <option key={c} value={c} className="bg-[#050814]">{c}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-1.5">Date</label>
                            <input
                                type="date"
                                value={form.date}
                                onChange={e => setField('date', e.target.value)}
                                className={`input-field ${errors.date ? 'border-rose-500/50' : ''}`}
                            />
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-1.5">Notes <span className="text-white/25">(optional)</span></label>
                        <textarea
                            value={form.notes}
                            onChange={e => setField('notes', e.target.value)}
                            placeholder="Add any additional details..."
                            rows={2}
                            className="input-field resize-none"
                        />
                    </div>

                    {/* Submit */}
                    <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={!isSubmitting ? { scale: 1.02, boxShadow: '0 0 30px rgba(0,212,255,0.35)' } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                        className="w-full py-4 rounded-xl font-bold text-sm relative overflow-hidden flex items-center justify-center gap-2 mt-2"
                        style={{
                            background: isSubmitting ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, rgba(0,212,255,0.85), rgba(168,85,247,0.85))',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: isSubmitting ? 'rgba(255,255,255,0.4)' : 'white',
                        }}
                    >
                        {isSubmitting ? (
                            <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                        ) : (
                            <><Check className="w-4 h-4" /> Confirm Transaction</>
                        )}
                        {!isSubmitting && (
                            <div className="absolute inset-0 shimmer-line" />
                        )}
                    </motion.button>
                </form>
            </motion.div>
        </div>
    );
}

// ─── Stat Card ─────────────────────────────────────────────────────────────────
function StatCard({ title, value, prefix, suffix, decimals, icon: Icon, trend, trendUp, color, glow, delay }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, type: 'spring', stiffness: 200, damping: 22 }}
        >
            <motion.div
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 5 + delay * 2, repeat: Infinity, ease: 'easeInOut' }}
                className={`stat-card ${glow ? 'neon-border' : ''}`}
                style={glow ? { boxShadow: '0 0 30px rgba(0,212,255,0.1), inset 0 0 30px rgba(0,212,255,0.03)' } : {}}
            >
                {/* Background accent */}
                <div className={`absolute top-[-30px] right-[-20px] w-28 h-28 rounded-full blur-3xl opacity-30 ${color}`} />

                {/* Icon + Trend */}
                <div className="flex items-start justify-between mb-5 relative z-10">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${glow ? 'bg-brand-cyan/15' : 'bg-white/5'}`}
                        style={{ border: glow ? '1px solid rgba(0,212,255,0.25)' : '1px solid rgba(255,255,255,0.06)' }}
                    >
                        <Icon className={`w-5 h-5 ${glow ? 'text-brand-cyan' : 'text-white/60'}`} />
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-full ${trendUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                        {trendUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                        {trend}
                    </div>
                </div>

                {/* Title */}
                <p className="text-white/50 text-sm font-medium mb-1.5 relative z-10">{title}</p>

                {/* Value */}
                <div className={`text-3xl font-black tracking-tight relative z-10 ${glow ? 'gradient-text' : 'text-white'}`}>
                    <AnimatedNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals || 2} />
                </div>
            </motion.div>
        </motion.div>
    );
}

// ─── Chart Options ──────────────────────────────────────────────────────────────
const baseChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: { display: false }, tooltip: {
            backgroundColor: 'rgba(8, 12, 35, 0.95)',
            titleColor: 'rgba(255,255,255,0.8)',
            bodyColor: 'rgba(255,255,255,0.6)',
            borderColor: 'rgba(0, 212, 255, 0.3)',
            borderWidth: 1,
            cornerRadius: 12,
            padding: 12,
        }
    },
    scales: {
        x: { grid: { display: false }, ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 11 } }, border: { display: false } },
        y: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { color: 'rgba(255,255,255,0.3)', font: { size: 11 } }, border: { display: false } },
    },
    animation: { duration: 1200, easing: 'easeInOutQuart' },
};

// ─── Main Dashboard ────────────────────────────────────────────────────────────
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const INITIAL_CHART = [1200, 1950, 1640, 2200, 1780, 2900, 2400, 3240];

export default function Dashboard({ showAddModal, onCloseModal }) {
    const [stats, setStats] = useState({
        balance: 354750.00,
        spend: 27000.00,
        predicted: 34200.00,
        savings: 32,
    });
    const [chartData, setChartData] = useState(INITIAL_CHART);
    const [transactions, setTransactions] = useState([
        { id: 1, name: 'Apple Store', cat: 'Electronics', type: 'expense', amt: 99999.00, date: 'Today' },
        { id: 2, name: 'Big Bazaar', cat: 'Groceries', type: 'expense', amt: 2150.00, date: 'Yesterday' },
        { id: 3, name: 'Salary Credit', cat: 'Salary', type: 'income', amt: 85000.00, date: 'May 15' },
        { id: 4, name: 'Netflix', cat: 'Entertainment', type: 'expense', amt: 649.00, date: 'May 14' },
        { id: 5, name: 'Ola Ride', cat: 'Transport', type: 'expense', amt: 320.00, date: 'May 13' },
    ]);
    const [toast, setToast] = useState(null);
    const [chartTab, setChartTab] = useState('spending');
    const [goalProgress] = useState(85);

    const handleSave = useCallback((tx) => {
        setTransactions(prev => [tx, ...prev].slice(0, 8));
        if (tx.type === 'expense') {
            setStats(s => ({ ...s, balance: s.balance - tx.amt, spend: s.spend + tx.amt }));
            setChartData(d => {
                const n = [...d];
                n[n.length - 1] += tx.amt;
                return n;
            });
        } else {
            setStats(s => ({ ...s, balance: s.balance + tx.amt, savings: Math.min(s.savings + 2, 99) }));
        }
        onCloseModal();
        setToast({ msg: `${tx.type === 'income' ? '💰' : '✅'} "${tx.name}" saved successfully!`, type: 'success' });
    }, [onCloseModal]);

    const lineData = {
        labels: MONTHS,
        datasets: [{
            fill: true,
            label: 'Expenses',
            data: chartData,
            borderColor: 'rgb(0, 212, 255)',
            backgroundColor: (ctx) => {
                const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
                gradient.addColorStop(0, 'rgba(0, 212, 255, 0.18)');
                gradient.addColorStop(1, 'rgba(0, 212, 255, 0.0)');
                return gradient;
            },
            tension: 0.45,
            borderWidth: 2.5,
            pointBackgroundColor: 'rgb(0, 212, 255)',
            pointBorderColor: 'rgba(8, 12, 35, 1)',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 7,
        }],
    };

    const barData = {
        labels: ['Food', 'Transport', 'Shopping', 'Health', 'Entertainment', 'Utilities'],
        datasets: [{
            data: [980, 420, 760, 310, 540, 230],
            backgroundColor: [
                'rgba(0, 212, 255, 0.5)', 'rgba(168, 85, 247, 0.5)',
                'rgba(236, 72, 153, 0.5)', 'rgba(16, 185, 129, 0.5)',
                'rgba(251, 191, 36, 0.5)', 'rgba(99, 102, 241, 0.5)',
            ],
            borderColor: [
                'rgba(0, 212, 255, 0.8)', 'rgba(168, 85, 247, 0.8)',
                'rgba(236, 72, 153, 0.8)', 'rgba(16, 185, 129, 0.8)',
                'rgba(251, 191, 36, 0.8)', 'rgba(99, 102, 241, 0.8)',
            ],
            borderWidth: 1.5,
            borderRadius: 8,
        }],
    };

    const insights = [
        { icon: '🛒', text: 'Food spending up', highlight: '+35%', highlightColor: 'text-rose-400', detail: 'vs last week', cta: 'See Breakdown' },
        { icon: '🚗', text: 'Transport costs', highlight: '-12%', highlightColor: 'text-emerald-400', detail: 'excellent progress!', cta: 'View Trend' },
        { icon: '🎯', text: 'Savings goal', highlight: '85%', highlightColor: 'text-brand-cyan', detail: 'on track for July', cta: 'Details' },
    ];

    return (
        <div className="space-y-6 pb-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between"
            >
                <div>
                    <h1 className="text-3xl font-black tracking-tight gradient-text">Financial Overview</h1>
                    <p className="text-white/40 text-sm mt-1">Powered by Aura AI · Real-time insights</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl glass text-xs font-medium text-emerald-400 border border-emerald-500/20">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                    Live
                </div>
            </motion.div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard title="Total Balance" value={stats.balance} prefix="₹" decimals={2} icon={Wallet} trend="+12.5%" trendUp color="bg-brand-cyan" glow delay={0} />
                <StatCard title="Monthly Spend" value={stats.spend} prefix="₹" decimals={2} icon={CreditCard} trend="-2.4%" trendUp={false} color="bg-brand-purple" delay={0.08} />
                <StatCard title="AI Predicted" value={stats.predicted} prefix="₹" decimals={2} icon={Activity} trend="+5.1%" trendUp color="bg-brand-pink" glow delay={0.16} />
                <StatCard title="Savings Rate" value={stats.savings} suffix="%" decimals={0} icon={Zap} trend="+1.2%" trendUp color="bg-emerald-500" delay={0.24} />
            </div>

            {/* Chart + Insights Row */}
            <div className="grid grid-cols-1 lg:grid-cols-7 gap-4">
                {/* Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="glass-card p-6 lg:col-span-4 flex flex-col"
                    style={{ minHeight: 320 }}
                >
                    <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-brand-cyan" />
                            <h3 className="font-bold text-base">Analytics</h3>
                        </div>
                        <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)' }}>
                            {['spending', 'categories'].map(tab => (
                                <button key={tab} onClick={() => setChartTab(tab)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${chartTab === tab ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/20' : 'text-white/40 hover:text-white/70'}`}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1 min-h-[220px]">
                        <AnimatePresence mode="wait">
                            <motion.div key={chartTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full">
                                {chartTab === 'spending'
                                    ? <Line data={lineData} options={baseChartOptions} />
                                    : <Bar data={barData} options={baseChartOptions} />
                                }
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </motion.div>

                {/* AI Insights */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="glass-card p-6 lg:col-span-3 flex flex-col"
                >
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-brand-purple" />
                            <h3 className="font-bold text-base gradient-text-alt">Aura Insights</h3>
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-purple bg-brand-purple/10 border border-brand-purple/20 px-2.5 py-1 rounded-full">AI</span>
                    </div>

                    <div className="space-y-3 flex-1">
                        {insights.map((ins, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.35 + i * 0.1 }}
                                whileHover={{ x: 4, backgroundColor: 'rgba(255,255,255,0.05)' }}
                                className="p-4 rounded-xl cursor-pointer transition-all duration-200"
                                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                            >
                                <div className="flex items-start gap-3">
                                    <span className="text-2xl flex-shrink-0">{ins.icon}</span>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-white/70 leading-snug">
                                            {ins.text} <strong className={ins.highlightColor}>{ins.highlight}</strong><br />
                                            <span className="text-white/40 text-xs">{ins.detail}</span>
                                        </p>
                                    </div>
                                    <Link to="/insights" className="text-xs text-brand-cyan hover:text-white transition-colors flex-shrink-0 mt-1 font-medium">
                                        {ins.cta} →
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Goal Tracker */}
                    <div className="mt-5 pt-5 border-t border-white/[0.06]">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Target className="w-4 h-4 text-brand-cyan" />
                                <span className="text-sm font-semibold">Vacation Goal</span>
                            </div>
                            <span className="text-sm font-bold text-brand-cyan">{goalProgress}%</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${goalProgress}%` }}
                                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
                                className="h-full rounded-full relative overflow-hidden"
                                style={{ background: 'linear-gradient(90deg, #00d4ff, #a855f7)' }}
                            >
                                <div className="absolute inset-0 shimmer-line" />
                            </motion.div>
                        </div>
                        <div className="flex justify-between text-xs text-white/35 mt-1.5">
                            <span>₹3,54,750 saved</span>
                            <span>₹4,20,000 target</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Recent Transactions */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                className="glass-card p-6"
            >
                <div className="flex items-center justify-between mb-5">
                    <h3 className="font-bold text-base">Recent Transactions</h3>
                    <Link
                        to="/expenses"
                        className="text-xs font-semibold text-brand-cyan hover:text-white transition-colors flex items-center gap-1 bg-brand-cyan/8 border border-brand-cyan/20 px-3 py-1.5 rounded-lg hover:bg-brand-cyan/15"
                    >
                        View Detailed Report <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                </div>

                <div className="space-y-1">
                    <AnimatePresence>
                        {transactions.map((tx, i) => (
                            <motion.div
                                key={tx.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20, height: 0 }}
                                transition={{ delay: i * 0.05 }}
                                whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)', x: 4 }}
                                className="flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer group"
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-sm font-bold transition-all
                                    ${tx.type === 'income' ? 'bg-emerald-500/15 text-emerald-400 group-hover:bg-emerald-500/25' : 'bg-brand-purple/15 text-brand-purple group-hover:bg-brand-purple/25'}`}
                                    style={{ border: tx.type === 'income' ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(168,85,247,0.2)' }}
                                >
                                    {tx.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-sm text-white group-hover:text-brand-cyan transition-colors truncate">{tx.name}</p>
                                    <p className="text-xs text-white/35 mt-0.5">{tx.cat} · {tx.date}</p>
                                </div>
                                <div className={`font-bold text-base flex-shrink-0 ${tx.type === 'income' ? 'text-emerald-400' : 'text-white'}`}>
                                    {tx.type === 'income' ? '+' : '-'}₹{tx.amt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </motion.div>

            {/* Modals */}
            <AnimatePresence>
                {showAddModal && <AddRecordModal onClose={onCloseModal} onSave={handleSave} />}
            </AnimatePresence>
            <AnimatePresence>
                {toast && <Toast msg={toast.msg} type={toast.type} onClose={() => setToast(null)} />}
            </AnimatePresence>
        </div>
    );
}
