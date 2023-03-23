let bandera = 0;

$(document).ready(function () {
	BuscarEmpleadoLogeado();
});

function buscar_sede(){
	$("#txtTipoPlatillo").html('');
	$("#sede").append(`
		<option value="1">Torre TOP</option>
		<option value="2">Apodaca</option>
		<option value="3">Cienega</option>
	`);
	let num_empleado = $("#txtNumEmpleado").val();
	$.ajax({
		url: "../../utileria.php",
		type: "post",
		data: {"param":1, "empleado":num_empleado},
		success: function(result) {
			sede  = JSON.parse(result)[0].Sede;
			if (num_empleado == 4857 || num_empleado == 8999) {
				sede = 'Cienega';
				$("#sede").val(3);
			}else{
				switch (sede) {
					case 'Torre TOP':
						sede = 'Torre Top';
						$("#sede").val(1);
					break;
	
					case 'Apodaca':
						sede = 'Apodaca';
						$("#sede").val(2);
					break;
	
					case 'Cienega':
						sede = 'Cienega';
						$("#sede").val(3);
					break;
				
					default:
						sede = 'Torre Top';
						$("#sede").val(1);
					break;
				}
			}
		}
	});
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
            url: "../../utileria.php",
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

$("#subir_excel").on("click", function(e){
    $('#ocultar_file').hide();
	if($('#subir_excel').prop('checked')) {
        $('#ocultar_file').show();
        bandera = 1;
    }else{
        $('#ocultar_file').hide();
        bandera = 0;
    }
});

$("#boton_guardar").on("click", function(e){
	e.preventDefault();
	$("#boton_guardar").addClass("deshabilitar");
  	$('#boton_guardar').attr("disabled", true);
	$('#lbl_guardar').hide();
	$('#cargando_guardar').show();
	let date = new Date();
	let fecha_actual = moment(date).format('YYYY-MM-DD');
    if (bandera == 0) {
        let nombre_platillo = $('#nombre_platillo').val(),
        descripcion = $('#descripcion').val(),
        sede = $('#sede').val(),
		sede_texto = $('select[name="sede"] option:selected').text(),
        fecha_dia = $('#fecha_dia').val();
		if (nombre_platillo == '') {
			Swal.fire('Campo vació', "El campo nombre del platillo no puede estar vació", "info");
			$("#boton_guardar").removeAttr("disabled, disabled");
			$("#boton_guardar").removeClass("deshabilitar");
			$('#boton_guardar').attr("disabled", false);
			$('#cargando_guardar').hide();
			$('#lbl_guardar').show();
			return false;
		}
		if (descripcion == '') {
			Swal.fire('Campo vació', "El campo descripción no puede estar vació", "info");
			$("#boton_guardar").removeAttr("disabled, disabled");
			$("#boton_guardar").removeClass("deshabilitar");
			$('#boton_guardar').attr("disabled", false);
			$('#cargando_guardar').hide();
			$('#lbl_guardar').show();
			return false;
		}
		if (sede == 0) {
			Swal.fire('Campo vació', "El campo sede no puede estar vació", "info");
			$("#boton_guardar").removeAttr("disabled, disabled");
			$("#boton_guardar").removeClass("deshabilitar");
			$('#boton_guardar').attr("disabled", false);
			$('#cargando_guardar').hide();
			$('#lbl_guardar').show();
			return false;
		}
		if (fecha_dia == '') {
			Swal.fire('Campo vació', "El campo fecha no puede estar vació", "info");
			$("#boton_guardar").removeAttr("disabled, disabled");
			$("#boton_guardar").removeClass("deshabilitar");
			$('#boton_guardar').attr("disabled", false);
			$('#cargando_guardar').hide();
			$('#lbl_guardar').show();
			return false;
		}
        $.ajax({
            url: "../../utileria.php",
            type: "post",
            data: {"param":30, "nombre_platillo":nombre_platillo, "descripcion":descripcion, "sede":sede_texto, "fecha_dia":fecha_dia, "bandera":bandera, "fecha_actual":fecha_actual},
            success: function(result) {
				console.log(result);
                let datos = JSON.parse(result);
                if (datos.estatus == "success") {
					Swal.fire('Guardado', datos.mensaje, "success");
					$("#boton_guardar").removeAttr("disabled, disabled");
                    $("#boton_guardar").removeClass("deshabilitar");
                    $('#boton_guardar').attr("disabled", false);
                    $('#cargando_guardar').hide();
                    $('#lbl_guardar').show();
					$('#nombre_platillo').val('');
					$('#descripcion').val('');
					$('#sede').val(0);
					$('#fecha_dia').val('');
                }else{
                    Swal.fire( 
                        datos.mensaje,
                        '',
                        'error'
                    );
					$("#boton_guardar").removeAttr("disabled, disabled");
                    $("#boton_guardar").removeClass("deshabilitar");
                    $('#boton_guardar').attr("disabled", false);
                    $('#cargando_guardar').hide();
                    $('#lbl_guardar').show();
                }
            }
        });     
    }else{
        let formData = new FormData(document.getElementById("form_comedor_subir_menu"));
        formData.append("dato", "valor");
        formData.append("param", 30);
		formData.append("bandera", bandera);
		formData.append("fecha_actual", fecha_actual);
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
					Swal.fire('Guardado', data.mensaje, "success");
					$("#boton_guardar").removeAttr("disabled, disabled");
                    $("#boton_guardar").removeClass("deshabilitar");
                    $('#boton_guardar').attr("disabled", false);
                    $('#cargando_guardar').hide();
                    $('#lbl_guardar').show();
					$('#file_excel').val('');
                }else{
                    Swal.fire( 
                        data.mensaje,
                        '',
                        'error'
                    );
					$("#boton_guardar").removeAttr("disabled, disabled");
                    $("#boton_guardar").removeClass("deshabilitar");
                    $('#boton_guardar').attr("disabled", false);
                    $('#cargando_guardar').hide();
                    $('#lbl_guardar').show();
                }
            }
        });
    }
});