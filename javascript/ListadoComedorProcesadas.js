var FechaHoy = "";
var FechaInicial = "";
var FechaFinal = "";
let fecha_completa = '';
let datos,
datos_green_spot,
datos_procesados,
datos_green_spot_procesados;
let suma_platillos = 0,
suma_platillos_gs = 0,
suma_platillos_coex = 0,
suma_platillos_gs_co = 0,
total_pagar_platillos_comida = 0,
total_pagar_platillos_desayuno = 0,
total_pagar_platillos_coco = 0,
total_pagar_platillos_gs_co = 0,
numero_empleado = 0,
id_conciliacion = 0,
numero_empleado_green_spot = 0,
num_orden,
bandera_descargar = 0;

let numero_empleado_global = 0;

$(document).ready(function(){	
	//BuscarEmpleadoLogeado();

	 /*
	 var Respuesta = Contraseña();
	 if(Respuesta == true){
	 */
		ObtenerFecha();
		window.location.hash="no-back-button";
		window.location.hash="Again-No-back-button";//esta linea es necesaria para chrome
		window.onhashchange=function(){window.location.hash="no-back-button";}
		cargar_plato_express();
		// var tabla ="<table  id='TablaComedor' class='table table-bordered table-hover TablaResponsiva'>";
		// 	tabla +="<thead class='table-header'>";
		// 	tabla +="<tr>"
		// 	tabla +="<th scope='col'>No. Empleado</th>"
		// 	tabla +="<th scope='col'>Empleado</th>"
		// 	tabla +="<th scope='col' >Tipo de Platillo</th>"
		// 	tabla +="<th scope='col'>No. Platillo</th>"
		// 	tabla +="<th scope='col'>Platillo</th>"
		// 	tabla +="<th scope='col'>Comentarios</th>"
		// 	tabla +="<th scope='col'>Ubicación</th>"
		// 	tabla +="<th scope='col'>FechaPedido</th>"
		// 	tabla +="<th scope='col' colspan='2'>Acciones</th>"
		// 	tabla +="</tr>";
		// 	tabla +="</thead>";
		// 	tabla +="<tbody id='ContenidoListados'>";
		// 	tabla += "</tbody>"
		// 	tabla +="</table>";
		// 	$('#EspacioTabla').append(tabla);
	/*
	 }else{
		 alert("La contraseña ingresada es incorrecta");
		 //location.reload();
		 window.location.replace('www.google.com'); 
	 }
	*/
	BuscarEmpleadoLogeadoSesion();
});

function ObtenerFecha(){
	var date = new Date();
	let dia = date.getDate(),
	mes = date.getMonth() + 1,
	year = date.getFullYear(),
	horas = date.getHours(),
	minutos = date.getMinutes(),
	segundos = date.getSeconds();
	fecha_completa =  year+'_'+mes+'_'+dia+'_'+horas+'_'+minutos+'_'+segundos;
	var currentDate = date.toISOString().substring(0,10);
	let fecha_actual,
	fecha_inicial,
	fecha_final,
	mes_actual = moment(date).format('MM'),
	mes_inicial,
	mes_final,
	dia_actual = moment(date).format('DD'),
	dia_inicial,
	dia_final,
	anio_actual = moment(date).format('YYYY'),
	fecha_actual_inicial,
	fecha_actual_final,
	nombre_dia_actual = moment(date).format('dddd'),
	nombre_mes_actual = moment(date).format('MMM');
	switch (nombre_mes_actual) {
		case 'Jan':
			switch (nombre_dia_actual) {
				case 'Monday':
					dia_inicial = dia_actual;
					dia_final = dia_actual == 31 ? Number(0)+Number(4) : dia_actual == 30 ? Number(0)+Number(3) : dia_actual == 29 ? Number(0)+Number(2) : dia_actual == 28 ? 
					Number(0)+Number(1) : Number(dia_actual)+Number(4);
					mes_inicial = mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : 
					dia_actual == 28 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Tuesday':
					dia_inicial = dia_actual == 1 ? 31 : dia_actual - 1;
					dia_final = dia_actual == 31 ? Number(0)+Number(3) : dia_actual == 30 ? Number(0)+Number(2) : dia_actual == 29 ? Number(0)+Number(1) : 
					Number(dia_actual)+Number(3);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : 
					mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Wednesday':
					dia_inicial = dia_actual == 1 ? 30 : dia_actual == 2 ? 31 : dia_actual - 2;
					dia_final = dia_actual == 31 ? Number(0)+Number(2) : dia_actual == 30 ? Number(0)+Number(1) : Number(dia_actual)+Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Thursday':
					dia_inicial = dia_actual == 1 ? 29 : dia_actual == 2 ? 30 : dia_actual == 3 ? 31 : dia_actual - 3;
					dia_final = dia_actual == 31 ? Number(0)+Number(1) : Number(dia_actual)+Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Friday':
					dia_inicial = dia_actual == 1 ? 28 : dia_actual == 2 ? 29 : dia_actual == 3 ? 30 : dia_actual == 4 ? 31 : dia_actual - 4;
					dia_final = dia_actual;
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Saturday':
					dia_inicial = dia_actual == 1 ? 27 : dia_actual == 2 ? 28 : dia_actual == 3 ? 29 : dia_actual == 4 ? 30 : dia_actual == 5 ? 31 : dia_actual - 5;
					dia_final = dia_actual == 1 ? 31 : Number(dia_actual)-Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Sunday':
					dia_inicial = dia_actual == 1 ? 26 : dia_actual == 2 ? 27 : dia_actual == 3 ? 28 : dia_actual == 4 ? 29 : dia_actual == 5 ? 30 : dia_actual == 6 ? 31 : 
					dia_actual - 6;
					dia_final = dia_actual == 1 ? 30 : dia_actual == 2 ? 31 : Number(dia_actual)-Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : 
					dia_actual == 6 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				default:
					Swal.fire( 
						'Formato de fecha erroneo',
						'',
						'warning'
					);
				break;
			}
		break;
		case 'Feb':
			switch (nombre_dia_actual) {
				case 'Monday':
					dia_inicial = dia_actual;
					if (((anio_actual % 4 == 0) && (anio_actual % 100 != 0 )) || (anio_actual % 400 == 0)) {
						dia_final = dia_actual == 29 ? Number(0)+Number(4) : dia_actual == 28 ? Number(0)+Number(3) : dia_actual == 27 ? Number(0)+Number(2) : dia_actual == 26 ? 
						Number(0)+Number(1) : Number(dia_actual)+Number(4);
						mes_inicial = mes_actual;
						mes_final = dia_actual == 29 ? Number(mes_actual)+Number(1) : dia_actual == 28 ? Number(mes_actual)+Number(1) : dia_actual == 27 ? 
						Number(mes_actual)+Number(1) : dia_actual == 26 ? Number(mes_actual)+Number(1) : mes_actual;
					}else{
						dia_final = dia_actual == 28 ? Number(0)+Number(4) : dia_actual == 27 ? Number(0)+Number(3) : dia_actual == 26 ? Number(0)+Number(2) : 
						dia_actual == 25 ? Number(0)+Number(1) : dia_actual == 28 ? Number(0)+Number(4) : Number(dia_actual)+Number(4);
						mes_inicial = mes_actual;
						mes_final = dia_actual == 28 ? Number(mes_actual)+Number(1) : mes_actual;
					}
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Tuesday':
					dia_inicial = dia_actual == 1 ? 31 : dia_actual - 1;
					if (((anio_actual % 4 == 0) && (anio_actual % 100 != 0 )) || (anio_actual % 400 == 0)) {
						dia_final = dia_actual == 29 ? Number(0)+Number(3) : dia_actual == 28 ? Number(0)+Number(2) : dia_actual == 27 ? Number(0)+Number(1) : 
						Number(dia_actual)+Number(3);
						mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
						mes_final = dia_actual == 29 ? Number(mes_actual)+Number(1) : dia_actual == 28 ? Number(mes_actual)+Number(1) : dia_actual == 27 ? 
						Number(mes_actual)+Number(1) : mes_actual;
					}else{
						dia_final = dia_actual == 28 ? Number(0)+Number(3) : dia_actual == 27 ? Number(0)+Number(2) : dia_actual == 26 ? Number(0)+Number(1) : 
						Number(dia_actual)+Number(4);
						mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
						mes_final = dia_actual == 28 ? Number(mes_actual)+Number(1) : dia_actual == 27 ? Number(mes_actual)+Number(1) : dia_actual == 26 ? 
						Number(mes_actual)+Number(1) : mes_actual;
					}
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Wednesday':
					dia_inicial = dia_actual == 1 ? 30 : dia_actual == 2 ? 31 : dia_actual - 2;
					if (((anio_actual % 4 == 0) && (anio_actual % 100 != 0 )) || (anio_actual % 400 == 0)) {
						dia_final = dia_actual == 29 ? Number(0)+Number(2) : dia_actual == 28 ? Number(0)+Number(1) : Number(dia_actual)+Number(2);
						mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
						mes_final = dia_actual == 29 ? Number(mes_actual)+Number(1) : dia_actual == 28 ? Number(mes_actual)+Number(1) : mes_actual;
					}else{
						dia_final = dia_actual == 28 ? Number(0)+Number(2) : dia_actual == 27 ? Number(0)+Number(1) : Number(dia_actual)+Number(4);
						mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
						mes_final = dia_actual == 28 ? Number(mes_actual)+Number(1) : dia_actual == 27 ? Number(mes_actual)+Number(1) : mes_actual;
					}
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Thursday':
					dia_inicial = dia_actual == 1 ? 29 : dia_actual == 2 ? 30 : dia_actual == 3 ? 31 : dia_actual - 3;
					if (((anio_actual % 4 == 0) && (anio_actual % 100 != 0 )) || (anio_actual % 400 == 0)) {
						dia_final = dia_actual == 29 ? Number(0)+Number(1) : Number(dia_actual)+Number(1);
						mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
						dia_actual == 3 ? Number(mes_actual)-Number(1) : mes_actual;
						mes_final = dia_actual == 29 ? Number(mes_actual)+Number(1) : mes_actual;
					}else{
						dia_final = dia_actual == 28 ? Number(0)+Number(1) : Number(dia_actual)+Number(1);
						mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
						dia_actual == 3 ? Number(mes_actual)-Number(1) : mes_actual;
						mes_final = dia_actual == 28 ? Number(mes_actual)+Number(1) : mes_actual;
					}
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Friday':
					dia_inicial = dia_actual == 1 ? 28 : dia_actual == 2 ? 29 : dia_actual == 3 ? 30 : dia_actual == 4 ? 31 : dia_actual - 4;
					if (((anio_actual % 4 == 0) && (anio_actual % 100 != 0 )) || (anio_actual % 400 == 0)) {
						dia_final = dia_actual;
						mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
						dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : mes_actual;
						mes_final = mes_actual;
					}else{
						dia_final = dia_actual == 28 ? Number(0)+Number(1) : Number(dia_actual)+Number(1);
						mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
						dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : mes_actual;
						mes_final = dia_actual == 28 ? Number(mes_actual)+Number(1) : mes_actual;
					}
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Saturday':
					dia_inicial = dia_actual == 1 ? 27 : dia_actual == 2 ? 28 : dia_actual == 3 ? 29 : dia_actual == 4 ? 30 : dia_actual == 5 ? 31 : dia_actual - 5;
					dia_final = dia_actual == 1 ? 31 : Number(dia_actual)-Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Sunday':
					dia_inicial = dia_actual == 1 ? 26 : dia_actual == 2 ? 27 : dia_actual == 3 ? 28 : dia_actual == 4 ? 29 : dia_actual == 5 ? 30 : dia_actual == 6 ? 31 : 
					dia_actual - 6;
					dia_final = dia_actual == 1 ? 30 : dia_actual == 2 ? 31 : Number(dia_actual) - Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : 
					dia_actual == 6 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual) - Number(1) : dia_actual == 2 ? Number(mes_actual) - Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
			
				default:
					Swal.fire( 
						'Formato de fecha erroneo',
						'',
						'warning'
					);
				break;
			}
		break;
		case 'Mar':
			switch (nombre_dia_actual) {
				case 'Monday':
					dia_inicial = dia_actual;
					dia_final = dia_actual == 31 ? Number(0)+Number(4) : dia_actual == 30 ? Number(0)+Number(3) : dia_actual == 29 ? Number(0)+Number(2) : dia_actual == 28 ? 
					Number(0)+Number(1) : Number(dia_actual)+Number(4);
					mes_inicial = mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : 
					dia_actual == 28 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Tuesday':
					if (((anio_actual % 4 == 0) && (anio_actual % 100 != 0 )) || (anio_actual % 400 == 0)) {
						dia_inicial = dia_actual == 1 ? 29 : dia_actual - 1;
					}else{
						dia_inicial = dia_actual == 1 ? 28 : dia_actual - 1;
					}
					dia_final = dia_actual == 31 ? Number(0)+Number(3) : dia_actual == 30 ? Number(0)+Number(2) : dia_actual == 29 ? Number(0)+Number(1) : 
					Number(dia_actual)+Number(3);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : 
					mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Wednesday':
					if (((anio_actual % 4 == 0) && (anio_actual % 100 != 0 )) || (anio_actual % 400 == 0)) {
						dia_inicial = dia_actual == 1 ? 28 : dia_actual == 2 ? 29 : dia_actual - 2;
					}else{
						dia_inicial = dia_actual == 1 ? 27 : dia_actual == 2 ? 28 : dia_actual - 2;
					}
					dia_final = dia_actual == 31 ? Number(0)+Number(2) : dia_actual == 30 ? Number(0)+Number(1) : Number(dia_actual)+Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Thursday':
					if (((anio_actual % 4 == 0) && (anio_actual % 100 != 0 )) || (anio_actual % 400 == 0)) {
						dia_inicial = dia_actual == 1 ? 27 : dia_actual == 2 ? 28 : dia_actual == 3 ? 29 : dia_actual - 3;
					}else{
						dia_inicial = dia_actual == 1 ? 26 : dia_actual == 2 ? 27 : dia_actual == 3 ? 28 : dia_actual - 3;
					}
					dia_final = dia_actual == 31 ? Number(0)+Number(1) : Number(dia_actual)+Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Friday':
					if (((anio_actual % 4 == 0) && (anio_actual % 100 != 0 )) || (anio_actual % 400 == 0)) {
						dia_inicial = dia_actual == 1 ? 26 : dia_actual == 2 ? 27 : dia_actual == 3 ? 28 : dia_actual == 4 ? 29 : dia_actual - 4;
					}else{
						dia_inicial = dia_actual == 1 ? 25 : dia_actual == 2 ? 26 : dia_actual == 3 ? 27 : dia_actual == 4 ? 28 : dia_actual - 4;
					}
					dia_final = dia_actual;
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Saturday':
					if (((anio_actual % 4 == 0) && (anio_actual % 100 != 0 )) || (anio_actual % 400 == 0)) {
						dia_inicial = dia_actual == 1 ? 25 : dia_actual == 2 ? 26 : dia_actual == 3 ? 27 : dia_actual == 4 ? 28 : dia_actual == 5 ? 29 : dia_actual - 5;
						dia_final = dia_actual == 1 ? 29 : Number(dia_actual)-Number(1);
					}else{
						dia_inicial = dia_actual == 1 ? 24 : dia_actual == 2 ? 25 : dia_actual == 3 ? 26 : dia_actual == 4 ? 27 : dia_actual == 5 ? 28 : dia_actual - 5;
						dia_final = dia_actual == 1 ? 28 : Number(dia_actual)-Number(1);
					}
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Sunday':
					if (((anio_actual % 4 == 0) && (anio_actual % 100 != 0 )) || (anio_actual % 400 == 0)) {
						dia_inicial = dia_actual == 1 ? 24 : dia_actual == 2 ? 25 : dia_actual == 3 ? 26 : dia_actual == 4 ? 27 : dia_actual == 5 ? 28 : dia_actual == 6 ? 29 : 
						dia_actual - 6;
						dia_final = dia_actual == 1 ? 28 : dia_actual == 2 ? 29 : Number(dia_actual)-Number(2);
					}else{
						dia_inicial = dia_actual == 1 ? 23 : dia_actual == 2 ? 24 : dia_actual == 3 ? 25 : dia_actual == 4 ? 26 : dia_actual == 5 ? 27 : dia_actual == 6 ? 28 : 
						dia_actual - 6;
						dia_final = dia_actual == 1 ? 27 : dia_actual == 2 ? 28 : Number(dia_actual)-Number(2);
					}
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : 
					dia_actual == 6 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
			
				default:
					Swal.fire( 
						'Formato de fecha erroneo',
						'',
						'warning'
					);
				break;
			}
		break;
		case 'Apr':
			switch (nombre_dia_actual) {
				case 'Monday':
					dia_inicial = dia_actual;
					dia_final = dia_actual == 30 ? Number(0)+Number(4) : dia_actual == 29 ? Number(0)+Number(3) : dia_actual == 28 ? Number(0)+Number(2) : dia_actual == 27 ? 
					Number(0)+Number(1) : Number(dia_actual)+Number(4);
					mes_inicial = mes_actual;
					mes_final = dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : dia_actual == 28 ? Number(mes_actual)+Number(1) : 
					dia_actual == 27 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Tuesday':
					dia_inicial = dia_actual == 1 ? 31 : dia_actual - 1;
					dia_final = dia_actual == 30 ? Number(0)+Number(3) : dia_actual == 29 ? Number(0)+Number(2) : dia_actual == 28 ? Number(0)+Number(1) : 
					Number(dia_actual)+Number(3);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : dia_actual == 28 ? Number(mes_actual)+Number(1) : 
					mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Wednesday':
					dia_inicial = dia_actual == 1 ? 30 : dia_actual == 2 ? 31 : dia_actual - 2;
					dia_final = dia_actual == 30 ? Number(0)+Number(2) : dia_actual == 29 ? Number(0)+Number(1) : Number(dia_actual)+Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Thursday':
					dia_inicial = dia_actual == 1 ? 29 : dia_actual == 2 ? 30 : dia_actual == 3 ? 31 : dia_actual - 3;
					dia_final = dia_actual == 30 ? Number(0)+Number(1) : Number(dia_actual)+Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 30 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Friday':
					dia_inicial = dia_actual == 1 ? 28 : dia_actual == 2 ? 29 : dia_actual == 3 ? 30 : dia_actual == 4 ? 31 : dia_actual - 4;
					dia_final = dia_actual;
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Saturday':
					dia_inicial = dia_actual == 1 ? 27 : dia_actual == 2 ? 28 : dia_actual == 3 ? 29 : dia_actual == 4 ? 30 : dia_actual == 5 ? 31 : dia_actual - 5;
					dia_final = dia_actual == 1 ? 31 : Number(dia_actual)-Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Sunday':
					dia_inicial = dia_actual == 1 ? 26 : dia_actual == 2 ? 27 : dia_actual == 3 ? 28 : dia_actual == 4 ? 29 : dia_actual == 5 ? 30 : dia_actual == 6 ? 31 : 
					dia_actual - 6;
					dia_final = dia_actual == 1 ? 30 : dia_actual == 2 ? 31 : Number(dia_actual)-Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : 
					dia_actual == 6 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
			
				default:
					Swal.fire( 
						'Formato de fecha erroneo',
						'',
						'warning'
					);
				break;
			}
		break;
		case 'May':
			switch (nombre_dia_actual) {
				case 'Monday':
					dia_inicial = dia_actual;
					dia_final = dia_actual == 31 ? Number(0)+Number(4) : dia_actual == 30 ? Number(0)+Number(3) : dia_actual == 29 ? Number(0)+Number(2) : dia_actual == 28 ? 
					Number(0)+Number(1) : Number(dia_actual)+Number(4);
					mes_inicial = mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : 
					dia_actual == 28 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Tuesday':
					dia_inicial = dia_actual == 1 ? 30 : dia_actual - 1;
					dia_final = dia_actual == 31 ? Number(0)+Number(3) : dia_actual == 30 ? Number(0)+Number(2) : dia_actual == 29 ? Number(0)+Number(1) : 
					Number(dia_actual)+Number(3);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : 
					mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Wednesday':
					dia_inicial = dia_actual == 1 ? 29 : dia_actual == 2 ? 30 : dia_actual - 2;
					dia_final = dia_actual == 31 ? Number(0)+Number(2) : dia_actual == 30 ? Number(0)+Number(1) : Number(dia_actual)+Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Thursday':
					dia_inicial = dia_actual == 1 ? 28 : dia_actual == 2 ? 29 : dia_actual == 3 ? 30 : dia_actual - 3;
					dia_final = dia_actual == 31 ? Number(0)+Number(1) : Number(dia_actual)+Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Friday':
					dia_inicial = dia_actual == 1 ? 27 : dia_actual == 2 ? 28 : dia_actual == 3 ? 29 : dia_actual == 4 ? 30 : dia_actual - 4;
					dia_final = dia_actual;
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Saturday':
					dia_inicial = dia_actual == 1 ? 26 : dia_actual == 2 ? 27 : dia_actual == 3 ? 28 : dia_actual == 4 ? 29 : dia_actual == 5 ? 30 : dia_actual - 5;
					dia_final = dia_actual == 1 ? 31 : Number(dia_actual)-Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Sunday':
					dia_inicial = dia_actual == 1 ? 25 : dia_actual == 2 ? 26 : dia_actual == 3 ? 27 : dia_actual == 4 ? 28 : dia_actual == 5 ? 29 : dia_actual == 6 ? 30 : 
					dia_actual - 6;
					dia_final = dia_actual == 1 ? 30 : dia_actual == 2 ? 31 : Number(dia_actual)-Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : 
					dia_actual == 6 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
			
				default:
					Swal.fire( 
						'Formato de fecha erroneo',
						'',
						'warning'
					);
				break;
			}
		break;
		case 'Jun':
			switch (nombre_dia_actual) {
				case 'Monday':
					dia_inicial = dia_actual;
					dia_final = dia_actual == 30 ? Number(0)+Number(4) : dia_actual == 29 ? Number(0)+Number(3) : dia_actual == 28 ? Number(0)+Number(2) : dia_actual == 27 ? 
					Number(0)+Number(1) : Number(dia_actual)+Number(4);
					mes_inicial = mes_actual;
					mes_final = dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : dia_actual == 28 ? Number(mes_actual)+Number(1) : 
					dia_actual == 27 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Tuesday':
					dia_inicial = dia_actual == 1 ? 31 : dia_actual - 1;
					dia_final = dia_actual == 30 ? Number(0)+Number(3) : dia_actual == 29 ? Number(0)+Number(2) : dia_actual == 28 ? Number(0)+Number(1) : 
					Number(dia_actual)+Number(3);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : dia_actual == 28 ? Number(mes_actual)+Number(1) : 
					mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Wednesday':
					dia_inicial = dia_actual == 1 ? 30 : dia_actual == 2 ? 31 : dia_actual - 2;
					dia_final = dia_actual == 30 ? Number(0)+Number(2) : dia_actual == 29 ? Number(0)+Number(1) : Number(dia_actual)+Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Thursday':
					dia_inicial = dia_actual == 1 ? 29 : dia_actual == 2 ? 30 : dia_actual == 3 ? 31 : dia_actual - 3;
					dia_final = dia_actual == 30 ? Number(0)+Number(1) : Number(dia_actual)+Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 30 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Friday':
					dia_inicial = dia_actual == 1 ? 28 : dia_actual == 2 ? 29 : dia_actual == 3 ? 30 : dia_actual == 4 ? 31 : dia_actual - 4;
					dia_final = dia_actual;
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Saturday':
					dia_inicial = dia_actual == 1 ? 27 : dia_actual == 2 ? 28 : dia_actual == 3 ? 29 : dia_actual == 4 ? 30 : dia_actual == 5 ? 31 : dia_actual - 5;
					dia_final = dia_actual == 1 ? 30 : Number(dia_actual)-Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Sunday':
					dia_inicial = dia_actual == 1 ? 26 : dia_actual == 2 ? 27 : dia_actual == 3 ? 28 : dia_actual == 4 ? 29 : dia_actual == 5 ? 30 : dia_actual == 6 ? 31 : 
					dia_actual - 6;
					dia_final = dia_actual == 1 ? 29 : dia_actual == 2 ? 30 : Number(dia_actual)-Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : 
					dia_actual == 6 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
			
				default:
					Swal.fire( 
						'Formato de fecha erroneo',
						'',
						'warning'
					);
				break;
			}
		break;
		case 'Jul':
			switch (nombre_dia_actual) {
				case 'Monday':
					dia_inicial = dia_actual;
					dia_final = dia_actual == 31 ? Number(0)+Number(4) : dia_actual == 30 ? Number(0)+Number(3) : dia_actual == 29 ? Number(0)+Number(2) : dia_actual == 28 ? 
					Number(0)+Number(1) : Number(dia_actual)+Number(4);
					mes_inicial = mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : 
					dia_actual == 28 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Tuesday':
					dia_inicial = dia_actual == 1 ? 30 : dia_actual - 1;
					dia_final = dia_actual == 31 ? Number(0)+Number(3) : dia_actual == 30 ? Number(0)+Number(2) : dia_actual == 29 ? Number(0)+Number(1) : 
					Number(dia_actual)+Number(3);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : 
					mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Wednesday':
					dia_inicial = dia_actual == 1 ? 29 : dia_actual == 2 ? 30 : dia_actual - 2;
					dia_final = dia_actual == 31 ? Number(0)+Number(2) : dia_actual == 30 ? Number(0)+Number(1) : Number(dia_actual)+Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Thursday':
					dia_inicial = dia_actual == 1 ? 28 : dia_actual == 2 ? 29 : dia_actual == 3 ? 30 : dia_actual - 3;
					dia_final = dia_actual == 31 ? Number(0)+Number(1) : Number(dia_actual)+Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Friday':
					dia_inicial = dia_actual == 1 ? 27 : dia_actual == 2 ? 28 : dia_actual == 3 ? 29 : dia_actual == 4 ? 30 : dia_actual - 4;
					dia_final = dia_actual;
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Saturday':
					dia_inicial = dia_actual == 1 ? 26 : dia_actual == 2 ? 27 : dia_actual == 3 ? 28 : dia_actual == 4 ? 29 : dia_actual == 5 ? 30 : dia_actual - 5;
					dia_final = dia_actual == 1 ? 30 : Number(dia_actual)-Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Sunday':
					dia_inicial = dia_actual == 1 ? 25 : dia_actual == 2 ? 26 : dia_actual == 3 ? 27 : dia_actual == 4 ? 28 : dia_actual == 5 ? 29 : dia_actual == 6 ? 30 : 
					dia_actual - 6;
					dia_final = dia_actual == 1 ? 29 : dia_actual == 2 ? 30 : Number(dia_actual)-Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : 
					dia_actual == 6 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
			
				default:
					Swal.fire( 
						'Formato de fecha erroneo',
						'',
						'warning'
					);
				break;
			}
		break;
		case 'Aug':
			switch (nombre_dia_actual) {
				case 'Monday':
					dia_inicial = dia_actual;
					dia_final = dia_actual == 31 ? Number(0)+Number(4) : dia_actual == 30 ? Number(0)+Number(3) : dia_actual == 29 ? Number(0)+Number(2) : dia_actual == 28 ? 
					Number(0)+Number(1) : Number(dia_actual)+Number(4);
					mes_inicial = mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : 
					dia_actual == 28 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Tuesday':
					dia_inicial = dia_actual == 1 ? 31 : dia_actual - 1;
					dia_final = dia_actual == 31 ? Number(0)+Number(3) : dia_actual == 30 ? Number(0)+Number(2) : dia_actual == 29 ? Number(0)+Number(1) : 
					Number(dia_actual)+Number(3);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : 
					mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Wednesday':
					dia_inicial = dia_actual == 1 ? 30 : dia_actual == 2 ? 31 : dia_actual - 2;
					dia_final = dia_actual == 31 ? Number(0)+Number(2) : dia_actual == 30 ? Number(0)+Number(1) : Number(dia_actual)+Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Thursday':
					dia_inicial = dia_actual == 1 ? 29 : dia_actual == 2 ? 30 : dia_actual == 3 ? 31 : dia_actual - 3;
					dia_final = dia_actual == 31 ? Number(0)+Number(1) : Number(dia_actual)+Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Friday':
					dia_inicial = dia_actual == 1 ? 28 : dia_actual == 2 ? 29 : dia_actual == 3 ? 30 : dia_actual == 4 ? 31 : dia_actual - 4;
					dia_final = dia_actual;
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Saturday':
					dia_inicial = dia_actual == 1 ? 27 : dia_actual == 2 ? 28 : dia_actual == 3 ? 29 : dia_actual == 4 ? 30 : dia_actual == 5 ? 31 : dia_actual - 5;
					dia_final = dia_actual == 1 ? 31 : Number(dia_actual)-Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Sunday':
					dia_inicial = dia_actual == 1 ? 26 : dia_actual == 2 ? 27 : dia_actual == 3 ? 28 : dia_actual == 4 ? 29 : dia_actual == 5 ? 30 : dia_actual == 6 ? 31 : 
					dia_actual - 6;
					dia_final = dia_actual == 1 ? 30 : dia_actual == 2 ? 31 : Number(dia_actual)-Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : 
					dia_actual == 6 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
			
				default:
					Swal.fire( 
						'Formato de fecha erroneo',
						'',
						'warning'
					);
				break;
			}
		break;
		case 'Sep':
			switch (nombre_dia_actual) {
				case 'Monday':
					dia_inicial = dia_actual;
					dia_final = dia_actual == 30 ? Number(0)+Number(4) : dia_actual == 29 ? Number(0)+Number(3) : dia_actual == 28 ? Number(0)+Number(2) : dia_actual == 27 ? 
					Number(0)+Number(1) : Number(dia_actual)+Number(4);
					mes_inicial = mes_actual;
					mes_final = dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : dia_actual == 28 ? Number(mes_actual)+Number(1) : 
					dia_actual == 27 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Tuesday':
					dia_inicial = dia_actual == 1 ? 31 : dia_actual - 1;
					dia_final = dia_actual == 30 ? Number(0)+Number(3) : dia_actual == 29 ? Number(0)+Number(2) : dia_actual == 28 ? Number(0)+Number(1) : 
					Number(dia_actual)+Number(3);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : dia_actual == 28 ? Number(mes_actual)+Number(1) : 
					mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Wednesday':
					dia_inicial = dia_actual == 1 ? 30 : dia_actual == 2 ? 31 : dia_actual - 2;
					dia_final = dia_actual == 30 ? Number(0)+Number(2) : dia_actual == 29 ? Number(0)+Number(1) : Number(dia_actual)+Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Thursday':
					dia_inicial = dia_actual == 1 ? 29 : dia_actual == 2 ? 30 : dia_actual == 3 ? 31 : dia_actual - 3;
					dia_final = dia_actual == 30 ? Number(0)+Number(1) : Number(dia_actual)+Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 30 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Friday':
					dia_inicial = dia_actual == 1 ? 28 : dia_actual == 2 ? 29 : dia_actual == 3 ? 30 : dia_actual == 4 ? 31 : dia_actual - 4;
					dia_final = dia_actual;
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Saturday':
					dia_inicial = dia_actual == 1 ? 27 : dia_actual == 2 ? 28 : dia_actual == 3 ? 29 : dia_actual == 4 ? 30 : dia_actual == 5 ? 31 : dia_actual - 5;
					dia_final = dia_actual == 1 ? 30 : Number(dia_actual)-Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Sunday':
					dia_inicial = dia_actual == 1 ? 26 : dia_actual == 2 ? 27 : dia_actual == 3 ? 28 : dia_actual == 4 ? 29 : dia_actual == 5 ? 30 : dia_actual == 6 ? 31 : 
					dia_actual - 6;
					dia_final = dia_actual == 1 ? 29 : dia_actual == 2 ? 30 : Number(dia_actual)-Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : 
					dia_actual == 6 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
			
				default:
					Swal.fire( 
						'Formato de fecha erroneo',
						'',
						'warning'
					);
				break;
			}
		break;
		case 'Oct':
			switch (nombre_dia_actual) {
				case 'Monday':
					dia_inicial = dia_actual;
					dia_final = dia_actual == 31 ? Number(0)+Number(4) : dia_actual == 30 ? Number(0)+Number(3) : dia_actual == 29 ? Number(0)+Number(2) : dia_actual == 28 ? 
					Number(0)+Number(1) : Number(dia_actual)+Number(4);
					mes_inicial = mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : 
					dia_actual == 28 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Tuesday':
					dia_inicial = dia_actual == 1 ? 30 : dia_actual - 1;
					dia_final = dia_actual == 31 ? Number(0)+Number(3) : dia_actual == 30 ? Number(0)+Number(2) : dia_actual == 29 ? Number(0)+Number(1) : 
					Number(dia_actual)+Number(3);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : 
					mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Wednesday':
					dia_inicial = dia_actual == 1 ? 29 : dia_actual == 2 ? 30 : dia_actual - 2;
					dia_final = dia_actual == 31 ? Number(0)+Number(2) : dia_actual == 30 ? Number(0)+Number(1) : Number(dia_actual)+Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Thursday':
					dia_inicial = dia_actual == 1 ? 28 : dia_actual == 2 ? 29 : dia_actual == 3 ? 30 : dia_actual - 3;
					dia_final = dia_actual == 31 ? Number(0)+Number(1) : Number(dia_actual)+Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Friday':
					dia_inicial = dia_actual == 1 ? 27 : dia_actual == 2 ? 28 : dia_actual == 3 ? 29 : dia_actual == 4 ? 30 : dia_actual - 4;
					dia_final = dia_actual;
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Saturday':
					dia_inicial = dia_actual == 1 ? 26 : dia_actual == 2 ? 27 : dia_actual == 3 ? 28 : dia_actual == 4 ? 29 : dia_actual == 5 ? 30 : dia_actual - 5;
					dia_final = dia_actual == 1 ? 30 : Number(dia_actual)-Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Sunday':
					dia_inicial = dia_actual == 1 ? 25 : dia_actual == 2 ? 26 : dia_actual == 3 ? 27 : dia_actual == 4 ? 28 : dia_actual == 5 ? 29 : dia_actual == 6 ? 30 : 
					dia_actual - 6;
					dia_final = dia_actual == 1 ? 30 : dia_actual == 2 ? 31 : Number(dia_actual)-Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : 
					dia_actual == 6 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
			
				default:
					Swal.fire( 
						'Formato de fecha erroneo',
						'',
						'warning'
					);
				break;
			}
		break;
		case 'Nov':
			switch (nombre_dia_actual) {
				case 'Monday':
					dia_inicial = dia_actual;
					dia_final = dia_actual == 30 ? Number(0)+Number(4) : Number(dia_actual)+Number(4);
					mes_inicial = mes_actual;
					mes_final = dia_actual == 30 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Tuesday':
					dia_inicial = dia_actual == 1 ? 31 : dia_actual - 1;
					dia_final = dia_actual == 30 ? Number(0)+Number(3) : dia_actual == 29 ? Number(0)+Number(2) : dia_actual == 28 ? Number(0)+Number(1) : 
					Number(dia_actual)+Number(3);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : dia_actual == 28 ? Number(mes_actual)+Number(1) : 
					mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Wednesday':
					dia_inicial = dia_actual == 1 ? 30 : dia_actual == 2 ? 31 : dia_actual - 2;
					dia_final = dia_actual == 29 ? Number(0)+Number(1) : dia_actual == 30 ? Number(0)+Number(2) : Number(dia_actual)+Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 29 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Thursday':
					dia_inicial = dia_actual == 1 ? 29 : dia_actual == 2 ? 30 : dia_actual == 3 ? 31 : dia_actual - 3;
					dia_final = dia_actual == 30 ? Number(0)+Number(1) : Number(dia_actual)+Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : dia_actual == 3 ? 
					Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 30 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Friday':
					dia_inicial = dia_actual == 1 ? 28 : dia_actual == 2 ? 29 : dia_actual == 3 ? 30 : dia_actual == 4 ? 31 : dia_actual - 4;
					dia_final = dia_actual;
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : dia_actual == 3 ? 
					Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Saturday':
					dia_inicial = dia_actual == 1 ? 27 : dia_actual == 2 ? 28 : dia_actual == 3 ? 29 : dia_actual == 4 ? 30 : dia_actual == 5 ? 31 : dia_actual - 5;
					dia_final = dia_actual == 1 ? 31 : Number(dia_actual)-Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : dia_actual == 3 ? 
					Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Sunday':
					dia_inicial = dia_actual == 1 ? 26 : dia_actual == 2 ? 27 : dia_actual == 3 ? 28 : dia_actual == 4 ? 29 : dia_actual == 5 ? 30 : dia_actual == 6 ? 31 : 
					dia_actual - 6;
					dia_final = dia_actual == 1 ? 30 : dia_actual == 2 ? 31 : dia_actual - 2;
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : dia_actual == 3 ? 
					Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : 
					dia_actual == 6 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
			
				default:
					Swal.fire( 
						'Formato de fecha erroneo',
						'',
						'warning'
					);
				break;
			}
		break;
		case 'Dec':
			switch (nombre_dia_actual) {
				case 'Monday':
					dia_inicial = dia_actual;
					dia_final = dia_actual == 31 ? Number(0)+Number(4) : dia_actual == 30 ? Number(0)+Number(3) : dia_actual == 29 ? Number(0)+Number(2) : dia_actual == 28 ? 
					Number(0)+Number(1) : Number(dia_actual)+Number(4);
					mes_inicial = mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : 
					dia_actual == 28 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Tuesday':
					dia_inicial = dia_actual == 1 ? 30 : dia_actual - 1;
					dia_final = dia_actual == 31 ? Number(0)+Number(3) : dia_actual == 30 ? Number(0)+Number(2) : dia_actual == 29 ? Number(0)+Number(1) : 
					Number(dia_actual)+Number(3);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : dia_actual == 29 ? Number(mes_actual)+Number(1) : 
					mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Wednesday':
					dia_inicial = dia_actual == 1 ? 29 : dia_actual == 2 ? 30 : dia_actual - 2;
					dia_final = dia_actual == 31 ? Number(0)+Number(2) : dia_actual == 30 ? Number(0)+Number(1) : Number(dia_actual)+Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : dia_actual == 30 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Thursday':
					dia_inicial = dia_actual == 1 ? 28 : dia_actual == 2 ? 29 : dia_actual == 3 ? 30 : dia_actual - 3;
					dia_final = dia_actual == 31 ? Number(0)+Number(1) : Number(dia_actual)+Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 31 ? Number(mes_actual)+Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Friday':
					dia_inicial = dia_actual == 1 ? 27 : dia_actual == 2 ? 28 : dia_actual == 3 ? 29 : dia_actual == 4 ? 30 : dia_actual - 4;
					dia_final = dia_actual;
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Saturday':
					dia_inicial = dia_actual == 1 ? 26 : dia_actual == 2 ? 27 : dia_actual == 3 ? 28 : dia_actual == 4 ? 29 : dia_actual == 5 ? 30 : dia_actual - 5;
					dia_final = dia_actual == 1 ? 31 : Number(dia_actual)-Number(1);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Sunday':
					dia_inicial = dia_actual == 1 ? 25 : dia_actual == 2 ? 26 : dia_actual == 3 ? 27 : dia_actual == 4 ? 28 : dia_actual == 5 ? 29 : dia_actual == 6 ? 30 : 
					dia_actual - 6;
					dia_final = dia_actual == 1 ? 30 : dia_actual == 2 ? 31 : Number(dia_actual)-Number(2);
					mes_inicial = dia_actual == 1 ? Number(mes_actual)-Number(1) :  dia_actual == 2 ? Number(mes_actual)-Number(1) : 
					dia_actual == 3 ? Number(mes_actual)-Number(1) : dia_actual == 4 ? Number(mes_actual)-Number(1) : dia_actual == 5 ? Number(mes_actual)-Number(1) : 
					dia_actual == 6 ? Number(mes_actual)-Number(1) : mes_actual;
					mes_final = dia_actual == 1 ? Number(mes_actual)-Number(1) : dia_actual == 2 ? Number(mes_actual)-Number(1) : mes_actual;
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
			
				default:
					Swal.fire( 
						'Formato de fecha erroneo',
						'',
						'warning'
					);
				break;
			}
		break;
		default:
			Swal.fire( 
				'Formato de fecha erroneo',
				'',
				'warning'
			);
		break;
	}
}

function CerrarSesion(){
	$.ajax({
		type: "POST",
		//async: false,
		data: {
			param: 7
		},
		
		url: "../../utileria.php", 
		dataType: 'JSON',
		success: function(data) {
			$('.cargando').hide(); // Oculta la imagen de cargando 
			if(data.length){
				window.location='../../index.php';
			}
		}
	});
	
}

function BuscarEmpleadoLogeadoSesion(){
	var fechaActualL = new Date(); //Fecha actual
	var fechaActual2 = moment(fechaActualL).format("YYYY-MM-DD");
	$("#txtFechaPedido").val(fechaActual2);
	var empleado = $("#txtNumEmpleado").val()
	if(empleado.replace(/\s/g,"") != ""){
		$.ajax({
            type: "POST",
            data: {
                param: 1,
				empleado: empleado 
            },
            url: "../../utileria.php",
            dataType: 'JSON',
             success: function(data) {
				if(data.length){
					for(i=0;i<data.length;i++){
						var FechaAr =  "Fecha: "+ fechaActual2; 
						$("#NombreCont2").text(data[i]['Nombre']);
						$("#NombreCont").text(data[i]['Nombre']);
						$("#Fecha2").text(FechaAr);
						$("#txtNombreEmpleadoLogeado").val(data[i]['Nombre']);
					}
				}
				
			}
		});
	
	}else{
		Swal.fire( 
			'Favor de Agregar un numero de empleado.',
			'',
			'error'
		);
		CerrarSesion();
	}
}

function cargar_plato_express() {
	if ($("#plato_express_li").hasClass("active")) {
		MostrarInforme()
	}
}

function Finalizar_Conciliadas(){
	let datos_procesados2 = JSON.parse(JSON.stringify(datos_procesados));
	$("#boton_descarga_excel_green").hide();
	$("#boton_descarga_excel_comedor").hide();
	$("#boton_descarga_excel_green_conciliados").hide();
	$("#boton_descarga_excel_comedor_conciliados").hide();
	$("#filtros_plato_express").hide();
	$("#filtros_green_spot").hide();
	$("#filtros_plato_express_conciliados").hide();
	$("#filtros_green_spot_procesadas").hide();
	$("#EspacioTabla_plato_express_conciliados").hide();
	$("#div_tabla_plato_express_conciliados").show();
	$("#loading_comedor_conciliados").show();
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: {"param":21, "datos":datos_procesados2},
		success: function(result) { 
			data = JSON.parse(result);
			if (data.estatus == "success") {
				$("#loading_comedor_conciliados").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_green_spot_procesadas").hide();
				$("#filtros_plato_express_conciliados").show();
				$("#boton_descarga_excel_comedor_conciliados").show();
				$("#EspacioTabla_plato_express_conciliados").show();
				$("#ContenidoListados_plato_express_conciliados").find("tr").remove();
				MostrarInforme_plato_express_conciliados();
			}else if (data.estatus == "error_fecha") {
				$("#loading_comedor_conciliados").hide();
				$("#EspacioTabla_plato_express_conciliados").hide();
				$("#div_tabla_plato_express_conciliados").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'info'
				);
			}else{
				$("#loading_comedor_conciliados").hide();
				$("#EspacioTabla_plato_express_conciliados").hide();
				$("#div_tabla_plato_express_conciliados").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'error'
				);
			}
		}
	});
}

function Finalizar_Especial_Conciliadas(){
	let datos_green_spot_procesados2 = JSON.parse(JSON.stringify(datos_green_spot_procesados));
	$("#EspacioTabla_green_spot_procesadas").hide();
	$("#boton_descarga_excel_green").hide();
	$("#boton_descarga_excel_comedor").hide();
	$("#boton_descarga_excel_green_procesadas").hide();
	$("#boton_descarga_excel_comedor_conciliados").hide();
	$("#filtros_plato_express").hide();
	$("#filtros_green_spot").hide();
	$("#filtros_plato_express_conciliados").hide();
	$("#filtros_green_spot_procesadas").hide();
	$("#div_tabla_green_spot_procesadas").show();
	$("#loading_comedor_green_spot_procesadas").show();
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: {"param":21, "datos":datos_green_spot_procesados2},
		success: function(result) { 
			data = JSON.parse(result);
			if (data.estatus == "success") {
				MostrarInforme_green_spot_conciliados();
			}else if (data.estatus == "error_fecha") {
				$("#loading_comedor_green_spot_procesadas").hide();
				$("#EspacioTabla_green_spot_procesadas").hide();
				$("#div_tabla_green_spot_procesadas").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'info'
				);
			}else{
				$("#loading_comedor_green_spot_procesadas").hide();
				$("#EspacioTabla_green_spot_procesadas").hide();
				$("#div_tabla_green_spot_procesadas").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'error'
				);
			}
		}
	});
}

$("#buscar_procesados").click(function(e){
	let opcion = $("#opcion").val();
	$("#txtNumeroEmpleado_plato_express").val('');
	$("#txtNumeroEmpleado_green_spot").val('');
	$("#txtNumeroEmpleado_plato_express_conciliacion").val('');
	$("#txtNumeroEmpleado_plato_green_spot_procesadas").val('');
	$("#txtNumeroConciliacion_plato_express_conciliacion").val('');
	$("#txtNumeroEmpleado_plato_especial_conciliados").val('');
	switch (opcion) {
		case '1':
			MostrarInforme();
		break;

		case '2':
			MostrarInforme_green_spot();
		break;

		case '3':
			MostrarInforme_plato_express_conciliados();
		break;

		case '4':
			MostrarInforme_green_spot_conciliados();
		break;
	
		default:
			Swal.fire( 
				'Ops ocurrió un problema',
				'',
				'info'
			);
		break;
	}
});

$("#plato_express_li").click(function(e){
	$("#opcion").val(1);
	MostrarInforme();
});

$("#plato_green_spot_li").click(function(e){
	$("#opcion").val(2);
	MostrarInforme_green_spot();
});

$("#plato_express_li_conciliados").click(function(e){
	$("#opcion").val(3);
	MostrarInforme_plato_express_conciliados();
});

$("#plato_green_spot_li_procesadas").click(function(e){
	$("#opcion").val(4);
	MostrarInforme_green_spot_conciliados();
});

function boton_ver_detalles_comida(numero_emp){
	$("#mostrar_tabla_detalles").html('');
	$("#agregar_botones_modal").html('');
	datos = '';
	let formData = new FormData(document.getElementById("form_comedor_conciliados")),
	numero_empleado = numero_emp;
  	formData.append("dato", "valor");
	formData.append("param", 13);
	formData.append("numero_empleado", numero_empleado);
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: formData,
		dataType: "html",
		cache: false, 	  	
		contentType: false,
		processData: false,
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus == "success") {
				datos = data.data;
				let nombre_ubicacion = '';
				let tabla_detalle_comida = `
				<table  id='TablaDetallesComida' class='table table-bordered table-hover TablaResponsiva'>
					<thead>
						<tr class='table-header'>
							<th scope='col'>No. Orden</th>
							<th scope='col'>No. Empleado</th>
							<th scope='col'>Empleado</th>
							<th scope='col'>Tipo de Empleado</th>
							<th scope='col'>No. Platillos</th>
							<th scope='col'>Precio</th>
							<th scope='col'>Total</th>
							<th scope='col'>Ubicación</th>
							<th scope='col'>FechaPedido</th>
						</tr>
					</thead>
					<tbody id='ContenidoDetallesComida'>
				`;
				for(let i = 0; i < datos.length; i++){
					let tipo_empleado = '';
					tipo_empleado = datos[i].Tipo_Empleado == 1 ? tipo_empleado = 'Sindicalizado' : datos[i].Tipo_Empleado == 2 ? tipo_empleado = 'Administrativo' : '';
					tabla_detalle_comida += `
					<tr>
						<td  data-label= 'No. Orden'>${datos[i].IdPedido}</td>
						<td  data-label= 'No. Empleado'>${datos[i].NoEmpleado}</td>
						<td data-label= 'Empleado'>${datos[i].NombreEmpleado}</td>
						<td data-label= 'Tipo Empleado'>${tipo_empleado}</td>
						<td data-label= 'No. Platillos'>${datos[i].NoPlatillo}</td>
						<td data-label= 'Precio'>${datos[i].Precio}</td>
						<td data-label= 'Total'>${datos[i].Total}</td>	
						<td data-label= 'Ubicación'>
						${ nombre_ubicacion = datos[i]['Ubicacion'] == 1 ? 'Torre TOP' : datos[i]['Ubicacion'] == 2 ? 'Apodaca' : datos[i]['Ubicacion'] == 3 ? 'Cienega' : ''}	
						</td>
						<td data-label= 'FechaPedido'>${datos[i].FechaPedido}</td>
					</tr>`;
				}

				tabla_detalle_comida += `</tbody>
				</table>`;
				$("#titulo_modal").html('Detalles Comida');
				$("#mostrar_tabla_detalles").html(tabla_detalle_comida);
				$("#agregar_botones_modal").append(`
					<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				`);
			}else{
				Swal.fire('No hay Registros', "","info");
			}
		}
	});
}

function boton_ver_detalles_desayunos(numero_emp){
	$("#mostrar_tabla_detalles").html('');
	$("#agregar_botones_modal").html('');
	datos_green_spot = '';
	let formData = new FormData(document.getElementById("form_comedor_conciliados")),
	numero_empleado = numero_emp;
  	formData.append("dato", "valor");
	formData.append("param", 14);
	formData.append("numero_empleado", numero_empleado);
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: formData,
		dataType: "html",
		cache: false, 	  	
		contentType: false,
		processData: false,
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus == "success") {
				datos_green_spot = data.data;
				let nombre_ubicacion = '';
				let tabla_detalle_desayuno = `
				<table  id='tabla_detalles_desayuno' class='table table-bordered table-hover TablaResponsiva'>
					<thead>
						<tr class='table-header'>
							<th scope='col'>No. Orden</th>
							<th scope='col'>No. Empleado</th>
							<th scope='col'>Empleado</th>
							<th scope='col'>Tipo de Empleado</th>
							<th scope='col'>No. Platillos</th>
							<th scope='col'>Platillo</th>
							<th scope='col'>Precio</th>
							<th scope='col'>Total</th>
							<th scope='col'>Ubicación</th>
							<th scope='col'>FechaPedido</th>
						</tr>
					</thead>
					<tbody id='ContenidoDetallesDesayuno'>
				`;
				for(let i = 0; i < datos_green_spot.length; i++){
					let tipo_empleado_green_spot = '';
					tipo_empleado_green_spot = datos_green_spot[i].Tipo_Empleado == 1 ? tipo_empleado_green_spot = 'Sindicalizado' : datos_green_spot[i].Tipo_Empleado == 2 ? tipo_empleado_green_spot = 'Administrativo' : '';
					tabla_detalle_desayuno += `
					<tr>
						<td  data-label= 'No. Orden'>${datos_green_spot[i].IdPedido}</td>
						<td  data-label= 'No. Empleado'>${datos_green_spot[i].NoEmpleado}</td>
						<td data-label= 'Empleado'>${datos_green_spot[i].NombreEmpleado}</td>
						<td data-label= 'tipo_empleado'>${tipo_empleado_green_spot}</td>
						<td data-label= 'No. Platillos'>${datos_green_spot[i].NoPlatillo}</td>
						<td data-label= 'Platillo'>${datos_green_spot[i].Platillo}</td>
						<td data-label= 'Precio'>${datos_green_spot[i].Precio}</td>
						<td data-label= 'Total'>${datos_green_spot[i].total}</td>	
						<td data-label= 'Ubicación'>
						${ nombre_ubicacion = datos_green_spot[i]['Ubicacion'] == 1 ? 'Torre TOP' : datos_green_spot[i]['Ubicacion'] == 2 ? 'Apodaca' : datos_green_spot[i]['Ubicacion'] == 3 ? 'Cienega' : ''}	
						</td>
						<td data-label= 'FechaPedido'>${datos_green_spot[i].FechaPedido}</td>
					</tr>`;
				}

				tabla_detalle_desayuno += `</tbody>
				</table>`;
				$("#titulo_modal").html('Detalles Comida Green Spot');
				$("#mostrar_tabla_detalles").html(tabla_detalle_desayuno);
				$("#agregar_botones_modal").append(`
					<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				`);
			}else{
				Swal.fire('No hay Registros', "","info");
			}
		}
	});
}

function boton_ver_detalles_comida_con(numero_conciliado){
	$('#modal_detalles').modal('hide');
	$("#mostrar_tabla_conciliadas_detalles").html('');
	$("#filtro_pirmer_detalle").html('');
	$("#boton_descarga_excel_comedor_detalle_conciliados").html('');
	datos = '';
	numero_empleado = 0;
	let formData = new FormData(document.getElementById("form_comedor_conciliados"));
  	formData.append("dato", "valor");
	formData.append("param", 18);
	formData.append("numero_conciliado", numero_conciliado);
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: formData,
		dataType: "html",
		cache: false, 	  	
		contentType: false,
		processData: false,
		success: function(result) {
			$("#numero_conciliacion").val(numero_conciliado);
			data = JSON.parse(result);
			if (data.estatus == 'success') {
				datos = data.data;
				let nombre_ubicacion = '',
				nombre_tipo_platillo = '',
				nombre_estatus = '';
				$("#filtro_pirmer_detalle").html(`
					<div class="form-group row">
						<div class="col-sm-4 col-xs-4 col-md-4">
							<label for="lblNombreVisita_detalle_comida_conciliada">Filtrar por No. Empleado:</label>
						</div>
						<div class="col-sm-8 col-xs-8 col-md-8">
							<input type="text" class="form-control" maxlength="6" id="txtNumeroEmpleado_detalle_conciliada" onkeypress="return event.charCode >= 48 && event.charCode <= 57" onchange="txtNumeroEmpleado_detalle_conciliada()">
						</div>
					</div>
				`);
				$("#boton_descarga_excel_comedor_detalle_conciliados").html(`
					<button id="btn_conciliar_comedor_detalle_conciliados" style="display:none;" class="btn btn-primary" onclick="DescargarTablaComedorDetalleConciliados()">Exportar Excel</button>
				`);
				let tbody_detalle_gs_co = '';
				let tabla_detalle_comida_con = `
				<table  id='TablaDetallesComidaConciliado' class='table table-bordered table-hover TablaResponsiva'>
					<thead>
						<tr class='table-header'>
							<th scope='col' style='display:none;'>No. Orden</th>
							<th scope='col'>No. Empleado</th>
							<th scope='col'>Empleado</th>
							<th scope='col'>Tipo de Empleado</th>
							<th scope='col' style="display:none;">Tipo de Platillo</th>
							<th scope='col'>Total Platillos</th>
							<th scope='col'>Total Pagar</th>
							<th scope='col' style='display:none;'>Ubicación</th>
							<th scope='col' style="display:none;">FechaPedido</th>
							<th scope='col'>Estatus</th>
							<th scope='col'>Acciones</th>
						</tr>
					</thead>
					<tbody id='ContenidoListados_detalle_plato_express_procesadas'>
					</tbody>
				</table>
				`;
				$("#mostrar_tabla_conciliadas_detalles").append(tabla_detalle_comida_con);
				for(let i = 0; i < datos.length; i++){
					if (numero_empleado != datos[i].NoEmpleado) {
						let tipo_empleado = '';
						tipo_empleado = datos[i].Tipo_Empleado == 1 ? tipo_empleado = 'Sindicalizado' : datos[i].Tipo_Empleado == 2 ? tipo_empleado = 'Administrativo' : '';
						tbody_detalle_gs_co = `
						<tr>
						<td  data-label= 'No. Orden' style='display:none;'>${datos[i].IdPedido}</td>
							<td  data-label= 'No. Empleado'>${datos[i].NoEmpleado}</td>
							<td data-label= 'Empleado'>${datos[i].NombreEmpleado}</td>
							<td data-label= 'Tipo Empleado'>${tipo_empleado}</td>
							<td data-label= 'Tipo de Platillo' style='display:none;'>
								${nombre_tipo_platillo = datos[i].TipoPlatillo == "3" ? 'Platillo Unico' : ''}
							</td>
							<td data-label= 'Total Platillos' id='numero_platillos_plato_express_conciliados_${datos[i].NoEmpleado}'></td>
							<td data-label= 'Total Pagar' id='total_pagar_comida_expres_conciliados_${datos[i].NoEmpleado}'></td>
							<td data-label= 'Ubicación' style='display:none;'>
								${ nombre_ubicacion = datos[i]['Ubicacion'] == 1 ? 'Torre TOP' : datos[i]['Ubicacion'] == 2 ? 'Apodaca' : datos[i]['Ubicacion'] == 3 ? 'Cienega' : ''}	
							</td>
							<td data-label= 'FechaPedido' style='display:none;'>${datos[i].FechaPedido}</td>
							<td data-label= 'Estatus Enviado' >
								${ nombre_estatus = datos[i].EstatusEnviado == 1 ? 'Pendiente por Procesar' : datos[i].EstatusEnviado == 2 ? 'Procesado' : ''}
							</td>
							<td data-label= 'Acciones' ><button id='boton_ver_detalles' type='button' data-toggle='modal' data-target='#modal_detalles' class='btn btn-primary boton_ver_detalles' onclick='boton_ver_detalles_comida_pro_con(${datos[i].NoEmpleado}, "${numero_conciliado}")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>
						</tr>`;

						$("#ContenidoListados_detalle_plato_express_procesadas").append(tbody_detalle_gs_co);
					}

					if (numero_empleado != datos[i].NoEmpleado) {
						suma_platillos_coex = datos[i].NoPlatillo;
						total_pagar_platillos_coco = datos[i].Total;
						$("#numero_platillos_plato_express_conciliados_"+datos[i].NoEmpleado).html(datos[i].NoPlatillo);
						$("#total_pagar_comida_expres_conciliados_"+datos[i].NoEmpleado).html('$'+total_pagar_platillos_coco);
					}else{
						suma_platillos_coex += Number(datos[i].NoPlatillo);
						total_pagar_platillos_coco += Number(datos[i].Total);
						$("#numero_platillos_plato_express_conciliados_"+datos[i].NoEmpleado).html(suma_platillos_coex);
						$("#total_pagar_comida_expres_conciliados_"+datos[i].NoEmpleado).html('$'+total_pagar_platillos_coco);
					}

					numero_empleado = datos[i].NoEmpleado;
				}

				$("#titulo_modal_conciliado").html('Detalles Comida Conciliada');
				$("#btn_conciliar_comedor_detalle_conciliados").show();
			}else{
				Swal.fire('No hay Registros', "","info");
			}
		}
	});
}

function boton_ver_detalles_comida_pro_con(numero_emp, numero_conciliado){
	$('#modal_detalles_primer').modal('hide');
	$("#mostrar_tabla_detalles").html('');
	$("#agregar_botones_modal").html('');
	datos = '';
	let formData = new FormData(document.getElementById("form_comedor_conciliados")),
	numero_empleado = numero_emp,
	procesadas = 2;
  	formData.append("dato", "valor");
	formData.append("param", 13);
	formData.append("estatus_enviado", procesadas);
	formData.append("numero_empleado", numero_empleado);
	formData.append("numero_conciliado", numero_conciliado);
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: formData,
		dataType: "html",
		cache: false, 	  	
		contentType: false,
		processData: false,
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus == "success") {
				datos = data.data;
				let nombre_ubicacion = '';
				let tabla_detalle_comida_con = `
				<table  id='TablaDetallesComidaProcesadoConciliado' class='table table-bordered table-hover TablaResponsiva'>
					<thead>
						<tr class='table-header'>
							<th scope='col'>No. Orden</th>
							<th scope='col'>No. Empleado</th>
							<th scope='col'>Empleado</th>
							<th scope='col'>Tipo de Empleado</th>
							<th scope='col'>No. Platillos</th>
							<th scope='col'>Precio</th>
							<th scope='col'>Total</th>
							<th scope='col'>Ubicación</th>
							<th scope='col'>FechaPedido</th>
						</tr>
					</thead>
					<tbody id='ContenidoDetallesComidaCociliado'>
				`;
				for(let i = 0; i < datos.length; i++){
					let tipo_empleado = '';
					tipo_empleado = datos[i].Tipo_Empleado == 1 ? tipo_empleado = 'Sindicalizado' : datos[i].Tipo_Empleado == 2 ? tipo_empleado = 'Administrativo' : '';
					tabla_detalle_comida_con += `
					<tr>
						<td  data-label= 'No. Orden'>${datos[i].IdPedido}</td>
						<td  data-label= 'No. Empleado'>${datos[i].NoEmpleado}</td>
						<td data-label= 'Empleado'>${datos[i].NombreEmpleado}</td>
						<td data-label= 'Tipo Empleado'>${tipo_empleado}</td>
						<td data-label= 'No. Platillos'>${datos[i].NoPlatillo}</td>
						<td data-label= 'Precio'>${datos[i].Precio}</td>
						<td data-label= 'Total'>${datos[i].Total}</td>	
						<td data-label= 'Ubicación'>
						${ nombre_ubicacion = datos[i]['Ubicacion'] == 1 ? 'Torre TOP' : datos[i]['Ubicacion'] == 2 ? 'Apodaca' : datos[i]['Ubicacion'] == 3 ? 'Cienega' : ''}	
						</td>
						<td data-label= 'FechaPedido'>${datos[i].FechaPedido}</td>
					</tr>`;
				}

				tabla_detalle_comida_con += `</tbody>
				</table>`;
				$("#titulo_modal").html('Detalles Comida Conciliada');
				$("#mostrar_tabla_detalles").html(tabla_detalle_comida_con);
				$("#agregar_botones_modal").append(`
					<button type="button" class="btn btn-default" onclick='regresar_modal("${numero_conciliado}", 1)'>Regresar</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				`);
			}else{
				Swal.fire('No hay Registros', "","info");
			}
		}
	});
}

function boton_ver_detalles_desayunos_con(numero_conciliado){
	$('#modal_detalles').modal('hide');
	$("#mostrar_tabla_conciliadas_detalles").html('');
	$("#filtro_pirmer_detalle").html('');
	$("#boton_descarga_excel_comedor_detalle_conciliados").html('');
	datos_green_spot = '';
	num_orden = 0;
	let Fecha = $("#txtFechaSeleccionado").val(),
	ID = "",
	RowID = 0,
	numero_empleado_green_spot = 0;
	let formData = new FormData(document.getElementById("form_comedor_conciliados"));
  	formData.append("dato", "valor");
	formData.append("param", 19);
	formData.append("numero_conciliado", numero_conciliado);
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: formData,
		dataType: "html",
		cache: false, 	  	
		contentType: false,
		processData: false,
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus == "success") {
				$("#numero_conciliacion").val(numero_conciliado);
				datos_green_spot = data.data;
				let nombre_ubicacion = '',
				nombre_tipo_platillo = '',
				nombre_estatus = '';
				$("#filtro_pirmer_detalle").html(`
					<div class="form-group row">
						<div class="col-sm-4 col-xs-4 col-md-4">
							<label for="lblNombreVisita_detalle_comida_especial_conciliada">Filtrar por No. Empleado:</label>
						</div>
						<div class="col-sm-8 col-xs-8 col-md-8">
							<input type="text" class="form-control" maxlength="6" id="txtNumeroEmpleado_detalle_especial_conciliada" onkeypress="return event.charCode >= 48 && event.charCode <= 57" onchange="txtNumeroEmpleado_detalle_especial_conciliada()">
						</div>
					</div>
				`);
				$("#boton_descarga_excel_comedor_detalle_conciliados").html(`
					<button id="btn_conciliar_comedor_detalle_especial_conciliados" style="display:none;" class="btn btn-primary" onclick="DescargarTablaComedorDetalleEspecialConciliados()">Exportar Excel</button>
				`);
				let tbody_detalle_gs_co = '';
				let tabla_detalle_gs_co = `
				<table  id='TablaDetallesComidaEspecialConciliado' class='table table-bordered table-hover TablaResponsiva'>
					<thead>
						<tr class='table-header'>
							<th scope='col' style="display:none;">No. Orden</th>
							<th scope='col'>No. Empleado</th>
							<th scope='col'>Empleado</th>
							<th scope='col'>Tipo de Empleado</th>
							<th scope='col' style="display:none;">Tipo de Platillo</th>
							<th scope='col'>Total Platillos</th>
							<th scope='col'>Total Pagar</th>
							<th scope='col' style='display:none;'>Ubicación</th>
							<th scope='col' style="display:none;">FechaPedido</th>
							<th scope='col'>Estatus</th>
							<th scope='col'>Acciones</th>
						</tr>
					</thead>
					<tbody id='ContenidoListados_green_spot_conciliados'>
					</tbody>
				</table>
				`;
				$("#mostrar_tabla_conciliadas_detalles").append(tabla_detalle_gs_co);
				for(var i=0; i < datos_green_spot.length; i++){
					if (numero_empleado_green_spot != datos_green_spot[i].NoEmpleado){
						if(ID != datos_green_spot[i].IdPedido){
							let tipo_empleado_green_spot = '';
							tipo_empleado_green_spot = datos_green_spot[i].Tipo_Empleado == 1 ? 'Sindicalizado' : datos_green_spot[i].Tipo_Empleado == 2 ? 'Administrativo' : '';  
							ID = datos_green_spot[i].IdPedido;
							tbody_detalle_gs_co = `
							<tr>
								<td  data-label= 'No. Orden' style='display:none;'>${datos_green_spot[i].IdPedido}</td>
								<td  data-label= 'No. Empleado'>${datos_green_spot[i].NoEmpleado}</td>
								<td data-label= 'Empleado'>${datos_green_spot[i].NombreEmpleado}</td>
								<td data-label= 'Tipo de Empleado'>${tipo_empleado_green_spot}</td>
								<td data-label= 'Tipo de Platillo' style='display:none;'>
									${nombre_tipo_platillo = datos_green_spot[i].TipoPlatillo == "3" ? 'Platillo Unico' : ''}
								</td>
								<td data-label= 'Total Platillos' id='total_platillos_gs_co_${datos_green_spot[i].NoEmpleado}'>${suma_platillos_gs_co}</td>
								<td data-label= 'Total Pagar' id='total_platillos_precio_gs_co_${datos_green_spot[i].NoEmpleado}'>${total_pagar_platillos_gs_co}</td>
								<td data-label= 'Ubicación' style='display:none;'>
									${ nombre_ubicacion = datos_green_spot[i]['Ubicacion'] == 1 ? 'Torre TOP' : datos_green_spot[i]['Ubicacion'] == 2 ? 'Apodaca' : datos_green_spot[i]['Ubicacion'] == 3 ? 'Cienega' : ''}	
								</td>
								<td data-label= 'FechaPedido' style='display:none;'>${datos_green_spot[i].FechaPedido}</td>
								<td data-label= 'Estatus Enviado' >
									${ nombre_estatus = datos_green_spot[i].EstatusEnviado == 1 ? 'Pendiente por Procesar' : datos_green_spot[i].EstatusEnviado == 2 ? 'Procesado' : ''}
								</td>
								<td data-label= 'Acciones' ><button id='boton_ver_detalles' type='button' data-toggle='modal' data-target='#modal_detalles' class='btn btn-primary boton_ver_detalles' onclick='boton_ver_detalles_desayunos_pro_con(${datos_green_spot[i].NoEmpleado}, "${numero_conciliado}")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>
							</tr>`;
							
							RowID = 0;
							num_orden = datos_green_spot[i].IdPedido;
						}else{
							RowID= RowID +1;
							var RowFinal = RowID +1;
							tabla_detalle_gs_co += `
							<tr>
								<td  data-label= 'No. Orden' style='display:none;' rowspan='${RowFinal}'></td>
								<td  data-label= 'No. Empleado' rowspan='${RowFinal}'></td>
								<td data-label= 'Empleado' rowspan='${RowFinal}'></td>
								<td data-label= 'Tipo de Empleado' rowspan='${RowFinal}'></td>
								<td data-label= 'Tipo de Platillo' style='display:none;'>
									${nombre_tipo_platillo = datos_green_spot[i].TipoPlatillo == "3" ? 'Platillo Unico' : ''}
								</td>
								<td data-label= 'Total Platillos'>${suma_platillos_gs_co}</td>
								<td data-label= 'Total Pagar'>${total_pagar_platillos_gs_co}</td>
								<td data-label= 'Ubicación' style='display:none;'>
									${ nombre_ubicacion = datos_green_spot[i]['Ubicacion'] == 1 ? 'Torre TOP' : datos_green_spot[i]['Ubicacion'] == 2 ? 'Apodaca' : datos_green_spot[i]['Ubicacion'] == 3 ? 'Cienega' : ''}	
								</td>
								<td data-label= 'FechaPedido' style='display:none;'>${datos_green_spot[i].FechaPedido}</td>
								<td data-label= 'Estatus'></td>
							</tr>`;
						}
						$("#ContenidoListados_green_spot_conciliados").append(tbody_detalle_gs_co);
					}

					if (numero_empleado_green_spot != datos_green_spot[i].NoEmpleado) {
						suma_platillos_gs_co = datos_green_spot[i].NoPlatillo;
						total_pagar_platillos_gs_co = datos_green_spot[i].total;
						$("#total_platillos_gs_co_"+datos_green_spot[i].NoEmpleado).html(datos_green_spot[i].NoPlatillo);
						$("#total_platillos_precio_gs_co_"+datos_green_spot[i].NoEmpleado).html('$'+total_pagar_platillos_gs_co);
					}else{
						suma_platillos_gs_co += Number(datos_green_spot[i].NoPlatillo);
						total_pagar_platillos_gs_co += Number(datos_green_spot[i].total);
						$("#total_platillos_gs_co_"+datos_green_spot[i].NoEmpleado).html(suma_platillos_gs_co);
						$("#total_platillos_precio_gs_co_"+datos_green_spot[i].NoEmpleado).html('$'+total_pagar_platillos_gs_co);
					}
					
					numero_empleado_green_spot = datos_green_spot[i].NoEmpleado;
				}
				
				$("#titulo_modal_conciliado").html('Detalles Comida Green Spot Conciliada');
				$("#btn_conciliar_comedor_detalle_especial_conciliados").show();	
			}else{
				Swal.fire('No hay Registros', "","info");
			}
		}
	});
}

function boton_ver_detalles_desayunos_pro_con(numero_emp, numero_conciliado){
	$('#modal_detalles_primer').modal('hide');
	$("#mostrar_tabla_detalles").html('');
	$("#agregar_botones_modal").html('');
	datos_green_spot = '';
	let formData = new FormData(document.getElementById("form_comedor_conciliados")),
	numero_empleado = numero_emp,
	procesadas = 2;
  	formData.append("dato", "valor");
	formData.append("param", 14);
	formData.append("estatus_enviado", procesadas);
	formData.append("numero_empleado", numero_empleado);
	formData.append("numero_conciliado", numero_conciliado);
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: formData,
		dataType: "html",
		cache: false, 	  	
		contentType: false,
		processData: false,
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus == "success") {
				datos_green_spot = data.data;
				let nombre_ubicacion = '';
				let tabla_detalle_desayuno_co = `
				<table  id='tabla_detalles_desayuno_conciliado' class='table table-bordered table-hover TablaResponsiva'>
					<thead>
						<tr class='table-header'>
							<th scope='col'>No. Orden</th>
							<th scope='col'>No. Empleado</th>
							<th scope='col'>Empleado</th>
							<th scope='col'>Tipo de Empleado</th>
							<th scope='col'>No. Platillos</th>
							<th scope='col'>Platillo</th>
							<th scope='col'>Precio</th>
							<th scope='col'>Total</th>
							<th scope='col'>Ubicación</th>
							<th scope='col'>FechaPedido</th>
						</tr>
					</thead>
					<tbody id='ContenidoDetallesDesayunoConciliado'>
				`;
				for(let i = 0; i < datos_green_spot.length; i++){
					let tipo_empleado_green_spot = '';
					tipo_empleado_green_spot = datos_green_spot[i].Tipo_Empleado == 1 ? 'Sindicalizado' : datos_green_spot[i].Tipo_Empleado == 2 ? 'Administrativo' : '';
					tabla_detalle_desayuno_co += `
					<tr>
						<td  data-label= 'No. Orden'>${datos_green_spot[i].IdPedido}</td>
						<td  data-label= 'No. Empleado'>${datos_green_spot[i].NoEmpleado}</td>
						<td data-label= 'Empleado'>${datos_green_spot[i].NombreEmpleado}</td>
						<td data-label= 'Tipo de Empleado'>${tipo_empleado_green_spot}</td>
						<td data-label= 'No. Platillos'>${datos_green_spot[i].NoPlatillo}</td>
						<td data-label= 'Platillo'>${datos_green_spot[i].Platillo}</td>
						<td data-label= 'Precio'>${datos_green_spot[i].Precio}</td>
						<td data-label= 'Total'>${datos_green_spot[i].total}</td>	
						<td data-label= 'Ubicación'>
						${ nombre_ubicacion = datos_green_spot[i]['Ubicacion'] == 1 ? 'Torre TOP' : datos_green_spot[i]['Ubicacion'] == 2 ? 'Apodaca' : datos_green_spot[i]['Ubicacion'] == 3 ? 'Cienega' : ''}	
						</td>
						<td data-label= 'FechaPedido'>${datos_green_spot[i].FechaPedido}</td>
					</tr>`;
				}

				tabla_detalle_desayuno_co += `</tbody>
				</table>`;
				$("#titulo_modal").html('Detalles Comida Escpecial Conciliada');
				$("#mostrar_tabla_detalles").html(tabla_detalle_desayuno_co);
				$("#agregar_botones_modal").append(`
					<button type="button" class="btn btn-default" onclick='regresar_modal("${numero_conciliado}", 2)'>Regresar</button>
					<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
				`);
			}else{
				Swal.fire('No hay Registros', "","info");
			}
		}
	});
}

function regresar_modal(numero_conciliado, tipo_comida){
	switch (tipo_comida) {
		case 1:
			$('#modal_detalles_primer').modal('show');
			boton_ver_detalles_comida_con(numero_conciliado);		
		break;

		case 2:
			$('#modal_detalles_primer').modal('show');
			boton_ver_detalles_desayunos_con(numero_conciliado);	
		break;
	
		default:
		break;
	}
}

function Contraseña() {
	var Contraseña = prompt("Favor de ingresar la contrasea", "");
	var Respuesta;
	//Detectamos si el usuario ingreso un valor
	if (Contraseña == "ComedorArzyz$2021"){
	 Respuesta = true
	}
	//Detectamos si el usuario NO ingreso un valor
	else {
	Respuesta = false
	}
	return Respuesta;
}

function DescargarTablaComedor(){
	$("#btn_conciliar_comedor").addClass("deshabilitar");
  	$('#btn_conciliar_comedor').attr("disabled", true);
	let Fecha = $("#txtFechaSeleccionado").val();
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: {"param":11, "estatus_enviado":2, "listado_procesadas":1, "Fecha":Fecha},
		success: function(result) {
			console.log(result);
			// $("#btn_conciliar_comedor").removeAttr("disabled, disabled");
			// $("#btn_conciliar_comedor").removeClass("deshabilitar");
			// $('#btn_conciliar_comedor').attr("disabled", false);
			// return false;
			data = JSON.parse(result);
			if (data.estatus == "success"){
				Swal.fire('Estatus Envio', "El estatus enviado se actualizo correctamente", "success").then(function() {
					bandera_descargar = 1;
					$("#btn_conciliar_comedor").removeAttr("disabled, disabled");
					$("#btn_conciliar_comedor").removeClass("deshabilitar");
					$('#btn_conciliar_comedor').attr("disabled", false);
					ObtenerFecha();
					MostrarInforme();
				});
			}else{
				Swal.fire('No hay Registros por procesar', "","info");
				$("#btn_conciliar_comedor").removeAttr("disabled, disabled");
				$("#btn_conciliar_comedor").removeClass("deshabilitar");
				$('#btn_conciliar_comedor').attr("disabled", false);
			}
		}
	});
}

function DescargarTablaGreen(){
	$("#btn_conciliar_comedor_green_spot").addClass("deshabilitar");
  	$('#btn_conciliar_comedor_green_spot').attr("disabled", true);
	let Fecha = $("#txtFechaSeleccionado").val();
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: {"param":20, "estatus_enviado":2, "listado_procesadas":1, "Fecha":Fecha},
		success: function(result) {
			console.log(result);
			data = JSON.parse(result);
			if (data.estatus == "success"){
				Swal.fire('Estatus Envio', "El estatus enviado se actualizo correctamente", "success").then(function() {
					bandera_descargar = 1;
					$("#btn_conciliar_comedor_green_spot").removeAttr("disabled, disabled");
					$("#btn_conciliar_comedor_green_spot").removeClass("deshabilitar");
					$('#btn_conciliar_comedor_green_spot').attr("disabled", false);
					ObtenerFecha();
					MostrarInforme_green_spot();
				});
			}else{
				Swal.fire('No hay Registros por procesar', "","info");
				$("#btn_conciliar_comedor_green_spot").removeAttr("disabled, disabled");
				$("#btn_conciliar_comedor_green_spot").removeClass("deshabilitar");
				$('#btn_conciliar_comedor_green_spot').attr("disabled", false);
			}
		}
	});
}

function DescargarTablaComedorProcesadas(){
	descargar_plato_express_procesadas();
}

function DescargarTablaComedorDetalleConciliados(){
	$("#TablaDetallesComidaConciliado").table2excel({
		filename: "Listado_Detalle_Conciliados_"+fecha_completa+'.xls'
	});
}

function DescargarTablaComedorDetalleEspecialConciliados(){
	$("#TablaDetallesComidaEspecialConciliado").table2excel({
		filename: "Listado_Detalle_Conciliados_"+fecha_completa+'.xls'
	});
}

function DescargarTablaGreenProcesadas(){
	descargar_green_spot_procesadas();
}

function descargar_green_spot() {
	$("#TablaComedor_green_spot").table2excel({
		filename: "Listado_Procesadas_Green_Spot_"+fecha_completa+'.xls'
	});
}

function descargar_plato_express() {
	$("#TablaComedor").table2excel({
		filename: "Listado_Procesadas_Plato_Express_"+fecha_completa+'.xls'
	});
}

function descargar_green_spot_procesadas() {
	$("#TablaComedor_green_spot_procesadas").table2excel({
		filename: "Listado_Procesadas_Conciliadas_Green_Spot_"+fecha_completa+'.xls'
	});
}

function descargar_plato_express_procesadas() {
	$("#TablaComedor_conciliados").table2excel({
		filename: "Listado_Procesadas_Conciliadas_Plato_Express_"+fecha_completa+'.xls'
	});
}

function MostrarInforme(){
	$("#opcion").val(1);
	datos = '';
	numero_empleado = 0;
	let Fecha = $("#txtFechaSeleccionado").val();
	if (Fecha == "") {
		Swal.fire( 
			"El campo fecha no puede ir vació",
			'',
			'info'
		);
		return;
	}
	let formData = new FormData(document.getElementById("form_comedor_conciliados"));
  	formData.append("dato", "valor");
	formData.append("param", 13);
	$("#boton_descarga_excel_green").hide();
	$("#boton_descarga_excel_comedor").hide();
	$("#boton_descarga_excel_green_procesadas").hide();
	$("#boton_descarga_excel_comedor_conciliados").hide();
	$("#filtros_plato_express").hide();
	$("#filtros_green_spot").hide();
	$("#filtros_plato_express_conciliados").hide();
	$("#filtros_green_spot_procesadas").hide();
	$("#EspacioTabla").hide();
	$("#div_tabla").show();
	$("#loading_comedor").show();
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: formData,
		dataType: "html",
		cache: false,
		contentType: false,
		processData: false,
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus == "success") {
				$("#loading_comedor").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").hide();
				$("#filtros_plato_express").show();
				$("#boton_descarga_excel_comedor").show();
				$("#EspacioTabla").show();
				$("#ContenidoListados").find("tr").remove();
				datos = data.data;
				for(let i = 0; i < datos.length; i++){
					if (numero_empleado != datos[i].NoEmpleado) {
						let tablacontenido ="<tr>";
						tablacontenido +="<td  data-label= 'No. Orden' style='display:none;'>"+datos[i].IdPedido+"</td>"
						tablacontenido +="<td  data-label= 'No. Empleado'>"+datos[i].NoEmpleado+"</td>"
						tablacontenido +="<td data-label= 'Empleado'>"+datos[i].NombreEmpleado+"</td>"
						if(datos[i].TipoPlatillo == "3"){
							tablacontenido +="<td data-label= 'Tipo de Platillo' style='display:none;'>Platillo Unico</td>"
						}
						tablacontenido +="<td data-label= 'Total Platillos' id='numero_platillos_"+datos[i].NoEmpleado+"'></td>"
						tablacontenido +="<td data-label= 'Total Pagar' id='total_pagar_"+datos[i].NoEmpleado+"'></td>"	
						switch (datos[i]['Ubicacion']) {
							case 1:
								tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Torre TOP</td>"
							break;

							case 2:
								tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Apodaca</td>"
							break;

							case 3:
								tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Cienega</td>"
							break;
						
							default:
								tablacontenido +="<td data-label= 'Ubicación' style='display:none;'></td>"
							break;
						}
						tablacontenido += "<td data-label= 'FechaPedido' style='display:none;'>"+datos[i].FechaPedido+"</td>"
						if (datos[i].EstatusEnviado == 1) {
							tablacontenido += "<td data-label= 'Estatus Enviado' >Pendiente por Procesar</td>"
						}else if (datos[i].EstatusEnviado == 2) {
							tablacontenido += "<td data-label= 'Estatus Enviado' >Procesado</td>"
						}
						tablacontenido += "<td data-label= 'Acciones' ><button id='boton_ver_detalles_comida' type='button' data-toggle='modal' data-target='#modal_detalles' class='btn btn-primary' onclick='boton_ver_detalles_comida("+datos[i].NoEmpleado+")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>"
						tablacontenido +="</tr>";
						$('#ContenidoListados').append(tablacontenido);	
					}
					if (numero_empleado != datos[i].NoEmpleado) {
						suma_platillos = datos[i].NoPlatillo;
						total_pagar_platillos_comida = datos[i].Total;
						$("#numero_platillos_"+datos[i].NoEmpleado).html(datos[i].NoPlatillo);
						$("#total_pagar_"+datos[i].NoEmpleado).html('$'+total_pagar_platillos_comida);
					}else{
						suma_platillos += Number(datos[i].NoPlatillo);
						total_pagar_platillos_comida += Number(datos[i].Total);
						$("#numero_platillos_"+datos[i].NoEmpleado).html(suma_platillos);
						$("#total_pagar_"+datos[i].NoEmpleado).html('$'+total_pagar_platillos_comida);
					}
					numero_empleado = datos[i].NoEmpleado;
				}
				if (bandera_descargar == 1) {
					// descargar_plato_express();
					bandera_descargar = 0;
				}	
			}else if (data.estatus == "error_fecha") {
				$("#loading_comedor").hide();
				$("#EspacioTabla").hide();
				$("#div_tabla").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'info'
				);
			}else{
				$("#loading_comedor").hide();
				$("#EspacioTabla").hide();
				$("#div_tabla").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'error'
				);
			}
		}
	});
}

function MostrarInforme_green_spot(){
	$("#opcion").val(2);
	datos_green_spot = '';
	num_orden = 0;
	let Fecha = $("#txtFechaSeleccionado").val(),
	ID = "",
	RowID = 0,
	numero_empleado_green_spot = 0;
	if (Fecha == "") {
		Swal.fire( 
			"El campo fecha no puede ir vació",
			'',
			'info'
		);
		return;
	}
	let formData = new FormData(document.getElementById("form_comedor_conciliados"));
  	formData.append("dato", "valor");
	formData.append("param", 14);
	$("#EspacioTabla_green_spot").hide();
	$("#boton_descarga_excel_comedor").hide();
	$("#boton_descarga_excel_green").hide();
	$("#boton_descarga_excel_green_procesadas").hide();
	$("#boton_descarga_excel_comedor_conciliados").hide();
	$("#filtros_plato_express").hide();
	$("#filtros_green_spot").hide();
	$("#filtros_plato_express_conciliados").hide();
	$("#filtros_green_spot_procesadas").hide();
	$("#div_tabla_green_spot").show();
	$("#loading_comedor_green_spot").show();
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: formData,
		dataType: "html",
		cache: false,
		contentType: false,
		processData: false,
		success: function(result) {
			let data = JSON.parse(result);
			if (data.estatus == "success") {
				$("#loading_comedor_green_spot").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").hide();
				$("#filtros_green_spot").show();
				$("#boton_descarga_excel_green").show();
				$("#EspacioTabla_green_spot").show();
				$("#ContenidoListados_green_spot").find("tr").remove();
				datos_green_spot = data.data;
				for(var i=0; i < datos_green_spot.length; i++){
					if (numero_empleado_green_spot != datos_green_spot[i].NoEmpleado){
						if(ID != datos_green_spot[i].IdPedido){
							ID = datos_green_spot[i].IdPedido;
							var tablacontenido ="<tr>";
							tablacontenido +="<td  id='IDPedido"+datos_green_spot[i].IdPedido+"' data-label= 'No. Orden' style='display:none;'>"+datos_green_spot[i].IdPedido+"</td>"
							tablacontenido +="<td  id='IDNoEmpleado"+datos_green_spot[i].IdPedido+"' data-label= 'No. Empleado'>"+datos_green_spot[i].NoEmpleado+"</td>"
							tablacontenido +="<td  id='IDNomEmpleado"+datos_green_spot[i].IdPedido+"'' data-label= 'Empleado'>"+datos_green_spot[i].NombreEmpleado+"</td>"
							tablacontenido +="<td data-label= 'Total Platillos' id='total_platillos_gs_"+datos_green_spot[i].NoEmpleado+"'></td>"
							tablacontenido +="<td data-label= 'Platillo' style='display:none;'>"+datos_green_spot[i].Platillo+"</td>"
							tablacontenido +="<td data-label= 'Kcal' style='display:none;'>"+datos_green_spot[i].Kcal+"</td>"
							tablacontenido +="<td data-label= 'Precio' style='display:none;'>"+parseFloat(datos_green_spot[i].Precio).toFixed(2)+"</td>"
							tablacontenido +="<td data-label= 'Total' style='display:none;'>"+parseFloat(datos_green_spot[i].total).toFixed(2)+"</td>"
							tablacontenido +="<td data-label= 'Total Pagar' id='total_platillos_precio_"+datos_green_spot[i].NoEmpleado+"'></td>"
							switch (datos_green_spot[i]['Ubicacion']) {
								case 1:
									tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Torre TOP</td>"
								break;
	
								case 2:
									tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Apodaca</td>"
								break;
	
								case 3:
									tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Cienega</td>"
								break;
							
								default:
									tablacontenido +="<td data-label= 'Ubicación' style='display:none;'></td>"
								break;
							}
							tablacontenido += "<td data-label= 'FechaPedido' style='display:none;'>"+datos_green_spot[i].FechaPedido+"</td>"
							if (datos_green_spot[i].EstatusEnviado == 1) {
								tablacontenido += "<td data-label= 'Estatus Enviado' >Pendiente por Procesar</td>"
							}else if (datos_green_spot[i].EstatusEnviado == 2) {
								tablacontenido += "<td data-label= 'Estatus Enviado' >Procesado</td>"
							}else{
								tablacontenido += "<td data-label= 'Estatus Enviado' ></td>"
							}

							tablacontenido += "<td data-label= 'Acciones' ><button id='boton_ver_detalles' type='button' data-toggle='modal' data-target='#modal_detalles' class='btn btn-primary' onclick='boton_ver_detalles_desayunos("+datos_green_spot[i].NoEmpleado+")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>"
							tablacontenido +="</tr>";
							$('#ContenidoListados_green_spot').append(tablacontenido);
							RowID = 0;
							num_orden = datos_green_spot[i].IdPedido;
						}else{
							RowID= RowID +1;
							var RowFinal = RowID +1;
							$("#IDPedido" +datos_green_spot[i].IdPedido ).attr('rowspan', RowFinal);
							$("#IDNoEmpleado" +datos_green_spot[i].IdPedido ).attr('rowspan', RowFinal);
							$("#IDNomEmpleado" +datos_green_spot[i].IdPedido ).attr('rowspan', RowFinal);
							var tablacontenidoD ="<tr><td data-label= 'Total Platillos'></td>"
							tablacontenidoD +="<td data-label= 'Platillo' style='display:none;'>"+datos_green_spot[i].Platillo+"</td>"
							tablacontenidoD +="<td data-label= 'Kcal' style='display:none;'>"+datos_green_spot[i].Kcal+"</td>"
							tablacontenidoD +="<td data-label= 'Precio' style='display:none;'>"+parseFloat(datos_green_spot[i].Precio).toFixed(2)+"</td>"
							tablacontenidoD +="<td data-label= 'Total' style='display:none;'>"+parseFloat(datos_green_spot[i].total).toFixed(2)+"</td>"
							tablacontenidoD +="<td data-label= 'Total Pagar'></td>"
							tablacontenidoD +="<td data-label= 'Ubicación'></td>"
							tablacontenidoD +="<td data-label= 'Estatus'></td></tr>"
							$('#ContenidoListados_green_spot').append(tablacontenidoD);
						}
					}
					if (numero_empleado_green_spot != datos_green_spot[i].NoEmpleado) {
						suma_platillos_gs_co = datos_green_spot[i].NoPlatillo;
						total_pagar_platillos_desco = datos_green_spot[i].total;
						$("#total_platillos_gs_"+datos_green_spot[i].NoEmpleado).html(datos_green_spot[i].NoPlatillo);
						$("#total_platillos_precio_"+datos_green_spot[i].NoEmpleado).html('$'+total_pagar_platillos_desco);
					}else{
						suma_platillos_gs_co += Number(datos_green_spot[i].NoPlatillo);
						total_pagar_platillos_desco += Number(datos_green_spot[i].total);
						$("#total_platillos_gs_"+datos_green_spot[i].NoEmpleado).html(suma_platillos_gs_co);
						$("#total_platillos_precio_"+datos_green_spot[i].NoEmpleado).html('$'+total_pagar_platillos_desco);
					}

					numero_empleado_green_spot = datos_green_spot[i].NoEmpleado;
				}
				if (bandera_descargar == 1) {
					// descargar_green_spot();
					bandera_descargar = 0;
				}
			}else if (data.estatus == "error_fecha") {
				$("#loading_comedor_green_spot").hide();
				$("#EspacioTabla_green_spot").hide();
				$("#div_tabla_green_spot").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'info'
				);
			}else{
				$("#loading_comedor_green_spot").hide();
				$("#EspacioTabla_green_spot").hide();
				$("#div_tabla_green_spot").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'error'
				);
			}
		}	
	});
}

function MostrarInforme_plato_express_conciliados(){
	$("#opcion").val(3);
	datos_procesados = '';
	let Fecha = $("#txtFechaSeleccionado").val(),
	procesadas = 2,
	id_conciliacion = 0;
	if (Fecha == "") {
		Swal.fire( 
			"El campo fecha no puede ir vació",
			'',
			'info'
		);
		return;
	}
	let formData = new FormData(document.getElementById("form_comedor_conciliados"));
  	formData.append("dato", "valor");
	formData.append("param", 17);
	formData.append("estatus_enviado", procesadas);
	formData.append("tipo_comida", 1);
	$("#boton_descarga_excel_green").hide();
	$("#boton_descarga_excel_comedor").hide();
	$("#boton_descarga_excel_green_conciliados").hide();
	$("#boton_descarga_excel_comedor_conciliados").hide();
	$("#filtros_plato_express").hide();
	$("#filtros_green_spot").hide();
	$("#filtros_plato_express_conciliados").hide();
	$("#filtros_green_spot_procesadas").hide();
	$("#EspacioTabla_plato_express_conciliados").hide();
	$("#div_tabla_plato_express_conciliados").show();
	$("#loading_comedor_conciliados").show();
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: formData,
		dataType: "html",
		cache: false,
		contentType: false,
		processData: false,
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus == "success") {
				$("#loading_comedor_conciliados").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_green_spot_procesadas").hide();
				$("#filtros_plato_express_conciliados").show();
				$("#boton_descarga_excel_comedor_conciliados").show();
				$("#EspacioTabla_plato_express_conciliados").show();
				$("#ContenidoListados_plato_express_conciliados").find("tr").remove();
				datos_procesados = data.data;
				for(let i = 0; i < datos_procesados.length; i++){
					if (id_conciliacion != datos_procesados[i].id_conciliacion) {
						let tablacontenido ="<tr>";
						tablacontenido +="<td  data-label= 'Id Conciliacion'>"+datos_procesados[i].id_conciliacion+"</td>"
						tablacontenido +="<td data-label= 'Numero Empleado' style='display:none;'>"+datos_procesados[i].no_empleado+"</td>"
						tablacontenido +="<td data-label= 'Total Platillos' id='total_platillos_"+datos_procesados[i].id_conciliacion+"'>"+datos_procesados[i].total_platillos+"</td>"
						tablacontenido +="<td data-label= 'Total Pagar' id='total_pagar_"+datos_procesados[i].id_conciliacion+"'>"+datos_procesados[i].total_pagar+"</td>"
						tablacontenido +="<td data-label= 'Fecha Conciliado'>"+datos_procesados[i].fecha_conciliado+"</td>"
						if (datos_procesados[i].estatus == 0) {
							tablacontenido += "<td data-label= 'Estatus Enviado' >Conciliado</td>"
						}
						tablacontenido +=`<td data-label='Acciones'><button id='boton_ver_detalles_comida' type='button' data-toggle='modal' data-target='#modal_detalles_primer' class='btn btn-primary boton_ver_detalles' onclick='boton_ver_detalles_comida_con("${datos_procesados[i].id_conciliacion}")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>`;		
					
						$('#ContenidoListados_plato_express_conciliados').append(tablacontenido);	
					}
					if (id_conciliacion != datos_procesados[i].id_conciliacion) {
						suma_platillos = datos_procesados[i].total_platillos;
						total_pagar_platillos_comida = datos_procesados[i].total_pagar;
						$("#total_platillos_"+datos_procesados[i].id_conciliacion).html(datos_procesados[i].total_platillos);
						$("#total_pagar_"+datos_procesados[i].id_conciliacion).html('$'+total_pagar_platillos_comida);
					}else{
						suma_platillos += Number(datos_procesados[i].total_platillos);
						total_pagar_platillos_comida += Number(datos_procesados[i].total_pagar);
						$("#total_platillos_"+datos_procesados[i].id_conciliacion).html(suma_platillos);
						$("#total_pagar_"+datos_procesados[i].id_conciliacion).html('$'+total_pagar_platillos_comida);
					}
					id_conciliacion = datos_procesados[i].id_conciliacion;
				}
			}else if (data.estatus == "error_fecha") {
				$("#loading_comedor_conciliados").hide();
				$("#EspacioTabla_plato_express_conciliados").hide();
				$("#div_tabla_plato_express_conciliados").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'info'
				);
			}else{
				$("#loading_comedor_conciliados").hide();
				$("#EspacioTabla_plato_express_conciliados").hide();
				$("#div_tabla_plato_express_conciliados").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'error'
				);
			}
		}
	});
}

// function MostrarInforme_green_spot_precesadas(){
// 	$("#opcion").val(4);
// 	datos_green_spot = '';
// 	num_orden = 0;
// 	let Fecha = $("#txtFechaSeleccionado").val(),
// 	ID = "",
// 	RowID = 0,
// 	procesadas = 2,
// 	numero_empleado_green_spot = 0;
// 	if (Fecha == "") {
// 		Swal.fire( 
// 			"El campo fecha no puede ir vació",
// 			'',
// 			'info'
// 		);
// 		return;
// 	}
// 	let formData = new FormData(document.getElementById("form_comedor_conciliados"));
//   	formData.append("dato", "valor");
// 	formData.append("param", 14);
// 	formData.append("estatus_enviado", procesadas);
// 	$("#EspacioTabla_green_spot_procesadas").hide();
// 	$("#boton_descarga_excel_green").hide();
// 	$("#boton_descarga_excel_comedor").hide();
// 	$("#boton_descarga_excel_green_procesadas").hide();
// 	$("#boton_descarga_excel_comedor_conciliados").hide();
// 	$("#filtros_plato_express").hide();
// 	$("#filtros_green_spot").hide();
// 	$("#filtros_plato_express_conciliados").hide();
// 	$("#filtros_green_spot_procesadas").hide();
// 	$("#div_tabla_green_spot_procesadas").show();
// 	$("#loading_comedor_green_spot_procesadas").show();
// 	$.ajax({
// 		url: "../../utileria.php",
// 		type: "post",
// 		data: formData,
// 		dataType: "html",
// 		cache: false,
// 		contentType: false,
// 		processData: false,
// 		success: function(result) {
// 			let data = JSON.parse(result);
// 			if (data.estatus == "success") {
// 				$("#loading_comedor_green_spot_procesadas").hide();
// 				$("#boton_descarga_excel_green").hide();
// 				$("#boton_descarga_excel_comedor").hide();
// 				$("#boton_descarga_excel_comedor_conciliados").hide();
// 				$("#filtros_plato_express").hide();
// 				$("#filtros_green_spot").hide();
// 				$("#filtros_plato_express_conciliados").hide();
// 				$("#filtros_green_spot_procesadas").show();
// 				$("#boton_descarga_excel_green_procesadas").show();
// 				$("#EspacioTabla_green_spot_procesadas").show();
// 				$("#ContenidoListados_green_spot_procesadas").find("tr").remove();
// 				datos_green_spot = data.data;
// 				for(var i=0; i < datos_green_spot.length; i++){
// 					if (numero_empleado_green_spot != datos_green_spot[i].NoEmpleado){
// 						if(ID != datos_green_spot[i].IdPedido){
// 							ID = datos_green_spot[i].IdPedido;
// 							var tablacontenido ="<tr>";
// 							tablacontenido +="<td  id='IDPedido_des_con_"+datos_green_spot[i].IdPedido+"' data-label= 'No. Orden' style='display:none;'>"+datos_green_spot[i].IdPedido+"</td>"
// 							tablacontenido +="<td  id='IDNoEmpleado_des_con_"+datos_green_spot[i].IdPedido+"' data-label= 'No. Empleado'>"+datos_green_spot[i].NoEmpleado+"</td>"
// 							tablacontenido +="<td  id='IDNomEmpleado_des_con_"+datos_green_spot[i].IdPedido+"'' data-label= 'Empleado'>"+datos_green_spot[i].NombreEmpleado+"</td>"
// 							tablacontenido +="<td data-label= 'Total Platillos' id='total_platillos_gs_co_"+datos_green_spot[i].NoEmpleado+"'></td>"
// 							tablacontenido +="<td data-label= 'Platillo' style='display:none;'>"+datos_green_spot[i].Platillo+"</td>"
// 							tablacontenido +="<td data-label= 'Kcal' style='display:none;'>"+datos_green_spot[i].Kcal+"</td>"
// 							tablacontenido +="<td data-label= 'Precio' style='display:none;'>"+parseFloat(datos_green_spot[i].Precio).toFixed(2)+"</td>"
// 							tablacontenido +="<td data-label= 'Total' style='display:none;'>"+parseFloat(datos_green_spot[i].total).toFixed(2)+"</td>"
// 							tablacontenido +="<td data-label= 'Total Pagar' id='total_platillos_precio_gs_co_"+datos_green_spot[i].NoEmpleado+"'></td>"
// 							switch (datos_green_spot[i]['Ubicacion']) {
// 								case 1:
// 									tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Torre TOP</td>"
// 								break;
	
// 								case 2:
// 									tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Apodaca</td>"
// 								break;
	
// 								case 3:
// 									tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Cienega</td>"
// 								break;
							
// 								default:
// 									tablacontenido +="<td data-label= 'Ubicación' style='display:none;'></td>"
// 								break;
// 							}
// 							tablacontenido += "<td data-label= 'FechaPedido' style='display:none;'>"+datos_green_spot[i].FechaPedido+"</td>"
// 							if (datos_green_spot[i].EstatusEnviado == 1) {
// 								tablacontenido += "<td data-label= 'Estatus Enviado' >Pendiente por Procesar</td>"
// 							}else if (datos_green_spot[i].EstatusEnviado == 2) {
// 								tablacontenido += "<td data-label= 'Estatus Enviado' >Procesado</td>"
// 							}else{
// 								tablacontenido += "<td data-label= 'Estatus Enviado' ></td>"
// 							}
// 							tablacontenido += "<td data-label= 'Acciones' ><button id='boton_ver_detalles' type='button' data-toggle='modal' data-target='#modal_detalles' class='btn btn-primary' onclick='boton_ver_detalles_desayunos_con("+datos_green_spot[i].NoEmpleado+")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>"
// 							tablacontenido +="</tr>";
// 							$('#ContenidoListados_green_spot_procesadas').append(tablacontenido);
// 							RowID = 0;
// 							num_orden = datos_green_spot[i].IdPedido;
// 						}else{
// 							RowID= RowID +1;
// 							var RowFinal = RowID +1;
// 							$("#IDPedido_des_con_" +datos_green_spot[i].IdPedido ).attr('rowspan', RowFinal);
// 							$("#IDNoEmpleado_des_con_" +datos_green_spot[i].IdPedido ).attr('rowspan', RowFinal);
// 							$("#IDNomEmpleado_des_con_" +datos_green_spot[i].IdPedido ).attr('rowspan', RowFinal);
// 							var tablacontenidoD ="<tr><td data-label= 'Total Platillos'></td>"
// 							tablacontenidoD +="<td data-label= 'Platillo' style='display:none;'>"+datos_green_spot[i].Platillo+"</td>"
// 							tablacontenidoD +="<td data-label= 'Kcal' style='display:none;'>"+datos_green_spot[i].Kcal+"</td>"
// 							tablacontenidoD +="<td data-label= 'Precio' style='display:none;'>"+parseFloat(datos_green_spot[i].Precio).toFixed(2)+"</td>"
// 							tablacontenidoD +="<td data-label= 'Total' style='display:none;'>"+parseFloat(datos_green_spot[i].total).toFixed(2)+"</td>"
// 							tablacontenidoD +="<td data-label= 'Total Pagar'></td>"
// 							tablacontenidoD +="<td data-label= 'Ubicación'></td>"
// 							tablacontenidoD +="<td data-label= 'Estatus'></td></tr>"
// 							$('#ContenidoListados_green_spot').append(tablacontenidoD);
// 						}
// 					}
// 					// if (numero_empleado_green_spot == datos_green_spot[i].NoEmpleado) {
// 					// 	RowID = RowID +1;
// 					// 	var RowFinal = RowID +1;
// 					// 	$("#IDPedido" +num_orden ).attr('rowspan', RowFinal);
// 					// 	$("#IDNoEmpleado" +num_orden ).attr('rowspan', RowFinal);
// 					// 	$("#IDNomEmpleado" +num_orden ).attr('rowspan', RowFinal);
// 					// 	var tablacontenidoD ="<tr><td data-label= 'No. Platillo'>"+datos_green_spot[i].NoPlatillo+"</td>"
// 					// 	tablacontenidoD +="<td data-label= 'Platillo'>"+datos_green_spot[i].Platillo+"</td>"
// 					// 	tablacontenidoD +="<td data-label= 'Kcal' style='display:none;'>"+datos_green_spot[i].Kcal+"</td>"
// 					// 	tablacontenidoD +="<td data-label= 'Precio'>"+parseFloat(datos_green_spot[i].Precio).toFixed(2)+"</td>"
// 					// 	tablacontenidoD +="<td data-label= 'Total'>"+parseFloat(datos_green_spot[i].total).toFixed(2)+"</td>"
// 					// 	tablacontenidoD +="<td data-label= 'Ubicación'></td>"
// 					// 	tablacontenidoD +="<td></td>"
// 					// 	tablacontenidoD += "<td ></td></tr>"
// 					// 	$('#ContenidoListados_green_spot_procesadas').append(tablacontenidoD);
// 					// }
// 					if (numero_empleado_green_spot != datos_green_spot[i].NoEmpleado) {
// 						suma_platillos_gs_co = datos_green_spot[i].NoPlatillo;
// 						total_pagar_platillos_desco = datos_green_spot[i].Precio;
// 						$("#total_platillos_gs_co_"+datos_green_spot[i].NoEmpleado).html(datos_green_spot[i].NoPlatillo);
// 						$("#total_platillos_precio_gs_co_"+datos_green_spot[i].NoEmpleado).html('$'+total_pagar_platillos_desco);
// 					}else{
// 						suma_platillos_gs_co += Number(datos_green_spot[i].NoPlatillo);
// 						total_pagar_platillos_desco += Number(datos_green_spot[i].Precio);
// 						$("#total_platillos_gs_co_"+datos_green_spot[i].NoEmpleado).html(suma_platillos_gs_co);
// 						$("#total_platillos_precio_gs_co_"+datos_green_spot[i].NoEmpleado).html('$'+total_pagar_platillos_desco);
// 					}
// 					numero_empleado_green_spot = datos_green_spot[i].NoEmpleado;
// 				}
// 			}else if (data.estatus == "error_fecha") {
// 				$("#loading_comedor_green_spot_procesadas").hide();
// 				$("#EspacioTabla_green_spot_procesadas").hide();
// 				$("#div_tabla_green_spot_procesadas").hide();
// 				$("#boton_descarga_excel_green").hide();
// 				$("#boton_descarga_excel_comedor").hide();
// 				$("#boton_descarga_excel_green_procesadas").hide();
// 				$("#boton_descarga_excel_comedor_conciliados").hide();
// 				$("#filtros_plato_express").hide();
// 				$("#filtros_green_spot").hide();
// 				$("#filtros_plato_express_conciliados").hide();
// 				$("#filtros_green_spot_procesadas").hide();
// 				Swal.fire( 
// 					data.Mensaje,
// 					'',
// 					'info'
// 				);
// 			}else{
// 				$("#loading_comedor_green_spot_procesadas").hide();
// 				$("#EspacioTabla_green_spot_procesadas").hide();
// 				$("#div_tabla_green_spot_procesadas").hide();
// 				$("#boton_descarga_excel_green").hide();
// 				$("#boton_descarga_excel_comedor").hide();
// 				$("#boton_descarga_excel_green_procesadas").hide();
// 				$("#boton_descarga_excel_comedor_conciliados").hide();
// 				$("#filtros_plato_express").hide();
// 				$("#filtros_green_spot").hide();
// 				$("#filtros_plato_express_conciliados").hide();
// 				$("#filtros_green_spot_procesadas").hide();
// 				Swal.fire( 
// 					data.Mensaje+' green spot',
// 					'',
// 					'error'
// 				);
// 			}
// 		}	
// 	});
// }

function MostrarInforme_green_spot_conciliados(){
	$("#opcion").val(4);
	datos_green_spot_procesados = '';
	num_orden = 0;
	let Fecha = $("#txtFechaSeleccionado").val(),
	ID = "",
	RowID = 0,
	procesadas = 2,
	numero_empleado_green_spot = 0,
	id_conciliacion = 0;
	if (Fecha == "") {
		Swal.fire( 
			"El campo fecha no puede ir vació",
			'',
			'info'
		);
		return;
	}
	let formData = new FormData(document.getElementById("form_comedor_conciliados"));
  	formData.append("dato", "valor");
	formData.append("param", 17);
	formData.append("estatus_enviado", procesadas);
	formData.append("tipo_comida", 2);
	$("#EspacioTabla_green_spot_procesadas").hide();
	$("#boton_descarga_excel_green").hide();
	$("#boton_descarga_excel_comedor").hide();
	$("#boton_descarga_excel_green_procesadas").hide();
	$("#boton_descarga_excel_comedor_conciliados").hide();
	$("#filtros_plato_express").hide();
	$("#filtros_green_spot").hide();
	$("#filtros_plato_express_conciliados").hide();
	$("#filtros_green_spot_procesadas").hide();
	$("#div_tabla_green_spot_procesadas").show();
	$("#loading_comedor_green_spot_procesadas").show();
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: formData,
		dataType: "html",
		cache: false,
		contentType: false,
		processData: false,
		success: function(result) {
			let data = JSON.parse(result);
			if (data.estatus == "success") {
				$("#loading_comedor_green_spot_procesadas").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").show();
				$("#boton_descarga_excel_green_procesadas").show();
				$("#EspacioTabla_green_spot_procesadas").show();
				$("#ContenidoListados_green_spot_procesadas").find("tr").remove();
				datos_green_spot_procesados = data.data;
				for(let i = 0; i < datos_green_spot_procesados.length; i++){
					if (id_conciliacion != datos_green_spot_procesados[i].id_conciliacion) {
						let tablacontenido ="<tr>";
						tablacontenido +="<td  data-label= 'Id Conciliacion'>"+datos_green_spot_procesados[i].id_conciliacion+"</td>"
						tablacontenido +="<td data-label= 'Numero Empleado' style='display:none;'>"+datos_green_spot_procesados[i].no_empleado+"</td>"
						tablacontenido +="<td data-label= 'Total Platillos' id='total_platillos_gs_"+datos_green_spot_procesados[i].id_conciliacion+"'></td>"
						tablacontenido +="<td data-label= 'Total Pagar' id='total_pagar_gs_"+datos_green_spot_procesados[i].id_conciliacion+"'></td>"
						tablacontenido +="<td data-label= 'Fecha Conciliado'>"+datos_green_spot_procesados[i].fecha_conciliado+"</td>"
						if (datos_green_spot_procesados[i].estatus == 0) {
							tablacontenido += "<td data-label= 'Estatus Enviado' >Conciliado</td>"
						}
						tablacontenido +=`<td data-label='Acciones'><button id='boton_ver_detalles_comida' type='button' data-toggle='modal' data-target='#modal_detalles_primer' class='btn btn-primary boton_ver_detalles' onclick='boton_ver_detalles_desayunos_con("${datos_green_spot_procesados[i].id_conciliacion}")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>`;		
					
						$('#ContenidoListados_green_spot_procesadas').append(tablacontenido);	
					}
					if (id_conciliacion != datos_green_spot_procesados[i].id_conciliacion) {
						suma_platillos = datos_green_spot_procesados[i].total_platillos;
						total_pagar_platillos_comida = datos_green_spot_procesados[i].total_pagar;
						$("#total_platillos_gs_"+datos_green_spot_procesados[i].id_conciliacion).html(datos_green_spot_procesados[i].total_platillos);
						$("#total_pagar_gs_"+datos_green_spot_procesados[i].id_conciliacion).html('$'+total_pagar_platillos_comida);
					}else{
						suma_platillos += Number(datos_green_spot_procesados[i].total_platillos);
						total_pagar_platillos_comida += Number(datos_green_spot_procesados[i].total_pagar);
						$("#total_platillos_gs_"+datos_green_spot_procesados[i].id_conciliacion).html(suma_platillos);
						$("#total_pagar_gs_"+datos_green_spot_procesados[i].id_conciliacion).html('$'+total_pagar_platillos_comida);
					}
					id_conciliacion = datos_green_spot_procesados[i].id_conciliacion;
				}
			}else if (data.estatus == "error_fecha") {
				$("#loading_comedor_green_spot_procesadas").hide();
				$("#EspacioTabla_green_spot_procesadas").hide();
				$("#div_tabla_green_spot_procesadas").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'info'
				);
			}else{
				$("#loading_comedor_green_spot_procesadas").hide();
				$("#EspacioTabla_green_spot_procesadas").hide();
				$("#div_tabla_green_spot_procesadas").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'error'
				);
			}
		}	
	});
}

$("#txtNumeroEmpleado_plato_express").on('change',function(e){
	datos = '';
	numero_empleado = 0;
	let Fecha = $("#txtFechaSeleccionado").val(),
	numero_empleado_filtrado = $(this).val().toLowerCase();
	regex = /^[a-zA-Z ]+$/;
	this.value = (this.value + '').replace(/[^0-9]/g, '');
	if (regex.test(numero_empleado_filtrado)) {
		return;
	}
	if (Fecha == "") {
		Swal.fire( 
			"El campo fecha no puede ir vació",
			'',
			'info'
		);
		return;
	}
	if (numero_empleado_filtrado.length <= 3 && numero_empleado_filtrado != '') {
		return false;	
	}	
	let formData = new FormData(document.getElementById("form_comedor_conciliados"));
  	formData.append("dato", "valor");
	formData.append("numero_empleado", numero_empleado_filtrado);
	formData.append("param", 13);
	$("#boton_descarga_excel_green").hide();
	$("#EspacioTabla").hide();
	$("#div_tabla").show();
	$("#loading_comedor").show();
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: formData,
		dataType: "html",
		cache: false,
		contentType: false,
		processData: false,
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus == "success") {
				$("#loading_comedor").hide();
				$("#boton_descarga_excel_comedor").show();
				$("#EspacioTabla").show();
				$("#ContenidoListados").find("tr").remove();
				datos = data.data;
				for(let i = 0; i < datos.length; i++){
					if (numero_empleado != datos[i].NoEmpleado) {
						let tablacontenido ="<tr>";
						tablacontenido +="<td  data-label= 'No. Orden' style='display:none;'>"+datos[i].IdPedido+"</td>"
						tablacontenido +="<td  data-label= 'No. Empleado'>"+datos[i].NoEmpleado+"</td>"
						tablacontenido +="<td data-label= 'Empleado'>"+datos[i].NombreEmpleado+"</td>"
						if(datos[i].TipoPlatillo == "3"){
							tablacontenido +="<td data-label= 'Tipo de Platillo' style='display:none;'>Platillo Unico</td>"
						}
						tablacontenido +="<td data-label= 'Total Platillos' id='numero_platillos_"+datos[i].NoEmpleado+"'></td>"
						tablacontenido +="<td data-label= 'Total Pagar' id='total_pagar_"+datos[i].NoEmpleado+"'></td>"	
						switch (datos[i]['Ubicacion']) {
							case 1:
								tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Torre TOP</td>"
							break;

							case 2:
								tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Apodaca</td>"
							break;

							case 3:
								tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Cienega</td>"
							break;
						
							default:
								tablacontenido +="<td data-label= 'Ubicación' style='display:none;'></td>"
							break;
						}
						tablacontenido += "<td data-label= 'FechaPedido' style='display:none;'>"+datos[i].FechaPedido+"</td>"
						if (datos[i].EstatusEnviado == 1) {
							tablacontenido += "<td data-label= 'Estatus Enviado' >Pendiente por Procesar</td>"
						}else if (datos[i].EstatusEnviado == 2) {
							tablacontenido += "<td data-label= 'Estatus Enviado' >Procesado</td>"
						}
						tablacontenido += "<td data-label= 'Acciones' ><button id='boton_ver_detalles_comida' type='button' data-toggle='modal' data-target='#modal_detalles' class='btn btn-primary' onclick='boton_ver_detalles_comida("+datos[i].NoEmpleado+")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>"
						tablacontenido +="</tr>";
						$('#ContenidoListados').append(tablacontenido);	
					}
					if (numero_empleado != datos[i].NoEmpleado) {
						suma_platillos = datos[i].NoPlatillo;
						total_pagar_platillos_comida = datos[i].Total;
						$("#numero_platillos_"+datos[i].NoEmpleado).html(datos[i].NoPlatillo);
						$("#total_pagar_"+datos[i].NoEmpleado).html('$'+total_pagar_platillos_comida);
					}else{
						suma_platillos += Number(datos[i].NoPlatillo);
						total_pagar_platillos_comida += Number(datos[i].Total);
						$("#numero_platillos_"+datos[i].NoEmpleado).html(suma_platillos);
						$("#total_pagar_"+datos[i].NoEmpleado).html('$'+total_pagar_platillos_comida);
					}
					numero_empleado = datos[i].NoEmpleado;
				}	
			}else if (data.estatus == "error_fecha") {
				Swal.fire( 
					data.Mensaje,
					'',
					'info'
				);
				$("#loading_comedor").hide();
				$("#EspacioTabla").hide();
				$("#div_tabla").hide();
				$("#boton_descarga_excel_comedor").hide();
			}else{
				Swal.fire( 
					"No coincide el número de empleado con ningun registro",
					'',
					'info'
				);
				$("#loading_comedor").hide();
				$("#EspacioTabla").hide();
				$("#div_tabla").hide();
				$("#boton_descarga_excel_comedor").hide();
			}
		}
	});
});

$("#txtNumeroEmpleado_green_spot").on('change',function(e){
	datos_green_spot = '';
	numero_empleado_green_spot = 0;
	num_orden = 0;
	let Fecha = $("#txtFechaSeleccionado").val(),
	numero_empleado_green_spot_filtrado = $(this).val().toLowerCase();
	let ID = "";
	let RowID = 0;
	regex = /^[a-zA-Z ]+$/;
	this.value = (this.value + '').replace(/[^0-9]/g, '');
	if (regex.test(numero_empleado_green_spot_filtrado)) {
		return;
	}
	if (Fecha == "") {
		Swal.fire( 
			"El campo fecha no puede ir vació",
			'',
			'info'
		);
		return;
	}
	if (numero_empleado_green_spot_filtrado.length <= 3 && numero_empleado_green_spot_filtrado != '') {
		return;	
	}
	let formData = new FormData(document.getElementById("form_comedor_conciliados"));
  	formData.append("dato", "valor");
	formData.append("numero_empleado", numero_empleado_green_spot_filtrado);
	formData.append("param", 14);
	$("#EspacioTabla_green_spot").hide();
	$("#boton_descarga_excel_comedor").hide();
	$("#boton_descarga_excel_green").hide();
	$("#boton_descarga_excel_green_procesadas").hide();
	$("#boton_descarga_excel_comedor_conciliados").hide();
	$("#filtros_plato_express").hide();
	$("#filtros_plato_express_conciliados").hide();
	$("#filtros_green_spot_procesadas").hide();
	$("#div_tabla_green_spot").show();
	$("#loading_comedor_green_spot").show();
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: formData,
		dataType: "html",
		cache: false,
		contentType: false,
		processData: false,
		success: function(result) {
			let data = JSON.parse(result);
			if (data.estatus == "success") {
				$("#loading_comedor_green_spot").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").hide();
				$("#boton_descarga_excel_green").show();
				$("#EspacioTabla_green_spot").show();
				$("#ContenidoListados_green_spot").find("tr").remove();
				datos_green_spot = data.data;
				for(var i=0; i < datos_green_spot.length; i++){
					if (numero_empleado_green_spot != datos_green_spot[i].NoEmpleado){
						if(ID != datos_green_spot[i].IdPedido){
							ID = datos_green_spot[i].IdPedido;
							var tablacontenido ="<tr>";
							tablacontenido +="<td  id='IDPedido"+datos_green_spot[i].IdPedido+"' data-label= 'No. Orden' style='display:none;'>"+datos_green_spot[i].IdPedido+"</td>"
							tablacontenido +="<td  id='IDNoEmpleado"+datos_green_spot[i].IdPedido+"' data-label= 'No. Empleado'>"+datos_green_spot[i].NoEmpleado+"</td>"
							tablacontenido +="<td  id='IDNomEmpleado"+datos_green_spot[i].IdPedido+"'' data-label= 'Empleado'>"+datos_green_spot[i].NombreEmpleado+"</td>"
							tablacontenido +="<td data-label= 'Total Platillos' id='total_platillos_gs_"+datos_green_spot[i].NoEmpleado+"'></td>"
							tablacontenido +="<td data-label= 'Platillo' style='display:none;'>"+datos_green_spot[i].Platillo+"</td>"
							tablacontenido +="<td data-label= 'Kcal' style='display:none;'>"+datos_green_spot[i].Kcal+"</td>"
							tablacontenido +="<td data-label= 'Precio' style='display:none;'>"+parseFloat(datos_green_spot[i].Precio).toFixed(2)+"</td>"
							tablacontenido +="<td data-label= 'Total' style='display:none;'>"+parseFloat(datos_green_spot[i].total).toFixed(2)+"</td>"
							tablacontenido +="<td data-label= 'Total Pagar' id='total_platillos_precio_"+datos_green_spot[i].NoEmpleado+"'></td>"
							switch (datos_green_spot[i]['Ubicacion']) {
								case 1:
									tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Torre TOP</td>"
								break;
	
								case 2:
									tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Apodaca</td>"
								break;
	
								case 3:
									tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Cienega</td>"
								break;
							
								default:
									tablacontenido +="<td data-label= 'Ubicación' style='display:none;'></td>"
								break;
							}
							tablacontenido += "<td data-label= 'FechaPedido' style='display:none;'>"+datos_green_spot[i].FechaPedido+"</td>"
							if (datos_green_spot[i].EstatusEnviado == 1) {
								tablacontenido += "<td data-label= 'Estatus Enviado' >Pendiente por Procesar</td>"
							}else if (datos_green_spot[i].EstatusEnviado == 2) {
								tablacontenido += "<td data-label= 'Estatus Enviado' >Procesado</td>"
							}else{
								tablacontenido += "<td data-label= 'Estatus Enviado' ></td>"
							}

							tablacontenido += "<td data-label= 'Acciones' ><button id='boton_ver_detalles' type='button' data-toggle='modal' data-target='#modal_detalles' class='btn btn-primary' onclick='boton_ver_detalles_desayunos("+datos_green_spot[i].NoEmpleado+")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>"
							tablacontenido +="</tr>";
							$('#ContenidoListados_green_spot').append(tablacontenido);
							RowID = 0;
							num_orden = datos_green_spot[i].IdPedido;
						}else{
							RowID= RowID +1;
							var RowFinal = RowID +1;
							$("#IDPedido" +datos_green_spot[i].IdPedido ).attr('rowspan', RowFinal);
							$("#IDNoEmpleado" +datos_green_spot[i].IdPedido ).attr('rowspan', RowFinal);
							$("#IDNomEmpleado" +datos_green_spot[i].IdPedido ).attr('rowspan', RowFinal);
							var tablacontenidoD ="<tr><td data-label= 'Total Platillos'></td>"
							tablacontenidoD +="<td data-label= 'Platillo' style='display:none;'>"+datos_green_spot[i].Platillo+"</td>"
							tablacontenidoD +="<td data-label= 'Kcal' style='display:none;'>"+datos_green_spot[i].Kcal+"</td>"
							tablacontenidoD +="<td data-label= 'Precio' style='display:none;'>"+parseFloat(datos_green_spot[i].Precio).toFixed(2)+"</td>"
							tablacontenidoD +="<td data-label= 'Total' style='display:none;'>"+parseFloat(datos_green_spot[i].total).toFixed(2)+"</td>"
							tablacontenidoD +="<td data-label= 'Total Pagar'></td>"
							tablacontenidoD +="<td data-label= 'Ubicación'></td>"
							tablacontenidoD +="<td data-label= 'Estatus'></td></tr>"
							$('#ContenidoListados_green_spot').append(tablacontenidoD);
						}
					}
					if (numero_empleado_green_spot != datos_green_spot[i].NoEmpleado) {
						suma_platillos_gs_co = datos_green_spot[i].NoPlatillo;
						total_pagar_platillos_desco = datos_green_spot[i].total;
						$("#total_platillos_gs_"+datos_green_spot[i].NoEmpleado).html(datos_green_spot[i].NoPlatillo);
						$("#total_platillos_precio_"+datos_green_spot[i].NoEmpleado).html('$'+total_pagar_platillos_desco);
					}else{
						suma_platillos_gs_co += Number(datos_green_spot[i].NoPlatillo);
						total_pagar_platillos_desco += Number(datos_green_spot[i].total);
						$("#total_platillos_gs_"+datos_green_spot[i].NoEmpleado).html(suma_platillos_gs_co);
						$("#total_platillos_precio_"+datos_green_spot[i].NoEmpleado).html('$'+total_pagar_platillos_desco);
					}

					numero_empleado_green_spot = datos_green_spot[i].NoEmpleado;
				}
			}else if (data.estatus == "error_fecha") {
				$("#loading_comedor_green_spot").hide();
				$("#EspacioTabla_green_spot").hide();
				$("#div_tabla_green_spot").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'info'
				);
			}else{
				$("#loading_comedor_green_spot").hide();
				$("#EspacioTabla_green_spot").hide();
				$("#div_tabla_green_spot").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").hide();
				Swal.fire( 
					"No coincide el número de empleado con ningun registro",
					'',
					'error'
				);
			}
		}	
	});
});

$("#txtNumeroConciliacion_plato_express_conciliacion").on('change',function(e){
	datos = '';
	numero_empleado = 0;
	let Fecha = $("#txtFechaSeleccionado").val(),
	numero_conciliacion_filtrado = $(this).val().toLowerCase(),
	procesadas = 2,
	id_conciliacion = 0;
	let ID = "";
	let RowID = 0;
	if (Fecha == "") {
		Swal.fire( 
			"El campo fecha no puede ir vació",
			'',
			'info'
		);
		return;
	}
	if (numero_conciliacion_filtrado.length <= 11 && numero_conciliacion_filtrado != '') {
		return;	
	}
	let formData = new FormData(document.getElementById("form_comedor_conciliados"));
  	formData.append("dato", "valor");
	formData.append("numero_conciliado", numero_conciliacion_filtrado);
	formData.append("param", 17);
	formData.append("estatus_enviado", procesadas);
	formData.append("tipo_comida", 1);
	$("#boton_descarga_excel_green").hide();
	$("#boton_descarga_excel_comedor").hide();
	$("#boton_descarga_excel_green_conciliados").hide();
	$("#boton_descarga_excel_comedor_conciliados").hide();
	$("#filtros_plato_express").hide();
	$("#filtros_green_spot").hide();
	$("#filtros_plato_express_conciliados").hide();
	$("#filtros_green_spot_procesadas").hide();
	$("#EspacioTabla_plato_express_conciliados").hide();
	$("#div_tabla_plato_express_conciliados").show();
	$("#loading_comedor_conciliados").show();
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: formData,
		dataType: "html",
		cache: false,
		contentType: false,
		processData: false,
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus == "success") {
				$("#loading_comedor_conciliados").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_green_spot_procesadas").hide();
				$("#filtros_plato_express_conciliados").show();
				$("#boton_descarga_excel_comedor_conciliados").show();
				$("#EspacioTabla_plato_express_conciliados").show();
				$("#ContenidoListados_plato_express_conciliados").find("tr").remove();
				datos = data.data;
				for(let i = 0; i < datos.length; i++){
					if (id_conciliacion != datos[i].id_conciliacion) {
						let tablacontenido ="<tr>";
						tablacontenido +="<td  data-label= 'Id Conciliacion'>"+datos[i].id_conciliacion+"</td>"
						tablacontenido +="<td data-label= 'Numero Empleado' style='display:none;'>"+datos[i].no_empleado+"</td>"
						tablacontenido +="<td data-label= 'Total Platillos' id='total_platillos_"+datos[i].id_conciliacion+"'>"+datos[i].total_platillos+"</td>"
						tablacontenido +="<td data-label= 'Total Pagar' id='total_pagar_"+datos[i].id_conciliacion+"'>"+datos[i].total_pagar+"</td>"
						tablacontenido +="<td data-label= 'Fecha Conciliado'>"+datos[i].fecha_conciliado+"</td>"
						if (datos[i].estatus == 0) {
							tablacontenido += "<td data-label= 'Estatus Enviado' >Conciliado</td>"
						}
						tablacontenido +=`<td data-label='Acciones'><button id='boton_ver_detalles_comida' type='button' data-toggle='modal' data-target='#modal_detalles_primer' class='btn btn-primary boton_ver_detalles' onclick='boton_ver_detalles_comida_con("${datos[i].id_conciliacion}")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>`;		
					
						$('#ContenidoListados_plato_express_conciliados').append(tablacontenido);	
					}
					if (id_conciliacion != datos[i].id_conciliacion) {
						suma_platillos = datos[i].total_platillos;
						total_pagar_platillos_comida = datos[i].total_pagar;
						$("#total_platillos_"+datos[i].id_conciliacion).html(datos[i].total_platillos);
						$("#total_pagar_"+datos[i].id_conciliacion).html('$'+total_pagar_platillos_comida);
					}else{
						suma_platillos += Number(datos[i].total_platillos);
						total_pagar_platillos_comida += Number(datos[i].total_pagar);
						$("#total_platillos_"+datos[i].id_conciliacion).html(suma_platillos);
						$("#total_pagar_"+datos[i].id_conciliacion).html('$'+total_pagar_platillos_comida);
					}
					id_conciliacion = datos[i].id_conciliacion;
				}
			}else if (data.estatus == "error_fecha") {
				$("#loading_comedor_conciliados").hide();
				$("#EspacioTabla_plato_express_conciliados").hide();
				$("#div_tabla_plato_express_conciliados").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_green_spot_procesadas").hide();
				$("#filtros_plato_express_conciliados").show();
				Swal.fire( 
					data.Mensaje,
					'',
					'info'
				);
			}else{
				$("#loading_comedor_conciliados").hide();
				$("#EspacioTabla_plato_express_conciliados").hide();
				$("#div_tabla_plato_express_conciliados").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_green_spot_procesadas").hide();
				$("#filtros_plato_express_conciliados").show();
				Swal.fire( 
					data.Mensaje,
					'',
					'error'
				);
			}
		}
	});
});

$("#txtNumeroEmpleado_plato_especial_conciliados").on('change',function(e){
	datos_green_spot = '';
	numero_empleado_green_spot = 0;
	num_orden = 0;
	id_conciliacion = 0;
	let Fecha = $("#txtFechaSeleccionado").val(),
	numero_conciliacion_especial_filtrado = $(this).val().toLowerCase(),
	procesadas = 2;
	let ID = "";
	let RowID = 0;
	if (Fecha == "") {
		Swal.fire( 
			"El campo fecha no puede ir vació",
			'',
			'info'
		);
		return;
	}
	if (numero_conciliacion_especial_filtrado.length <= 11 && numero_conciliacion_especial_filtrado != '') {
		return;	
	}
	let formData = new FormData(document.getElementById("form_comedor_conciliados"));
	formData.append("dato", "valor");
	formData.append("numero_conciliado", numero_conciliacion_especial_filtrado);
	formData.append("param", 17);
	formData.append("estatus_enviado", procesadas);
	formData.append("tipo_comida", 2);
	$("#EspacioTabla_green_spot_procesadas").hide();
	$("#boton_descarga_excel_green").hide();
	$("#boton_descarga_excel_comedor").hide();
	$("#boton_descarga_excel_green_procesadas").hide();
	$("#boton_descarga_excel_comedor_conciliados").hide();
	$("#filtros_plato_express").hide();
	$("#filtros_green_spot").hide();
	$("#filtros_plato_express_conciliados").hide();
	$("#filtros_green_spot_procesadas").hide();
	$("#div_tabla_green_spot_procesadas").show();
	$("#loading_comedor_green_spot_procesadas").show();
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: formData,
		dataType: "html",
		cache: false,
		contentType: false,
		processData: false,
		success: function(result) {
			let data = JSON.parse(result);
			if (data.estatus == "success") {
				$("#loading_comedor_green_spot_procesadas").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").show();
				$("#boton_descarga_excel_green_procesadas").show();
				$("#EspacioTabla_green_spot_procesadas").show();
				$("#ContenidoListados_green_spot_procesadas").find("tr").remove();
				datos_green_spot_procesados = data.data;
				for(let i = 0; i < datos_green_spot_procesados.length; i++){
					if (id_conciliacion != datos_green_spot_procesados[i].id_conciliacion) {
						let tablacontenido ="<tr>";
						tablacontenido +="<td  data-label= 'Id Conciliacion'>"+datos_green_spot_procesados[i].id_conciliacion+"</td>"
						tablacontenido +="<td data-label= 'Numero Empleado' style='display:none;'>"+datos_green_spot_procesados[i].no_empleado+"</td>"
						tablacontenido +="<td data-label= 'Total Platillos' id='total_platillos_gs_"+datos_green_spot_procesados[i].id_conciliacion+"'></td>"
						tablacontenido +="<td data-label= 'Total Pagar' id='total_pagar_gs_"+datos_green_spot_procesados[i].id_conciliacion+"'></td>"
						tablacontenido +="<td data-label= 'Fecha Conciliado'>"+datos_green_spot_procesados[i].fecha_conciliado+"</td>"
						if (datos_green_spot_procesados[i].estatus == 0) {
							tablacontenido += "<td data-label= 'Estatus Enviado' >Conciliado</td>"
						}
						tablacontenido +=`<td data-label='Acciones'><button id='boton_ver_detalles_comida' type='button' data-toggle='modal' data-target='#modal_detalles_primer' class='btn btn-primary boton_ver_detalles' onclick='boton_ver_detalles_desayunos_con("${datos_green_spot_procesados[i].id_conciliacion}")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>`;		
					
						$('#ContenidoListados_green_spot_procesadas').append(tablacontenido);	
					}
					if (id_conciliacion != datos_green_spot_procesados[i].id_conciliacion) {
						suma_platillos = datos_green_spot_procesados[i].total_platillos;
						total_pagar_platillos_comida = datos_green_spot_procesados[i].total_pagar;
						$("#total_platillos_gs_"+datos_green_spot_procesados[i].id_conciliacion).html(datos_green_spot_procesados[i].total_platillos);
						$("#total_pagar_gs_"+datos_green_spot_procesados[i].id_conciliacion).html('$'+total_pagar_platillos_comida);
					}else{
						suma_platillos += Number(datos_green_spot_procesados[i].total_platillos);
						total_pagar_platillos_comida += Number(datos_green_spot_procesados[i].total_pagar);
						$("#total_platillos_gs_"+datos_green_spot_procesados[i].id_conciliacion).html(suma_platillos);
						$("#total_pagar_gs_"+datos_green_spot_procesados[i].id_conciliacion).html('$'+total_pagar_platillos_comida);
					}
					id_conciliacion = datos_green_spot_procesados[i].id_conciliacion;
				}
			}else if (data.estatus == "error_fecha") {
				$("#loading_comedor_green_spot_procesadas").hide();
				$("#EspacioTabla_green_spot_procesadas").hide();
				$("#div_tabla_green_spot_procesadas").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").show();
				Swal.fire( 
					data.Mensaje,
					'',
					'info'
				);
			}else{
				$("#loading_comedor_green_spot_procesadas").hide();
				$("#EspacioTabla_green_spot_procesadas").hide();
				$("#div_tabla_green_spot_procesadas").hide();
				$("#boton_descarga_excel_green").hide();
				$("#boton_descarga_excel_comedor").hide();
				$("#boton_descarga_excel_green_procesadas").hide();
				$("#boton_descarga_excel_comedor_conciliados").hide();
				$("#filtros_plato_express").hide();
				$("#filtros_green_spot").hide();
				$("#filtros_plato_express_conciliados").hide();
				$("#filtros_green_spot_procesadas").show();
				Swal.fire( 
					data.Mensaje+' green spot',
					'',
					'error'
				);
			}
		}	
	});
});

// $("#txtNumeroEmpleado_plato_express").on("keyup", function() {
// 	datos = '';
// 	numero_empleado = 0;
// 	let Fecha = $("#txtFechaSeleccionado").val(),
// 	numero_empleado_filtrado = $(this).val().toLowerCase();
// 	regex = /^[a-zA-Z ]+$/;
// 	this.value = (this.value + '').replace(/[^0-9]/g, '');
// 	if (regex.test(numero_empleado_filtrado)) {
// 		return;
// 	}
// 	if (Fecha == "") {
// 		Swal.fire( 
// 			"El campo fecha no puede ir vació",
// 			'',
// 			'info'
// 		);
// 		return;
// 	}
// 	if (numero_empleado_filtrado.length <= 3 && numero_empleado_filtrado != '') {
// 		return false;	
// 	}	
// 	let formData = new FormData(document.getElementById("form_comedor_conciliados"));
//   	formData.append("dato", "valor");
// 	formData.append("numero_empleado", numero_empleado_filtrado);
// 	formData.append("param", 13);
// 	$("#boton_descarga_excel_green").hide();
// 	$("#EspacioTabla").hide();
// 	$("#div_tabla").show();
// 	$("#loading_comedor").show();
// 	$.ajax({
// 		url: "../../utileria.php",
// 		type: "post",
// 		data: formData,
// 		dataType: "html",
// 		cache: false,
// 		contentType: false,
// 		processData: false,
// 		success: function(result) {
// 			data = JSON.parse(result);
// 			if (data.estatus == "success") {
// 				$("#loading_comedor").hide();
// 				$("#boton_descarga_excel_comedor").show();
// 				$("#EspacioTabla").show();
// 				$("#ContenidoListados").find("tr").remove();
// 				datos = data.data;
// 				for(let i = 0; i < datos.length; i++){
// 					if (numero_empleado != datos[i].NoEmpleado) {
// 						let tablacontenido ="<tr>";
// 						tablacontenido +="<td  data-label= 'No. Orden' style='display:none;'>"+datos[i].IdPedido+"</td>"
// 						tablacontenido +="<td  data-label= 'No. Empleado'>"+datos[i].NoEmpleado+"</td>"
// 						tablacontenido +="<td data-label= 'Empleado'>"+datos[i].NombreEmpleado+"</td>"
// 						if(datos[i].TipoPlatillo == "3"){
// 							tablacontenido +="<td data-label= 'Tipo de Platillo' style='display:none;'>Platillo Unico</td>"
// 						}
// 						tablacontenido +="<td data-label= 'Total Platillos' id='numero_platillos_"+datos[i].NoEmpleado+"'></td>"
// 						tablacontenido +="<td data-label= 'Total Pagar' id='total_pagar_"+datos[i].NoEmpleado+"'></td>"	
// 						switch (datos[i]['Ubicacion']) {
// 							case 1:
// 								tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Torre TOP</td>"
// 							break;

// 							case 2:
// 								tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Apodaca</td>"
// 							break;

// 							case 3:
// 								tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Cienega</td>"
// 							break;
						
// 							default:
// 								tablacontenido +="<td data-label= 'Ubicación' style='display:none;'></td>"
// 							break;
// 						}
// 						tablacontenido += "<td data-label= 'FechaPedido' style='display:none;'>"+datos[i].FechaPedido+"</td>"
// 						if (datos[i].EstatusEnviado == 1) {
// 							tablacontenido += "<td data-label= 'Estatus Enviado' >Pendiente por Procesar</td>"
// 						}else if (datos[i].EstatusEnviado == 2) {
// 							tablacontenido += "<td data-label= 'Estatus Enviado' >Procesado</td>"
// 						}
// 						tablacontenido += "<td data-label= 'Acciones' ><button id='boton_ver_detalles_comida' type='button' data-toggle='modal' data-target='#modal_detalles' class='btn btn-primary' onclick='boton_ver_detalles_comida("+datos[i].NoEmpleado+")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>"
// 						tablacontenido +="</tr>";
// 						$('#ContenidoListados').append(tablacontenido);	
// 					}
// 					if (numero_empleado != datos[i].NoEmpleado) {
// 						suma_platillos = datos[i].NoPlatillo;
// 						total_pagar_platillos_comida = datos[i].Total;
// 						$("#numero_platillos_"+datos[i].NoEmpleado).html(datos[i].NoPlatillo);
// 						$("#total_pagar_"+datos[i].NoEmpleado).html('$'+total_pagar_platillos_comida);
// 					}else{
// 						suma_platillos += Number(datos[i].NoPlatillo);
// 						total_pagar_platillos_comida += Number(datos[i].Total);
// 						$("#numero_platillos_"+datos[i].NoEmpleado).html(suma_platillos);
// 						$("#total_pagar_"+datos[i].NoEmpleado).html('$'+total_pagar_platillos_comida);
// 					}
// 					numero_empleado = datos[i].NoEmpleado;
// 				}	
// 			}else if (data.estatus == "error_fecha") {
// 				Swal.fire( 
// 					data.Mensaje,
// 					'',
// 					'info'
// 				);
// 				$("#loading_comedor").hide();
// 				$("#EspacioTabla").hide();
// 				$("#div_tabla").hide();
// 				$("#boton_descarga_excel_comedor").hide();
// 			}else{
// 				Swal.fire( 
// 					"No coincide el número de empleado con ningun registro",
// 					'',
// 					'info'
// 				);
// 				$("#loading_comedor").hide();
// 				$("#EspacioTabla").hide();
// 				$("#div_tabla").hide();
// 				$("#boton_descarga_excel_comedor").hide();
// 			}
// 		}
// 	});
// });

// $("#txtNumeroEmpleado_green_spot").on("keyup", function() {
// 	datos_green_spot = '';
// 	numero_empleado_green_spot = 0;
// 	num_orden = 0;
// 	let Fecha = $("#txtFechaSeleccionado").val(),
// 	numero_empleado_green_spot_filtrado = $(this).val().toLowerCase();
// 	let ID = "";
// 	let RowID = 0;
// 	regex = /^[a-zA-Z ]+$/;
// 	this.value = (this.value + '').replace(/[^0-9]/g, '');
// 	if (regex.test(numero_empleado_green_spot_filtrado)) {
// 		return;
// 	}
// 	if (Fecha == "") {
// 		Swal.fire( 
// 			"El campo fecha no puede ir vació",
// 			'',
// 			'info'
// 		);
// 		return;
// 	}
// 	if (numero_empleado_green_spot_filtrado.length <= 3 && numero_empleado_green_spot_filtrado != '') {
// 		return;	
// 	}
// 	let formData = new FormData(document.getElementById("form_comedor_conciliados"));
//   	formData.append("dato", "valor");
// 	formData.append("numero_empleado", numero_empleado_green_spot_filtrado);
// 	formData.append("param", 14);
// 	$("#EspacioTabla_green_spot").hide();
// 	$("#boton_descarga_excel_comedor").hide();
// 	$("#boton_descarga_excel_green").hide();
// 	$("#boton_descarga_excel_green_procesadas").hide();
// 	$("#boton_descarga_excel_comedor_conciliados").hide();
// 	$("#filtros_plato_express").hide();
// 	$("#filtros_plato_express_conciliados").hide();
// 	$("#filtros_green_spot_procesadas").hide();
// 	$("#div_tabla_green_spot").show();
// 	$("#loading_comedor_green_spot").show();
// 	$.ajax({
// 		url: "../../utileria.php",
// 		type: "post",
// 		data: formData,
// 		dataType: "html",
// 		cache: false,
// 		contentType: false,
// 		processData: false,
// 		success: function(result) {
// 			let data = JSON.parse(result);
// 			if (data.estatus == "success") {
// 				$("#loading_comedor_green_spot").hide();
// 				$("#boton_descarga_excel_comedor").hide();
// 				$("#boton_descarga_excel_green_procesadas").hide();
// 				$("#boton_descarga_excel_comedor_conciliados").hide();
// 				$("#filtros_plato_express").hide();
// 				$("#filtros_plato_express_conciliados").hide();
// 				$("#filtros_green_spot_procesadas").hide();
// 				$("#boton_descarga_excel_green").show();
// 				$("#EspacioTabla_green_spot").show();
// 				$("#ContenidoListados_green_spot").find("tr").remove();
// 				datos_green_spot = data.data;
// 				for(var i=0; i < datos_green_spot.length; i++){
// 					if (numero_empleado_green_spot != datos_green_spot[i].NoEmpleado){
// 						if(ID != datos_green_spot[i].IdPedido){
// 							ID = datos_green_spot[i].IdPedido;
// 							var tablacontenido ="<tr>";
// 							tablacontenido +="<td  id='IDPedido"+datos_green_spot[i].IdPedido+"' data-label= 'No. Orden' style='display:none;'>"+datos_green_spot[i].IdPedido+"</td>"
// 							tablacontenido +="<td  id='IDNoEmpleado"+datos_green_spot[i].IdPedido+"' data-label= 'No. Empleado'>"+datos_green_spot[i].NoEmpleado+"</td>"
// 							tablacontenido +="<td  id='IDNomEmpleado"+datos_green_spot[i].IdPedido+"'' data-label= 'Empleado'>"+datos_green_spot[i].NombreEmpleado+"</td>"
// 							tablacontenido +="<td data-label= 'Total Platillos' id='total_platillos_gs_"+datos_green_spot[i].NoEmpleado+"'></td>"
// 							tablacontenido +="<td data-label= 'Platillo' style='display:none;'>"+datos_green_spot[i].Platillo+"</td>"
// 							tablacontenido +="<td data-label= 'Kcal' style='display:none;'>"+datos_green_spot[i].Kcal+"</td>"
// 							tablacontenido +="<td data-label= 'Precio' style='display:none;'>"+parseFloat(datos_green_spot[i].Precio).toFixed(2)+"</td>"
// 							tablacontenido +="<td data-label= 'Total' style='display:none;'>"+parseFloat(datos_green_spot[i].total).toFixed(2)+"</td>"
// 							tablacontenido +="<td data-label= 'Total Pagar' id='total_platillos_precio_"+datos_green_spot[i].NoEmpleado+"'></td>"
// 							switch (datos_green_spot[i]['Ubicacion']) {
// 								case 1:
// 									tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Torre TOP</td>"
// 								break;
	
// 								case 2:
// 									tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Apodaca</td>"
// 								break;
	
// 								case 3:
// 									tablacontenido +="<td data-label= 'Ubicación' style='display:none;'>Cienega</td>"
// 								break;
							
// 								default:
// 									tablacontenido +="<td data-label= 'Ubicación' style='display:none;'></td>"
// 								break;
// 							}
// 							tablacontenido += "<td data-label= 'FechaPedido' style='display:none;'>"+datos_green_spot[i].FechaPedido+"</td>"
// 							if (datos_green_spot[i].EstatusEnviado == 1) {
// 								tablacontenido += "<td data-label= 'Estatus Enviado' >Pendiente por Procesar</td>"
// 							}else if (datos_green_spot[i].EstatusEnviado == 2) {
// 								tablacontenido += "<td data-label= 'Estatus Enviado' >Procesado</td>"
// 							}else{
// 								tablacontenido += "<td data-label= 'Estatus Enviado' ></td>"
// 							}

// 							tablacontenido += "<td data-label= 'Acciones' ><button id='boton_ver_detalles' type='button' data-toggle='modal' data-target='#modal_detalles' class='btn btn-primary' onclick='boton_ver_detalles_desayunos("+datos_green_spot[i].NoEmpleado+")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>"
// 							tablacontenido +="</tr>";
// 							$('#ContenidoListados_green_spot').append(tablacontenido);
// 							RowID = 0;
// 							num_orden = datos_green_spot[i].IdPedido;
// 						}else{
// 							RowID= RowID +1;
// 							var RowFinal = RowID +1;
// 							$("#IDPedido" +datos_green_spot[i].IdPedido ).attr('rowspan', RowFinal);
// 							$("#IDNoEmpleado" +datos_green_spot[i].IdPedido ).attr('rowspan', RowFinal);
// 							$("#IDNomEmpleado" +datos_green_spot[i].IdPedido ).attr('rowspan', RowFinal);
// 							var tablacontenidoD ="<tr><td data-label= 'Total Platillos'></td>"
// 							tablacontenidoD +="<td data-label= 'Platillo' style='display:none;'>"+datos_green_spot[i].Platillo+"</td>"
// 							tablacontenidoD +="<td data-label= 'Kcal' style='display:none;'>"+datos_green_spot[i].Kcal+"</td>"
// 							tablacontenidoD +="<td data-label= 'Precio' style='display:none;'>"+parseFloat(datos_green_spot[i].Precio).toFixed(2)+"</td>"
// 							tablacontenidoD +="<td data-label= 'Total' style='display:none;'>"+parseFloat(datos_green_spot[i].total).toFixed(2)+"</td>"
// 							tablacontenidoD +="<td data-label= 'Total Pagar'></td>"
// 							tablacontenidoD +="<td data-label= 'Ubicación'></td>"
// 							tablacontenidoD +="<td data-label= 'Estatus'></td></tr>"
// 							$('#ContenidoListados_green_spot').append(tablacontenidoD);
// 						}
// 					}
// 					if (numero_empleado_green_spot != datos_green_spot[i].NoEmpleado) {
// 						suma_platillos_gs_co = datos_green_spot[i].NoPlatillo;
// 						total_pagar_platillos_desco = datos_green_spot[i].total;
// 						$("#total_platillos_gs_"+datos_green_spot[i].NoEmpleado).html(datos_green_spot[i].NoPlatillo);
// 						$("#total_platillos_precio_"+datos_green_spot[i].NoEmpleado).html('$'+total_pagar_platillos_desco);
// 					}else{
// 						suma_platillos_gs_co += Number(datos_green_spot[i].NoPlatillo);
// 						total_pagar_platillos_desco += Number(datos_green_spot[i].total);
// 						$("#total_platillos_gs_"+datos_green_spot[i].NoEmpleado).html(suma_platillos_gs_co);
// 						$("#total_platillos_precio_"+datos_green_spot[i].NoEmpleado).html('$'+total_pagar_platillos_desco);
// 					}

// 					numero_empleado_green_spot = datos_green_spot[i].NoEmpleado;
// 				}
// 			}else if (data.estatus == "error_fecha") {
// 				$("#loading_comedor_green_spot").hide();
// 				$("#EspacioTabla_green_spot").hide();
// 				$("#div_tabla_green_spot").hide();
// 				$("#boton_descarga_excel_green").hide();
// 				$("#boton_descarga_excel_comedor").hide();
// 				$("#boton_descarga_excel_green_procesadas").hide();
// 				$("#boton_descarga_excel_comedor_conciliados").hide();
// 				$("#filtros_plato_express").hide();
// 				$("#filtros_plato_express_conciliados").hide();
// 				$("#filtros_green_spot_procesadas").hide();
// 				Swal.fire( 
// 					data.Mensaje,
// 					'',
// 					'info'
// 				);
// 			}else{
// 				$("#loading_comedor_green_spot").hide();
// 				$("#EspacioTabla_green_spot").hide();
// 				$("#div_tabla_green_spot").hide();
// 				$("#boton_descarga_excel_green").hide();
// 				$("#boton_descarga_excel_comedor").hide();
// 				$("#boton_descarga_excel_green_procesadas").hide();
// 				$("#boton_descarga_excel_comedor_conciliados").hide();
// 				$("#filtros_plato_express").hide();
// 				$("#filtros_plato_express_conciliados").hide();
// 				$("#filtros_green_spot_procesadas").hide();
// 				Swal.fire( 
// 					data.Mensaje+' green spot',
// 					'',
// 					'error'
// 				);
// 			}
// 		}	
// 	});
// });

// $("#txtNumeroConciliacion_plato_express_conciliacion").on("keyup", function() {
// 	datos = '';
// 	numero_empleado = 0;
// 	let Fecha = $("#txtFechaSeleccionado").val(),
// 	numero_conciliacion_filtrado = $(this).val().toLowerCase(),
// 	procesadas = 2,
// 	id_conciliacion = 0;
// 	let ID = "";
// 	let RowID = 0;
// 	if (Fecha == "") {
// 		Swal.fire( 
// 			"El campo fecha no puede ir vació",
// 			'',
// 			'info'
// 		);
// 		return;
// 	}
// 	if (numero_conciliacion_filtrado.length <= 11 && numero_conciliacion_filtrado != '') {
// 		return;	
// 	}
// 	let formData = new FormData(document.getElementById("form_comedor_conciliados"));
//   	formData.append("dato", "valor");
// 	formData.append("numero_conciliado", numero_conciliacion_filtrado);
// 	formData.append("param", 17);
// 	formData.append("estatus_enviado", procesadas);
// 	formData.append("tipo_comida", 1);
// 	$("#boton_descarga_excel_green").hide();
// 	$("#boton_descarga_excel_comedor").hide();
// 	$("#boton_descarga_excel_green_conciliados").hide();
// 	$("#boton_descarga_excel_comedor_conciliados").hide();
// 	$("#filtros_plato_express").hide();
// 	$("#filtros_green_spot").hide();
// 	$("#filtros_plato_express_conciliados").hide();
// 	$("#filtros_green_spot_procesadas").hide();
// 	$("#EspacioTabla_plato_express_conciliados").hide();
// 	$("#div_tabla_plato_express_conciliados").show();
// 	$("#loading_comedor_conciliados").show();
// 	$.ajax({
// 		url: "../../utileria.php",
// 		type: "post",
// 		data: formData,
// 		dataType: "html",
// 		cache: false,
// 		contentType: false,
// 		processData: false,
// 		success: function(result) {
// 			data = JSON.parse(result);
// 			if (data.estatus == "success") {
// 				$("#loading_comedor_conciliados").hide();
// 				$("#boton_descarga_excel_green").hide();
// 				$("#boton_descarga_excel_comedor").hide();
// 				$("#boton_descarga_excel_green_procesadas").hide();
// 				$("#filtros_plato_express").hide();
// 				$("#filtros_green_spot").hide();
// 				$("#filtros_green_spot_procesadas").hide();
// 				$("#filtros_plato_express_conciliados").show();
// 				$("#boton_descarga_excel_comedor_conciliados").show();
// 				$("#EspacioTabla_plato_express_conciliados").show();
// 				$("#ContenidoListados_plato_express_conciliados").find("tr").remove();
// 				datos = data.data;
// 				for(let i = 0; i < datos.length; i++){
// 					if (id_conciliacion != datos[i].id_conciliacion) {
// 						let tablacontenido ="<tr>";
// 						tablacontenido +="<td  data-label= 'Id Conciliacion'>"+datos[i].id_conciliacion+"</td>"
// 						tablacontenido +="<td data-label= 'Numero Empleado' style='display:none;'>"+datos[i].no_empleado+"</td>"
// 						tablacontenido +="<td data-label= 'Total Platillos' id='total_platillos_"+datos[i].id_conciliacion+"'>"+datos[i].total_platillos+"</td>"
// 						tablacontenido +="<td data-label= 'Total Pagar' id='total_pagar_"+datos[i].id_conciliacion+"'>"+datos[i].total_pagar+"</td>"
// 						tablacontenido +="<td data-label= 'Fecha Conciliado'>"+datos[i].fecha_conciliado+"</td>"
// 						if (datos[i].estatus == 0) {
// 							tablacontenido += "<td data-label= 'Estatus Enviado' >Conciliado</td>"
// 						}
// 						tablacontenido +=`<td data-label='Acciones'><button id='boton_ver_detalles_comida' type='button' data-toggle='modal' data-target='#modal_detalles_primer' class='btn btn-primary boton_ver_detalles' onclick='boton_ver_detalles_comida_con("${datos[i].id_conciliacion}")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>`;		
					
// 						$('#ContenidoListados_plato_express_conciliados').append(tablacontenido);	
// 					}
// 					if (id_conciliacion != datos[i].id_conciliacion) {
// 						suma_platillos = datos[i].total_platillos;
// 						total_pagar_platillos_comida = datos[i].total_pagar;
// 						$("#total_platillos_"+datos[i].id_conciliacion).html(datos[i].total_platillos);
// 						$("#total_pagar_"+datos[i].id_conciliacion).html('$'+total_pagar_platillos_comida);
// 					}else{
// 						suma_platillos += Number(datos[i].total_platillos);
// 						total_pagar_platillos_comida += Number(datos[i].total_pagar);
// 						$("#total_platillos_"+datos[i].id_conciliacion).html(suma_platillos);
// 						$("#total_pagar_"+datos[i].id_conciliacion).html('$'+total_pagar_platillos_comida);
// 					}
// 					id_conciliacion = datos[i].id_conciliacion;
// 				}
// 			}else if (data.estatus == "error_fecha") {
// 				$("#loading_comedor_conciliados").hide();
// 				$("#EspacioTabla_plato_express_conciliados").hide();
// 				$("#div_tabla_plato_express_conciliados").hide();
// 				$("#boton_descarga_excel_green").hide();
// 				$("#boton_descarga_excel_comedor").hide();
// 				$("#boton_descarga_excel_green_procesadas").hide();
// 				$("#boton_descarga_excel_comedor_conciliados").hide();
// 				$("#filtros_plato_express").hide();
// 				$("#filtros_green_spot").hide();
// 				$("#filtros_green_spot_procesadas").hide();
// 				$("#filtros_plato_express_conciliados").show();
// 				Swal.fire( 
// 					data.Mensaje,
// 					'',
// 					'info'
// 				);
// 			}else{
// 				$("#loading_comedor_conciliados").hide();
// 				$("#EspacioTabla_plato_express_conciliados").hide();
// 				$("#div_tabla_plato_express_conciliados").hide();
// 				$("#boton_descarga_excel_green").hide();
// 				$("#boton_descarga_excel_comedor").hide();
// 				$("#boton_descarga_excel_green_procesadas").hide();
// 				$("#boton_descarga_excel_comedor_conciliados").hide();
// 				$("#filtros_plato_express").hide();
// 				$("#filtros_green_spot").hide();
// 				$("#filtros_green_spot_procesadas").hide();
// 				$("#filtros_plato_express_conciliados").show();
// 				Swal.fire( 
// 					data.Mensaje,
// 					'',
// 					'error'
// 				);
// 			}
// 		}
// 	});
// });

function txtNumeroEmpleado_detalle_conciliada(){
	datos = '';
	numero_empleado = 0;
	let Fecha = $("#txtFechaSeleccionado").val(),
	numero_empleado_detalle_conciliado_filtrado = $("#txtNumeroEmpleado_detalle_conciliada").val().toLowerCase(),
	procesadas = 2,
	numero_conciliado = $("#numero_conciliacion").val();
	let ID = "";
	let RowID = 0;
	regex = /^[a-zA-Z ]+$/;
	this.value = (this.value + '').replace(/[^0-9]/g, '');
	if (regex.test(numero_empleado_detalle_conciliado_filtrado)) {
		return false;
	}
	if (Fecha == "") {
		Swal.fire( 
			"El campo fecha no puede ir vació",
			'',
			'info'
		);
		return false;
	}
	if (numero_empleado_detalle_conciliado_filtrado.length <= 3 && numero_empleado_detalle_conciliado_filtrado != '') {
		return false;	
	}
	let formData = new FormData(document.getElementById("form_comedor_conciliados"));
  	formData.append("dato", "valor");
	formData.append("numero_empleado", numero_empleado_detalle_conciliado_filtrado);
	formData.append("param", 13);
	formData.append("estatus_enviado", procesadas);
	formData.append("numero_conciliado", numero_conciliado);
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: formData,
		dataType: "html",
		cache: false,
		contentType: false,
		processData: false,
		success: function(result) {
			$("#mostrar_tabla_conciliadas_detalles").html('');
			data = JSON.parse(result);
			if (data.estatus == "success") {
				datos = data.data;
				$("#boton_descarga_excel_comedor_detalle_conciliados").html(`
					<button id="btn_conciliar_comedor_detalle_conciliados" style="display:none;" class="btn btn-primary" onclick="DescargarTablaComedorDetalleConciliados()">Exportar Excel</button>
				`);
				let tbody_detalle_gs_co = '';
				let tabla_detalle_comida_con = `
				<table  id='TablaDetallesComidaConciliado' class='table table-bordered table-hover TablaResponsiva'>
					<thead>
						<tr class='table-header'>
							<th scope='col' style='display:none;'>No. Orden</th>
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
					<tbody id='ContenidoListados_detalle_plato_express_procesadas'>
					</tbody>
				</table>
				`;
				$("#mostrar_tabla_conciliadas_detalles").append(tabla_detalle_comida_con);
				for(let i = 0; i < datos.length; i++){
					if (numero_empleado != datos[i].NoEmpleado) {
						tbody_detalle_gs_co = `
						<tr>
						<td  data-label= 'No. Orden' style='display:none;'>${datos[i].IdPedido}</td>
							<td  data-label= 'No. Empleado'>${datos[i].NoEmpleado}</td>
							<td data-label= 'Empleado'>${datos[i].NombreEmpleado}</td>
							<td data-label= 'Tipo de Platillo' style='display:none;'>
								${nombre_tipo_platillo = datos[i].TipoPlatillo == "3" ? 'Platillo Unico' : ''}
							</td>
							<td data-label= 'Total Platillos' id='numero_platillos_plato_express_conciliados_${datos[i].NoEmpleado}'></td>
							<td data-label= 'Total Pagar' id='total_pagar_comida_expres_conciliados_${datos[i].NoEmpleado}'></td>
							<td data-label= 'Ubicación' style='display:none;'>
								${ nombre_ubicacion = datos[i]['Ubicacion'] == 1 ? 'Torre TOP' : datos[i]['Ubicacion'] == 2 ? 'Apodaca' : datos[i]['Ubicacion'] == 3 ? 'Cienega' : ''}	
							</td>
							<td data-label= 'FechaPedido' style='display:none;'>${datos[i].FechaPedido}</td>
							<td data-label= 'Estatus Enviado' >
								${ nombre_estatus = datos[i].EstatusEnviado == 1 ? 'Pendiente por Procesar' : datos[i].EstatusEnviado == 2 ? 'Procesado' : ''}
							</td>
							<td data-label= 'Acciones' ><button id='boton_ver_detalles' type='button' data-toggle='modal' data-target='#modal_detalles' class='btn btn-primary boton_ver_detalles' onclick='boton_ver_detalles_comida_pro_con(${datos[i].NoEmpleado}, "${numero_conciliado}")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>
						</tr>`;

						$("#ContenidoListados_detalle_plato_express_procesadas").append(tbody_detalle_gs_co);
					}

					if (numero_empleado != datos[i].NoEmpleado) {
						suma_platillos_coex = datos[i].NoPlatillo;
						total_pagar_platillos_coco = datos[i].Total;
						$("#numero_platillos_plato_express_conciliados_"+datos[i].NoEmpleado).html(datos[i].NoPlatillo);
						$("#total_pagar_comida_expres_conciliados_"+datos[i].NoEmpleado).html('$'+total_pagar_platillos_coco);
					}else{
						suma_platillos_coex += Number(datos[i].NoPlatillo);
						total_pagar_platillos_coco += Number(datos[i].Total);
						$("#numero_platillos_plato_express_conciliados_"+datos[i].NoEmpleado).html(suma_platillos_coex);
						$("#total_pagar_comida_expres_conciliados_"+datos[i].NoEmpleado).html('$'+total_pagar_platillos_coco);
					}

					numero_empleado = datos[i].NoEmpleado;
				}

				$("#titulo_modal_conciliado").html('Detalles Comida Conciliada');
				$("#btn_conciliar_comedor_detalle_conciliados").show();	
			}else if (data.estatus == "error_fecha") {
				$("#btn_conciliar_comedor_detalle_conciliados").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'info'
				);
			}else{
				$("#btn_conciliar_comedor_detalle_conciliados").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'error'
				);
			}
		}
	});	
};

// $("#txtNumeroEmpleado_plato_especial_conciliados").on("keyup", function() {
// 	datos_green_spot = '';
// 	numero_empleado_green_spot = 0;
// 	num_orden = 0;
// 	id_conciliacion = 0;
// 	let Fecha = $("#txtFechaSeleccionado").val(),
// 	numero_conciliacion_especial_filtrado = $(this).val().toLowerCase(),
// 	procesadas = 2;
// 	let ID = "";
// 	let RowID = 0;
// 	if (Fecha == "") {
// 		Swal.fire( 
// 			"El campo fecha no puede ir vació",
// 			'',
// 			'info'
// 		);
// 		return;
// 	}
// 	if (numero_conciliacion_especial_filtrado.length <= 11 && numero_conciliacion_especial_filtrado != '') {
// 		return;	
// 	}
// 	let formData = new FormData(document.getElementById("form_comedor_conciliados"));
//   	formData.append("dato", "valor");
// 	formData.append("numero_conciliado", numero_conciliacion_especial_filtrado);
// 	formData.append("param", 17);
// 	formData.append("estatus_enviado", procesadas);
// 	formData.append("tipo_comida", 2);
// 	$("#EspacioTabla_green_spot_procesadas").hide();
// 	$("#boton_descarga_excel_green").hide();
// 	$("#boton_descarga_excel_comedor").hide();
// 	$("#boton_descarga_excel_green_procesadas").hide();
// 	$("#boton_descarga_excel_comedor_conciliados").hide();
// 	$("#filtros_plato_express").hide();
// 	$("#filtros_green_spot").hide();
// 	$("#filtros_plato_express_conciliados").hide();
// 	$("#filtros_green_spot_procesadas").hide();
// 	$("#div_tabla_green_spot_procesadas").show();
// 	$("#loading_comedor_green_spot_procesadas").show();
// 	$.ajax({
// 		url: "../../utileria.php",
// 		type: "post",
// 		data: formData,
// 		dataType: "html",
// 		cache: false,
// 		contentType: false,
// 		processData: false,
// 		success: function(result) {
// 			let data = JSON.parse(result);
// 			if (data.estatus == "success") {
// 				$("#loading_comedor_green_spot_procesadas").hide();
// 				$("#boton_descarga_excel_green").hide();
// 				$("#boton_descarga_excel_comedor").hide();
// 				$("#boton_descarga_excel_comedor_conciliados").hide();
// 				$("#filtros_plato_express").hide();
// 				$("#filtros_green_spot").hide();
// 				$("#filtros_plato_express_conciliados").hide();
// 				$("#filtros_green_spot_procesadas").show();
// 				$("#boton_descarga_excel_green_procesadas").show();
// 				$("#EspacioTabla_green_spot_procesadas").show();
// 				$("#ContenidoListados_green_spot_procesadas").find("tr").remove();
// 				datos_green_spot_procesados = data.data;
// 				for(let i = 0; i < datos_green_spot_procesados.length; i++){
// 					if (id_conciliacion != datos_green_spot_procesados[i].id_conciliacion) {
// 						let tablacontenido ="<tr>";
// 						tablacontenido +="<td  data-label= 'Id Conciliacion'>"+datos_green_spot_procesados[i].id_conciliacion+"</td>"
// 						tablacontenido +="<td data-label= 'Numero Empleado' style='display:none;'>"+datos_green_spot_procesados[i].no_empleado+"</td>"
// 						tablacontenido +="<td data-label= 'Total Platillos' id='total_platillos_gs_"+datos_green_spot_procesados[i].id_conciliacion+"'></td>"
// 						tablacontenido +="<td data-label= 'Total Pagar' id='total_pagar_gs_"+datos_green_spot_procesados[i].id_conciliacion+"'></td>"
// 						tablacontenido +="<td data-label= 'Fecha Conciliado'>"+datos_green_spot_procesados[i].fecha_conciliado+"</td>"
// 						if (datos_green_spot_procesados[i].estatus == 0) {
// 							tablacontenido += "<td data-label= 'Estatus Enviado' >Conciliado</td>"
// 						}
// 						tablacontenido +=`<td data-label='Acciones'><button id='boton_ver_detalles_comida' type='button' data-toggle='modal' data-target='#modal_detalles_primer' class='btn btn-primary boton_ver_detalles' onclick='boton_ver_detalles_desayunos_con("${datos_green_spot_procesados[i].id_conciliacion}")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>`;		
					
// 						$('#ContenidoListados_green_spot_procesadas').append(tablacontenido);	
// 					}
// 					if (id_conciliacion != datos_green_spot_procesados[i].id_conciliacion) {
// 						suma_platillos = datos_green_spot_procesados[i].total_platillos;
// 						total_pagar_platillos_comida = datos_green_spot_procesados[i].total_pagar;
// 						$("#total_platillos_gs_"+datos_green_spot_procesados[i].id_conciliacion).html(datos_green_spot_procesados[i].total_platillos);
// 						$("#total_pagar_gs_"+datos_green_spot_procesados[i].id_conciliacion).html('$'+total_pagar_platillos_comida);
// 					}else{
// 						suma_platillos += Number(datos_green_spot_procesados[i].total_platillos);
// 						total_pagar_platillos_comida += Number(datos_green_spot_procesados[i].total_pagar);
// 						$("#total_platillos_gs_"+datos_green_spot_procesados[i].id_conciliacion).html(suma_platillos);
// 						$("#total_pagar_gs_"+datos_green_spot_procesados[i].id_conciliacion).html('$'+total_pagar_platillos_comida);
// 					}
// 					id_conciliacion = datos_green_spot_procesados[i].id_conciliacion;
// 				}
// 			}else if (data.estatus == "error_fecha") {
// 				$("#loading_comedor_green_spot_procesadas").hide();
// 				$("#EspacioTabla_green_spot_procesadas").hide();
// 				$("#div_tabla_green_spot_procesadas").hide();
// 				$("#boton_descarga_excel_green").hide();
// 				$("#boton_descarga_excel_comedor").hide();
// 				$("#boton_descarga_excel_green_procesadas").hide();
// 				$("#boton_descarga_excel_comedor_conciliados").hide();
// 				$("#filtros_plato_express").hide();
// 				$("#filtros_green_spot").hide();
// 				$("#filtros_plato_express_conciliados").hide();
// 				$("#filtros_green_spot_procesadas").show();
// 				Swal.fire( 
// 					data.Mensaje,
// 					'',
// 					'info'
// 				);
// 			}else{
// 				$("#loading_comedor_green_spot_procesadas").hide();
// 				$("#EspacioTabla_green_spot_procesadas").hide();
// 				$("#div_tabla_green_spot_procesadas").hide();
// 				$("#boton_descarga_excel_green").hide();
// 				$("#boton_descarga_excel_comedor").hide();
// 				$("#boton_descarga_excel_green_procesadas").hide();
// 				$("#boton_descarga_excel_comedor_conciliados").hide();
// 				$("#filtros_plato_express").hide();
// 				$("#filtros_green_spot").hide();
// 				$("#filtros_plato_express_conciliados").hide();
// 				$("#filtros_green_spot_procesadas").show();
// 				Swal.fire( 
// 					data.Mensaje+' green spot',
// 					'',
// 					'error'
// 				);
// 			}
// 		}	
// 	});
// });

function txtNumeroEmpleado_detalle_especial_conciliada(){
	datos_green_spot = '';
	numero_empleado_green_spot = 0;
	num_orden = 0;
	let Fecha = $("#txtFechaSeleccionado").val(),
	numero_empleado_green_spot_procesadas_filtrado = $("#txtNumeroEmpleado_detalle_especial_conciliada").val().toLowerCase(),
	procesadas = 2,
	numero_conciliado = $("#numero_conciliacion").val();
	let ID = "";
	let RowID = 0;
	regex = /^[a-zA-Z ]+$/;
	this.value = (this.value + '').replace(/[^0-9]/g, '');
	if (regex.test(numero_empleado_green_spot_procesadas_filtrado)) {
		return;
	}
	if (Fecha == "") {
		Swal.fire( 
			"El campo fecha no puede ir vació",
			'',
			'info'
		);
		return;
	}
	if (numero_empleado_green_spot_procesadas_filtrado.length <= 3 && numero_empleado_green_spot_procesadas_filtrado != '') {
		return;	
	}
	let formData = new FormData(document.getElementById("form_comedor_conciliados"));
  	formData.append("dato", "valor");
	formData.append("numero_empleado", numero_empleado_green_spot_procesadas_filtrado);
	formData.append("param", 14);
	formData.append("estatus_enviado", procesadas);
	formData.append("numero_conciliado", numero_conciliado);
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: formData,
		dataType: "html",
		cache: false,
		contentType: false,
		processData: false,
		success: function(result) {
			$("#mostrar_tabla_conciliadas_detalles").html('');
			$("#btn_conciliar_comedor_detalle_especial_conciliados").show();
			let data = JSON.parse(result);
			if (data.estatus == "success") {
				datos_green_spot = data.data;
				$("#boton_descarga_excel_comedor_detalle_conciliados").html(`
					<button id="btn_conciliar_comedor_detalle_especial_conciliados" class="btn btn-primary" onclick="DescargarTablaComedorDetalleEspecialConciliados()">Exportar Excel</button>
				`);
				let tbody_detalle_gs_co = '';
				let tabla_detalle_gs_co = `
				<table  id='TablaDetallesComidaEspecialConciliado' class='table table-bordered table-hover TablaResponsiva'>
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
					<tbody id='ContenidoListados_green_spot_conciliados'>
					</tbody>
				</table>
				`;
				$("#mostrar_tabla_conciliadas_detalles").append(tabla_detalle_gs_co);
				for(var i=0; i < datos_green_spot.length; i++){
					if (numero_empleado_green_spot != datos_green_spot[i].NoEmpleado){
						if(ID != datos_green_spot[i].IdPedido){
							ID = datos_green_spot[i].IdPedido;
							tbody_detalle_gs_co = `
							<tr>
								<td  data-label= 'No. Orden' style='display:none;'>${datos_green_spot[i].IdPedido}</td>
								<td  data-label= 'No. Empleado'>${datos_green_spot[i].NoEmpleado}</td>
								<td data-label= 'Empleado'>${datos_green_spot[i].NombreEmpleado}</td>
								<td data-label= 'Tipo de Platillo' style='display:none;'>
									${nombre_tipo_platillo = datos_green_spot[i].TipoPlatillo == "3" ? 'Platillo Unico' : ''}
								</td>
								<td data-label= 'Total Platillos' id='total_platillos_gs_co_${datos_green_spot[i].NoEmpleado}'>${suma_platillos_gs_co}</td>
								<td data-label= 'Total Pagar' id='total_platillos_precio_gs_co_${datos_green_spot[i].NoEmpleado}'>${total_pagar_platillos_gs_co}</td>
								<td data-label= 'Ubicación' style='display:none;'>
									${ nombre_ubicacion = datos_green_spot[i]['Ubicacion'] == 1 ? 'Torre TOP' : datos_green_spot[i]['Ubicacion'] == 2 ? 'Apodaca' : datos_green_spot[i]['Ubicacion'] == 3 ? 'Cienega' : ''}	
								</td>
								<td data-label= 'FechaPedido' style='display:none;'>${datos_green_spot[i].FechaPedido}</td>
								<td data-label= 'Estatus Enviado' >
									${ nombre_estatus = datos_green_spot[i].EstatusEnviado == 1 ? 'Pendiente por Procesar' : datos_green_spot[i].EstatusEnviado == 2 ? 'Procesado' : ''}
								</td>
								<td data-label= 'Acciones' ><button id='boton_ver_detalles' type='button' data-toggle='modal' data-target='#modal_detalles' class='btn btn-primary boton_ver_detalles' onclick='boton_ver_detalles_desayunos_pro_con(${datos_green_spot[i].NoEmpleado}, "${numero_conciliado}")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>
							</tr>`;
							
							RowID = 0;
							num_orden = datos_green_spot[i].IdPedido;
						}else{
							RowID= RowID +1;
							var RowFinal = RowID +1;
							tabla_detalle_gs_co += `
							<tr>
								<td  data-label= 'No. Orden' style='display:none;' rowspan='${RowFinal}'></td>
								<td  data-label= 'No. Empleado' rowspan='${RowFinal}'></td>
								<td data-label= 'Empleado' rowspan='${RowFinal}'></td>
								<td data-label= 'Tipo de Platillo' style='display:none;'>
									${nombre_tipo_platillo = datos_green_spot[i].TipoPlatillo == "3" ? 'Platillo Unico' : ''}
								</td>
								<td data-label= 'Total Platillos'>${suma_platillos_gs_co}</td>
								<td data-label= 'Total Pagar'>${total_pagar_platillos_gs_co}</td>
								<td data-label= 'Ubicación' style='display:none;'>
									${ nombre_ubicacion = datos_green_spot[i]['Ubicacion'] == 1 ? 'Torre TOP' : datos_green_spot[i]['Ubicacion'] == 2 ? 'Apodaca' : datos_green_spot[i]['Ubicacion'] == 3 ? 'Cienega' : ''}	
								</td>
								<td data-label= 'FechaPedido' style='display:none;'>${datos_green_spot[i].FechaPedido}</td>
								<td data-label= 'Estatus'></td>
							</tr>`;
						}
						$("#ContenidoListados_green_spot_conciliados").append(tbody_detalle_gs_co);
				}

				if (numero_empleado_green_spot != datos_green_spot[i].NoEmpleado) {
					suma_platillos_gs_co = datos_green_spot[i].NoPlatillo;
					total_pagar_platillos_gs_co = datos_green_spot[i].Precio;
					$("#total_platillos_gs_co_"+datos_green_spot[i].NoEmpleado).html(datos_green_spot[i].NoPlatillo);
					$("#total_platillos_precio_gs_co_"+datos_green_spot[i].NoEmpleado).html('$'+total_pagar_platillos_gs_co);
				}else{
					suma_platillos_gs_co += Number(datos_green_spot[i].NoPlatillo);
					total_pagar_platillos_gs_co += Number(datos_green_spot[i].Precio);
					$("#total_platillos_gs_co_"+datos_green_spot[i].NoEmpleado).html(suma_platillos_gs_co);
					$("#total_platillos_precio_gs_co_"+datos_green_spot[i].NoEmpleado).html('$'+total_pagar_platillos_gs_co);
				}
				
				numero_empleado_green_spot = datos_green_spot[i].NoEmpleado;
				}
			}else if (data.estatus == "error_fecha") {
				$("#btn_conciliar_comedor_detalle_especial_conciliados").hide();
				Swal.fire( 
					data.Mensaje+' plato express',
					'',
					'info'
				);
			}else{
				$("#btn_conciliar_comedor_detalle_especial_conciliados").hide();
				Swal.fire( 
					data.Mensaje+' green spot',
					'',
					'error'
				);
			}
		}	
	});
}

function ConfirmacionEstatusAlimento(id_pedido, estatus_comedor){
	Swal.fire({
		title: '¿Quieres confirmar el pedido?',
		icon: 'info',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Confirmar'
	  }).then((res) => {
		$.ajax({
			url: "../../utileria.php",
			type: "post",
			data: {"param":12, "id_pedido":id_pedido, "estatus_comedor":estatus_comedor},
			success: function(result) {
				data = JSON.parse(result);
				if (data.estatus == 'success') {
					if (res.isConfirmed) {
						Swal.fire(
						  'Confirmado',
						  'Tu platillo se confirmo.',
						  'success'
						).then(function(){
							MostrarInforme();
						});
					}	
				}else{
					if (res.isConfirmed) {
						Swal.fire( 
							data.mensaje,
							'',
							'error'
						);
					}
				}
			}
		});
	});
}

function RechazarEstatusAlimento(id_pedido, estatus_comedor){
	Swal.fire({
		title: '¿Quieres rechazar el pedido?',
		icon: 'info',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Rechazar'
	  }).then((res) => {
		$.ajax({
			url: "../../utileria.php",
			type: "post",
			data: {"param":12, "id_pedido":id_pedido, "estatus_comedor":estatus_comedor},
			success: function(result) {
				data = JSON.parse(result);
				if (data.estatus == 'success') {
					if (res.isConfirmed) {
						Swal.fire(
						  'Rechazado',
						  'Tu platillo fue Rechazado.',
						  'success'
						).then(function(){
							MostrarInforme();
						});
					}	
				}else{
					if (res.isConfirmed) {
						Swal.fire( 
							data.mensaje,
							'',
							'error'
						);
					}
				}
			}
		});
	});
}

$('input[name="daterange"]').daterangepicker({
    autoUpdateInput: false,
    locale: {
        format: 'DD/MM/YYYY',
        "applyLabel": "Aplicar",
        "cancelLabel": "Cancelar",
        "daysOfWeek": ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa"],
        "monthNames": [
            "Enero",
            "Febrero",
            "Marzo",
            "Abril",
            "Mayo",
            "Junio",
            "Julio",
            "Agosto",
            "Septiembre",
            "Octubre",
            "Noviembre",
            "Diciembre"
        ],      
    }
});
  
$('input[name="daterange"]').on('apply.daterangepicker', function(ev, picker) {
$(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
});

$('input[name="daterange"]').on('cancel.daterangepicker', function(ev, picker) {

});

$("#btnClearDate").on("click", function(){
$('input[name="daterange"]').val('');
});

$('input[name="daterange"]').val('');

$('input[name="daterange"]').on('apply.daterangepicker', function(ev, picker) {
$(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
});

$('input[name="daterange"]').on('cancel.daterangepicker', function(ev, picker) {
});

$("#btnClearDate").on("click", function(){
$('input[name="daterange"]').val('');
});