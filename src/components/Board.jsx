import Cell from './Cell.jsx'; 
import { placeHearts } from "./Hearts.jsx";
import { numberOfHearts } from "./Hearts.jsx";
import './Board.scss';
import { useState } from 'react';


function Board({ dimension, dificultad }) {
    // Estado que guarda las celdas abiertas en forma de set con las coordenadas
    const [abiertas, setAbiertas] = useState(new Set());

    // Creación de las celdas iniciales del tablero
    const [cells] = useState(() => {
        const initialCells = [];
        for (let row=0; row<dimension; row++){
            for (let col=0; col<dimension; col++){
                initialCells.push({ row, col, isHeart:false, heartsCounter:0, })
            }
        }

        // Asignación de los corazones según la dimensión y dificultad elegidas
        placeHearts({ dimension, dificultad, cells:initialCells });
        
        // Función que permite obtener una celda en concreto a través de sus coordenadas
        const getInitialCell = (row, col) =>
            initialCells.find((cell) => (cell.row === row && cell.col == col))

        // Corrección del heartsCounter de cada celda
        initialCells.forEach((cell) => {
            for (let x=-1; x<=1; x++){
                for (let y=-1; y<=1; y++){
                    if (x===0 && y===0) continue;
                    const vecino = getInitialCell(cell.row+x, cell.col+y);
                    if (vecino && vecino.isHeart)cell.heartsCounter++;
                }
            }
        });

        return initialCells;
    });
    
    // Para obtener una celda nueva a partir de las celdas actualizadas
    function getCell(row, col){
        return cells.find((cell) => (cell.row === row && cell.col === col));
    }
    
    function expandirCelda(row, col, reveladas){
        const clave = `${row}-${col}`;
        if (reveladas.has(clave)) return;
        const cell = getCell(row, col);
        if (!cell) return;
        reveladas.add(clave);
        if (cell.heartsCounter === 0 && !cell.isHeart){
            for (let x=-1; x <= 1; x++){
                for (let y=-1; y <= 1; y++){
                    if (x===0 && y===0) continue;
                    expandirCelda(row+x, col+y, reveladas);
                }
            }
        }
    }

    function revealCell(row, col){
        const nuevasReveladas = new Set(abiertas); //copia nueva, no muta el estado original
        expandirCelda(row, col, nuevasReveladas); //la recursión muta la copia local
        
        const cell = getCell(row,col);
        if (cell && cell.isHeart){
            revealHearts(nuevasReveladas);
            setTimeout(()=> {
                alert("has perdido!");
            }, 300);
            
        };

        setAbiertas(nuevasReveladas); //se guarda el estado final
        checkwin(nuevasReveladas);
    }
    
    function revealHearts(reveladas){
        cells.forEach(cell => {
            if (cell.isHeart){
                reveladas.add(`${cell.row}-${cell.col}`);
            }
        })
    }

    function checkwin(reveladas){
        const totalHearts = numberOfHearts({ dimension, dificultad });
        const totalCells = dimension * dimension;
        if (reveladas.size === totalCells - totalHearts){
            const reveladasFinal = new Set(reveladas);
            cells.forEach(cell => {
                if (cell.isHeart){
                    reveladasFinal.add(`${cell.row}-${cell.col}`)
                }
            })
            setAbiertas(reveladasFinal);
            setTimeout(()=>{
                alert("Has ganado!")
            }, 300)
            
        }        
        
    }
          
    const finalCells = cells.map(cell => <Cell key={`${cell.row}-${cell.col}`} row={cell.row} col={cell.col} isHeart={cell.isHeart} heartsCounter={cell.heartsCounter} descubierta={abiertas.has(`${cell.row}-${cell.col}`)} onReveal={revealCell}/>)
    
    

    return (
        <div 
            id='board'
            style={{
                '--dimension': dimension
            }}>
            {finalCells}    
        </div>
    )
};

export default Board;