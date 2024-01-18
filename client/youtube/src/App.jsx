import { useState } from "react";
import "./App.css";

function App() {
  //? Initialize the counter
  const [count, setCount] = useState(0);

  const handleCopy = () => {
    console.log("Copy");
  }

  return (
    <>
      <div>
        <h1>Counter</h1>
        <p id="counter">count: {count}</p>
        <button onClick={handleCopy}>Increment</button>
        <button >Decrement</button>
      </div>
    </>
  );
}

export default App;
