import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

function App() {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const flipCoin = async () => {
    if (isFlipping) return;

    setIsFlipping(true);

    try {
      const response = await fetch(`${API_URL}/api/toss`);
      const data = await response.json();

      setTimeout(() => {
        setResult(data.result);
        setIsFlipping(false);
      }, 1000);
    } catch (error) {
      console.error("Error:", error);
      setIsFlipping(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <main className="flex-grow flex flex-col items-center justify-center">
        <div
          className={`w-40 h-40 rounded-full bg-yellow-400 border-4 border-yellow-500
                     flex items-center justify-center mb-8 transition-transform duration-1000
                     ${isFlipping ? "scale-110" : "scale-100"}`}
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
      </main>

      <footer className="py-4 text-center text-gray-600">
        © {new Date().getFullYear()} Sainik. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
