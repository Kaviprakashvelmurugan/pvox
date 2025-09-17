import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './components/Home'
import './App.css';
import PhotoDetail from './components/PhotoDetail';
import VideoDetail from './components/VideoDetail';

function App() {
  return (
    <BrowserRouter>
       <Routes>
          <Route path='/' element= {<Home/>} />
          <Route path='/photos/:photoId' element= {<PhotoDetail/>} />
          <Route path = '/videos/:videoId' element = {<VideoDetail/>}/>
       </Routes>
    </BrowserRouter>
  );
}

export default App;
