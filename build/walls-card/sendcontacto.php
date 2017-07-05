<?php  
if ($_POST['captcha'] != "7"){
    // Es un SPAMbot
    echo "<script type=''>
	alert('ERROR AL VERIFICAR LA CASILLA DE SEGURIDAD');
	window.location='index.php';
</script>";
    }else{
if(isset($_POST['email'])) {
 
// Debes editar las próximas dos líneas de código de acuerdo con tus preferencias
$email_to = "aaronalvaradogtz@gmail.com";
$email_subject = "Contacto";
 
// Aquí se deberían validar los datos ingresados por el usuario
if(
!isset($_POST['nombre']) ||
!isset($_POST['empresa']) ||
!isset($_POST['direccion']) ||
!isset($_POST['telefono']) ||
!isset($_POST['email']) ||
!isset($_POST['estado']) ||
!isset($_POST['porque'])) {
 
echo "<b>Ocurrió un error y el formulario no ha sido enviado. </b><br />";
echo "Por favor, vuelva atrás y verifique la información ingresada<br />";
die();
}
 
$email_message = "Contacto Wall´s Barbershop:\n\n";
$email_message .= "Nombre: " . $_POST['nombre'] . "\n";
$email_message .= "Empresa: " . $_POST['empresa'] . "\n";
$email_message .= "Direccion: " . $_POST['direccion'] . "\n";
$email_message .= "Telefono: " . $_POST['telefono'] . "\n";
$email_message .= "Email: " . $_POST['email'] . "\n";
$email_message .= "Estado: " . $_POST['estado'] . "\n";
$email_message .= "¿Por que te gustaría adquirir una franquicia Wall's Barbershop?: " . $_POST['porque'] . "\n";

 
 
 
// Ahora se envía el e-mail usando la función mail() de PHP
$headers = "From: ".$_POST['email']."\r\n";
@mail($email_to, $email_subject, $email_message, $headers);

$aviso = "Su mensaje fue enviado correctamente";
			echo "<script type=''>
	alert('Mensaje exitoso');
	window.location='index.php';
</script>";
} 
}
?>