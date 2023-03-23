<?php
  
  
  session_start(); 
  if(!isset($_SESSION['RHComedor'])){
	  header('location:../index.php');
  }else{
	  //header('location:view/evaluacion_clinicav2.php');
	  if(!isset($_SESSION['RHComedor'])){ 
			//$a= "No PAsaria 1";
			echo "<script> window.location='index.php'</script>";
	  }else{
		if($_SESSION['RHComedor']!= '99999999' && $_SESSION['RHComedor'] != '8999' && $_SESSION['RHComedor'] != '4857' && $_SESSION['RHComedor'] != '100000000' && 
		$_SESSION['RHComedor'] != '100000001'){
			echo "<script> window.location='../../dashboard.php'</script>";
		}
	  }
  }
  
  ?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Listado de Comidas Green Spot - ARZYZ</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="../../bower_components/bootstrap/dist/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../../bower_components/font-awesome/css/font-awesome.min.css">
  <link rel="stylesheet" href="../../assets/fontawesome/fontawesome-free-6.3.0-web/css/all.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="../../bower_components/Ionicons/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../../dist/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="../../dist/css/skins/_all-skins.min.css">
  <!-- Morris chart -->
  <!-- <link rel="stylesheet" href="../bower_components/morris.js/morris.css"> -->
  <!-- jvectormap -->
  <link rel="stylesheet" href="../../bower_components/jvectormap/jquery-jvectormap.css">
  <!-- Date Picker -->
  <link rel="stylesheet" href="../../bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="../../bower_components/bootstrap-daterangepicker/daterangepicker.css">
  <!-- bootstrap wysihtml5 - text editor -->
  <link rel="stylesheet" href="../../plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">

   <!-- Mis Estilos -->
   <link rel="stylesheet" href="../../assets/css/styles.css">

  <!--Estilos propios del portal de proveedores-->
  <link rel="stylesheet" href="../../libraries/css/estilos.css">
  <link rel="stylesheet" href="../../assets/iconos/css/all.css"> 
   <link rel="icon" type="image/png" href="../../libraries/img/icon2.png"/>
  <!-- DataTables -->
  <link rel="stylesheet" href="../../bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
  <script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  
</head>
<body class="hold-transition skin-blue sidebar-mini sidebar-collapse">
	<div class="wrapper">

		<header class="main-header">
			<!-- Logo -->
			<a href="#" class="logo">
			<!-- mini logo for sidebar mini 50x50 pixels -->
			<span class="logo-mini" style="background-image: url('../../assets/img/icon.png'); width: 50px; height: 50px; padding: 0px 4px 4px 40px;"></span>
			<!-- logo for regular state and mobile devices -->
			<span class="logo-lg" style="background-image: url('../../assets/img/logo.png'); width: 145px; height: 43px;"></span>
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
				<!-- <li>
					<a href="../ListadoComedorGreenSpot.php">
					<img src="../../assets/img/microsoftteams_image__9__mR8_icon.ico"> <span> Green Spot</span>
					<span class="pull-right-container">
					
					</span>
					</a>
				</li> -->
				<?php if($_SESSION['RHComedor'] == '8999' || $_SESSION['RHComedor'] == '4857'){ ?>
				<li>
					<a href="../../dashboard.php">
					<img src="../../assets/img/microsoftteams_image__9__mR8_icon.ico"> <span>Dashboard</span>
					<span class="pull-right-container">
					
					</span>
					</a>
				</li>
				<?php } ?>
				<?php if($_SESSION['RHComedor'] == '99999999' || $_SESSION['RHComedor'] == '100000000' || $_SESSION['RHComedor'] == '100000001'){ ?>
				<li>
					<a href="ListadoComedorGreenSpotSemanal.php">
					<img src="../../assets/img/microsoftteams_image__9__mR8_icon.ico"> <span> Green Spot</span>
					<span class="pull-right-container">
					
					</span>
					</a>
				</li>
				<!-- <li>
					<a href="../ListadoComedor.php">
					<img src="../../assets/img/microsoftteams_image__9__mR8_icon.ico"> <span>Comedor Plato Express</span>
					<span class="pull-right-container">
					
					</span>
					</a>
				</li> -->
				<li>
					<a href="ListadoComedorSemanal.php">
					<img src="../../assets/img/microsoftteams_image__9__mR8_icon.ico"> <span>Comedor Plato Express</span>
					<span class="pull-right-container">
					
					</span>
					</a>
				</li>
				<?php } ?>
				<?php if($_SESSION['RHComedor'] == '8999' || $_SESSION['RHComedor'] == '4857'){ ?>
				<li>
					<a href="ListadoComedorProcesado.php">
						<img src="../../assets/img/microsoftteams_image__9__mR8_icon.ico"> <span>Listado Enviado Nomina</span>
						<span class="pull-right-container">  
						</span>
					</a>
				</li>
				<?php } ?>
				<?php if($_SESSION['RHComedor'] == '8999' || $_SESSION['RHComedor'] == '4857' || $_SESSION['RHComedor'] == '99999999' || $_SESSION['RHComedor'] == '100000000' || $_SESSION['RHComedor'] == '100000001'){ ?>
				<li>
					<a href="subir_menu.php">
						<i class="fa-solid fa-utensils"></i> <span>  Subir Menu</span>
					</a>
				</li>
				<?php } ?>
				<?php if($_SESSION['RHComedor'] == '8999' || $_SESSION['RHComedor'] == '4857' || $_SESSION['RHComedor'] == '99999999'){ ?>
				<li>
					<a href="GraficasComedor.php">
					<img src="../../assets/img/microsoftteams_image__9__mR8_icon.ico"> <span>Graficas Comedor</span>
					<span class="pull-right-container">
					
					</span>
					</a>
				</li>
				<?php } ?>
			</ul>
			</section>
			<!-- /.sidebar -->
		</aside>

		<!-- Content Wrapper. Contains page content -->
		<div class="content-wrapper">
			<!-- Content Header (Page header) -->
			<section class="content-header">
			<h1>
			Graficas Comedor
			</h1>
			</section>

			<!-- Main content -->
			<section class="content">
				<!-- Small boxes (Stat box) -->
				<div class="panel panel-default" style="display: none;">
					<div class="panel-body">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
							<form action="" method="POST" id="form_graficas_greenspot">
								<input type="hidden" name="param" value="26">
								<input type="text" style="display:none;" class="form-control" id="txtNumEmpleado" value="<?php echo $_SESSION['RHComedor']; ?>" disabled>
								<div class="form-group row" id="divIDVisita" style="display:none;">
									<label for="lblNombreVisita" class="col-sm-3 col-form-label">Ubicación:</label>
									<div class="col-sm-8">
										<select class="form-control" name="ubicacion" id="txtUbicacion" disabled>
											<option value="0"> Seleccione Ubicación</option>
											<option value="1"> Torre TOP</option>
											<option value="2"> Apodaca</option>
											<option value="3"> Cienega</option>
										</select>
									</div>
								</div>
								<div class="col-md-8 col-xs-12">
									<div class="form-group row">
										<label for="lblNombreVisita" class="col-sm-3 col-form-label">Fecha:</label>
										<div class="col-sm-6">
											<input type="text" style="background: #FFF" class="form-control" id="txtFechaSeleccionado" name="Fecha" placeholder="Fecha" readonly>
										</div>
										<div class="col-xs-3 col-sm-3 col-md-3 row left-text">
											<div class="form-group">
												<button type="button" class="btn btn-secondary boton-secundario" id="btnClearDate" style="width: 37px;height: 35px; padding:3px;margin-left: -17px;border-radius: 5px;">
													<i class="fas fa-times"></i>
												</button>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-4 col-xs-12">
									<div class="form-group row">
										<button type="button" class="btn btn-primary btn-lg btn-block" onclick="MostrarGraficas();" >Mostrar Gráficas</button>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>

				<div class="panel panel-default" id="div_padre_graficas" style="display:none;">
                    <div class="panel-body">
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="contenedor_loading_comedor" class="centrar" style="display:none;">
							<img src="../../assets/img/loading.gif" id="loading_comedor" class="centrar">
						</div>
                        <!-- <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="graficas" style="display:none;">
							<canvas id="myChart" width="100" height="35"></canvas>
						</div> -->
						<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12" id="graficas" style="display:none;">
							<!-- <canvas id="myChart" width="100" height="35"></canvas> -->
							<iframe title="Indicador Comedor" name="graficas_power_bi" id="graficas_power_bi" onload="siteLoaded()"
							src="https://app.powerbi.com/view?r=eyJrIjoiODRlNTg0MWQtOThjOC00NTA4LThiMTktMzFjZDZiOGRhNDQxIiwidCI6ImZhZTBkZDhhLTY1ZjctNDFiMy1iZTMxLWFkZWMwMDE0YjYyMCJ9&pageName=ReportSectionc2e8662857718e57182b" 
							frameborder="0"
							allowFullScreen="true"></iframe>
						</div>
                    </div>
                </div>
			</section>
		</div>
	
		<div class="control-sidebar-bg"></div>
	</div>
	<!-- ./wrapper -->

	<!-- jQuery 3 -->
	<script src="../../bower_components/jquery/dist/jquery.min.js"></script>
	<!-- jQuery UI 1.11.4 -->
	<script src="../../bower_components/jquery-ui/jquery-ui.min.js"></script>
	<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
	<script>
	$.widget.bridge('uibutton', $.ui.button);
	</script>
	<!-- Bootstrap 3.3.7 -->
	<script src="../../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
	<!-- Morris.js charts -->
	<script src="../../bower_components/raphael/raphael.min.js"></script>
	<script src="../../bower_components/morris.js/morris.min.js"></script>
	<!-- Sparkline -->
	<script src="../../bower_components/jquery-sparkline/dist/jquery.sparkline.min.js"></script>
	<!-- jvectormap -->
	<script src="../../plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
	<script src="../../plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
	<!-- jQuery Knob Chart -->
	<script src="../../bower_components/jquery-knob/dist/jquery.knob.min.js"></script>
	<!-- daterangepicker -->
	<script src="../../bower_components/moment/min/moment.min.js"></script>
	<script src="../../bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
	<!-- datepicker -->
	<script src="../../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
	<!-- Bootstrap WYSIHTML5 -->
	<script src="../../plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
	<!-- Slimscroll -->
	<script src="../../bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
	<!-- FastClick -->
	<script src="../../bower_components/fastclick/lib/fastclick.js"></script>
	<!-- AdminLTE App -->
	<script src="../../dist/js/adminlte.min.js"></script>
	<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
	<!-- <script src="../dist/js/pages/dashboard.js"></script> -->
	<!-- AdminLTE for demo purposes -->
	<script src="../../dist/js/demo.js"></script>

	<!-- Sweetalert -->
	<script src="../../assets/js/sweetalert2.js"></script>

	<script src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>
    <script src="../../libraries/datatables/dataTables.bootstrap.min.js"></script>

    <!-- graficas libreria -->
    <!-- <script src="../../assets/js/chart.js"></script> -->
	<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.1.1/chart.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.1.1/chart.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.1.1/chart.umd.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.1.1/chart.umd.min.js"></script> -->
	<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.1.1/helpers.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.1.1/helpers.min.js"></script> -->

    <script src="../../javascript/Graficas.js?t=<?=time()?>"></script>
	<script src="../../libraries/webcamjs/webcam.min.js"></script>
</body>
</html>