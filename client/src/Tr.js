import React from 'react';
import './Tr';
import Td from './Td';

const Tr = ({ info }) => {
  return (
    <tbody>
      {info.map((el) => {
        return (
          <Td key={el.board_idx} item={el} />
        )
      })}
    </tbody>
  );

};

export default Tr;