import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 12 }}
          className="text-8xl font-bold bg-gradient-to-r from-brand-500 to-accent-500 bg-clip-text text-transparent font-display mb-4"
        >
          404
        </motion.div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display mb-2">Page not found</h1>
        <p className="text-gray-500 dark:text-slate-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <Link to="/dashboard">
            <Button motion>
              <Home className="w-4 h-4" />
              Go to Dashboard
            </Button>
          </Link>
          <Link to="/">
            <Button variant="secondary">
              <ArrowLeft className="w-4 h-4" />
              Back home
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
