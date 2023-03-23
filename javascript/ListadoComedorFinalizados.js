var FechaHoy = "";
var FechaInicial = "";
var FechaFinal = "";
let fecha_completa = '';
let datos_finalizados,
datos_finalizados_primer_detalle,
datos_finalizados_segundo_detalle;
let suma_platillos_primer_detalle_finalizados = 0,
total_pagar_platillos_primer_detalle_finalizados = 0,
numero_empleado_finalizados = 0,
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
        MostrarInforme_plato_finalizados();
		
	BuscarEmpleadoLogeadoSesion();
});

function ObtenerFecha(){
	let dia_cambio = 0;
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
					dia_cambio = Number(dia_actual) + 5;
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
						mes_final = dia_cambio > 28 ? Number(mes_actual)+Number(1) : mes_actual;
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
					dia_cambio = Number(dia_actual) + 5;
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
						mes_final = dia_cambio > 28 ? Number(mes_actual)+Number(1) : mes_actual;
					}
					fecha_actual_inicial = moment(date).format(mes_inicial+'/YYYY');
					fecha_actual_final =  moment(date).format(mes_final+'/YYYY');
					fecha_inicial = dia_inicial+'/'+fecha_actual_inicial;
					fecha_final = dia_final+'/'+fecha_actual_final;
					$("#txtFechaSeleccionado").val(fecha_inicial+' - '+fecha_final);
				break;
				case 'Friday':
					dia_cambio = Number(dia_actual) + 5;
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
						mes_final = dia_cambio > 28 ? Number(mes_actual)+Number(1) : mes_actual;
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

$("#buscar_finalizados").click(function(e){
	$("#txtNumeroConciliacion_plato_finalizados").val('');
	MostrarInforme_plato_finalizados();
});

function boton_ver_primer_detalle_finalizados(numero_conciliado){
	debugger;
	$('#modal_detalles_segundo').modal('hide');
	$("#mostrar_tabla_primer_detalle_finalizados").html('');
	$("#filtro_pirmer_detalle_finalizado").html('');
	$("#boton_descarga_excel_primer_detalle_finalizados").html(``);
	datos_finalizados_primer_detalle = '';
	numero_empleado_finalizados = 0;
	let formData = new FormData(document.getElementById("form_comedor_finalizados"));
  	formData.append("dato", "valor");
	formData.append("param", 23);
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
				datos_finalizados_primer_detalle = data.data;
			
				$("#filtro_pirmer_detalle_finalizado").html(`
					<div class="form-group row">
						<div class="col-sm-4 col-xs-4 col-md-4">
							<label for="lblNombreVisita_primer_detalle_finalizada">Filtrar por No. Empleado:</label>
						</div>
						<div class="col-sm-8 col-xs-8 col-md-8">
							<input type="text" class="form-control" maxlength="6" id="txtNumeroEmpleado_primer_detalle_finalizado" onkeypress="return event.charCode >= 48 && event.charCode <= 57" onkeyup='txtNumeroEmpleado_primer_detalle_finalizado("${numero_conciliado}")'>
						</div>
					</div>
				`);
				$("#boton_descarga_excel_primer_detalle_finalizados").html(`
					<button id="btn_primer_detalle_finalizados" class="btn btn-primary" onclick="DescargarTablaPrimerDetalleFinalizados()">Exportar Excel</button>
				`);
				let tbody_detalle_finalizados = '';
				let tabla_detalle_finalizados = `
				<table  id='TablaPrimerDetallesFinalizados' class='table table-bordered table-hover TablaResponsiva'>
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
					<tbody id='ContenidoListados_primer_detalle_finalizados'>
					</tbody>
				</table>
				`;
				$("#mostrar_tabla_primer_detalle_finalizados").append(tabla_detalle_finalizados);
				for(let i = 0; i < datos_finalizados_primer_detalle.length; i++){
					if (numero_empleado_finalizados != datos_finalizados_primer_detalle[i].NoEmpleado) {
						let tipo_empleado_finalizados = '';
						tipo_empleado_finalizados = datos_finalizados_primer_detalle[i].Tipo_Empleado == 1 ? tipo_empleado_finalizados = 'Sindicalizado' : 
						datos_finalizados_primer_detalle[i].Tipo_Empleado == 2 ? tipo_empleado_finalizados = 'Administrativo' : '';
						tbody_detalle_finalizados = `
						<tr>
						<td  data-label= 'No. Orden' style='display:none;'>${datos_finalizados_primer_detalle[i].IdPedido}</td>
							<td  data-label= 'No. Empleado'>${datos_finalizados_primer_detalle[i].NoEmpleado}</td>
							<td data-label= 'Empleado'>${datos_finalizados_primer_detalle[i].NombreEmpleado}</td>
							<td data-label= 'Tipo de Empleado'>${tipo_empleado_finalizados}</td>
							<td data-label= 'Tipo de Platillo' style='display:none;'>
								${nombre_tipo_platillo = datos_finalizados_primer_detalle[i].TipoPlatillo == "3" ? 'Platillo Unico' : ''}
							</td>
							<td data-label= 'Total Platillos' id='numero_platillos_primer_detalle_finalizados_${datos_finalizados_primer_detalle[i].NoEmpleado}'></td>
							<td data-label= 'Total Pagar' id='total_pagar_primer_detalle_finalizados_${datos_finalizados_primer_detalle[i].NoEmpleado}'></td>
							<td data-label= 'Ubicación' style='display:none;'>
								${ nombre_ubicacion = datos_finalizados_primer_detalle[i]['Ubicacion'] == 1 ? 'Torre TOP' : datos_finalizados_primer_detalle[i]['Ubicacion'] == 2 ? 'Apodaca' : datos_finalizados_primer_detalle[i]['Ubicacion'] == 3 ? 'Cienega' : ''}	
							</td>
							<td data-label= 'FechaPedido' style='display:none;'>${datos_finalizados_primer_detalle[i].FechaPedido}</td>
							<td data-label= 'Estatus Enviado' >
								${ nombre_estatus = datos_finalizados_primer_detalle[i].EstatusEnviado == 1 ? 'Pendiente por Procesar' : datos_finalizados_primer_detalle[i].EstatusEnviado == 2 ? 'Procesado' : ''}
							</td>
							<td data-label= 'Acciones' ><button id='boton_ver_primer_detalle' type='button' data-toggle='modal' data-target='#modal_detalles' class='btn btn-primary boton_ver_detalles' onclick='boton_ver_segundo_detalle_finalizados(${datos_finalizados_primer_detalle[i].NoEmpleado},"${numero_conciliado}", ${datos_finalizados_primer_detalle[i].Tipo_comida})'>Ver Detalles<span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>
						</tr>`;

						$("#ContenidoListados_primer_detalle_finalizados").append(tbody_detalle_finalizados);
					}

					if (numero_empleado_finalizados != datos_finalizados_primer_detalle[i].NoEmpleado) {
						suma_platillos_primer_detalle_finalizados = datos_finalizados_primer_detalle[i].NoPlatillo;
						total_pagar_platillos_primer_detalle_finalizados = datos_finalizados_primer_detalle[i].Total;
						$("#numero_platillos_primer_detalle_finalizados_"+datos_finalizados_primer_detalle[i].NoEmpleado).html(datos_finalizados_primer_detalle[i].NoPlatillo);
						$("#total_pagar_primer_detalle_finalizados_"+datos_finalizados_primer_detalle[i].NoEmpleado).html('$'+total_pagar_platillos_primer_detalle_finalizados);
					}else{
						suma_platillos_primer_detalle_finalizados += Number(datos_finalizados_primer_detalle[i].NoPlatillo);
						total_pagar_platillos_primer_detalle_finalizados += Number(datos_finalizados_primer_detalle[i].Total);
						$("#numero_platillos_primer_detalle_finalizados_"+datos_finalizados_primer_detalle[i].NoEmpleado).html(suma_platillos_primer_detalle_finalizados);
						$("#total_pagar_primer_detalle_finalizados_"+datos_finalizados_primer_detalle[i].NoEmpleado).html('$'+total_pagar_platillos_primer_detalle_finalizados);
					}

					numero_empleado_finalizados = datos_finalizados_primer_detalle[i].NoEmpleado;
				}

				$("#titulo_modal_finalizados_primer_detalle").html('Primer Detalle Comida Finalizada');	
			}else if (data.estatus == "error_fecha") {
				$("#boton_descarga_excel_primer_detalle_finalizados").html(``);
				$("#mostrar_tabla_primer_detalle_finalizados").html('');
				Swal.fire( 
					data.Mensaje,
					'',
					'info'
				);
			}else{
				$("#boton_descarga_excel_primer_detalle_finalizados").html(``);
				$("#mostrar_tabla_primer_detalle_finalizados").html('');
				Swal.fire( 
					data.Mensaje,
					'',
					'error'
				);
			}
		}
	});
}

function boton_ver_segundo_detalle_finalizados(numero_emp, numero_conciliado, tipo_comida){
	if (numero_emp != '' && numero_conciliado != '', tipo_comida != '') {
		$('#modal_detalles_primer').modal('hide');
		$('#modal_detalles_segundo').modal('show');
		$("#mostrar_tabla_segundo_detalle_finalizados").html('');
		$("#agregar_botones_segundo_detalle_finalizados").html('');
		datos_finalizados_segundo_detalle = '';
		let formData = new FormData(document.getElementById("form_comedor_finalizados"));
		formData.append("dato", "valor");
		formData.append("param", 24);
		formData.append("tipo_comida", tipo_comida);
		formData.append("numero_empleado", numero_emp);
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
				if (data.estatus != 'error_vacio') {
					datos_finalizados_segundo_detalle = data.data;
					let nombre_ubicacion = '';
					let tabla_segundo_detalle_finalizados = `
					<table  id='TablaSegundoDetallesFinalizados' class='table table-bordered table-hover TablaResponsiva'>
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
						<tbody id='ContenidoSegundoDetalleFinalizado'>
					`;
					for(let i = 0; i < datos_finalizados_segundo_detalle.length; i++){
						let tipo_empleado_finalizados_segundo_detalle = '';
						tipo_empleado_finalizados_segundo_detalle = datos_finalizados_segundo_detalle[i].Tipo_Empleado == 1 ? tipo_empleado_finalizados_segundo_detalle = 'Sindicalizado' : 
						datos_finalizados_segundo_detalle[i].Tipo_Empleado == 2 ? tipo_empleado_finalizados_segundo_detalle = 'Administrativo' : '';
						tabla_segundo_detalle_finalizados += `
						<tr>
							<td  data-label= 'No. Orden'>${datos_finalizados_segundo_detalle[i].IdPedido}</td>
							<td  data-label= 'No. Empleado'>${datos_finalizados_segundo_detalle[i].NoEmpleado}</td>
							<td data-label= 'Empleado'>${datos_finalizados_segundo_detalle[i].NombreEmpleado}</td>
							<td data-label= 'Tipo de Empleado'>${tipo_empleado_finalizados_segundo_detalle}</td>
							<td data-label= 'No. Platillos'>${datos_finalizados_segundo_detalle[i].NoPlatillo}</td>
							<td data-label= 'Platillo'>${datos_finalizados_segundo_detalle[i].Platillo}</td>
							<td data-label= 'Precio'>${datos_finalizados_segundo_detalle[i].Precio}</td>
							<td data-label= 'Total'>${datos_finalizados_segundo_detalle[i].Total}</td>	
							<td data-label= 'Ubicación'>
							${ nombre_ubicacion = datos_finalizados_segundo_detalle[i]['Ubicacion'] == 1 ? 'Torre TOP' : datos_finalizados_segundo_detalle[i]['Ubicacion'] == 2 ? 'Apodaca' : datos_finalizados_segundo_detalle[i]['Ubicacion'] == 3 ? 'Cienega' : ''}	
							</td>
							<td data-label= 'FechaPedido'>${datos_finalizados_segundo_detalle[i].FechaPedido}</td>
						</tr>`;
					}

					tabla_segundo_detalle_finalizados += `</tbody>
					</table>`;
					$("#titulo_modal_finalizados_segundo_detalle").html('Segundo Detalle Comida Finalizada');
					$("#mostrar_tabla_segundo_detalle_finalizados").html(tabla_segundo_detalle_finalizados);
					$("#agregar_botones_segundo_detalle_finalizados").append(`
						<button type="button" class="btn btn-default" onclick='regresar_modal("${numero_conciliado}", 2)'>Regresar</button>
						<button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
					`);
				}else{
					Swal.fire( 
						data.Mensaje,
						'',
						'info'
					);
				}
			}
		});	
	}
}

function regresar_modal(numero_conciliado, tipo_comida){
	switch (tipo_comida) {
		case 1:
			$('#modal_detalles_primer').modal('show');
			boton_ver_primer_detalle_finalizados(numero_conciliado);		
		break;

		case 2:
			$('#modal_detalles_primer').modal('show');
			boton_ver_primer_detalle_finalizados(numero_conciliado);	
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

function DescargarTablaFinalizados(){
	$("#TablaComedor").table2excel({
		filename: "Listado_Detalle_Finalizados_"+fecha_completa+".xls"
	});
}

function DescargarTablaPrimerDetalleFinalizados(){
	$("#TablaPrimerDetallesFinalizados").table2excel({
		filename: "Listado_Primer_Detalle_Finalizado_"+fecha_completa+".xls"
	});
}

function MostrarInforme_plato_finalizados(){
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
	let formData = new FormData(document.getElementById("form_comedor_finalizados"));
  	formData.append("dato", "valor");
	formData.append("param", 22);
	formData.append("estatus_enviado", procesadas);
	// formData.append("tipo_comida", 1);
	$("#boton_descarga_excel_finalizados").hide();
	$("#filtros_plato_finalizados").hide();
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
				$("#filtros_plato_finalizados").show();
				$("#boton_descarga_excel_finalizados").show();
				$("#EspacioTabla").show();
				$("#ContenidoListados").find("tr").remove();
				datos_finalizados = data.data;
				for(let i = 0; i < datos_finalizados.length; i++){
					if (id_conciliacion != datos_finalizados[i].id_conciliacion) {
						let tablacontenido ="<tr>";
						tablacontenido +="<td  data-label= 'Id Conciliacion'>"+datos_finalizados[i].id_conciliacion+"</td>"
						tablacontenido +="<td data-label= 'Numero Empleado' style='display:none;'>"+datos_finalizados[i].no_empleado+"</td>"
						tablacontenido +="<td data-label= 'Total Platillos' id='total_platillos_"+datos_finalizados[i].id_conciliacion+"'>"+datos_finalizados[i].total_platillos+"</td>"
						tablacontenido +="<td data-label= 'Total Pagar' id='total_pagar_"+datos_finalizados[i].id_conciliacion+"'>"+datos_finalizados[i].total_pagar+"</td>"
						tablacontenido +="<td data-label= 'Fecha Conciliado'>"+datos_finalizados[i].fecha_conciliado+"</td>"
						if (datos_finalizados[i].estatus == 1) {
							tablacontenido += "<td data-label= 'Estatus Enviado' >Finalizado</td>"
						}
						tablacontenido +=`<td data-label='Acciones'><button id='boton_ver_detalles_comida' type='button' data-toggle='modal' data-target='#modal_detalles_primer' class='btn btn-primary boton_ver_detalles' onclick='boton_ver_primer_detalle_finalizados("${datos_finalizados[i].id_conciliacion}")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>`;		
					
						$('#ContenidoListados').append(tablacontenido);	
					}
					if (id_conciliacion != datos_finalizados[i].id_conciliacion) {
						suma_platillos = datos_finalizados[i].total_platillos;
						total_pagar_platillos_comida = datos_finalizados[i].total_pagar;
						$("#total_platillos_"+datos_finalizados[i].id_conciliacion).html(datos_finalizados[i].total_platillos);
						$("#total_pagar_"+datos_finalizados[i].id_conciliacion).html('$'+total_pagar_platillos_comida);
					}else{
						suma_platillos += Number(datos_finalizados[i].total_platillos);
						total_pagar_platillos_comida += Number(datos_finalizados[i].total_pagar);
						$("#total_platillos_"+datos_finalizados[i].id_conciliacion).html(suma_platillos);
						$("#total_pagar_"+datos_finalizados[i].id_conciliacion).html('$'+total_pagar_platillos_comida);
					}
					id_conciliacion = datos_finalizados[i].id_conciliacion;
				}
			}else if (data.estatus == "error_fecha") {
				$("#boton_descarga_excel_finalizados").hide();
				$("#filtros_plato_finalizados").hide();
				$("#EspacioTabla").hide();
				$("#div_tabla").hide();
				$("#loading_comedor").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'info'
				);
			}else{
				$("#boton_descarga_excel_finalizados").hide();
				$("#filtros_plato_finalizados").hide();
				$("#EspacioTabla").hide();
				$("#div_tabla").hide();
				$("#loading_comedor").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'error'
				);
			}
		}
	});
}

$("#txtNumeroConciliacion_plato_finalizados").on("keyup", function() {
	datos_procesados = '';
	numero_empleado = 0;
	let Fecha = $("#txtFechaSeleccionado").val(),
	numero_conciliacion_filtrado = $(this).val().toLowerCase(),
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
	if (numero_conciliacion_filtrado.length <= 11 && numero_conciliacion_filtrado != '') {
		return;	
	}
	let formData = new FormData(document.getElementById("form_comedor_finalizados"));
  	formData.append("dato", "valor");
	formData.append("numero_conciliado", numero_conciliacion_filtrado);
	formData.append("param", 22);
	formData.append("estatus_enviado", procesadas);
	$("#boton_descarga_excel_finalizados").hide();
	$("#filtros_plato_finalizados").hide();
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
				$("#filtros_plato_finalizados").show();
				$("#boton_descarga_excel_finalizados").show();
				$("#EspacioTabla").show();
				$("#ContenidoListados").find("tr").remove();
				datos_finalizados = data.data;
				for(let i = 0; i < datos_finalizados.length; i++){
					if (id_conciliacion != datos_finalizados[i].id_conciliacion) {
						let tablacontenido ="<tr>";
						tablacontenido +="<td  data-label= 'Id Conciliacion'>"+datos_finalizados[i].id_conciliacion+"</td>"
						tablacontenido +="<td data-label= 'Numero Empleado' style='display:none;'>"+datos_finalizados[i].no_empleado+"</td>"
						tablacontenido +="<td data-label= 'Total Platillos' id='total_platillos_"+datos_finalizados[i].id_conciliacion+"'>"+datos_finalizados[i].total_platillos+"</td>"
						tablacontenido +="<td data-label= 'Total Pagar' id='total_pagar_"+datos_finalizados[i].id_conciliacion+"'>"+datos_finalizados[i].total_pagar+"</td>"
						tablacontenido +="<td data-label= 'Fecha Conciliado'>"+datos_finalizados[i].fecha_conciliado+"</td>"
						if (datos_finalizados[i].estatus == 1) {
							tablacontenido += "<td data-label= 'Estatus Enviado' >Finalizado</td>"
						}
						tablacontenido +=`<td data-label='Acciones'><button id='boton_ver_detalles_comida' type='button' data-toggle='modal' data-target='#modal_detalles_primer' class='btn btn-primary boton_ver_detalles' onclick='boton_ver_primer_detalle_finalizados("${datos_finalizados[i].id_conciliacion}")'>Ver Detalles  <span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>`;		
					
						$('#ContenidoListados').append(tablacontenido);	
					}
					if (id_conciliacion != datos_finalizados[i].id_conciliacion) {
						suma_platillos = datos_finalizados[i].total_platillos;
						total_pagar_platillos_comida = datos_finalizados[i].total_pagar;
						$("#total_platillos_"+datos_finalizados[i].id_conciliacion).html(datos_finalizados[i].total_platillos);
						$("#total_pagar_"+datos_finalizados[i].id_conciliacion).html('$'+total_pagar_platillos_comida);
					}else{
						suma_platillos += Number(datos_finalizados[i].total_platillos);
						total_pagar_platillos_comida += Number(datos_finalizados[i].total_pagar);
						$("#total_platillos_"+datos_finalizados[i].id_conciliacion).html(suma_platillos);
						$("#total_pagar_"+datos_finalizados[i].id_conciliacion).html('$'+total_pagar_platillos_comida);
					}
					id_conciliacion = datos_finalizados[i].id_conciliacion;
				}
			}else if (data.estatus == "error_fecha") {
				$("#filtros_plato_finalizados").show();
				$("#boton_descarga_excel_finalizados").hide();
				$("#EspacioTabla").hide();
				$("#div_tabla").hide();
				$("#loading_comedor").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'info'
				);
			}else{
				$("#filtros_plato_finalizados").show();
				$("#boton_descarga_excel_finalizados").hide();
				$("#EspacioTabla").hide();
				$("#div_tabla").hide();
				$("#loading_comedor").hide();
				Swal.fire( 
					data.Mensaje,
					'',
					'error'
				);
			}
		}
	});
});

function txtNumeroEmpleado_primer_detalle_finalizado(numero_conciliado){
	datos_finalizados_primer_detalle = '';
	numero_empleado_finalizados = 0;
	let Fecha = $("#txtFechaSeleccionado").val(),
	numero_empleado_primer_detalle_finalizado = $("#txtNumeroEmpleado_primer_detalle_finalizado").val(),
	procesadas = 2;
	let ID = "";
	let RowID = 0;
	regex = /^[a-zA-Z ]+$/;
	this.value = (this.value + '').replace(/[^0-9]/g, '');
	if (regex.test(numero_empleado_primer_detalle_finalizado)) {
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
	if (numero_empleado_primer_detalle_finalizado.length <= 3 && numero_empleado_primer_detalle_finalizado != '') {
		return false;	
	}
	$('#modal_detalles_segundo').modal('hide');
	$("#mostrar_tabla_primer_detalle_finalizados").html('');
	$("#boton_descarga_excel_primer_detalle_finalizados").html(``);
	let formData = new FormData(document.getElementById("form_comedor_finalizados"));
  	formData.append("dato", "valor");
	formData.append("param", 23);
	formData.append("numero_conciliado", numero_conciliado);
	formData.append("numero_empleado", numero_empleado_primer_detalle_finalizado);
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
				datos_finalizados_primer_detalle = data.data;
				$("#boton_descarga_excel_primer_detalle_finalizados").html(`
					<button id="btn_primer_detalle_finalizados" class="btn btn-primary" onclick="DescargarTablaPrimerDetalleFinalizados()">Exportar Excel</button>
				`);
				let tbody_detalle_finalizados = '';
				let tabla_detalle_finalizados = `
				<table  id='TablaPrimerDetallesFinalizados' class='table table-bordered table-hover TablaResponsiva'>
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
					<tbody id='ContenidoListados_primer_detalle_finalizados'>
					</tbody>
				</table>
				`;
				$("#mostrar_tabla_primer_detalle_finalizados").append(tabla_detalle_finalizados);
				for(let i = 0; i < datos_finalizados_primer_detalle.length; i++){
					if (numero_empleado_finalizados != datos_finalizados_primer_detalle[i].NoEmpleado) {
						tbody_detalle_finalizados = `
						<tr>
						<td  data-label= 'No. Orden' style='display:none;'>${datos_finalizados_primer_detalle[i].IdPedido}</td>
							<td  data-label= 'No. Empleado'>${datos_finalizados_primer_detalle[i].NoEmpleado}</td>
							<td data-label= 'Empleado'>${datos_finalizados_primer_detalle[i].NombreEmpleado}</td>
							<td data-label= 'Tipo de Platillo' style='display:none;'>
								${nombre_tipo_platillo = datos_finalizados_primer_detalle[i].TipoPlatillo == "3" ? 'Platillo Unico' : ''}
							</td>
							<td data-label= 'Total Platillos' id='numero_platillos_primer_detalle_finalizados_${datos_finalizados_primer_detalle[i].NoEmpleado}'></td>
							<td data-label= 'Total Pagar' id='total_pagar_primer_detalle_finalizados_${datos_finalizados_primer_detalle[i].NoEmpleado}'></td>
							<td data-label= 'Ubicación' style='display:none;'>
								${ nombre_ubicacion = datos_finalizados_primer_detalle[i]['Ubicacion'] == 1 ? 'Torre TOP' : datos_finalizados_primer_detalle[i]['Ubicacion'] == 2 ? 'Apodaca' : datos_finalizados_primer_detalle[i]['Ubicacion'] == 3 ? 'Cienega' : ''}	
							</td>
							<td data-label= 'FechaPedido' style='display:none;'>${datos_finalizados_primer_detalle[i].FechaPedido}</td>
							<td data-label= 'Estatus Enviado' >
								${ nombre_estatus = datos_finalizados_primer_detalle[i].EstatusEnviado == 1 ? 'Pendiente por Procesar' : datos_finalizados_primer_detalle[i].EstatusEnviado == 2 ? 'Procesado' : ''}
							</td>
							<td data-label= 'Acciones' ><button id='boton_ver_primer_detalle' type='button' data-toggle='modal' data-target='#modal_detalles' class='btn btn-primary boton_ver_detalles' onclick='boton_ver_segundo_detalle_finalizados(${datos_finalizados_primer_detalle[i].NoEmpleado},"${numero_conciliado}", ${datos_finalizados_primer_detalle[i].Tipo_comida})'>Ver Detalles<span><i class='fa fa-eye' aria-hidden='true'></i></span></button></td>
						</tr>`;

						$("#ContenidoListados_primer_detalle_finalizados").append(tbody_detalle_finalizados);
					}

					if (numero_empleado_finalizados != datos_finalizados_primer_detalle[i].NoEmpleado) {
						suma_platillos_primer_detalle_finalizados = datos_finalizados_primer_detalle[i].NoPlatillo;
						total_pagar_platillos_primer_detalle_finalizados = datos_finalizados_primer_detalle[i].Total;
						$("#numero_platillos_primer_detalle_finalizados_"+datos_finalizados_primer_detalle[i].NoEmpleado).html(datos_finalizados_primer_detalle[i].NoPlatillo);
						$("#total_pagar_primer_detalle_finalizados_"+datos_finalizados_primer_detalle[i].NoEmpleado).html('$'+total_pagar_platillos_primer_detalle_finalizados);
					}else{
						suma_platillos_primer_detalle_finalizados += Number(datos_finalizados_primer_detalle[i].NoPlatillo);
						total_pagar_platillos_primer_detalle_finalizados += Number(datos_finalizados_primer_detalle[i].Total);
						$("#numero_platillos_primer_detalle_finalizados_"+datos_finalizados_primer_detalle[i].NoEmpleado).html(suma_platillos_primer_detalle_finalizados);
						$("#total_pagar_primer_detalle_finalizados_"+datos_finalizados_primer_detalle[i].NoEmpleado).html('$'+total_pagar_platillos_primer_detalle_finalizados);
					}

					numero_empleado_finalizados = datos_finalizados_primer_detalle[i].NoEmpleado;
				}

				$("#titulo_modal_finalizados_primer_detalle").html('Primer Detalle Comida Finalizada');
			}else if (data.estatus == "error_fecha") {
				$("#boton_descarga_excel_primer_detalle_finalizados").html(``);
				$("#mostrar_tabla_primer_detalle_finalizados").html('');
				Swal.fire( 
					data.Mensaje,
					'',
					'info'
				);
			}else{
				$("#boton_descarga_excel_primer_detalle_finalizados").html(``);
				$("#mostrar_tabla_primer_detalle_finalizados").html('');
				Swal.fire( 
					data.Mensaje,
					'',
					'error'
				);
			}
		}
	})	
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