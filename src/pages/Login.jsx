import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    login({ name: email.split('@')[0].replace(/^\w/, (c) => c.toUpperCase()), email });
    navigate('/dashboard');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display mb-2">Welcome back</h2>
      <p className="text-gray-500 dark:text-slate-400 mb-8">Sign in to your account to continue</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label="Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error}
        />
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-gray-600 dark:text-slate-400">
            <input type="checkbox" className="rounded border-gray-300 dark:border-slate-600 text-brand-600 focus:ring-brand-500" />
            Remember me
          </label>
          <button type="button" className="text-brand-600 dark:text-brand-400 hover:underline font-medium">
            Forgot password?
          </button>
        </div>
        <Button type="submit" motion className="w-full" size="lg">
          Sign in
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 dark:text-slate-400 mt-6">
        Don't have an account?{' '}
        <Link to="/register" className="text-brand-600 dark:text-brand-400 hover:underline font-medium">
          Sign up
        </Link>
      </p>
    </div>
  );
}
