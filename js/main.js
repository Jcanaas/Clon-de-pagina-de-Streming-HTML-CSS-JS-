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






// POP UP MARTA ESTA A 5KM DE TI
window.onload = function() {
    // Genera un número aleatorio entre 0 y 1
    const randomChance = Math.random();

    // Si el número es menor o igual a 0.1 (10% de probabilidad), muestra el pop-up
    if (randomChance <= 0.75) {
        const popup = document.getElementById("popup");
        popup.style.display = "flex"; // Muestra el modal
    }
};

function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none"; // Oculta el modal
}
document.addEventListener('DOMContentLoaded', function () {
    const closeButton = document.getElementById('closeButton');
    const openButton = document.getElementById('openButton');
    const buttonContainer = document.querySelector('.button-container');

    // Maneja el intercambio de posiciones al pasar el ratón sobre el botón "Cerrar"
    // closeButton.addEventListener('mouseenter', () => {
    //     closeButton.style.order = '2';
    //     openButton.style.order = '1';
    // });

    // Restaura las posiciones originales cuando el ratón sale del contenedor
    // buttonContainer.addEventListener('mouseleave', () => {
    //     closeButton.style.order = '1';
    //     openButton.style.order = '2';
    // });
});