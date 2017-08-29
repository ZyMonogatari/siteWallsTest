<?php
if(isset($_POST['email'])) {
 
// Debes editar las próximas dos líneas de código de acuerdo con tus preferencias
$email_to = "desarrollador@chicleypegacreativo.com";
$email_subject = "Solicitud de cambio de contraseña";
 
// Aquí se deberían validar los datos ingresados por el usuario
if(
!isset($_POST['email']) ||
!isset($_POST['no_tarjeta'])) {
 
echo "<b>Ocurrió un error y el formulario no ha sido enviado. </b><br />";
echo "Por favor, vuelva atrás y verifique la información ingresada<br />";
die();
}
$email_message = "El usuario con los siguientes datos solicito su cambio de contraseña\n\n";
$email_message .= "Email: " . $_POST['email'] . "\n";
$email_message .= "Numero de tarjeta: " . $_POST['no_tarjeta'] . "\n";



 
 
 
// Ahora se envía el e-mail usando la función mail() de PHP
$headers = "From: ".$_POST['email']."\r\n";
@mail($email_to, $email_subject, $email_message, $headers);

$aviso = "Su mensaje fue enviado correctamente";
			echo "<script type=''>
	alert('En breve nos pondremos en contacto con usted.');
	window.location='index.php';
</script>";
}
?>