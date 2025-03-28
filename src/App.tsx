import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { PriceLogApp } from "./priceLogApp";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PriceLogApp />
    </>
  );
}

export default App;
