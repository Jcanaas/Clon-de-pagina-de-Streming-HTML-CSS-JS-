document.addEventListener('DOMContentLoaded', function() {
    const usuario = localStorage.getItem("usuario"); // Obtener el usuario del localStorage
    const episodeNumber = parseInt(currentFileName.match(/\d+/)[0]); // Número del episodio actual
    const episodeTitle = episodeTitles[episodeNumber - 1];
    const episodeMonster = `${episodeNumber} - ${episodeTitle}`;

    const data = {
        accion: 'episodioMonster',
        usuario: usuario,
        episodeMonster: episodeMonster
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

    const episodeMonsterDisplay = `${episodeNumber} - ${episodeTitle}`;
    console.log(episodeMonsterDisplay);
});