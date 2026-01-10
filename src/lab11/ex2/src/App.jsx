import React, { useState, useEffect } from "react"
import "./App.css"

const App = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Component mounted - This runs only once")
  }, []);

  useEffect(() => {
    document.title = `You clicked ${count} times`
  }, [count]);

  return (
    <div className="container">
      <h1>Exercise 2 - Effects</h1>
      <p>You clicked {count} times!</p>
      <button onClick={() => setCount(count + 1)}>Click Me</button>
    </div>
  )
}

export default App;