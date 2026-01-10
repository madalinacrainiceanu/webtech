import React, { useState } from "react"
import "./App.css"

const App = () => {
  const [steps, setSteps] = useState(0);

  return (
    <div className="container">
      <h1>Monitorizare Pasi</h1>
      
      <p>Astazi ai facut {steps} pasi!</p>
      
      {/* Butonul care creste numarul de pasi */}
      <button onClick={() => setSteps(steps + 1)}>Adauga un pas</button>

      {/* Aici este CONDITIONAL RENDERING (cerinta laboratorului) */}
      {steps >= 5 ? (
        <div className="message success">
          <h2>Obiectiv atins! Ai facut 5 pasi.</h2>
        </div>
      ) : (
        <div className="message warning">
          <h2>Mai ai de mers pana la obiectiv...</h2>
        </div>
      )}
    </div>
  )
}

export default App;