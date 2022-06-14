const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/board', (req, res) => {
  const sql =
    'SELECT @ROWNUM:=@ROWNUM+1, rn.* FROM Board rn, (SELECT @ROWNUM:=0) R;';

  db.query(sql, (err, result) => {
    if (!err) res.send(result);
    else res.send(err);
  });
});

router.get('/detail/:id', (req, res) => {
  console.log('*******************************');
  console.log(req.query['0']);

  const id = req.query['0'];
  const sql = 'SELECT * FROM Board WHERE id = ?';

  db.query(sql, id, (err, result) => {
    if (!err) res.send(result);
    else res.send(err);
  });
});

router.put('/update', (req, res) => {
  console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~');
  console.log(req.body);

  const id = req.body.id;
  const title = req.body.title;
  const content = req.body.content;
  const username = req.body.username;
  const params = [title, username, content, id];
  const sql =
    'UPDATE Board SET title = ?, username= ?, content = ? WHERE id = ?';
  //////추가 내용/////
  db.query(sql, params, (err, result) => {
    console.log(result);
    if (!err) res.send(result);
    else res.redirect('/');
  });
  //res.send('update 연결');
});

router.post('/post', (req, res) => {
  console.log('=======================================');
  console.log(req.body);

  const sql =
    'INSERT INTO Board (id, title, username, content) VALUES (?, ?, ?, ?)';

  const id = req.body.id;
  const title = req.body.title;
  const username = req.body.username;
  const content = req.body.content;
  const params = [id, title, username, content];

  //////추가 내용/////
  db.query(sql, params, (err, result) => {
    console.log(result);
    if (!err) res.send(result);
    else res.send(err);
  });
});

router.delete('/post/:id', (req, res) => {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.log(req.body.num);

  const sql = 'DELETE FROM Board WHERE id = ?';
  const delete_idx = req.body.num;
  const params = [delete_idx];
  //////추가 내용/////
  db.query(sql, params, (err, result) => {
    console.log(result);
    if (!err) res.send(result);
    else res.send(err);
  });
});

router.post('/comment', (req, res) => {
  console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$');
  console.log(req.body);
  console.log(req.body.board_id);

  const sql =
    'INSERT INTO Comments (id, ctitle, cusername, cdepth, cgroup, board_id) VALUES (?, ?, ?, ?, ?, ?)';

  const id = req.body.id;
  const ctitle = req.body.ctitle;
  const cusername = req.body.cusername;
  const cdepth = req.body.cdepth;
  const board_id = Number(req.body.board_id);
  const cgroup = req.body.cgroup;
  const params = [id, ctitle, cusername, cdepth, cgroup, board_id];

  //////추가 내용/////
  db.query(sql, params, (err, result) => {
    console.log(result);
    if (!err) res.send('ok');
    else res.send(err);
  });
});

router.get('/getcomment', (req, res) => {
  console.log('*******************************');
  console.log(req.query['0']);

  const id = req.query['0'];
  const sql =
    'SELECT c.id, c.ctitle, c.cusername, c.cdepth, c.cgroup, c.board_id FROM Board AS b LEFT JOIN Comments AS c ON b.id = c.board_id WHERE b.id = ? AND board_id IS NOT null';

  db.query(sql, id, (err, result) => {
    if (!err) res.send(result);
    else res.send(err);
  });
});

router.post('/reply', (req, res) => {
  console.log('ㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜ');
  console.log(req.body.comments_id);

  const sql =
    'INSERT INTO Reply (id, rtitle, rusername,  comments_id, rdepth, rctitle) VALUES (?, ?, ?, ?, 1, ?)';

  const id = req.body.id;
  const rtitle = req.body.rtitle;
  const rusername = req.body.rusername;
  const rdepth = req.body.rdepth;
  const comments_id = req.body.comments_id;
  const rctitle = req.body.ctitle;
  const params = [id, rtitle, rusername, comments_id, rdepth, rctitle];

  //////추가 내용/////
  db.query(sql, params, (err, result) => {
    console.log(result);
    if (!err) res.send('ok');
    else res.send(err);
  });
});

router.delete('/comment/:id', (req, res) => {
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.log(req.body.deleteNum);
  console.log(req.body.ctitle);

  const sql =
    'UPDATE Comments SET ctitle = "작성자에 의해 삭제된 댓글 입니다"  WHERE id = ?';
  const update_idx = req.body.deleteNum;
  //////추가 내용/////
  db.query(sql, update_idx, (err, result) => {
    console.log(result);
    if (!err) {
      res.send(result);
      console.log(result);
    } else res.send(err);
  });
});

router.get('/getreply', (req, res) => {
  console.log('*******************************');
  console.log(req.query);

  const id = req.query.id;
  const idid = req.query.idid;
  const params = [id, idid];
  const sql = `SELECT rtitle, rusername,comments_id, ctitle FROM Board AS b 
  LEFT JOIN Comments AS c ON b.id = c.board_id 
  LEFT JOIN Reply AS r ON c.id = r.comments_id 
  WHERE b.id = ? AND c.id = ?`;

  //console.log(sql)

  db.query(sql, params, (err, result) => {
    if (!err) {
      res.send(result);
      //console.log(result)
    } else res.send(err);
  });
});

module.exports = router;
