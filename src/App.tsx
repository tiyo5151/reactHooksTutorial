import {
  useEffect,
  useState,
  useContext,
  useRef,
  useReducer,
  useMemo,
  useCallback,
} from 'react';
import './App.css';
import myContext from './main';
import SomeChild from './someChild';
import useLocalStorage from './useLocalStorage';

const reducer = (state: number, action: { type: string }) => {
  switch (action.type) {
    case 'increment':
      return state + 1;
    case 'decrement':
      return state - 1;
    default:
      return state;
  }
};

function App() {
  const [count, setCount] = useState<number>(0);
  const myInfo = useContext(myContext); //大規模なアプリケーションでの状態管理に使用される
  const ref = useRef<HTMLInputElement>(null);
  const [state, dispatch] = useReducer(reducer, 0);

  const handleClick = () => {
    setCount(count + 1);
    console.log(count);
    return count;
  };

  useEffect(() => {
    console.log('Hello Hooks');
    // setCount(count + 1);
  }, [count]);

  const handleRef = () => {
    console.log(ref.current?.value);
    console.log(ref.current?.offsetHeight);
  };

  const [count01, setCount01] = useState<number>(0);
  const [count02, setCount02] = useState<number>(0);

  // const square = () => {
  //   let i = 0;
  //   while (i < 1000000000) {
  //     i++;
  //   }
  //   return count02 ** 2;
  // };

  const square = useMemo(() => {
    let i = 0;
    while (i < 1000000000) {
      i++;
    }
    return count02 ** 2;
  }, [count02]);

  // useCallback 関数のメモ化
  const [counter, setCounter] = useState<number>(0);

  // const showCount = () => {
  //   alert("これは重い処理です");

  const showCount = useCallback(() => {
    alert('これは重い処理です');
    setCounter(counter + 1);
  }, [counter]);

  // カスタムフック
  const [age, setAge] = useLocalStorage('age', 19);

  const setAgeFunction = (value: number) => () => {
    setAge(value);
  };

  return (
    <div className="App">
      <h1>useState,useEffect</h1>
      <button onClick={handleClick}>+</button>
      <p>{count}</p>
      <hr />
      <h1>useContext</h1>
      <p>{myInfo.name}</p>
      <p>{myInfo.age}</p>
      <hr />
      <h1>useRef</h1>
      <input type="text" ref={ref} />
      <button onClick={handleRef}>useRef</button>
      <hr />
      <h1>useReducer</h1>
      <p>カウント：{state}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <hr />
      <h1>useMemo</h1>
      <div>カウント１：{count01}</div>
      <div>カウント２：{count02}</div>
      <div>結果：{square}</div>
      <button onClick={() => setCount01(count01 + 1)}>+</button>
      <button onClick={() => setCount02(count02 + 1)}>+</button>
      <hr />
      <h1>useCallBack</h1>
      <button onClick={showCount}>カウント</button>
      <SomeChild />
      <hr />
      <h1>カスタムフック</h1>
      <p>{String(age)}</p>
      <button onClick={setAgeFunction(10)}>年齢をセット</button>
    </div>
  );
}

export default App;
