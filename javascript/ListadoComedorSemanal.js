var FechaHoy = "";
var FechaInicial = "";
var FechaFinal = "";
let fecha_completa = '';
let datos,
bandera_descargar = 0;
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
			MostrarInforme();
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

$("#txtNumEmpleadoLogeado").on('change',function(e){
	$("#DivComentarioglobal").hide();
	var fechaActualL = new Date(); //Fecha actual
	var fechaActual2 = moment(fechaActualL).format("YYYY-MM-DD");
	$("#txtFechaPedido").val(fechaActual2);
	var empleado = $("#txtNumEmpleadoLogeado").val()
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
				if(data.length != 0){
					for(i=0;i<data.length;i++){
						
						var FechaAr =  "Fecha: "+ fechaActual2; 
						$("#txtFechaDia").val(fechaActual2);
						$("#txtNombreEmpleadoLogeado").val(data[i]['Nombre']);
						$("#tipo_empleado").val(data[i]['Tipo_Empleado']);
					}
					$("#txtTipoPlatillo").trigger("change").val("3");
					$("#txtNumPlatillo").val(1);
					$("#txtTotalPlatillo").val(1);
					$("#txtComentarioPlatillo").val("");
					TipoPlatillo();
					if (empleado == 20000) {
						$("#DivComentarioglobal").show();
					}
				}else{
					Swal.fire( 
						'El número de empleado proporcionado no coincide con nuestros registros.',
						'',
						'info'
					);
					$("#txtFechaDia").val("");
					$("#txtNombreEmpleadoLogeado").val("");
					$("#txtNumEmpleadoLogeado").val("");
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
		$("#txtFechaDia").val("");
		$("#txtNombreEmpleadoLogeado").val("");
		$("#txtNumEmpleadoLogeado").val("");
	}
});

$('#txtNumEmpleadoLogeado').keyup(function (){
	let NoEmpleadoLogeado = $(this).val().toLowerCase();
	this.value = (this.value + '').replace(/[^0-9]/g, '');
	$("#txtNumPlatillo").removeAttr("maxlength");
	if (NoEmpleadoLogeado.length <= 3 && NoEmpleadoLogeado != '') {
		return false;	
	}
	if (NoEmpleadoLogeado == 20000) {	
		$("#txtNumPlatillo").attr("maxlength", "2");	
	}else{
		$("#txtNumPlatillo").attr("maxlength", "1");
	}
});

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

function DescargarTabla(){
	$("#TablaComedor").table2excel({
		filename: "Comedor_Plato_Express_"+fecha_completa+'.xls'
	});
}

function ConfirmacionEliminaAlimento(NoAlimento){
	var NoAlimentos = NoAlimento;
		Swal.fire({
			title: '¿Deseas eliminar el registro?',
			icon: 'info',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Eliminar',
			cancelButtonText: 'Cancelar'
		  }).then((res) => {
			if (res.isConfirmed) {
				Swal.fire({
					title: 'Eliminado',
					icon: 'success',
					text: 'Tu platillo se eliminó.',
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Continuar'
				}).then(function(){
					ElimarAlimento(NoAlimentos);
				});
			}else{
				return false;
			}
		});
}

function ElimarAlimento(NoAlimentos){
	$("#Alimento" + NoAlimentos).remove();
	var Lineas = $("#ListadoComidaGr tr").length;
	if(Lineas == 0){
		NoAlimento=0;
	}
}

$("#btn_nomina").on("click", function(e){
	debugger;
	$("#btn_nomina").addClass("deshabilitar");
  	$('#btn_nomina').attr("disabled", true);
	$('#lbl_pasar_nomina').hide();
	$("#btn_nomina").css("width", "6%");
	$('#cargando_pasar_nomina').show();
	$('#btn_nomina').addClass("nuevo_style_btn_nomina");
	let fecha = $('#txtFechaSeleccionado').val(),
	numero_empleado = $('#txtNumeroEmpleado').val();
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: {"param":15, "daterange":fecha, "numero_empleado":numero_empleado},
		success: function(result) {
			let datos = JSON.parse(result);
			if (datos.estatus == "success"){
				enviar_nomina(datos);
			}else{
				Swal.fire(datos.mensaje, "","info");
				$("#btn_nomina").removeAttr("disabled, disabled");
				$("#btn_nomina").removeClass("deshabilitar");
				$('#btn_nomina').attr("disabled", false);
				$('#lbl_pasar_nomina').show();
				$("#btn_nomina").css("width", "");
				$('#cargando_pasar_nomina').hide();
				$('#btn_nomina').addClass("nuevo_style_btn_nomina");
			}
		}
	});  
});

function enviar_nomina(resultados){
	debugger;
	let datos2 = resultados.data,
	i = 0;
	while (i < datos2.length) {
		if (datos2[i].EstatusComedor == 0) {
			Swal.fire('Sin Envio', "este pedido no puede ser enviado a nomina porque no esta confirmado o rechazado, No. Orden: "+datos[i].IdPedido,"info");
			$('#cargando_pasar_nomina').hide();
			$('#btn_nomina').addClass("nuevo_style_btn_nomina");
			$("#btn_nomina").removeAttr("disabled, disabled");
			$("#btn_nomina").removeClass("deshabilitar");
			$('#btn_nomina').attr("disabled", false);
			return;
		}
		if (datos2[i].EstatusEnviado == 1) {
			datos2.splice(i, 1);
        }else{
            ++i;
        }
    }
	if (datos2.length == 0) {
        Swal.fire('No hay registros para pasar a nomina', "","info");
		$("#btn_nomina").removeAttr("disabled, disabled");
		$("#btn_nomina").removeClass("deshabilitar");
		$('#btn_nomina').attr("disabled", false);
		$('#lbl_pasar_nomina').show();
		$("#btn_nomina").css("width", "");
		$('#cargando_pasar_nomina').hide();
		$('#btn_nomina').addClass("nuevo_style_btn_nomina");
        return false;
    }
	let datos_limpios = JSON.stringify(datos2);
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: {"param":11, "datos":datos_limpios, "estatus_enviado":1},
		success: function(result) {
			console.log(result);
			data = JSON.parse(result);
			if (data.estatus == "success"){
				Swal.fire('Estatus Envio', "El estatus enviado se actualizo correctamente", "success");
				bandera_descargar = 1;
				$("#btn_nomina").removeAttr("disabled, disabled");
				$("#btn_nomina").removeClass("deshabilitar");
				$('#btn_nomina').attr("disabled", false);
				MostrarInforme();
				$('#lbl_pasar_nomina').show();
				$("#btn_nomina").css("width", "");
				$('#cargando_pasar_nomina').hide();
				$('#btn_nomina').addClass("nuevo_style_btn_nomina");
			}else{
				Swal.fire('No hay Registros pendientes de pago', "","info");
				$("#btn_nomina").removeAttr("disabled, disabled");
				$("#btn_nomina").removeClass("deshabilitar");
				$('#btn_nomina').attr("disabled", false);
				$('#lbl_pasar_nomina').show();
				$("#btn_nomina").css("width", "");
				$('#cargando_pasar_nomina').hide();
				$('#btn_nomina').addClass("nuevo_style_btn_nomina");
			}
		}
	});
}

function MostrarInforme(){
	let Fecha = $("#txtFechaSeleccionado").val(),
	txtUbicacion = $("#txtUbicacion").val();
	$("#txtNumeroEmpleado").val('');
	if (Fecha == "") {
		Swal.fire( 
			"El campo fecha no puede ir vacío",
			'',
			'info'
		);
		return false;
	}
	let formData = new FormData(document.getElementById("form_comedor_semanal"));
  	formData.append("dato", "valor");
	formData.append("ubicacion", txtUbicacion);
	$("#filrado_empleado").hide();
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
				$("#filrado_empleado").show();
				$("#boton_descarga_excel").show();
				$("#EspacioTabla").show();
				$("#ContenidoListados").find("tr").remove();
				datos = data.data;
				for(let i = 0; i < datos.length; i++){
					let tablacontenido ="<tr id='tr_"+datos[i].IdPedido+"'>";
					tablacontenido +="<td  id='IDPedido"+datos[i].IdPedido+"' data-label= 'No. Orden'>"+datos[i].IdPedido+"</td>"
					tablacontenido +="<td  data-label= 'No. Empleado'>"+datos[i].NoEmpleado+"</td>"
					tablacontenido +="<td data-label= 'Empleado'>"+datos[i].NombreEmpleado+"</td>"
					if(datos[i].TipoPlatillo == "3"){
						tablacontenido +="<td data-label= 'Tipo de Platillo'>Platillo Unico</td>"
					}
					tablacontenido +="<td data-label= 'No. Platillo'>"+datos[i].NoPlatillo+"</td>"
					tablacontenido +="<td data-label= 'Platillo'>"+datos[i].Platillo+"</td>"
					tablacontenido +="<td data-label= 'Comentarios'>"+datos[i].Comentarios+"</td>"
					switch (datos[i]['Ubicacion']) {
						case 1:
							tablacontenido +="<td data-label= 'Ubicación'>Torre TOP</td>"
						break;

						case 2:
							tablacontenido +="<td data-label= 'Ubicación'>Apodaca</td>"
						break;

						case 3:
							tablacontenido +="<td data-label= 'Ubicación'>Cienega</td>"
						break;
					
						default:
							tablacontenido +="<td data-label= 'Ubicación'></td>"
						break;
					}
					tablacontenido += "<td data-label= 'FechaPedido' >"+datos[i].FechaPedido+"</td>"
					if (datos[i].EstatusEnviado == 0) {
						tablacontenido += "<td data-label= 'Estatus Enviado' >No Enviado</td>"
					}else if (datos[i].EstatusEnviado == 1) {
						tablacontenido += "<td data-label= 'Estatus Enviado' >Enviado</td>"
					}else if (datos[i].EstatusEnviado == 2) {
						tablacontenido += "<td data-label= 'Estatus Enviado' >Procesado en Nomina</td>"
					}else{
						tablacontenido += "<td data-label= 'Estatus Enviado' ></td>"
					}
					if (datos[i].EstatusComedor == 0) {
						tablacontenido += "<td data-label= 'Estatus Comedor'>Pendiente de Procesar</td>"
					}else if (datos[i].EstatusComedor == 1) {
						tablacontenido += "<td data-label= 'Estatus Comedor'>Entregado</td>"
					}else{
						tablacontenido += "<td data-label= 'Estatus Comedor'>Rechazado</td>"
					}
					tablacontenido += "<td data-label='' ><button id='btn_confirmar_pedido_"+datos[i].idComedorSub+"' class='btn mi_btn_success' onclick='ConfirmacionEstatusAlimento("+JSON.stringify(datos[i].IdPedido)+","+1+")'>Confirmar</button></td>"
					tablacontenido += "<td data-label='' ><button id='btn_rechazar_pedido_"+datos[i].idComedorSub+"' class='btn btn-danger' onclick='RechazarEstatusAlimento("+JSON.stringify(datos[i].IdPedido)+","+2+")'>Eliminar</button></td>"
					tablacontenido +="</tr>";
					$('#ContenidoListados').append(tablacontenido);
					if (datos[i].EstatusComedor == 2) {
						$('#tr_'+datos[i].IdPedido).addClass("clase_rechazada");
					}
					deshabilitar_botones(datos[i].idComedorSub, datos[i].EstatusComedor);
				}
				if (bandera_descargar == 1) {
					DescargarTabla();
					bandera_descargar = 0;
				}	
			}else if (data.estatus == "error_fecha") {
				$("#loading_comedor").hide();
				$("#EspacioTabla").hide();
				$("#div_tabla").hide();
				$("#boton_descarga_excel").hide();
				$("#filrado_empleado").hide();
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
				$("#filrado_empleado").hide();
				Swal.fire( 
					data.mensaje,
					'',
					'error'
				);
			}
		}
	});
}

function deshabilitar_botones(id, estatus_comedor){
	if (estatus_comedor == 0) {
		$("#btn_confirmar_pedido_"+id).removeAttr("disabled, disabled");
		$("#btn_confirmar_pedido_"+id).removeClass("deshabilitar");
		$('#btn_confirmar_pedido_'+id).attr("disabled", false);
		$("#btn_rechazar_pedido_"+id).removeAttr("disabled, disabled");
		$("#btn_rechazar_pedido_"+id).removeClass("deshabilitar");
		$('#btn_rechazar_pedido_'+id).attr("disabled", false);
	}else if(estatus_comedor == 1 || estatus_comedor == 2){
		$("#btn_confirmar_pedido_"+id).addClass("deshabilitar");
		$('#btn_confirmar_pedido_'+id).attr("disabled", true);
		$("#btn_rechazar_pedido_"+id).addClass("deshabilitar");
		$('#btn_rechazar_pedido_'+id).attr("disabled", true);
	} 
}

$("#txtNumeroEmpleado").on('change',function(e){
	let Fecha = $("#txtFechaSeleccionado").val(),
	numero_empleado = $(this).val().toLowerCase(),
	txtUbicacion = $("#txtUbicacion").val();
	regex = /^[a-zA-Z ]+$/;
	this.value = (this.value + '').replace(/[^0-9]/g, '');
	if (regex.test(numero_empleado)) {
		return false;
	}
	if (Fecha == "") {
		Swal.fire( 
			"El campo fecha no puede ir vacío",
			'',
			'info'
		);
		return false;
	}
	if (numero_empleado.length <= 3 && numero_empleado != '') {
		return false;	
	}
	let formData = new FormData(document.getElementById("form_comedor_semanal"));
  	formData.append("dato", "valor");
	formData.append("numero_empleado", numero_empleado);
	formData.append("ubicacion", txtUbicacion);
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
				$("#boton_descarga_excel").show();
				$("#EspacioTabla").show();
				$("#ContenidoListados").find("tr").remove();
				datos = data.data;
				for(let i = 0; i < datos.length; i++){
					let tablacontenido ="<tr id='tr_"+datos[i].IdPedido+"'>";
					tablacontenido +="<td  id='IDPedido"+datos[i].IdPedido+"' data-label= 'No. Orden'>"+datos[i].IdPedido+"</td>"
					tablacontenido +="<td  data-label= 'No. Empleado'>"+datos[i].NoEmpleado+"</td>"
					tablacontenido +="<td data-label= 'Empleado'>"+datos[i].NombreEmpleado+"</td>"
					if(datos[i].TipoPlatillo == "3"){
						tablacontenido +="<td data-label= 'Tipo de Platillo'>Platillo Unico</td>"
					}
					tablacontenido +="<td data-label= 'No. Platillo'>"+datos[i].NoPlatillo+"</td>"
					tablacontenido +="<td data-label= 'Platillo'>"+datos[i].Platillo+"</td>"
					tablacontenido +="<td data-label= 'Comentarios' style='display:none;'>"+datos[i].Comentarios+"</td>"
					switch (datos[i]['Ubicacion']) {
						case 1:
							tablacontenido +="<td data-label= 'Ubicación'>Torre TOP</td>"
						break;

						case 2:
							tablacontenido +="<td data-label= 'Ubicación'>Apodaca</td>"
						break;

						case 3:
							tablacontenido +="<td data-label= 'Ubicación'>Cienega</td>"
						break;
					
						default:
							tablacontenido +="<td data-label= 'Ubicación'></td>"
						break;
					}
					tablacontenido += "<td data-label= 'FechaPedido' >"+datos[i].FechaPedido+"</td>"
					if (datos[i].EstatusEnviado == 0) {
						tablacontenido += "<td data-label= 'Estatus Enviado' >No Enviado</td>"
					}else if (datos[i].EstatusEnviado == 1) {
						tablacontenido += "<td data-label= 'Estatus Enviado' >Enviado</td>"
					}else if (datos[i].EstatusEnviado == 2) {
						tablacontenido += "<td data-label= 'Estatus Enviado' >Procesado en Nomina</td>"
					}else{
						tablacontenido += "<td data-label= 'Estatus Enviado' ></td>"
					}
					if (datos[i].EstatusComedor == 0) {
						tablacontenido += "<td data-label= 'Estatus Comedor'>Pendiente de Procesar</td>"
					}else if (datos[i].EstatusComedor == 1) {
						tablacontenido += "<td data-label= 'Estatus Comedor'>Entregado</td>"
					}else{
						tablacontenido += "<td data-label= 'Estatus Comedor'>Rechazado</td>"
					}
					tablacontenido += "<td data-label='' ><button id='btn_confirmar_pedido_"+datos[i].idComedorSub+"' class='btn mi_btn_success' onclick='ConfirmacionEstatusAlimento("+JSON.stringify(datos[i].IdPedido)+","+1+")'>Confirmar</button></td>"
					tablacontenido += "<td data-label='' ><button id='btn_rechazar_pedido_"+datos[i].idComedorSub+"' class='btn btn-danger' onclick='RechazarEstatusAlimento("+JSON.stringify(datos[i].IdPedido)+","+2+")'>Eliminar</button></td>"
					tablacontenido +="</tr>";
					$('#ContenidoListados').append(tablacontenido);
					if (datos[i].EstatusComedor == 2) {
						$('#tr_'+datos[i].IdPedido).addClass("clase_rechazada");
					}
					deshabilitar_botones(datos[i].idComedorSub, datos[i].EstatusComedor);
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
});

// $("#txtNumeroEmpleado").on("keyup", function() {
// 	let Fecha = $("#txtFechaSeleccionado").val(),
// 	numero_empleado = $(this).val().toLowerCase(),
// 	txtUbicacion = $("#txtUbicacion").val();
// 	regex = /^[a-zA-Z ]+$/;
// 	this.value = (this.value + '').replace(/[^0-9]/g, '');
// 	if (regex.test(numero_empleado)) {
// 		return false;
// 	}
// 	if (Fecha == "") {
// 		Swal.fire( 
// 			"El campo fecha no puede ir vacío",
// 			'',
// 			'info'
// 		);
// 		return false;
// 	}
// 	if (numero_empleado.length <= 3 && numero_empleado != '') {
// 		return false;	
// 	}
// 	let formData = new FormData(document.getElementById("form_comedor_semanal"));
//   	formData.append("dato", "valor");
// 	formData.append("numero_empleado", numero_empleado);
// 	formData.append("ubicacion", txtUbicacion);
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
// 				$("#boton_descarga_excel").show();
// 				$("#EspacioTabla").show();
// 				$("#ContenidoListados").find("tr").remove();
// 				datos = data.data;
// 				for(let i = 0; i < datos.length; i++){
// 					let tablacontenido ="<tr>";
// 					tablacontenido +="<td  id='IDPedido"+datos[i].IdPedido+"' data-label= 'No. Orden'>"+datos[i].IdPedido+"</td>"
// 					tablacontenido +="<td  data-label= 'No. Empleado'>"+datos[i].NoEmpleado+"</td>"
// 					tablacontenido +="<td data-label= 'Empleado'>"+datos[i].NombreEmpleado+"</td>"
// 					if(datos[i].TipoPlatillo == "3"){
// 						tablacontenido +="<td data-label= 'Tipo de Platillo'>Platillo Unico</td>"
// 					}
// 					tablacontenido +="<td data-label= 'No. Platillo'>"+datos[i].NoPlatillo+"</td>"
// 					tablacontenido +="<td data-label= 'Platillo'>"+datos[i].Platillo+"</td>"
// 					tablacontenido +="<td data-label= 'Comentarios' style='display:none;'>"+datos[i].Comentarios+"</td>"
// 					switch (datos[i]['Ubicacion']) {
// 						case 1:
// 							tablacontenido +="<td data-label= 'Ubicación'>Torre TOP</td>"
// 						break;

// 						case 2:
// 							tablacontenido +="<td data-label= 'Ubicación'>Apodaca</td>"
// 						break;

// 						case 3:
// 							tablacontenido +="<td data-label= 'Ubicación'>Cienega</td>"
// 						break;
					
// 						default:
// 							tablacontenido +="<td data-label= 'Ubicación'></td>"
// 						break;
// 					}
// 					tablacontenido += "<td data-label= 'FechaPedido' >"+datos[i].FechaPedido+"</td>"
// 					if (datos[i].EstatusEnviado == 0) {
// 						tablacontenido += "<td data-label= 'Estatus Enviado' >No Enviado</td>"
// 					}else if (datos[i].EstatusEnviado == 1) {
// 						tablacontenido += "<td data-label= 'Estatus Enviado' >Enviado</td>"
// 					}else if (datos[i].EstatusEnviado == 2) {
// 						tablacontenido += "<td data-label= 'Estatus Enviado' >Procesado en Nomina</td>"
// 					}else{
// 						tablacontenido += "<td data-label= 'Estatus Enviado' ></td>"
// 					}
// 					if (datos[i].EstatusComedor == 0) {
// 						tablacontenido += "<td data-label= 'Estatus Comedor'>Pendiente de Procesar</td>"
// 					}else if (datos[i].EstatusComedor == 1) {
// 						tablacontenido += "<td data-label= 'Estatus Comedor'>Entregado</td>"
// 					}else{
// 						tablacontenido += "<td data-label= 'Estatus Comedor'>Rechazado</td>"
// 					}
// 					tablacontenido += "<td data-label='' ><button id='btn_confirmar_pedido_"+datos[i].idComedorSub+"' class='btn mi_btn_success' onclick='ConfirmacionEstatusAlimento("+JSON.stringify(datos[i].IdPedido)+","+1+")'>Confirmar</button></td>"
// 					tablacontenido += "<td data-label='' ><button id='btn_rechazar_pedido_"+datos[i].idComedorSub+"' class='btn btn-danger' onclick='RechazarEstatusAlimento("+JSON.stringify(datos[i].IdPedido)+","+2+")'>Eliminar</button></td>"
// 					tablacontenido +="</tr>";
// 					$('#ContenidoListados').append(tablacontenido);
// 					deshabilitar_botones(datos[i].idComedorSub, datos[i].EstatusComedor);
// 				}
// 			}else if (data.estatus == "error_fecha") {
// 				$("#loading_comedor").hide();
// 				$("#EspacioTabla").hide();
// 				$("#div_tabla").hide();
// 				$("#boton_descarga_excel").hide();
// 				Swal.fire( 
// 					data.mensaje,
// 					'',
// 					'info'
// 				);
// 			}else{
// 				$("#loading_comedor").hide();
// 				$("#EspacioTabla").hide();
// 				$("#div_tabla").hide();
// 				$("#boton_descarga_excel").hide();
// 				Swal.fire( 
// 					data.mensaje,
// 					'',
// 					'error'
// 				);
// 			}
// 		}
// 	});
// });

function TipoPlatillo(){
	var tipoplatillo = $("#txtTipoPlatillo").val();
	$("#txtProductoSeleccionadoGR").empty();
	$("#ListadoComidaGr").find("tr").remove();
	 LimpiarCampos();
	if(tipoplatillo !="4"){
		$("#ComidaGR").css("display", "none");
		$("#DivCantidad").css("display", "");
		// $("#DivTotal").css("display", "");
		// $("#DivPrecio").css("display", "");
		// $("#DivComentario").css("display", "");
		
		
		var seleccionar = "<option value='0'> Seleccionar Platillo</option>";
		$('#txtProductoSeleccionadoGR').append(seleccionar);
		if(tipoplatillo =="0"){
			$("#DivCantidad").css("display", "none");
			// $("#DivTotal").css("display", "none");
			// $("#DivPrecio").css("display", "none");
			// $("#DivComentario").css("display", "none");
		}
	$("#txtNumPlatillo").val("1");
	$("#txtTotalPlatillo").val("47.50");
	$("#txtPrecioPlatillo").val("47.50");
	}
	else{
		$("#ComidaGR").css("display", "");
		$("#DivCantidad").css("display", "none");
		// $("#DivTotal").css("display", "none");
		// $("#DivPrecio").css("display", "none");
		// $("#DivComentario").css("display", "none");
		$("#txtNumPlatillo").val("0");
		
		$.ajax({
            type: "POST",
            data: {
                param: 4,
				tipoplatillo: tipoplatillo 
            },
            url: "../../utileria.php",
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
            url: "../../utileria.php",
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
	let platillos = parseInt($("#txtNumPlatillo").val()),
	no_empleado = $("#txtNumEmpleadoLogeado").val();
	if (platillos > 1 && no_empleado != 20000) {
		Swal.fire('Solo puedes pedir un platillo de comida.', "","info");
		$("#txtNumPlatillo").val(1);
		platillos = parseInt($("#txtNumPlatillo").val());
	}
	if(platillos < 1){
		$("#txtNumPlatillo").val(1);
		platillos = parseInt($("#txtNumPlatillo").val());
	}
	if (platillos == '' || isNaN(platillos)) {
		return false;
	}
	let Precio = parseFloat($("#txtPrecioPlatillo").val());
	let Calculo = Precio * platillos;
	$("#txtTotalPlatillo").val(parseFloat(Calculo).toFixed(2));
}

function GuardarOrden(){
	debugger;
	$("#GuardarOrdenS").addClass("deshabilitar");
  	$('#GuardarOrdenS').attr("disabled", true);
	let NoEmpleadoLogeado = $("#txtNumEmpleadoLogeado").val();
	let NombreEmpleado =  $("#txtNombreEmpleadoLogeado").val();
	let NoPlatillos = $("#txtNumPlatillo").val();
	let TipoPlatillo = $("#txtTipoPlatillo").val();
	let Ubicacion = $("#txtUbicacion").val(),
	CantidadArreglo = 0;
	let Total = $("#txtTotalPlatillo").val();
	let Precio= $("#txtPrecioPlatillo").val();
	let Tipo_Empleado= $("#tipo_empleado").val(),
	comentario_global= $("#txtComentarioGlobalPlatillo").val();
	//
	let arrayListadoGreenSpot = {};
	let arrayListadoPlatilloUnico = {};
	let fechaActualL = new Date(); //Fecha actual
	let FechaDeOrden = moment(fechaActualL).format("YYYY-MM-DD HH:mm:ss"),
	dia_actual = moment(fechaActualL).format('DD'),
	nombre_dia_actual = moment(fechaActualL).format('dddd');
	switch (nombre_dia_actual) {
		case 'Saturday':
			dia_inicial = dia_actual - 1;
			FechaDeOrden = moment(fechaActualL).format("YYYY-MM-"+dia_inicial+" HH:mm:ss");
		break;
		case 'Sunday':
			dia_inicial = dia_actual - 2;
			FechaDeOrden = moment(fechaActualL).format("YYYY-MM-"+dia_inicial+" HH:mm:ss");
		break;
	
		default:
		break;
	}
	//
	if(TipoPlatillo== "4"){
	//let arrayListadoGreenSpot = {};
		arrayListadoGreenSpot = GuardarListadoGreenSpot();
		CantidadArreglo = arrayListadoGreenSpot.length; 
	}else{
		// 
		let TotalFormato = parseFloat( $("#txtTotalPlatillo").val()).toFixed(2) //$("#txtTotalPlatillo").val(parseFloat(Calculo).toFixed(2));
		let arrayListadoComida = [];
		 let Array = {};
			
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
	// if (NoEmpleadoLogeado =="") {
	// 	Swal.fire( 
	// 		"Debes llenar el número de empleado",
	// 		'',
	// 		'info'
	// 	);
	// 	return;
	// }
	if (NoPlatillos < 1) {
        Swal.fire('El número de platillos es requerido', "","info");
		$("#GuardarOrdenS").removeAttr("disabled, disabled");
		$("#GuardarOrdenS").removeClass("deshabilitar");
		$("#GuardarOrdenS").attr("disabled", false);
		ValidarPlatillos();
        return false;
    }
	if (NoPlatillos > 1 && NoEmpleadoLogeado != 20000) {
        Swal.fire('Solo puedes pedir un platillo', "","info");
		$("#GuardarOrdenS").removeAttr("disabled, disabled");
		$("#GuardarOrdenS").removeClass("deshabilitar");
		$("#GuardarOrdenS").attr("disabled", false);
		ValidarPlatillos();
        return false;
    }
	if (comentario_global == '' && NoEmpleadoLogeado == 20000) {
        Swal.fire('Comentario no puede ir vació', "","info");
		$("#GuardarOrdenS").removeAttr("disabled, disabled");
		$("#GuardarOrdenS").removeClass("deshabilitar");
		$("#GuardarOrdenS").attr("disabled", false);
        return false;
    }
	if((NoEmpleadoLogeado !="" && NombreEmpleado !="" && TipoPlatillo !="0" && TipoPlatillo !="4" && Ubicacion !="0" && Total != "0.00" && Tipo_Empleado != "0")||(CantidadArreglo > 0)){
		$.ajax({
			type: "POST",
			data: {
				param: 2,
				NoEmpleadoLogeado: NoEmpleadoLogeado,
				NombreEmpleado: NombreEmpleado,
				TipoPlatillo : TipoPlatillo,
				Ubicacion:Ubicacion,
				Tipo_Empleado:Tipo_Empleado,
				FechaDeOrden: FechaDeOrden,
				arrayListadoGreenSpot : JSON.stringify(arrayListadoGreenSpot),
				arrayListadoPlatilloUnico : JSON.stringify(arrayListadoPlatilloUnico),
				pedidoporcomedor:1,
				comentario_global:comentario_global
			},
			url: "../../utileria.php", 
			success: function(result) {
				data = JSON.parse(result);
				if (data.estatus === "success") {
					Swal.fire('El pedido de la comida ha sido guardado correctamente.', "Pedido de comida Guardado.","success")
					.then(function(){
						$("#txtComentarioGlobalPlatillo").val("");
						CargarPedido();
						MostrarInforme();
						$("#GuardarOrdenS").removeAttr("disabled, disabled");
						$("#GuardarOrdenS").removeClass("deshabilitar");
						$("#GuardarOrdenS").attr("disabled", false);
					});
				}else if(data.estatus === "pedido_duplicado"){
					Swal.fire('Solo se puede realizar un pedido al día.', "","info");
					$("#GuardarOrdenS").removeAttr("disabled, disabled");
					$("#GuardarOrdenS").removeClass("deshabilitar");
					$("#GuardarOrdenS").attr("disabled", false);
				}else{
					Swal.fire('La información no pudo ser guardada.', "","error");
					console.log(data.mensaje);
					$("#GuardarOrdenS").removeAttr("disabled, disabled");
					$("#GuardarOrdenS").removeClass("deshabilitar");
					$("#GuardarOrdenS").attr("disabled", false);
				}
			}
		});
	}else{
		Swal.fire( 
			"Favor de llenar la información",
			'',
			'info'
		);
		$("#GuardarOrdenS").removeAttr("disabled, disabled");
		$("#GuardarOrdenS").removeClass("deshabilitar");
		$("#GuardarOrdenS").attr("disabled", false);
		ValidarPlatillos();
	}
}

function CargarPedido(){
	$("#DivComentarioglobal").hide();
	$("#txtNumEmpleadoLogeado").val("");
	$("#txtNombreEmpleadoLogeado").val("");
	$("#txtTipoPlatillo").val("0");
	TipoPlatillo();
	$("#txtNumPlatillo").val("1");
	ValidarPlatillos()
	$("#txtComentarioPlatillo").val("");
	LimpiarCampos();
	$('#ModalCargaEvidenciaVisual').modal('show');
	let ubicacion = $("#txtUbicacion").val();
	// if (ubicacion == 1) {
		$("#txtTipoPlatillo").trigger("change").val(3);
		TipoPlatillo();
	// }
}

// function ConfirmacionEstatusAlimento(id_pedido, estatus_comedor){
// 	Swal.fire({
// 		title: '¿Quieres confirmar el pedido?',
// 		icon: 'info',
// 		showCancelButton: true,
// 		confirmButtonColor: '#3085d6',
// 		cancelButtonColor: '#d33',
// 		confirmButtonText: 'Confirmar',
// 		cancelButtonText: 'Cancelar'
// 	  }).then((res) => {
// 		if (res.isConfirmed) {
// 			$.ajax({
// 				url: "../../utileria.php",
// 				type: "post",
// 				data: {"param":12, "id_pedido":id_pedido, "estatus_comedor":estatus_comedor},
// 				success: function(result) {
// 					data = JSON.parse(result);
// 					if (data.estatus == 'success') {
// 						Swal.fire(
// 							'Confirmado',
// 							'Tu platillo se confirmo.',
// 							'success'
// 						  ).then(function(){
// 							  MostrarInforme();
// 						  });
// 					}else{
// 						if (res.isConfirmed) {
// 							Swal.fire( 
// 								data.mensaje,
// 								'',
// 								'error'
// 							);
// 						}
// 					}
// 				}
// 			});	
// 		}
// 	});
// }

function ConfirmacionEstatusAlimento(id_pedido, estatus_comedor){
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: {"param":12, "id_pedido":id_pedido, "estatus_comedor":estatus_comedor},
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus == 'success') {
				Swal.fire(
					'Confirmado',
					'Tu platillo se confirmo.',
					'success'
				  ).then(function(){
					  MostrarInforme();
				  });
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
}

// function RechazarEstatusAlimento(id_pedido, estatus_comedor){
// 	Swal.fire({
// 		title: '¿Quieres rechazar el pedido?',
// 		icon: 'info',
// 		showCancelButton: true,
// 		confirmButtonColor: '#3085d6',
// 		cancelButtonColor: '#d33',
// 		confirmButtonText: 'Rechazar',
// 		cancelButtonText: 'Cancelar'
// 	  }).then((res) => {
// 		if (res.isConfirmed) {
// 			$.ajax({
// 				url: "../../utileria.php",
// 				type: "post",
// 				data: {"param":12, "id_pedido":id_pedido, "estatus_comedor":estatus_comedor},
// 				success: function(result) {
// 					data = JSON.parse(result);
// 					if (data.estatus == 'success') {
// 						Swal.fire(
// 							'Rechazado',
// 							'Tu platillo fue Rechazado.',
// 							'success'
// 						  ).then(function(){
// 							  MostrarInforme();
// 						  });	
// 					}else{
// 						if (res.isConfirmed) {
// 							Swal.fire( 
// 								data.mensaje,
// 								'',
// 								'error'
// 							);
// 						}
// 					}
// 				}
// 			});				
// 		}
// 	});
// }

function RechazarEstatusAlimento(id_pedido, estatus_comedor){
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: {"param":12, "id_pedido":id_pedido, "estatus_comedor":estatus_comedor},
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus == 'success') {
				Swal.fire(
					'Rechazado',
					'Tu platillo fue Rechazado.',
					'success'
					).then(function(){
						MostrarInforme();
					});	
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

$("#txtNumPlatillo").on("keyup", function() {
	let cantidad_platillos = $(this).val().toLowerCase();
	regex = /^[a-zA-Z ]+$/;
	this.value = (this.value + '').replace(/[^0-9]/g, '');
	if (regex.test(cantidad_platillos)) {
		ValidarPlatillos();
		return;
	}
	if (cantidad_platillos.length > 1 && no_empleado != 20000) {
		Swal.fire('Solo puedes pedir un platillo de comida.', "","info");
		ValidarPlatillos();
		return false;	
	}
	if (cantidad_platillos == '' || isNaN(cantidad_platillos)) {
		return false;
	}
	ValidarPlatillos();
});