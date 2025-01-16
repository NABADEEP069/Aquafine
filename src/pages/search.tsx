
import { Link } from "react-router-dom";
import Mapp from "../components/Map"; 

export default function Search() {
 return (
                <div className="space-y-6">
         <Mapp />



         <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xxl transition-shadow duration-500 cursor-pointer">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-center">
              Extracted Data of Your Selected Areas
            </h2>
            <div className="flex justify-center mb-4">
              <Link to="/Result">
                <button className="px-6 py-3 rounded-md border border-black bg-white text-black text-sm sm:text-base hover:shadow-[6px_4px_0px_0px_rgba(0,0,0)] transition duration-200">
                  Click Here
                </button>
              </Link>
            </div>
            <p className="text-gray-600 text-center">
              Explore our featured locations and discover detailed information about each area.
              Click to learn more about demographics, amenities, and local attractions.
            </p>
          </div>
     </div>
     );
}
