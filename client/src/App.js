import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Board from './Board';
import Detail from './Detail';


function App() {
  const [info, setInfo] = useState([]);
  const [index, setIndex] = useState(1);

  

  const handleSave = (data) => {
    setIndex(index+1);
    setInfo((prev) => {
      return [...prev, {
        board_idx: index,
        title: data.title,
        username: data.username,
        content:data.content,
        views: data.views,       
      }
    ]})
  }
  

  const handleDelete = (id) => {
    //console.log(id)
    setInfo(info => info.filter(el => el.board_idx !== id));
    //console.log(info)

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
        <Route exact path="/" element={<Board info={info} handleSave={handleSave} handleDelete={handleDelete}/>} />
        <Route exact path="/detail/:id" element={<Detail info={info} />} />
      </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
