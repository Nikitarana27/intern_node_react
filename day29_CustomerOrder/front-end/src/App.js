// import logo from './logo.svg';
import './App.css';
import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Orders from './pages/Orders';

function App() {
  
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Registration />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/Cart" element={<Cart />} />
      <Route path="/Orders" element={<Orders />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}       

export default App;
