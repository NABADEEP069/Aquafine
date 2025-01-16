import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
       
        {user && (
          <div className="mb-5 bg-white border border-blue-300 rounded-lg p-2.5">
            <h1 className="text-xl font-semibold text-blue-500 text-center">
              Hey {user.email}, Welcome!
            </h1>
          </div>
        )}

      
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-800 mb-12 text-center max-w-4xl mx-auto leading-relaxed">
          <span className="font-light">AquaFine is an innovative solution designed to</span>{' '}
          <span className="font-semibold text-blue-600">revolutionize fish production planning</span>{' '}
          <span className="font-light">by leveraging cutting-edge technology.</span>{' '}
          <span className="font-normal">
            Through advanced remote sensing, AI, and data-driven insights, AquaFine optimizes aquaculture operations, providing scalable tools for precise production potential estimation.
          </span>
        </h1>

        <div className="flex items-center justify-center">
          <Link to="/auth">
            <button className="px-6 py-3 rounded-md border border-black bg-white text-black text-sm sm:text-base hover:shadow-[6px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
              Get Started
            </button>
          </Link>
        </div>
      </main>
    </div>
  );
}
