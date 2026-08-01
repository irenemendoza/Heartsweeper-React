import { useState } from 'react';
import './Modal.scss';
import { formatearTiempo } from '../utils.js';
import Button from './Button.jsx';

function Modal({ tipo, tiempo, errorGuardado, onCerrar, onGuardar }) {
    const [nombre, setNombre] = useState('Anónimo');

    return(
        <div className='modal-overlay'>
            <div className='modal'>
                {tipo === 'ganado'
                    ? <h2>✌️¡Has ganado!</h2> 
                    : <h2>😫¡Has perdido!</h2>
                }
                {tipo === 'ganado' && (
                    <>
                    <p className='yourTime'>Tu tiempo: 
                        <span className='tiempo'>{formatearTiempo(tiempo)}</span>
                    </p>
                    <input 
                        type="text"
                        value={nombre}
                        onChange={e => setNombre(e.target.value)}
                        placeholder='Tu nombre'
                    />
                    <Button 
                        onClick={() => onGuardar(nombre)}>
                        Guardar puntuación
                    </Button>
                    {errorGuardado && 
                        <div className='error'>
                            <p>Ups! Algo no fue bien.</p> 
                            <p>Vuelve a intentar guardar tu puntuación.</p>
                        </div>
                    }
                    </>
                )}
                <Button
                    onClick={onCerrar}>
                    Cerrar
                </Button>
                
            </div>
        </div>
    )
}

export default Modal;