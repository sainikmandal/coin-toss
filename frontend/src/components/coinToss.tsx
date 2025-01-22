import { useState, useEffect } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const CoinToss = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Log API URL on component mount
  useEffect(() => {
    console.log("Environment:", import.meta.env.MODE);
    console.log("API URL:", API_URL);
  }, []);

  const flipCoin = async () => {
    if (isFlipping) return;

    setIsFlipping(true);
    const endpoint = `${API_URL}/api/toss`;
    console.log("Fetching from:", endpoint);

    try {
      const response = await fetch(endpoint);
      console.log("Response:", response);
      const data = await response.json();
      console.log("Data received:", data);

      setTimeout(() => {
        setResult(data.result);
        setIsFlipping(false);
      }, 1500);
    } catch (err) {
      // Properly type the error
      const error = err as Error;
      console.error("Error details:", {
        message: error.message || "Unknown error",
        stack: error.stack || "No stack trace",
        type: error.name || "Unknown error type",
      });
      setIsFlipping(false);
    }
  };

  return (
    <div className="text-center perspective-1000">
      <div
        className={`w-40 h-40 rounded-full bg-yellow-400 border-4 border-yellow-500
                   flex items-center justify-center mb-8 transition-all duration-[1500ms]
                   ${isFlipping ? "animate-flip" : ""}`}
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <span className="text-2xl font-bold">
          {result ? result.toUpperCase() : "TOSS!"}
        </span>
      </div>

      <button
        onClick={flipCoin}
        disabled={isFlipping}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg font-semibold
                 hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
      >
        {isFlipping ? "Flipping..." : "Toss Coin"}
      </button>

      {/* Debug info */}
      <div className="mt-4 text-xs text-gray-500">API: {API_URL}</div>
    </div>
  );
};

export default CoinToss;
