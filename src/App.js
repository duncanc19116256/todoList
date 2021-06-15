import React from 'react';
import './App.css';

import Todo from './components/Todo.js'
import Header from './components/Header.js'




function App() {
  
  return (
    <div className="App">
      
      <Header></Header>

      <Todo></Todo>
    </div>
  );
}

export default App;
