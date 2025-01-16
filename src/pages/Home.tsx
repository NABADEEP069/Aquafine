import { useAuth } from '../context/AuthContext';
import Mapp from '../components/Map';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {user && (
          <div className="mb-8 bg-white border border-blue-300 rounded-lg p-4">
            <h1 className="text-xl font-semibold text-blue-500 text-center">
              Hey {user.email}, Welcome!
            </h1>
          </div>
        )}

        <h1 className="text-lg sm:text-xl md:text-2xl text-gray-800 mb-8 text-center">
          AquaFine is an innovative solution designed to revolutionize fish production planning by leveraging cutting-edge technology. Traditional methods of manual surveys are labor-intensive, error-prone, and inadequate for large or remote water bodies. AquaFine addresses these challenges through advanced remote sensing, AI, and data-driven insights to optimize aquaculture operations. By integrating satellite imagery, environmental data, and predictive models, AquaFine provides scalable tools for precise production potential estimation.
        </h1>

        <div>
          <div className="flex items-center justify-center h-[150px]">
            <Link to="/auth">
              <button className="px-6 py-3 rounded-md border border-black bg-white text-black text-sm sm:text-base hover:shadow-[6px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
                Get Started
              </button>
            </Link>
          </div>

          

         
        </div>
      </main>
    </div>
  );
}
