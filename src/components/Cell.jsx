import { useState } from 'react';
import './Cell.scss';

function Cell({ row, col, isHeart, heartsCounter, descubierta, onReveal }) {
   
    return (
        <button
            className='cell'
            style={{ width:'100%', height:'100%'}}
            onClick={() => onReveal(row, col)}>
                {descubierta && (isHeart ? '❤️' : (heartsCounter > 0 ? heartsCounter : ''))}
        </button>
    )
}

export default Cell;