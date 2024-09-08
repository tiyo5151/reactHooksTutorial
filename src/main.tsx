import { createContext, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const myInfo = {
  name: 'tiyo',
  age: 19,
};

const myContext = createContext(myInfo);

createRoot(document.getElementById('root')!).render(
  <myContext.Provider value={myInfo}>
    <StrictMode>
      <App />
    </StrictMode>
  </myContext.Provider>
);

export default myContext;
