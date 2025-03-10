document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');

    // Ejecuta la búsqueda al presionar "Enter"
    searchInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            searchMovie();
        }
    });

    // Ejecuta la búsqueda al salir del cuadro de texto
    searchInput.addEventListener('blur', searchMovie);

    function searchMovie() {
        const input = searchInput.value.toLowerCase().trim();
        const titles = document.querySelectorAll('.titulo');
        const images = document.querySelectorAll('.contenedor img');

        let found = false;

        // Buscar en los títulos
        titles.forEach(title => {
            if (title.textContent.toLowerCase().includes(input)) {
                title.scrollIntoView({ behavior: 'smooth' });
                found = true;
            }
        });

        // Si no se encuentra en los títulos, buscar en las imágenes
        if (!found) {
            images.forEach(image => {
                if (image.alt.toLowerCase().includes(input)) {
                    image.scrollIntoView({ behavior: 'smooth' });
                    found = true;
                }
            });
        }

        if (!found) {
            alert('No se encontraron resultados.');
        }
    }
});
