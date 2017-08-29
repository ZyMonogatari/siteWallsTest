<?php  
echo "<script type=''>
	alert('ERROR AL VERIFICAR LA CASILLA DE SEGURIDAD');
</script>";
if ($_POST['nombre'] != "15"){
    // Es un SPAMbot
    echo "<script type=''>
	alert('ERROR AL VERIFICAR LA CASILLA DE SEGURIDAD');
	window.location='index.php';
</script>";
    }else{
    if(isset($_POST)) {
include 'admin/includes/dbFunctions.php'; 

        	$result = insertForm($_POST['info'], "clientes");
if ($result > 0){
			
			$aviso = "Su mensaje fue enviado correctamente";
echo "<script type=''>
alert('Los datos se han guardado correctamente');
window.location='gracias.php';
</script>";
}else{
	echo "<script type=''>
alert('hubo un error al procesar los datos.');
window.location='index.php';
</script>";
}
	}
	}
// Debes editar las próximas dos líneas de código de acuerdo con tus preferencias
/*$email_to = "blackcard@wallsbarbershop.com.mx";
$email_subject = "Registro Walls Barber Shop";
 
// Aquí se deberían validar los datos ingresados por el usuario
if(
!isset($_POST['nombre']) ||
!isset($_POST['apellidos']) ||
!isset($_POST['telefono']) ||
!isset($_POST['email']) ||
!isset($_POST['estado']) ||
!isset($_POST['municipio']) ||
!isset($_POST['no_tarjeta']) ||
!isset($_POST['contra1']) ||
!isset($_POST['fecha']) ||
!isset($_POST['compartir_datos'])) {
 
echo "<b>Ocurrió un error y el formulario no ha sido enviado. </b><br />";
echo "Por favor, vuelva atrás y verifique la información ingresada<br />";
die();
}
 
$email_message = "Inscripción a la BLACKCARD:\n\n";
$email_message .= "Nombre: " . $_POST['nombre'] . "\n";
$email_message .= "Apellidos: " . $_POST['apellidos'] . "\n";
$email_message .= "Telefono: " . $_POST['telefono'] . "\n";
$email_message .= "E-mail: " . $_POST['email'] . "\n";
$email_message .= "Estado: " . $_POST['estado'] . "\n";
$email_message .= "Municipio: " . $_POST['municipio'] . "\n";
$email_message .= "Nº de Tarjeta: " . $_POST['no_tarjeta'] . "\n";
$email_message .= "Contraseña: " . $_POST['contra1'] . "\n";
$email_message .= "Fecha de Nacimiento: " . $_POST['fecha'] . "\n";
$email_message .= "Compartir datos: " . $_POST['compartir_datos'] . "\n";
 
 
 
// Ahora se envía el e-mail usando la función mail() de PHP
$headers = "From: ".$_POST['email']."\r\n";
@mail($email_to, $email_subject, $email_message, $headers);

$aviso = "Su mensaje fue enviado correctamente";
echo "<script type=''>
alert('Mensaje exitoso');
window.location='gracias.php';
</script>";
}  
}*/
?>