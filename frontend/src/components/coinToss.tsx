import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

const CoinToss = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const flipCoin = async () => {
    if (isFlipping) return;

    setIsFlipping(true);
    console.log("Attempting to fetch from:", `${API_URL}/api/toss`);

    try {
      const response = await fetch(`${API_URL}/api/toss`);
      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      setTimeout(() => {
        setResult(data.result);
        setIsFlipping(false);
      }, 1500); // Match this with animation duration
    } catch (error) {
      console.error("Detailed error:", error);
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
    </div>
  );
};

export default CoinToss;
