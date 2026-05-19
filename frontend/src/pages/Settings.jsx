import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Bell, Shield, Palette, CreditCard, Globe, ChevronRight, Moon, Sun, Check } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } };

const sections = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'security', icon: Shield, label: 'Security' },
    { id: 'appearance', icon: Palette, label: 'Appearance' },
    { id: 'billing', icon: CreditCard, label: 'Billing' },
    { id: 'locale', icon: Globe, label: 'Region & Language' },
];

export default function Settings() {
    const [activeSection, setActiveSection] = useState('profile');
    const [darkMode, setDarkMode] = useState(true);
    const [saved, setSaved] = useState(false);
    const [profile, setProfile] = useState({ name: 'Ankit Kumar', email: 'ankit@aiflow.io', timezone: 'Asia/Kolkata', currency: 'USD' });
    const [notifications, setNotifications] = useState({ email: true, aiInsights: true, budget: true, weekly: false });

    const handleSave = async () => {
        await new Promise(r => setTimeout(r, 700));
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
    };

    return (
        <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.08 }} className="space-y-6 pb-8">
            <motion.div variants={fadeUp}>
                <h1 className="text-3xl font-black tracking-tight text-white">Settings</h1>
                <p className="text-white/40 text-sm mt-1">Manage your account preferences</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar Nav */}
                <motion.div variants={fadeUp} className="glass-card p-3 h-fit">
                    {sections.map(({ id, icon: Icon, label }) => (
                        <button
                            key={id}
                            onClick={() => setActiveSection(id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all mb-1 text-left ${activeSection === id
                                    ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20'
                                    : 'text-white/50 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            <span className="flex-1">{label}</span>
                            <ChevronRight className={`w-3.5 h-3.5 transition-transform ${activeSection === id ? 'rotate-90 text-brand-cyan' : 'text-white/20'}`} />
                        </button>
                    ))}
                </motion.div>

                {/* Content */}
                <motion.div variants={fadeUp} className="lg:col-span-3 space-y-4">
                    {activeSection === 'profile' && (
                        <div className="glass-card p-6 space-y-5">
                            <div className="flex items-center gap-4 pb-5 border-b border-white/[0.06]">
                                <div className="relative">
                                    <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-black text-white"
                                        style={{ background: 'linear-gradient(135deg, #00d4ff, #a855f7)' }}>AK</div>
                                    <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-lg bg-brand-cyan text-brand-darker flex items-center justify-center text-xs font-bold">✎</button>
                                </div>
                                <div>
                                    <p className="font-bold text-lg">{profile.name}</p>
                                    <p className="text-white/40 text-sm">{profile.email}</p>
                                    <span className="text-[10px] text-brand-cyan bg-brand-cyan/10 border border-brand-cyan/20 px-2 py-0.5 rounded-full font-semibold mt-1 inline-block">Pro Plan</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    { label: 'Full Name', key: 'name', type: 'text' },
                                    { label: 'Email Address', key: 'email', type: 'email' },
                                    { label: 'Timezone', key: 'timezone', type: 'text' },
                                    { label: 'Currency', key: 'currency', type: 'text' },
                                ].map(({ label, key, type }) => (
                                    <div key={key}>
                                        <label className="block text-xs font-medium text-white/40 uppercase tracking-wider mb-1.5">{label}</label>
                                        <input
                                            type={type}
                                            value={profile[key]}
                                            onChange={e => setProfile(p => ({ ...p, [key]: e.target.value }))}
                                            className="input-field"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeSection === 'notifications' && (
                        <div className="glass-card p-6 space-y-4">
                            <h3 className="font-bold text-base mb-4">Notification Preferences</h3>
                            {[
                                { key: 'email', label: 'Email Notifications', desc: 'Receive weekly financial summaries via email' },
                                { key: 'aiInsights', label: 'AI Insights Alerts', desc: 'Get notified when Aura AI detects spending anomalies' },
                                { key: 'budget', label: 'Budget Warnings', desc: 'Alert when you exceed 80% of your monthly budget' },
                                { key: 'weekly', label: 'Weekly Reports', desc: 'Every Sunday morning digest of the week\'s transactions' },
                            ].map(({ key, label, desc }) => (
                                <div key={key} className="flex items-center justify-between p-4 rounded-xl transition-all"
                                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                    <div>
                                        <p className="font-semibold text-sm text-white">{label}</p>
                                        <p className="text-xs text-white/40 mt-0.5">{desc}</p>
                                    </div>
                                    <button
                                        onClick={() => setNotifications(n => ({ ...n, [key]: !n[key] }))}
                                        className={`relative w-12 h-6 rounded-full transition-all ${notifications[key] ? 'bg-brand-cyan' : 'bg-white/15'}`}
                                        style={{ boxShadow: notifications[key] ? '0 0 15px rgba(0,212,255,0.35)' : undefined }}
                                    >
                                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${notifications[key] ? 'left-7' : 'left-1'}`} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeSection === 'appearance' && (
                        <div className="glass-card p-6">
                            <h3 className="font-bold text-base mb-4">Appearance</h3>
                            <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div className="flex items-center gap-3">
                                    {darkMode ? <Moon className="w-5 h-5 text-brand-purple" /> : <Sun className="w-5 h-5 text-amber-400" />}
                                    <div>
                                        <p className="font-semibold text-sm">{darkMode ? 'Dark Mode' : 'Light Mode'}</p>
                                        <p className="text-xs text-white/40">Cyberpunk premium theme</p>
                                    </div>
                                </div>
                                <button onClick={() => setDarkMode(!darkMode)} className={`relative w-12 h-6 rounded-full transition-all ${darkMode ? 'bg-brand-purple' : 'bg-amber-400'}`}>
                                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${darkMode ? 'left-7' : 'left-1'}`} />
                                </button>
                            </div>
                        </div>
                    )}

                    {!['profile', 'notifications', 'appearance'].includes(activeSection) && (
                        <div className="glass-card p-16 text-center">
                            <p className="text-4xl mb-4">🚧</p>
                            <p className="font-bold text-white/50">Coming soon</p>
                            <p className="text-white/25 text-sm mt-1">This section is under construction</p>
                        </div>
                    )}

                    {/* Save Button */}
                    <motion.button
                        onClick={handleSave}
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                        className={`btn-primary px-8 py-3 text-sm flex items-center gap-2 ${saved ? 'opacity-70' : ''}`}
                    >
                        {saved ? <><Check className="w-4 h-4" /> Saved!</> : 'Save Changes'}
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
}
