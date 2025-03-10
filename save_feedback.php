<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    echo "Método permitido.";
    $nombre = htmlspecialchars($_POST['nomCognoms']);
    $observaciones = htmlspecialchars($_POST['observacions']);
    $satisfaccion = htmlspecialchars($_POST['rate']);

    $file = fopen("feedback$nombre.txt", "a");
    fwrite($file, "Nombre: $nombre\nObservaciones: $observaciones\nSatisfacción: $satisfaccion\n\n");
    fclose($file);

    header("Location: thank_you.html");
    exit();
} else {
    echo "Método no permitido.";
}
?>