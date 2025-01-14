import { useAuth } from '../context/AuthContext';
import Mapp from '../components/Map';
import { Link } from 'react-router-dom';

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        {user && (
          <div className="mb-8 bg-white-500 border border-blue-300 rounded-lg p-2">
            <h1 className="text-xl font-semibold text-blue-400">
             Hey {user.email},   Welcome !
            </h1>
          </div>
        )}

        <h1 className="text-1xl hover:to-slate-600 mb-8"> AquaFine is an innovative solution designed to revolutionize fish production planning by leveraging cutting-edge technology. Traditional methods of manual surveys are labor-intensive, error-prone, and inadequate for large or remote water bodies. AquaFine addresses these challenges through advanced remote sensing, AI, and data-driven insights to optimize aquaculture operations. By integrating satellite imagery, environmental data, and predictive models, AquaFine provides scalable tools for precise production potential estimation.</h1>
   

        <div className="space-y-0">
          <Mapp /> 
          
          <div className="flex items-center justify-center h-[150px]">


          <Link to="/auth">
  <button className="px-9 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[6px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
    Get Started
  </button>
</Link>





</div>

          
          <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xxl transition-shadow duration-500 cursor-pointer">

            <h2 className="flex items-center justify-center text-3xl font-semibold mb-4">Extracted data of your featured Areas</h2>
            <Link to="/Result" className="flex items-center justify-center ml-4">
  <button className="  px-9 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[6px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
    Click here
  </button>
</Link>
            <p className="flex items-center justify-center text-gray-600">
              Explore our featured locations and discover detailed information about each area.
              Click to learn more about demographics, amenities, and local attractions.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}












