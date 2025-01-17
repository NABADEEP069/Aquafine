
'use client'

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
  const [error, setError] = useState<string | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopyButtonText("Copied!");
    setTimeout(() => setCopyButtonText("Copy Data"), 2000);
  };

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setIsGenerating(true);

      // Use dynamic import with error handling
      import('./public/data.json')
        .then((module) => {
          if (Object.keys(module).length === 0) {
            throw new Error("JSON file is empty or not found");
          }
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
          }, 50);
        })
        .catch((error) => {
          console.error('Error loading JSON:', error);
          setError(error.message);
          setIsGenerating(false);
        });
    }, 3000);

    return () => clearTimeout(loadingTimer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] -z-10" />
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Your Generated Data
        </h1>
        <p className="text-center text-gray-600 mb-8">
          For the beta version, we take only one geolocation.
        </p>
        {isLoading ? (
          <LoadingState />
        ) : isGenerating ? (
          <GeneratingState generatedData={generatedData} />
        ) : error ? (
          <ErrorState message={error} />
        ) : data ? (
          <DataDisplay data={data} handleCopy={handleCopy} copyButtonText={copyButtonText} />
        ) : (
          <ErrorState message="No data available" />
        )}
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="flex flex-col justify-center items-center h-80">
    <motion.div
      className="w-3/4 h-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
      animate={{
        scaleX: [1, 1.5, 1],
        opacity: [1, 0.5, 1],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <p className="text-gray-700 mt-4 text-lg font-semibold">Loading...</p>
  </div>
);

const GeneratingState = ({ generatedData }: { generatedData: string }) => (
  <div className="flex flex-col justify-center items-center h-96">
    <motion.div
      className="w-1/2 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl"
      animate={{
        scale: [1, 1.05, 1],
      }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
    <p className="text-gray-700 mt-4 text-lg font-semibold">Generating your data...</p>
    <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 mt-4 overflow-x-auto max-h-60 w-full">
      <code>{generatedData || "// Initializing..."}</code>
    </pre>
  </div>
);

const DataDisplay = ({ data, handleCopy, copyButtonText }: { data: DataType, handleCopy: () => void, copyButtonText: string }) => (
  <div>
    <h2 className="text-xl font-semibold text-gray-700 mb-4">
      Successfully Generated Data:
    </h2>
    <pre className="bg-gray-100 p-4 rounded-lg text-sm text-gray-800 overflow-x-auto max-h-96 mb-4">
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
    <motion.button
      onClick={handleCopy}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      whileTap={{ scale: 0.95 }}
    >
      {copyButtonText}
    </motion.button>
  </div>
);

const ErrorState = ({ message }: { message: string }) => (
  <div className="text-center text-red-500">
    <p className="text-lg font-semibold">Error: {message}</p>
    <p className="mt-2">Please check if the data.json file exists in the public folder and is not empty.</p>
  </div>
);

export default App;

