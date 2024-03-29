var NoAlimento=0;
var NoDatosBioquimicos = 0;
var sede = '';
const hora_estatica_inicio = '07:00:00', 
hora_estatica_fin = '17:00:00';
const hora_estatica_inicio_green_spot = '07:00:00', 
hora_estatica_fin_green_spot = '08:40:00';
// hora_estatica_fin_green_spot = '17:40:00';

$(document).ready(function () {
	//var empleado = $("#txtNumEmpleado").val();
	BuscarEmpleadoLogeado();
	validarvisitas();
	//buscar_sede();
});

function limpiar_datos(){
	$("#txtNumPlatillo").val('');
	$("#txtTipoPlatillo").val('0').trigger('change');
	$("#txtUbicacion").val('0').trigger('change');
	$("#txtTotalPlatillo").val('');
	$("#txtPrecioPlatillo").val('');
	$("#txtTotalBreak").val('');
	$("#menu_secreto_select").val(0)
}

function buscar_sede(){
	$("#txtTipoPlatillo").html('');
	let num_empleado = $("#txtNumEmpleado").val();
	$.ajax({
		url: "utileria.php",
		type: "post",
		data: {"param":1, "empleado":num_empleado},
		success: function(result) {
			let data = JSON.parse(result);
			if (data.estatus == 'success') {
				let datos = data.datos;
				sede  = datos[0].Sede;
				switch (sede) {
					case 'T.OP':
						$("#txtUbicacion").val(1);
					break;
	
					case 'APODACA':
						$("#txtUbicacion").val(2);
					break;
	
					case 'CIENEGA DE FLORES':
						$("#txtUbicacion").val(3);
					break;
				
					default:
						$("#txtUbicacion").val(0);
					break;
				}
				ObenerTipoPlatillo();
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

function validarvisitas(){
	let NoEmpleadoLogeado = $("#txtNumEmpleadoLogeado").val();
	$("#txtNumPlatillo").removeAttr("maxlength");
	if (NoEmpleadoLogeado == 20000) {	
		$("#txtNumPlatillo").attr("maxlength", "2");	
	}else{
		$("#txtNumPlatillo").attr("maxlength", "1");
	}
}

function CerrarSesion(){
	$.ajax({
		type: "POST",
		//async: false,
		data: {
			param: 7
		},
		
		url: "utileria.php", 
		dataType: 'JSON',
		success: function(data) {
			$('.cargando').hide(); // Oculta la imagen de cargando 
			if(data.length){
				window.location='index.php';
			}
			
			
		}
	});
	
}

function BuscarEmpleadoLogeado(){
	let fechaActualL = new Date(); //Fecha actual
	let fechaActual2 = moment(fechaActualL).format("YYYY-MM-DD");
	$("#txtFechaPedido").val(fechaActual2);
	let empleado = $("#txtNumEmpleado").val()
	if(empleado.replace(/\s/g,"") != ""){
		$.ajax({
            type: "POST",
            data: {
                param: 1,
				empleado: empleado 
            },
            url: "utileria.php",
             success: function(result) {
				let data = JSON.parse(result);
				if (data.estatus == 'success') {
					let datos = data.datos;
					for(i=0;i<datos.length;i++){
						let FechaAr =  "Fecha: "+ fechaActual2;
						$("#NombreCont2").text(datos[i]['Nombre']);
						$("#NombreCont").text(datos[i]['Nombre']);
						$("#tipo_empleado").val(datos[i]['Tipo_Empleado']);
						$("#Fecha2").text(FechaAr);
						$("#txtNombreEmpleadoLogeado").val(datos[i]['Nombre']);
					}
					buscar_sede();
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
		Swal.fire('Favor de Agregar un numero de empleado.', "","info");
		CerrarSesion();
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
	let Precio_break = 5 * platillos;
	$("#txtTotalPlatillo").val(parseFloat(Calculo).toFixed(2));
	$("#txtTotalBreak").val(parseFloat(Precio_break).toFixed(2));
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

function GuardarOrden(){
	$("#avisos").hide();
	let NoEmpleadoLogeado = $("#txtNumEmpleadoLogeado").val();
	let NombreEmpleado =  $("#txtNombreEmpleadoLogeado").val();
	let NoPlatillos = $("#txtNumPlatillo").val();
	let TipoPlatillo = $("#txtTipoPlatillo").val();
	let Ubicacion = $("#txtUbicacion").val();
	//let FechaDeOrden = $("#txtFechaPedido").val();
	let Total = $("#txtTotalPlatillo").val();
	let Precio = $("#txtPrecioPlatillo").val();
	let Precio_break = $("#txtTotalBreak").val();
	let Tipo_Empleado= $("#tipo_empleado").val();
	let CantidadArreglo = "";
	let platillo_menu = $("#menu_secreto_select").val() != 0 || $("#menu_secreto_select").val() === "undefined" ? $("#menu_secreto_select").val() : 0;
	$("#GuardarOrden").prop("disabled", true);
	//
	let arrayListadoGreenSpot = {};
	let arrayListadoPlatilloUnico = {};
	let fechaActualL = new Date(); //Fecha actual
	let FechaDeOrden = moment(fechaActualL).format("YYYY-MM-DD HH:mm:ss"),
	dia_actual = moment(fechaActualL).format('DD'),
	nombre_dia_actual = moment(fechaActualL).format('dddd'),
	comentario_global= $("#txtComentarioGlobalPlatillo").val(),
	hora_actual = moment(fechaActualL).tz("America/Mexico_City").format('HH:mm:ss'),
	tipo_comedor = 0;
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
		if ((hora_actual < hora_estatica_inicio_green_spot || hora_actual >  hora_estatica_fin_green_spot)){
			Swal.fire('Los Pedidos de green spot estan cerrados', "","info");
			$("#GuardarOrden").prop("disabled", true);
			return false;
    	}  
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
	//
	if (NoEmpleadoLogeado == "") {
        Swal.fire('El número de empleado es requerido', "","info");
		$("#GuardarOrden").prop("disabled", false);
        return false;
    }
	if (NombreEmpleado == "") {
        Swal.fire('El Nombre del empleado es requerido', "","info");
		$("#GuardarOrden").prop("disabled", false);
        return false;
    }
	if (NoPlatillos < 1 && TipoPlatillo != "4") {
        Swal.fire('El número de platillos es requerido', "","info");
		$("#GuardarOrden").prop("disabled", false);
		ValidarPlatillos();
        return false;
    }
	if (NoPlatillos > 1 && NoEmpleadoLogeado != 20000 && TipoPlatillo != "4") {
        Swal.fire('Solo puedes pedir un platillo', "","info");
		$("#GuardarOrden").prop("disabled", false);
		ValidarPlatillos();
        return false;
    }
	if (TipoPlatillo != "0" && TipoPlatillo != "4" && TipoPlatillo != "3" && TipoPlatillo != "5" && TipoPlatillo != "6" && TipoPlatillo != "7") {
        Swal.fire('Tipo de platillo no soportado', "","info");
		$("#GuardarOrden").prop("disabled", false);
        return false;
    }
	if (Ubicacion == "0") {
        Swal.fire('La ubicación es obligatoria', "","info");
		$("#GuardarOrden").prop("disabled", false);
        return false;
    }
	if (Tipo_Empleado == "0") {
        Swal.fire('El tipo de empleado es obligatorio', "","info");
		$("#GuardarOrden").prop("disabled", false);
        return false;
    }
	if (Total == "" && TipoPlatillo != "4") {
        Swal.fire('El saldo total no puede ser 0.00', "","info");
		$("#GuardarOrden").prop("disabled", false);
        return false;
    }
	if ((CantidadArreglo === 0 || CantidadArreglo === "") && TipoPlatillo == "4") {
        Swal.fire('No tienes platillos ingresados', "","info");
		$("#GuardarOrden").prop("disabled", false);
        return false;
    }
	// if (CantidadArreglo === "") {
    //     Swal.fire('No tienes platillos ingresados', "","info");
	// 	$("#GuardarOrden").prop("disabled", false);
    //     return false;
    // }
	if (NoEmpleadoLogeado == 20000 && comentario_global == "") {
        Swal.fire('El comentario es obligatorio', "","info");
		$("#GuardarOrden").prop("disabled", false);
        return false;
    }
	if ((platillo_menu == 0 && Ubicacion == 1) || (platillo_menu == 0 && Ubicacion == 3) || platillo_menu == 0 && Ubicacion == 2) {
		Swal.fire('El campo menu es obligatorio', "","info");
		$("#GuardarOrden").prop("disabled", false);
        return false;
	}
	if (hora_actual <=  hora_estatica_inicio && hora_actual >=  hora_estatica_fin){
        tipo_comedor = 1;
    }else{
		tipo_comedor = 2;
	}
	if (!window.navigator.onLine) {
        Swal.fire('La red esta inestable favor de contactar a wilfredo.morales@arzyz.com', "","info");
		$("#GuardarOrdenS").removeAttr("disabled, disabled");
		$("#GuardarOrdenS").removeClass("deshabilitar");
		$("#GuardarOrdenS").attr("disabled", false);
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
			pedidoporcomedor:0,
			comentario_global:comentario_global,
			platillo_menu:platillo_menu,
			tipo_comedor:tipo_comedor,
			envio_usuario:1,
			hora_actual:hora_actual 
		},
		url: "utileria.php", 
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus === "success") {
				// if (TipoPlatillo == 4) {
				// 	Swal.fire({
				// 		title: "Pedido Realizado",
				// 		text: "Tu pedido se realizo con exito pasa por el dentro de 25 min.",
				// 		icon: 'success',
				// 		allowOutsideClick: false,
				// 		confirmButtonText: "Aceptar",
				// 	}).then(function(){
				// 		// location.reload();
				// 		limpiar_datos();
				// 		$("#GuardarOrden").removeAttr("disabled, disabled");
				// 		$("#GuardarOrden").removeClass("deshabilitar");
				// 		$("#GuardarOrden").attr("disabled", false);
				// 		$("#txtbreak").val(parseFloat(Precio_break).toFixed(2));
				// 		$("#avisos").show();
				// 	});
				// }else{
				// 	Swal.fire({
				// 		title: "Pedido Realizado",
				// 		text: "Tu pedido se realizo con exito pasa por el.",
				// 		icon: 'success',
				// 		allowOutsideClick: false,
				// 		confirmButtonText: "Aceptar",
				// 	}).then(function(){
				// 		// location.reload();
				// 		limpiar_datos();
				// 		$("#GuardarOrden").removeAttr("disabled, disabled");
				// 		$("#GuardarOrden").removeClass("deshabilitar");
				// 		$("#GuardarOrden").attr("disabled", false);
				// 		$("#txtbreak").val(parseFloat(Precio_break).toFixed(2));
				// 		$("#avisos").show();
				// 	});
				// }

				switch (TipoPlatillo) {
					case "4":
						Swal.fire({
							title: "Pedido Realizado",
							text: "Tu pedido se realizo con exito pasa por el dentro de 25 min.",
							icon: 'success',
							allowOutsideClick: false,
							confirmButtonText: "Aceptar",
						}).then(function(){
							// location.reload();
							limpiar_datos();
							$("#GuardarOrden").removeAttr("disabled, disabled");
							$("#GuardarOrden").removeClass("deshabilitar");
							$("#GuardarOrden").attr("disabled", false);
							$("#txtbreak").val(parseFloat(Precio_break).toFixed(2));
							$("#avisos").show();
						});
					break;
				
					default:
						$("#avisos").hide();
						Swal.fire({
							title: "Pedido Realizado",
							text: "Tu pedido se realizo con exito pasa por el.",
							icon: 'success',
							allowOutsideClick: false,
							confirmButtonText: "Aceptar",
						}).then(function(){
							// location.reload();
							limpiar_datos();
							$("#GuardarOrden").removeAttr("disabled, disabled");
							$("#GuardarOrden").removeClass("deshabilitar");
							$("#GuardarOrden").attr("disabled", false);
							$("#txtbreak").val(parseFloat(Precio_break).toFixed(2));
							// $("#avisos").hide();
						});
					break;
				}

			}else if(data.estatus === "pedido_duplicado"){
				Swal.fire('Solo se puede realizar un pedido al día.', "","info");
				$("#GuardarOrden").removeAttr("disabled, disabled");
				$("#GuardarOrden").removeClass("deshabilitar");
				$("#GuardarOrden").prop("disabled", false);
				$("#avisos").hide();
			}else{
				Swal.fire({
                    title: "Aviso",
                    html: data.mensaje,
                    icon: 'info',
                    allowOutsideClick: false,
                    confirmButtonText: "Aceptar",
                }).then(function(){
					// location.reload();
					limpiar_datos();
					$("#GuardarOrden").removeAttr("disabled, disabled");
					$("#GuardarOrden").removeClass("deshabilitar");
					$("#GuardarOrden").prop("disabled", false);
					$("#avisos").hide();
				});
			}
		}
	});
}

function MostarAlertas(){
	$('#ModalAviso').modal('show');
}

function CerrarPedido(){
	location.reload();
}
//
function AgregarComidaGr(){
	let Platillo = $('select[name="txtProductoSeleccionadoGR"] option:selected').text();
	let IdPlatillo = $("#txtProductoSeleccionadoGR").val();
	let Kcal = $("#txtCaloriasGR").val();
	let Cantidad = $("#txtNumPlatilloGR").val();
	let PrecioTotal = $("#txtPrecioTotal").val();
	let PrecioUnitario = $("#txtPrecioGR").val();
	let tipoplatillo = $("#txtTipoPlatilloGR").val();
	//let ComentariosGR = $("#txtComentariosGR").val();
	let ComentariosGR =document.getElementById("txtComentariosGR").value;
	if(Platillo !="0" && PrecioTotal != "0.00"){
			NoAlimento = NoAlimento +1;
			let NuevoAlimento = '<tr id="Alimento'+NoAlimento+'">';
			//style="display:none"
			NuevoAlimento =  NuevoAlimento + '<td data-label= "Posición" style="display:none" id="tdPosiciónAlimento'+NoAlimento+'">'+NoAlimento+'</td>';
			NuevoAlimento =  NuevoAlimento + '<td data-label= "Id. Platillo" style="display:none" id ="tdIdPlatillo'+NoAlimento+'">'+IdPlatillo+'</td>';
			NuevoAlimento =  NuevoAlimento + '<td data-label= "Platillo" id ="tdPlatillo'+NoAlimento+'">'+Platillo+'</td>';
			NuevoAlimento =  NuevoAlimento + '<td data-label= "Comentario" style="display:none" id ="tdComentarioPlatillo'+NoAlimento+'" >'+ComentariosGR+'</td>';
			
			NuevoAlimento =  NuevoAlimento + '<td data-label= "Tipo Platillo" style="display:none" id ="tdTipoPlatillo'+NoAlimento+'">'+tipoplatillo+'</td>';
			NuevoAlimento =  NuevoAlimento + '<td data-label= "Kcal." style="display:none" id ="tdKcalPlatillo'+NoAlimento+'">'+Kcal+'</td>';
			NuevoAlimento =  NuevoAlimento + '<td data-label= "Cantidad" id ="tdCantidadPlatillo'+NoAlimento+'">'+Cantidad+'</td>';
			NuevoAlimento =  NuevoAlimento + '<td data-label= "Precios" style="display:none" id ="tdPrecioUnitarioPlatillo'+NoAlimento+'">'+PrecioUnitario+'</td>';
			NuevoAlimento =  NuevoAlimento + '<td data-label= "Total"  style="display:none" id ="tdPrecioTotalPlatillo'+NoAlimento+'">'+PrecioTotal+'</td>';
			NuevoAlimento =  NuevoAlimento + "<td data-label='' ><button onclick='ConfirmacionEliminaAlimento("+NoAlimento+")'>Eliminar</button></td></tr>"   
			$('#ListadoComidaGr').append(NuevoAlimento);
			
	}else{
		Swal.fire('Favor de agregar un platillo.', "","info");
	}		
	LimpiarCampos();	
}

function ConfirmacionEliminaAlimento(NoAlimento){
	let NoAlimentos = NoAlimento;
		Swal.fire({
			title: '¿Deseas eliminar el registro?',
			icon: 'info',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Eliminar'
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
	let Lineas = $("#ListadoComidaGr tr").length;
	if(Lineas == 0){
		NoAlimento=0;
	}
}

function TipoPlatillo(){
	$("#DivComentario").hide();
	$("#menu_secreto").hide();
	let txtUbicacion = $("#txtUbicacion").val();
	let tipoplatillo = $("#txtTipoPlatillo").val();
	let empleado = $("#txtNumEmpleado").val();
	let date = new Date();
	let hora_actual = moment(date).tz("America/Mexico_City").format('HH:mm:ss');
	$("#txtProductoSeleccionadoGR").empty();
	$("#ListadoComidaGr").find("tr").remove();
	if (txtUbicacion == 0) {
		Swal.fire({
			title: "Aviso",
			text: 'El campo ubicación es requerido.',
			icon: 'info',
			allowOutsideClick: false,
			confirmButtonText: "Aceptar",
		});
		LimpiarCampos();
        return false;
    }
	 LimpiarCampos();
	if(tipoplatillo !="4"){
		$("#ComidaGR").css("display", "none");
		$("#DivCantidad").css("display", "");
		// $("#DivTotal").css("display", "");
		// $("#DivPrecio").css("display", "");
		// $("#DivComentario").css("display", "");
		
		// let seleccionar = "<option value='0'> Seleccionar Platillo</option>";
		// $('#txtProductoSeleccionadoGR').append(seleccionar);
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
						$("#txtTotalPlatillo").val("20.00");
						$("#txtPrecioPlatillo").val("20.00");
						Menu_secreto();
					break;
				}
			break;

			case 'CIENEGA DE FLORES':
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
						$("#txtTotalPlatillo").val("20.00");
						$("#txtPrecioPlatillo").val("20.00");
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
	}else if(tipoplatillo == ""){
		$("#ComidaGR").css("display", "none");
		$('#txtProductoSeleccionadoGR').html("<option value='0'> Seleccione el Platillo</option>");
		$('#ListadoComidaGr').html("");
	}else{
		$("#break").hide();
		if ((hora_actual < hora_estatica_inicio_green_spot || hora_actual >  hora_estatica_fin_green_spot)){
			Swal.fire('Los Pedidos de green spot estan cerrados', "","info");
			$("#GuardarOrden").addClass("deshabilitar");
			$('#GuardarOrden').attr("disabled", true);
			return false;
    	}
		$("#ComidaGR").css("display", "");
		$("#DivCantidad").css("display", "none");
		// $("#DivTotal").css("display", "none");
		// $("#DivPrecio").css("display", "none");
		// $("#DivComentario").css("display", "none");
		$("#txtNumPlatillo").val("0");
		if (empleado == 20000) {
			$("#DivComentario").show();	
		}
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
				console.log(data);
				if(data.length){
					let seleccionar = "<option value='0'> Seleccione el Platillo</option>"
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
	$("#txtProductoSeleccionadoGR").val("0");
	$("#txtNumPlatilloGR").val(1);
	$("#txtComentariosGR").val("");
	$("#txtTotalPlatillo").val("0.00");
	$("#txtComentarioPlatillo").val("");
	$("#txtTotalBreak").val('0.00');
	$('#txtbreak').prop('checked',false);
	$("#txtComentarioGlobalPlatillo").val('');
}

function InfoPlatillo(){
	//txtProductoSeleccionadoGR
	let InfoPlatillo = $("#txtProductoSeleccionadoGR").val();
	//
	$("#txtComentariosGR").val("");
	$("#txtNumPlatilloGR").val(1);
	$("#txtPrecioGR").val("0.00");
	$("#txtCaloriasGR").val("");
	$("#txtPrecioTotal").val("0.00");
	let TipoPlatillo = $("#txtTipoPlatillo").val();
	$("#txtTipoPlatilloGR").val(TipoPlatillo);
	
	//
	if(InfoPlatillo !="0"){
		$.ajax({
            type: "POST",
            data: {
                param: 5,
				InfoPlatillo: InfoPlatillo 
            },
            url: "utileria.php",
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

function GuardarListadoGreenSpot() {
    let arrayListadoComida = [];
        $("#ListadoComidaGr tr").each(function(index, value) {
            let Posicion, IdPlatillo, Platillo, Comentario, TipoPlatillo, KCal, Cantidad, Precios, Total;
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
            let Array = {};
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

function ObenerTipoPlatillo(){
	sede =  $('select[id="txtUbicacion"] option:selected').text();
	$("#txtTipoPlatillo").html('');
	 LimpiarCampos();
	 switch (sede) {
		case 'T.OP':
			$("#txtTipoPlatillo").append(`
				<option value="0"> Seleccione el tipo de platillo</option>
				<option value="3"> Platillo Unico</option>
				<option value="4">Green Spot</option>
			`);
			// $("#txtTipoPlatillo").append(`
			// 	<option value="0"> Seleccione el tipo de platillo</option>
			// 	<option value="4">Green Spot</option>
			// `);
			$("#break").hide();
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
			// $("#txtTipoPlatillo").append(`
			// 	<option value="0"> Seleccione el tipo de platillo</option>
			// 	<option value="4">Green Spot</option>
			// `);
			$("#break").show();
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
			// $("#txtTipoPlatillo").append(`
			// 	<option value="0"> Seleccione el tipo de platillo</option>
			// 	<option value="4">Green Spot</option>
			// `);
		break;
	
		default:
			$("#tipo_platillo").show();
			$("#txtTipoPlatillo").append(`
				<option value="0"> Seleccione el tipo de platillo</option>
				<option value="4">Green Spot</option>
			`);
			$("#break").hide();
		break;
	}
};

function Menu_secreto(){
	var date = new Date();
	let fecha_actual = moment(date).format('YYYY-MM-DD');
	$("#menu_secreto_select").html('');
	$("#menu_secreto").hide();
	$.ajax({
		url: "utileria.php",
		type: "post",
		data: {"param":31, "fecha_actual":fecha_actual, "sede":sede},
		success: function(result) {
			let data = JSON.parse(result);
			if (data.estatus == 'success') {
				$("#menu_secreto").show();
				$("#menu_secreto_select").append(`
					<option value="0"> Seleccione el platillo</option>
				`);	
				for (let i = 0; i < data.datos.length; i++) {
					$("#menu_secreto_select").append(`
						<option value="${data.datos[i].IDPlatillo}">${data.datos[i].Nombre_Platillo}</option>
					`);
				}	
			}else{
				if (sede != 'T.OP') {
					// Swal.fire("No hay menu", "no hay platillos cargados en esta sede","info");	
				}
			}
		}
	});
}

$("#break").on("click", function(){
    if($('#txtbreak').prop('checked') ){
        $("#txtTotalBreak").val("5.00");
    }else{
        $("#txtTotalBreak").val("0.00");
    }
});

$("#txtUbicacion").on('change',function(e){
	$("#menu_secreto_select").html('');
	$("#menu_secreto").hide();
	ObenerTipoPlatillo();
	TipoPlatillo();
});

$("#menu_secreto_select").on('change',function(e){
	let id_platillo = $('#menu_secreto_select').val();
	if (id_platillo == 0) {
		Swal.fire({
			title: "Aviso",
			text: 'Debes seleccionar menu',
			icon: 'info',
			allowOutsideClick: false,
			confirmButtonText: "Aceptar",
		});
        return false;
	}
	$.ajax({
		url: "utileria.php",
		type: "post",
		data: {"param":32, "id_platillo":id_platillo},
		success: function(result) {
			let datos = JSON.parse(result);
			if (datos.estatus == "error"){
				Swal.fire({
                    title: "Aviso",
                    text: datos.mensaje,
                    icon: 'info',
                    allowOutsideClick: false,
                    confirmButtonText: "Aceptar",
                }).then(function(){
					$('#menu_secreto_select').val('0');
				});
			}
		}
	});  
});

$("#txtNumPlatillo").on("keyup", function() {
	let cantidad_platillos = $(this).val().toLowerCase(),
	no_empleado = $("#txtNumEmpleadoLogeado").val();
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
		url: "utileria.php",
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