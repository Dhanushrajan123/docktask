import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ textAlign: 'center', marginTop: '80px', fontFamily: 'sans-serif' }}>
      <h1>🐳 Docker Multi-Stage Build Test</h1>
      <p>If you can see this running in a container, the build worked!</p>
      <h2>{count}</h2>
      <button onClick={() => setCount(count + 1)} style={{ marginRight: '10px' }}>
        Increment
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>
    </div>
  );
}

export default App;
