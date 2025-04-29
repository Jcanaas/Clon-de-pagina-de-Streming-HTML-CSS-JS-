document.addEventListener('DOMContentLoaded', function() {
    const usuario = localStorage.getItem("usuario"); // Obtener el usuario del localStorage
    const episodeTitleElement = document.querySelector('.titulo-episodio'); // Seleccionar el h3 con la clase 'titulo-episodio'
    const episodeTitle = episodeTitleElement ? episodeTitleElement.textContent.trim() : "Título no encontrado"; // Obtener el texto del h3

    // Extraer el número y el título del episodio
    const episodeMatch = episodeTitle.match(/^(\d+)\.\s*(.+)$/); // Regex para capturar número y título
    const episodeBeck = episodeMatch ? `${episodeMatch[1]} - ${episodeMatch[2]}` : episodeTitle; // Formato "número - título"

    const data = {
        accion: 'episodioBeck',
        usuario: usuario,
        episodeBeck: episodeBeck
    };

    console.log('Datos enviados:', data);

    const scriptURL = 'https://script.google.com/macros/s/AKfycbzsORwapCu088hn1FW4aFLSxJas6lJp0VPK6nwJbWMhsS2T_AoGdiAt9jKXqUGaa6jfaQ/exec';

    // Enviar datos al Google Apps Script
    fetch(scriptURL, {
        method: 'POST',
        body: JSON.stringify(data), // Enviar datos como JSON
        headers: {
            'Content-Type': 'text/plain;charset=utf-8' // Encabezado simple para evitar preflight
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la solicitud: ' + response.status);
        }
        return response.json(); // Procesar la respuesta como JSON
    })
    .then(data => {
        console.log('Respuesta del servidor:', data);
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
    });

    console.log(`Episodio enviado: ${episodeBeck}`);
});