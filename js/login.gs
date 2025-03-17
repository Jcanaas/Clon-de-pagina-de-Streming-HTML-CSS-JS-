// Validar las credenciales del usuario en la hoja con el nombre del usuario
function validarCredenciales(usuario, contrasena) {
  Logger.log('Iniciando validación de credenciales...');
  Logger.log('Usuario recibido: ' + usuario);
  Logger.log('Contraseña recibida: ' + contrasena);

  // Obtener la hoja con el nombre del usuario
  const hojaUsuario = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(usuario);
  
  if (!hojaUsuario) {
    Logger.log(`La hoja con el nombre "${usuario}" no existe.`);
    return { success: false, message: `No se encontró una hoja para el usuario "${usuario}".` };
  }

  const datos = hojaUsuario.getDataRange().getValues();
  Logger.log('Datos en la hoja del usuario: ' + JSON.stringify(datos));

  // Validar las credenciales en la hoja del usuario
  for (let i = 1; i < datos.length; i++) { // Empieza desde la fila 2 para omitir los encabezados
    Logger.log('Comparando usuario: ' + datos[i][0] + ' y contraseña: ' + datos[i][1]);
    if (datos[i][0] === usuario && datos[i][1] === contrasena) { // Columna 0: Usuario, Columna 1: Contraseña
      Logger.log('Credenciales válidas para el usuario.');
      return { success: true, message: 'Inicio de sesión exitoso.' };
    }
  }

  Logger.log('Credenciales incorrectas para el usuario.');
  return { success: false, message: 'Usuario o contraseña incorrectos.' };
}

// Endpoint para manejar solicitudes desde el formulario de login
function doPost(e) {
  try {
    Logger.log('Datos en bruto recibidos: ' + e.postData.contents);

    const params = JSON.parse(e.postData.contents);
    Logger.log('Datos procesados: ' + JSON.stringify(params));

    const accion = params.accion;

    if (accion === 'login') {
      Logger.log('Acción: login');
      Logger.log('Usuario: ' + params.usuario);
      Logger.log('Contraseña: ' + params.contrasena);

      const response = {
        success: true,
        message: 'Inicio de sesión exitoso.',
        data: params
      };

      return ContentService.createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeader('Access-Control-Allow-Origin', '*') // Permitir solicitudes desde cualquier origen
        .setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS') // Métodos permitidos
        .setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Encabezados permitidos
    }

    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: 'Acción no válida.' })
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*');
  } catch (error) {
    Logger.log('Error en doPost: ' + error.message);
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, message: 'Error en el servidor: ' + error.message })
    )
      .setMimeType(ContentService.MimeType.JSON)
      .setHeader('Access-Control-Allow-Origin', '*');
  }
}

// Manejar solicitudes preflight (OPTIONS)
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}