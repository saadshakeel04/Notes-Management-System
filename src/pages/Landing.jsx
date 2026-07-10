import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  StickyNote, Star, Archive, Search, Folder, Palette,
  ArrowRight, Moon, Sun, Check, Zap, Shield, Layers,
} from 'lucide-react';
import ThemeToggle from '../components/ui/ThemeToggle';
import { useAuth } from '../context/AuthContext';

const FEATURES = [
  { icon: StickyNote, title: 'Rich Note Editor', description: 'Create beautiful notes with titles, tags, and categories.' },
  { icon: Palette, title: 'Color Labels', description: 'Visually organize notes with 9 distinct color labels.' },
  { icon: Search, title: 'Instant Search', description: 'Find any note by title, content, or tag in milliseconds.' },
  { icon: Star, title: 'Favorites & Pinning', description: 'Star important notes and pin them to the top.' },
  { icon: Archive, title: 'Archive & Trash', description: 'Declutter without losing anything. Restore anytime.' },
  { icon: Folder, title: 'Smart Categories', description: 'Group notes into custom categories for quick access.' },
];

const STATS = [
  { value: '10K+', label: 'Notes created' },
  { value: '2.5K', label: 'Active users' },
  { value: '99%', label: 'Satisfaction' },
  { value: '24/7', label: 'Always available' },
];

export default function Landing() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Nav */}
      <nav className="fixed top-0 inset-x-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-gray-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="Notely Logo" className="w-9 h-9 object-contain" />
            <span className="text-xl font-bold text-gray-900 dark:text-white font-display">Notely</span>
          </Link>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-base px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm shadow-sm hover:shadow-glow">
                Dashboard
              </Link>
            ) : (
              <>
                <Link to="/login" className="btn-base px-4 py-2 text-gray-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 text-sm font-medium">
                  Sign in
                </Link>
                <Link to="/register" className="btn-base px-4 py-2 bg-brand-600 hover:bg-brand-700 text-white text-sm shadow-sm hover:shadow-glow">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-brand-200 dark:bg-brand-900/20 rounded-full blur-3xl opacity-60" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-200 dark:bg-accent-900/20 rounded-full blur-3xl opacity-60" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-100 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6"
          >
            <Zap className="w-3.5 h-3.5" />
            Premium notes experience, reimagined
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white font-display leading-[1.1] text-balance mb-6"
          >
            Your thoughts,
            <span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent"> beautifully organized.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 text-balance"
          >
            Notely is a modern notes management system that helps you capture ideas, organize with categories and color labels, and find everything instantly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to={isAuthenticated ? '/dashboard' : '/register'} className="btn-base px-6 py-3.5 bg-brand-600 hover:bg-brand-700 text-white text-base font-medium shadow-lg hover:shadow-glow group">
              Start for free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/login" className="btn-base px-6 py-3.5 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700 text-base font-medium">
              Sign in
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-3xl mx-auto"
          >
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white font-display">{stat.value}</div>
                <div className="text-sm text-gray-500 dark:text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-white dark:bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white font-display mb-3">
              Everything you need to stay organized
            </h2>
            <p className="text-lg text-gray-500 dark:text-slate-400 max-w-2xl mx-auto">
              Powerful features wrapped in a clean, distraction-free interface.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card-base p-6 hover:shadow-card-hover transition-shadow"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-950/40 flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-brand-600 to-accent-600 p-12 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-accent-300 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-display mb-4">
              Ready to organize your thoughts?
            </h2>
            <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
              Join thousands of users who trust Notely to keep their notes organized and accessible.
            </p>
            <Link to={isAuthenticated ? '/dashboard' : '/register'} className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white text-brand-700 font-medium hover:bg-gray-100 transition-colors shadow-lg group">
              Get started for free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-slate-800 py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Notely Logo" className="w-7 h-7 object-contain" />
            <span className="font-semibold text-gray-900 dark:text-white font-display">Notely</span>
          </div>
          <p className="text-sm text-gray-400 dark:text-slate-500"><p className="text-sm text-white/50">© {new Date().getFullYear()} Notely. All rights reserved.</p></p>
        </div>
      </footer>
    </div>
  );
}