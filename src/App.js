import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Home from './Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  useParams
} from "react-router-dom";
import Item from './Item';
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Item />} />
      </Routes>
    </Router>
  );
}

export default App;
