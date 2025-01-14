import { useEffect, useState } from 'react';

interface DataType {
  reportTitle: string;
  identifiedWaterBodies: { id: number; area: number; geometry: string }[];
  integratedEnvironmentalParameters: {
    id: number;
    area: number;
    geometry: string;
    temperature: number;
    pH: number;
  }[];
  modelEvaluation: { [key: string]: any };
  fishProductionCapacityPredictions: number[];
}

const App = () => {
  const [data, setData] = useState<DataType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedData, setGeneratedData] = useState("");
  const [copyButtonText, setCopyButtonText] = useState("Copy Data");

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopyButtonText("Copied!");
    setTimeout(() => setCopyButtonText("Copy Data"), 2000); // Reset after 2 seconds; noholi eta bostu copy paste hoi thakibo
  };

  useEffect(() => {
    
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setIsGenerating(true);

    
      import('./public/data.json')
        .then((module) => {
          setData(module.default);

        
          const dataString = JSON.stringify(module.default, null, 2);
          let index = 0;
          const interval = setInterval(() => {
            if (index < dataString.length) {
              setGeneratedData((prev) => prev + dataString[index]);
              index++;
            } else {
              clearInterval(interval);
              setIsGenerating(false);
            }
          }, 60); // eyat hoi speed of data generation
        })
        .catch((error) => {
          console.error('Error loading JSON:', error);
          setIsGenerating(false);
        });
    }, 4000); //  loading bar r time tu eyat change korbo pari

  
    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Your Generated Data (in JSON format)
      </h1>
      <p className="text-center text-gray-600 mb-8">
        For the beta version, we take only one geolocation.
      </p>
      {isLoading ? (
        <div className="flex flex-col justify-center items-center h-80">
          <div className="w-3/4 h-3 bg-gradient-to-r from-blue-500 to-purple-900 rounded-full animate-pulse"></div>

          <p className="text-gray-700 mt-4 text-lg">Loading...</p>
        </div>
      ) : isGenerating ? (
        <div className="flex flex-col justify-center items-center h-96">
          <div className="w-1/2 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl animate-pulse"></div>
          <p className="text-gray-700 mt-4 text-lg">Generating your data...</p>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 mt-4 overflow-x-auto">
            {generatedData || "// Initializing..."}
          </pre>
        </div>
      ) : data ? (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Successfully Generated Data:
          </h2>
          <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 overflow-x-auto">
            {JSON.stringify(data, null, 2)}
          </pre>
          <button
            onClick={handleCopy}
            className="px-8 py-0.5  border-2 border-black dark:border-white uppercase bg-white text-black transition duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
          
          
            {copyButtonText}
          </button>
        </div>
      ) : (
        <div className="text-center text-red-500">
          <p>Error loading data. Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default App;






