// import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Branches from './pages/Branches';
import HR from './pages/HR';
import Edit from './components/Edit.js';
import HrEdit from './components/HrEdit';
import BranchEdit from './components/BranchEdit';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/Branches' element={<Branches />} />
    <Route path='/HR' element={<HR />} />
    <Route path='/Edit' element={<Edit />} />
    <Route path='/HrEdit' element={<HrEdit />} />
    <Route path='/BranchEdit' element={<BranchEdit />} />
    </Routes>  
    </div>
    </BrowserRouter>
  );
}

export default App;
