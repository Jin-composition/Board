import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Board from './Board';
import Detail from './Detail';
import UpdateBoard from './UpdateBoard';


function App() {
  const [info, setInfo] = useState([]);
  const [index, setIndex] = useState(1);
  const [selected, setSelected] = useState('');
  const [inputs, setInputs] = useState({
    board_idx: 0,
    title:'',
    username: '',
    content:'',
  });
  
  const handleSave = (data) => {
    console.log(data)
    if(data.board_idx){ //수정 데이터에는 id가 존재
      setInfo(
        info.map(row => data.board_idx == row.board_idx ? {
          
          board_idx: data.board_idx,
          title:data.title,
          username: data.username,
          content:data.content,
        } : row)
      )
    }else{
      setIndex(index+1);
      setInfo((prev) => {
        return [...prev, {
          board_idx: index,
          title: data.title,
          username: data.username,
          content:data.content,
          imgFile: data.imgFile       
        }
      ]})
    }
  }

  const nextId = useRef(1);
  
  const handleEdit = (item) => {
    const selectedData = {
      board_idx: item.board_idx,
      title: item.title,
      username: item.username,
      content:item.content,
      imgFile: item.imgFile  
    }
    console.log(selectedData)
    setSelected(selectedData)
  }

  const handleEditSubmit = (item) => {
    console.log(item);
    handleSave(item)
  }

  const handleDelete = (id) => {
    //console.log(id)
    setInfo(info => info.filter(el => el.board_idx !== id));
    //console.log(info)

  }

  const handleChange = (name, value) => {
    setInputs((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    handleChange(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    handleSave(inputs);
  
    axios.post('/api/post', inputs)
    .then((res) => {
      //console.log(res)
    })
    .catch((err) => {
      console.log("client-err"+err)   
    })
    setInputs({
      board_idx: 0,
      title: '',
      username: '',
      content: '',
    })
    
    e.target.reset();
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
        <Route exact path="/" element={<Board info={info} inputs={inputs} handleDelete={handleDelete} handleInputChange={handleInputChange} handleSubmit={handleSubmit}/>} />
        <Route exact path="/detail/:id" element={<Detail info={info} />} />
        <Route exact path="/update/:id" element={<UpdateBoard info={info} selected={selected} handleInputChange={handleInputChange} handleEdit={handleEdit} handleEditSubmit={handleEditSubmit}/>} />
      </Routes>      
      </BrowserRouter>
    </div>
  );
}

export default App;
