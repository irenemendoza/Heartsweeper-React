const API_URL = "https://heartsweeper-react-api.mendozagonzalez-irene.workers.dev";

// Función para salvar mejores tiempos:
export async function saveScore({ dimension, dificultad, nombre, time_ms }) {
    const response = await fetch(`${API_URL}/api/scores`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dimension, difficulty: dificultad, player_name: nombre, time_ms }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
}

// Función para obtener los mejores tiempos:
    export async function getTopScores({ dimension, dificultad }) {
        const response = await fetch(
        `${API_URL}/api/scores?dimension=${dimension}&difficulty=${dificultad}`
    );
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    return data;
    }