var FechaHoy = "";
var FechaInicial = "";
var FechaFinal = "";
var NumPreguntas =0;
var NoAlimento=0;
var NoDatosBioquimicos = 0;
let datos;
$(document).ready(function(){
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
		// 	tabla +="<th scope='col'>No. Orden</th>"
		// 	tabla +="<th scope='col'>No. Empleado</th>"
		// 	tabla +="<th scope='col'>Empleado</th>"
		// 	tabla +="<th scope='col'>No. Platillo</th>"
		// 	tabla +="<th scope='col'>Platillo</th>"
		// 	tabla +="<th scope='col' >Comentario</th>"
		// 	tabla +="<th scope='col' style='display:none;'>Kcal.</th>"
		// 	tabla +="<th scope='col'>Precio </th>"
		// 	tabla +="<th scope='col'>Total</th>"
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
	var currentDate = date.toISOString().substring(0,10);
	$("#txtFechaSeleccionado").val(currentDate);
	$("#txtFechaDia").val(currentDate);
}

function MostrarInforme(){
	var Fecha = $("#txtFechaSeleccionado").val()
	var FechaListado = moment(Fecha, 'YYYY/MM/DD').format('YYYYMMDD');
	var ID = "";
	var RowID = 0;
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
                param: 8,
				FechaListado:Fecha,
				
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
					for(var i=0; i < datos.length; i++){
						if(ID != datos[i].IdPedido){
							ID = datos[i].IdPedido;
							var tablacontenido ="<tr>";
							tablacontenido +="<td  id='IDPedido"+datos[i].IdPedido+"' data-label= 'No. Orden'>"+datos[i].IdPedido+"</td>"
							tablacontenido +="<td  id='IDNoEmpleado"+datos[i].IdPedido+"' data-label= 'No. Empleado'>"+datos[i].NoEmpleado+"</td>"
							tablacontenido +="<td  id='IDNomEmpleado"+datos[i].IdPedido+"'' data-label= 'Empleado'>"+datos[i].NombreEmpleado+"</td>"
							tablacontenido +="<td data-label= 'No. Platillo'>"+datos[i].NoPlatillo+"</td>"
							tablacontenido +="<td data-label= 'Platillo'>"+datos[i].Platillo+"</td>"
							tablacontenido +="<td data-label= 'Comentarios'>"+datos[i].Comentarios+"</td>"
							tablacontenido +="<td data-label= 'Kcal' style='display:none;'>"+datos[i].Kcal+"</td>"
							tablacontenido +="<td data-label= 'Precio'>"+parseFloat(datos[i].Precio).toFixed(2)+"</td>"
							tablacontenido +="<td data-label= 'Total'>"+parseFloat(datos[i].total).toFixed(2)+"</td>"
							if(datos[i].Ubicacion == null){
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
							tablacontenido += "<td data-label='' ><button onclick='ConfirmacionEliminaAlimento("+datos[i].IdPedido+")'>Confirmar</button></td>"
							tablacontenido += "<td data-label='' ><button onclick='ConfirmacionEliminaAlimento("+datos[i].IdPedido+")'>Eliminar</button></td>"
							
							tablacontenido +="</tr>";
							$('#ContenidoListados').append(tablacontenido);
							RowID = 0;
						}else{
							RowID= RowID +1;
							var RowFinal = RowID +1;
							$("#IDPedido" +datos[i].IdPedido ).attr('rowspan', RowFinal);
							$("#IDNoEmpleado" +datos[i].IdPedido ).attr('rowspan', RowFinal);
							$("#IDNomEmpleado" +datos[i].IdPedido ).attr('rowspan', RowFinal);
							var tablacontenidoD ="<tr><td data-label= 'No. Platillo'>"+datos[i].NoPlatillo+"</td>"
							tablacontenidoD +="<td data-label= 'Platillo'>"+datos[i].Platillo+"</td>"
							tablacontenidoD +="<td data-label= 'Comentarios'>"+datos[i].Comentarios+"</td>"
							tablacontenidoD +="<td data-label= 'Kcal' style='display:none;'>"+datos[i].Kcal+"</td>"
							tablacontenidoD +="<td data-label= 'Precio'>"+parseFloat(datos[i].Precio).toFixed(2)+"</td>"
							tablacontenidoD +="<td data-label= 'Total'>"+parseFloat(datos[i].total).toFixed(2)+"</td>"
							tablacontenidoD +="<td data-label= 'Ubicación'></td></tr>"
							tablacontenido += "<td data-label= 'FechaPedido' >"+datos[i].FechaPedido+"</td>"
							if (datos[i].EstatusEnviado == 0) {
								tablacontenido += "<td data-label= 'Estatus Enviado' >No Enviado</td>"
							}else if (datos[i].EstatusEnviado == 1) {
								tablacontenido += "<td data-label= 'Estatus Enviado' >Enviado</td>"
							}else{
								tablacontenido += "<td data-label= 'Estatus Enviado' ></td>"
							}
							$('#ContenidoListados').append(tablacontenidoD);
						}
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
						//$("#NombreCont2").text(data[i]['Nombre);
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

function ValidarPlatillos(){
	var platillos = parseInt($("#txtNumPlatillo").val());
	
	if(platillos < 1){
		$("#txtNumPlatillo").val(1);
	}
	var Precio = parseFloat($("#txtPrecioPlatillo").val());
	var Calculo = Precio * platillos;
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

function ValidarPlatillosGR(){
	var platillos = parseInt($("#txtNumPlatilloGR").val());
	var NomPlatillo = $("#txtProductoSeleccionadoGR").val();
	if(NomPlatillo !="0"){
		if(platillos < 1){
			$("#txtNumPlatilloGR").val(1);
			platillos =1;
		}
		var Precio = parseFloat($("#txtPrecioGR").val());
		var Calculo = Precio * platillos;
		$("#txtPrecioTotal").val(parseFloat(Calculo).toFixed(2));
	}else{
		$("#txtNumPlatilloGR").val(1);
		$("#txtPrecioGR").val("0.00");
		$("#txtCaloriasGR").val("");
		$("#txtPrecioTotal").val("0.00");
	}
}

function AgregarComidaGr(){
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
			NoAlimento = NoAlimento +1;
			var NuevoAlimento = '<tr id="Alimento'+NoAlimento+'">';
			//style="display:none"
			NuevoAlimento =  NuevoAlimento + '<td data-label= "Posición" style="display:none" id="tdPosiciónAlimento'+NoAlimento+'">'+NoAlimento+'</td>';
			NuevoAlimento =  NuevoAlimento + '<td data-label= "Id. Platillo" style="display:none" id ="tdIdPlatillo'+NoAlimento+'">'+IdPlatillo+'</td>';
			NuevoAlimento =  NuevoAlimento + '<td data-label= "Platillo" id ="tdPlatillo'+NoAlimento+'">'+Platillo+'</td>';
			NuevoAlimento =  NuevoAlimento + '<td data-label= "Comentario" id ="tdComentarioPlatillo'+NoAlimento+'" >'+ComentariosGR+'</td>';
			
			NuevoAlimento =  NuevoAlimento + '<td data-label= "Tipo Platillo" style="display:none" id ="tdTipoPlatillo'+NoAlimento+'">'+tipoplatillo+'</td>';
			NuevoAlimento =  NuevoAlimento + '<td data-label= "Kcal." id ="tdKcalPlatillo'+NoAlimento+'" style="display:none;">'+Kcal+'</td>';
			NuevoAlimento =  NuevoAlimento + '<td data-label= "Cantidad" id ="tdCantidadPlatillo'+NoAlimento+'">'+Cantidad+'</td>';
			NuevoAlimento =  NuevoAlimento + '<td data-label= "Precios" id ="tdPrecioUnitarioPlatillo'+NoAlimento+'">'+PrecioUnitario+'</td>';
			NuevoAlimento =  NuevoAlimento + '<td data-label= "Total" id ="tdPrecioTotalPlatillo'+NoAlimento+'">'+PrecioTotal+'</td>';
			NuevoAlimento =  NuevoAlimento + "<td data-label='' ><button onclick='ConfirmacionEliminaAlimento("+NoAlimento+")'>Eliminar</button></td></tr>"   
			$('#ListadoComidaGr').append(NuevoAlimento);
			
	}else{
		Swal.fire( 
			'Favor de agregar un platillo.',
			'',
			'info'
		);
	}		
	LimpiarCampos();	
}

function DescargarTabla(){
	$("#TablaComedor").table2excel({
		filename: "ListadoGreenSpot.xls"
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
		url: "../../utileria.php",
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
								'La información no pudo ser guardada.',
								'',
								'info'
							);
							$("#GuardarOrden").prop("disabled", false);
						}
					}
			}
		 });
	
	}else{
		Swal.fire( 
			'Favor de llenar la información.',
			'',
			'info'
		);
		$("#GuardarOrden").prop("disabled", false);
	}
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
//