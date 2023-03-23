// import logo from './logo.svg';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import ViewData from './pages/ViewData';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path = "/" element={<Home />} />
          <Route path = "/ViewData" element={<ViewData />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
