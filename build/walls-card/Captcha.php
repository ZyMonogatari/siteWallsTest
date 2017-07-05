<?php
session_start();
$numero = rand(1000,9999); 
$_SESSION['codigo'] = $numero;
header("Content-type: image/png");
$im = imagecreate(80, 25);
$fondo = imagecolorallocate($im, 0, 0, 0); 
$texto = imagecolorallocate($im, 255, 255, 255);
imagestring($im, 12, 20, 5, $_SESSION['codigo'], $texto);
imagepng($im);
?>