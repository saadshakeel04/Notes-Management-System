import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    register({ name, email });
    navigate('/dashboard');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white font-display mb-2">Create your account</h2>
      <p className="text-gray-500 dark:text-slate-400 mb-8">Start organizing your notes in minutes</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full name"
          placeholder="Jane Doe"
          icon={User}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
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
          placeholder="At least 6 characters"
          icon={Lock}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          label="Confirm password"
          type="password"
          placeholder="Re-enter your password"
          icon={Lock}
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={error}
        />
        <Button type="submit" motion className="w-full" size="lg">
          Create account
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 dark:text-slate-400 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-brand-600 dark:text-brand-400 hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
