<?php
  
  
  session_start(); 
  if(!isset($_SESSION['RHComedor'])){
	  header('location:index.php');
  }else{
	  //header('location:view/evaluacion_clinicav2.php');
	  if(!isset($_SESSION['RHComedor'])){ 
			//$a= "No PAsaria 1";
			echo "<script> window.location='index.php'</script>";
	  }else{
		
	  }
  }
  ?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Dashboard</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="bower_components/font-awesome/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="bower_components/Ionicons/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="dist/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="dist/css/skins/_all-skins.min.css">
  <!-- Morris chart -->
  <!-- <link rel="stylesheet" href="bower_components/morris.js/morris.css"> -->
  <!-- jvectormap -->
  <link rel="stylesheet" href="bower_components/jvectormap/jquery-jvectormap.css">
  <!-- Date Picker -->
  <link rel="stylesheet" href="bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="bower_components/bootstrap-daterangepicker/daterangepicker.css">
  <!-- bootstrap wysihtml5 - text editor -->
  <link rel="stylesheet" href="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">

  <!--Estilos propios del portal de proveedores-->
  <link rel="stylesheet" href="libraries/css/estilos.css">
  <link rel="stylesheet" href="assets/iconos/css/all.css"> 
  <!-- DataTables -->
  <link rel="stylesheet" href="bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
   <link rel="icon" type="image/png" href="libraries/img/icon2.png"/>
</head>
<body class="hold-transition skin-blue sidebar-mini sidebar-collapse">
<div class="wrapper">

  <header class="main-header">
    <!-- Logo -->
    <a href="dashboard.php" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini" style="background-image: url('assets/img/icon.png'); width: 50px; height: 50px; padding: 0px 4px 4px 40px;"></span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg" style="background-image: url('assets/img/logo.png'); width: 145px; height: 43px;"></span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>

      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <li class="dropdown user user-menu">
            <a href="#" class="dropdown-toggle" data-toggle="dropdown">
             <!--<img src="dist/img/user2-160x160.jpg" class="user-image" alt="User Image"> -->
              <span id="NombreCont2"></span> &nbsp &nbsp <span id="Fecha2"></span>
            </a>
            <ul class="dropdown-menu">
              <!-- User image -->
              <li class="user-header" style="height: 60px;">
               
                <p>
                 <p id="NombreCont">
                </p>
              </li>
              <!-- Menu Body -->
              <li class="user-body">
                <div class="row">
				 
                  <div class="col-xs-12 text-center">
                    <a onclick="CerrarSesion();">Cerrar Sesion</a>
                  </div>
                </div>
                <!-- /.row -->
              </li>
             
            </ul>
          </li>
        
        </ul>
      </div>
    </nav>
  </header>
  <!-- Left side column. contains the logo and sidebar -->
  <aside class="main-sidebar">
    <!-- sidebar: style can be found in sidebar.less -->
    <section class="sidebar">
     
      <!-- /.search form -->
      <!-- sidebar menu: : style can be found in sidebar.less -->
      <ul class="sidebar-menu" data-widget="tree">
        <li class="header">ARZYZ WEB </li>
		<!--
        <li>
          <a href="view/CargaMetas.php">
           <img src="assets/img/microsoftteams_image__9__mR8_icon.ico"> <span> Definición de Metas</span>
            <span class="pull-right-container">
              
            </span>
          </a>
        </li>
		-->
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Comedor ARZYZ
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->
      <div class="row">
            <div class="col-xs-12">
                <div class="box">
                    <div class="box-header" style="display:none;">
					 <input type="text" class="form-control" id="txtNumEmpleado" value="<?php echo $_SESSION['RHComedor']; ?>" disabled><br>
					 
                    </div>
					
                    <div id="box-body" style="padding: 0px 10px 10px 10px;">  
					<br>
						<div class="form-group row" id="divIDVisita" style="display:none;">
							<label for="lblNombreVisita" class="col-sm-3 col-form-label">No. Empleado:</label>
							<div class="col-sm-8">
							  <input type="text" class="form-control" id="txtNumEmpleadoLogeado" value="<?php echo $_SESSION['RHComedor']; ?>" disabled>
							</div>
						 </div>
						 <div class="form-group row" id="divIDVisita" style="display:none;">
							<label for="lblNombreVisita" class="col-sm-3 col-form-label">Empleado:</label>
							<div class="col-sm-8">
							  <input type="text" class="form-control" id="txtNombreEmpleadoLogeado" disabled>
							</div>
						 </div>
						  <div class="form-group row" id="divIDVisita">
							<label for="lblNombreVisita" class="col-sm-3 col-form-label">Ubicación:</label>
							<div class="col-sm-8">
								<select class="form-control" id="txtUbicacion" disabled>
									<option value="0"> Seleccione Ubicación</option>
									<option value="1" selected> Torre TOP</option>
									<option value="2"> Apodaca</option>
									<option value="3"> Cienega</option>
								</select>
							</div>
						 </div>
						<div class="form-group row" id="divIDVisita">
							<label for="lblNombreVisita" class="col-sm-3 col-form-label">Tipo de platillo:</label>
							<div class="col-sm-8">
								<select class="form-control" id="txtTipoPlatillo" onchange="TipoPlatillo()">
									<option value="0"> Seleccione el tipo de platillo</option>
									<!--
									<option value="1"> Platillo Caliente</option>
									<option value="2"> Platillo Frío</option>
									-->
									<option value="3"> Platillo Unico</option>
									<option value="4"> Green Spot</option>
									
								</select>
							</div>
						 </div>
						  <div class="form-group row" id="DivCantidad" style="display:none;">
							<label for="lblNombreVisita" class="col-sm-3 col-form-label">No. Platillos:</label>
							<div class="col-sm-8">
								
								<input type="number" class="form-control" id="txtNumPlatillo" min="1" value="1" onchange="ValidarPlatillos()">
							  
							</div>
						 </div>
						 <!-- ////////// -->
						 <div id="ComidaGR" style="display:none;">
							<center>
								<h4>Pedido Green Spot</h4>
								<br>
							</center>
							 <div class="form-group col-md-12 col-xs-12 row">
								 <div class="col-md-4 col-xs-12 " id="divIDVisita">
									<label for="lblNombreVisita" class="col-sm-4 col-form-label">Platillo:</label>
									<div class="col-sm-8">
										<select class="form-control" name="txtProductoSeleccionadoGR" id="txtProductoSeleccionadoGR" onchange="InfoPlatillo()">
											
										</select>
									</div>
								 </div>
								  <div class="col-md-2 col-xs-12 " id="divIDVisita">
									<label for="lblNombreVisita" class="col-sm-4 col-form-label">Kcal (c/u):</label>
									<div class="col-sm-8">
										<input type="text" class="form-control" id="txtCaloriasGR"  disabled >
									</div>
								 </div>
								 <div class="col-md-2 col-xs-12 " id="divIDVisita">
									<label for="lblNombreVisita" class="col-sm-4 col-form-label">Cantidad:</label>
									<div class="col-sm-8">
										<input type="number" class="form-control" id="txtNumPlatilloGR" min="1" value="1" onchange="ValidarPlatillosGR()">
									</div>
								 </div>
								 <div class="col-md-2 col-xs-12 " id="divIDVisita">
									<label for="lblNombreVisita" class="col-sm-4 col-form-label">Precio:</label>
									<div class="col-sm-8">
										
										<input type="text" class="form-control" id="txtPrecioTotal" value="0.00" disabled >
										<input type="text" class="form-control" id="txtPrecioGR" value="0.00" disabled style="display:none">
										<input type="text" class="form-control" id="txtTipoPlatilloGR" disabled style="display:none" >
									</div>
								 </div>
								
								 <div class="col-md-2 col-xs-12 row" id="divIDVisita">
									<label for="lblNombreVisita" class="col-sm-4 col-form-label"></label>
									<div class="col-sm-8">
										<center>
											<button type="button" class="btn btn-primary  btn-block ValidaBoton" onclick="AgregarComidaGr();" id="GuardarOrden" >Agregar</button>
										</center>
									</div>
									
								 </div>
							 </div>
							 <div   class="form-group col-md-12 col-xs-12 row">
								
								<table id ="TablaGreenSpot" style="border-collapse: collapse;" class="table table-bordered table-hover TablaResponsiva">
								<thead>
								<tr>
									<td scope="col">Posición</td>
									<td scope="col">Id. Platillo</td>
									<td scope="col">Platillo</td>
									<td scope="col">Tipo Platillo</td>
									<td scope="col">Kcal.</td>
									<td scope="col">Cantidad</td>
									<td scope="col">Precios</td>
									<td scope="col">Total</td>
									<td scope="col"></td>
								</tr>
								</thead>
								<tbody id="ListadoComidaGr">
								</tbody>
								</table>
							 </div>
						 </div>
						 <!-- ////////// -->
						  <div class="form-group row" id="DivFecha" style="display:none;">
							<label for="lblNombreVisita" class="col-sm-3 col-form-label">Fecha:</label>
							<div class="col-sm-8">
							  <input type="text" class="form-control" id="txtFechaPedido" disabled>
							</div>
						 </div>
						 <!--
						  <div class="form-group row" id="divIDVisita">
							<label for="lblNombreVisita" class="col-sm-3 col-form-label">Ubicación:</label>
							<div class="col-sm-8">
								<select class="form-control" id="txtUbicacion" disabled>
									<option value="0"> Seleccione Ubicación</option>
									<option value="1" selected> Torre TOP</option>
									<option value="2"> Apodaca</option>
									<option value="3"> Cienega</option>
								</select>
							</div>
						 </div>
						 -->
						 <div class="col-md-12 col-xs-12">
							<center>
							<br>
							 <button type="button" class="btn btn-primary btn-lg btn-block ValidaBoton" onclick="GuardarOrden();" id="GuardarOrden" >Solicitar Comida</button>
							</center>
						</div>
						<!--
                        <table id="example" class="table table-bordered table-hover">
                            <thead>
                                <tr>  
                                    <td><button type="button" class="btn btn-primary btn-lg btn-block" onclick="location.href='view/CargaMetas.php';">Definición de Metas</button></td>
								</tr>
								
								
                            </thead>
                        </table>	
						-->
                    </div>             
                </div>
            </div>
      </div>
      <!-- /.row -->
	
	 <!-- Modal -->
	<div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true" id="ModalAviso" data-backdrop="static" data-keyboard="false" >
	<div class="modal-dialog modal-lg">
		<div class="modal-content">
		  <div class="modal-header" style="background: #003057;">
			<h4 class="modal-title" id="exampleModalLongTitle" style="color: #FFFFFF;">Pedido de comida Guardado.</h4>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close" onclick="CerrarPedido();">
			  <span aria-hidden="true" style="color: #FFFFFF;">&times;</span>
			</button>
		  </div>
		  <div class="modal-body">
			<p>EL pedido de la comida ha sido guardado correctamente.</p>
			
		</div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-secondary"  data-dismiss="modal" onclick="CerrarPedido();">Cerrar</button>
			
		  </div>
		</div>
	  </div>
	</div>
        <!-- /.Modal-->
    
     
    </section>
    <!-- /.content -->
     


  </div>
  <!-- /.content-wrapper -->

  <!--
  <footer class="main-footer">
    <div class="pull-right hidden-xs">
      <b>Version</b> 2.4.18
    </div>
    <strong>Copyright &copy; 2014-2019 <a href="https://adminlte.io">AdminLTE</a>.</strong> All rights
    reserved.
  </footer>
  -->

  <!-- /.control-sidebar -->
  <!-- Add the sidebar's background. This div must be placed
       immediately after the control sidebar -->
  <div class="control-sidebar-bg"></div>
</div>
<!-- ./wrapper -->

<!-- jQuery 3 -->
<script src="bower_components/jquery/dist/jquery.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="bower_components/jquery-ui/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button);
</script>
<!-- Bootstrap 3.3.7 -->
<script src="bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- Morris.js charts -->
<script src="bower_components/raphael/raphael.min.js"></script>
<script src="bower_components/morris.js/morris.min.js"></script>
<!-- Sparkline -->
<script src="bower_components/jquery-sparkline/dist/jquery.sparkline.min.js"></script>
<!-- jvectormap -->
<script src="plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<!-- jQuery Knob Chart -->
<script src="bower_components/jquery-knob/dist/jquery.knob.min.js"></script>
<!-- daterangepicker -->
<script src="bower_components/moment/min/moment.min.js"></script>
<script src="bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
<!-- datepicker -->
<script src="bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
<!-- Bootstrap WYSIHTML5 -->
<script src="plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<!-- Slimscroll -->
<script src="bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="bower_components/fastclick/lib/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="dist/js/adminlte.min.js"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<!-- <script src="dist/js/pages/dashboard.js"></script> -->
<!-- AdminLTE for demo purposes -->
<script src="dist/js/demo.js"></script>

<script src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>
   <!-- <script src="libraries/datatables/jquery.dataTables.min.js"></script>-->
    <script src="libraries/datatables/dataTables.bootstrap.min.js"></script>

    <!--JSSH Se realiza llamado al archivo Javascript propio del portal-->
    <script src="javascript/CargaInformacion.js"></script>
</body>
</html>