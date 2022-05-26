import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Board from './Board';
import PostView from './PostView';


function App() {
  const [info, setInfo] = useState([]);

  const handleSave = (data) => {
    setInfo((prev) => {
      return [...prev, {
        board_idx: data.board_idx,
        title: data.title,
        username: data.username,       
      }
    ]
    })
  }


  useEffect(() => {
    axios.get('/api/post/')
      .then(res => setInfo(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Board info={info} onSaveData={handleSave} />} />
        <Route exact path="/postView/:id" element={<PostView info={info} />} />
      </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
