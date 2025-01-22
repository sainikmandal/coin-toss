import CoinToss from "./components/coinToss";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex items-center justify-center bg-gray-100">
        <CoinToss />
      </main>
      <Footer />
    </div>
  );
}

export default App;
