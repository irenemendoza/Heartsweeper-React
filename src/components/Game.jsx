import Board from './Board.jsx';
import Select from 'react-select';
import { useState } from 'react';

function Game() {
    const [dimension, setDimension] = useState('');
    const [dificultad, setDificultad] = useState('');
    const [juegoIniciado, setJuegoIniciado] = useState(false);


    const iniciarJuego = () => {
        if (dimension && dificultad){
            setJuegoIniciado(true);
        }
    }

    // Para darle estilos al Select
    const estilosSelect = {
        option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
                ? 'red' 
                :state.isFocused
                ? 'rgba(255, 0, 0, 0.2)'
                : 'white',
            color: state.isSelected ? 'white':'black'
        }),
    };

    
    return (
        <>
            {!juegoIniciado ? (
                <>
                <div id='inicioJuego'>
                    <label className="enunciado">
                        <p>Elige una dimensión del juego:</p> 
                        <Select name="dimension" 
                            styles={estilosSelect}
                            id="dimension"
                            options={[
                                { value: '8', label: '8x8' },
                                { value: '16', label: '16x16' }
                            ]} 
                            onChange={(option) => setDimension(option.value)}    
                        /> 
                    </label>
                    <label className="enunciado">
                        <p>Elige un nivel de dificultad:</p>
                        <Select name="dificultad" 
                            styles={estilosSelect}
                            id="dificultad"
                            options={[
                                { value:"facil", label:"Fácil"},
                                { value:"intermedio", label:"Intermedio"},
                                { value:"dificil", label:"Difícil"}
                            ]}
                            onChange={(option)=>setDificultad(option.value)}/>
                    </label>
                    <button id='nuevoJuego' onClick={iniciarJuego}>Nuevo juego</button>
                </div>
                </>) : (<Board dimension={dimension} dificultad={dificultad} />
                )               
            }
        </>
    );
}

export default Game;