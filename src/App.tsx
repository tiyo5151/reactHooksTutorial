import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState<number>(0);

  const handleClick = () => {
    setCount(count + 1);
    console.log(count);
    return count;
  };

  useEffect(() => {
    console.log('Hello Hooks');
  }, [count]);

  return (
    <div className="App">
      <h1>UseState</h1>
      <button onClick={handleClick}>+</button>
      <p>{count}</p>
    </div>
  );
}

export default App;
