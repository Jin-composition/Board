import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Td.css';

const Td = ({item}) => {
  const [dataList, setDataList] = useState([]);

    return (
      <tr className='tdTr'>
        <td>{item.id}</td>
        <Link to={`/postView/${item.no}`}><td className='tdTitle'>{item.name}</td></Link>
        <td>{item.username}</td>
        <td>{item.address.zipcode}</td>
      </tr>  

    );

};

export default Td;