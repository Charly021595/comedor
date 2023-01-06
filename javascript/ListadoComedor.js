var FechaHoy = "";
var FechaInicial = "";
var FechaFinal = "";
var NumPreguntas =0;
let datos;
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
		// var tabla ="<table  id='TablaComedor' class='table table-bordered table-hover TablaResponsiva'>";
		// 	tabla +="<thead>";
		// 	tabla +="<tr>"
		// 	tabla +="<th scope='col'>No. Empleado</th>"
		// 	tabla +="<th scope='col'>Empleado</th>"
		// 	tabla +="<th scope='col' >Tipo de Platillo</th>"
		// 	tabla +="<th scope='col'>No. Platillo</th>"
		// 	tabla +="<th scope='col'>Platillo</th>"
		// 	tabla +="<th scope='col'>Comentarios</th>"
		// 	tabla +="<th scope='col'>Ubicación</th>"
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


function CerrarSesion(){
	$.ajax({
			type: "POST",
			//async: false,
			data: {
			  param: 7
			},
			
			url: "../utileria.php", 
		    dataType: 'JSON',
			success: function(data) {
				$('.cargando').hide(); // Oculta la imagen de cargando 
				if(data.length){
					window.location='../index.php';
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
		
		//LimpiarCampos();
		$.ajax({
            type: "POST",
            data: {
                param: 1,
				empleado: empleado 
            },
            url: "../utileria.php",
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
            url: "../utileria.php",
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

function ObtenerFecha(){
	var date = new Date();
	var currentDate = date.toISOString().substring(0,10);
	$("#txtFechaSeleccionado").val(currentDate);
	$("#txtFechaDia").val(currentDate);
}

function DescargarTabla(){
	$("#TablaComedor").table2excel({
		filename: "ListadoComedor.xls"
	});
}

$("#btn_nomina").on("click", function(e){
	$("#btn_nomina").addClass("deshabilitar");
  	$('#btn_nomina').attr("disabled", true); 
	let datos2 = JSON.stringify(datos);
	for (let i = 0; i < datos.length; i++) {
		if (datos[i].EstatusEnviado == 1) {
			let index = i;	
			if (index > -1) {
				datos.splice(index, 1);
			 }
		}
	}
	$.ajax({
		url: "../utileria.php",
		type: "post",
		data: {"param":11, "datos":datos2},
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus == "success"){
				console.log(result);
				$("#TablaComedor").table2excel({
					filename: "ListadoComedor.xls"
				});
				$("#btn_nomina").removeAttr("disabled, disabled");
				$("#btn_nomina").removeClass("deshabilitar");
				$('#btn_nomina').attr("disabled", false);
			}else{
				Swal.fire('No hay Registros pendientes de pago', "","info");
				$("#btn_nomina").removeAttr("disabled, disabled");
				$("#btn_nomina").removeClass("deshabilitar");
				$('#btn_nomina').attr("disabled", false);
			}
		}
	});
});

function MostrarInforme(){
	var Fecha = $("#txtFechaSeleccionado").val()
	var FechaListado = moment(Fecha, 'YYYY/MM/DD').format('YYYYMMDD');
	if (Fecha == "") {
		Swal.fire( 
			"El campo fecha no puede ir vació",
			'',
			'info'
		);
		return;
	}
	$("#EspacioTabla").hide();
	$("#loading_comedor").show();
	$("#div_tabla").show();
	$.ajax({
		type: "POST",
		data: {
			param: 3,
			FechaListado:FechaListado
		},
		url: "../utileria.php",
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus == "success") {
				$("#loading_comedor").hide();
				$("#boton_descarga_excel").show();
				$("#EspacioTabla").show();
				$("#ContenidoListados").find("tr").remove();
				datos = data.data;
				for(let i = 0; i < datos.length; i++){
					let tablacontenido ="<tr>";
				
					tablacontenido +="<td  data-label= 'No. Empleado'>"+datos[i].NoEmpleado+"</td>"
					tablacontenido +="<td data-label= 'Empleado'>"+datos[i].NombreEmpleado+"</td>"
					if(datos[i].TipoPlatillo == "3"){
						tablacontenido +="<td data-label= 'Tipo de Platillo'>Platillo Unico</td>"
					}
					tablacontenido +="<td data-label= 'No. Platillo'>"+datos[i].NoPlatillo+"</td>"
					tablacontenido +="<td data-label= 'Platillo'>"+datos[i].Platillo+"</td>"
					tablacontenido +="<td data-label= 'Comentarios'>"+datos[i].Comentarios+"</td>"
					if(datos[i]['Ubicacion'] == null){
						tablacontenido +="<td data-label= 'Ubicación'></td>"
					}else if(datos[i].Ubicacion == "1"){
						tablacontenido +="<td data-label= 'Ubicación'>Torre TOP</td>"
					}
					tablacontenido += "<td data-label= 'FechaPedido' >"+datos[i].FechaPedido+"</td>"
					if (datos[i].EstatusEnviado == 0) {
						tablacontenido += "<td data-label= 'Estatus Enviado' >No Enviado</td>"
					}else if (datos[i].EstatusEnviado == 1) {
						tablacontenido += "<td data-label= 'Estatus Enviado' >Enviado</td>"
					}else{
						tablacontenido += "<td data-label= 'Estatus Enviado' ></td>"
					}
					tablacontenido += "<td data-label='' ><button onclick='ConfirmacionEliminaAlimento("+datos[i].idComedorSub+")'>Confirmar</button></td>"
					tablacontenido += "<td data-label='' ><button onclick='ConfirmacionEliminaAlimento("+datos[i].idComedorSub+")'>Eliminar</button></td>"
					tablacontenido +="</tr>";
					$('#ContenidoListados').append(tablacontenido);
				}
			}else if (data.estatus == "error_fecha") {
				$("#loading_comedor").hide();
				$("#EspacioTabla").hide();
				$("#div_tabla").hide();
				$("#boton_descarga_excel").hide();
				Swal.fire( 
					data.mensaje,
					'',
					'info'
				);
			}else{
				$("#loading_comedor").hide();
				$("#EspacioTabla").hide();
				$("#div_tabla").hide();
				$("#boton_descarga_excel").hide();
				Swal.fire( 
					data.mensaje,
					'',
					'error'
				);
			}
		}
	});
}

$("#txtNumeroEmpleado").on("keyup", function() {
	var value = $(this).val().toLowerCase();
	$("#TablaComedor > tbody > tr").filter(function() {      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	});
});


function TipoPlatillo(){
	var tipoplatillo = $("#txtTipoPlatillo").val();
	$("#txtProductoSeleccionadoGR").empty();
	$("#ListadoComidaGr").find("tr").remove();
	 LimpiarCampos();
	if(tipoplatillo !="4"){
		$("#ComidaGR").css("display", "none");
		$("#DivCantidad").css("display", "");
		$("#DivTotal").css("display", "");
		$("#DivPrecio").css("display", "");
		$("#DivComentario").css("display", "");
		
		
		var seleccionar = "<option value='0'> Seleccionar Platillo</option>";
		$('#txtProductoSeleccionadoGR').append(seleccionar);
		if(tipoplatillo =="0"){
			$("#DivCantidad").css("display", "none");
			$("#DivTotal").css("display", "none");
			$("#DivPrecio").css("display", "none");
			$("#DivComentario").css("display", "none");
		}
	$("#txtNumPlatillo").val("1");
	$("#txtTotalPlatillo").val("49.00");
	}
	else{
		$("#ComidaGR").css("display", "");
		$("#DivCantidad").css("display", "none");
		$("#DivTotal").css("display", "none");
		$("#DivPrecio").css("display", "none");
		$("#DivComentario").css("display", "none");
		$("#txtNumPlatillo").val("0");
		
		$.ajax({
            type: "POST",
            data: {
                param: 4,
				tipoplatillo: tipoplatillo 
            },
            url: "../utileria.php",
            dataType: 'JSON',
             success: function(data) {
				if(data.length){
					var seleccionar = "<option > Seleccione el Platillo</option>"
					for(i=0;i<data.length;i++){
						//$("#NombreCont2").text(data[i]['Nombre']);
						//$("#NombreCont").text(data[i]['Nombre']);
						
							seleccionar += "<option value='"+data[i]['IdComida']+"'>"+data[i]['Comida']+"</option>";
							
						
					}
					$('#txtProductoSeleccionadoGR').append(seleccionar);
				}
			}
		});
	}
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


function InfoPlatillo(){
	//txtProductoSeleccionadoGR
	var InfoPlatillo = $("#txtProductoSeleccionadoGR").val();
	//
	$("#txtComentariosGR").val("");
	$("#txtNumPlatilloGR").val(1);
	$("#txtPrecioGR").val("0.00");
	$("#txtCaloriasGR").val("");
	$("#txtPrecioTotal").val("0.00");
	var TipoPlatillo = $("#txtTipoPlatillo").val();
	$("#txtTipoPlatilloGR").val(TipoPlatillo);
	
	//
	if(InfoPlatillo !="0"){
		$.ajax({
            type: "POST",
            data: {
                param: 5,
				InfoPlatillo: InfoPlatillo 
            },
            url: "../utileria.php",
            dataType: 'JSON',
             success: function(data) {
				if(data.length){
					
					for(i=0;i<data.length;i++){
						$("#txtPrecioGR").val(data[i]['Precio']);
						$("#txtCaloriasGR").val(data[i]['Calorias']);
					
					}
				ValidarPlatillosGR();
				}
			}
		});
	}else{
		$("#txtNumPlatilloGR").val(1);
		$("#txtPrecioGR").val("");
		$("#txtCaloriasGR").val("");
		$("#txtPrecioTotal").val("0.00");
		$("#txtTipoPlatilloGR").val("");
		$("#txtComentariosGR").val("");
	}
}


function ValidarPlatillos(){
	var platillos = parseInt($("#txtNumPlatillo").val());
	
	if(platillos < 1){
		$("#txtNumPlatillo").val(1);
	}
	var Precio = parseFloat($("#txtPrecioPlatillo").val());
	var Calculo = Precio * platillos;
	$("#txtTotalPlatillo").val(parseFloat(Calculo).toFixed(2));
}


function GuardarOrden(){
	var NoEmpleadoLogeado = $("#txtNumEmpleadoLogeado").val();
	var NombreEmpleado =  $("#txtNombreEmpleadoLogeado").val();
	var NoPlatillos = $("#txtNumPlatillo").val();
	var TipoPlatillo = $("#txtTipoPlatillo").val();
	var Ubicacion = $("#txtUbicacion").val();
	//var FechaDeOrden = $("#txtFechaPedido").val();
	var Total = $("#txtTotalPlatillo").val();
	var Precio= $("#txtPrecioPlatillo").val();
	$("#GuardarOrden").prop("disabled", true);
	//
	var arrayListadoGreenSpot = {};
	var arrayListadoPlatilloUnico = {};
	var fechaActualL = new Date(); //Fecha actual
	var FechaDeOrden = moment(fechaActualL).format("YYYY-MM-DD HH:mm:ss");
	//
	if(TipoPlatillo== "4"){
	//var arrayListadoGreenSpot = {};
		arrayListadoGreenSpot = GuardarListadoGreenSpot();
		var CantidadArreglo = arrayListadoGreenSpot.length; 
	}
	else{
		// 
		var TotalFormato = parseFloat( $("#txtTotalPlatillo").val()).toFixed(2) //$("#txtTotalPlatillo").val(parseFloat(Calculo).toFixed(2));
		var arrayListadoComida = [];
		 var Array = {};
			
            Array.Precio = $("#txtPrecioPlatillo").val();
			Array.NoPlatillos = $("#txtNumPlatillo").val();
			Array.TipoPlatillo = TipoPlatillo;
			Array.Platillo = $('select[name="txtTipoPlatillo"] option:selected').text();
			Array.Total = TotalFormato;
			Array.FechaPedido = FechaDeOrden;
			Array.Comentario = $("#txtComentarioPlatillo").val();
			
            arrayListadoComida.push(Array);
			
			arrayListadoPlatilloUnico = arrayListadoComida;
	}
	//
	if((NoEmpleadoLogeado !="" && NombreEmpleado !="" && NoPlatillos !="" && TipoPlatillo !="0" && TipoPlatillo !="4" && Ubicacion !="0" && Total != "0.00")||(TipoPlatillo =="4" && CantidadArreglo >0)){
	
	//alert("Entra a guardado");
		$.ajax({
			type: "POST",
			data: {
				param: 2,
				NoEmpleadoLogeado: NoEmpleadoLogeado,
				NombreEmpleado: NombreEmpleado,
				TipoPlatillo : TipoPlatillo,
				Ubicacion:Ubicacion,
				FechaDeOrden: FechaDeOrden,
				arrayListadoGreenSpot : JSON.stringify(arrayListadoGreenSpot),
				arrayListadoPlatilloUnico : JSON.stringify(arrayListadoPlatilloUnico),
				pedidoporcomedor:1
			},
			url: "../utileria.php", 
			dataType: 'JSON',
			 success: function(data) {
			   for(i=0;i<data.length;i++){
					if(data[i]['Validar'] == true ){
						Swal.fire( 
							"La información ha sido guardada correctamente",
							'',
							'success'
						).then(function(){
							location.reload();
						});
						//MostarAlertas();
					}
						else{
							Swal.fire( 
								"La información no pudo ser guardada",
								'',
								'error'
							);
							$("#GuardarOrden").prop("disabled", false);
						}
					}
			}
		 });
	
	}else{
		Swal.fire( 
			"Favor de llenar la información",
			'',
			'info'
		);
		$("#GuardarOrden").prop("disabled", false);
	}
}

function CargarPedido(){
	$("#txtNumEmpleadoLogeado").val("");
	$("#txtNombreEmpleadoLogeado").val("");
	$("#txtTipoPlatillo").val("0");
	TipoPlatillo();
	$("#txtNumPlatillo").val("1");
	ValidarPlatillos()
	$("#txtComentarioPlatillo").val("");
	LimpiarCampos();
	$('#ModalCargaEvidenciaVisual').modal('show');
}