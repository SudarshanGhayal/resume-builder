import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ResumeBuilder from "./components/ResumeCreatoForm"; // Uppercase import

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* Old Vite template code removed */}

      {/* Correct Component Usage */}
      <ResumeBuilder />
    </>
  );
}

export default App;
