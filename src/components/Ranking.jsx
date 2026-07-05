import './Ranking.scss';
import { formatearTiempo } from '../utils.js';

// Mostrado de los mejores tiempos
function Ranking({ puntuaciones }) {
  
    return (
        <>
        {
            <table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Jugador</th>
                        <th>Tiempo</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody>
                    {puntuaciones.map((puntuacion, index)=>(
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td>{puntuacion.nombre}</td>
                            <td>{formatearTiempo(puntuacion.tiempo)}</td>
                            <td>{puntuacion.fecha}</td>
                        </tr>
                    )   
                    )}
                </tbody>
            </table>
        }
        </>
    )
        
}

export default Ranking;