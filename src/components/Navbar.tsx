import { useState } from 'react';
import { LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
        
          <Link to="/">
            <div className="mt-3.5">
              <button className="px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[2px_2px_5px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
                AquafineAI
              </button>
            </div>
          </Link>

         
          <div className="lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-black focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>


          <div className="hidden lg:flex space-x-4 items-center">
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[2px_2px_5px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200"
            >
              <LogOut className="h-0 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

     
        {menuOpen && (
          <div className="lg:hidden flex flex-col space-y-2 mt-2">
            <Link
              to="/"
              className="px-12 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[2px_2px_5px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[2px_2px_5px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200"
            >
              <LogOut className="h-4 w-4 inline-block" />
              <span>Sign Out</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
