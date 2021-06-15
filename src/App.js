import React from 'react';
import './App.css';

import Todo from './components/Todo.js'
import Header from './components/Header.js'

const useStateWithLocalStorage = localStorageKey => {
  const [value, setValue] = React.useState(
    localStorage.getItem(localStorageKey) || ''
  );

  React.useEffect(() => {
    localStorage.setItem(localStorageKey, value);
  }, [value]);

  return [value, setValue];
};

function App() {
  
  return (
    <div className="App">
      
      <Header></Header>

      <Todo></Todo>
    </div>
  );
}

export default App;
