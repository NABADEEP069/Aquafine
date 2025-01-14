export default function Details() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Area Details</h1>
          
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Demographics</h2>
              <ul className="space-y-2 text-gray-600">
                <li>Population: 150,000</li>
                <li>Median Age: 35</li>
                <li>Households: 58,000</li>
                <li>Median Income: $65,000</li>
              </ul>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-4">Amenities</h2>
              <ul className="space-y-2 text-gray-600">
                <li>Schools: 25</li>
                <li>Parks: 12</li>
                <li>Shopping Centers: 8</li>
                <li>Hospitals: 3</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600">
              This area features a vibrant community with excellent schools, 
              abundant green spaces, and convenient access to shopping and healthcare facilities. 
              The neighborhood is known for its family-friendly atmosphere and strong sense of community.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}