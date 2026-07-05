export function numberOfHearts({ dimension, dificultad}) {
    let porcentaje;
    let totalHearts;
    if (dificultad === "Fácil"){
        porcentaje = 0.1;
    } else if (dificultad === "Intermedio"){
        porcentaje = 0.14;
    } else if (dificultad === "Difícil"){
        porcentaje = 0.18
    }

    return (
        totalHearts = Math.floor(dimension * dimension * porcentaje)
    )
}

export function placeHearts({ dimension, dificultad, cells }){
    const totalHearts = numberOfHearts({ dimension, dificultad });
    const totalCells = cells.length;

    // Creación de set con índices aleatorios únicos

        const heartsSet = new Set();
    while (heartsSet.size < totalHearts){
        const randomIndex = Math.floor(Math.random() * totalCells)
        heartsSet.add(randomIndex);
    }
    // Asignación de corazones según esos índices
    heartsSet.forEach(index => cells[index].isHeart = true)    
}
