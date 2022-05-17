import React from 'react';
import './Tr.css';
import Td from './Td';

const Tr = ({ info }) => {
    return (
        <tbody>
            {info.map((el) => {
                return (
                    <Td key={el.id} item={el} />
                )
            })}
        </tbody>
    );

};

export default Tr;