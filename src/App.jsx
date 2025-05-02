import { BrowserRouter, Routes, Route } from "react-router-dom";
import Todo from "./components/Todo";
import History from "./components/History";
import About from "./components/About";
import { useState } from "react";
import "./App.css";

function App() {
  // For reset, we need to force a reload. We'll use a key prop on the main div.
  const [resetKey, setResetKey] = useState(0);

  const handleReset = () => {
    localStorage.clear();
    setResetKey((k) => k + 1);
  };

  return (
    <BrowserRouter>
      <div
        key={resetKey}
        className="background-container bg-gradient-to-br from-indigo-200 to-rose-200 min-h-screen min-w-full flex items-center justify-center backdrop-blur-3xl"
      >
        <Routes>
          <Route path="/" element={<Todo onReset={handleReset} />} />
          <Route path="/history" element={<History />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
