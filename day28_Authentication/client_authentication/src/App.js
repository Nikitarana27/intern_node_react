// import logo from './logo.svg';
import './App.css';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Home from './pages/Home'
import { BrowserRouter , Routes ,Route} from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      {/* <div className="App"> */}
      <Routes>
        <Route path='/' element={<Registration />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Home' element={<Home />} />
      </Routes>
      {/* </div> */}
    </BrowserRouter>
    </>
  );
}

export default App;
