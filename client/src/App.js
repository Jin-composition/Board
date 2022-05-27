import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Board from './Board';
import Detail from './Detail';


function App() {
  const [info, setInfo] = useState([]);
  const [selected, setSelected] = useState('');

  const nextId = useRef(3);

  const handleSave = (data) => {
    if(data.id){
      setInfo(
        info.map(row => data.id === row.id ? {
          title: data.title,
          content: data.content
        } : row))
    }else{
      setInfo((prev) => {
        return [...prev, {
          board_idx: info.length+1,
          title: data.title,
          username: data.username,       
        }
      ]
      })
      nextId.current += 1;
    }
  }

  // const handleEdit = (item) => {
  //   const selectedData = {
  //     board_idx: info.length+1,
  //     title: data.title,
  //     username: data.username,
  //   }
  // }


  useEffect(() => {
    axios.get('/api/post/')
      .then(res => setInfo(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Board info={info} handleSave={handleSave} />} />
        <Route exact path="/postView/:id" element={<Detail info={info} />} />
      </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
