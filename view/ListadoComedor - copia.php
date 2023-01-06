
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Levantar pedido- ARZYZ</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <link rel="stylesheet" href="../bower_components/bootstrap/dist/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../bower_components/font-awesome/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="../bower_components/Ionicons/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../dist/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="../dist/css/skins/_all-skins.min.css">
  <!-- Morris chart -->
  <!-- <link rel="stylesheet" href="../bower_components/morris.js/morris.css"> -->
  <!-- jvectormap -->
  <link rel="stylesheet" href="../bower_components/jvectormap/jquery-jvectormap.css">
  <!-- Date Picker -->
  <link rel="stylesheet" href="../bower_components/bootstrap-datepicker/dist/css/bootstrap-datepicker.min.css">
  <!-- Daterange picker -->
  <link rel="stylesheet" href="../bower_components/bootstrap-daterangepicker/daterangepicker.css">
  <!-- bootstrap wysihtml5 - text editor -->
  <link rel="stylesheet" href="../plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">

  <!--Estilos propios del portal de proveedores-->
  <link rel="stylesheet" href="../libraries/css/estilos.css">
  <link rel="stylesheet" href="../assets/iconos/css/all.css"> 
   <link rel="icon" type="image/png" href="../libraries/img/icon2.png"/>
  <!-- DataTables -->
  <link rel="stylesheet" href="../bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
  <script src="//cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment.min.js"></script>
</head>
<body class="hold-transition skin-blue sidebar-mini sidebar-collapse">
<div class="wrapper">

  <header class="main-header">
    <!-- Logo -->
     <a href="#" class="logo">
      <!-- mini logo for sidebar mini 50x50 pixels -->
      <span class="logo-mini" style="background-image: url('../assets/img/icon.png'); width: 50px; height: 50px; padding: 0px 4px 4px 40px;"></span>
      <!-- logo for regular state and mobile devices -->
      <span class="logo-lg" style="background-image: url('../assets/img/logo.png'); width: 145px; height: 43px;"></span>
    </a>
    <!-- Header Navbar: style can be found in header.less -->
    <nav class="navbar navbar-static-top">
      <!-- Sidebar toggle button-->
      <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
        <span class="sr-only">Toggle navigation</span>
      </a>
	
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
       
        
      </ul>
    </section>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
       Listado de comida del dia
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->
      <div class="row">
            <div class=" container col-xs-12">
                <div class="box">
					 <div class="box-header" >
						<input style="display:none;" type="number" class="form-control" id="txtNumEmpleadoLogeado"  disabled>
					    <div class="col-md-8 col-xs-12">
						   <div class="form-group row">
								<label for="lblNombreVisita" class="col-sm-3 col-form-label">Fecha:</label>
								<div class="col-sm-6">
								  <input type="date"  class="form-control" id="txtFechaSeleccionado">
								  
								</div>
							</div>
						</div>
						
						<div class="col-md-4 col-xs-12">
						   <div class="form-group row">
								<button type="button" class="btn btn-primary btn-lg btn-block" onclick="MostrarInforme();" >Buscar listado</button>
							</div>
						</div>
						
						<!-- -->
						<div class="col-md-8 col-xs-12">
						   <div class="form-group row">
								<label for="lblNombreVisita" class="col-sm-3 col-form-label">Filtrar por No. Empleado:</label>
								<div class="col-sm-6">
								  <input type="num"  class="form-control" id="txtNumeroEmpleado">
								  
								</div>
							</div>
						</div>
						<!-- -->
						
					</div>
					<div id="box-body" style="padding: 0px 10px 10px 10px;">  
					<section id="Industria" class="CeroPadCeroMar ">
						 <div class="col-md-12 col-xs-12">
							<center>
							<h2 class="MoverInnovacion" style="font-size: 5vmin;color: #0F196C;font-family: Lettera Text Std;">
								
							</h2>
							</center>
							
							
						</div>
						<!--
						<div class="col-md-12 col-xs-12">
							<center>
							 <button type="button" class="btn btn-primary btn-lg btn-block" onclick="AgregarMeta();" >Agregar Meta</button>
							</center>
						</div>
						-->
						<div id="EspacioTabla"  class="col-md-12 col-xs-12">
							
						</div>
						
						<!--
						<div class="col-md-6 col-xs-12">
							<center>
							<br>
							 <button type="button" class="btn btn-primary btn-lg btn-block" onclick="ValidarMetas();" >Validar Metas</button>
							</center>
						</div>
						<div class="col-md-6 col-xs-12">
							<center>
							<br>
							 <button type="button" class="btn btn-primary btn-lg btn-block" onclick="GuardarMetas();" >Guardar Meta</button>
							</center>
						</div>
						-->
					</section>
					
					
					
                </div>
				
				
            </div>
      </div>
    
	
    </section>
   </div>
 
  <div class="control-sidebar-bg"></div>
</div>
<!-- ./wrapper -->

<!-- jQuery 3 -->
<script src="../bower_components/jquery/dist/jquery.min.js"></script>
<!-- jQuery UI 1.11.4 -->
<script src="../bower_components/jquery-ui/jquery-ui.min.js"></script>
<!-- Resolve conflict in jQuery UI tooltip with Bootstrap tooltip -->
<script>
  $.widget.bridge('uibutton', $.ui.button);
</script>
<!-- Bootstrap 3.3.7 -->
<script src="../bower_components/bootstrap/dist/js/bootstrap.min.js"></script>
<!-- Morris.js charts -->
<script src="../bower_components/raphael/raphael.min.js"></script>
<script src="../bower_components/morris.js/morris.min.js"></script>
<!-- Sparkline -->
<script src="../bower_components/jquery-sparkline/dist/jquery.sparkline.min.js"></script>
<!-- jvectormap -->
<script src="../plugins/jvectormap/jquery-jvectormap-1.2.2.min.js"></script>
<script src="../plugins/jvectormap/jquery-jvectormap-world-mill-en.js"></script>
<!-- jQuery Knob Chart -->
<script src="../bower_components/jquery-knob/dist/jquery.knob.min.js"></script>
<!-- daterangepicker -->
<script src="../bower_components/moment/min/moment.min.js"></script>
<script src="../bower_components/bootstrap-daterangepicker/daterangepicker.js"></script>
<!-- datepicker -->
<script src="../bower_components/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js"></script>
<!-- Bootstrap WYSIHTML5 -->
<script src="../plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>
<!-- Slimscroll -->
<script src="../bower_components/jquery-slimscroll/jquery.slimscroll.min.js"></script>
<!-- FastClick -->
<script src="../bower_components/fastclick/lib/fastclick.js"></script>
<!-- AdminLTE App -->
<script src="../dist/js/adminlte.min.js"></script>
<!-- AdminLTE dashboard demo (This is only for demo purposes) -->
<!-- <script src="../dist/js/pages/dashboard.js"></script> -->
<!-- AdminLTE for demo purposes -->
<script src="../dist/js/demo.js"></script>

<script src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>
   <!-- <script src="libraries/datatables/jquery.dataTables.min.js"></script>-->
    <script src="../libraries/datatables/dataTables.bootstrap.min.js"></script>

    
    <script src="../javascript/ListadoComedor.js"></script>
	<script type="text/javascript" src="../libraries/webcamjs/webcam.min.js"></script>
</body>
</html>