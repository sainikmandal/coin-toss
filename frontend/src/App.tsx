import { useState } from "react";
import { motion } from "framer-motion";
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

      // Wait for animation to complete before showing result
      setTimeout(() => {
        setResult(data.result);
        setIsFlipping(false);
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      setIsFlipping(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <motion.div
        className="w-40 h-40 rounded-full bg-yellow-400 border-4 border-yellow-500 flex items-center justify-center mb-8"
        animate={{
          rotateX: isFlipping ? 1440 : 0,
          scale: isFlipping ? 1.2 : 1,
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
        }}
      >
        <span className="text-2xl font-bold">
          {result ? result.toUpperCase() : "TOSS!"}
        </span>
      </motion.div>

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
}

export default App;
