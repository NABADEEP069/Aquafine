
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
<br>

</br>
<br></br>
<br></br>
<br></br><br></br>
        <div className="space-y-4 p-3">
          <div role="alert" className="bg-green-100 dark:bg-green-900 border-l-4 border-green-500 dark:border-green-700 text-green-900 dark:text-green-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-green-200 dark:hover:bg-green-800 transform hover:scale-105">
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-shrink-0 mr-2 text-green-400" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            </svg>
            <p className="text-xs font-semibold">First Select the location </p>
          </div>
          <div role="alert" className="bg-blue-100 dark:bg-blue-900 border-l-4 border-blue-500 dark:border-blue-700 text-blue-900 dark:text-blue-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-blue-200 dark:hover:bg-blue-800 transform hover:scale-105">
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-shrink-0 mr-2 text-blue-600" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            </svg>
            <p className="text-xs font-semibold"> Then Get the data</p>
          </div>
          <div role="alert" className="bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-700 text-yellow-900 dark:text-yellow-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-yellow-200 dark:hover:bg-yellow-800 transform hover:scale-105">
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-shrink-0 mr-2 text-yellow-600" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            </svg>
            <p className="text-xs font-semibold">Next Run model</p>
          </div>
          <div role="alert" className="bg-red-100 dark:bg-red-900 border-l-4 border-red-500 dark:border-red-700 text-red-900 dark:text-red-100 p-2 rounded-lg flex items-center transition duration-300 ease-in-out hover:bg-red-200 dark:hover:bg-red-800 transform hover:scale-105">
            <svg stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-5 w-5 flex-shrink-0 mr-2 text-red-600" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 16h-1v-4h1m0-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
            </svg>
            <p className="text-xs font-semibold">AAnd finally Generate result</p>
          </div>
        </div>
      </main>
    </div>
  );
}






