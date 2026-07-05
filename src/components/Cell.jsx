import { useState } from 'react';
import './Cell.scss';

function Cell({ row, col, isHeart, heartsCounter, descubierta, onReveal, ganado }) {
   
    return (
        <button
            className={`cell ${descubierta ? 'cell-descubierta' : ''}`} 
            style={{ width:'100%', height:'100%'}}
            onClick={() => onReveal(row, col)}>
                {descubierta && (isHeart ? (ganado ? '❤️' : '💔') : (heartsCounter > 0 ? heartsCounter : ''))}
        </button>
    )
}

export default Cell;