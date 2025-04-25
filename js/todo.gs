// ENVIAR CORREO
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

    let colEmail = 3, colNombre = 2, colCurso = 4, colNom = 1;
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
      MailApp.sendEmail({ to: miCorreo, subject: asunto, body: cuerpo });
      Logger.log("Correo enviado a: " + miCorreo);
      scriptProperties.setProperty('ultimaFila', fila.toString());
    } catch (error) {
      Logger.log("Error al enviar el correo: " + error.message);
    }
  } else {
    Logger.log("No ha habido cambios nuevos.");
  }
}

// VALIDAR CREDENCIALES
function validarCredenciales(usuario, contrasena) {
  Logger.log('Validando credenciales...');
  const hojaUsuario = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(usuario);

  if (!hojaUsuario) {
    return { success: false, message: `No se encontró una hoja para el usuario "${usuario}".` };
  }

  const datos = hojaUsuario.getDataRange().getValues();
  for (let i = 1; i < datos.length; i++) {
    if (datos[i][0] === usuario && datos[i][1] === contrasena) {
      return { success: true, message: 'Inicio de sesión exitoso.' };
    }
  }
  return { success: false, message: 'Usuario o contraseña incorrectos.' };
}

// PROCESAR FORMULARIO
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

function procesarDatos(nombre, comentarios, rating) {
  const spreadsheetId = "1FSDXOXhLuSsbrIdR4XCbJ6PY0oFVOFsrnjFxglLW3Dk";
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  const sheet = spreadsheet.getSheetByName("Jojoflix comentario");
  if (!sheet) return { error: "La hoja no existe" };
  try {
    sheet.appendRow([nombre, comentarios, rating, new Date()]);
    return { mensaje: "Datos guardados correctamente" };
  } catch (error) {
    return { error: "No se pudo escribir en la hoja" };
  }
}

// REGISTRAR USUARIO
function registrarUsuario(usuario, contrasena, correo) {
  const libro = SpreadsheetApp.getActiveSpreadsheet();
  
  // Verifica si ya existe una hoja con el nombre del usuario
  let hojaUsuario = libro.getSheetByName(usuario);
  
  // Si no existe, crea una nueva hoja con el nombre del usuario
  if (!hojaUsuario) {
    hojaUsuario = libro.insertSheet(usuario);
    hojaUsuario.appendRow(['Usuario', 'Contraseña', 'Correo']); // Escribe los encabezados
  }
  
  // Asegura que los datos no se repitan
  const datos = hojaUsuario.getDataRange().getValues();
  for (let i = 1; i < datos.length; i++) {
    if (datos[i][0] === usuario) {
      return { success: false, message: "El nombre de usuario ya está registrado." };
    }
    if (datos[i][2] === correo) {
      return { success: false, message: "El correo ya está registrado." };
    }
  }
  
  try {
    // Guarda los datos del usuario en la hoja correspondiente
    hojaUsuario.appendRow([usuario, contrasena, correo]);
    return { success: true, message: "Usuario registrado con éxito." };
  } catch (error) {
    return { success: false, message: "Error al registrar el usuario: " + error.message };
  }
}


// UNIFICAR doPost PARA LOGIN Y SIGNIN
function doPost(e) {
  try {
    Logger.log('Datos en bruto recibidos: ' + e.postData.contents);
    const params = JSON.parse(e.postData.contents);
    Logger.log('Datos procesados: ' + JSON.stringify(params));
    
    if (params.accion === 'login') {
      return ContentService.createTextOutput(
        JSON.stringify(validarCredenciales(params.usuario, params.contrasena))
      ).setMimeType(ContentService.MimeType.JSON);
    } else if (params.accion === 'signin') {
      return ContentService.createTextOutput(
        JSON.stringify(registrarUsuario(params.usuario, params.contrasena, params.correo))
      ).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: 'Acción no válida.' })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: error.message })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}
