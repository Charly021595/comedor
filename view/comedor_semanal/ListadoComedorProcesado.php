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
		if($_SESSION['RHComedor'] != '8999' && $_SESSION['RHComedor'] != '4857' && $_SESSION['RHComedor'] != '4603' && $_SESSION['RHComedor'] != '4984' 
		&& $_SESSION['RHComedor'] != '8938' && $_SESSION['RHComedor'] != '5074' && $_SESSION['RHComedor'] != '8711'){
			echo "<script> window.location='../dashboard.php'</script>";
		}
	}
}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Listado de Comidas - ARZYZ</title>
  <!-- Tell the browser to be responsive to screen width -->
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
  <!-- Bootstrap 3.3.7 -->
  <!-- <link rel="stylesheet" href="../../bower_components/bootstrap/dist/css/bootstrap.min.css"> -->
  <link rel="stylesheet" href="../../bower_components/bootstrap/dist/css/bootstrap.min.css">
  <!-- Font Awesome -->
  <link rel="stylesheet" href="../../bower_components/font-awesome/css/font-awesome.min.css">
  <!-- Ionicons -->
  <link rel="stylesheet" href="../../bower_components/Ionicons/css/ionicons.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="../../dist/css/AdminLTE.min.css">
  <!-- AdminLTE Skins. Choose a skin from the css/skins
       folder instead of downloading all of them to reduce the load. -->
  <link rel="stylesheet" href="../../dist/css/skins/_all-skins.min.css">
  <!-- Morris chart -->
  <!-- <link rel="stylesheet" href="../../bower_components/morris.js/morris.css"> -->
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
		<?php if($_SESSION['RHComedor'] == '8999' || $_SESSION['RHComedor'] == '4857' || $_SESSION['RHComedor'] == '4603' || $_SESSION['RHComedor'] == '4984' 
		|| $_SESSION['RHComedor'] == '8938' || $_SESSION['RHComedor'] == '5074' || $_SESSION['RHComedor'] == '8711'){ ?>
		<li>
			<a href="../../dashboard.php">
			<img src="../../assets/img/microsoftteams_image__9__mR8_icon.ico"> <span>Dashboard</span>
			<span class="pull-right-container">
			  
			</span>
			</a>
		</li>
		<?php } ?>
		<?php if($_SESSION['RHComedor'] == '99999999'){?>
		<li>
			<a href="ListadoComedorGreenSpotSemanal.php">
			<img src="../../assets/img/microsoftteams_image__9__mR8_icon.ico"> <span> Green Spot</span>
			<span class="pull-right-container">
			  
			</span>
			</a>
		</li>
		<?php } ?>
		<!-- <li>
			<a href="../ListadoComedor.php">
			<img src="../../assets/img/microsoftteams_image__9__mR8_icon.ico"> <span>Comedor Plato Express</span>
			<span class="pull-right-container">
			  
			</span>
			</a>
		</li> -->
		<?php if($_SESSION['RHComedor'] == '99999999'){?>
		<li>
			<a href="ListadoComedorSemanal.php">
			<img src="../../assets/img/microsoftteams_image__9__mR8_icon.ico"> <span>Comedor Plato Express</span>
			<span class="pull-right-container">
			  
			</span>
			</a>
		</li>
		<?php } ?>
		<?php if($_SESSION['RHComedor'] == '8999' || $_SESSION['RHComedor'] == '4857' || $_SESSION['RHComedor'] == '4603' || $_SESSION['RHComedor'] == '4984' 
		|| $_SESSION['RHComedor'] == '8938' || $_SESSION['RHComedor'] == '5074' || $_SESSION['RHComedor'] == '8711'){ ?>
        <li>
			<a href="ListadoComedorProcesado.php">
			<img src="../../assets/img/microsoftteams_image__9__mR8_icon.ico"> <span>Listado Enviado Nomina</span>
			<span class="pull-right-container">
			  
			</span>
			</a>
		</li>
		<?php } ?>
		<?php if($_SESSION['RHComedor'] == '8999' || $_SESSION['RHComedor'] == '4857' || $_SESSION['RHComedor'] == '4603' || $_SESSION['RHComedor'] == '4984' 
		|| $_SESSION['RHComedor'] == '8938' || $_SESSION['RHComedor'] == '5074' || $_SESSION['RHComedor'] == '8711'){ ?>
        <li>
			<a href="ListadoComedorFinalizados.php">
			<img src="../../assets/img/microsoftteams_image__9__mR8_icon.ico"> <span>Listado Finalizados</span>
			<span class="pull-right-container">
			  
			</span>
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
       Comedor Listado Procesados
      </h1>
    </section>

    <!-- Main content -->
    <section class="content">
      <!-- Small boxes (Stat box) -->
      <div class="row">
            <div class=" container col-xs-12">
                <div class="box">
					<div class="box-header" >
						<!-- <input style="display:none;" type="number" class="form-control" id="txtNumEmpleadoLogeado"  disabled> -->
						<input type="text" style="display:none;" class="form-control" id="txtNumEmpleado" value="<?php echo $_SESSION['RHComedor']; ?>" disabled>
						<input type="hidden" name="opcion" id="opcion">
					    <form action="" method="POST" id="form_comedor_conciliados">
							<div class="col-md-8 col-xs-12">
								<div class="form-group row">
									<label for="lblNombreVisita" class="col-sm-3 col-form-label">Fecha:</label>
									<div class="col-sm-6">
										<!-- <input type="date"  class="form-control" id="txtFechaSeleccionado"> -->
										<input type="text" style="background: #FFF" class="form-control" id="txtFechaSeleccionado" name="daterange" placeholder="Fecha" readonly>
									</div>
									<div class="col-xs-3 col-sm-3 col-md-3 row left-text">
										<div class="form-group">
											<button type="button" class="btn boton-secundario" id="btnClearDate" style="width: 37px;height: 35px; padding:3px;margin-left: -17px;border-radius: 5px;">
												<i class="fas fa-times"></i>
											</button>
										</div>
									</div>
								</div>
							</div>
							
							<div class="col-md-4 col-xs-12">
								<div class="form-group row">
									<button type="button" id="buscar_procesados" class="btn btn-primary btn-lg btn-block">Buscar listado</button>
								</div>
							</div>
						</form>

						<!-- -->
						<div id="filtros_plato_express" style="display:none;" class="col-md-8 col-xs-12">
						   <div class="form-group row">
								<label for="lblNombreVisita_plato_express" class="col-sm-3 col-form-label">Filtrar por No. Empleado:</label>
								<div class="col-sm-6">
								  <input type="text" class="form-control" maxlength="6" id="txtNumeroEmpleado_plato_express" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
								</div>
							</div>
						</div>
						<div id="filtros_green_spot" style="display:none;" class="col-md-8 col-xs-12">
						   <div class="form-group row">
								<label for="lblNombreVisita_green_spot" class="col-sm-3 col-form-label">Filtrar por No. Empleado:</label>
								<div class="col-sm-6">
								  <input type="text" class="form-control" maxlength="6" id="txtNumeroEmpleado_green_spot" onkeypress="return event.charCode >= 48 && event.charCode <= 57">
								</div>
							</div>
						</div>
						<div id="filtros_plato_express_conciliados" style="display:none;" class="col-md-8 col-xs-12">
						   <div class="form-group row">
								<label for="lblNombreVisita_plato_express_conciliados" class="col-sm-3 col-form-label">Filtrar por Id Conciliación:</label>
								<div class="col-sm-6">
								  <input type="text" class="form-control" maxlength="12" id="txtNumeroConciliacion_plato_express_conciliacion">
								</div>
							</div>
						</div>
						<div id="filtros_green_spot_procesadas" style="display:none;" class="col-md-8 col-xs-12">
						   <div class="form-group row">
								<label for="lblNombreVisita_green_spot_procesadas" class="col-sm-3 col-form-label">Filtrar por Id Conciliación:</label>
								<div class="col-sm-6">
								  <input type="text" class="form-control" maxlength="12" id="txtNumeroEmpleado_plato_especial_conciliados">
								</div>
							</div>
						</div>
						<!-- -->
						<div style="text-align:right; display:none;" id="boton_descarga_excel_comedor">
							<button id="btn_conciliar_comedor" class="btn btn-primary" onclick="DescargarTablaComedor()">Conciliar</button>
						</div>
						<div style="text-align:right; display:none;" id="boton_descarga_excel_green">
							<button id="btn_conciliar_comedor_green_spot" class="btn btn-primary" onclick="DescargarTablaGreen()">Conciliar</button>
						</div>
						<div style="text-align:right; display:none;" id="boton_descarga_excel_comedor_conciliados">
							<button id="btn_finalizar_comedor_conciliados" class="btn btn-primary" onclick="Finalizar_Conciliadas()">Finalizar</button>
							<button id="btn_conciliar_comedor_conciliados" class="btn btn-primary" onclick="DescargarTablaComedorProcesadas()">Exportar Excel</button>
						</div>
						<div style="text-align:right; display:none;" id="boton_descarga_excel_green_procesadas">
							<button id="btn_finalizar_comedor_especial_conciliados" class="btn btn-primary" onclick="Finalizar_Especial_Conciliadas()">Finalizar</button>
							<button id="btn_conciliar_comedor_green_spot_procesadas" class="btn btn-primary" onclick="DescargarTablaGreenProcesadas()">Exportar Excel</button>
						</div>
					</div>
                </div>
            </div>
			<div class="row">
				<div class="container col-xs-12">
					<div class="box">
						<div class="box-header">
							<div class="col-12 centrar">
								<!-- Nav tabs -->
								<ul class="nav nav-tabs" role="tablist">
									<li role="presentation" id="plato_express_li" class="active"><a href="#plato_express" aria-controls="plato_express" role="tab" data-toggle="tab">Comida</a></li>
									<li role="presentation" id="plato_green_spot_li"><a href="#plato_green_spot" aria-controls="plato_green_spot" role="tab" data-toggle="tab">Plato Green Spot</a></li>
									<li role="presentation" id="plato_express_li_conciliados"><a href="#plato_express_conciliados" aria-controls="plato_express_conciliados" role="tab" data-toggle="tab">Comida Conciliada</a></li>
									<li role="presentation" id="plato_green_spot_li_procesadas"><a href="#plato_green_spot_procesadas" aria-controls="plato_green_spot_procesadas" role="tab" data-toggle="tab">Plato Green Spot Conciliado</a></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<!-- Tab panes -->
			<div class="tab-content">
				<div role="tabpanel" class="tab-pane active" id="plato_express">
					<div id="div_tabla" class="row" style="display:none;">
						<div class="container col-xs-12">
							<div class="box">
								<div class="box-header">
									<div class="col-12 centrar">
										<img id="loading_comedor" src="../../assets/img/loading.gif" style="display:none;">
										<div id="EspacioTabla" style="display:none;" class="col-md-12 col-xs-12">
											<table  id='TablaComedor' class='table table-bordered table-hover TablaResponsiva'>
												<thead>
													<tr class='table-header'>
														<th scope='col' style="display:none;">No. Orden</th>
														<th scope='col'>No. Empleado</th>
														<th scope='col'>Empleado</th>
														<th scope='col' style="display:none;">Tipo de Platillo</th>
														<th scope='col'>Total Platillos</th>
														<th scope='col'>Total Pagar</th>
														<th scope='col' style='display:none;'>Ubicación</th>
														<th scope='col' style="display:none;">FechaPedido</th>
														<th scope='col'>Estatus</th>
														<th scope='col'>Acciones</th>
													</tr>
												</thead>
												<tbody id='ContenidoListados'>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div role="tabpanel" class="tab-pane" id="plato_green_spot">
					<div id="div_tabla_green_spot" class="row" style="display:none;">
						<div class="container col-xs-12">
							<div class="box">
								<div class="box-header">
									<div class="col-12 centrar">
										<img id="loading_comedor_green_spot" src="../../assets/img/loading.gif" style="display:none;">
										<div id="EspacioTabla_green_spot" style="display:none;" class="col-md-12 col-xs-12">
											<table  id='TablaComedor_green_spot' class='table table-bordered table-hover TablaResponsiva'>
												<thead>
													<tr class='table-header'>
														<th scope='col' style='display:none;'>No. Orden</th>
														<th scope='col'>No. Empleado</th>
														<th scope='col' >Empleado</th>
														<th scope='col'>Total Platillos</th>
														<th scope='col' style="display:none;">Platillo</th>
														<th scope='col' style='display:none;'>Kcal.</th>
														<th scope='col' style='display:none;'>Precio </th>
														<th scope='col' style='display:none;'>Total</th>
														<th scope='col'>Total Pagar</th>
														<th scope='col' style='display:none;'>Ubicación</th>
														<th scope='col' style='display:none;'>FechaPedido</th>
														<th scope='col'>Estatus Enviado</th>
														<th scope='col'>Acciones</th>
													</tr>
												</thead>
												<tbody id='ContenidoListados_green_spot'>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div role="tabpanel" class="tab-pane" id="plato_express_conciliados">
					<div id="div_tabla_plato_express_conciliados" class="row" style="display:none;">
						<div class="container col-xs-12">
							<div class="box">
								<div class="box-header">
									<div class="col-12 centrar">
										<img id="loading_comedor_conciliados" src="../../assets/img/loading.gif" style="display:none;">
										<div id="EspacioTabla_plato_express_conciliados" style="display:none;" class="col-md-12 col-xs-12">
											<table  id='TablaComedor_conciliados' class='table table-bordered table-hover TablaResponsiva'>
												<thead>
													<tr class='table-header'>
														<th scope='col'>Id Conciliación</th>
														<th scope='col' style='display:none;'>No. Empleado</th>
														<th scope='col'>Total Platillos</th>
														<th scope='col'>Total Pagar</th>
														<th scope='col'>Fecha_Conciliado</th>
														<th scope='col'>Estatus</th>
														<th scope='col'>Acciones</th>
													</tr>
												</thead>
												<tbody id='ContenidoListados_plato_express_conciliados'>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div role="tabpanel" class="tab-pane" id="plato_green_spot_procesadas">
					<div id="div_tabla_green_spot_procesadas" class="row" style="display:none;">
						<div class="container col-xs-12">
							<div class="box">
								<div class="box-header">
									<div class="col-12 centrar">
										<img id="loading_comedor_green_spot_procesadas" src="../../assets/img/loading.gif" style="display:none;">
										<div id="EspacioTabla_green_spot_procesadas" style="display:none;" class="col-md-12 col-xs-12">
											<table  id='TablaComedor_green_spot_procesadas' class='table table-bordered table-hover TablaResponsiva'>
												<thead>
													<tr class='table-header'>
														<th scope='col'>Id Conciliación</th>
														<th scope='col' style='display:none;'>No. Empleado</th>
														<th scope='col'>Total Platillos</th>
														<th scope='col'>Total Pagar</th>
														<th scope='col'>Fecha_Conciliado</th>
														<th scope='col'>Estatus</th>
														<th scope='col'>Acciones</th>
													</tr>
												</thead>
												<tbody id='ContenidoListados_green_spot_procesadas'>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
			</div>

		<!-- Modal ver primer detalle -->
		<div id="modal_detalles_primer" data-backdrop="static" data-keyboard="false" tabindex="-1" class="modal fade" role="dialog" ria-labelledby="largeModal" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<!-- Modal content-->
				<div class="modal-content">
					<div id="modal_header_detalles_conci" class="modal-header">
						<button type="button" class="close" data-dismiss="modal"><i id="cross_cerrar" class="fa fa-times" aria-hidden="true"></i></button>
						<h4 class="modal-title" id="titulo_modal_conciliado">Detalles</h4>
					</div>
					<div class="modal-body">
						<input type="hidden" id="numero_conciliacion" name="numero_conciliacion">
						<div class="panel panel-default">
							<div class="panel-body">
								<div class="row">
									<div id="filtro_pirmer_detalle" class="col-md-8 col-xs-12">
									</div>
								</div>
								<div class="row">
									<div class="col-xs-12 col-sm-12 col-md-12">
										<div style="text-align:right;" id="boton_descarga_excel_comedor_detalle_conciliados">
										</div>
									</div>
								</div>
							</div>
						</div>

						<div class="panel panel-default">
							<div class="panel-body">
								<!-- Aqui se cargaran las tablas con los detalles de los Platillos -->
								<div class="col-xs-12 col-sm-12 col-md-12 scroll_pedido_tabla_detalles" id="mostrar_tabla_conciliadas_detalles">
									
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<div class="d-flex flex-row-reverse">
							<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<!-- Modal ver detalles -->
		<div id="modal_detalles" data-backdrop="static" data-keyboard="false" tabindex="-1" class="modal fade" role="dialog" ria-labelledby="largeModal" aria-hidden="true">
			<div class="modal-dialog modal-lg">
				<!-- Modal content-->
				<div class="modal-content">
					<div id="modal_header_detalles" class="modal-header">
						<button type="button" class="close" data-dismiss="modal"><i id="cross_cerrar" class="fa fa-times" aria-hidden="true"></i></button>
						<h4 class="modal-title" id="titulo_modal">Detalles</h4>
					</div>
					<div class="modal-body">
						<div class="panel panel-default">
							<div class="panel-body">
								<!-- Aqui se cargaran las tablas con los detalles de los Platillos -->
								<div class="col-xs-12 col-sm-12 col-md-12 scroll_pedido_tabla_detalles" id="mostrar_tabla_detalles">
									
								</div>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<div class="d-flex flex-row-reverse" id="agregar_botones_modal">
						</div>
					</div>
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
<!-- <script src="../../dist/js/pages/dashboard.js"></script> -->
<!-- AdminLTE for demo purposes -->
<script src="../../dist/js/demo.js"></script>

<!-- Sweetalert -->
<script src="../../assets/js/sweetalert2.js"></script>

<script src="https://cdn.datatables.net/1.10.24/js/jquery.dataTables.min.js"></script>
   <!-- <script src="libraries/datatables/jquery.dataTables.min.js"></script>-->
<script src="../../libraries/datatables/dataTables.bootstrap.min.js"></script>

<script src="../../dist/jquery.table2excel.js"></script>
<script src="../../javascript/ListadoComedorProcesadas.js?t=<?=time()?>"></script>
<script type="text/javascript" src="../../libraries/webcamjs/webcam.min.js"></script>
</body>

<script>
	$(function() {
		$(".exportToExcel").click(function(e){
			var table = $(this).prev('.table2excel');
			if(table && table.length){
				var preserveColors = (table.hasClass('table2excel_with_colors') ? true : false);
				$(table).table2excel({
					exclude: ".noExl",
					name: "Excel Document Name",
					filename: "myFileName" + new Date().toISOString().replace(/[\-\:\.]/g, "") + ".xls",
					fileext: ".xls",
					exclude_img: true,
					exclude_links: true,
					exclude_inputs: true,
					preserveColors: preserveColors
				});
			}
		});
		
	});
</script>
</html>