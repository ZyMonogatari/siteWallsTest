<?php
if($_POST['captcha']){ 
session_start(); 
if($captcha == $_SESSION['codigo']) 
{
echo "<script type=''>
alert('Mensaje exitoso');
window.location='index.php';
</script>";
}else{
echo("Codigo ingresado: incorrecto"); # Si el codigo introducido en incorrecto
} }
?> 
<img src="Captcha.php"><br>
<form name="form1" method="post" action="#">
<input type="text" name="captcha">
<input type="submit" name="enviar">
</form>