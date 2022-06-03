const express = require('express');
const router = express.Router();
const db = require('../config/db');



router.get('/post', (req, res) => {
  const sql = 'SELECT * FROM Board';

  db.query(sql, (err, result) => {
    if(!err) res.send(result);
    else res.send(err);
  })
});


router.get('/detail/:id', (req, res) => {
  const sql = 'SELECT * FROM Board';

  db.query(sql, (err, result) => {
    if(!err) res.send(result);
    else res.send(err);
  })
});


router.post('/modify', (req, res) => {
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
   console.log(req.body)
  
  // const sql = 'UPDATE BOARD SET title = ?, content = ?, username = ?) WHERE board_idx = ?';
  // const delete_idx = req.body.num;
  // const board_idx = req.body.board_idx;
  // const title = req.body.title;
  // const username = req.body.username;
  // const content = req.body.content;
  // const views = req.body.views;
  // const params = [board_idx, title, username, content, views];

  // // const params = [delete_idx]
  // //////추가 내용/////
  // db.query(sql, params, (err, result) => {
  //   console.log(result);
  //   if(!err) res.send(result);
  //   else res.send(err);
  // })
  // res.send('update 연결');
})

router.post('/post', (req, res) => {
  console.log("=======================================")
  console.log(req.body)
  
  const sql = 'INSERT INTO Board (board_idx, title, username, content, views) VALUES (?, ?, ?, ?, ?)';

  const board_idx = req.body.board_idx;
  const title = req.body.title;
  const username = req.body.username;
  const content = req.body.content;
  const views = req.body.views;
  const params = [board_idx, title, username, content, views];

  //////추가 내용/////
  db.query(sql, params, (err, result) => {
    console.log(result);
    if(!err) res.send(result);
    else res.send(err);
  })
})

router.delete('/post/:id', (req, res) => {
  console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  console.log(req.body.num)
  
  const sql = 'DELETE FROM Board WHERE board_idx = ?';
  const delete_idx = req.body.num;
  const params = [delete_idx]
  //////추가 내용/////
  db.query(sql, params, (err, result) => {
    console.log(result);
    if(!err) res.send(result);
    else res.send(err);
  })
})






module.exports = router;