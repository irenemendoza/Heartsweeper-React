import Board from './Board.jsx';
import Button from './Button.jsx';
import Select from 'react-select';
import Timer from './Timer.jsx';
import Ranking from './Ranking.jsx';
import Modal from './Modal.jsx';
import { useState, useEffect } from 'react';
import './Game.scss';
import { getTopScores, saveScore } from '../api/scoresApi.js';



function Game() {
    const [dimension, setDimension] = useState('');
    const [dificultad, setDificultad] = useState('');
    const [juegoIniciado, setJuegoIniciado] = useState(false);
    const [boardKey, setBoardKey] = useState(0);
    const [timerKey, setTimerKey] = useState(0);
    const [timerActivo, setTimerActivo] = useState(false);
    const [juegoTerminado, setJuegoTerminado] = useState(false);
    const [segundos, setSegundos] = useState(0);
    const [rankingActual, setRankingActual] = useState([]);
    const [tipo, setTipo] = useState(null);
    const [errorGuardado, setErrorGuardado] = useState(false);

    
    // Estado que guarda las celdas abiertas en forma de set con las coordenadas
    const [abiertas, setAbiertas] = useState(new Set());
    
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

    // Función para iniciar nuevo juego
    function reiniciarJuego(){
        if (dimension && dificultad) {
            setAbiertas(new Set());
            setTimerActivo(false);
            setJuegoIniciado(true);
            setTimerKey(k => k+1);
            setBoardKey(k => k+1);
            setJuegoTerminado(false);
            setTipo(null);
        }
    };

    // Función para reiniciar nuevo juego
    function nuevoJuego(){
        setAbiertas(new Set());
        setJuegoIniciado(false);
        setTimerActivo(false);
        setJuegoTerminado(false);
        setTimerKey(k => k+1);
        setTipo(null);
    }

    // Guardado de los mejores tiempos
    async function guardarTiempo(nombre){
        setErrorGuardado(false);
        try {
            await saveScore ({
                dimension,
                dificultad,
                nombre,
                time_ms: segundos * 1000
            });
            // Recarga del ranking
            const top5 = await getTopScores({
                dimension,
                dificultad
            });
            setRankingActual(top5);
            return true;
        } catch (error){
            console.error('Error al guardar la puntuación', error)
            setErrorGuardado(true)
            return false;
        }
    }

    // Carga del ranking al cambiar la dimensión/dificultad
    useEffect(() => {
        if (!dimension || !dificultad) return;

        async function cargarRanking(){
            try {
                const top5 = await getTopScores({
                    dimension, 
                    dificultad
                });
                setRankingActual(top5);
            } catch (error){
            console.error('Error al cargar el ranking', error)
            }
        }
        cargarRanking();
    }, [dimension, dificultad]);

        
        
    

    

    return (
        <>
            {!juegoIniciado ? (
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
                                { value:"Fácil", label:"Fácil"},
                                { value:"Intermedio", label:"Intermedio"},
                                { value:"Difícil", label:"Difícil"}
                            ]}
                            onChange={(option)=>setDificultad(option.value)}/>
                    </label>
                    <button id='nuevoJuego' onClick={iniciarJuego}>Nuevo juego</button>
                </div>
                ) : (
                    <div className='game'>
                        <Timer
                            activo={timerActivo}
                            resetKey={timerKey}
                            segundos={segundos}
                            setSegundos={setSegundos}
                        />
                        <Board 
                            key={boardKey} 
                            dimension={dimension} 
                            dificultad={dificultad} 
                            abiertas={abiertas} 
                            setAbiertas={setAbiertas} 
                            onPrimerClick={() => setTimerActivo(true)}
                            onJuegoTerminado={()=> setTimerActivo(false)}
                            juegoTerminado={juegoTerminado}
                            setJuegoTerminado={setJuegoTerminado}
                            onMostrarModal={(tipo)=>setTipo(tipo)}
                            setTipo={setTipo}
                        />

                        <div className="buttons">
                            <Button
                                onClick={reiniciarJuego}>
                                Reset
                            </Button>
                            <Button 
                                onClick={nuevoJuego}>
                                Nuevo juego
                            </Button>
                        </div>
                        <div className='ranking'>
                            <h2>{dimension}x{dimension} - {dificultad}</h2>
                            <Ranking puntuaciones={rankingActual}/>
                        </div>
                            
                        {tipo && (
                            <Modal 
                                tipo={tipo}
                                tiempo={segundos}
                                errorGuardado={errorGuardado}
                                onCerrar={() => setTipo(null)}
                                onGuardar={async (nombre) => {
                                    const guardado = await guardarTiempo(nombre);
                                    if (guardado) setTipo(null);
                                }}
                            />
                        )}
                    </div>
                )               
            }
        </>    
    );
}

export default Game;