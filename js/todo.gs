function validarCredenciales(usuario, contrasena) {
  const hojaUsuario = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(usuario);

  if (!hojaUsuario) {
    return { success: false, message: `No se encontró una hoja para el usuario "${usuario}".` };
  }

  const datos = hojaUsuario.getDataRange().getValues();
  for (let i = 1; i < datos.length; i++) {
    if (datos[i][0] === usuario && datos[i][1] === contrasena) {
      // Obtener el valor de la celda B2
      const valorMonster = hojaUsuario.getRange("D2").getValue();
      
      // Incluir el valor de B2 en el mensaje
return { success: true, message: `Inicio de sesión exitoso.`, ultimoepisodioMonster: valorMonster };
    }
  }
  
  return { success: false, message: 'Usuario o contraseña incorrectos.' };
}