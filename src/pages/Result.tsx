'use client';

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
  const [error, setError] = useState<string | null>(null);
  const [generationIntervalId, setGenerationIntervalId] = useState<ReturnType<typeof setInterval> | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedData);
    setCopyButtonText("Copied!");
    setTimeout(() => setCopyButtonText("Copy Data"), 2000);
  };

  const handleDownload = () => {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const stopGeneration = () => {
    if (generationIntervalId) {
      clearInterval(generationIntervalId); 
      setGenerationIntervalId(null);
      setIsGenerating(false); 
    }
  };

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
      setIsGenerating(true);

      import('./public/data.json')
        .then((module) => {
          if (Object.keys(module).length === 0) {
            throw new Error("JSON file is empty or not found");
          }
          setData(module.default);

          const dataString = JSON.stringify(module.default, null, 2);
          let index = 0;

          const intervalId = setInterval(() => {
            if (index < dataString.length) {
              setGeneratedData((prev) => prev + dataString[index]);
              index++;
            } else {
              clearInterval(intervalId);
              setGenerationIntervalId(null);
              setIsGenerating(false);
            }
          }, 20);

          setGenerationIntervalId(intervalId as ReturnType<typeof setInterval>);
        })
        .catch((error) => {
          console.error('Error loading JSON:', error);
          setError(error.message);
          setIsGenerating(false);
        });
    }, 3000);

    return () => {
      clearTimeout(loadingTimer);
      if (generationIntervalId) clearInterval(generationIntervalId);
    };
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
          <GeneratingState generatedData={generatedData} stopGeneration={stopGeneration} />
        ) : error ? (
          <ErrorState message={error} />
        ) : data ? (
          <DataDisplay data={generatedData} handleCopy={handleCopy} copyButtonText={copyButtonText} />
        ) : (
          <ErrorState message="No data available" />
        )}
      </div>
      {!isGenerating && data && (
        <div className="flex items-center justify-center mt-4">
          <button
            onClick={handleDownload}
            className="px-6 py-3 rounded-md border border-black bg-white text-black text-sm sm:text-base hover:shadow-[6px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
          >
            Download Data
          </button>
        </div>
      )}
    </div>
  );
};

const ErrorState = ({ message }: { message: string }) => (
  <div className="text-center text-red-500">
    <p>{message}</p>
  </div>
);

const DataDisplay = ({ data, handleCopy, copyButtonText }: { data: string, handleCopy: () => void, copyButtonText: string }) => (
  <div>
    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
      {data}
    </pre>
    <button
      onClick={handleCopy}
      className="mt-4 px-6 py-3 rounded-md border border-black bg-white text-black text-sm sm:text-base hover:shadow-[6px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
    >
      {copyButtonText}
    </button>
  </div>
);

const LoadingState = () => (
  <div className="text-center text-gray-500">
    <p>Loading...</p>
  </div>
);

const GeneratingState = ({ generatedData, stopGeneration }: { generatedData: string, stopGeneration: () => void }) => (
  <div className="text-center text-gray-500">
    <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
      {generatedData}
    </pre>
    <p>Generating data...</p>
    <button
      onClick={stopGeneration}
      className="mt-4 px-6 py-3 rounded-md border border-red-500 bg-white text-red-500 text-sm sm:text-base hover:shadow-[6px_4px_0px_0px_rgba(255,0,0)] transition duration-200"
    >
      Stop Generation
    </button>
  </div>
);

export default App;
