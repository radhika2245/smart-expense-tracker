import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, Plus, Filter, ArrowRight, Tag, Check, Loader2,
    Download, ChevronDown, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

const CATEGORIES = ['All', 'Electronics', 'Groceries', 'Food & Beverage', 'Entertainment', 'Transport', 'Health', 'Shopping', 'Salary'];
const INITIAL_EXPENSES = [
    { id: 1, name: 'iQOO Neo 9', cat: 'Electronics', date: 'May 17, 2026', amt: 40999.00, type: 'expense', status: 'Completed' },
    { id: 2, name: 'Big Bazaar', cat: 'Groceries', date: 'May 16, 2026', amt: 2150.00, type: 'expense', status: 'Completed' },
    { id: 3, name: 'Netflix India', cat: 'Entertainment', date: 'May 15, 2026', amt: 649.00, type: 'expense', status: 'Recurring' },
    { id: 4, name: 'Salary Credit', cat: 'Salary', date: 'May 15, 2026', amt: 85000.00, type: 'income', status: 'Completed' },
    { id: 5, name: 'Ola Cab', cat: 'Transport', date: 'May 13, 2026', amt: 320.00, type: 'expense', status: 'Completed' },
    { id: 6, name: 'Starbucks', cat: 'Food & Beverage', date: 'May 12, 2026', amt: 480.00, type: 'expense', status: 'Completed' },
    { id: 7, name: 'Cult Fit', cat: 'Health', date: 'May 10, 2026', amt: 1999.00, type: 'expense', status: 'Recurring' },
    { id: 8, name: 'Amazon India', cat: 'Shopping', date: 'May 9, 2026', amt: 5499.00, type: 'expense', status: 'Completed' },
];

// Cat color mapping
const catColors = {
    Electronics: { bg: 'rgba(59,130,246,0.15)', text: 'rgb(96,165,250)', border: 'rgba(59,130,246,0.25)' },
    Groceries: { bg: 'rgba(16,185,129,0.12)', text: 'rgb(52,211,153)', border: 'rgba(16,185,129,0.22)' },
    'Food & Beverage': { bg: 'rgba(251,191,36,0.12)', text: 'rgb(251,191,36)', border: 'rgba(251,191,36,0.22)' },
    Entertainment: { bg: 'rgba(168,85,247,0.15)', text: 'rgb(192,132,252)', border: 'rgba(168,85,247,0.25)' },
    Transport: { bg: 'rgba(99,102,241,0.12)', text: 'rgb(129,140,248)', border: 'rgba(99,102,241,0.22)' },
    Health: { bg: 'rgba(236,72,153,0.12)', text: 'rgb(244,114,182)', border: 'rgba(236,72,153,0.22)' },
    Shopping: { bg: 'rgba(245,158,11,0.12)', text: 'rgb(245,158,11)', border: 'rgba(245,158,11,0.22)' },
    Salary: { bg: 'rgba(16,185,129,0.12)', text: 'rgb(52,211,153)', border: 'rgba(16,185,129,0.22)' },
    default: { bg: 'rgba(255,255,255,0.06)', text: 'rgba(255,255,255,0.6)', border: 'rgba(255,255,255,0.1)' },
};

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

export default function Expenses() {
    const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
    const [showQuickAdd, setShowQuickAdd] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [toast, setToast] = useState(null);
    const [catFilter, setCatFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({ title: '', amount: '', cat: 'Groceries' });

    const showToast = (msg, type = 'success') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!form.title.trim() || !form.amount) return showToast('Please fill all required fields', 'error');

        setIsSubmitting(true);
        await new Promise(r => setTimeout(r, 700));

        const newExp = {
            id: Date.now(),
            name: form.title,
            cat: form.cat,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            amt: parseFloat(form.amount),
            type: 'expense',
            status: 'Completed',
        };

        setExpenses(prev => [newExp, ...prev]);
        setIsSubmitting(false);
        setForm({ title: '', amount: '', cat: 'Groceries' });
        setShowQuickAdd(false);
        showToast(`✅ "${newExp.name}" added successfully!`);
    };

    const filtered = expenses.filter(e => {
        const catMatch = catFilter === 'All' || e.cat === catFilter;
        const searchMatch = !search || e.name.toLowerCase().includes(search.toLowerCase()) || e.cat.toLowerCase().includes(search.toLowerCase());
        return catMatch && searchMatch;
    });

    const totalIncome = filtered.filter(e => e.type === 'income').reduce((s, e) => s + e.amt, 0);
    const totalExpense = filtered.filter(e => e.type === 'expense').reduce((s, e) => s + e.amt, 0);

    return (
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }} className="space-y-6 pb-8">
            {/* Toast */}
            <AnimatePresence>
                {toast && (
                    <motion.div
                        initial={{ opacity: 0, y: -50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -30, scale: 0.95 }}
                        className={`fixed top-6 right-6 z-[200] flex items-center gap-3 px-5 py-4 rounded-2xl glass-card ${toast.type === 'success' ? 'border-emerald-500/30' : 'border-rose-500/30'}`}
                    >
                        <Check className={`w-4 h-4 ${toast.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`} />
                        <p className="text-sm font-medium">{toast.msg}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black tracking-tight text-white">Expense Report</h1>
                    <p className="text-white/40 text-sm mt-1">Full transaction history & management</p>
                </div>
                <div className="flex items-center gap-2">
                    <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
                        className="h-10 px-4 rounded-xl flex items-center gap-2 text-sm font-medium transition-all"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                    >
                        <Download className="w-4 h-4 text-white/50" /> Export
                    </motion.button>
                    <motion.button
                        onClick={() => setShowQuickAdd(!showQuickAdd)}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        className={`h-10 px-4 rounded-xl flex items-center gap-2 text-sm font-bold transition-all btn-primary ${showQuickAdd ? 'opacity-70' : ''}`}
                    >
                        <Plus className={`w-4 h-4 transition-transform ${showQuickAdd ? 'rotate-45' : ''}`} />
                        {showQuickAdd ? 'Cancel' : 'Quick Add'}
                    </motion.button>
                </div>
            </motion.div>

            {/* Summary Cards */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-4">
                {[
                    { label: 'Total Income', value: `+₹${totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, color: 'text-emerald-400', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.15)' },
                    { label: 'Total Expenses', value: `-₹${totalExpense.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, color: 'text-rose-400', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.15)' },
                    { label: 'Net Balance', value: `₹${(totalIncome - totalExpense).toLocaleString('en-IN', { minimumFractionDigits: 2 })}`, color: 'text-brand-cyan', bg: 'rgba(0,212,255,0.06)', border: 'rgba(0,212,255,0.15)' },
                ].map(({ label, value, color, bg, border }) => (
                    <div key={label} className="glass-card p-4 text-center" style={{ background: bg, borderColor: border }}>
                        <p className="text-xs text-white/40 uppercase tracking-wider font-medium mb-1">{label}</p>
                        <p className={`text-lg font-black ${color}`}>{value}</p>
                    </div>
                ))}
            </motion.div>

            {/* Quick Add Panel */}
            <AnimatePresence>
                {showQuickAdd && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="glass-card p-6 neon-border">
                            <h3 className="font-bold text-sm flex items-center gap-2 mb-4">
                                <Tag className="w-4 h-4 text-brand-cyan" /> Quick Add Expense
                            </h3>
                            <form onSubmit={handleSave} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
                                <div className="flex-1 w-full">
                                    <label className="block text-xs text-white/40 uppercase tracking-wider mb-1">Description</label>
                                    <input
                                        required value={form.title}
                                        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                        placeholder="e.g. Coffee, Uber"
                                        className="input-field"
                                    />
                                </div>
                                <div className="w-full sm:w-40">
                                    <label className="block text-xs text-white/40 uppercase tracking-wider mb-1">Amount (₹)</label>
                                    <input
                                        required type="number" step="0.01" value={form.amount}
                                        onChange={e => setForm(f => ({ ...f, amount: e.target.value }))}
                                        placeholder="0.00"
                                        className="input-field"
                                    />
                                </div>
                                <div className="w-full sm:w-44">
                                    <label className="block text-xs text-white/40 uppercase tracking-wider mb-1">Category</label>
                                    <select value={form.cat} onChange={e => setForm(f => ({ ...f, cat: e.target.value }))} className="input-field appearance-none">
                                        {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c} className="bg-[#050814]">{c}</option>)}
                                    </select>
                                </div>
                                <motion.button
                                    type="submit"
                                    disabled={isSubmitting}
                                    whileHover={!isSubmitting ? { scale: 1.04 } : {}}
                                    whileTap={!isSubmitting ? { scale: 0.96 } : {}}
                                    className="btn-primary px-5 py-3 h-[46px] flex items-center gap-2 text-sm flex-shrink-0 w-full sm:w-auto justify-center"
                                >
                                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Check className="w-4 h-4" /> Save</>}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Filters */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="input-field pl-10"
                    />
                </div>
                <div className="flex gap-2 flex-wrap">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setCatFilter(cat)}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${catFilter === cat
                                ? 'bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/25'
                                : 'text-white/40 hover:text-white/70 border border-white/06'}`}
                            style={{ background: catFilter === cat ? undefined : 'rgba(255,255,255,0.03)' }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Table */}
            <motion.div variants={fadeUp} className="glass-card overflow-hidden">
                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                <th className="py-4 px-6 text-xs font-semibold text-white/35 uppercase tracking-wider">Transaction</th>
                                <th className="py-4 px-6 text-xs font-semibold text-white/35 uppercase tracking-wider">Category</th>
                                <th className="py-4 px-6 text-xs font-semibold text-white/35 uppercase tracking-wider">Status</th>
                                <th className="py-4 px-6 text-xs font-semibold text-white/35 uppercase tracking-wider">Date</th>
                                <th className="py-4 px-6 text-xs font-semibold text-white/35 uppercase tracking-wider text-right">Amount</th>
                            </tr>
                        </thead>
                        <motion.tbody initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.04 } } }}>
                            <AnimatePresence>
                                {filtered.map((tx) => {
                                    const colors = catColors[tx.cat] || catColors.default;
                                    return (
                                        <motion.tr
                                            key={tx.id}
                                            variants={fadeUp}
                                            initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                                            whileHover={{ backgroundColor: 'rgba(255,255,255,0.035)' }}
                                            className="cursor-pointer group transition-colors"
                                            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                                        >
                                            <td className="py-4 px-6">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0 transition-all`}
                                                        style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                                                    >
                                                        {tx.name.charAt(0)}
                                                    </div>
                                                    <span className="font-semibold text-sm text-white/80 group-hover:text-brand-cyan transition-colors">{tx.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}>
                                                    {tx.cat}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`text-xs flex items-center gap-1.5 font-medium ${tx.status === 'Recurring' ? 'text-brand-cyan' : 'text-white/40'}`}>
                                                    {tx.status === 'Recurring' && <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />}
                                                    {tx.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-white/40 text-sm">{tx.date}</td>
                                            <td className={`py-4 px-6 text-right font-bold text-base ${tx.type === 'income' ? 'text-emerald-400' : 'text-white'}`}>
                                                {tx.type === 'income' ? '+' : '-'}₹{tx.amt.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </AnimatePresence>
                        </motion.tbody>
                    </table>

                    {filtered.length === 0 && (
                        <div className="py-16 text-center">
                            <p className="text-white/25 text-lg font-bold">No transactions found</p>
                            <p className="text-white/15 text-sm mt-1">Try adjusting your filters</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
}
