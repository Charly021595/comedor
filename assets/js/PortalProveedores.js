/* Formatting function for row details - modify as you need */
function format(d) {
    // `d` is the original data object for the row
    console.log(d);
    
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px">' +
        '<tr>' +      
        '<td><strong>Fecha de Recepción: </strong></td>' + '<td><strong>No. Factura:<strong></td>' +  '<td><strong>Codigo Art:<strong></td>' +  '<td><strong>Descripcion Art:</strong></td>' + 
        '<td><strong>Cant:</strong></td>' + '<td><strong>Precio:</strong></td>' + '<td><strong>IVA:</strong></td>' + '<td><strong>Lote:</strong></td>' + '<td><strong>Configuración:</strong></td>' +
        '<td><strong>Pte. de Entrega:</strong></td>' +  '<td><strong>Pedido:</strong></td>' + '<td><strong>Recibido:</strong></td>' +
        '</tr>' +
        '<tr>' +
        '<td>' + d.FechaFactura + '</td>' + '<td>' + d.Factura + '</td>' + '<td>' + d.Codigo + '</td>' +  '<td>' + d.Descripcion_Articulo + '</td>' +
        '<td>' + d.Cantidad + '</td>' + '<td>' + d.Precio + '</td>' + '<td>' + d.Iva + '</td>' + '<td>' + d.Lote + '</td>' + '<td>' + d.Configuracion + '</td>' +
        '<td>' + d.PendienteEntrega + '</td>' +  '<td>' + d.Pedido + '</td>' + '<td>' + d.Recibido + '</td>' + '<td>' + '<button type="button" class="btn btn-primary">Cargar Factura</button>'+ '</td>' +
        '</tr>' +    
        '</table>';     
}




$(document).ready(function () {
    $('#example1').dataTable( {
        responsive : true,
        // "processing": true,
        // "serverSide": true,
         ajax : {
             "type": 'POST',
             "url" : './utileria.php',  
             "dataType": 'JSON',             
             "cache": false,
             "data": {
                 'param' : 1,	
                 'proveedor': 'CGU180316GU1',			
             },
         },
         language : {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontró nada",
            "info": "Mostrando del _START_ al _END_ de un total de _TOTAL_",
            "infoEmpty": "No hay registros",
            "emptyTable": "No hay datos para mostrar",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "paginate": {
                "first": "Primera",
                "last": "Última",
                "next": "Siguiente",
                "previous": "Anterior"
            }
         },    
         //"array.json",
         columns: [          
             {
                 "className":      'details-control',
                 "orderable":      false,
                 "data":           null,
                 "defaultContent": ''
             },
             { "data" : "OrdenCompra" },
             { "data" : "FechaOrdenCompra" },
             { "data" : "TipoMoneda" },
             { "data" : "Estatus" },                  
             //{ "data" : "Monto_Neto" },
           /*  { "title": "Lote", "data" : "Lote" },
             { "title": "Configuración", "data" : "Configuracion" },
             
            
          /*   { "data" : "Factura" },
             { "data" : "CodigoArticulo" },
             { "data" : "DescripcionArticulo" },
             { "data" : "Cantidad" },
             { "data" : "Precio" },
             { "data" : "Iva" },
             { "data" : "PendienteEntrega" },
             { "data" : "Pedido" },
             { "data" : "Recibido" },
             { "data" : "Estatus" }*/
        ],
         order : [[1, 'desc']]
    } );

    
    // Add event listener for opening and closing details
    $('#example1').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = $('#example').DataTable().row(tr);

        if (row.child.isShown()) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child(format(row.data())).show();
            tr.addClass('shown');
        }
    });

});


function Login(){
	var usuario = $("#username").val();
	var pasword = $("#password").val();
	if(usuario.replace(/\s/g,"") != "" && pasword.replace(/\s/g,"") != ""){
		$.ajax({
			type: "POST",
			//async: false,
			data: {
			  param: 6,
			  username: usuario,
			  password: pasword
			  
			},
			
			url: "./utileria.php", 
		    dataType: 'JSON',
			success: function(data) {
				$('.cargando').hide(); // Oculta la imagen de cargando 
				if(data.length){
					window.location='index.php';
				}
				else{
					 //No se encontró el usuario, verifique los datos.
					 $('#mensaje').append("<pre>No se encontró el usuario, verifique los datos.</pre>");
					 $("#username").val("");
					 $("#password").val("");
				}
				
			}
		});
		
	}
	
}



