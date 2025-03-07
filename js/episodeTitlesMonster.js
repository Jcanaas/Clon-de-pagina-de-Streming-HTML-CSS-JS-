document.addEventListener('DOMContentLoaded', function() {
    const episodeTitles = [
      "Herr Doctor Tenma", "Degradación", "Asesinato", "La noche de la ejecución", "La chica de Heidelberg",
      "Artículos de desapariciones", "La mansión de la tragedia", "Perseguido", "El mercenario y la niña",
      "Borrar el pasado", "Kinderheim 511", "Un experimento insignificante", "Petra y Schuhmann",
      "El último hombre, la última mujer", "Be my baby", "La confesión de Wolf", "Reunión",
      "Cinco cucharadas de azúcar", "El abismo del monstruo", "Viaje a Freinheim", "Unas felices vacaciones",
      "La trampa de Lunge", "La confesión de Eva", "Alrededor de una mesa", "El chico de los jueves",
      "El bosque secreto", "La prueba", "Un sólo asesino", "Ejecución", "La decisión", "A plena luz del día",
      "Santuario", "Escenas de una infancia", "El fin de la oscuridad", "Un héroe sin nombre",
      "El monstruo que siembra el caos", "El monstruo sin nombre", "El demonio ante mis ojos",
      "El infierno en sus ojos", "Grimmer", "El fantasma del 511", "Las aventuras de Steiner el magnífico",
      "El detective Suk", "Dobles tinieblas", "El rastro del monstruo", "Ángulo muerto",
      "Las puertas de la pesadilla", "Lo que te da más miedo", "La crueldad más extrema",
      "La mansión de las rosas", "La carta de amor del monstruo", "El abogado", "La decisión",
      "La huida", "La habitación 402", "El viaje sin fin", "Aquella noche", "Odio este trabajo",
      "El hombre que vió al diablo", "El hombre que sabía demasiado", "La puerta de los recuerdos",
      "Disfrutar la comida", "Asesinatos inconexos", "La angustia de bebé", "Las huellas de Johan",
      "¿Ya has vuelto?", "He llegado", "Ruhenheim", "Un hogar tranquilo", "El pueblo de la masacre",
      "La ira de Steiner el magnífico", "El hombre sin nombre", "El paisaje final", "El auténtico monstruo"
    ];
  
    const currentFileName = window.location.pathname.split('/').pop();
    const episodeNumber = parseInt(currentFileName.match(/\d+/)[0]);
    const prevEpisodeNumber = episodeNumber - 1;
    const nextEpisodeNumber = episodeNumber + 1;
  
    const prevEpisodeLink = document.getElementById('prev-episode');
    const nextEpisodeLink = document.getElementById('next-episode');
    const episodeTitleElement = document.getElementById('episode-title');
  
    if (prevEpisodeNumber > 0) {
      prevEpisodeLink.href = `MonsterEp${prevEpisodeNumber}.html`;
    } else {
      prevEpisodeLink.style.display = 'none';
    }
  
    nextEpisodeLink.href = `MonsterEp${nextEpisodeNumber}.html`;
  
    if (episodeNumber > 0 && episodeNumber <= episodeTitles.length) {
      episodeTitleElement.textContent = episodeTitles[episodeNumber - 1];
    } else {
      episodeTitleElement.textContent = "Episodio Desconocido";
    }
  });