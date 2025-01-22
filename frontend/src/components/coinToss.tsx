import { useState } from "react";

const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8080"
).replace(/\/+$/, "");

const CoinToss = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const flipCoin = async () => {
    if (isFlipping) return;

    setIsFlipping(true);
    const endpoint = `${API_URL}/api/toss`;

    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      setTimeout(() => {
        setResult(data.result);
        setIsFlipping(false);
      }, 1500);
    } catch (err) {
      const error = err as Error;
      console.error("Error:", error.message);
      setIsFlipping(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className={`w-40 h-40 rounded-full bg-yellow-400 border-4 border-yellow-500
                   flex items-center justify-center transition-all duration-[1500ms]
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
