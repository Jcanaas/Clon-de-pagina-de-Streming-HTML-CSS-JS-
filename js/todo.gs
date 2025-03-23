// ENVIAR CORREO
// Función que envía el correo si ha habido un cambio
function enviarEmail() {
  Logger.log("La función enviarEmail se ha ejecutado");

  let libro = SpreadsheetApp.getActiveSpreadsheet();
  let hojaRespuestas = libro.getSheetByName("Jojoflix comentario");

  let fila = hojaRespuestas.getLastRow();
  Logger.log("Última fila: " + fila);

  let scriptProperties = PropertiesService.getScriptProperties();
  let ultimaFilaGuardada = scriptProperties.getProperty('ultimaFila');
  Logger.log("Última fila guardada: " + ultimaFilaGuardada);

  if (!ultimaFilaGuardada || parseInt(ultimaFilaGuardada) < fila) {
    Logger.log("Hubo un cambio, procesando...");

    let colEmail = 3;
    let colNombre = 2;
    let colCurso = 4;
    let colNom = 1;

    let email = hojaRespuestas.getRange(fila, colEmail).getValue();
    let nombre = hojaRespuestas.getRange(fila, colNombre).getValue();
    let curso = hojaRespuestas.getRange(fila, colCurso).getValue();
    let nom = hojaRespuestas.getRange(fila, colNom).getValue();

    let asunto = "Comentario de: " + nom;
    let cuerpo = "Se ha enviado un nuevo comentario\n\n";
    cuerpo += "De: " + nom + "\n\n";
    cuerpo += "Comentario: " + nombre + "\n\n";
    cuerpo += "Calificación: " + email + "\n\n";
    cuerpo += "Fecha del envío: " + curso + "\n\n";
    cuerpo += "Enlace a la hoja: " + libro.getUrl();

    let miCorreo = "frodogamer207@gmail.com";

    try {
      MailApp.sendEmail({
        to: miCorreo,
        subject: asunto,
        body: cuerpo
      });
      Logger.log("Correo enviado a: " + miCorreo);
      scriptProperties.setProperty('ultimaFila', fila.toString());
    } catch (error) {
      Logger.log("Error al enviar el correo: " + error.message + " - " + error.stack);
    }
  } else {
    Logger.log("No ha habido cambios nuevos.");
  }
}

// LOG IN
// Validar las credenciales del usuario en la hoja con el nombre del usuario
function validarCredenciales(usuario, contrasena) {
  Logger.log('Iniciando validación de credenciales...');
  Logger.log('Usuario recibido: ' + usuario);
  Logger.log('Contraseña recibida: ' + contrasena);

  const hojaUsuario = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Usuarios");

  if (!hojaUsuario) {
    Logger.log(`La hoja "Usuarios" no existe.`);
    return { success: false, message: `No se encontró la hoja de usuarios.` };
  }

  const datos = hojaUsuario.getDataRange().getValues();
  Logger.log('Datos en la hoja de usuarios: ' + JSON.stringify(datos));

  for (let i = 1; i < datos.length; i++) {
    if (datos[i][0] === usuario && datos[i][1] === contrasena) {
      Logger.log('Credenciales válidas para el usuario.');
      return { success: true, message: 'Inicio de sesión exitoso.' };
    }
  }

  Logger.log('Credenciales incorrectas para el usuario.');
  return { success: false, message: 'Usuario o contraseña incorrectos.' };
}

// SIGN IN
// Función para registrar un usuario
function registrarUsuario(usuario, contrasena, correo) {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Usuarios");

  if (!hoja) {
    return { success: false, message: "No se encontró la hoja de usuarios." };
  }

  const datos = hoja.getDataRange().getValues();

  // Verificar si el usuario o correo ya existen
  for (let i = 1; i < datos.length; i++) {
    if (datos[i][0] === usuario) {
      return { success: false, message: "El nombre de usuario ya está registrado." };
    }
    if (datos[i][2] === correo) {
      return { success: false, message: "El correo ya está registrado." };
    }
  }

  // Agregar el nuevo usuario a la hoja
  try {
    hoja.appendRow([usuario, contrasena, correo, new Date()]);
    return { success: true, message: "Usuario registrado con éxito." };
  } catch (error) {
    return { success: false, message: "Error al registrar el usuario: " + error.message };
  }
}

// FORMULARIO
// Función para procesar los datos del formulario
function procesarDatos(nombre, comentarios, rating) {
  const spreadsheetId = "1FSDXOXhLuSsbrIdR4XCbJ6PY0oFVOFsrnjFxglLW3Dk";
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName("Jojoflix comentario");

  if (!sheet) {
    Logger.log("Error: La hoja no existe.");
    return { error: "La hoja no existe" };
  }

  try {
    sheet.appendRow([nombre, comentarios, rating, new Date()]);
    Logger.log("Datos agregados correctamente.");
    return { mensaje: "Datos guardados correctamente" };
  } catch (error) {
    Logger.log("Error al escribir en la hoja: " + error.message);
    return { error: "No se pudo escribir en la hoja" };
  }
}

// ENDPOINTS
function doPost(e) {
  try {
    Logger.log('Datos en bruto recibidos: ' + e.postData.contents);
    const params = JSON.parse(e.postData.contents);
    Logger.log('Datos procesados: ' + JSON.stringify(params));

    const accion = params.accion;

    if (accion === 'login') {
      return ContentService.createTextOutput(
        JSON.stringify(validarCredenciales(params.usuario, params.contrasena))
      ).setMimeType(ContentService.MimeType.JSON);
    }

    if (accion === 'signin') {
      return ContentService.createTextOutput(
        JSON.stringify(registrarUsuario(params.usuario, params.contrasena, params.correo))
      ).setMimeType(ContentService.MimeType.JSON);
    }

    if (accion === 'procesarDatos') {
      return ContentService.createTextOutput(
        JSON.stringify(procesarDatos(params.nombre, params.comentarios, params.rating))
      ).setMimeType(ContentService.MimeType.JSON);
    }

    Logger.log('Acción no válida: ' + accion);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: 'Acción no válida.' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    Logger.log('Error: ' + error.message);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  if (!e.parameter) {
    return ContentService.createTextOutput(JSON.stringify({ error: "No se recibieron parámetros" }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  const nombre = e.parameter.nombre || "Nombre por defecto";
  const comentarios = e.parameter.comentarios || "No hay comentarios";
  const rating = e.parameter.rating || "3";

  Logger.log("Datos recibidos: " + JSON.stringify({ nombre, comentarios, rating }));

  const resultado = procesarDatos(nombre, comentarios, rating);

  const callback = e.parameter.callback;
  if (callback) {
    return ContentService.createTextOutput(callback + '(' + JSON.stringify(resultado) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService.createTextOutput(JSON.stringify(resultado))
    .setMimeType(ContentService.MimeType.JSON);
}