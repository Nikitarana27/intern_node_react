// import logo from './logo.svg';
// import './App.css';
import {BrowserRouter ,Routes,Route} from 'react-router-dom';
import Home from './Pages/Home';
import AddUser from './Pages/AddUser';
import View from './Components/View';
import Edit from './Pages/Edit';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/AddUser" element={<AddUser />} />
      <Route path="/View" element={<View />} />
      <Route path="/Edit" element={<Edit />} />
      </Routes> 
    </div>
    </BrowserRouter>
  );
}

export default App;
