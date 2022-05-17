import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Board from './Board';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Board />} />
      </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
