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


router.get('/postView/:id', (req, res) => {
  const sql = 'SELECT * FROM Board';

  db.query(sql, (err, result) => {
    if(!err) res.send(result);
    else res.send(err);
  })
});


// router.post('/post', upload.single('image'), (req, res) => {
// 	const sql = 'INSERT INTO Board VALUES (null, ?, ?, ?, ?)';

//   const {board_idx, title, reg_rdate, update_date} = req.body;
  
// 	connection.query(sql, params, (err, result) => {
// 		if (!err) {
// 			res.send(result)
// 		} else {
// 			res.send(err)
// 		}
// 	})
// });


module.exports = router;