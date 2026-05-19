import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import FloatShapes from '../components/3d/FloatShapes';
import { ChevronRight, ArrowRight, Shield, Zap, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-brand-darker overflow-hidden">
            {/* Background 3D Canvas */}
            <div className="absolute inset-0 z-0 opacity-80 pointer-events-none md:pointer-events-auto">
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                    <FloatShapes />
                </Canvas>
            </div>

            {/* Navbar overlay */}
            <header className="relative z-20 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <div className="text-2xl font-bold tracking-tighter flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-cyan to-brand-purple" />
                    <span>Aura<span className="text-white/50">Finance</span></span>
                </div>
                <div className="hidden md:flex gap-8 text-sm font-medium text-white/70">
                    <a href="#features" className="hover:text-white transition-colors">Features</a>
                    <a href="#ai" className="hover:text-white transition-colors">AI Insights</a>
                    <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
                </div>
                <button
                    onClick={() => navigate('/login')}
                    className="relative px-6 py-2 rounded-full font-medium text-sm overflow-hidden group"
                >
                    <div className="absolute inset-0 bg-white/10 group-hover:bg-white/20 transition-colors" />
                    <div className="absolute inset-0 neon-border opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span className="relative flex items-center gap-2 transition-transform group-hover:translate-x-1">
                        Login <ChevronRight className="w-4 h-4" />
                    </span>
                </button>
            </header>

            {/* Hero Section */}
            <main className="relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 text-center max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8"
                >
                    <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse" />
                    <span className="text-sm font-medium">Aura Intelligence 2.0 is live</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
                    className="text-6xl md:text-8xl font-black tracking-tighter mb-6 leading-[1.1]"
                >
                    Track Expenses. <br />
                    <span className="gradient-text">Predict the Future.</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl font-light"
                >
                    The next-generation futuristic dashboard powered by AI. Experience predictive limits, intelligent categorizations, and beautiful 3D analytics.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                    className="flex flex-col sm:flex-row gap-4"
                >
                    <button
                        onClick={() => navigate('/login')}
                        className="px-8 py-4 rounded-full bg-white text-brand-darker font-bold text-lg hover:bg-white/90 transition-all shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:scale-105 flex items-center justify-center gap-2 group"
                    >
                        Get Started
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button className="px-8 py-4 rounded-full glass font-medium text-lg hover:bg-white/10 transition-colors flex items-center justify-center">
                        View Live Demo
                    </button>
                </motion.div>
            </main>

            {/* Features Grid */}
            <section className="relative z-10 py-32 px-8 max-w-7xl mx-auto" id="features">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { icon: Zap, title: "Real-time AI Insights", desc: "Our neural engine monitors spending and predicts budget breaches before they happen." },
                        { icon: TrendingUp, title: "Predictive Analytics", desc: "Linear regression algorithms estimate your exact spend by the end of the month." },
                        { icon: Shield, title: "Bank-Grade Encryption", desc: "Your data is encrypted, secure, and purely yours. We never sell to third parties." },
                    ].map((feat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: i * 0.1 }}
                            className="glass-card p-8 group hover:-translate-y-2 transition-transform duration-300"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 flex items-center justify-center mb-6 group-hover:bg-brand-cyan/20 transition-colors">
                                <feat.icon className="w-6 h-6 text-brand-purple group-hover:text-brand-cyan transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                            <p className="text-white/60 leading-relaxed">{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
