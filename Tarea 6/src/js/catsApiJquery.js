// Import de la libreria JQuery






$(document).ready(function () {
    const API_KEY = "live_zF2OlioZa0BXR5MNRxgahI56dSsXJmWUc5MwsAlh5sKCyBTIw1rE1YNyEdrgjZ0v";
    const $content = $("#cards-container");
    const $loader = $("<div class='text-center text-gray-500 p-4'>Cargando más gatos...</div>").appendTo("body").hide();

    let loading = false;
    let page = 1;

    function loadCats() {
        if (loading) return;
        loading = true;
        $loader.show();

        $.ajax({
            url: `https://api.thecatapi.com/v1/breeds?limit=9&page=${page}`,
            method: "GET",
            headers: { "x-api-key": API_KEY },
            success: function (data) {
                data.forEach(cat => {
                    const imageUrl = cat.image?.url || "https://via.placeholder.com/300";
                    const name = cat.name || "Gato Desconocido";
                    const weight = cat.weight?.metric || "N/A";
                    const origin = cat.origin || "Desconocido";
                    const lifeSpan = cat.life_span || "Desconocida";
                    const wikiUrl = cat.wikipedia_url || "#";

                    const card = `
                        <div class="w-80 bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:scale-105 transition-transform">
                            <img src="${imageUrl}" alt="${name}" class="w-full h-64 object-cover">
                            <div class="p-4">
                                <h2 class="text-xl font-bold">${name}</h2>
                                <p class="text-gray-600"><strong>🐾 Peso:</strong> ${weight} kg</p>
                                <p class="text-gray-600"><strong>📍 Origen:</strong> ${origin}</p>
                                <p class="text-gray-600"><strong>⏳ Esperanza de vida:</strong> ${lifeSpan} años</p>
                                <a href="${wikiUrl}" target="_blank" class="text-blue-500 hover:underline">Ver en Wikipedia</a>
                            </div>
                        </div>
                    `;
                    $content.append(card);
                });

                page++;
            },
            error: function (error) {
                console.error("Error cargando imágenes:", error);
            },
            complete: function () {
                loading = false;
                $loader.hide();
            }
        });
    }

    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() >= $(document).height() - 400) {
            loadCats();
        }
    });

    loadCats();
});
