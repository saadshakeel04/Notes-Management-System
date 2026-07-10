import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import NoteForm from '../components/notes/NoteForm';

export default function CreateNote() {
  return (
    <div className="max-w-3xl mx-auto">
      <Link to="/notes" className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 mb-4 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to notes
      </Link>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="card-base p-6 lg:p-8"
      >
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white font-display mb-6">Create a new note</h1>
        <NoteForm />
      </motion.div>
    </div>
  );
}
