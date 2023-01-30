var FechaHoy = "";
var FechaInicial = "";
var FechaFinal = "";
let fecha_completa = '';
var NumPreguntas = 0;
var NoAlimento = 0;
var NoDatosBioquimicos = 0;
let datos,
bandera_descargar = 0;
let fechaActual2 = "";
let posicion_final_editar = 0;
let bandera_editar = 0;

$(document).ready(function(){
	ObtenerFecha();
	window.location.hash="no-back-button";
	window.location.hash="Again-No-back-button";//esta linea es necesaria para chrome
	window.onhashchange=function(){window.location.hash="no-back-button";}

	BuscarEmpleadoLogeadoSesion();
	buscar_sede();
	// setInterval(function(){
	// 	let hoy = new Date();
	// 	let dia = hoy.getDay(),
	// 	hora = hoy.getHours(),
	// 	minutos = hoy.getMinutes();
	// 	let Fecha = $("#txtFechaSeleccionado").val(),
	// 	Ubicacion = $("#txtUbicacion").val();
	// 	console.log(hora+':'+minutos);
	// 	return false;
    //     // if(hora == 21 && minutos == 0 && dia != 6 && dia != 7) {
	// 		$.ajax({
	// 			url: "../../utileria.php",
	// 			type: "post",
	// 			data: {"param":25, "Fecha":Fecha, "Ubicacion":Ubicacion, "estatus_comedor":2},
	// 			success: function(result) {
	// 				data = JSON.parse(result);
	// 				MostrarInforme();
	// 			}
	// 		});
    //     // }
    // }, 1000000);
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
	fechaActual2 = moment(fechaActualL).format("YYYY-MM-DD");
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

function Contraseña() {
	var Contraseña = prompt("Favor de ingresar la contrasea", "");
	var Respuesta;
	//Detectamos si el usuario ingreso un valor
	if (Contraseña == "ComedorArzyz$2021Green"){
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

function MostrarInforme(){
	let Fecha = $("#txtFechaSeleccionado").val(),
	txtUbicacion = $("#txtUbicacion").val();
	$("#txtNumeroEmpleado").val('');
	let ID = "";
	let RowID = 0;
	if (Fecha == "") {
		Swal.fire( 
			"El campo fecha no puede ir vacío",
			'',
			'info'
		);
		return;
	}
	let formData = new FormData(document.getElementById("form_greenspot_comedor_semanal"));
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
				for(var i=0; i < datos.length; i++){
					if(ID != datos[i].IdPedido){
						ID = datos[i].IdPedido;
						var tablacontenido ="<tr id='tr_"+datos[i].IdPedido+"'>";
						tablacontenido +="<td  id='IDPedido"+datos[i].IdPedido+"' data-label= 'No. Orden'>"+datos[i].IdPedido+"</td>"
						tablacontenido +="<td  id='IDNoEmpleado"+datos[i].IdPedido+"' data-label= 'No. Empleado'>"+datos[i].NoEmpleado+"</td>"
						tablacontenido +="<td  id='IDNomEmpleado"+datos[i].IdPedido+"'' data-label= 'Empleado'>"+datos[i].NombreEmpleado+"</td>"
						tablacontenido +="<td data-label= 'No. Platillo'>"+datos[i].NoPlatillo+"</td>"
						tablacontenido +="<td data-label= 'Platillo'>"+datos[i].Platillo+"</td>"
						tablacontenido +="<td data-label= 'Comentarios'>"+datos[i].Comentarios+"</td>"
						// tablacontenido +="<td data-label= 'Kcal' style='display:none;'>"+datos[i].Kcal+"</td>"
						tablacontenido +="<td data-label= 'Precio'>"+parseFloat(datos[i].Precio).toFixed(2)+"</td>"
						tablacontenido +="<td data-label= 'Total'>"+parseFloat(datos[i].total).toFixed(2)+"</td>"
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
						tablacontenido += "<td data-label='' ><button id='btn_confirmar_green_pedido_"+datos[i].id+"' class='btn mi_btn_success'  onclick='ConfirmacionEstatusAlimentoGreen("+JSON.stringify(datos[i].IdPedido)+","+1+")'>Confirmar</button></td>"
						tablacontenido += "<td data-label='' ><button id='btn_editar_green_pedido_"+datos[i].id+"' class='btn btn-primary' onclick='EditarAlimentoGreen("+JSON.stringify(datos[i].IdPedido)+")'>Editar</button></td>"
						tablacontenido += "<td data-label='' ><button id='btn_rechazar_green_pedido_"+datos[i].id+"' class='btn btn-danger' onclick='RechazarEstatusAlimentoGreen("+JSON.stringify(datos[i].IdPedido)+","+2+")'>Eliminar</button></td>"
						// tablacontenido += "<td data-label='' ><button id='btn_confirmar_green_pedido_"+i+"' class='btn mi_btn_success'  onclick='ConfirmacionEstatusAlimentoGreen("+i+","+1+")'>Confirmar</button></td>"
						// tablacontenido += "<td data-label='' ><button id='btn_rechazar_green_pedido_"+i+"' class='btn btn-danger' onclick='RechazarEstatusAlimentoGreen("+i+","+2+")'>Eliminar</button></td>"
						
						tablacontenido +="</tr>";
						$('#ContenidoListados').append(tablacontenido);
						if (datos[i].EstatusComedor == 2) {
							$('#tr_'+datos[i].IdPedido).addClass("clase_rechazada");
						}
						deshabilitar_botones_green(datos[i].id, datos[i].EstatusComedor);
						RowID = 0;
						
					}else{
						RowID= RowID +1;
						var RowFinal = RowID +1;
						$("#IDPedido" +datos[i].IdPedido ).attr('rowspan', RowFinal);
						$("#IDNoEmpleado" +datos[i].IdPedido ).attr('rowspan', RowFinal);
						$("#IDNomEmpleado" +datos[i].IdPedido ).attr('rowspan', RowFinal);
						var tablacontenidoD ="<tr id='tr_"+RowID+"_"+datos[i].IdPedido+"'><td data-label= 'No. Platillo'>"+datos[i].NoPlatillo+"</td>"
						tablacontenidoD +="<td data-label= 'Platillo'>"+datos[i].Platillo+"</td>"
						tablacontenidoD +="<td data-label= 'Comentarios'></td>"
						// tablacontenidoD +="<td data-label= 'Kcal' style='display:none;'>"+datos[i].Kcal+"</td>"
						tablacontenidoD +="<td data-label= 'Precio'>"+parseFloat(datos[i].Precio).toFixed(2)+"</td>"
						tablacontenidoD +="<td data-label= 'Total'>"+parseFloat(datos[i].total).toFixed(2)+"</td>"
						tablacontenidoD +="<td data-label= 'Ubicación'></td>"
						tablacontenidoD +="<td></td>"
						tablacontenidoD +="<td></td>"
						tablacontenidoD +="<td></td>"
						tablacontenidoD +="<td></td>"
						tablacontenidoD +="<td></td>"
						tablacontenidoD +="<td></td></tr>"
						$('#ContenidoListados').append(tablacontenidoD);
						if (datos[i].EstatusComedor == 2) {
							$('#tr_'+RowID+'_'+datos[i].IdPedido).addClass("clase_rechazada");
						}
					}
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

function deshabilitar_botones_green(id, estatus_comedor){
	if (estatus_comedor == 0) {
		$("#btn_confirmar_green_pedido_"+id).removeAttr("disabled, disabled");
		$("#btn_confirmar_green_pedido_"+id).removeClass("deshabilitar");
		$('#btn_confirmar_green_pedido_'+id).attr("disabled", false);
		$("#btn_rechazar_green_pedido_"+id).removeAttr("disabled, disabled");
		$("#btn_rechazar_green_pedido_"+id).removeClass("deshabilitar");
		$('#btn_rechazar_green_pedido_'+id).attr("disabled", false);
	}else if(estatus_comedor == 1 || estatus_comedor == 2){
		$("#btn_confirmar_green_pedido_"+id).addClass("deshabilitar");
		$('#btn_confirmar_green_pedido_'+id).attr("disabled", true);
		$("#btn_rechazar_green_pedido_"+id).addClass("deshabilitar");
		$('#btn_rechazar_green_pedido_'+id).attr("disabled", true);
		$("#btn_editar_green_pedido_"+id).addClass("deshabilitar");
		$('#btn_editar_green_pedido_'+id).attr("disabled", true);
	} 
}

// function ConfirmacionEstatusAlimentoGreen(id_pedido, estatus_comedor){
// 	Swal.fire({
// 		title: '¿Quieres confirmar el pedido?',
// 		icon: 'info',
// 		showCancelButton: true,
// 		confirmButtonColor: '#3085d6',
// 		cancelButtonColor: '#d33',
// 		confirmButtonText: 'Confirmar',
// 		cancelButtonText: 'Cancelar'
// 	  }).then((res) => {
// 		if (res.isConfirmed) {$.ajax({
// 			url: "../../utileria.php",
// 			type: "post",
// 			data: {"param":12, "id_pedido":id_pedido, "estatus_comedor":estatus_comedor},
// 			success: function(result) {
// 				data = JSON.parse(result);
// 				if (data.estatus == 'success') {
// 					Swal.fire(
// 						'Confirmado',
// 						'Tu platillo se confirmo.',
// 						'success'
// 					  ).then(function(){
// 						  MostrarInforme();
// 					  });
// 				}else{
// 					if (res.isConfirmed) {
// 						Swal.fire( 
// 							data.mensaje,
// 							'',
// 							'error'
// 						);
// 					}
// 				}
// 			}
// 		});
// 		}	
// 	});
// }

function ConfirmacionEstatusAlimentoGreen(id_pedido, estatus_comedor){
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: {"param":12, "id_pedido":id_pedido, "estatus_comedor":estatus_comedor},
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus == 'success') {
				// Swal.fire(
				// 	'Confirmado',
				// 	'Tu platillo se confirmo.',
				// 	'success'
				// ).then(function(){
				// 	MostrarInforme();
				// });
				MostrarInforme();
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

function EditarAlimentoGreen(id_pedido){
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: {"param":27, "id_pedido":id_pedido},
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus == 'success') {
				CargarPedidoEditar(data.data);
			}else{
				console.log("no llego");
			}
		}
	});
}

function CargarPedidoEditar(datos){
	$('#ModalEditar').modal('show');
	$("#ComidaGR_Editar").show();
	// $("#ListadoComidaGr_Editar").html("");
	$('#txtIdPedido_Editar').val(datos[0].IdPedido);
	$('#txtNumEmpleadoLogeado_Editar').val(datos[0].NoEmpleado);
	$('#txtNombreEmpleadoLogeado_Editar').val(datos[0].NombreEmpleado);
	$("#txtFechaDia_Editar").val(fechaActual2);
	$('#txtUbicacion_Editar').trigger("change").val(datos[0].Ubicacion);
	$('#txtTipoPlatillo_Editar').trigger("change").val(datos[0].TipoPlatillo);
	TipoPlatillo_Editar();
	Traer_Tipo_Empleado(datos[0].NoEmpleado);
	$("#div_mostrar_tabla_pedido_Editar").show();
	for (let i = 0; i < datos.length; i++) {
		let NuevoAlimento = '<tr id="AlimentoEditar'+i+'">';
		//style="display:none"
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Posición" style="display:none" id="tdPosiciónAlimentoEditar'+i+'">'+i+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Id. Platillo" style="display:none" id ="tdIdPlatilloEditar'+i+'">'+datos[i].IdPedido+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Platillo" id ="tdPlatilloEditar'+i+'">'+datos[i].Platillo+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Comentario" style="display:none" id ="tdComentarioPlatilloEditar'+i+'" >'+datos[i].Comentarios+'</td>';
		
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Tipo Platillo" style="display:none" id ="tdTipoPlatilloEditar'+i+'">'+datos[i].TipoPlatillo+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Kcal." id ="tdKcalPlatilloEditar'+i+'" style="display:none;">'+datos[i].Kcal+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Cantidad" id ="tdCantidadPlatilloEditar'+i+'">'+datos[i].NoPlatillo+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Precios" id ="tdPrecioUnitarioPlatilloEditar'+i+'" style="display:none">'+datos[i].Precio+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Total" id ="tdPrecioTotalPlatilloEditar'+i+'" style="display:none">'+datos[i].total+'</td>';
		NuevoAlimento =  NuevoAlimento + "<td data-label='' ><button onclick='EliminarAlimentoEditar("+i+","+1+","+JSON.stringify(datos[i].IdPedido)+","+JSON.stringify(datos[i].IdComedorGr)+")'>Eliminar</button></td>" 
		NuevoAlimento =  NuevoAlimento + "<td data-label='' id='recien_agregado' style='display:none'>"+1+"</td></tr>"   
		$('#ListadoComidaGr_Editar').append(NuevoAlimento);
		posicion_final_editar = i;
	}
	$("#txtFechaPedido_Editar").val(fechaActual2);
}

// function RechazarEstatusAlimentoGreen(id_pedido, estatus_comedor){
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

function RechazarEstatusAlimentoGreen(id_pedido, estatus_comedor){
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: {"param":12, "id_pedido":id_pedido, "estatus_comedor":estatus_comedor},
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus == 'success') {
				// Swal.fire(
				// 	'Rechazado',
				// 	'Tu platillo fue Rechazado.',
				// 	'success'
				//   ).then(function(){
				// 	  MostrarInforme();
				//   });
				MostrarInforme();
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

$("#txtNumeroEmpleado").on('change',function(e){
	let Fecha = $("#txtFechaSeleccionado").val(),
	numero_empleado = $(this).val().toLowerCase(),
	txtUbicacion = $("#txtUbicacion").val();
	let ID = "";
	let RowID = 0;
	regex = /^[a-zA-Z ]+$/;
	this.value = (this.value + '').replace(/[^0-9]/g, '');
	if (regex.test(numero_empleado)) {
		return;
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
	let formData = new FormData(document.getElementById("form_greenspot_comedor_semanal"));
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
				for(var i=0; i < datos.length; i++){
					if(ID != datos[i].IdPedido){
						ID = datos[i].IdPedido;
						var tablacontenido ="<tr id='tr_"+datos[i].IdPedido+"'>";
						tablacontenido +="<td  id='IDPedido"+datos[i].IdPedido+"' data-label= 'No. Orden'>"+datos[i].IdPedido+"</td>"
						tablacontenido +="<td  id='IDNoEmpleado"+datos[i].IdPedido+"' data-label= 'No. Empleado'>"+datos[i].NoEmpleado+"</td>"
						tablacontenido +="<td  id='IDNomEmpleado"+datos[i].IdPedido+"'' data-label= 'Empleado'>"+datos[i].NombreEmpleado+"</td>"
						tablacontenido +="<td data-label= 'No. Platillo'>"+datos[i].NoPlatillo+"</td>"
						tablacontenido +="<td data-label= 'Platillo'>"+datos[i].Platillo+"</td>"
						// tablacontenido +="<td data-label= 'Comentarios' style='display:none;'>"+datos[i].Comentarios+"</td>"
						// tablacontenido +="<td data-label= 'Kcal' style='display:none;'>"+datos[i].Kcal+"</td>"
						tablacontenido +="<td data-label= 'Precio'>"+parseFloat(datos[i].Precio).toFixed(2)+"</td>"
						tablacontenido +="<td data-label= 'Total'>"+parseFloat(datos[i].total).toFixed(2)+"</td>"
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
						tablacontenido += "<td data-label='' ><button id='btn_confirmar_green_pedido_"+datos[i].id+"' class='btn mi_btn_success'  onclick='ConfirmacionEstatusAlimentoGreen("+JSON.stringify(datos[i].IdPedido)+","+1+")'>Confirmar</button></td>"
						tablacontenido += "<td data-label='' ><button id='btn_rechazar_green_pedido_"+datos[i].id+"' class='btn btn-danger' onclick='RechazarEstatusAlimentoGreen("+JSON.stringify(datos[i].IdPedido)+","+2+")'>Eliminar</button></td>"
						
						tablacontenido +="</tr>";
						$('#ContenidoListados').append(tablacontenido);
						deshabilitar_botones_green(datos[i].id, datos[i].EstatusComedor);
						if (datos[i].EstatusComedor == 2) {
							$('#tr_'+datos[i].IdPedido).addClass("clase_rechazada");
						}
						RowID = 0;
					}else{
						RowID= RowID +1;
						var RowFinal = RowID +1;
						$("#IDPedido" +datos[i].IdPedido ).attr('rowspan', RowFinal);
						$("#IDNoEmpleado" +datos[i].IdPedido ).attr('rowspan', RowFinal);
						$("#IDNomEmpleado" +datos[i].IdPedido ).attr('rowspan', RowFinal);
						var tablacontenidoD ="<tr id='tr_"+RowID+"_"+datos[i].IdPedido+"'><td data-label= 'No. Platillo'>"+datos[i].NoPlatillo+"</td>"
						tablacontenidoD +="<td data-label= 'Platillo'>"+datos[i].Platillo+"</td>"
						// tablacontenidoD +="<td data-label= 'Comentarios'>"+datos[i].Comentarios+"</td>"
						// tablacontenidoD +="<td data-label= 'Kcal' style='display:none;'>"+datos[i].Kcal+"</td>"
						tablacontenidoD +="<td data-label= 'Precio'>"+parseFloat(datos[i].Precio).toFixed(2)+"</td>"
						tablacontenidoD +="<td data-label= 'Total'>"+parseFloat(datos[i].total).toFixed(2)+"</td>"
						tablacontenidoD +="<td data-label= 'Ubicación'></td>"
						tablacontenidoD +="<td></td>"
						tablacontenidoD +="<td></td>"
						tablacontenidoD +="<td></td>"
						tablacontenidoD +="<td></td><td></td></tr>"
						$('#ContenidoListados').append(tablacontenidoD);
						if (datos[i].EstatusComedor == 2) {
							$('#tr_'+RowID+'_'+datos[i].IdPedido).addClass("clase_rechazada");
						}
					}
				}
			}else if (data.estatus == "error_fecha") {
				Swal.fire( 
					"Existe error en ña fecha",
					'',
					'info'
				);
				$("#loading_comedor").hide();
				$("#EspacioTabla").hide();
				$("#div_tabla").hide();
				$("#boton_descarga_excel").hide();
			}else{
				Swal.fire( 
					"No coincide el número de empleado con ningun registro",
					'',
					'info'
				);
				$("#loading_comedor").hide();
				$("#EspacioTabla").hide();
				$("#div_tabla").hide();
				$("#boton_descarga_excel").hide();
			}
		}	
	});
});

// $("#txtNumeroEmpleado").on("keyup", function() {
// 	let Fecha = $("#txtFechaSeleccionado").val(),
// 	numero_empleado = $(this).val().toLowerCase(),
// 	txtUbicacion = $("#txtUbicacion").val();
// 	let ID = "";
// 	let RowID = 0;
// 	regex = /^[a-zA-Z ]+$/;
// 	this.value = (this.value + '').replace(/[^0-9]/g, '');
// 	if (regex.test(numero_empleado)) {
// 		return;
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
// 	let formData = new FormData(document.getElementById("form_greenspot_comedor_semanal"));
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
// 				for(var i=0; i < datos.length; i++){
// 					if(ID != datos[i].IdPedido){
// 						ID = datos[i].IdPedido;
// 						var tablacontenido ="<tr>";
// 						tablacontenido +="<td  id='IDPedido"+datos[i].IdPedido+"' data-label= 'No. Orden'>"+datos[i].IdPedido+"</td>"
// 						tablacontenido +="<td  id='IDNoEmpleado"+datos[i].IdPedido+"' data-label= 'No. Empleado'>"+datos[i].NoEmpleado+"</td>"
// 						tablacontenido +="<td  id='IDNomEmpleado"+datos[i].IdPedido+"'' data-label= 'Empleado'>"+datos[i].NombreEmpleado+"</td>"
// 						tablacontenido +="<td data-label= 'No. Platillo'>"+datos[i].NoPlatillo+"</td>"
// 						tablacontenido +="<td data-label= 'Platillo'>"+datos[i].Platillo+"</td>"
// 						// tablacontenido +="<td data-label= 'Comentarios' style='display:none;'>"+datos[i].Comentarios+"</td>"
// 						// tablacontenido +="<td data-label= 'Kcal' style='display:none;'>"+datos[i].Kcal+"</td>"
// 						tablacontenido +="<td data-label= 'Precio'>"+parseFloat(datos[i].Precio).toFixed(2)+"</td>"
// 						tablacontenido +="<td data-label= 'Total'>"+parseFloat(datos[i].total).toFixed(2)+"</td>"
// 						switch (datos[i]['Ubicacion']) {
// 							case 1:
// 								tablacontenido +="<td data-label= 'Ubicación'>Torre TOP</td>"
// 							break;

// 							case 2:
// 								tablacontenido +="<td data-label= 'Ubicación'>Apodaca</td>"
// 							break;

// 							case 3:
// 								tablacontenido +="<td data-label= 'Ubicación'>Cienega</td>"
// 							break;
						
// 							default:
// 								tablacontenido +="<td data-label= 'Ubicación'></td>"
// 							break;
// 						}
// 						tablacontenido += "<td data-label= 'FechaPedido' >"+datos[i].FechaPedido+"</td>"
// 						if (datos[i].EstatusEnviado == 0) {
// 							tablacontenido += "<td data-label= 'Estatus Enviado' >No Enviado</td>"
// 						}else if (datos[i].EstatusEnviado == 1) {
// 							tablacontenido += "<td data-label= 'Estatus Enviado' >Enviado</td>"
// 						}else if (datos[i].EstatusEnviado == 2) {
// 							tablacontenido += "<td data-label= 'Estatus Enviado' >Procesado en Nomina</td>"
// 						}else{
// 							tablacontenido += "<td data-label= 'Estatus Enviado' ></td>"
// 						}
// 						if (datos[i].EstatusComedor == 0) {
// 							tablacontenido += "<td data-label= 'Estatus Comedor'>Pendiente de Procesar</td>"
// 						}else if (datos[i].EstatusComedor == 1) {
// 							tablacontenido += "<td data-label= 'Estatus Comedor'>Entregado</td>"
// 						}else{
// 							tablacontenido += "<td data-label= 'Estatus Comedor'>Rechazado</td>"
// 						}
// 						tablacontenido += "<td data-label='' ><button id='btn_confirmar_green_pedido_"+datos[i].id+"' class='btn mi_btn_success'  onclick='ConfirmacionEstatusAlimentoGreen("+JSON.stringify(datos[i].IdPedido)+","+1+")'>Confirmar</button></td>"
// 						tablacontenido += "<td data-label='' ><button id='btn_rechazar_green_pedido_"+datos[i].id+"' class='btn btn-danger' onclick='RechazarEstatusAlimentoGreen("+JSON.stringify(datos[i].IdPedido)+","+2+")'>Eliminar</button></td>"
						
// 						tablacontenido +="</tr>";
// 						$('#ContenidoListados').append(tablacontenido);
// 						deshabilitar_botones_green(datos[i].id, datos[i].EstatusComedor);
// 						RowID = 0;
// 					}else{
// 						RowID= RowID +1;
// 						var RowFinal = RowID +1;
// 						$("#IDPedido" +datos[i].IdPedido ).attr('rowspan', RowFinal);
// 						$("#IDNoEmpleado" +datos[i].IdPedido ).attr('rowspan', RowFinal);
// 						$("#IDNomEmpleado" +datos[i].IdPedido ).attr('rowspan', RowFinal);
// 						var tablacontenidoD ="<tr><td data-label= 'No. Platillo'>"+datos[i].NoPlatillo+"</td>"
// 						tablacontenidoD +="<td data-label= 'Platillo'>"+datos[i].Platillo+"</td>"
// 						// tablacontenidoD +="<td data-label= 'Comentarios'>"+datos[i].Comentarios+"</td>"
// 						// tablacontenidoD +="<td data-label= 'Kcal' style='display:none;'>"+datos[i].Kcal+"</td>"
// 						tablacontenidoD +="<td data-label= 'Precio'>"+parseFloat(datos[i].Precio).toFixed(2)+"</td>"
// 						tablacontenidoD +="<td data-label= 'Total'>"+parseFloat(datos[i].total).toFixed(2)+"</td>"
// 						tablacontenidoD +="<td data-label= 'Ubicación'></td>"
// 						tablacontenidoD +="<td></td>"
// 						tablacontenidoD +="<td></td>"
// 						tablacontenidoD +="<td></td>"
// 						tablacontenidoD +="<td></td><td></td></tr>"
// 						$('#ContenidoListados').append(tablacontenidoD);
// 					}
// 				}
// 			}else if (data.estatus == "error_fecha") {
// 				Swal.fire( 
// 					"Existe error en ña fecha",
// 					'',
// 					'info'
// 				);
// 				$("#loading_comedor").hide();
// 				$("#EspacioTabla").hide();
// 				$("#div_tabla").hide();
// 				$("#boton_descarga_excel").hide();
// 			}else{
// 				Swal.fire( 
// 					"No coincide el número de empleado con ningun registro",
// 					'',
// 					'info'
// 				);
// 				$("#loading_comedor").hide();
// 				$("#EspacioTabla").hide();
// 				$("#div_tabla").hide();
// 				$("#boton_descarga_excel").hide();
// 			}
// 		}	
// 	});
// });

$("#txtNumEmpleadoLogeado").on('change',function(e){
	$("#div_mostrar_tabla_pedido").hide();
	$("#DivComentario").hide();
	let fechaActualL = new Date(); //Fecha actual
	let fechaActual2 = moment(fechaActualL).format("YYYY-MM-DD");
	$("#txtFechaPedido").val(fechaActual2);
	let empleado = $("#txtNumEmpleadoLogeado").val();
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
						let FechaAr =  "Fecha: "+ fechaActual2; 
						$("#txtFechaDia").val(fechaActual2);
						$("#txtNombreEmpleadoLogeado").val(data[i]['Nombre']);
						$("#tipo_empleado").val(data[i]['Tipo_Empleado']);
					}
					$("#txtTipoPlatillo").trigger("change").val("0");
					$("#txtProductoSeleccionadoGR").trigger("change").val(0);
					$("#txtNumPlatilloGR").val(0);
					$("#txtPrecioTotal").val(0);
					$("#txtComentariosGR").val("");
					$("#txtTipoPlatillo").trigger("change").val(4);
					TipoPlatillo();
					$("#ListadoComidaGr").html("");
					if (empleado == 20000) {
						$("#DivComentario").show();
					}
				}else{
					Swal.fire( 
						'El número de empleado ingresado no existe.',
						'',
						'error'
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

function CargarPedido(){
	$("#div_mostrar_tabla_pedido").hide();
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
		$("#txtTipoPlatillo").trigger("change").val(4);
		TipoPlatillo();
	// }
}

function TipoPlatillo(){
	let txtUbicacion = $("#txtUbicacion").val();
	var tipoplatillo = $("#txtTipoPlatillo").val();
	$("#txtProductoSeleccionadoGR").empty();
	$("#ListadoComidaGr").find("tr").remove();
	 LimpiarCampos();
	if(tipoplatillo !="4"){
		$("#ComidaGR").css("display", "none");
		$("#DivCantidad").css("display", "");
		$("#DivTotal").css("display", "");
		// $("#DivPrecio").css("display", "");
		$("#DivComentario").css("display", "");
		
		
		var seleccionar = "<option value='0'> Seleccionar Platillo</option>";
		$('#txtProductoSeleccionadoGR').append(seleccionar);
		if(tipoplatillo =="0"){
			$("#DivCantidad").css("display", "none");
			$("#DivTotal").css("display", "none");
			// $("#DivPrecio").css("display", "none");
			$("#DivComentario").css("display", "none");
		}
	$("#txtNumPlatillo").val("1");
	$("#txtTotalPlatillo").val("49.00");
	}
	else{
		$("#ComidaGR").css("display", "");
		$("#DivCantidad").css("display", "none");
		$("#DivTotal").css("display", "none");
		// $("#DivPrecio").css("display", "none");
		$("#DivComentario").css("display", "none");
		$("#txtNumPlatillo").val("0");
		
		$.ajax({
            type: "POST",
            data: {
                param: 4,
				tipoplatillo: tipoplatillo,
				txtUbicacion: txtUbicacion
            },
            url: "../../utileria.php",
            dataType: 'JSON',
             success: function(data) {
				$("#txtProductoSeleccionadoGR").html("");
				if(data.length){
					var seleccionar = "<option value='0'> Seleccione el Platillo</option>"
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

function TipoPlatillo_Editar(){
	let txtUbicacion = $("#txtUbicacion_Editar").val();
	var tipoplatillo = $("#txtTipoPlatillo_Editar").val();
	$("#txtProductoSeleccionadoGR_Editar").empty();
	$("#ListadoComidaGr_Editar").find("tr").remove();
	
	if(tipoplatillo !="4"){
		// $("#ComidaGR_Editar").css("display", "none");
		// $("#DivCantidad_Editar").css("display", "");
		// $("#DivTotal_Editar").css("display", "");
		// $("#DivPrecio").css("display", "");
		// $("#DivComentario_Editar").css("display", "");
		
		
		var seleccionar = "<option value='0'> Seleccionar Platillo</option>";
		$('#txtProductoSeleccionadoGR_Editar').append(seleccionar);
		if(tipoplatillo =="0"){
			// $("#DivCantidad_Editar").css("display", "none");
			// $("#DivTotal_Editar").css("display", "none");
			// $("#DivPrecio").css("display", "none");
			// $("#DivComentario_Editar").css("display", "none");
		}
	$("#txtNumPlatilloGR_Editar").val("1");
	$("#txtTotalPlatillo_Editar").val("49.00");
	}
	else{
		// $("#ComidaGR_Editar").css("display", "");
		// $("#DivCantidad_Editar").css("display", "none");
		// $("#DivTotal_Editar").css("display", "none");
		// $("#DivPrecio").css("display", "none");
		// $("#DivComentario_Editar").css("display", "none");
		$("#txtNumPlatillo_Editar").val("0");
		
		$.ajax({
            type: "POST",
            data: {
                param: 4,
				tipoplatillo: tipoplatillo,
				txtUbicacion: txtUbicacion
            },
            url: "../../utileria.php",
            dataType: 'JSON',
             success: function(data) {
				$("#txtProductoSeleccionadoGR_Editar").html("");
				if(data.length){
					var seleccionar = "<option value='0'> Seleccione el Platillo</option>"
					for(i=0;i<data.length;i++){
						seleccionar += "<option value='"+data[i]['IdComida']+"'>"+data[i]['Comida']+"</option>";
					}
					$('#txtProductoSeleccionadoGR_Editar').append(seleccionar);
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

function ValidarPlatillos(){
	let platillos = parseInt($("#txtNumPlatillo").val());
	if (platillos != 1) {
		Swal.fire('Solo puedes pedir un platillo de comida.', "","info");
	}
	if(platillos < 1 || platillos == '' || isNaN(platillos)){
		$("#txtNumPlatillo").val(1);
		platillos = parseInt($("#txtNumPlatillo").val());
	}
	let Precio = parseFloat($("#txtPrecioPlatillo").val());
	let Calculo = Precio * platillos;
	$("#txtTotalPlatillo").val(parseFloat(Calculo).toFixed(2));
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

function InfoPlatillo(valor){
	let tipo_peticion = valor;
	//txtProductoSeleccionadoGR
	if (tipo_peticion == 1) {
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
	}else if (tipo_peticion == 2) {
		var InfoPlatillo = $("#txtProductoSeleccionadoGR_Editar").val();
		//
		$("#txtComentariosGR_Editar").val("");
		$("#txtNumPlatilloGR_Editar").val(1);
		$("#txtPrecioGR_Editar").val("0.00");
		$("#txtCaloriasGR_Editar").val("");
		$("#txtPrecioTotal_Editar").val("0.00");
		var TipoPlatillo = $("#txtTipoPlatillo_Editar").val();
		$("#txtTipoPlatilloGR_Editar").val(TipoPlatillo);
		
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
							$("#txtPrecioTotal_Editar").val(data[i]['Precio']);
							$("#txtCaloriasGR_Editar").val(data[i]['Calorias']);
						}
					ValidarPlatillosGR();
					}
				}
			});
		}
	} else {
		Swal.fire( 
			'Ocurrio un error.',
			'',
			'warning'
		);
	}
}

function ValidarPlatillosGR(){
	let platillos = parseInt($("#txtNumPlatilloGR").val());
	let NomPlatillo = $("#txtProductoSeleccionadoGR").val();
	if(NomPlatillo !="0"){
		if(platillos < 1 || platillos == '' || isNaN(platillos)){
			$("#txtNumPlatilloGR").val(1);
			platillos = parseInt($("#txtNumPlatilloGR").val());
		}
		let Precio = parseFloat($("#txtPrecioGR").val());
		let Calculo = Precio * platillos;
		$("#txtPrecioTotal").val(parseFloat(Calculo).toFixed(2));
	}else{
		$("#txtNumPlatilloGR").val(1);
		$("#txtPrecioGR").val("0.00");
		$("#txtCaloriasGR").val("");
		$("#txtPrecioTotal").val("0.00");
	}
}

function AgregarComidaGr(){
	NoAlimento = 0;
	var Platillo = $('select[name="txtProductoSeleccionadoGR"] option:selected').text();
	var IdPlatillo = $("#txtProductoSeleccionadoGR").val();
	var Kcal = $("#txtCaloriasGR").val();
	var Cantidad = $("#txtNumPlatilloGR").val();
	var PrecioTotal = $("#txtPrecioTotal").val();
	var PrecioUnitario = $("#txtPrecioGR").val();
	var tipoplatillo = $("#txtTipoPlatilloGR").val();
	//var ComentariosGR = $("#txtComentariosGR").val();
	var ComentariosGR =document.getElementById("txtComentariosGR").value;
	if(Platillo !="0" && PrecioTotal != "0.00"){
		$("#div_mostrar_tabla_pedido").show();
		NoAlimento = NoAlimento +1;
		var NuevoAlimento = '<tr id="Alimento'+NoAlimento+'">';
		//style="display:none"
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Posición" style="display:none" id="tdPosiciónAlimento'+NoAlimento+'">'+NoAlimento+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Id. Platillo" style="display:none" id ="tdIdPlatillo'+NoAlimento+'">'+IdPlatillo+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Platillo" id ="tdPlatillo'+NoAlimento+'">'+Platillo+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Comentario" style="display:none" id ="tdComentarioPlatillo'+NoAlimento+'" >'+ComentariosGR+'</td>';
		
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Tipo Platillo" style="display:none" id ="tdTipoPlatillo'+NoAlimento+'">'+tipoplatillo+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Kcal." id ="tdKcalPlatillo'+NoAlimento+'" style="display:none;">'+Kcal+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Cantidad" id ="tdCantidadPlatillo'+NoAlimento+'">'+Cantidad+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Precios" id ="tdPrecioUnitarioPlatillo'+NoAlimento+'" style="display:none">'+PrecioUnitario+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Total" id ="tdPrecioTotalPlatillo'+NoAlimento+'" style="display:none">'+PrecioTotal+'</td>';
		NuevoAlimento =  NuevoAlimento + "<td data-label='' ><button onclick='ConfirmacionEliminaAlimento("+NoAlimento+")'>Eliminar</button></td></tr>"   
		$('#ListadoComidaGr').append(NuevoAlimento);
		LimpiarCampos();
			
	}else{
		// $("#div_mostrar_tabla_pedido").hide();
		Swal.fire( 
			'Favor de agregar un platillo.',
			'',
			'info'
		);
	}			
}

function Traer_Tipo_Empleado(NoEmpleado){
	$.ajax({
		type: "POST",
		data: {
			param: 1,
			empleado: NoEmpleado 
		},
		url: "../../utileria.php",
		dataType: 'JSON',
			success: function(data) {
			if(data.length){
				for(i=0;i<data.length;i++){
					$("#tipo_empleado").val(data[i]['Tipo_Empleado']);
				}
			}else{
				Swal.fire( 
					'El número de empleado ingresado no existe.',
					'',
					'error'
				);
			}
		}
	});
}

function EditarComidaGr(){
	NoAlimento_Editar = posicion_final_editar;
	let Platillo_Editar = $('select[name="txtProductoSeleccionadoGR_Editar"] option:selected').text();
	let IdPlatillo_Editar = $("#txtProductoSeleccionadoGR_Editar").val();
	let Kcal_Editar = $("#txtCaloriasGR_Editar").val();
	let Cantidad_Editar = $("#txtNumPlatilloGR_Editar").val();
	let PrecioTotal_Editar = $("#txtPrecioTotal_Editar").val();
	let PrecioUnitario_Editar = $("#txtPrecioGR_Editar").val();
	let tipoplatillo_Editar = $("#txtTipoPlatilloGR_Editar").val();
	//let ComentariosGR = $("#txtComentariosGR").val();
	let ComentariosGR_Editar = document.getElementById("txtComentariosGR_Editar").value;
	if(Platillo_Editar !="0" && PrecioTotal_Editar != "0.00" && IdPlatillo_Editar != 0){
		NoAlimento_Editar = NoAlimento_Editar + 1;
		$("#div_mostrar_tabla_pedido_Editar").show();
		let NuevoAlimento = '<tr id="AlimentoEditar'+NoAlimento_Editar+'">';
		//style="display:none"
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Posición" style="display:none" id="tdPosiciónAlimentoEditar'+NoAlimento_Editar+'">'+NoAlimento_Editar+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Id. Platillo" style="display:none" id ="tdIdPlatilloEditar'+NoAlimento_Editar+'">'+IdPlatillo_Editar+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Platillo" id ="tdPlatilloEditar'+NoAlimento_Editar+'">'+Platillo_Editar+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Comentario" style="display:none" id ="tdComentarioPlatilloEditar'+NoAlimento_Editar+'" >'+ComentariosGR_Editar+'</td>';
		
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Tipo Platillo" style="display:none" id ="tdTipoPlatilloEditar'+NoAlimento_Editar+'">'+tipoplatillo_Editar+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Kcal." id ="tdKcalPlatilloEditar'+NoAlimento_Editar+'" style="display:none;">'+Kcal_Editar+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Cantidad" id ="tdCantidadPlatilloEditar'+NoAlimento_Editar+'">'+Cantidad_Editar+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Precios" id ="tdPrecioUnitarioPlatilloEditar'+NoAlimento_Editar+'" style="display:none">'+PrecioUnitario_Editar+'</td>';
		NuevoAlimento =  NuevoAlimento + '<td data-label= "Total" id ="tdPrecioTotalPlatilloEditar'+NoAlimento_Editar+'" style="display:none">'+PrecioTotal_Editar+'</td>';
		NuevoAlimento =  NuevoAlimento + "<td data-label='' ><button onclick='EliminarAlimentoEditar("+NoAlimento_Editar+", "+0+")'>Eliminar</button></td>";
		NuevoAlimento =  NuevoAlimento + "<td data-label='' id='recien_agregadoEditar' style='display:none'>"+0+"</td></tr>";
		
		$('#ListadoComidaGr_Editar').append(NuevoAlimento);

		$('#txtNumPlatilloGR_Editar').val(1);
			
	}else{
		// $("#div_mostrar_tabla_pedido").hide();
		Swal.fire( 
			'Favor de agregar un platillo.',
			'',
			'info'
		);
	}			
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

function EliminarAlimentoEditar(NoAlimento, Estatus_Posicion, IdPedido, IdComedorGr){
	let NoAlimentos = NoAlimento;
	if (Estatus_Posicion == 1) {
		$.ajax({
			url: "../../utileria.php",
			type: "post",
			data: {"param":28, "IdPedido":IdPedido, "IdComedorGr":IdComedorGr},
			success: function(result) {
				data = JSON.parse(result);
				if (data.estatus == 'success') {
					MostrarInforme();
					$("#AlimentoEditar" + NoAlimentos).remove();
					let Lineas = $("#ListadoComidaGr_Editar tr").length;
					if(Lineas == 0){
						NoAlimentos = 0;
					}
					Swal.fire('Se eliminó el alimento', "","success");
				}else{
					Swal.fire('No se puede eliminar el alimento', "","info");
				}
			}
		});
	}else if(Estatus_Posicion == 0){
		$("#AlimentoEditar" + NoAlimentos).remove();
		let Lineas = $("#ListadoComidaGr_Editar tr").length;
		if(Lineas == 0){
			NoAlimentos = 0;
		}
		Swal.fire('Se eliminó el alimento', "","success");
	}
}

function ElimarAlimento(NoAlimentos){
	$("#Alimento" + NoAlimentos).remove();
	var Lineas = $("#ListadoComidaGr tr").length;
	if(Lineas == 0){
		NoAlimento=0;
	}
}

function DescargarTabla(){
	$("#TablaComedor").table2excel({
		filename: "Comedor_Green_Spot_"+fecha_completa+'.xls'
	});
}

$("#btn_nomina").on("click", function(e){
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
		data: {"param":16, "daterange":fecha, "numero_empleado":numero_empleado},
		success: function(result) {
			let datos = JSON.parse(result);
			if (datos.estatus == "success"){
				enviar_nomina(datos);
			}else{
				Swal.fire(datos.mensaje, "","info");
				$('#cargando_pasar_nomina').hide();
				$('#btn_nomina').addClass("nuevo_style_btn_nomina");
				$("#btn_nomina").removeAttr("disabled, disabled");
				$("#btn_nomina").removeClass("deshabilitar");
				$('#btn_nomina').attr("disabled", false);
			}
		}
	}); 
});

function enviar_nomina(resultados){
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
		$('#btn_nomina').addClass("nuevo_style_btn_nomina");
		$("#btn_nomina").removeAttr("disabled, disabled");
		$("#btn_nomina").removeClass("deshabilitar");
		$('#btn_nomina').attr("disabled", false);
		$('#lbl_pasar_nomina').show();
		$("#btn_nomina").css("width", "");
		$('#cargando_pasar_nomina').hide();
        return false;
    }
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: {"param":11, "datos":datos2, "estatus_enviado":1},
		success: function(result) {
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
				$('#cargando_pasar_nomina').hide();
				$('#btn_nomina').addClass("nuevo_style_btn_nomina");
			}
		}
	});
}

function GuardarOrden(){
	$("#GuardarOrdenS").addClass("deshabilitar");
  	$('#GuardarOrdenS').attr("disabled", true);
	let NoEmpleadoLogeado = $("#txtNumEmpleadoLogeado").val();
	let NombreEmpleado =  $("#txtNombreEmpleadoLogeado").val();
	let NoPlatillos = $("#txtNumPlatillo").val();
	let TipoPlatillo = $("#txtTipoPlatillo").val();
	let Ubicacion = $("#txtUbicacion").val();
	//let FechaDeOrden = $("#txtFechaPedido").val();
	let Total = $("#txtTotalPlatillo").val();
	let Precio= $("#txtPrecioPlatillo").val();
	let Tipo_Empleado= $("#tipo_empleado").val(),
	comentario_global= $("#txtComentarioGlobalPlatillo").val();
	$("#GuardarOrden").prop("disabled", true);
	let CantidadArreglo = '';
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
	if(TipoPlatillo == "4"){
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
	if (NoEmpleadoLogeado == "") {
        Swal.fire('El número de empleado es requerido', "","info");
		$("#GuardarOrdenS").removeAttr("disabled, disabled");
		$("#GuardarOrdenS").removeClass("deshabilitar");
		$("#GuardarOrdenS").prop("disabled", false);
        return false;
    }
	if (NombreEmpleado == "") {
        Swal.fire('El Nombre del empleado es requerido', "","info");
		$("#GuardarOrdenS").removeAttr("disabled, disabled");
		$("#GuardarOrdenS").removeClass("deshabilitar");
		$("#GuardarOrdenS").prop("disabled", false);
        return false;
    }
	if (NoPlatillos == "" && TipoPlatillo != "4") {
        Swal.fire('El número de platillos es requerido', "","info");
		$("#GuardarOrdenS").removeAttr("disabled, disabled");
		$("#GuardarOrdenS").removeClass("deshabilitar");
		$("#GuardarOrdenS").prop("disabled", false);
        return false;
    }
	if (TipoPlatillo != "4") {
        Swal.fire('Tipo de platillo no soportado', "","info");
		$("#GuardarOrdenS").removeAttr("disabled, disabled");
		$("#GuardarOrdenS").removeClass("deshabilitar");
		$("#GuardarOrdenS").prop("disabled", false);
        return false;
    }
	if (Ubicacion == "0") {
        Swal.fire('La ubicación es obligatoria', "","info");
		$("#GuardarOrdenS").removeAttr("disabled, disabled");
		$("#GuardarOrdenS").removeClass("deshabilitar");
		$("#GuardarOrdenS").prop("disabled", false);
        return false;
    }
	if (Tipo_Empleado == "0") {
        Swal.fire('El tipo de empleado es obligatorio', "","info");
		$("#GuardarOrdenS").removeAttr("disabled, disabled");
		$("#GuardarOrdenS").removeClass("deshabilitar");
		$("#GuardarOrdenS").prop("disabled", false);
        return false;
    }
	if (CantidadArreglo == 0) {
        Swal.fire('No tienes platillos ingresados', "","info");
		$("#GuardarOrdenS").removeAttr("disabled, disabled");
		$("#GuardarOrdenS").removeClass("deshabilitar");
		$("#GuardarOrdenS").prop("disabled", false);
        return false;
    }
	if (comentario_global == '' && NoEmpleadoLogeado == 20000) {
        Swal.fire('Comentario no puede ir vació', "","info");
		$("#GuardarOrdenS").removeAttr("disabled, disabled");
		$("#GuardarOrdenS").removeClass("deshabilitar");
		$("#GuardarOrdenS").prop("disabled", false);
        return false;
    }
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
			comentario_global: comentario_global
		},
		url: "../../utileria.php",
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus === "success") {
				Swal.fire('El pedido de la comida ha sido guardado correctamente.', "Pedido de comida Guardado.","success")
				.then(function(){
					// $("#txtNumEmpleadoLogeado").val("");
					// $("#txtNombreEmpleadoLogeado").val("");
					// $("#txtNumPlatillo").val("");
					// $("#txtTipoPlatillo").val("");
					// $("#txtUbicacion").val("");
					// $("#txtTotalPlatillo").val("");
					// $("#txtPrecioPlatillo").val("");
					// $("#tipo_empleado").val("");
					$("#txtComentarioGlobalPlatillo").val("");
					CargarPedido();
					MostrarInforme();
					$("#GuardarOrdenS").removeAttr("disabled, disabled");
					$("#GuardarOrdenS").removeClass("deshabilitar");
					$("#GuardarOrdenS").prop("disabled", false);
				});
			}else if(data.estatus === "pedido_duplicado"){
				Swal.fire('Solo se puede realizar un pedido al día.', "","info");
				$("#GuardarOrdenS").removeAttr("disabled, disabled");
				$("#GuardarOrdenS").removeClass("deshabilitar");
				$("#GuardarOrdenS").prop("disabled", false);
			}else{
				Swal.fire('La información no pudo ser guardada.', "","error");
				console.log(data.mensaje);
				$("#GuardarOrdenS").removeAttr("disabled, disabled");
				$("#GuardarOrdenS").removeClass("deshabilitar");
				$("#GuardarOrdenS").prop("disabled", false);
			}
		}
	});
}

function GuardarListadoGreenSpot() {
    var arrayListadoComida = [];
        $("#ListadoComidaGr tr").each(function(index, value) {
            var Posicion, IdPlatillo, Platillo, Comentario, TipoPlatillo, KCal, Cantidad, Precios, Total;
            $(this).children("td").each(function(index2) {
                switch (index2) {
                    case 0:
						 Posicion = $(this).text();
					break;
					case 1:
						 IdPlatillo = $(this).text();
                    break;
					case 2:
						 Platillo = $(this).text();
                    break;
					case 3:
						Comentario = $(this).text();
                    break;
					case 4:
						 TipoPlatillo = $(this).text();
                    break;
					case 5:
						 KCal = $(this).text();
                    break;
					case 6:
						Cantidad = $(this).text();
                    break;
					case 7:
						Precios = $(this).text();
                    break;
					case 8:
						Total = $(this).text();
                    break;
                }
            });
            //$('#txtPercepcionLiq').val(TotalRefacc);
            var Array = {};
			Array.Posicion = Posicion;
            Array.IdPlatillo = IdPlatillo;
			Array.Platillo = Platillo;
			Array.Comentario = Comentario;
			Array.TipoPlatillo = TipoPlatillo;
			Array.KCal = KCal;
			Array.Cantidad = Cantidad;
			Array.Precios = Precios;
			Array.Total = Total;
            arrayListadoComida.push(Array);
        });
        return arrayListadoComida;
}

function EditarOrden(){
	bandera_editar = 0;
	let IdPedido_Editar = $("#txtIdPedido_Editar").val();
	let NoEmpleadoLogeado_Editar = $("#txtNumEmpleadoLogeado_Editar").val();
	let NombreEmpleado_Editar =  $("#txtNombreEmpleadoLogeado_Editar").val();
	let NoPlatillos_Editar = $("#txtNumPlatilloGR_Editar").val();
	let TipoPlatillo_Editar = $("#txtTipoPlatillo_Editar").val();
	let Ubicacion_Editar = $("#txtUbicacion_Editar").val();
	//let FechaDeOrden = $("#txtFechaPedido").val();
	let Total_Editar = $("#txtTotalPlatillo_Editar").val();
	let Precio_Editar = $("#txtPrecioPlatillo_Editar").val();
	let Tipo_Empleado_Editar = $("#tipo_empleado").val(),
	comentario_global_Editar = $("#txtComentarioGlobalPlatillo_Editar").val();
	$("#EditarOrden").prop("disabled", true);
	let CantidadArreglo_Editar = '';
	//
	let arrayListadoGreenSpot_Editar = {};
	let fechaInput_Editar = $("#txtFechaSeleccionado").val().substr(0, 10); //Fecha actual
	const fecha_nueva = fechaInput_Editar.split("/").reverse().join("/");
	let fechaActualL_Editar = new Date(fecha_nueva); //Fecha actual
	if (isNaN(fechaActualL_Editar) == true) {
		Swal.fire('El formato de la fecha esta erróneo', "","info");
		$("#EditarOrden").prop("disabled", false);
        return false;
	}
	let FechaDeOrden_Editar = moment(fechaActualL_Editar).format("YYYY-MM-DD HH:mm:ss"),
	dia_actual_Editar = moment(fechaActualL_Editar).format('DD'),
	nombre_dia_actual_Editar = moment(fechaActualL_Editar).format('dddd');
	switch (nombre_dia_actual_Editar) {
		case 'Saturday':
			dia_inicial_Editar = dia_actual_Editar - 1;
			FechaDeOrden_Editar = moment(fechaActualL_Editar).format("YYYY-MM-"+dia_inicial_Editar+" HH:mm:ss");
		break;
		case 'Sunday':
			dia_inicial_Editar = dia_actual_Editar - 2;
			FechaDeOrden_Editar = moment(fechaActualL_Editar).format("YYYY-MM-"+dia_inicial_Editar+" HH:mm:ss");
		break;
	
		default:
		break;
	}
	//
	if(TipoPlatillo_Editar == "4"){
	//let arrayListadoGreenSpotEditar = {};
		arrayListadoGreenSpot_Editar = EditarListadoGreenSpot();
		CantidadArreglo_Editar = arrayListadoGreenSpot_Editar.length; 
	}
	//
	if (NoEmpleadoLogeado_Editar == "") {
        Swal.fire('El número de empleado es requerido', "","info");
		$("#EditarOrden").prop("disabled", false);
        return false;
    }
	if (NombreEmpleado_Editar == "") {
        Swal.fire('El Nombre del empleado es requerido', "","info");
		$("#EditarOrden").prop("disabled", false);
        return false;
    }
	if (NoPlatillos_Editar == "" && TipoPlatillo_Editar != "4") {
        Swal.fire('El número de platillos es requerido', "","info");
		$("#EditarOrden").prop("disabled", false);
        return false;
    }
	if (TipoPlatillo_Editar != "4") {
        Swal.fire('Tipo de platillo no soportado', "","info");
		$("#EditarOrden").prop("disabled", false);
        return false;
    }
	if (Ubicacion_Editar == "0") {
        Swal.fire('La ubicación es obligatoria', "","info");
		$("#EditarOrden").prop("disabled", false);
        return false;
    }
	if (Tipo_Empleado_Editar == "0") {
        Swal.fire('El tipo de empleado es obligatorio', "","info");
		$("#EditarOrden").prop("disabled", false);
        return false;
    }
	if (CantidadArreglo_Editar == 0) {
        Swal.fire('No tienes platillos ingresados', "","info");
		$("#EditarOrden").prop("disabled", false);
        return false;
    }
	if (comentario_global_Editar == '' && NoEmpleadoLogeado_Editar == 20000) {
        Swal.fire('Comentario no puede ir vació', "","info");
		$("#EditarOrden").prop("disabled", false);
        return false;
    }
	if (bandera_editar == 0) {
        Swal.fire('o agregaste nuevos platillos', "","info");
		$("#EditarOrden").prop("disabled", false);
        return false;
    }
	$.ajax({
		type: "POST",
		data: {
			param: 29,
			IdPedido:IdPedido_Editar,
			NoEmpleadoLogeado: NoEmpleadoLogeado_Editar,
			NombreEmpleado: NombreEmpleado_Editar,
			TipoPlatillo : TipoPlatillo_Editar,
			Ubicacion:Ubicacion_Editar,
			Tipo_Empleado:Tipo_Empleado_Editar,
			FechaDeOrden: FechaDeOrden_Editar,
			arrayListadoGreenSpot : JSON.stringify(arrayListadoGreenSpot_Editar),
			pedidoporcomedor:1,
			comentario_global: comentario_global_Editar
		},
		url: "../../utileria.php",
		success: function(result) {
			console.log(result);
			data = JSON.parse(result);
			if (data.estatus === "success") {
				Swal.fire('El pedido de la comida ha sido guardado correctamente.', "Pedido de comida Guardado.","success")
				.then(function(){
					// $("#txtNumEmpleadoLogeado").val("");
					// $("#txtNombreEmpleadoLogeado").val("");
					// $("#txtNumPlatillo").val("");
					// $("#txtTipoPlatillo").val("");
					// $("#txtUbicacion").val("");
					// $("#txtTotalPlatillo").val("");
					// $("#txtPrecioPlatillo").val("");
					// $("#tipo_empleado").val("");
					// $("#txtComentarioGlobalPlatillo").val("");
					MostrarInforme();
					$("#EditarOrden").prop("disabled", false);
				});
			}else if(data.estatus === "pedido_duplicado"){
				Swal.fire('Solo se puede realizar un pedido al día.', "","info");
				$("#EditarOrden").prop("disabled", false);
			}else{
				Swal.fire('La información no pudo ser guardada.', "","error");
				$("#EditarOrden").prop("disabled", false);
			}
		}
	});
}

function EditarListadoGreenSpot() {
    var arrayListadoComida_Editar = [];
	$("#ListadoComidaGr_Editar tr").each(function(index, value) {
		var Posicion, IdPlatillo, Platillo, Comentario, TipoPlatillo, KCal, Cantidad, Precios, Total, Estatus_Posicion;
		$(this).children("td").each(function(index2) {
			switch (index2) {
				case 0:
						Posicion = $(this).text();
				break;
				case 1:
						IdPlatillo = $(this).text();
				break;
				case 2:
						Platillo = $(this).text();
				break;
				case 3:
					Comentario = $(this).text();
				break;
				case 4:
						TipoPlatillo = $(this).text();
				break;
				case 5:
						KCal = $(this).text();
				break;
				case 6:
					Cantidad = $(this).text();
				break;
				case 7:
					Precios = $(this).text();
				break;
				case 8:
					Total = $(this).text();
				break;
				case 10:
					Estatus_Posicion = $(this).text();
				break;
			}
		});
		//$('#txtPercepcionLiq').val(TotalRefacc);
		if (Estatus_Posicion == 0) {
			var Array_Editar = {};
			Array_Editar.Posicion = Posicion;
			Array_Editar.IdPlatillo = IdPlatillo;
			Array_Editar.Platillo = Platillo;
			Array_Editar.Comentario = Comentario;
			Array_Editar.TipoPlatillo = TipoPlatillo;
			Array_Editar.KCal = KCal;
			Array_Editar.Cantidad = Cantidad;
			Array_Editar.Precios = Precios;
			Array_Editar.Total = Total;
			arrayListadoComida_Editar.push(Array_Editar);
			bandera_editar = 1;
		}
	});
	return arrayListadoComida_Editar;
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

$("#txtUbicacion").on('change',function(e){
    let txtUbicacion = $("#txtUbicacion").val();
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
		// $('#txtProductoSeleccionadoGR').append(seleccionar);
		if(tipoplatillo =="0"){
			$("#DivCantidad").css("display", "none");
			// $("#DivTotal").css("display", "none");
			// $("#DivPrecio").css("display", "none");
			// $("#DivComentario").css("display", "none");
		}
	$("#txtNumPlatillo").val("1");
	$("#txtTotalPlatillo").val("49.00");
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
				tipoplatillo: tipoplatillo,
				txtUbicacion: txtUbicacion
            },
            url: "utileria.php",
            dataType: 'JSON',
             success: function(data) {
				$("#txtProductoSeleccionadoGR").html("");
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
});
