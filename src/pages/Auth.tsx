import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { createProfile } from '../lib/auth';
import { LogOut, UserCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function Auth() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isSignUp) {
        const { data, error: signUpError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (signUpError) throw signUpError;

        if (data.user) {
          try {
            await createProfile({ userId: data.user.id, email });
            toast.success('Registration successful! Please sign in.');
            setIsSignUp(false);
          } catch (profileError) {
            console.error('Profile creation error:', profileError);
            await supabase.auth.signOut();
            throw new Error('Failed to create profile');
          }
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) throw error;

        toast.success('Welcome back!');
        navigate('/search');
      }
    } catch (error) {
      if (error instanceof Error && error.message.includes('User already registered')) {
        toast.error('Account already exists. Please sign in.');
        setIsSignUp(false);
      } else {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('An unknown error occurred');
        }
      }
    } finally {
      setLoading(false);
    }
  };

  function handleSignOut(_event: React.MouseEvent<HTMLButtonElement>): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wheat-100 to-white-100 p-5">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 sm:p-12">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-indigo-100 rounded-full mb-4 transition-transform duration-300 ease-in-out hover:scale-110">
                <UserCircle2 className="h-12 w-12 text-indigo-600" />
              </div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                {isSignUp ? 'Create an Account' : 'Welcome Back'}
              </h2>
              <p className="text-gray-600">
                {isSignUp ? 'Hey Buddy!' : 'Sign in to continue'}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-200"
                  required
                  minLength={6}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? 'Please wait...'
                  : isSignUp
                  ? 'Create Account'
                  : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition duration-200"
              >
                {isSignUp
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleSignOut}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out transform hover:-translate-y-1 hover:shadow-md"
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
}
