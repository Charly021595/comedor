<?php
  
   session_start(); 
  if(!isset($_SESSION['RHComedor'])){ 
		//$a= "No PAsaria 1";
  }else{
	 echo "<script> window.location='dashboard.php'</script>";
  }
 ?>

<html>
<head>
 <title>Comedor Inteligente ARZYZ</title>	
 <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="libraries/css/bootstrap.min.css" crossorigin="anonymous">
    <link rel="stylesheet" href="libraries/css/estilos.css" type="text/css">
    <!--JSSH Se agrega dependencias de Datatables-->
    <link rel="stylesheet" type="text/css" href="libraries/datatables/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="libraries/datatables/dataTables.bootstrap.min.css">
    <script src="libraries/js/jquery-1.12.3.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
    <script src="libraries/datatables/jquery.dataTables.min.js"></script>
    <script src="libraries/datatables/dataTables.bootstrap.min.js"></script>
	
    <link rel="icon" type="image/png" href="libraries/img/icon2.png"/>
	<script src="javascript/PortalComedor.js"></script>
</head>
<body>
<div id="cuerpo_pequeno">
<div class="espacio-medio"></div>
<div>
    <img src="libraries/img/logo.jpg" width="319" height="65" alt="ARZYZ" class="img-responsive centrar">    
</div>
<div class="espacio-pequeno"></div>
<div class="">
    <!-- <form method="post"> -->
        <div class="form-group">
            <label for="username">No. Empleado:</label>
            <input type="text" id="username" name="username" class="form-control validanumericos" placeholder="Usuario" required/> 
        </div>
        <div class="form-group">
            <label for="password">Contraseña:</label>
            <input id="password" type="password" name="password" class="form-control" onkeyup="Validar()" placeholder="Contraseña" required/>        
        </div>
        <div class="centrar">
            <button class="EnviarContactoDetalleProducto btn-lg" onclick="Login();" id="login">Ingresar</button>
            <!--JSSH Se solicita eliminar el boton Cancelar-->
            <!--<input class="btn btn-default" id="reset-btn" type="reset" value="Cancelar" />-->
        </div>
        <!--JSSH Agregar opción quiero ser proveedor y redireccionar a Contactanos-->
        <!--Redireccionamiento a Desarrollo-->
        <br/>
       
    <!-- </form> -->
    <br>
    <div id="mensaje"></div>
</div>
</div>
<br/>
<br/>
<br/>
<br/>
<footer style="width:100%; margin-left: 0px;">
<div><img src = "libraries/img/TipsAnonimos.jpg" class="img-responsive centrar"></div>
</footer>


</body>

</html>
