const API_KEY = "live_zF2OlioZa0BXR5MNRxgahI56dSsXJmWUc5MwsAlh5sKCyBTIw1rE1YNyEdrgjZ0v"; 
const content = document.getElementById("cards-container");
const loader = document.createElement("div");
loader.className = "p-4 text-center text-gray-500";
loader.innerText = "Cargando más gatos...";
document.body.appendChild(loader);

let loading = false;
let page = 1;

async function loadCats() {
    if (loading) return;
    loading = true;
    loader.style.display = "block";

    try {
        const response = await fetch(`https://api.thecatapi.com/v1/breeds?limit=9&page=${page}`, {
            headers: { "x-api-key": API_KEY }
        });

        const data = await response.json();

        data.forEach(cat => {
            const imageUrl = cat.image?.url || "https://via.placeholder.com/300";
            const name = cat.name || "Gato Desconocido";
            const weight = cat.weight?.metric || "N/A";
            const origin = cat.origin || "Desconocido";
            const lifeSpan = cat.life_span || "Desconocida";
            const wikiUrl = cat.wikipedia_url || "#";

            const card = document.createElement("div");
            card.className = "overflow-hidden transition-transform bg-white border border-gray-200 rounded-lg shadow-md w-80 hover:shadow-xl hover:scale-105";

            card.innerHTML = `
                <img src="${imageUrl}" alt="${name}" class="w-full h-64 object-cover">
                <div class="p-4">
                    <h2 class="text-xl font-bold">${name}</h2>
                    <p class="text-gray-600"><strong>🐾 Peso:</strong> ${weight} kg</p>
                    <p class="text-gray-600"><strong>📍 Origen:</strong> ${origin}</p>
                    <p class="text-gray-600"><strong>⏳ Esperanza de vida:</strong> ${lifeSpan} años</p>
                    <a href="${wikiUrl}" target="_blank" class="text-blue-500 hover:underline">Ver en Wikipedia</a>
                </div>
            `;

            content.appendChild(card);
        });

        page++;

    } catch (error) {
        console.error("Error cargando imágenes:", error);
    } finally {
        loading = false;
        loader.style.display = "none";

        // Verifica si el contenido cargado es menor que la altura de la ventana y carga más si es necesario
        if (document.body.scrollHeight <= window.innerHeight) {
            loadCats();
        }
    }
}

// Detecta cuando el usuario está cerca del final de la página
window.addEventListener("scroll", () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 400) {
        loadCats();
    }
});

// Cargar gatos al inicio y verificar si es suficiente
document.addEventListener("DOMContentLoaded", loadCats);

