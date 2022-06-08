const express = require('express');
const router = express.Router();
const db = require('../config/db');



router.get('/board', (req, res) => {
  const sql = 'SELECT @ROWNUM:=@ROWNUM+1, rn.* FROM Board rn, (SELECT @ROWNUM:=0) R;';

  db.query(sql, (err, result) => {
    if(!err) res.send(result);
    else res.send(err);
  })
});


router.get('/detail/:id', (req, res) => {
  console.log("*******************************")
  console.log(req.query['0'])

  const id = req.query['0']
  const sql = 'SELECT * FROM Board WHERE id = ?';

  db.query(sql, id, (err, result) => {
    if(!err) res.send(result);
    else res.send(err);
  })

});


router.put('/update', (req, res) => {
  console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
   console.log(req.body)
  
   const id = req.body.id;
   const title = req.body.title;
   const content = req.body.content;
   const username = req.body.username;
   const params = [id, title, username, content, id];
   const sql = 'UPDATE Board SET title = ?, username= ?, content = ? WHERE id = ?';
   //////추가 내용/////
   db.query(sql, params, (err, result) => {
    console.log(result);
    if(!err) res.send(result);
    else res.redirect('/');
  })
  //res.send('update 연결');
})

router.post('/post', (req, res) => {
  console.log("=======================================")
  console.log(req.body)
  
  const sql = 'INSERT INTO Board (id, title, username, content) VALUES (?, ?, ?, ?)';

  const id = req.body.id;
  const title = req.body.title;
  const username = req.body.username;
  const content = req.body.content;
  const params = [id, title, username, content];

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
  
  const sql = 'DELETE FROM Board WHERE id = ?';
  const delete_idx = req.body.num;
  const params = [delete_idx]
  //////추가 내용/////
  db.query(sql, params, (err, result) => {
    console.log(result);
    if(!err) res.send(result);
    else res.send(err);
  })
})

router.post('/comment', (req, res) => {
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
  console.log(req.body)
  
  const sql = 'INSERT INTO Comment (id, title, username, cdepth) VALUES (?, ?, ?, 1)';

  const id = req.body.id;
  const title = req.body.title;
  const username = req.body.username;
  const cdepth = req.body.cdepth;
  const params = [id, title, username, cdepth];

  //////추가 내용/////
  db.query(sql, params, (err, result) => {
    console.log(result);
    if(!err) res.send(result);
    else res.send(err);
  })
})


router.get('/comment', (req, res) => {
  console.log("*******************************")
  console.log(req.query['0'])

  const id = req.query['0']
  const sql = 'SELECT * FROM Board AS b LEFT JOIN Comments AS c ON b.id = c.board_id WHERE b.id = ?';

  db.query(sql, id, (err, result) => {
    if(!err) res.send(result);
    else res.send(err);
  })
  

});
module.exports = router;