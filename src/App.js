import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import NewTemplate from './components/NewTemplate/NewTemplate';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <div className='container'>
      <BrowserRouter basename="/">
        <Navigation>
          <Link to="/">Главная</Link>
          <Link to="/new_template">Создать шаблон</Link>
        </Navigation>
        
        <Routes>
          <Route path="/" element={<HomePage />} index />
          <Route path="/new_template" element={<NewTemplate />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;