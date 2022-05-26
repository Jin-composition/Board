import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

import './Td.css';

const Td = ({item}) => {

  return (
    <tr className='tdTr'>
      <td className='tdTitle'>{item.board_idx}</td>
      <Link to={`/postView/${item.board_idx}`}><td className='tdTitle'>{item.title}</td></Link>
      <td>{item.username}</td>
      <td>{moment(item.reg_rdate).format('YYYY.MM.DD HH:mm:ss')}</td>
      {/* <td>{item.update_date}</td> */}
    </tr>  
  );

};

export default Td;