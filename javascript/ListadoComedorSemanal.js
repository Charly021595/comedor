var FechaHoy = "";
var FechaInicial = "";
var FechaFinal = "";
let fecha_completa = '';
let datos,
bandera_descargar = 0,
sede = '';
const hora_estatica_inicio = '07:00:00', 
hora_estatica_fin = '17:00:00';

//Nueva versión del document ready funciona igual.
jQuery(function(){	
	ObtenerFecha();
	window.location.hash="no-back-button";
	window.location.hash="Again-No-back-button";//esta linea es necesaria para chrome
	window.onhashchange=function(){window.location.hash="no-back-button";}
	BuscarEmpleadoLogeadoSesion();
	buscar_sede();
});
//Función de la libreria para exportar la informacion de una tabla.
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
//Función de cerrar sesion, destruye la sesión actual del usuario.
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
//Función de buscar sede, el usuario logueado se obtiene su sede a la cual pertenece.
function buscar_sede(){
	let num_empleado = $("#txtNumEmpleado").val();
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: {"param":1, "empleado":num_empleado},
		success: function(result) {
			let data = JSON.parse(result);
			if (data.estatus == 'success') {
				let datos = data.datos;
				sede  = datos[0].Sede;
				switch (sede) {
					case 'T.OP':
						$("#txtUbicacion").trigger("change").val(1);
						ObtenerTipoPlatillo();
					break;

					case 'Torre TOP':
						$("#txtUbicacion").trigger("change").val(1);
						ObtenerTipoPlatillo();
					break;

					case 'APODACA':
						$("#txtUbicacion").trigger("change").val(2);
						ObtenerTipoPlatillo();
					break;

					case 'CIENEGA DE FLORES':
						$("#txtUbicacion").trigger("change").val(3);
						ObtenerTipoPlatillo();
					break;
				
					default:
						$("#txtUbicacion").trigger("change").val(0);
						ObtenerTipoPlatillo();
					break;
				}
				MostrarInforme();
			}else if(datos.estatus == "error_consulta"){
				Swal.fire( 
					datos.mensaje,
					'',
					'info'
				);
			}else{
				Swal.fire( 
					'este empleado no esta dado de alta',
					'',
					'info'
				);
			}
		}
	});
}
//Esta función trae la informacion del usuario logueado y poder mostrarlo en la vista.
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
             success: function(result) {
				let data = JSON.parse(result);
				if (data.estatus == 'success'){
					let datos = data.datos;
					for(i=0;i<datos.length;i++){
						var FechaAr =  "Fecha: "+ fechaActual2; 
						$("#NombreCont2").text(datos[i]['Nombre']);
						$("#NombreCont").text(datos[i]['Nombre']);
						$("#Fecha2").text(FechaAr);
						$("#txtNombreEmpleadoLogeado").val(datos[i]['Nombre']);
					}
				}else if(datos.estatus == "error_consulta"){
					Swal.fire( 
						datos.mensaje,
						'',
						'info'
					);
				}else{
					Swal.fire( 
						'este empleado no esta dado de alta',
						'',
						'info'
					);
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

//Función que se utiliza para obtener la fecha actual.
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
//Función que se utiliza para descargar la lista de pedidos que se muestran.
function DescargarTabla(){
	$("#TablaComedor").table2excel({
		filename: "Comedor_Plato_Express_"+fecha_completa+'.xls'
	});
}
//Función que se utiliza para  validar si se elimina un alimento dentro de editar.
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
//Función que se utiliza para eliminar el alimento de la tabla de alimentos que se muestra al editar un pedido.
function ElimarAlimento(NoAlimentos){
	$("#Alimento" + NoAlimentos).remove();
	var Lineas = $("#ListadoComidaGr tr").length;
	if(Lineas == 0){
		NoAlimento=0;
	}
}
//Función que se utiliza para traer todo el listado que no se a mandando a nomina.
//PS: buscar un mejor metodo para traer los datos de nominas.
function enviar_nomina(resultados){
	let datos2 = resultados.data,
	i = 0
	fecha = $('#txtFechaSeleccionado').val();
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
		data: {"param":11, "datos":datos_limpios, "estatus_enviado":1, "Fecha":fecha},
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
				$("#btn_nomina").css("width", "");
				$('#cargando_pasar_nomina').hide();
				$('#btn_nomina').addClass("nuevo_style_btn_nomina");
			}
		}
	});
}
//Función que se utiliza para traer la informacion de listado de pedidos.
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
	if (txtUbicacion != 0) {
		$("#header_comida_express").html("");
		$("#header_comida_express").append(`
			<th scope='col'>Tipo Pedido</th>
			<th scope='col'>No. Orden</th>
			<th scope='col'>No. Empleado</th>
			<th scope='col'>Empleado</th>
			<th scope='col'>Tipo de Platillo</th>
			<th scope='col'>No. Platillo</th>
			<th scope='col'>Comentarios</th>
			<th scope='col'>Ubicación</th>
			<th scope='col'>FechaPedido</th>
			<th scope='col'>Estatus Enviado</th>
			<th scope='col'>Estatus Comedor</th>
			<th scope='col' colspan='2'>Acciones</th>
		`);
	}
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
				construccion_tabla(datos);
				if (bandera_descargar == 1) {
					DescargarTabla(datos);
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
//Función que se utliza para construir la tabla que muestra los pedidos de comida.
function construccion_tabla(datos){
	for(let i = 0; i < datos.length; i++){
		let tablacontenido =  datos[i].PedidoUsuario == 1 ? "<tr id='tr_"+datos[i].IdPedido+"' class='user_pedido'>":"<tr id='tr_"+datos[i].IdPedido+"'>";
		if (datos[i].PedidoUsuario == 1) {
			tablacontenido +="<td  id='tipo_pedido' data-label= 'Tipo de Pedido'><i class='fa-solid fa-user color_icon'></i> Usuario</td>"
		}else{
			tablacontenido +="<td  id='tipo_pedido' data-label= 'Tipo de Pedido'><i class='fa-solid fa-house color_icon'></i> Admin</td>"
		}
		tablacontenido +="<td  id='IDPedido"+datos[i].IdPedido+"' data-label= 'No. Orden'>"+datos[i].IdPedido+"</td>"
		tablacontenido +="<td  data-label= 'No. Empleado'>"+datos[i].NoEmpleado+"</td>"
		tablacontenido +="<td data-label= 'Empleado'>"+datos[i].NombreEmpleado+"</td>"
		tablacontenido +="<td data-label= 'Tipo de Platillo'>"+datos[i].Platillo+"</td>"

		// switch (datos[i].TipoPlatillo) {
		// 	case 3:
		// 		tablacontenido +="<td data-label= 'Tipo de Platillo'>Platillo Unico</td>"
		// 	break;

		// 	case 5:
		// 		tablacontenido +="<td data-label= 'Tipo de Platillo'>Platillo Unico y Break</td>"
		// 	break;

		// 	case 6:
		// 		tablacontenido +="<td data-label= 'Tipo de Platillo'>Break</td>"
		// 	break;
		
		// 	default:
		// 		tablacontenido +="<td data-label= 'Tipo de Platillo'>Platillo Unico</td>"
		// 	break;
		// }
		tablacontenido +="<td data-label= 'No. Platillo'>"+datos[i].NoPlatillo+"</td>"
		tablacontenido +="<td data-label= 'Comentarios'>"+datos[i].Comentarios+"</td>"
		switch (datos[i]['Ubicacion']) {
			case 1:
				tablacontenido +="<td data-label= 'Ubicación'>T.OP</td>"
			break;

			case 2:
				tablacontenido +="<td data-label= 'Ubicación'>APODACA</td>"
			break;

			case 3:
				tablacontenido +="<td data-label= 'Ubicación'>CIENEGA DE FLORES</td>"
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
}
//Función que deshabilita o habilita botones de eliminar y confirmar
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
//Función que se utiliza para traer el listado de platillos disponibles.
function TipoPlatillo(){
	let tipoplatillo = $("#txtTipoPlatillo").val();
	let Ubicacion = $("#txtUbicacion").val();
	$("#txtProductoSeleccionadoGR").empty();
	$("#ListadoComidaGr").find("tr").remove();
	 LimpiarCampos();
	if(tipoplatillo !="4"){
		$("#ComidaGR").css("display", "none");
		$("#DivCantidad").css("display", "");
		// $("#DivTotal").css("display", "");
		// $("#DivPrecio").css("display", "");
		// $("#DivComentario").css("display", "");
		
		
		let seleccionar = "<option value='0'> Seleccionar Platillo</option>";
		$('#txtProductoSeleccionadoGR').append(seleccionar);
		if(tipoplatillo =="0"){
			$("#DivCantidad").css("display", "none");
			// $("#DivTotal").css("display", "none");
			// $("#DivPrecio").css("display", "none");
			// $("#DivComentario").css("display", "none");
		}

		$("#txtNumPlatillo").val("1");
		switch (sede) {
			case 'T.OP':
				$("#txtTotalPlatillo").val("49.00");
				$("#txtPrecioPlatillo").val("49.00");
				Menu_secreto();
			break;

			case 'APODACA':
				switch (tipoplatillo) {
					case "3":
						$("#txtTotalPlatillo").val("20.00");
						$("#txtPrecioPlatillo").val("20.00");
						Menu_secreto();
					break;

					case "5":
						$("#txtTotalPlatillo").val("45.00");
						$("#txtPrecioPlatillo").val("45.00");
						Menu_secreto();
					break;

					case "6":
						$("#txtTotalPlatillo").val("55.00");
						$("#txtPrecioPlatillo").val("55.00");	
					break;

					case "7":
						$("#txtTotalPlatillo").val("65.00");
						$("#txtPrecioPlatillo").val("65.00");	
					break;
				
					default:
						$("#txtTotalPlatillo").val("0.00");
						$("#txtPrecioPlatillo").val("0.00");
						Menu_secreto();
					break;
				}
			break;

			case 'CIENEGA DE FLORES':
				switch (tipoplatillo) {
					case "3":
						$("#txtTotalPlatillo").val("0.00");
						$("#txtPrecioPlatillo").val("0.00");
						Menu_secreto();
					break;

					case "5":
						$("#txtTotalPlatillo").val("45.00");
						$("#txtPrecioPlatillo").val("45.00");
						Menu_secreto();
					break;

					case "6":
						$("#txtTotalPlatillo").val("55.00");
						$("#txtPrecioPlatillo").val("55.00");	
					break;

					case "7":
						$("#txtTotalPlatillo").val("65.00");
						$("#txtPrecioPlatillo").val("65.00");	
					break;
				
					default:
						$("#txtTotalPlatillo").val("0.00");
						$("#txtPrecioPlatillo").val("0.00");
						Menu_secreto();
					break;
				}
			break;
		
			default:
				$("#txtTotalPlatillo").val("49.00");
				$("#txtPrecioPlatillo").val("49.00");
			break;
		}
		// $("#txtTotalPlatillo").val("49.50");
		$("#txtTotalPlatillo").show();
	}else{
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
//Función que se utiliza para vaciar los campos.
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
	$("#txtTotalBreak").val('0.00');
	$('#txtbreak').prop('checked',false);
	$("#txtComentarioGlobalPlatillo").val('');
}
//Función que se utiliza para traer la información de un platillo para comida.
function InfoPlatillo(){
	var InfoPlatillo = $("#txtProductoSeleccionadoGR").val();
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
//Función que se utiliza para validar los platillos y hacer sus calculos.
function ValidarPlatillos(){
	let platillos = parseInt($("#txtNumPlatillo").val()),
	no_empleado = $("#txtNumEmpleadoLogeado").val();
	if (platillos > 1 && no_empleado != 20000) {
		Swal.fire('Solo puedes pedir un platillo de comida.', "","info");
		// $("#txtNumPlatillo").val(1);
		platillos = parseInt($("#txtNumPlatillo").val());
	}
	if(platillos < 1){
		// $("#txtNumPlatillo").val(1);
		platillos = parseInt($("#txtNumPlatillo").val());
	}
	if (platillos == '' || isNaN(platillos)) {
		return false;
	}
	let Precio = parseFloat($("#txtPrecioPlatillo").val());
	let Calculo = Precio * platillos;
	let Precio_break = 5 * platillos;
	$("#txtTotalPlatillo").val(parseFloat(Calculo).toFixed(2));
	$("#txtTotalBreak").val(parseFloat(Precio_break).toFixed(2));
}
//Función que se utiliza para guardar un pedido solicitado.
function GuardarOrden(){
	$("#GuardarOrdenS").addClass("deshabilitar");
  	$('#GuardarOrdenS').attr("disabled", true);
	let NoEmpleadoLogeado = $("#txtNumEmpleadoLogeado").val();
	let NombreEmpleado =  $("#txtNombreEmpleadoLogeado").val();
	let NoPlatillos = $("#txtNumPlatillo").val();
	let TipoPlatillo = $("#txtTipoPlatillo").val();
	let Ubicacion = $("#txtUbicacion").val(),
	CantidadArreglo = 0;
	let Total = $("#txtTotalPlatillo").val();
	let Precio = $("#txtPrecioPlatillo").val();
	let Precio_break = $("#txtTotalBreak").val();
	let Tipo_Empleado= $("#tipo_empleado").val(),
	comentario_global= $("#txtComentarioGlobalPlatillo").val();
	let platillo_menu = $("#menu_secreto_select").val() != 0 || $("#menu_secreto_select").val() === "undefined" ? $("#menu_secreto_select").val() : 0;
	//
	let arrayListadoGreenSpot = {};
	let arrayListadoPlatilloUnico = {};
	let fechaActualL = new Date(); //Fecha actual
	let FechaDeOrden = moment(fechaActualL).format("YYYY-MM-DD HH:mm:ss"),
	dia_actual = moment(fechaActualL).format('DD'),
	nombre_dia_actual = moment(fechaActualL).format('dddd'),
	hora_actual = moment(fechaActualL).tz("America/Mexico_City").format('HH:mm:ss'),
	tipo_comedor = 0;
	if (Ubicacion == 1) {
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
			Array.Break = Precio_break;	
			if (sede == 'CIENEGA DE FLORES' && (TipoPlatillo == 3 || TipoPlatillo == 5)) {
				Array.platillo_menu = platillo_menu;
			}
			
            arrayListadoComida.push(Array);
			
			arrayListadoPlatilloUnico = arrayListadoComida;
	}
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
	if (!window.navigator.onLine) {
        Swal.fire('La red esta inestable favor de contactar a wilfredo.morales@arzyz.com', "","info");
		$("#GuardarOrdenS").removeAttr("disabled, disabled");
		$("#GuardarOrdenS").removeClass("deshabilitar");
		$("#GuardarOrdenS").attr("disabled", false);
        return false;
    }
	if (hora_actual <=  hora_estatica_inicio && hora_actual >=  hora_estatica_fin){
        tipo_comedor = 1;
    }else{
		tipo_comedor = 2;
	}
	if (TipoPlatillo =="0" && Precio_break == "0") {
		Swal.fire('Te falta seleccionar platillo o break', "","info");
		$("#GuardarOrdenS").removeAttr("disabled, disabled");
		$("#GuardarOrdenS").removeClass("deshabilitar");
		$("#GuardarOrdenS").attr("disabled", false);
        return false;
	}
	if((NoEmpleadoLogeado !="" && NombreEmpleado !="" && TipoPlatillo !="" && TipoPlatillo !="4" && Ubicacion !="0" && Total != "" && Tipo_Empleado != "0")||(CantidadArreglo > 0)){
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
				comentario_global:comentario_global,
				platillo_menu:platillo_menu,
				tipo_comedor:tipo_comedor
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
						$("#txtbreak").val(parseFloat(Precio_break).toFixed(2));
					});
				}else if(data.estatus === "pedido_duplicado"){
					Swal.fire('Solo se puede realizar un pedido al día.', "","info");
					$("#GuardarOrdenS").removeAttr("disabled, disabled");
					$("#GuardarOrdenS").removeClass("deshabilitar");
					$("#GuardarOrdenS").attr("disabled", false);
				}else{
					Swal.fire('La información no pudo ser guardada.', "","error");
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
//Función que se utiliza para monstrar el modal de hacer un pedido como administrador.
function CargarPedido(){
	$("#menu_secreto_select").html('');
	$("#menu_secreto").hide();
	$("#DivComentarioglobal").hide();
	$("#txtNumEmpleadoLogeado").val("");
	$("#txtNombreEmpleadoLogeado").val("");
	$("#txtTipoPlatillo").val("0");
	// TipoPlatillo();
	$("#txtNumPlatillo").val("1");
	ValidarPlatillos()
	$("#txtComentarioPlatillo").val("");
	LimpiarCampos();
	$('#ModalCargaEvidenciaVisual').modal('show');
	let ubicacion = $("#txtUbicacion").val();
	// if (ubicacion == 1) {
		$("#txtTipoPlatillo").trigger("change").val(0);
		// TipoPlatillo();
	// }
}
//Función que se utiliza para confirmar un alimento.
function ConfirmacionEstatusAlimento(id_pedido, estatus_comedor){
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
				//   ).then(function(){
					  MostrarInforme();
				//   });
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
//Función que se utiliza para rechazar un pedido de comida.
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
//Función que se utiliza para obtener el tipo de platillos dependiendo de la sede del usuario logeeado.
function ObtenerTipoPlatillo(){
	$("#tipo_platillo").hide();
	$("#break").hide();
	sede =  $('select[id="txtUbicacion"] option:selected').text();
	$("#txtTipoPlatillo").html('');
	 LimpiarCampos();
	 switch (sede) {
		case 'T.OP':
			$("#tipo_platillo").show();
			$("#txtTipoPlatillo").append(`
				<option value="0"> Seleccione el tipo de platillo</option>
				<option value="3"> Platillo Unico</option>
			`);
		break;

		case 'APODACA':
			$("#tipo_platillo").show();
			$("#break").show();
			$("#txtTipoPlatillo").append(`
				<option value="0"> Seleccione el tipo de platillo</option>
				<option value="3"> Platillo Unico</option>
				<option value="5">Platillo Especial 1</option>
				<option value="6">Platillo Especial 2</option>
				<option value="7">Platillo Especial 3</option>
			`);
		break;

		case 'CIENEGA DE FLORES':
			$("#tipo_platillo").show();
			$("#break").show();
			$("#txtTipoPlatillo").append(`
				<option value="0"> Seleccione el tipo de platillo</option>
				<option value="3"> Platillo Unico</option>
				<option value="5">Platillo Especial 1</option>
				<option value="6">Platillo Especial 2</option>
				<option value="7">Platillo Especial 3</option>
			`);
		break;
	
		default:
			$("#tipo_platillo").show();
			$("#txtTipoPlatillo").append(`
				<option value="0"> Seleccione el tipo de platillo</option>
				<option value="3"> Platillo Unico</option>
			`);
		break;
	}
};
//Función que se utiliza para cargar un menu em la plataforma.
function Menu_secreto(){
	var date = new Date();
	let fecha_actual = moment(date).format('YYYY-MM-DD');
	$("#menu_secreto_select").html('');
	$("#menu_secreto").hide();
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: {"param":31, "fecha_actual":fecha_actual, "sede":sede},
		success: function(result) {
			let data = JSON.parse(result);
			if (data.estatus == 'success') {
				$("#menu_secreto").show();
				$("#menu_secreto_select").html('');
				$("#menu_secreto_select").append(`
					<option value="0"> Seleccione el platillo</option>
				`);	
				for (let i = 0; i < data.datos.length; i++) {
					$("#menu_secreto_select").append(`
						<option value="${data.datos[i].IDPlatillo}">${data.datos[i].Nombre_Platillo}</option>
					`);
				}	
			}else{
				$("#menu_secreto_select").html('');
				$("#menu_secreto").hide();
			}
		}
	});
}
//Función que se utiliza para traer todo el listado que no se a mandando a nomina.
//PS: buscar un mejor metodo para traer los datos de nominas.
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

// Función de Break
$("#break").on("click", function(){
    if($('#txtbreak').prop('checked') ){
        $("#txtTotalBreak").val("5.00");
    }else{
        $("#txtTotalBreak").val("0.00");
    }
});

//Función que se utiliza para filtrar por número de empleado y construir la tabla
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
					let tablacontenido =  datos[i].PedidoUsuario == 1 ? "<tr id='tr_"+datos[i].IdPedido+"' class='user_pedido'>":"<tr id='tr_"+datos[i].IdPedido+"'>";
					if (datos[i].PedidoUsuario == 1) {
						tablacontenido +="<td  id='tipo_pedido' data-label= 'Tipo de Pedido'><i class='fa-solid fa-user color_icon'></i> Usuario</td>"
					}else{
						tablacontenido +="<td  id='tipo_pedido' data-label= 'Tipo de Pedido'><i class='fa-solid fa-house color_icon'></i> Admin</td>"
					}
					tablacontenido +="<td  id='IDPedido"+datos[i].IdPedido+"' data-label= 'No. Orden'>"+datos[i].IdPedido+"</td>"
					tablacontenido +="<td  data-label= 'No. Empleado'>"+datos[i].NoEmpleado+"</td>"
					tablacontenido +="<td data-label= 'Empleado'>"+datos[i].NombreEmpleado+"</td>"
					tablacontenido +="<td data-label= 'Tipo de Platillo'>"+datos[i].Platillo+"</td>"

					// switch (datos[i].TipoPlatillo) {
					// 	case 3:
					// 		tablacontenido +="<td data-label= 'Tipo de Platillo'>Platillo Unico</td>"
					// 	break;

					// 	case 5:
					// 		tablacontenido +="<td data-label= 'Tipo de Platillo'>Platillo Unico y Break</td>"
					// 	break;

					// 	case 6:
					// 		tablacontenido +="<td data-label= 'Tipo de Platillo'>Break</td>"
					// 	break;
					
					// 	default:
					// 		tablacontenido +="<td data-label= 'Tipo de Platillo'>Platillo Unico</td>"
					// 	break;
					// }
					tablacontenido +="<td data-label= 'No. Platillo'>"+datos[i].NoPlatillo+"</td>"
					// tablacontenido +="<td data-label= 'Platillo'>"+datos[i].Platillo+"</td>"
					if (datos[i]['Ubicacion'] != 0) {
						// tablacontenido +="<td data-label= 'No. Platillo'>"+datos[i].Nombre_Platillo+"</td>"
						// tablacontenido +="<td data-label= 'Platillo'>"+datos[i].Descripcion+"</td>"
					}
					tablacontenido +="<td data-label= 'Comentarios'>"+datos[i].Comentarios+"</td>"
					switch (datos[i]['Ubicacion']) {
						case 1:
							tablacontenido +="<td data-label= 'Ubicación'>T.OP</td>"
						break;

						case 2:
							tablacontenido +="<td data-label= 'Ubicación'>APODACA</td>"
						break;

						case 3:
							tablacontenido +="<td data-label= 'Ubicación'>CIENEGA DE FLORES</td>"
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
//Las funciónes de aqui adelante son para el input rango de fechas  funcione correctamente.
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
            success: function(result) {
				let data = JSON.parse(result);
				if (data.estatus == 'success'){
					let datos = data.datos;
					for(i=0;i<datos.length;i++){
						var FechaAr =  "Fecha: "+ fechaActual2; 
						$("#txtFechaDia").val(fechaActual2);
						$("#txtNombreEmpleadoLogeado").val(datos[i]['Nombre']);
						$("#tipo_empleado").val(datos[i]['Tipo_Empleado']);
					}
					$("#txtTipoPlatillo").trigger("change").val("3");
					$("#txtNumPlatillo").val(1);
					$("#txtTotalPlatillo").val(1);
					$("#txtComentarioPlatillo").val("");
					TipoPlatillo();
					if (empleado == 20000) {
						$("#DivComentarioglobal").show();
					}
				}else if(datos.estatus == "error_consulta"){
					Swal.fire( 
						datos.mensaje,
						'',
						'info'
					);
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