import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { ArrowLeft, Mail, Lock, User as UserIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FloatShapes from '../components/3d/FloatShapes';

export default function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleAuth = (e) => {
        e.preventDefault();
        // Quick mock auth flow for presentation
        navigate('/dashboard');
    };

    return (
        <div className="min-h-screen bg-brand-darker flex relative overflow-hidden">
            {/* 3D Background - Right Side Split screen effect */}
            <div className="absolute inset-0 md:w-1/2 md:left-1/2 z-0">
                <div className="w-full h-full bg-brand-dark/50 absolute inset-0 md:hidden z-10" />
                <Canvas camera={{ position: [0, 0, 4], fov: 40 }} className="opacity-60 md:opacity-100">
                    <FloatShapes />
                </Canvas>

                {/* Animated Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-darker via-transparent to-transparent z-10" />
            </div>

            <div className="relative z-10 flex flex-col justify-center px-8 md:px-20 w-full md:w-1/2 h-screen">
                <button
                    onClick={() => navigate('/')}
                    className="absolute top-8 left-8 text-white/50 hover:text-white flex items-center gap-2 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4" /> Back
                </button>

                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md mx-auto"
                >
                    <div className="mb-10">
                        <h2 className="text-4xl font-bold mb-2">
                            {isLogin ? 'Welcome back' : 'Create an account'}
                        </h2>
                        <p className="text-white/50">
                            {isLogin ? 'Enter your details to access your dashboard.' : 'Start your financial journey today.'}
                        </p>
                    </div>

                    <form onSubmit={handleAuth} className="space-y-4">
                        <AnimatePresence mode="popLayout">
                            {!isLogin && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <label className="block text-sm font-medium mb-1.5 text-white/80">Full Name</label>
                                    <div className="relative">
                                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                        <input
                                            type="text"
                                            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-brand-cyan transition-colors"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-white/80">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    type="email"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-brand-cyan transition-colors"
                                    placeholder="you@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1.5 text-white/80">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30" />
                                <input
                                    type="password"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white placeholder-white/30 focus:outline-none focus:border-brand-cyan transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-3.5 rounded-xl bg-white text-brand-darker font-bold text-lg hover:bg-white/90 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] mt-4"
                            type="submit"
                        >
                            {isLogin ? 'Sign In' : 'Create Account'}
                        </motion.button>
                    </form>

                    <div className="mt-8 text-center text-sm text-white/50">
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-brand-cyan hover:text-brand-cyan/80 font-medium transition-colors"
                        >
                            {isLogin ? 'Sign up' : 'Log in'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
