import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, CreditCard, Sparkles, Settings,
    Bell, Search, Plus, ChevronDown, User,
    LogOut, Moon, Sun, X
} from 'lucide-react';

// ─── Floating Bubbles ────────────────────────────────────────────────────────
// Each entry: primary neon color in raw r,g,b for composing gradients
const NEON_COLORS = [
    { r: 0, g: 212, b: 255, name: 'cyan' },
    { r: 99, g: 102, b: 241, name: 'indigo' },
    { r: 168, g: 85, b: 247, name: 'purple' },
    { r: 236, g: 72, b: 153, name: 'pink' },
    { r: 16, g: 185, b: 129, name: 'teal' },
    { r: 245, g: 158, b: 11, name: 'amber' },
    { r: 56, g: 189, b: 248, name: 'sky' },
];

// Build a stable list once at module level (avoids re-randomizing on every render)
const BUBBLE_LIST = Array.from({ length: 22 }, (_, i) => {
    const c = NEON_COLORS[i % NEON_COLORS.length];
    const size = 28 + (i * 17 + 11) % 68; // deterministic "random" size 28-96px
    return {
        id: i,
        size,
        left: (i * 4.7 + 1.3) % 100,          // spread evenly across width
        duration: 18 + (i * 3.7) % 20,          // 18–38s float cycle
        delay: (i * 2.3) % 22,                   // staggered start
        driftX: -40 + (i * 11) % 80,            // gentle sideways drift ±40px
        r: c.r, g: c.g, b: c.b,
    };
});

function GlassBubble({ id, size, left, duration, delay, driftX, r, g, b }) {
    // All glass effects via pure layered gradients — ZERO blur
    const background = [
        // Layer 1: bright specular crescent at top-left (simulates light on glass)
        `radial-gradient(ellipse 38% 26% at 28% 22%, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.0) 100%)`,
        // Layer 2: secondary rim highlight at bottom-right
        `radial-gradient(ellipse 20% 14% at 76% 80%, rgba(${r},${g},${b},0.55) 0%, transparent 100%)`,
        // Layer 3: colored glass body — transparent center, richer at edges
        `radial-gradient(ellipse 80% 80% at 50% 50%, rgba(${r},${g},${b},0.06) 0%, rgba(${r},${g},${b},0.18) 65%, rgba(${r},${g},${b},0.28) 100%)`,
    ].join(', ');

    const border = `rgba(${r},${g},${b},0.70)`;
    const shadow = [
        // outer glow halo
        `0 0 20px 5px rgba(${r},${g},${b},0.32)`,
        // tight bright rim
        `0 0 5px 1px rgba(${r},${g},${b},0.55)`,
        // inner colored fill
        `inset 0 0 18px rgba(${r},${g},${b},0.14)`,
        // inner top-edge bright rim (sharpness)
        `inset 0 2px 4px rgba(255,255,255,0.18)`,
    ].join(', ');

    return (
        <motion.div
            key={id}
            initial={{ y: '108vh', opacity: 0, scale: 0.5 }}
            animate={{
                y: '-8vh',
                x: [0, driftX * 0.35, driftX, driftX * 0.5, 0],
                opacity: [0, 1, 0.92, 0.78, 0],
                scale: [0.5, 1, 1.03, 0.97, 0.88],
            }}
            transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
                delay,
                times: [0, 0.1, 0.5, 0.88, 1],
            }}
            className="absolute rounded-full"
            style={{
                width: size,
                height: size,
                left: `${left}%`,
                background,
                border: `1.5px solid ${border}`,
                boxShadow: shadow,
                // NO backdropFilter, NO filter
            }}
        />
    );
}

const AMBIENT_ORBS = [
    { top: '-12%', left: '-6%', w: 720, h: 720, r: 0, g: 212, b: 255, dur: 22, dx: [0, 70, -25, 0], dy: [0, -50, 15, 0] },
    { bottom: '-14%', right: '-6%', w: 820, h: 820, r: 168, g: 85, b: 247, dur: 28, dx: [0, -60, 35, 0], dy: [0, 55, -15, 0] },
    { top: '38%', right: '8%', w: 480, h: 480, r: 236, g: 72, b: 153, dur: 19, dx: [0, 45, -18, 0], dy: [0, -38, 55, 0] },
    { top: '62%', left: '22%', w: 380, h: 380, r: 16, g: 185, b: 129, dur: 24, dx: [0, -35, 52, 0], dy: [0, 45, -28, 0] },
    { top: '8%', right: '28%', w: 340, h: 340, r: 245, g: 158, b: 11, dur: 17, dx: [0, 28, -44, 0], dy: [0, -22, 40, 0] },
];

function FloatingBubbles() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">

            {/* ── Deep background ambient colour wash ── */}
            {AMBIENT_ORBS.map((o, i) => {
                const pos = {};
                if (o.top) pos.top = o.top;
                if (o.bottom) pos.bottom = o.bottom;
                if (o.left) pos.left = o.left;
                if (o.right) pos.right = o.right;
                return (
                    <motion.div
                        key={i}
                        animate={{ x: o.dx, y: o.dy, scale: [1, 1.18, 1.05, 1] }}
                        transition={{ duration: o.dur, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute rounded-full"
                        style={{
                            ...pos,
                            width: o.w, height: o.h,
                            background: `radial-gradient(circle, rgba(${o.r},${o.g},${o.b},0.13) 0%, rgba(${o.r},${o.g},${o.b},0.04) 50%, transparent 72%)`,
                        }}
                    />
                );
            })}

            {/* ── Premium glass bubbles ── */}
            {BUBBLE_LIST.map((b) => <GlassBubble key={b.id} {...b} />)}
        </div>
    );
}


// ─── Sidebar ─────────────────────────────────────────────────────────────────
const navLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, color: 'text-brand-cyan' },
    { to: '/expenses', label: 'Expenses', icon: CreditCard, color: 'text-brand-purple' },
    { to: '/insights', label: 'Insights', icon: Sparkles, color: 'text-emerald-400', badge: '2' },
    { to: '/settings', label: 'Settings', icon: Settings, color: 'text-white/50' },
];

function Sidebar({ location }) {
    return (
        <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="w-64 flex flex-col py-8 px-5 sticky top-0 h-screen z-40 hidden md:flex flex-shrink-0 border-r border-white/[0.08]"
            style={{ background: 'transparent' }}
        >
            {/* Logo */}
            <Link to="/dashboard" className="flex items-center gap-3 mb-10 px-2 group">
                <motion.div
                    whileHover={{ rotate: 15, scale: 1.1 }}
                    className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm"
                    style={{ background: 'linear-gradient(135deg, #00d4ff, #a855f7)' }}
                >
                    AI
                </motion.div>
                <div>
                    <h1 className="text-xl font-bold tracking-tight gradient-text">AI Flow</h1>
                    <p className="text-[10px] text-white/30 font-medium tracking-widest uppercase">Finance</p>
                </div>
            </Link>

            {/* Nav */}
            <nav className="flex flex-col gap-1 flex-1">
                {navLinks.map(({ to, label, icon: Icon, color, badge }) => {
                    const isActive = location.pathname === to;
                    return (
                        <Link key={to} to={to} className={`sidebar-link group ${isActive ? 'active' : ''}`}>
                            <motion.div whileHover={{ scale: 1.15 }} className={`${isActive ? 'text-brand-cyan' : color} transition-colors group-hover:text-brand-cyan`}>
                                <Icon className="w-5 h-5" />
                            </motion.div>
                            <span className="font-medium text-sm flex-1 group-hover:translate-x-1 transition-transform duration-200">
                                {label}
                            </span>
                            {badge && (
                                <span className="text-[10px] font-bold bg-brand-purple/30 text-brand-purple border border-brand-purple/40 px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.3)]">
                                    +{badge}
                                </span>
                            )}
                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-brand-cyan rounded-l-full shadow-[0_0_10px_rgba(0,212,255,0.8)]"
                                />
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom user info */}
            <div className="mt-auto pt-6 border-t border-white/[0.06]">
                <div className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-all cursor-pointer group">
                    <div className="relative">
                        <div className="w-9 h-9 rounded-xl overflow-hidden" style={{ background: 'linear-gradient(135deg, #00d4ff, #a855f7)' }}>
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=AIFlow&backgroundColor=transparent"
                                alt="User avatar"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.currentTarget.style.display = 'none';
                                    e.currentTarget.parentElement.innerHTML = '<span class="text-white font-bold text-sm flex items-center justify-center w-full h-full">AK</span>';
                                }}
                            />
                        </div>
                        <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-brand-darker rounded-full" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold truncate text-white group-hover:text-brand-cyan transition-colors">Ankit Kumar</p>
                        <p className="text-[11px] text-white/40 truncate">ankit@aiflow.io</p>
                    </div>
                    <LogOut className="w-4 h-4 text-white/30 group-hover:text-rose-400 transition-colors flex-shrink-0" />
                </div>
            </div>
        </motion.aside>
    );
}

// ─── Topbar ───────────────────────────────────────────────────────────────────
function Topbar({ onAddRecord, location }) {
    const [showNotif, setShowNotif] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);

    const pageTitle = {
        '/dashboard': 'Overview',
        '/expenses': 'Expenses',
        '/insights': 'AI Insights',
        '/settings': 'Settings',
    }[location.pathname] || 'Dashboard';

    return (
        <header className="h-[70px] glass border-b border-white/[0.06] flex items-center justify-between px-6 z-30 sticky top-0 flex-shrink-0">
            {/* Page title */}
            <div className="hidden md:block">
                <p className="text-xs text-white/35 font-medium uppercase tracking-widest">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                <h2 className="text-lg font-bold text-white">{pageTitle}</h2>
            </div>

            {/* Search */}
            <motion.div
                animate={{ width: searchFocused ? 280 : 220 }}
                className="relative hidden sm:block"
            >
                <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${searchFocused ? 'text-brand-cyan' : 'text-white/30'}`} />
                <input
                    type="text"
                    placeholder="Search transactions..."
                    onFocus={() => setSearchFocused(true)}
                    onBlur={() => setSearchFocused(false)}
                    className="input-field pl-10 py-2.5 h-10 text-sm"
                />
            </motion.div>

            {/* Right actions */}
            <div className="flex items-center gap-3">
                {/* Add Record Button */}
                <motion.button
                    onClick={onAddRecord}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="btn-primary px-4 py-2.5 text-sm flex items-center gap-2 h-10"
                >
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:block">Add Record</span>
                </motion.button>

                {/* Notifications */}
                <div className="relative">
                    <motion.button
                        onClick={() => { setShowNotif(!showNotif); setShowProfile(false); }}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.92 }}
                        className="w-10 h-10 rounded-xl glass flex items-center justify-center relative hover:border-brand-cyan/30 transition-all"
                    >
                        <Bell className="w-4 h-4 text-white/70" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-brand-cyan rounded-full animate-pulse-glow" />
                    </motion.button>

                    <AnimatePresence>
                        {showNotif && (
                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                                className="absolute right-0 mt-2 w-80 glass-card py-3 z-50 border border-white/10"
                            >
                                <div className="px-4 py-2 border-b border-white/[0.06] flex items-center justify-between">
                                    <p className="font-semibold text-sm">Notifications</p>
                                    <span className="text-[10px] text-brand-cyan font-medium bg-brand-cyan/10 px-2 py-0.5 rounded-full">3 New</span>
                                </div>
                                {[
                                    { icon: '💡', title: 'AI Insight Ready', msg: 'New spending analysis available', time: '2m ago' },
                                    { icon: '⚠️', title: 'Budget Alert', msg: 'Food budget 85% spent', time: '1h ago' },
                                    { icon: '✅', title: 'Record Saved', msg: 'Netflix transaction added', time: '3h ago' },
                                ].map((n, i) => (
                                    <motion.div key={i} whileHover={{ backgroundColor: 'rgba(255,255,255,0.04)' }} className="px-4 py-3 flex gap-3 cursor-pointer">
                                        <span className="text-lg flex-shrink-0">{n.icon}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-semibold text-white">{n.title}</p>
                                            <p className="text-xs text-white/50 mt-0.5">{n.msg}</p>
                                        </div>
                                        <p className="text-[10px] text-white/30 flex-shrink-0">{n.time}</p>
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* User Profile */}
                <div className="relative">
                    <motion.button
                        onClick={() => { setShowProfile(!showProfile); setShowNotif(false); }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2.5 h-10 px-3 rounded-xl glass hover:border-brand-cyan/30 transition-all"
                    >
                        <div className="relative w-7 h-7 rounded-lg overflow-hidden ring-1 ring-brand-cyan/30" style={{ background: 'linear-gradient(135deg, #00d4ff, #a855f7)' }}>
                            <img
                                src="https://api.dicebear.com/7.x/avataaars/svg?seed=AIFlow&backgroundColor=transparent"
                                alt="Profile"
                                className="w-full h-full object-cover"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                            />
                            <span className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs">AK</span>
                        </div>
                        <span className="text-sm font-medium text-white/80 hidden sm:block">Ankit</span>
                        <ChevronDown className={`w-3.5 h-3.5 text-white/40 transition-transform ${showProfile ? 'rotate-180' : ''}`} />
                    </motion.button>

                    <AnimatePresence>
                        {showProfile && (
                            <motion.div
                                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                                className="absolute right-0 mt-2 w-60 glass-card py-2 z-50 border border-white/10"
                            >
                                <div className="px-4 py-3 border-b border-white/[0.06]">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center text-white font-bold" style={{ background: 'linear-gradient(135deg, #00d4ff, #a855f7)' }}>AK</div>
                                        <div>
                                            <p className="font-semibold text-sm">Ankit Kumar</p>
                                            <p className="text-xs text-white/40">ankit@aiflow.io</p>
                                        </div>
                                    </div>
                                </div>
                                {[
                                    { icon: User, label: 'My Profile' },
                                    { icon: Settings, label: 'Settings' },
                                    { icon: Moon, label: 'Dark Mode', active: true },
                                ].map(({ icon: Icon, label, active }) => (
                                    <motion.button key={label} whileHover={{ backgroundColor: 'rgba(255,255,255,0.05)', x: 4 }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/70 hover:text-white transition-colors">
                                        <Icon className="w-4 h-4" />
                                        <span className="flex-1 text-left">{label}</span>
                                        {active && <span className="text-[10px] text-brand-cyan bg-brand-cyan/10 px-2 py-0.5 rounded-full">On</span>}
                                    </motion.button>
                                ))}
                                <div className="border-t border-white/[0.06] mt-1 pt-1">
                                    <motion.button whileHover={{ backgroundColor: 'rgba(244,63,94,0.08)', x: 4 }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-400 hover:text-rose-300 transition-colors">
                                        <LogOut className="w-4 h-4" />
                                        Sign Out
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}

// ─── Main Layout ──────────────────────────────────────────────────────────────
export default function Layout({ children, onAddRecord }) {
    const location = useLocation();

    return (
        <div className="flex min-h-screen bg-brand-darker text-white relative bg-grid">
            <FloatingBubbles />

            <Sidebar location={location} />

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 relative z-10">
                <Topbar onAddRecord={onAddRecord} location={location} />

                <main className="flex-1 p-6 md:p-8 relative">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
}
