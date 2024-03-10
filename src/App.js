import React from 'react';
import './App.css';
import Weather from './weather';
import Header from './header';

function App() {
  return (
    <>
    <Header />
    <div class="App">
    <header class="App-header">
    <Weather />
    </header>
    </div>
    
    </>
  );
}

export default App;