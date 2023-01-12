let titulos = [],
Canidad_Platillos = [],
myChart;
var FechaHoy = "";
var FechaInicial = "";
var FechaFinal = "";
let fecha_completa = '';
$(document).ready(function(){	
	ObtenerFecha();
	window.location.hash="no-back-button";
	window.location.hash="Again-No-back-button";//esta linea es necesaria para chrome
	window.onhashchange=function(){window.location.hash="no-back-button";}
		
	BuscarEmpleadoLogeadoSesion();
	buscar_sede();
});

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

function buscar_sede(){
	let num_empleado = $("#txtNumEmpleado").val();
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: {"param":1, "empleado":num_empleado},
		success: function(result) {
			let sede  = JSON.parse(result)[0].Sede;
			switch (sede) {
				case 'Torre TOP':
					$("#txtUbicacion").trigger("change").val(1);
				break;

				case 'Apodaca':
					$("#txtUbicacion").trigger("change").val(2);
				break;

				case 'Cienega':
					$("#txtUbicacion").trigger("change").val(3);
				break;
			
				default:
					$("#txtUbicacion").trigger("change").val(1);
				break;
			}
			traer_datos();
		}
	});
}

function BuscarEmpleadoLogeado(){
	var fechaActualL = new Date(); //Fecha actual
	var fechaActual2 = moment(fechaActualL).format("YYYY-MM-DD");
	$("#txtFechaPedido").val(fechaActual2);
	var empleado = $("#txtNumEmpleadoLogeado").val()
	if(empleado.replace(/\s/g,"") != ""){
		
		//LimpiarCampos();
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
						$("#txtFechaDia").val(fechaActual2);
						$("#txtNombreEmpleadoLogeado").val(data[i]['Nombre']);
					}
				}else{
					$("#txtFechaDia").val("");
					$("#txtNombreEmpleadoLogeado").val("");
					$("#txtNumEmpleadoLogeado").val("")
				}
				
			}
		});
	
	}else{
		Swal.fire( 
			'Favor de Agregar un numero de empleado.',
			'',
			'error'
		);
		//CerrarSesion();
	}
}

function BuscarEmpleadoLogeadoSesion(){
	var fechaActualL = new Date(); //Fecha actual
	var fechaActual2 = moment(fechaActualL).format("YYYY-MM-DD");
	var empleado = $("#txtNumEmpleado").val()
	if(empleado.replace(/\s/g,"") != ""){
		//LimpiarCampos();
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

function Contraseña(){
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
	// $("#txtFechaSeleccionado").val(currentDate);
    $("#txtFechaDia").val(currentDate);
	let fecha_actual = moment(date).format('DD/MM/YYYY');
	$("#txtFechaSeleccionado").val(fecha_actual+' - '+fecha_actual);
}

function LimpiarCampos(){
	$("#txtTipoPlatilloGR").val("");
	$("#txtPrecioTotal").val("0.00");
	$("#txtPrecioGR").val("0.00");
	$("#txtCaloriasGR").val("");
	$("#txtProductoSeleccionadoGR").val(0);
	$("#txtNumPlatilloGR").val(1);
	$("#txtComentariosGR").val("");
	$("#txtTotalPlatillo").val("0.00");
	$("#txtComentarioPlatillo").val("");
}

function traer_datos(){
	$("#div_padre_graficas").show();
	$("#graficas").hide();
	$("#contenedor_loading_comedor").show();

	// prueba();
}

function siteLoaded() {
    $("#contenedor_loading_comedor").hide();
	$("#graficas").show();
}

// function MostrarGraficas(){
// 	$("#div_padre_graficas").show();
// 	$("#graficas").hide();
// 	$("#contenedor_loading_comedor").show();
// 	titulos = [];
// 	Canidad_Platillos = [];
// 	let Fecha = $("#txtFechaSeleccionado").val(),
// 	txtUbicacion = $("#txtUbicacion").val();
// 	if (Fecha == "") {
// 		Swal.fire( 
// 			"El campo fecha no puede ir vacío",
// 			'',
// 			'info'
// 		);
// 		return false;
// 	}
// 	let formData = new FormData(document.getElementById("form_graficas_greenspot"));
//   	formData.append("dato", "valor");
// 	formData.append("ubicacion", txtUbicacion);
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
// 				let datos = data.data;
// 				for (let i = 0; i < datos.length; i++) {
// 					titulos.push(datos[i].Nombre);
// 					Canidad_Platillos.push(datos[i].Cantidad_Platillo);				
// 				}
// 				crear_grafica();
// 			}else if (data.estatus == "error_fecha") {
// 				$("#contenedor_loading_comedor").hide();
// 				$("#graficas").hide();
// 				$("#div_padre_graficas").hide();
// 				Swal.fire( 
// 					data.mensaje,
// 					'',
// 					'info'
// 				);
// 			}else{
// 				$("#contenedor_loading_comedor").hide();
// 				$("#graficas").hide();
// 				$("#div_padre_graficas").hide();
// 				Swal.fire( 
// 					data.mensaje,
// 					'',
// 					'error'
// 				);
// 			}
// 		}	
// 	});
// }

// function crear_grafica(){
// 	$("#contenedor_loading_comedor").hide();
// 	$("#graficas").show();
// 	const ctx = document.getElementById('myChart').getContext("2d");
//     if (myChart) {
//         myChart.destroy();
//     }
// 	myChart = new Chart(ctx, {
// 		type: 'bar',
// 		data: {
// 			labels: titulos,
// 			datasets: [{
// 			label: 'cantidad de pedidos',
// 			data: Canidad_Platillos,
// 			borderWidth: 1
// 			}]
// 		},
// 		options: {
// 			indexAxis: 'y',
// 			responsive: true,
// 			plugins: {
// 			  legend: {
// 				position: 'top',
// 			  },
// 			  title: {
// 				display: true,
// 				text: 'cantidad de pedidos'
// 			  }
// 			}
// 		  },
// 	});
// }

// ejemplos tablas chart.js


$('input[name="Fecha"]').daterangepicker({
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
  
$('input[name="Fecha"]').on('apply.daterangepicker', function(ev, picker) {
$(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
});

$('input[name="Fecha"]').on('cancel.daterangepicker', function(ev, picker) {

});

$("#btnClearDate").on("click", function(){
$('input[name="daterange"]').val('');
});

$('input[name="Fecha"]').val('');

$('input[name="Fecha"]').on('apply.daterangepicker', function(ev, picker) {
$(this).val(picker.startDate.format('DD/MM/YYYY') + ' - ' + picker.endDate.format('DD/MM/YYYY'));
});

$('input[name="Fecha"]').on('cancel.daterangepicker', function(ev, picker) {
});

$("#btnClearDate").on("click", function(){
$('input[name="Fecha"]').val('');
});
