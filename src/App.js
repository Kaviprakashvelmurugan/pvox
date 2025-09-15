import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import './App.css';
import PhotoDetail from './components/PhotoDetail';

function App() {
  return (
    <BrowserRouter>
       <Routes>
          <Route path='/' element= {<Home/>} />
          <Route path='/photos/:photoId' element= {<PhotoDetail/>} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;
