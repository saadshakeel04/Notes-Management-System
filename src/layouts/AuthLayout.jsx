import { Outlet, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { CircleArrowLeft } from 'lucide-react';
import ThemeToggle from '../components/ui/ThemeToggle';

export default function AuthLayout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex">
      {/* Left side - branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-accent-700">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-300 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          <Link to="/" className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors" aria-label="Go back" >
          <CircleArrowLeft className="w-6 h-6" />
          </Link>

          <div className="space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl font-bold font-display leading-tight text-balance"
            >
              Your thoughts, beautifully organized.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-white/80 max-w-md"
            >
              Capture ideas, organize with categories and color labels, and find everything instantly. Notely makes note-taking feel effortless.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex gap-6 pt-4"
            >
              {[
                { label: 'Notes created', value: '10K+' },
                { label: 'Active users', value: '2.5K' },
                { label: 'Satisfaction', value: '99%' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>

         <p className="text-sm text-white/50">© {new Date().getFullYear()} Notely. All rights reserved.</p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-6">
          <Link to="/" className="lg:hidden flex items-center gap-2">
            <img src="/logo.svg" alt="Notely Logo" className="w-8 h-8 object-contain" />
            <span className="text-lg font-bold text-gray-900 dark:text-white font-display">Notely</span>
          </Link>
          <div className="ml-auto">
            <ThemeToggle />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center px-6 pb-12">
          <div className="w-full max-w-md">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}