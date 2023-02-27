var NoAlimento=0;
var NoDatosBioquimicos = 0;
var sede = '';

$(document).ready(function () {
	//var empleado = $("#txtNumEmpleado").val();
	BuscarEmpleadoLogeado();
	validarvisitas();
	//buscar_sede();
});

function buscar_sede(){
	$("#txtTipoPlatillo").html('');
	let num_empleado = $("#txtNumEmpleado").val();
	$.ajax({
		url: "utileria.php",
		type: "post",
		data: {"param":1, "empleado":num_empleado},
		success: function(result) {
			sede  = JSON.parse(result)[0].Sede;
			if (num_empleado == 4857 || num_empleado == 8999) {
				sede = 'Cienega';
				$("#txtUbicacion").val(3);
			}else{
				switch (sede) {
					case 'Torre TOP':
						sede = 'Torre Top';
						$("#txtUbicacion").val(1);
					break;
	
					case 'Apodaca':
						sede = 'Apodaca';
						$("#txtUbicacion").val(2);
					break;
	
					case 'Cienega':
						sede = 'Cienega';
						$("#txtUbicacion").val(3);
					break;
				
					default:
						sede = 'Torre Top';
						$("#txtUbicacion").val(1);
					break;
				}
			}
			ObenerTipoPlatillo();
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
		
		//LimpiarCampos();
		$.ajax({
            type: "POST",
            data: {
                param: 1,
				empleado: empleado 
            },
            url: "utileria.php",
            dataType: 'JSON',
             success: function(data) {
				if(data.length){
					for(i=0;i<data.length;i++){
						let FechaAr =  "Fecha: "+ fechaActual2;
						$("#NombreCont2").text(data[i]['Nombre']);
						$("#NombreCont").text(data[i]['Nombre']);
						$("#tipo_empleado").val(data[i]['Tipo_Empleado']);
						$("#Fecha2").text(FechaAr);
						$("#txtNombreEmpleadoLogeado").val(data[i]['Nombre']);
					}
					buscar_sede();
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
	$("#txtTotalPlatillo").val(parseFloat(Calculo).toFixed(2));
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
	let NoEmpleadoLogeado = $("#txtNumEmpleadoLogeado").val();
	let NombreEmpleado =  $("#txtNombreEmpleadoLogeado").val();
	let NoPlatillos = $("#txtNumPlatillo").val();
	let TipoPlatillo = $("#txtTipoPlatillo").val();
	let Ubicacion = $("#txtUbicacion").val();
	//let FechaDeOrden = $("#txtFechaPedido").val();
	let Total = $("#txtTotalPlatillo").val();
	let Precio = $("#txtPrecioPlatillo").val();
	let Tipo_Empleado= $("#tipo_empleado").val();
	let CantidadArreglo = "";
	$("#GuardarOrden").prop("disabled", true);
	//
	let arrayListadoGreenSpot = {};
	let arrayListadoPlatilloUnico = {};
	let fechaActualL = new Date(); //Fecha actual
	let FechaDeOrden = moment(fechaActualL).format("YYYY-MM-DD HH:mm:ss"),
	dia_actual = moment(fechaActualL).format('DD'),
	nombre_dia_actual = moment(fechaActualL).format('dddd'),
	comentario_global= $("#txtComentarioGlobalPlatillo").val();
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
			if ((sede == 'Apodaca' || sede == 'Cienega') && TipoPlatillo != 3) {
				Array.Break = 12.50;	
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
	if (TipoPlatillo != "4" && TipoPlatillo != "3" && TipoPlatillo != "5" && TipoPlatillo != "6") {
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
	if (Total == "0.00" && TipoPlatillo != "4") {
        Swal.fire('El saldo total no puede ser 0.00', "","info");
		$("#GuardarOrden").prop("disabled", false);
        return false;
    }
	if (CantidadArreglo === 0 || CantidadArreglo === "" && TipoPlatillo == "4") {
        Swal.fire('No tienes platillos ingresados', "","info");
		$("#GuardarOrden").prop("disabled", false);
        return false;
    }
	if (NoEmpleadoLogeado == 20000 && comentario_global == "") {
        Swal.fire('El comentario es obligatorio', "","info");
		$("#GuardarOrden").prop("disabled", false);
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
			comentario_global:comentario_global
		},
		url: "utileria.php", 
		success: function(result) {
			data = JSON.parse(result);
			if (data.estatus === "success") {
				Swal.fire('El pedido de la comida ha sido guardado correctamente.', "Pedido de comida Guardado.","success")
				.then(function(){
					location.reload();
				});
			}else if(data.estatus === "pedido_duplicado"){
				Swal.fire('Solo se puede realizar un pedido al día.', "","info");
				$("#GuardarOrden").prop("disabled", false);
			}else{
				Swal.fire('La información no pudo ser guardada.', "","error");
				$("#GuardarOrden").prop("disabled", false);
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
	let txtUbicacion = $("#txtUbicacion").val();
	let tipoplatillo = $("#txtTipoPlatillo").val();
	let empleado = $("#txtNumEmpleado").val();
	$("#txtProductoSeleccionadoGR").empty();
	$("#ListadoComidaGr").find("tr").remove();
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
			case 'Torre TOP':
				$("#txtTotalPlatillo").val("49.00");
				$("#txtPrecioPlatillo").val("49.00");
			break;

			case 'Apodaca':
				$("#txtTotalPlatillo").val("20.00");
				$("#txtPrecioPlatillo").val("20.00");
			break;

			case 'Cienega':
				if (tipoplatillo == 6) {
					$("#txtTotalPlatillo").val("0");
					$("#txtPrecioPlatillo").val("0");	
				}else{
					$("#txtTotalPlatillo").val("20.00");
					$("#txtPrecioPlatillo").val("20.00");
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
		case 'Torre TOP':
			sede = 'Torre Top';
			$("#txtTipoPlatillo").append(`
				<option value="0"> Seleccione el tipo de platillo</option>
				<option value="3"> Platillo Unico</option>
				<option value="4">Green Spot</option>
			`);
		break;

		case 'Apodaca':
			sede = 'Apodaca';
			$("#txtTipoPlatillo").append(`
				<option value="0"> Seleccione el tipo de platillo</option>
				<option value="3"> Platillo Unico</option>
				<option value="4">Green Spot</option>
				<option value="5">Platillo Unico y Break</option>
				<option value="6">Break</option>
			`);
		break;

		case 'Cienega':
			sede = 'Cienega';
			$("#txtTipoPlatillo").append(`
				<option value="0"> Seleccione el tipo de platillo</option>
				<option value="3"> Platillo Unico</option>
				<option value="4">Green Spot</option>
				<option value="5">Platillo Unico y Break</option>
				<option value="6">Break</option>
			`);
		break;
	
		default:
			sede = 'Torre Top';
			$("#txtTipoPlatillo").append(`
				<option value="0"> Seleccione el tipo de platillo</option>
				<option value="3"> Platillo Unico</option>
				<option value="4">Platillo Especial</option>
			`);
		break;
	}
};

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