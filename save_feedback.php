<!-- filepath: c:\jojoflix\save_feedback.php -->
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nomCognoms = htmlspecialchars($_POST['nomCognoms']);
    $observacions = htmlspecialchars($_POST['observacions']);
    $satisfaccio = htmlspecialchars($_POST['satisfaccio']);

    $data = "Nom i Cognoms: $nomCognoms\nObservacions: $observacions\nSatisfacció: $satisfaccio\n\n";

    file_put_contents('feedback.txt', $data, FILE_APPEND | LOCK_EX);
    echo "Gracias por tu feedback!";
} else {
    echo "Método no permitido.";
}
?>