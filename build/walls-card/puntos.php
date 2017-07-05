<?php 
include 'admin/includes/callProcedure.php'; 
$wtar = $_GET['nta'];
$wpas= $_GET['sPass'];
$datos =  ejecutaProcedureSelect("get_clienteWeb('$wtar','$wpas')");
?>
<html lang="en">
<head>
	<title>Wall's Barbershop</title>	
<meta property="og:url" content="http://wallsbarbershop.com.mx" />
<meta property="og:title" content="Wall's Barbershop" />
<meta property="og:description" content="Wall’s barbershop se caracteriza por ofrecer un buen trato y servicio personalizado al cliente, ofreciendo tanto cortes modernos como tradicionales a tijera. Además del afeitado clásico con toallas calientes y cuidado de la barba.        
" />
<meta property="og:image" content="http://wallsbarbershop.com.mx/images/200x200.png" />
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="shortcut icon" href="images/walls.ico" />
      <link href="css/responsive-slider.css" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/style.css">
  <link rel="stylesheet" type="text/css" href="css/ihover.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" integrity="sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">
</head>
<style type="text/css">
body{
	background-color: #000;
	color: #fff;
	margin-left: 15px;
	margin-right: 15px;

}
h3{
	font-size: 30px;
}
p{
	font-size: 25px;
	font-family: Avenir !important;
}
</style>
<body>
<?php if($datos){?>
<h3 >Hola <?php echo $datos[0]['nombre'] ?> <?php echo $datos[0]['apellidos'] ?></h3>
<p>Tu última visita fue el <?php echo date("d/m/Y", strtotime($datos[0]['ultima_visita'])); ?>. Tu total de visitas es <span style="font-size: 40px;"> <?php echo $datos[0]['visitas'] ?></span>, recuerda que cada 5 visitas, tienes un corte gratis!.</span>
</p>
<?php }else{?>
<h3>LO SENTIMOS TUS DATOS SON INCORRECTOS, PRUEBA DE NUEVO!!</h3>
<?php }?>
<img src="images/walls1.png" class="img-responsive center-block">
</body>
</html>