import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Board from './Board';
import PostView from './PostView';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Board />} />
        <Route exact path='/postView' element={<PostView />} />
      </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
