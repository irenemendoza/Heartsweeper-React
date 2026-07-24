import {  useEffect } from 'react';
import { formatearTiempo } from '../utils.js';

function Timer({ activo, resetKey, segundos, setSegundos }) {
    
    useEffect(() => {
        setSegundos(0);
    }, [resetKey, setSegundos]);

    useEffect(() => {
        if (!activo) return;
        const intervalo = setInterval(() => {
            setSegundos(s => s+1);
        }, 1000);
        return () => clearInterval(intervalo);
    }, [activo, setSegundos]);

    
    return(
        <div>
            <h1>{formatearTiempo(segundos)}</h1>
        </div>
    )
}

export default Timer;