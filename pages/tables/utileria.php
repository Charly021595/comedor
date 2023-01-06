<?php
	header('Content-Type: text/html; charset=utf-8');
	//error_reporting(E_ALL ^ E_NOTICE);
	
	$param = $_POST['param'];	
	switch($param) {
        case '1': //Consulta
				//$Fecha = $_POST['Fecha'];
				$query = array();
				include '../../db/conectar.php';
			    $USER = $_POST['proveedor'];
				$sql = "select VIJ.PURCHID as 'OrdenCompra',
				PT.CREATEDDATETIME as 'FechaOrdenCompra',
				F.MONEDA as 'TipoMoneda',
				IND.INVENTBATCHID as 'Lote',
				IND.CONFIGID as 'Configuracion',
				VIJ.INVOICEDATE as 'FechaFactura',
				VIT.ITEMID  as 'Codigo',
				F.FACTURA as 'Factura',
				IT.NAMEALIAS as 'Descripcion_Articulo',
				CONVERT(numeric(10,2),VIT.QTY) as 'Cantidad',
				CONVERT(numeric(10,2),VIT.PURCHPRICE) as 'Precio',
				replace(vit.TAXGROUP,'IVA','') as 'Iva',
				IND.INVENTBATCHID as 'Lote',
				IND.CONFIGID as 'Configuracion',
				CONVERT(numeric(10,2),VPST.Remain) as 'PendienteEntrega',
				CONVERT(numeric(10,2),VPST.Ordered) as 'Pedido',
				CONVERT(numeric(10,2),VPST.Qty) as 'Recibido',
				CASE PT.PURCHSTATUS
				WHEN 1 THEN 'None'
				WHEN 2 THEN 'Orden Abierta'
				WHEN 3 THEN 'Recibido'
				WHEN 4 THEN 'Facturado'
				WHEN 5 THEN 'Cancelado'
				ELSE 'NULL'
				END 'Estatus'
				FROM PP_FACTURAS F
			 INNER JOIN DIRPARTYTABLE E ON E.DATAAREA = F.DATAAREAID	
			 LEFT  JOIN VendInvoiceJour	VIJ ON  VIJ.DATAAREAID = F.DATAAREAID and F.ORDENCOMPRA= VIJ.PURCHID and VIJ.INVOICEID like '%'+ F.FACTURA 
			 LEFT  JOIN VendInvoiceTrans VIT ON  VIT.PurchId = VIJ.PURCHID and VIT.INVOICEID = VIJ.INVOICEID and VIT.NUMBERSEQUENCEGROUP = VIJ.NUMBERSEQUENCEGROUP 
			 and VIT.INTERNALINVOICEID = VIJ.INTERNALINVOICEID and VIT.DATAAREAID = VIJ.DATAAREAID
			 left join VendPackingSlipTrans VPST on VIT.ORIGPURCHID = VPST.ORIGPURCHID and VIT.INVENTTRANSID = VPST.INVENTTRANSID and VIT.DATAAREAID = VPST.DATAAREAID
			 left join INVENTDIM IND on  IND.INVENTDIMID = VIT.INVENTDIMID and IND.DATAAREAID =VIT.DATAAREAID
			 left join INVENTTABLE IT on VIT.ITEMID = IT.ITEMID and VIT.DATAAREAID = IT.DATAAREAID
			 left join PURCHTABLE PT on PT.PURCHID = F.ORDENCOMPRA and PT.DATAAREAID = F.DATAAREAID
			 WHERE 
				 F.RFC = 'MATG8602073L4'
				 AND F.BAJA = 0
				 AND E.ORGANIZATIONTYPE = 1 -- OBTENER LA EMPRESA
			 ORDER BY F.FECHARECEPCION, f.ORDENCOMPRA, f.FACTURA DESC";
               // $sql = "{call PortalProveedores_ObtenerFacturas(?)}";
				//$params = array($Fecha);
				$params = array($USER);
				$stmt = sqlsrv_query($conn, $sql, $params);
                //print_r($stmt);
				if ( $stmt === false) {
					die( print_r( sqlsrv_errors(), true) );
				}	
				while( $row = sqlsrv_fetch_array($stmt) ) {
                    //print_r($row);
					$record = array(
					   "OrdenCompra"       => $row['OrdenCompra'], //Orden de compra
					   "FechaOrdenCompra"  => $row['FechaOrdenCompra']->format('d/m/Y'), //Fecha de orden de compra
                       "TipoMoneda"        => $row['TipoMoneda'], //Moneda
					   "Estatus" 	       => $row['Estatus'], //Estatus
					   "FechaFactura"      => $row['FechaFactura'] != null ? $row['FechaFactura']->format('d/m/Y'):"", //Fecha de recepcion
					   "Factura" 		   => utf8_encode ($row['Factura']), //No Factura
					   "Codigo" 	       => utf8_encode ($row['Codigo']), //Codigo Articulo
					   "Descripcion_Articulo" 		=> utf8_encode ($row['Descripcion_Articulo']),//DescipcionArticulo
					   "Cantidad"	       => $row['Cantidad'], //Cantidad 
					   "Precio"            => $row['Precio'], //Precio
					   "Iva"  	           => utf8_encode ($row['Iva']), //IVA
                       "Lote"              => $row['Lote'], //Lote
                       "Configuracion" 	   => $row['Configuracion'],//Configuracion
					   "PendienteEntrega"  => $row['PendienteEntrega'],//PendienteEntrega
					   "Pedido"	           => $row['Pedido'], //Pedido
					   "Recibido" 		   => $row['Recibido'],//Recibido 
					   
					/*	"F.FACTURA"			=> utf8_encode ($row['Factura']), //Factura
						
						"VIT.ITEMID" 	    => utf8_encode ($row['CodigoArticulo']), //Codigo Articulo
                        "IT.NAMEALIAS" 		=> utf8_encode ($row['DescripcionArticulo']),//DescipcionArticulo
						"VIT.QTY"	        => $row['Cantidad'], //Cantidad 
						"VIT.PURCHPRICE"    => $row['Precio'], //Precio
						
                        "VPST.Remain" 		=> $row['PendienteEntrega'],//PendienteEntrega
						"VPST.Ordered"	    => $row['Pedido'], //Pedido
						                    
						"PT.PURCHSTATUS" 	=> $row['Estatus'] //Estatus    */             
					);
					array_push($query, $record);
				}
				
				//$query2= "Prueba";
                
                //print_r($query);
				//json_encode($query);
				//echo json_encode($query2);
				//return $envio; 

				
				sqlsrv_free_stmt( $stmt);		
				sqlsrv_close($conn);

                $json = array(
                    "success"=> count($query) > 0 ? true : false,
                    "data"=>$query
                );

				echo json_encode($json);
				// return array(
					// "success"=>count($query) > 0 ? true : false,
					// "data"=>$query
				// );
			break;

			case '6': //Consulta
				$USER = $_POST['username'];
				$PASS = $_POST['password'];
				$query = array();
				include '../../db/conectar.php';
				$sql = "{call PortalProveedores_ValidarCredenciales(?,?)}";
				$params = array($USER ,$PASS);
				$stmt = sqlsrv_query($conn, $sql, $params);
				if ( $stmt === false) {
					die( print_r( sqlsrv_errors(), true) );
				}	
				session_start();
				while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
					$record = array(
						"usuario"	=> utf8_encode($row['USUARIO']),
						"nombre" 	=> utf8_encode($row['NOMBRE']),
						"ultimoacceso" => $row['ACCESO'],
						"tipoproveedor" => $row['TIPOPROVEEDOR']
						
						);
							
					array_push($query, $record);
					
				}
				$size = sizeof($query);
				if($size != 0){
					$_SESSION["acceso"] = time();	
				}
				//$_SESSION["acceso"] = time();
				$_SESSION['validacion'] = $query;
				
				echo json_encode($_SESSION['validacion']);
				//return $envio; 
				sqlsrv_free_stmt( $stmt);		
				sqlsrv_close($conn);
	
			break;
	
	
  }
?>