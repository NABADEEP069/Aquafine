import { LogOut, Search } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function Navbar() {
  useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
        
      <Link to="/">
            <div className="mt-3.5">
            <button className="px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[2px_2px_5px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
              AquafineAI
            </button>
            </div>
      </Link>



          <div className="flex space-x-4 items-center">
          
              



            <Link to="/details">
              <div className="mt-0">
                <button className="px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[2px_2px_5px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
                  Details of Area
                </button>
              </div>
            </Link>




            <button
            onClick={handleSignOut}
           
            className="px-4 py-2 text-black backdrop-blur-sm border border-black rounded-md hover:shadow-[2px_2px_5px_4px_rgba(0,0,0,0.1)] bg-white/[0.2] text-sm transition duration-200">
            <LogOut className="h-0 w-5" />
            <span>Sign Out</span>
          </button>
           
          </div>
        </div>
      </div>

    
    </nav>
  );
}
