<?php
	header('Content-Type: text/html; charset=utf-8');

	require 'PHPExcel/Classes/PHPExcel.php';

	$param = $_POST['param'];	
	switch($param) {
		case '1': //Consulta
			$data = array();
			$empleado = $_POST['empleado'];
			$query = array();
			include './db/conectar2.php';
			$sql = "{call RHMet_ObtenerDatosEmpleado(?)}";
			$params = array($empleado);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if ( $stmt === false) {
				die( print_r( sqlsrv_errors(), true) );
			}	
			while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {

				$NombreEmpleado =  utf8_encode ($row['NombreCompleto']);
				$record = array(
					"Empleado" => utf8_encode($row['Empleado']),
					"Nombre" =>utf8_encode( $row['NombreCompleto'])!= null ? utf8_encode ($row['NombreCompleto']):"",
					"Sede" =>utf8_encode( $row['Sede'])!= null ? utf8_encode ($row['Sede']):"",
					"Tipo_Empleado" => $row['Turno'] != null ? $row['Turno'] : 0
				);
				array_push($query, $record);
			}
			/*
			session_start();
			$_SESSION['Empleado'] =$empleado;
			$_SESSION['NombreEmpleado'] =$NombreEmpleado;
			*/
			if (count($query) != 0) {
				$data = array(
					"estatus" => "success",
					"datos" => $query
				);
			}else{
				$data = array(
					"estatus" => "error",
					"mensaje" => "ocurrio un error"
				);
			}
			ob_clean();//clears the output buffer
			echo json_encode($data);
			sqlsrv_free_stmt($stmt);	
		break;
		case '2':
			$data = array();
			$NoEmpleado = isset($_POST['NoEmpleadoLogeado']) ? $_POST['NoEmpleadoLogeado'] : 0;
			$NombreEmpleado =  isset($_POST['NombreEmpleado']) ? utf8_decode($_POST['NombreEmpleado']) : '';
			$TipoPlatillo = isset($_POST['TipoPlatillo']) ? $_POST['TipoPlatillo'] : 0;
			$Ubicacion =  isset($_POST['Ubicacion']) ? (int)$_POST['Ubicacion'] : 0;
			$FechaDeOrden =  isset($_POST['FechaDeOrden']) ? $_POST['FechaDeOrden'] : '';
			$arrayListadoPlatilloUnico = isset($_POST['arrayListadoPlatilloUnico']) ? json_decode($_POST['arrayListadoPlatilloUnico'], true) : 0;
			$arrayListadoGreenSpot = isset($_POST['arrayListadoGreenSpot']) ? json_decode($_POST['arrayListadoGreenSpot'], true) : 0;
			$Tipo_Empleado =  isset($_POST['Tipo_Empleado']) ? $_POST['Tipo_Empleado'] : 0;
			$validar = true;
			$pedidoporcomedor =  isset($_POST['pedidoporcomedor']) ? $_POST['pedidoporcomedor'] : 0;
			$comentario_global =  isset($_POST['comentario_global']) ? utf8_decode($_POST['comentario_global']) : '';
			$platillo_menu =  isset($_POST['platillo_menu']) ? $_POST['platillo_menu'] : 0;
			$tipo_comedor =  isset($_POST['tipo_comedor']) ? $_POST['tipo_comedor'] : 0;
			$envio_usuario =  isset($_POST['envio_usuario']) ? $_POST['envio_usuario'] : 0;
			$estatus_comedor = $TipoPlatillo != 4 ? 1 : 0;
			$hora_actual =  isset($_POST['hora_actual']) ? $_POST['hora_actual'] : 0;
			$hora_estatica_inicio_green_spot = "07:30:00";
			$hora_estatica_fin_green_spot = "08:40:00";
			$fecha_validar = explode(" ", $FechaDeOrden); 
			if ($envio_usuario == 1) {
				$estatus_comedor = 0;
			}

			// if($_SESSION['RHComedor'] != '8999' && $_SESSION['RHComedor'] != '4857' && $_SESSION['RHComedor'] != '99999999' 
			// && $_SESSION['RHComedor'] != '100000000' && $_SESSION['RHComedor'] != '100000001'){
			// 	if (($hora_actual < $hora_estatica_inicio_green_spot || $hora_actual > $hora_estatica_fin_green_spot)){
			// 		$data = array(
			// 			"estatus" => "error",
			// 			"mensaje" => "Los Pedidos de green spot estan cerrados. <br/> Los horarios son de 07:30:00 a 08:40:00"
			// 		);
			// 		echo json_encode($data); 
			// 		die();
			// 	}
			// }
			
			include './db/conectar.php';
			if (($TipoPlatillo == 5 || $TipoPlatillo == 6 || $TipoPlatillo == 7 || $TipoPlatillo == 3) && $NoEmpleado != 20000 && $Ubicacion != 3) {
				$sql_validar_cantidad_platillos = "{call RHCom_ValidarPedidos(?, ?, ?, ?, ?)}";
				$params_validar_cantidad_platillos = array($fecha_validar[0], $NoEmpleado, $Ubicacion, $tipo_comedor, $TipoPlatillo);
				$stmt_validar_cantidad_platillos = sqlsrv_query($conn, $sql_validar_cantidad_platillos, $params_validar_cantidad_platillos);
				if($stmt_validar_cantidad_platillos === false) {
					$validar = false;
					$mensaje = sqlsrv_errors();
					$data = array(
						"estatus" => 'error_consulta_validar_platillos',
						"Validar" => $validar,
						"mensaje" => $mensaje[0]['message']
					);
					echo json_encode($data);
					die();	
				}else{
					$row_validar_cantidad_platillos = sqlsrv_fetch_array($stmt_validar_cantidad_platillos, SQLSRV_FETCH_ASSOC);
					if (count($row_validar_cantidad_platillos) != 0) {
						$validar = false;
						$data = array(
							"estatus" => "pedido_duplicado",
							"mensaje" => "Solo puedes realizar un pedido por día"
						);
						echo json_encode($data); 
						die();
					}
				}
			}
			if (($arrayListadoPlatilloUnico != 0 && $TipoPlatillo == 0) || ($arrayListadoPlatilloUnico != 0 && $TipoPlatillo == 3) || ($arrayListadoGreenSpot != 0 && $TipoPlatillo == 4) || ($arrayListadoPlatilloUnico != 0 && $TipoPlatillo == 5) || ($arrayListadoPlatilloUnico != 0 && $TipoPlatillo == 6) || ($arrayListadoPlatilloUnico != 0 && $TipoPlatillo == 7)) {
				$sql = "{call RHCom_GuardaPedido(?,?,?,?,?,?,?,?,?,?,?)}";
				$params = array($NoEmpleado,$NombreEmpleado,$TipoPlatillo,$FechaDeOrden,$Ubicacion,$pedidoporcomedor,$Tipo_Empleado,$platillo_menu,$tipo_comedor,$estatus_comedor, $envio_usuario);
				$stmt = sqlsrv_query($conn, $sql, $params);
				if($stmt === false){
					$validar = false;
					$mensaje = sqlsrv_errors();
					$data = array(
						"estatus" => 'error_guardar_pedido',
						"Validar" => $validar,
						"mensaje" => $mensaje[0]['message']
					);
					echo json_encode($data);
					die();	
				}else{
					$sp_actualizar_cantidad = "{call RHCom_ActualizaCantidadPlatillo(?)}";
					$params_actualizar_cantidad = array($platillo_menu);
					$stmt_actualizar_cantidad = sqlsrv_query($conn, $sp_actualizar_cantidad, $params_actualizar_cantidad);
					if($stmt_actualizar_cantidad === false){
						$validar = false;
						$mensaje = sqlsrv_errors();
						$data = array(
							"estatus" => 'error_guardar_pedido',
							"Validar" => $validar,
							"mensaje" => $mensaje[0]['message']
						);
						echo json_encode($data);
						die();	
					}
					while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
						$record = array(
								"IdPedido"  => $row['IdPedido']
							);
							//$idEncuesta = $row['IdIncidente3'];
						array_push($data, $record);
					}
					//Insertaria En Pedido de Subsidiado
					if($TipoPlatillo == "0"){
						foreach ($record as $row1) {
							foreach ($arrayListadoPlatilloUnico as $row3) {
								$IdPedidoInsertado = $row1;
								$Precio = $row3['Precio'];
								$Break = isset($row3['Break']) ? (float)$row3['Break'] : (float)0;
								$NoPlatillos = $row3['NoPlatillos'];
								$TipoPlatillo = $row3['TipoPlatillo'];
								$Total = $Break != 0 ? (float)$row3['Total'] + $Break : (float)$row3['Total'];
								$FechaPedido = $row3['FechaPedido'];
								$Comentario =  utf8_decode($comentario_global);
								$Platillo  = 'Break';
								
								include './db/conectar.php';
								$sql = "{call RHCom_GuardaPedidoComedorSubsidiado(?,?,?,?,?,?,?,?,?,?)}";
								// $params = array($IdPedidoInsertado,$Precio,$NoPlatillos,$TipoPlatillo,$Total,$FechaPedido,$Comentario,$Platillo);
								$params = array($IdPedidoInsertado,$Precio,$NoPlatillos,$TipoPlatillo,$Total,$FechaPedido,$Comentario,$Platillo,$Break,$envio_usuario);
								$stmt = sqlsrv_query($conn, $sql, $params);
								if ( $stmt === false) {
									$validar = false;
									$mensaje = sqlsrv_errors();
									$data = array(
										"estatus" => 'error_guardar_pedido_subsidiado',
										"Validar" => $validar,
										"mensaje" => $mensaje[0]['message']
									);
									echo json_encode($data);
									die();
								}

								sqlsrv_free_stmt( $stmt );
								sqlsrv_close($conn);
							}
						}
					}else if($TipoPlatillo == "3"){
						foreach ($record as $row1) {
							foreach ($arrayListadoPlatilloUnico as $row3) {
								$IdPedidoInsertado = $row1;
								$Precio = $row3['Precio'];
								$Break = isset($row3['Break']) ? (float)$row3['Break'] : (float)0;
								$NoPlatillos = $row3['NoPlatillos'];
								$TipoPlatillo = $row3['TipoPlatillo'];
								$Total = $Break != 0 ? (float)$row3['Total'] + $Break : (float)$row3['Total'];
								$FechaPedido = $row3['FechaPedido'];
								$Comentario =  utf8_decode($comentario_global);
								$Platillo  = $Break != 0 ? $row3['Platillo'].' y Break' : $row3['Platillo'];
								
								include './db/conectar.php';
								$sql = "{call RHCom_GuardaPedidoComedorSubsidiado(?,?,?,?,?,?,?,?,?,?)}";
								// $params = array($IdPedidoInsertado,$Precio,$NoPlatillos,$TipoPlatillo,$Total,$FechaPedido,$Comentario,$Platillo);
								$params = array($IdPedidoInsertado,$Precio,$NoPlatillos,$TipoPlatillo,$Total,$FechaPedido,$Comentario,$Platillo,$Break,$envio_usuario);
								$stmt = sqlsrv_query($conn, $sql, $params);
								if ( $stmt === false) {
									$validar = false;
									$mensaje = sqlsrv_errors();
									$data = array(
										"estatus" => 'error_guardar_pedido_subsidiado',
										"Validar" => $validar,
										"mensaje" => $mensaje[0]['message']
									);
									echo json_encode($data);
									die();
								}

								sqlsrv_free_stmt( $stmt );
								sqlsrv_close($conn);
							}
						}
					}else if($TipoPlatillo == "4"){
						foreach ($record as $row1) {
							foreach ($arrayListadoGreenSpot as $row4) {
								
								$IdPedidoInsertado = $row1;
								$Posicion = $row4['Posicion'];
								$IdPlatillo = $row4['IdPlatillo'];
								$Platillo = utf8_decode($row4['Platillo']);
								$Comentario = utf8_decode($comentario_global);
								$TipoPlatillo = $TipoPlatillo;
								$KCal =  utf8_decode($row4['KCal']);
								$Cantidad = $row4['Cantidad'];
								$Precios = $row4['Precios'];
								$Total = $row4['Total'];
								$FechaPedido = $FechaDeOrden;
									
								include './db/conectar.php';
								$sql = "{call RHCom_GuardaPedidoComedorGreenSpot(?,?,?,?,?,?,?,?,?,?,?,?)}";
								$params = array($IdPedidoInsertado,$Posicion,$IdPlatillo,$Platillo,$Comentario,$TipoPlatillo,
												$KCal,$Cantidad,$Precios,$Total,$FechaPedido,$envio_usuario);
								$stmt = sqlsrv_query($conn, $sql, $params);
								if ( $stmt === false) {
									$validar = false;
									$mensaje = sqlsrv_errors();
									$data = array(
										"estatus" => 'error_guardar_pedido_green_spot',
										"Validar" => $validar,
										"mensaje" => $mensaje[0]['message']
									);
									echo json_encode($data);
									die();
								}

								sqlsrv_free_stmt( $stmt );
								sqlsrv_close($conn);
							}
						}
					}else if($TipoPlatillo == "5"){
						foreach ($record as $row1) {
							foreach ($arrayListadoPlatilloUnico as $row3) {
								
								$IdPedidoInsertado = $row1;
								$Precio = (float)$row3['Precio'];
								$Break = (float)$row3['Break'];
								$NoPlatillos = $row3['NoPlatillos'];
								$TipoPlatillo = $row3['TipoPlatillo'];
								$Total = $Break != 0 ? (float)$row3['Total'] + $Break : (float)$row3['Total'];
								$FechaPedido = $row3['FechaPedido'];
								$Comentario =  utf8_decode($comentario_global);
								$Platillo  = $Break != 0 ? $row3['Platillo'].' y Break' : $row3['Platillo'];
								
								include './db/conectar.php';
								$sql = "{call RHCom_GuardaPedidoComedorSubsidiado(?,?,?,?,?,?,?,?,?,?)}";
								$params = array($IdPedidoInsertado,$Precio,$NoPlatillos,$TipoPlatillo,$Total,$FechaPedido,$Comentario,$Platillo,$Break,$envio_usuario);
								$stmt = sqlsrv_query($conn, $sql, $params);
								
								if ( $stmt === false && $stmt2 === false) {
									$validar = false;
									$mensaje = sqlsrv_errors();
									$data = array(
										"estatus" => 'error_guardar_pedido_subsidiado',
										"Validar" => $validar,
										"mensaje" => $mensaje[0]['message']
									);
									echo json_encode($data);
									die();
								}

								sqlsrv_free_stmt( $stmt );
								sqlsrv_free_stmt( $stmt2 );
								sqlsrv_close($conn);
							}
						}
					}else if($TipoPlatillo == "6"){
						foreach ($record as $row1) {
							foreach ($arrayListadoPlatilloUnico as $row3) {
								$IdPedidoInsertado = $row1;
								$Precio = $row3['Precio'];
								$Break = (float)$row3['Break'];
								$NoPlatillos = $row3['NoPlatillos'];
								$TipoPlatillo = $row3['TipoPlatillo'];
								$Total = $Break != 0 ? (float)$row3['Total'] + $Break : (float)$row3['Total'];
								$FechaPedido = $row3['FechaPedido'];
								$Comentario =  utf8_decode($comentario_global);
								$Platillo  = $Break != 0 ? $row3['Platillo'].' y Break' : $row3['Platillo'];
								
								include './db/conectar.php';
								$sql = "{call RHCom_GuardaPedidoComedorSubsidiado(?,?,?,?,?,?,?,?,?,?)}";
								// $params = array($IdPedidoInsertado,$Precio,$NoPlatillos,$TipoPlatillo,$Total,$FechaPedido,$Comentario,$Platillo);
								$params = array($IdPedidoInsertado,$Precio,$NoPlatillos,$TipoPlatillo,$Total,$FechaPedido,$Comentario,$Platillo,$Break,$envio_usuario);
								$stmt = sqlsrv_query($conn, $sql, $params);
								if ( $stmt === false) {
									$validar = false;
									$mensaje = sqlsrv_errors();
									$data = array(
										"estatus" => 'error_guardar_pedido_subsidiado',
										"Validar" => $validar,
										"mensaje" => $mensaje[0]['message']
									);
									echo json_encode($data);
									die();
								}

								sqlsrv_free_stmt( $stmt );
								sqlsrv_close($conn);
							}
						}
					}else if($TipoPlatillo == "7"){
						foreach ($record as $row1) {
							foreach ($arrayListadoPlatilloUnico as $row3) {
								$IdPedidoInsertado = $row1;
								$Precio = $row3['Precio'];
								$Break = (float)$row3['Break'];
								$NoPlatillos = $row3['NoPlatillos'];
								$TipoPlatillo = $row3['TipoPlatillo'];
								$Total = $Break != 0 ? (float)$row3['Total'] + $Break : (float)$row3['Total'];
								$FechaPedido = $row3['FechaPedido'];
								$Comentario =  utf8_decode($comentario_global);
								$Platillo  = $Break != 0 ? $row3['Platillo'].' y Break' : $row3['Platillo'];
								
								include './db/conectar.php';
								$sql = "{call RHCom_GuardaPedidoComedorSubsidiado(?,?,?,?,?,?,?,?,?,?)}";
								// $params = array($IdPedidoInsertado,$Precio,$NoPlatillos,$TipoPlatillo,$Total,$FechaPedido,$Comentario,$Platillo);
								$params = array($IdPedidoInsertado,$Precio,$NoPlatillos,$TipoPlatillo,$Total,$FechaPedido,$Comentario,$Platillo,$Break,$envio_usuario);
								$stmt = sqlsrv_query($conn, $sql, $params);
								if ( $stmt === false) {
									$validar = false;
									$mensaje = sqlsrv_errors();
									$data = array(
										"estatus" => 'error_guardar_pedido_subsidiado',
										"Validar" => $validar,
										"mensaje" => $mensaje[0]['message']
									);
									echo json_encode($data);
									die();
								}

								sqlsrv_free_stmt( $stmt );
								sqlsrv_close($conn);
							}
						}
					}
				}
			}
			
			if ($validar) {
				$data = array(
					"estatus" => "success",
					"validar" => "true"
				);
			}else{
				$data = array(
					"estatus" => "error",
					"validar" => "false"
				);
			}
			ob_clean();//clears the output buffer
			echo json_encode($data);	
		break;
		case '3': //Listado
				$datos = array();
				$data = null;
				$query = array();
				include './db/conectar.php';
				$FechaListado = utf8_decode($_POST['FechaListado']);

				if ($FechaListado != "") {
					$sql = "{call RHCom_ListadoPedido(?)}";
					$params = array($FechaListado);
					$stmt = sqlsrv_query($conn, $sql, $params);
				}

				if (isset($stmt)) {
					if ( $stmt === false) {
						die( print_r( sqlsrv_errors(), true) );
					}	
		
					while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
						$record = array(
						
							"IdPedido" => $row['IdPedido'],
							"NoEmpleado" => $row['NoEmpleado'],
							"NombreEmpleado" => utf8_encode($row['NombreEmpleado']),
							"TipoPlatillo" => $row['TipoPlatillo'],
							"Ubicacion" => $row['Ubicacion'],
							"FechaPedido" => $row['FechaPedido'],
							"EstatusEnviado" => $row['EstatusEnviado'],
							"Platillo" => utf8_encode($row['Platillo']),
							"Comentarios" => utf8_encode($row['Comentarios']),
							"NoPlatillo" => $row['NoPlatillo'],
							"idComedorSub" => utf8_encode($row['idComedorSub']),
						
		
						);
						array_push($query, $record);
					}

					if (count($query) != 0){
						$data = array(
							"estatus" => "success",
							"data" => $query
						);
					}else{
						$data = array(
							"estatus" => 'error',
							"mensaje" => "no hay registros"
						);		
					}
					sqlsrv_free_stmt( $stmt);		
					sqlsrv_close($conn);
				}else{
					$data = array(
						"estatus" => 'error_fecha',
						"mensaje" => "no seleccionaste un rango de fechas valido"
					);	
				} 
				ob_clean();//clears the output buffer
				echo json_encode($data);
			break;
		case '4':
				$tipoplatillo = $_POST['tipoplatillo'];
				$ubicacion = $_POST['txtUbicacion'];
				$query = array();
				include './db/conectar.php';
				$sql = "{call RHCom_ObtenerPlatillos(?, ?)}";
				$params = array($tipoplatillo, $ubicacion);
				$stmt = sqlsrv_query($conn, $sql, $params);
				if ( $stmt === false) {
					die( print_r( sqlsrv_errors(), true) );
				}	
				while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
					
					$record = array(
						"IdComida"	=> $row['IdComida'],
						"Comida"	=> utf8_encode ($row['Comida'])
					);
					array_push($query, $record);
				}
				ob_clean();//clears the output buffer
				echo json_encode($query);
				sqlsrv_free_stmt( $stmt);	
			break;
		case '5':
				$InfoPlatillo = $_POST['InfoPlatillo'];
				$query = array();
				include './db/conectar.php';
				$sql = "{call RHCom_ObtenerInfoPlatillo(?)}";
				$params = array($InfoPlatillo);
				$stmt = sqlsrv_query($conn, $sql, $params);
				if ( $stmt === false) {
					die( print_r( sqlsrv_errors(), true) );
				}	
				while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
					
					$record = array(
						"Precio"	=> $row['Precio'],
						"Calorias"	=> utf8_encode ($row['Calorias'])!= null ? utf8_encode ($row['Calorias']):"",
						
					);
					array_push($query, $record);
				}
				ob_clean();//clears the output buffer
				echo json_encode($query);
				sqlsrv_free_stmt( $stmt);	
			break;
		case '6': //Consulta
				$username = $_POST['username'];
				$password = $_POST['password'];
				$query = array();
				$query2 = array();
				
				//
				include './db/conectar2.php';
				$sql = "{call RHMet_LoginEncuesta(?, ?)}";
				$params = array($username, $password);
				$stmt = sqlsrv_query($conn, $sql, $params);

				if ( $stmt === false) {
					die( print_r( sqlsrv_errors(), true) );
				}	

				while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
					$record = array(
						"valido" => $row['valido'],
					);
					array_push($query, $record);
				}
				if(count($query) > 0){
					session_start();
					$_SESSION['RHComedor'] =$username;
					$_SESSION['Hora_Session'] = date("Y-m-d H:i:s");
				
				}else{
					session_start();
					$_SESSION['RHComedor'] ="";
				
				}
				sqlsrv_free_stmt( $stmt);		
				sqlsrv_close($conn);
				/**/
				$record2 = array(
					"NoEmpleado" => $_SESSION['RHComedor']
				);
				//
				
				array_push($query2,$record2);
				ob_clean();//clears the output buffer
				echo json_encode($query2);
				/**/
	
			break;
		case '7': //Consulta
			session_start();
			session_unset();
			session_destroy();
			echo json_encode("true");
			break;	
		case '8': //Listado
			$datos = array();
			$data = null;
			$query = array();
			include './db/conectar.php';
			$FechaListado = utf8_decode($_POST['FechaListado']);

			if ($FechaListado != '') {
				$sql = "{call RHCom_ListadoPedidoGreenSpot(?)}";
				$params = array($FechaListado);
				$stmt = sqlsrv_query($conn, $sql, $params);	
			}

			if (isset($stmt)) {
				if ( $stmt === false) {
					die( print_r( sqlsrv_errors(), true) );
				}	
	
				while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
					$record = array(
						"NoEmpleado" => $row['NoEmpleado'],
						"NombreEmpleado" => utf8_encode($row['NombreEmpleado']),
						"TipoPlatillo" => $row['TipoPlatillo'],
						"Ubicacion" => $row['Ubicacion'],
						"FechaPedido" => $row['FechaPedido'],
						"EstatusEnviado" => $row['EstatusEnviado'],
						"Platillo" => utf8_encode($row['Platillo']),
						"Comentarios" => utf8_encode($row['Comentario']),
						"NoPlatillo" => $row['Cantidad'],
						"Kcal" =>utf8_encode($row['Kcal']),
						"Precio" => $row['Precio'],
						"total" => $row['total'],
						"IdPedido" => utf8_encode($row['IdPedido'])
					);
					array_push($query, $record);
				}

				if (count($query) != 0){
					$data = array(
						"estatus" => "success",
						"data" => $query
					);
				}else{
					$data = array(
						"estatus" => 'error',
						"mensaje" => "no hay registros"
					);	
						
				}
			}else{
				$data = array(
					"estatus" => 'error_fecha',
					"mensaje" => "no seleccionaste un rango de fechas valido"
				);	
			}
			ob_clean();//clears the output buffer
			echo json_encode($data); 
		break;
		case '9':
			$datos = array();
			$data = null;
			$query = array();
			include './db/conectar.php';
			$Fecha = utf8_decode($_POST['daterange']);
			$fecha_inicial = "";
			$fecha_final = "";
			$numero_empleado = isset($_POST['numero_empleado']) ? $_POST['numero_empleado'] : '' ;
			$ubicacion = $_POST['ubicacion'];
			if ($Fecha != '') {
				list($f_inicio, $f_final) = explode(" - ", $Fecha);//Extrae la fecha inicial y la fecha final en formato espa?ol
				list ($dia_inicio,$mes_inicio,$anio_inicio) = explode("/", $f_inicio);//Extrae fecha inicial 
				$fecha_inicial="$anio_inicio-$mes_inicio-$dia_inicio";//Fecha inicial formato ingles
				list($dia_fin,$mes_fin,$anio_fin) = explode("/",$f_final);//Extrae la fecha final
				$fecha_final = "$anio_fin-$mes_fin-$dia_fin";
			}

			if (($fecha_inicial != "" && $fecha_inicial != null) && ($fecha_final != "" && $fecha_final != null)) {
				$sql = "{call RHCom_ListadoPedidoSemanal(?, ?, ?, ?)}";
				$params = array($fecha_inicial, $fecha_final, $numero_empleado, $ubicacion);
				$stmt = sqlsrv_query($conn, $sql, $params);
			}

			if (isset($stmt)) {
				if ( $stmt === false) {
					die( print_r( sqlsrv_errors(), true) );
				}	

				while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
					$record = array(
						"id" => $row['id'],
						"IdPedido" => utf8_encode($row['IdPedido']),
						"NoEmpleado" => $row['NoEmpleado'],
						"NombreEmpleado" => utf8_encode($row['NombreEmpleado']),
						"TipoPlatillo" => $row['TipoPlatillo'],
						"Ubicacion" => $row['Ubicacion'],
						"FechaPedido" => $row['FechaPedido'],
						"EstatusEnviado" => $row['EstatusEnviado'],
						"EstatusComedor" => $row['EstatusComedor'],
						"Platillo" => utf8_encode($row['Platillo']),
						"Comentarios" => utf8_encode($row['Comentarios']),
						"NoPlatillo" => $row['NoPlatillo'],
						"idComedorSub" => utf8_encode($row['idComedorSub']),
						"Nombre_Platillo" => utf8_encode($row['Nombre_Platillo']),
						"Descripcion" => utf8_encode($row['Descripcion']),
						"PedidoUsuario" => utf8_encode($row['PedidoUsuario'])
					);
					array_push($query, $record);
				}

				if (count($query) != 0){
					$data = array(
						"estatus" => "success",
						"data" => $query
					);
				}else{
					if ($numero_empleado != '') {
						$data = array(
							"estatus" => 'error',
							"mensaje" => "El número de empleado no coincide con los registros"
						);
					}else {
						$data = array(
							"estatus" => 'error',
							"mensaje" => "no hay registros"
						);	
					}	
				}
			
				sqlsrv_free_stmt( $stmt);		
				sqlsrv_close($conn);
			}else{
				$data = array(
					"estatus" => 'error_fecha',
					"mensaje" => "no seleccionaste un rango de fechas valido"
				);	
			}
			ob_clean();//clears the output buffer 
			echo json_encode($data);
		break;
		case '10': //Listado
			$datos = array();
			$data = null;
			$query = array();
			include './db/conectar.php';
			$Fecha = utf8_decode($_POST['daterange']);
			$fecha_inicial = "";
			$fecha_final = "";
			$numero_empleado = isset($_POST['numero_empleado']) ? $_POST['numero_empleado'] : '' ;
			$ubicacion = $_POST['ubicacion'];
			if ($Fecha != '') {
				list($f_inicio, $f_final) = explode(" - ", $Fecha);//Extrae la fecha inicial y la fecha final en formato espa?ol
				list ($dia_inicio,$mes_inicio,$anio_inicio) = explode("/", $f_inicio);//Extrae fecha inicial 
				$fecha_inicial="$anio_inicio-$mes_inicio-$dia_inicio";//Fecha inicial formato ingles
				list($dia_fin,$mes_fin,$anio_fin) = explode("/",$f_final);//Extrae la fecha final
				$fecha_final = "$anio_fin-$mes_fin-$dia_fin";
			}

			if (($fecha_inicial != "" && $fecha_inicial != null) && ($fecha_final != "" && $fecha_final != null)) {
				$sql = "{call RHCom_ListadoPedidoGreenSpotSemanal(?, ?, ?, ?)}";
				$params = array($fecha_inicial, $fecha_final, $numero_empleado, $ubicacion);
				$stmt = sqlsrv_query($conn, $sql, $params);
			}
			
			if (isset($stmt)) {
				if ( $stmt === false) {
					die( print_r( sqlsrv_errors(), true) );
				}
				while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
					$record = array(
						"id" => $row['id'],
						"IdPedido" => utf8_encode($row['IdPedido']),
						"NoEmpleado" => $row['NoEmpleado'],
						"NombreEmpleado" => utf8_encode($row['NombreEmpleado']),
						"TipoPlatillo" => $row['TipoPlatillo'],
						"Ubicacion" => $row['Ubicacion'],
						"FechaPedido" => $row['FechaPedido'],
						"EstatusEnviado" => $row['EstatusEnviado'],
						"EstatusComedor" => $row['EstatusComedor'],
						"Platillo" => utf8_encode($row['Platillo']),
						"Comentarios" => utf8_encode($row['Comentario']),
						"NoPlatillo" => $row['Cantidad'],
						"Kcal" =>utf8_encode($row['Kcal']),
						"Precio" => $row['Precio'],
						"total" => $row['total'],
						"IdPedido" => utf8_encode($row['IdPedido']),
						"PedidoUsuario" => utf8_encode($row['PedidoUsuario'])
					);
					array_push($query, $record);
				}

				if (count($query) != 0){
					$data = array(
						"estatus" => "success",
						"data" => $query
					);
				}else{
					$data = array(
						"estatus" => 'error',
						"mensaje" => "no hay registros"
					);	
						
				}
		
				sqlsrv_free_stmt( $stmt);		
				sqlsrv_close($conn);
			}else{
				$data = array(
					"estatus" => 'error_fecha',
					"mensaje" => "no seleccionaste un rango de fechas valido"
				);	
			}
			ob_clean();//clears the output buffer
			echo json_encode($data);   
		break;
		case '11': 
			$data = array();
			$query = array();
			include './db/conectar.php';
			$id_conciliado = '';
			$datos = isset($_POST['datos']) ? json_decode($_POST['datos'], true) : '';
			$Fecha = isset($_POST['Fecha']) ? utf8_decode($_POST['Fecha']) : '';
			$fecha_inicial = "";
			$fecha_final = "";
			$estatus_enviado = isset($_POST['estatus_enviado']) ? $_POST['estatus_enviado'] : 0;
			$estatus_enviado_conciliado = isset($_POST['estatus_enviado_conciliado']) ? $_POST['estatus_enviado_conciliado'] : 0;
			$listado_procesadas = isset($_POST['listado_procesadas']) ? $_POST['listado_procesadas'] : 0;
			$numero_conciliado = isset($_POST['numero_conciliado']) ? $_POST['numero_conciliado'] : '';
			$numero_empleado = isset($_POST['numero_empleado']) ? $_POST['numero_empleado'] : 0;
			$sede_conciliar = isset($_POST['sede_conciliar']) ? $_POST['sede_conciliar'] : 'todos';
			$usuario_conectado = isset($_POST['usuario_conectado']) ? $_POST['usuario_conectado'] : '';
			$sede_todos = ''; 
			$sede_apodaca = ''; 
			$sede_casa_palmas = ''; 
			$sede_cdmx = ''; 
			$sede_cienega_flores = ''; 
			$sede_cienega_flores_dos = ''; 
			$sede_cienega_flores_fase_dos = ''; 
			$sede_depto_msrzl = ''; 
			$sede_logistica = ''; 
			$sede_milimex = ''; 
			$sede_obispado = '';
			$sede_palmas = ''; 
			$sede_queretaro = '';
			$sede_top = ''; 
			$sede_volkram = '';
			if ($sede_conciliar != 'todos') {
				$sede_conciliar = is_array($sede_conciliar) && 
				count($sede_conciliar) ? implode(",", $sede_conciliar) : $sede_conciliar;
				$sedes = explode(',', $sede_conciliar);
				foreach ($sedes as $sede) {
					$sede_todos = $sede == 'todos' ? $sede : $sede_todos; 
					$sede_apodaca = $sede == 'APODACA' ? $sede : $sede_apodaca; 
					$sede_casa_palmas = $sede == 'CASA PALMAS' ? $sede : $sede_casa_palmas; 
					$sede_cdmx = $sede == 'CDMX' ? $sede : $sede_cdmx; 
					$sede_cienega_flores = $sede == 'CIENEGA DE FLORES' ? $sede : $sede_cienega_flores;
					$sede_cienega_flores_dos = $sede == 'CIÉNEGA DE FLORES' ? $sede : $sede_cienega_flores_dos; 
					$sede_cienega_flores_fase_dos = $sede == 'CIÉNEGA DE FLORES - FASE II' ? $sede : $sede_cienega_flores_fase_dos;  
					$sede_depto_msrzl = $sede == 'DEPTO MSRZL' ? $sede : $sede_depto_msrzl; 
					$sede_logistica = $sede == 'LOGISTICA' ? $sede : $sede_logistica; 
					$sede_milimex = $sede == 'MILIMEX' ? $sede : $sede_milimex; 
					$sede_obispado = $sede == 'OBISPADO' ? $sede : $sede_obispado;
					$sede_palmas = $sede == 'PALMAS' ? $sede : $sede_palmas; 
					$sede_queretaro = $sede == 'QUERETARO' ? $sede : $sede_queretaro;
					$sede_top = $sede == 'T.OP' ? $sede : $sede_top;
					$sede_volkram = $sede == 'VOLKRAM' ? $sede : $sede_volkram;  
				}
			}else{
				$razon_todos = $razon_social_conciliar;
			}
			$validar = true;
			$mensaje;
			$contador = 0;
			$stmt = '';
			$stmt2 = '';

			if ($Fecha != '') {
				list($f_inicio, $f_final) = explode(" - ", $Fecha);//Extrae la fecha inicial y la fecha final en formato espa?ol
				list ($dia_inicio,$mes_inicio,$anio_inicio) = explode("/", $f_inicio);//Extrae fecha inicial 
				$fecha_inicial="$anio_inicio-$mes_inicio-$dia_inicio";//Fecha inicial formato ingles
				list($dia_fin,$mes_fin,$anio_fin) = explode("/",$f_final);//Extrae la fecha final
				$fecha_final = "$anio_fin-$mes_fin-$dia_fin";
			}

			if (($fecha_inicial != "" && $fecha_inicial != null) && ($fecha_final != "" && $fecha_final != null)) {
				$sql3 = "{call RHCom_Listar_Procesadas(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
				$params3 = array($fecha_inicial, $fecha_final, $estatus_enviado, $numero_conciliado, $numero_empleado, $sede_todos, $sede_apodaca, $sede_casa_palmas,
				$sede_cdmx, $sede_cienega_flores, $sede_cienega_flores_dos, $sede_cienega_flores_fase_dos, $sede_depto_msrzl, $sede_logistica, $sede_milimex, $sede_obispado, $sede_palmas, $sede_queretaro, $sede_top, $sede_volkram);
				$stmt3 = sqlsrv_query($conn, $sql3, $params3);

				if (isset($stmt3)) {
					if ( $stmt3 === false) {
						$data = array(
							"estatus" => 'error',
							"Mensaje" => sqlsrv_errors()
						);
						echo json_encode($data);	
					}
					while( $row3 = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_ASSOC) ) {
						$id_conciliacion = isset($row3['Id_Conciliacion']) ? $row3['Id_Conciliacion'] : '';
						$datos = array(
							"id" => $row3['id'],
							"IdPedido" => utf8_encode($row3['IdPedido']),
							"NoEmpleado" => $row3['NoEmpleado'],
							"NombreEmpleado" => utf8_encode($row3['NombreEmpleado']),
							"TipoPlatillo" => $row3['TipoPlatillo'],
							"Ubicacion" => $row3['Ubicacion'],
							"FechaPedido" => $row3['FechaPedido'],
							"EstatusEnviado" => $row3['EstatusEnviado'],
							"EstatusComedor" => $row3['EstatusComedor'],
							"Tipo_Empleado" => $row3['Tipo_Empleado'],
							"Platillo" => utf8_encode($row3['Platillo']),
							"Comentarios" => utf8_encode($row3['Comentarios']),
							"NoPlatillo" => $row3['NoPlatillo'],
							"idComedorSub" => utf8_encode($row3['idComedorSub']),
							"Precio" => $row3['Precio'],
							"Total" => $row3['Total'],
							"RangoFecha" => $row3['RangoFecha'],
							"Id_Conciliacion" => $id_conciliacion
						);
						array_push($query, $datos);
					}
	
					sqlsrv_free_stmt( $stmt3);
				}
			}
		
			$consulta = "{call RHCom_Obtener_IdConciliado()}";
			$exec = sqlsrv_query($conn, $consulta);

			if (isset($exec)) {
				if ( $exec === false) {
					$validar = false;
					$mensaje = sqlsrv_errors();
					$data = array(
						"estatus" => 'error',
						"Validar" => $validar,
						"mensaje" => $mensaje[0]['message']
					);
					echo json_encode($data);
					die();	
				}
				$row = sqlsrv_fetch_array( $exec, SQLSRV_FETCH_ASSOC);
				if ($row != NULL && $row != '') {
					$id_consecutivo = $row['Id_Conciliacion'] != NULL && $row['Id_Conciliacion'] != '' ? str_pad(substr($row['Id_Conciliacion'], 6) + 1, 6, '0', STR_PAD_LEFT) : '000001';
					$id_conciliado = $row['Id_Conciliacion'] != '' && $row['Id_Conciliacion'] != NULL ? 'RHCon-'.$id_consecutivo.'-'.$usuario_conectado : 'RHCon-'.$id_consecutivo.'-'.$usuario_conectado;
				}else{
					$id_conciliado = "RHCon-000001-".$usuario_conectado;
				}
			}

			if ($listado_procesadas == 0) {
				foreach ($datos as $dato) {
					if ($dato['EstatusComedor'] == 1 && $dato['EstatusEnviado'] == 0) {
						$sql = "{call RHCom_AcualizarEstatus(?, ?, ?)}";
						$IdPedido = $dato["IdPedido"];
						$params = array($IdPedido, $estatus_enviado, $Fecha);
						$stmt = sqlsrv_query($conn, $sql, $params);
	
						if ( $stmt === false) {
							$validar = false;
							$mensaje = sqlsrv_errors();
							$data = array(
								"estatus" => "error",
								"Validar" => $validar,
								"Mensaje" => $mensaje[0]['message']
							);
							echo json_encode($data);
						}
					}
				}
			}else{
				$estatus_enviado = $estatus_enviado_conciliado == 2 ? $estatus_enviado_conciliado : $estatus_enviado;
				foreach ($query as $dato) {
					if ($dato['EstatusComedor'] == 1 && $dato['EstatusEnviado'] == 1) {
						$sql = "{call RHCom_AcualizarEstatus(?, ?, ?)}";
						$IdPedido = $dato["IdPedido"];
						$params = array($IdPedido, $estatus_enviado, $dato["RangoFecha"]);
						$stmt = sqlsrv_query($conn, $sql, $params);
	
						if ( $stmt === false) {
							$validar = false;
							$mensaje = sqlsrv_errors();
							$data = array(
								"estatus" => "error",
								"Validar" => $validar,
								"Mensaje" => $mensaje[0]['message']
							);
							echo json_encode($data);
						}

						$consulta2 = "{call RHCom_Insertar_Con(?, ?, ?, ?, ?, ?, ?, ?)}";
						$id_pedido = $dato["IdPedido"];
						$no_empleado = $dato["NoEmpleado"];
						$total_platillos = $dato["NoPlatillo"];
						$total_pagar = $dato["Total"];
						$estatus = 0;
						$tipo_empleado = $dato["Tipo_Empleado"];
						$rango_fecha = $dato["RangoFecha"];
						
						$parametros = array($id_conciliado, $id_pedido, $no_empleado, $total_platillos, $total_pagar, $estatus, $tipo_empleado, $rango_fecha);
						$stmt2 = sqlsrv_query($conn, $consulta2, $parametros);

						if ($stmt2 === false) {
							$validar = false;
							$mensaje = sqlsrv_errors();
							$data = array(
								"estatus" => "error",
								"Validar" => $validar,
								"Mensaje" => $mensaje[0]['message']
							);
							echo json_encode($data);
						}
					}
					$contador++;
				}
				if ($stmt != '' && $stmt2 != '') {
					sqlsrv_free_stmt( $stmt );
					sqlsrv_free_stmt( $stmt2 );
				}else{
					$data = array(
						"estatus" => "error",
						"Validar" => $validar,
						"Mensaje" => 'ocurrio un error.'
					);
				}
				sqlsrv_free_stmt( $exec );
			}

			sqlsrv_close($conn);

			if ($validar) {
				$data = array(
					"estatus" => "success",
					"Validar" => $validar,
					"Contador" => $contador,
					"Datos" => $datos
				);
			}else{
				$data = array(
					"estatus" => "error",
					"Validar" => $validar,
					"Mensaje" => $mensaje[0]['message']
				);
			}
			ob_clean();//clears the output buffer
			echo json_encode($data); 
		break;
		case '12': 
			$query = array();
			$data = array();
			include './db/conectar.php';
			$id_pedido = $_POST['id_pedido'];
			$estatus_comedor = $_POST['estatus_comedor'];
			$validar = true;
			$mensaje;
			
			$sql = "{call RHCom_EstatusComedor(?,?)}";
			$params = array($id_pedido, $estatus_comedor);
			$stmt = sqlsrv_query($conn, $sql, $params);

			if ($stmt === false) {
				$validar = false;
				$mensaje = sqlsrv_errors();
			}

			sqlsrv_free_stmt( $stmt );
			sqlsrv_close($conn);
			
			if ($validar) {
				$data = array(
					"estatus" => "success",
					"Validar" => $validar
				);
			}else{
				$data = array(
					"estatus" => "error",
					"Validar" => $validar,
					"Mensaje" => $mensaje
				);
			}
			ob_clean();//clears the output buffer
			echo json_encode($data); 
		break;
		case '13':
			$datos = array();
			$data = null;
			$query = array();
			include './db/conectar.php';
			$Fecha = utf8_decode($_POST['daterange']);
			$fecha_inicial = "";
			$fecha_final = "";
			$estatus_enviado = isset($_POST['estatus_enviado']) ? $_POST['estatus_enviado'] : 1;
			$numero_conciliado = isset($_POST['numero_conciliado']) ? $_POST['numero_conciliado'] : '';
			$numero_empleado = isset($_POST['numero_empleado']) ? $_POST['numero_empleado'] : 0;
			$sede_plato_express = isset($_POST['sede_plato_express']) ? $_POST['sede_plato_express'] : 'todos';
			$sede_todos = ''; 
			$sede_apodaca = ''; 
			$sede_casa_palmas = ''; 
			$sede_cdmx = ''; 
			$sede_cienega_flores = '';
			$sede_cienega_flores_dos = ''; 
			$sede_cienega_flores_fase_dos = '';  
			$sede_depto_msrzl = ''; 
			$sede_logistica = ''; 
			$sede_milimex = ''; 
			$sede_obispado = '';
			$sede_palmas = ''; 
			$sede_queretaro = '';
			$sede_top = ''; 
			$sede_volkram = '';  

			if ($sede_plato_express != 'todos') {
				$sedes = explode(',', $sede_plato_express);
				foreach ($sedes as $sede) {
					$sede_todos = $sede == 'todos' ? $sede : $sede_todos; 
					$sede_apodaca = $sede == 'APODACA' ? $sede : $sede_apodaca; 
					$sede_casa_palmas = $sede == 'CASA PALMAS' ? $sede : $sede_casa_palmas; 
					$sede_cdmx = $sede == 'CDMX' ? $sede : $sede_cdmx; 
					$sede_cienega_flores = $sede == 'CIENEGA DE FLORES' ? $sede : $sede_cienega_flores;
					$sede_cienega_flores_dos = $sede == 'CIÉNEGA DE FLORES' ? $sede : $sede_cienega_flores_dos; 
					$sede_cienega_flores_fase_dos = $sede == 'CIÉNEGA DE FLORES - FASE II' ? $sede : $sede_cienega_flores_fase_dos;  
					$sede_depto_msrzl = $sede == 'DEPTO MSRZL' ? $sede : $sede_depto_msrzl; 
					$sede_logistica = $sede == 'LOGISTICA' ? $sede : $sede_logistica; 
					$sede_milimex = $sede == 'MILIMEX' ? $sede : $sede_milimex; 
					$sede_obispado = $sede == 'OBISPADO' ? $sede : $sede_obispado;
					$sede_palmas = $sede == 'PALMAS' ? $sede : $sede_palmas; 
					$sede_queretaro = $sede == 'QUERETARO' ? $sede : $sede_queretaro;
					$sede_top = $sede == 'T.OP' ? $sede : $sede_top;
					$sede_volkram = $sede == 'VOLKRAM' ? $sede : $sede_volkram;  
				}
			}else{
				$sede_todos = $sede_plato_express;
			}
			if ($Fecha != '') {
				list($f_inicio, $f_final) = explode(" - ", $Fecha);//Extrae la fecha inicial y la fecha final en formato espa?ol
				list ($dia_inicio,$mes_inicio,$anio_inicio) = explode("/", $f_inicio);//Extrae fecha inicial 
				list($dia_fin,$mes_fin,$anio_fin) = explode("/",$f_final);//Extrae la fecha final
				$fecha_inicial="$anio_inicio-$mes_inicio-$dia_inicio";//Fecha inicial formato ingles
				$fecha_final = "$anio_fin-$mes_fin-$dia_fin";
			}

			if (($fecha_inicial != "" && $fecha_inicial != null) && ($fecha_final != "" && $fecha_final != null)) {
				$sql = "{call RHCom_Listar_Procesadas(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
				$params = array($fecha_inicial, $fecha_final, $estatus_enviado, $numero_conciliado, $numero_empleado, $sede_todos, $sede_apodaca, $sede_casa_palmas,
				$sede_cdmx, $sede_cienega_flores, $sede_cienega_flores_dos, $sede_cienega_flores_fase_dos, $sede_depto_msrzl, $sede_logistica, $sede_milimex, $sede_obispado, $sede_palmas, $sede_queretaro, $sede_top, $sede_volkram);
				$stmt = sqlsrv_query($conn, $sql, $params);
			}

			if (isset($stmt)) {
				if ( $stmt === false) {
					$data = array(
						"estatus" => 'error',
						"Mensaje" => sqlsrv_errors()
					);
					echo json_encode($data);	
				}
				
				while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
					$id_conciliacion = isset($row['Id_Conciliacion']) ? $row['Id_Conciliacion'] : '';
					$datos = array(
						"id" => $row['id'],
						"IdPedido" => $row['IdPedido'],
						"NoEmpleado" => $row['NoEmpleado'],
						"NombreEmpleado" => utf8_encode($row['NombreEmpleado']),
						"TipoPlatillo" => $row['TipoPlatillo'],
						"Ubicacion" => $row['Ubicacion'],
						"FechaPedido" => $row['FechaPedido'],
						"EstatusEnviado" => $row['EstatusEnviado'],
						"EstatusComedor" => $row['EstatusComedor'],
						"Tipo_Empleado" => $row['Tipo_Empleado'],
						"Platillo" => utf8_encode($row['Platillo']),
						"Comentarios" => utf8_encode($row['Comentarios']),
						"NoPlatillo" => $row['NoPlatillo'],
						"idComedorSub" => utf8_encode($row['idComedorSub']),
						"Platillo" => utf8_encode($row['Platillo']),
						"Precio_Break" => $row['Precio_Break'],
						"Precio" => $row['Precio'],
						"Total" => $row['Total'],
						"Id_Conciliacion" => $id_conciliacion,
						"RangoFecha" => $row['RangoFecha']
					);
					array_push($query, $datos);
				}

				sqlsrv_free_stmt( $stmt);		
				sqlsrv_close($conn);

				if (count($query) != 0) {
					$data = array(
						"data" => $query,
						"estatus" => 'success'
					);	
				}else{
					if ($numero_empleado == '') {
						$data = array(
							"estatus" => 'error_vacio',
							"Mensaje" => 'No hay registros'
						);
					}else{
						$data = array(
							"estatus" => 'error_vacio',
							"Mensaje" => 'El número de empleado no coincide con los registros'
						);
					}
				}
			}else{
				$data = array(
					"estatus" => 'error_consulta',
					"Mensaje" => "Ops ocurrio un error"
				);	
			}
			ob_clean();//clears the output buffer
			echo json_encode($data);
		break;
		case '14':
			$datos = array();
			$data = null;
			$query = array();
			include './db/conectar.php';
			$Fecha = utf8_decode($_POST['daterange']);
			$fecha_inicial = "";
			$fecha_final = "";
			$estatus_enviado = isset($_POST['estatus_enviado']) ? $_POST['estatus_enviado'] : 1;
			$numero_conciliado = isset($_POST['numero_conciliado']) ? $_POST['numero_conciliado'] : '' ;
			$numero_empleado = isset($_POST['numero_empleado']) ? $_POST['numero_empleado'] : 0;
			$sede_green_spot = isset($_POST['sede_green_spot']) ? $_POST['sede_green_spot'] : 'todos';
			$sede_todos = ''; 
			$sede_apodaca = ''; 
			$sede_casa_palmas = ''; 
			$sede_cdmx = ''; 
			$sede_cienega_flores = '';
			$sede_cienega_flores_dos = ''; 
			$sede_cienega_flores_fase_dos = ''; 
			$sede_depto_msrzl = ''; 
			$sede_logistica = ''; 
			$sede_milimex = ''; 
			$sede_obispado = '';
			$sede_palmas = ''; 
			$sede_queretaro = '';
			$sede_top = ''; 
			$sede_volkram = '';

			if ($sede_green_spot != 'todos') {
				$sedes = explode(',', $sede_green_spot);
				foreach ($sedes as $sede) {
					$sede_todos = $sede == 'todos' ? $sede : $sede_todos; 
					$sede_apodaca = $sede == 'APODACA' ? $sede : $sede_apodaca; 
					$sede_casa_palmas = $sede == 'CASA PALMAS' ? $sede : $sede_casa_palmas; 
					$sede_cdmx = $sede == 'CDMX' ? $sede : $sede_cdmx; 
					$sede_cienega_flores = $sede == 'CIENEGA DE FLORES' ? $sede : $sede_cienega_flores;
					$sede_cienega_flores_dos = $sede == 'CIÉNEGA DE FLORES' ? $sede : $sede_cienega_flores_dos; 
					$sede_cienega_flores_fase_dos = $sede == 'CIÉNEGA DE FLORES - FASE II' ? $sede : $sede_cienega_flores_fase_dos; 
					$sede_depto_msrzl = $sede == 'DEPTO MSRZL' ? $sede : $sede_depto_msrzl; 
					$sede_logistica = $sede == 'LOGISTICA' ? $sede : $sede_logistica; 
					$sede_milimex = $sede == 'MILIMEX' ? $sede : $sede_milimex; 
					$sede_obispado = $sede == 'OBISPADO' ? $sede : $sede_obispado;
					$sede_palmas = $sede == 'PALMAS' ? $sede : $sede_palmas; 
					$sede_queretaro = $sede == 'QUERETARO' ? $sede : $sede_queretaro;
					$sede_top = $sede == 'T.OP' ? $sede : $sede_top;
					$sede_volkram = $sede == 'VOLKRAM' ? $sede : $sede_volkram;
				}
			}else{
				$sede_todos = $sede_green_spot;
			}
			if ($Fecha != '') {
				list($f_inicio, $f_final) = explode(" - ", $Fecha);//Extrae la fecha inicial y la fecha final en formato espa?ol
				list ($dia_inicio,$mes_inicio,$anio_inicio) = explode("/", $f_inicio);//Extrae fecha inicial 
				list($dia_fin,$mes_fin,$anio_fin) = explode("/",$f_final);//Extrae la fecha final
				$fecha_inicial="$anio_inicio-$mes_inicio-$dia_inicio";//Fecha inicial formato ingles
				$fecha_final = "$anio_fin-$mes_fin-$dia_fin";
			}

			if (($fecha_inicial != "" && $fecha_inicial != null) && ($fecha_final != "" && $fecha_final != null)) {
				$sql = "{call RHCom_Listar_Procesadas_Green_Spot(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
				$params = array($fecha_inicial, $fecha_final, $estatus_enviado, $numero_conciliado, $numero_empleado, $sede_todos, $sede_apodaca, $sede_casa_palmas,
				$sede_cdmx, $sede_cienega_flores, $sede_cienega_flores_dos, $sede_cienega_flores_fase_dos, $sede_depto_msrzl, $sede_logistica, $sede_milimex, $sede_obispado, $sede_palmas, $sede_queretaro, $sede_top, $sede_volkram);
				$stmt = sqlsrv_query($conn, $sql, $params);
			}

			if (isset($stmt)) {
				if ( $stmt === false) {
					$data = array(
						"estatus" => 'error',
						"mensaje" => sqlsrv_errors()
					);
					echo json_encode($data);	
				}
				
				while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
					$datos = array(
						"id" => $row['id'],
						"IdPedido" => $row['IdPedido'],
						"NoEmpleado" => $row['NoEmpleado'],
						"NombreEmpleado" => utf8_encode($row['NombreEmpleado']),
						"TipoPlatillo" => $row['TipoPlatillo'],
						"Ubicacion" => $row['Ubicacion'],
						"FechaPedido" => $row['FechaPedido'],
						"EstatusEnviado" => $row['EstatusEnviado'],
						"EstatusComedor" => $row['EstatusComedor'],
						"Tipo_Empleado" => $row['Tipo_Empleado'],
						"Platillo" => utf8_encode($row['Platillo']),
						"Comentarios" => utf8_encode($row['Comentario']),
						"NoPlatillo" => $row['Cantidad'],
						"Kcal" =>utf8_encode($row['Kcal']),
						"Precio" => $row['Precio'],
						"total" => $row['total'],
						"RangoFecha" => $row['RangoFecha'],
						"IdPedido" => utf8_encode($row['IdPedido'])
					);
					array_push($query, $datos);
				}

				sqlsrv_free_stmt( $stmt);		
				sqlsrv_close($conn);

				if (count($query) != 0) {
					$data = array(
						"data" => $query,
						"estatus" => 'success'
					);	
				}else{
					if ($numero_conciliado == '') {
						$data = array(
							"estatus" => 'error_vacio',
							"Mensaje" => 'No hay registros'
						);
					}else{
						$data = array(
							"estatus" => 'error_vacio',
							"Mensaje" => 'El id de conciliación no coincide con los registros'
						);
					}
				}
			}else{
				$data = array(
					"estatus" => 'error_consulta',
					"Mensaje" => "Ops ocurrio un error"
				);	
			}
			ob_clean();//clears the output buffer
			echo json_encode($data);
		break;
		case '15':
			$data = null;
			$query = array();
			include './db/conectar.php';
			$Fecha = utf8_decode($_POST['daterange']);
			$fecha_inicial = "";
			$fecha_final = "";
			$numero_empleado = isset($_POST['numero_empleado']) ? $_POST['numero_empleado'] : '';
			$mensaje = '';
			$row = '';

			if ($Fecha != '') {
				list($f_inicio, $f_final) = explode(" - ", $Fecha);//Extrae la fecha inicial y la fecha final en formato espa?ol
				list ($dia_inicio,$mes_inicio,$anio_inicio) = explode("/", $f_inicio);//Extrae fecha inicial 
				$fecha_inicial="$anio_inicio-$mes_inicio-$dia_inicio";//Fecha inicial formato ingles
				list($dia_fin,$mes_fin,$anio_fin) = explode("/",$f_final);//Extrae la fecha final
				$fecha_final = "$anio_fin-$mes_fin-$dia_fin";
			}

			if (($fecha_inicial != "" && $fecha_inicial != null) && ($fecha_final != "" && $fecha_final != null)) {
				$sql = "{call RHCom_validar_estatus_PE(?, ?, ?)}";
				$params = array($fecha_inicial, $fecha_final, $numero_empleado);
				$stmt = sqlsrv_query($conn, $sql, $params);
				$stmt2 = sqlsrv_query($conn, $sql, $params);
			}

			if (isset($stmt)) {
				if ( $stmt === false) {
					$mensaje = sqlsrv_errors();
					$data = array(
						"estatus" => 'error',
						"mensaje" => $mensaje[0]['mensaje']
					);
					echo json_encode($data);	
				}
				$validacion = sqlsrv_fetch_array( $stmt2, SQLSRV_FETCH_ASSOC);
				$row = $validacion == NULL ? array() : $validacion;
				if (count($row) != 0){
					while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
						$record = array(
							"id" => $row['id'],
							"IdPedido" => $row['IdPedido'],
							"NoEmpleado" => $row['NoEmpleado'],
							"NombreEmpleado" => utf8_encode($row['NombreEmpleado']),
							"TipoPlatillo" => $row['TipoPlatillo'],
							"Ubicacion" => $row['Ubicacion'],
							"FechaPedido" => $row['FechaPedido'],
							"EstatusEnviado" => $row['EstatusEnviado'],
							"EstatusComedor" => $row['EstatusComedor'],
							"Platillo" => utf8_encode($row['Platillo']),
							"Comentarios" => utf8_encode($row['Comentarios']),
							"NoPlatillo" => $row['NoPlatillo'],
							"idComedorSub" => utf8_encode($row['idComedorSub'])
						);
						array_push($query, $record);
					}

					$data = array(
						"estatus" => "success",
						"data" => $query
					);
				}else{
					$data = array(
						"estatus" => 'error',
						"mensaje" => "No hay registros con estatus comedor confirmado"
					);	
						
				}
			
				sqlsrv_free_stmt( $stmt);		
				sqlsrv_close($conn);
			}else{
				$data = array(
					"estatus" => 'error_fecha',
					"mensaje" => "no seleccionaste un rango de fechas valido"
				);	
			}
			ob_clean();//clears the output buffer 
			echo json_encode($data);
		break;
		case '16':
			$datos = array();
			$data = null;
			$query = array();
			include './db/conectar.php';
			$Fecha = utf8_decode($_POST['daterange']);
			$fecha_inicial = "";
			$fecha_final = "";
			$numero_empleado = isset($_POST['numero_empleado']) ? $_POST['numero_empleado'] : '' ;
			if ($Fecha != '') {
				list($f_inicio, $f_final) = explode(" - ", $Fecha);//Extrae la fecha inicial y la fecha final en formato espa?ol
				list ($dia_inicio,$mes_inicio,$anio_inicio) = explode("/", $f_inicio);//Extrae fecha inicial 
				$fecha_inicial="$anio_inicio-$mes_inicio-$dia_inicio";//Fecha inicial formato ingles
				list($dia_fin,$mes_fin,$anio_fin) = explode("/",$f_final);//Extrae la fecha final
				$fecha_final = "$anio_fin-$mes_fin-$dia_fin";
			}

			if (($fecha_inicial != "" && $fecha_inicial != null) && ($fecha_final != "" && $fecha_final != null)) {
				$sql = "{call RHCom_validar_estatus_Green_Spot_Semanal(?, ?, ?)}";
				$params = array($fecha_inicial, $fecha_final, $numero_empleado);
				$stmt = sqlsrv_query($conn, $sql, $params);
				$stmt2 = sqlsrv_query($conn, $sql, $params);
			}
			
			if (isset($stmt)) {
				if ( $stmt === false) {
					$mensaje = sqlsrv_errors();
					$data = array(
						"estatus" => 'error',
						"mensaje" => $mensaje[0]['mensaje']
					);
					echo json_encode($data);	
				}
				
				$row = sqlsrv_fetch_array( $stmt2, SQLSRV_FETCH_ASSOC);
				$row = $row == NULL ? array() : $row;
				
				if (count($row) != 0){
					while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
						$record = array(
							"id" => $row['id'],
							"IdPedido" => $row['IdPedido'],
							"NoEmpleado" => $row['NoEmpleado'],
							"NombreEmpleado" => utf8_encode($row['NombreEmpleado']),
							"TipoPlatillo" => $row['TipoPlatillo'],
							"Ubicacion" => $row['Ubicacion'],
							"FechaPedido" => $row['FechaPedido'],
							"EstatusEnviado" => $row['EstatusEnviado'],
							"EstatusComedor" => $row['EstatusComedor'],
							"Platillo" => utf8_encode($row['Platillo']),
							"Comentarios" => utf8_encode($row['Comentario']),
							"NoPlatillo" => $row['Cantidad'],
							"Kcal" =>utf8_encode($row['Kcal']),
							"Precio" => $row['Precio'],
							"total" => $row['total'],
							"IdPedido" => utf8_encode($row['IdPedido'])
						);
						array_push($query, $record);
					}
					$data = array(
						"estatus" => "success",
						"data" => $query
					);
				}else{
					$data = array(
						"estatus" => 'error',
						"mensaje" => "No hay registros con estatus comedor confirmado"
					);	
				}
		
				sqlsrv_free_stmt( $stmt);		
				sqlsrv_close($conn);
			}else{
				$data = array(
					"estatus" => 'error_fecha',
					"mensaje" => "no seleccionaste un rango de fechas valido"
				);	
			}
			ob_clean();//clears the output buffer
			echo json_encode($data);
		break;
		case '17':
			$datos = array();
			$data = null;
			$query = array();
			include './db/conectar.php';
			$Fecha = utf8_decode($_POST['daterange']);
			$fecha_inicial = "";
			$fecha_final = "";
			$numero_conciliado = isset($_POST['numero_conciliado']) ? $_POST['numero_conciliado'] : '' ;
			$tipo_comida = isset($_POST['tipo_comida']) ? $_POST['tipo_comida'] : 0;
			$sede_plato_express_conciliacion = isset($_POST['sede_plato_express_conciliacion']) ? $_POST['sede_plato_express_conciliacion'] : 'todos';
			$sede_todos = ''; 
			$sede_apodaca = ''; 
			$sede_casa_palmas = ''; 
			$sede_cdmx = ''; 
			$sede_cienega_flores = '';
			$sede_cienega_flores_dos = ''; 
			$sede_cienega_flores_fase_dos = '';  
			$sede_depto_msrzl = ''; 
			$sede_logistica = ''; 
			$sede_milimex = ''; 
			$sede_obispado = '';
			$sede_palmas = ''; 
			$sede_queretaro = '';
			$sede_top = ''; 
			$sede_volkram = ''; 

			if ($sede_plato_express_conciliacion != 'todos') {
				$sedes = explode(',', $sede_plato_express_conciliacion);
				foreach ($sedes as $sede) {
					$sede_todos = $sede == 'todos' ? $sede : $sede_todos; 
					$sede_apodaca = $sede == 'APODACA' ? $sede : $sede_apodaca; 
					$sede_casa_palmas = $sede == 'CASA PALMAS' ? $sede : $sede_casa_palmas; 
					$sede_cdmx = $sede == 'CDMX' ? $sede : $sede_cdmx; 
					$sede_cienega_flores = $sede == 'CIENEGA DE FLORES' ? $sede : $sede_cienega_flores;
					$sede_cienega_flores_dos = $sede == 'CIÉNEGA DE FLORES' ? $sede : $sede_cienega_flores_dos; 
					$sede_cienega_flores_fase_dos = $sede == 'CIÉNEGA DE FLORES - FASE II' ? $sede : $sede_cienega_flores_fase_dos;  
					$sede_depto_msrzl = $sede == 'DEPTO MSRZL' ? $sede : $sede_depto_msrzl; 
					$sede_logistica = $sede == 'LOGISTICA' ? $sede : $sede_logistica; 
					$sede_milimex = $sede == 'MILIMEX' ? $sede : $sede_milimex; 
					$sede_obispado = $sede == 'OBISPADO' ? $sede : $sede_obispado;
					$sede_palmas = $sede == 'PALMAS' ? $sede : $sede_palmas; 
					$sede_queretaro = $sede == 'QUERETARO' ? $sede : $sede_queretaro;
					$sede_top = $sede == 'T.OP' ? $sede : $sede_top;
					$sede_volkram = $sede == 'VOLKRAM' ? $sede : $sede_volkram;
				}
			}else{
				$sede_todos = $sede_plato_express_conciliacion;
			}
			if ($tipo_comida === 0) {
				$data = array(
					"estatus" => 'error',
					"mensaje" => "Ocurrio un error inesperado"
				);
				echo json_encode($data);	
			}

			if ($Fecha != '') {
				list($f_inicio, $f_final) = explode(" - ", $Fecha);//Extrae la fecha inicial y la fecha final en formato espa?ol
				list ($dia_inicio,$mes_inicio,$anio_inicio) = explode("/", $f_inicio);//Extrae fecha inicial 
				$fecha_inicial="$anio_inicio-$mes_inicio-$dia_inicio";//Fecha inicial formato ingles
				list($dia_fin,$mes_fin,$anio_fin) = explode("/",$f_final);//Extrae la fecha final
				$fecha_final = "$anio_fin-$mes_fin-$dia_fin";
			}

			if (($fecha_inicial != "" && $fecha_inicial != null) && ($fecha_final != "" && $fecha_final != null)) {
				$sql = "{call RHCom_Listar_Conciliadas(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
				$params = array($fecha_inicial, $fecha_final, $numero_conciliado, $tipo_comida, $sede_todos, $sede_apodaca, $sede_casa_palmas, $sede_cdmx, $sede_cienega_flores,
				$sede_cienega_flores_dos, $sede_cienega_flores_fase_dos, $sede_depto_msrzl, $sede_logistica, $sede_milimex, $sede_obispado, $sede_palmas, $sede_queretaro, $sede_top, 
				$sede_volkram);
				$stmt = sqlsrv_query($conn, $sql, $params);
			}

			if (isset($stmt)) {
				if ( $stmt === false) {
					$data = array(
						"estatus" => 'error',
						"mensaje" => sqlsrv_errors()
					);
					echo json_encode($data);	
				}
				while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
					$datos = array(
						"id" => $row['id'],
						"id_conciliacion" => $row['Id_Conciliacion'],
						"id_pedido" => $row['Id_Pedido'],
						"no_empleado" => $row['No_Empleado'],
						"total_platillos" => $row['Total_Platillos'],
						"total_pagar" => $row['Total_Pagar'],
						"fecha_conciliado" => $row['Fecha_Conciliado'],
						"estatus" => $row['Estatus'],
						"RangoFecha" => $row['RangoFecha']
					);
					array_push($query, $datos);
				}

				sqlsrv_free_stmt( $stmt);		
				sqlsrv_close($conn);

				if (count($query) != 0) {
					$data = array(
						"data" => $query,
						"estatus" => 'success'
					);	
				}else{
					if ($numero_conciliado == '') {
						$data = array(
							"estatus" => 'error_vacio',
							"Mensaje" => 'No hay platillos conciliados'
						);
					}else{
						$data = array(
							"estatus" => 'error_vacio',
							"Mensaje" => 'El id de conciliación no coincide con los registros'
						);
					}
				}
			}else{
				$data = array(
					"estatus" => 'error_consulta',
					"Mensaje" => "Ops ocurrio un error"
				);	
			}
			ob_clean();//clears the output buffer
			echo json_encode($data);
		break;
		case '18':
			$datos = array();
			$data = null;
			$query = array();
			include './db/conectar.php';
			$Fecha = utf8_decode($_POST['daterange']);
			$fecha_inicial = "";
			$fecha_final = "";
			$numero_conciliado = isset($_POST['numero_conciliado']) ? $_POST['numero_conciliado'] : '' ;
			if ($Fecha != '') {
				list($f_inicio, $f_final) = explode(" - ", $Fecha);//Extrae la fecha inicial y la fecha final en formato espa?ol
				list ($dia_inicio,$mes_inicio,$anio_inicio) = explode("/", $f_inicio);//Extrae fecha inicial 
				$fecha_inicial="$anio_inicio-$mes_inicio-$dia_inicio";//Fecha inicial formato ingles
				list($dia_fin,$mes_fin,$anio_fin) = explode("/",$f_final);//Extrae la fecha final
				$fecha_final = "$anio_fin-$mes_fin-$dia_fin";
			}

			if (($fecha_inicial != "" && $fecha_inicial != null) && ($fecha_final != "" && $fecha_final != null)) {
				$sql = "{call RHCom_Listar_Detalle_Conciliadas(?, ?, ?)}";
				$params = array($fecha_inicial, $fecha_final, $numero_conciliado);
				$stmt = sqlsrv_query($conn, $sql, $params);
			}

			if (isset($stmt)) {
				if ( $stmt === false) {
					$data = array(
						"estatus" => 'error',
						"mensaje" => sqlsrv_errors()
					);
					echo json_encode($data);	
				}
				while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
					$datos = array(
						"id" => $row['id'],
						"IdPedido" => $row['IdPedido'],
						"NoEmpleado" => $row['NoEmpleado'],
						"NombreEmpleado" => utf8_encode($row['NombreEmpleado']),
						"TipoPlatillo" => $row['TipoPlatillo'],
						"Ubicacion" => $row['Ubicacion'],
						"FechaPedido" => $row['FechaPedido'],
						"EstatusEnviado" => $row['EstatusEnviado'],
						"EstatusComedor" => $row['EstatusComedor'],
						"Tipo_Empleado" => $row['Tipo_Empleado'],
						"Platillo" => utf8_encode($row['Platillo']),
						"Comentarios" => utf8_encode($row['Comentarios']),
						"NoPlatillo" => $row['NoPlatillo'],
						"idComedorSub" => utf8_encode($row['idComedorSub']),
						"Precio" => $row['Precio'],
						"Total" => $row['Total']
					);
					array_push($query, $datos);
				}

				sqlsrv_free_stmt( $stmt);		
				sqlsrv_close($conn);

				if (count($query) != 0) {
					$data = array(
						"data" => $query,
						"estatus" => 'success'
					);	
				}else{
					$data = array(
						"estatus" => 'error_vacio',
						"Mensaje" => 'No hay registros de platillos pendientes por procesar'
					);
				}
			}else{
				$data = array(
					"estatus" => 'error_consulta',
					"Mensaje" => "Ops ocurrio un error"
				);	
			}
			ob_clean();//clears the output buffer
			echo json_encode($data);
		break;
		case '19':
			$datos = array();
			$data = null;
			$query = array();
			include './db/conectar.php';
			$Fecha = utf8_decode($_POST['daterange']);
			$fecha_inicial = "";
			$fecha_final = "";
			$numero_conciliado = isset($_POST['numero_conciliado']) ? $_POST['numero_conciliado'] : '' ;
			if ($Fecha != '') {
				list($f_inicio, $f_final) = explode(" - ", $Fecha);//Extrae la fecha inicial y la fecha final en formato espa?ol
				list ($dia_inicio,$mes_inicio,$anio_inicio) = explode("/", $f_inicio);//Extrae fecha inicial 
				$fecha_inicial="$anio_inicio-$mes_inicio-$dia_inicio";//Fecha inicial formato ingles
				list($dia_fin,$mes_fin,$anio_fin) = explode("/",$f_final);//Extrae la fecha final
				$fecha_final = "$anio_fin-$mes_fin-$dia_fin";
			}

			if (($fecha_inicial != "" && $fecha_inicial != null) && ($fecha_final != "" && $fecha_final != null)) {
				$sql = "{call RHCom_Listar_Detalle_Conciliadas_Green_Spot(?, ?, ?)}";
				$params = array($fecha_inicial, $fecha_final, $numero_conciliado);
				$stmt = sqlsrv_query($conn, $sql, $params);
			}

			if (isset($stmt)) {
				if ( $stmt === false) {
					$data = array(
						"estatus" => 'error',
						"mensaje" => sqlsrv_errors()
					);
					echo json_encode($data);	
				}
				
				while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
					$datos = array(
						"id" => $row['id'],
						"IdPedido" => $row['IdPedido'],
						"NoEmpleado" => $row['NoEmpleado'],
						"NombreEmpleado" => utf8_encode($row['NombreEmpleado']),
						"TipoPlatillo" => $row['TipoPlatillo'],
						"Ubicacion" => $row['Ubicacion'],
						"FechaPedido" => $row['FechaPedido'],
						"EstatusEnviado" => $row['EstatusEnviado'],
						"EstatusComedor" => $row['EstatusComedor'],
						"Tipo_Empleado" => $row['Tipo_Empleado'],
						"Platillo" => utf8_encode($row['Platillo']),
						"Comentarios" => utf8_encode($row['Comentario']),
						"NoPlatillo" => $row['Cantidad'],
						"Kcal" =>utf8_encode($row['Kcal']),
						"Precio" => $row['Precio'],
						"total" => $row['total'],
						"IdPedido" => utf8_encode($row['IdPedido'])
					);
					array_push($query, $datos);
				}

				sqlsrv_free_stmt( $stmt);		
				sqlsrv_close($conn);

				if (count($query) != 0) {
					$data = array(
						"data" => $query,
						"estatus" => 'success'
					);	
				}else{
					$data = array(
						"estatus" => 'error_vacio',
						"Mensaje" => 'No hay registros de platillos pendientes por procesar'
					);
				}
			}else{
				$data = array(
					"estatus" => 'error_consulta',
					"Mensaje" => "Ops ocurrio un error"
				);	
			}
			ob_clean();//clears the output buffer
			echo json_encode($data);
		break;
		case '20':
			$data = array();
			$query = array();
			include './db/conectar.php';
			$id_conciliado = '';
			$Fecha = isset($_POST['Fecha']) ? utf8_decode($_POST['Fecha']) : '';
			$fecha_inicial = "";
			$fecha_final = "";
			$datos = isset($_POST['datos']) ? json_decode($_POST['datos'], true) : '';
			$estatus_enviado = isset($_POST['estatus_enviado']) ? $_POST['estatus_enviado'] : 0;
			$estatus_enviado_conciliado = isset($_POST['estatus_enviado_conciliado']) ? $_POST['estatus_enviado_conciliado'] : 0;
			$listado_procesadas = isset($_POST['listado_procesadas']) ? $_POST['listado_procesadas'] : 0;
			$suma_platillos = isset($_POST['suma_platillos']) ? $_POST['suma_platillos'] : 0;
			$total_pagar = isset($_POST['total_pagar']) ? $_POST['total_pagar'] : 0;
			$numero_conciliado = isset($_POST['numero_conciliado']) ? $_POST['numero_conciliado'] : '' ;
			$numero_empleado = isset($_POST['numero_empleado']) ? $_POST['numero_empleado'] : 0;
			$sede_green_spot = isset($_POST['sede_green_spot']) ? $_POST['sede_green_spot'] : 'todos';
			$usuario_conectado = isset($_POST['usuario_conectado']) ? $_POST['usuario_conectado'] : '';
			$sede_todos = ''; 
			$sede_apodaca = ''; 
			$sede_casa_palmas = ''; 
			$sede_cdmx = ''; 
			$sede_cienega_flores = '';
			$sede_cienega_flores_dos = ''; 
			$sede_cienega_flores_fase_dos = '';  
			$sede_depto_msrzl = ''; 
			$sede_logistica = ''; 
			$sede_milimex = ''; 
			$sede_obispado = '';
			$sede_palmas = ''; 
			$sede_queretaro = '';
			$sede_top = ''; 
			$sede_volkram = '';
			$validar = true;
			$mensaje;
			$contador = 0;
			$stmt = '';
			$stmt2 = '';

			if ($sede_green_spot != 'todos') {
				$sedes = explode(',', $sede_green_spot);
				foreach ($sedes as $sede) {
					$sede_todos = $sede == 'todos' ? $sede : $sede_todos; 
					$sede_apodaca = $sede == 'APODACA' ? $sede : $sede_apodaca; 
					$sede_casa_palmas = $sede == 'CASA PALMAS' ? $sede : $sede_casa_palmas; 
					$sede_cdmx = $sede == 'CDMX' ? $sede : $sede_cdmx; 
					$sede_cienega_flores = $sede == 'CIENEGA DE FLORES' ? $sede : $sede_cienega_flores;
					$sede_cienega_flores_dos = $sede == 'CIÉNEGA DE FLORES' ? $sede : $sede_cienega_flores_dos; 
					$sede_cienega_flores_fase_dos = $sede == 'CIÉNEGA DE FLORES - FASE II' ? $sede : $sede_cienega_flores_fase_dos;  
					$sede_depto_msrzl = $sede == 'DEPTO MSRZL' ? $sede : $sede_depto_msrzl; 
					$sede_logistica = $sede == 'LOGISTICA' ? $sede : $sede_logistica; 
					$sede_milimex = $sede == 'MILIMEX' ? $sede : $sede_milimex; 
					$sede_obispado = $sede == 'OBISPADO' ? $sede : $sede_obispado;
					$sede_palmas = $sede == 'PALMAS' ? $sede : $sede_palmas; 
					$sede_queretaro = $sede == 'QUERETARO' ? $sede : $sede_queretaro;
					$sede_top = $sede == 'T.OP' ? $sede : $sede_top;
					$sede_volkram = $sede == 'VOLKRAM' ? $sede : $sede_volkram;
				}
			}else{
				$sede_todos = $sede_green_spot;
			}

			if ($Fecha != '') {
				list($f_inicio, $f_final) = explode(" - ", $Fecha);//Extrae la fecha inicial y la fecha final en formato espa?ol
				list ($dia_inicio,$mes_inicio,$anio_inicio) = explode("/", $f_inicio);//Extrae fecha inicial 
				$fecha_inicial="$anio_inicio-$mes_inicio-$dia_inicio";//Fecha inicial formato ingles
				list($dia_fin,$mes_fin,$anio_fin) = explode("/",$f_final);//Extrae la fecha final
				$fecha_final = "$anio_fin-$mes_fin-$dia_fin";
			}

			if (($fecha_inicial != "" && $fecha_inicial != null) && ($fecha_final != "" && $fecha_final != null)) {
				$sql3 = "{call RHCom_Listar_Procesadas_Green_Spot(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)}";
				$params3 = array($fecha_inicial, $fecha_final, $estatus_enviado, $numero_conciliado, $numero_empleado, $sede_todos, $sede_apodaca, 
				$sede_casa_palmas, $sede_cdmx, $sede_cienega_flores, $sede_cienega_flores_dos, $sede_cienega_flores_fase_dos, $sede_depto_msrzl, $sede_logistica, $sede_milimex, 
				$sede_obispado, $sede_palmas, $sede_queretaro, $sede_top, $sede_volkram);
				$stmt3 = sqlsrv_query($conn, $sql3, $params3);
			}

			if (isset($stmt3)) {
				if ( $stmt3 === false) {
					$data = array(
						"estatus" => 'error',
						"mensaje" => sqlsrv_errors()
					);
					echo json_encode($data);	
				}
				
				while( $row3 = sqlsrv_fetch_array( $stmt3, SQLSRV_FETCH_ASSOC) ) {
					$datos = array(
						"id" => $row3['id'],
						"IdPedido" => $row3['IdPedido'],
						"NoEmpleado" => $row3['NoEmpleado'],
						"NombreEmpleado" => utf8_encode($row3['NombreEmpleado']),
						"TipoPlatillo" => $row3['TipoPlatillo'],
						"Ubicacion" => $row3['Ubicacion'],
						"FechaPedido" => $row3['FechaPedido'],
						"EstatusEnviado" => $row3['EstatusEnviado'],
						"EstatusComedor" => $row3['EstatusComedor'],
						"Tipo_Empleado" => $row3['Tipo_Empleado'],
						"Platillo" => utf8_encode($row3['Platillo']),
						"Comentarios" => utf8_encode($row3['Comentario']),
						"NoPlatillo" => $row3['Cantidad'],
						"Kcal" =>utf8_encode($row3['Kcal']),
						"Precio" => $row3['Precio'],
						"total" => $row3['total'],
						"RangoFecha" => $row3['RangoFecha'],
						"IdPedido" => utf8_encode($row3['IdPedido'])
					);
					array_push($query, $datos);
				}
				sqlsrv_free_stmt($stmt3);
			}

			$consulta = "{call RHCom_Obtener_IdConciliado()}";
			$exec = sqlsrv_query($conn, $consulta);

			if (isset($exec)) {
				if ( $exec === false) {
					$validar = false;
					$mensaje = sqlsrv_errors();
					$data = array(
						"estatus" => 'error',
						"Validar" => $validar,
						"mensaje" => $mensaje[0]['message']
					);
					echo json_encode($data);
					die();	
				}
				$row = sqlsrv_fetch_array( $exec, SQLSRV_FETCH_ASSOC);
				$row = $row != NULL ? $row : array();
				if (count($row) != 0) {
					$id_consecutivo = $row['Id_Conciliacion'] != NULL && $row['Id_Conciliacion'] != '' ? str_pad(substr($row['Id_Conciliacion'], 6) + 1, 6, '0', STR_PAD_LEFT) : '000001';
					$id_conciliado = $row['Id_Conciliacion'] != '' && $row['Id_Conciliacion'] != NULL ? 'RHCon-'.$id_consecutivo.'-'.$usuario_conectado : 'RHCon-'.$id_consecutivo.'-'.$usuario_conectado;
				}else{
					$id_conciliado = "RHCon-000001-".$usuario_conectado;
				}
			}

			if ($listado_procesadas == 0) {
				foreach ($datos['data'] as $dato) {
					if ($dato['EstatusComedor'] != 0) {
						$sql = "{call RHCom_AcualizarEstatus(?, ?)}";
						$IdPedido = $dato["IdPedido"];
						$params = array($IdPedido, $estatus_enviado);
						$stmt = sqlsrv_query($conn, $sql, $params);
	
						if ( $stmt === false) {
							$validar = false;
							$mensaje = sqlsrv_errors();
						}
					}
				}
			}else{
				$estatus_enviado = $estatus_enviado_conciliado == 2 ? $estatus_enviado_conciliado : $estatus_enviado;
				foreach ($query as $dato) {
					if ($dato['EstatusComedor'] == 1 && $dato['EstatusEnviado'] == 1) {
						$sql = "{call RHCom_AcualizarEstatus(?, ?, ?)}";
						$IdPedido = $dato["IdPedido"];
						$params = array($IdPedido, $estatus_enviado, $dato["RangoFecha"]);
						$stmt = sqlsrv_query($conn, $sql, $params);
	
						if ( $stmt === false) {
							$validar = false;
							$mensaje = sqlsrv_errors();
						}

						$consulta2 = "{call RHCom_Insertar_Con(?, ?, ?, ?, ?, ?, ?, ?)}";
						$id_pedido = $dato["IdPedido"];
						$no_empleado = $dato["NoEmpleado"];
						$total_platillos = $dato["NoPlatillo"];
						$total_pagar = $dato["total"];
						$estatus = 0;
						$tipo_empleado = $dato["Tipo_Empleado"];
						$rango_fecha = $dato["RangoFecha"];
						
						$parametros = array($id_conciliado, $id_pedido, $no_empleado, $total_platillos, $total_pagar, $estatus, $tipo_empleado, $rango_fecha);
						$stmt2 = sqlsrv_query($conn, $consulta2, $parametros);

						if ($stmt2 === false) {
							$validar = false;
							$mensaje = sqlsrv_errors();
						}
					}
					$contador++;
				}
				if ($stmt != '' && $stmt2 != '') {
					sqlsrv_free_stmt( $stmt );
					sqlsrv_free_stmt( $stmt2 );
				}else{
					$data = array(
						"estatus" => "error",
						"Validar" => $validar,
						"Mensaje" => 'ocurrio un error.'
					);
				}
			}

			sqlsrv_free_stmt( $exec );
			sqlsrv_close($conn);
			
			if ($validar) {
				$data = array(
					"estatus" => "success",
					"Validar" => $validar,
					"contador" => $contador,
					"Datos" => $datos
				);
			}else{
				$data = array(
					"estatus" => "error",
					"Validar" => $validar,
					"Mensaje" => $mensaje[0]['mensaje']
				);
			}
			ob_clean();//clears the output buffer
			echo json_encode($data); 
		break;
		case '21':
			$data = null;
			include './db/conectar.php';
			$datos = isset($_POST['datos']) ? $_POST['datos'] : array();
			$mensaje = '';
			$validar = true;
			
			if(count($datos) != 0) {
				foreach ($datos as $dato) {
					$id_conciliado = $dato['id_conciliacion'];
					$fecha_conciliado = $dato['fecha_conciliado'];
					$sql = "{call RHCom_Finalizar_Procesadas(?, ?)}";
					$params = array($fecha_conciliado, $id_conciliado);
					$stmt = sqlsrv_query($conn, $sql, $params);

					if ($stmt === false) {
						$Validar = false;
						$mensaje = sqlsrv_errors();
						$data = array(
							"estatus" => 'error',
							"mensaje" => $mensaje[0]['message']
						);
						echo json_encode($data);	
					}
				}
			}

			sqlsrv_free_stmt( $stmt );
			sqlsrv_close($conn);

			if ($validar) {
				$data = array(
					"estatus" => "success",
					"Validar" => $validar
				);
			}else{
				$data = array(
					"estatus" => "error",
					"Validar" => $validar,
					"Mensaje" => $mensaje[0]['message']
				);
			}
			ob_clean();//clears the output buffer
			echo json_encode($data);
		break;
		case '22':
			$datos = array();
			$data = null;
			$query = array();
			include './db/conectar.php';
			$Fecha = utf8_decode($_POST['daterange']);
			$fecha_inicial = "";
			$fecha_final = "";
			$numero_conciliado = isset($_POST['numero_conciliado']) ? $_POST['numero_conciliado'] : '' ;

			if ($Fecha != '') {
				list($f_inicio, $f_final) = explode(" - ", $Fecha);//Extrae la fecha inicial y la fecha final en formato espa?ol
				list ($dia_inicio,$mes_inicio,$anio_inicio) = explode("/", $f_inicio);//Extrae fecha inicial 
				$fecha_inicial="$anio_inicio-$mes_inicio-$dia_inicio";//Fecha inicial formato ingles
				list($dia_fin,$mes_fin,$anio_fin) = explode("/",$f_final);//Extrae la fecha final
				$fecha_final = "$anio_fin-$mes_fin-$dia_fin";
			}

			if (($fecha_inicial != "" && $fecha_inicial != null) && ($fecha_final != "" && $fecha_final != null)) {
				$sql = "{call RHCom_Listar_Finalizados(?, ?, ?)}";
				$params = array($fecha_inicial, $fecha_final, $numero_conciliado);
				$stmt = sqlsrv_query($conn, $sql, $params);
			}

			if (isset($stmt)) {
				if ( $stmt === false) {
					$data = array(
						"estatus" => 'error',
						"mensaje" => sqlsrv_errors()
					);
					echo json_encode($data);	
				}
				
				while($row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
					$datos = array(
						"id" => $row['id'],
						"id_conciliacion" => $row['Id_Conciliacion'],
						"id_pedido" => $row['Id_Pedido'],
						"no_empleado" => $row['No_Empleado'],
						"total_platillos" => $row['Total_Platillos'],
						"total_pagar" => $row['Total_Pagar'],
						"fecha_conciliado" => $row['Fecha_Conciliado'],
						"estatus" => $row['Estatus']
					);
					array_push($query, $datos);
				}

				sqlsrv_free_stmt( $stmt);		
				sqlsrv_close($conn);

				if (count($query) != 0) {
					$data = array(
						"data" => $query,
						"estatus" => 'success'
					);	
				}else{
					$data = array(
						"estatus" => 'error_vacio',
						"Mensaje" => 'No hay platillos Finalizados'
					);
				}
			}else{
				$data = array(
					"estatus" => 'error_consulta',
					"Mensaje" => "Ops ocurrio un error"
				);	
			}
			ob_clean();//clears the output buffer
			echo json_encode($data);
		break;
		case '23':
			$datos = array();
			$data = null;
			$query = array();
			include './db/conectar.php';
			$Fecha = utf8_decode($_POST['daterange']);
			$fecha_inicial = "";
			$fecha_final = "";
			$numero_conciliado = isset($_POST['numero_conciliado']) ? $_POST['numero_conciliado'] : '' ;
			$numero_empleado = isset($_POST['numero_empleado']) ? $_POST['numero_empleado'] : 0;
			
			if ($Fecha != '') {
				list($f_inicio, $f_final) = explode(" - ", $Fecha);//Extrae la fecha inicial y la fecha final en formato espa?ol
				list ($dia_inicio,$mes_inicio,$anio_inicio) = explode("/", $f_inicio);//Extrae fecha inicial 
				$fecha_inicial="$anio_inicio-$mes_inicio-$dia_inicio";//Fecha inicial formato ingles
				list($dia_fin,$mes_fin,$anio_fin) = explode("/",$f_final);//Extrae la fecha final
				$fecha_final = "$anio_fin-$mes_fin-$dia_fin";
			}

			if (($fecha_inicial != "" && $fecha_inicial != null) && ($fecha_final != "" && $fecha_final != null)) {
				$sql = "{call RHCom_Listar_Detalle_Conciliadas_Finalizados(?, ?, ?, ?)}";
				$params = array($fecha_inicial, $fecha_final, $numero_conciliado, $numero_empleado);
				$stmt = sqlsrv_query($conn, $sql, $params);
				$consulta = "{call RHCom_Listar_Detalle_Green_Conciliadas_Finalizados(?, ?, ?, ?)}";
				$parametros = array($fecha_inicial, $fecha_final, $numero_conciliado, $numero_empleado);
				$stmt2 = sqlsrv_query($conn, $consulta, $parametros);
			}

			if (isset($stmt) && isset($stmt2)) {
				$row = 1;
				$row2 = 1;
				if ($stmt === false && $stmt2 === false) {
					$row = 0;
					$row2 = 0;
					$data = array(
						"estatus" => 'error',
						"mensaje" => sqlsrv_errors()
					);
					echo json_encode($data);	
				}
				
				if ($row != 0) {
					while($row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC)) {
						$datos = array(
							"id" => $row['id'],
							"IdPedido" => utf8_encode($row['IdPedido']),
							"NoEmpleado" => $row['NoEmpleado'],
							"NombreEmpleado" => utf8_encode($row['NombreEmpleado']),
							"TipoPlatillo" => $row['TipoPlatillo'],
							"Ubicacion" => $row['Ubicacion'],
							"FechaPedido" => $row['FechaPedido'],
							"EstatusEnviado" => $row['EstatusEnviado'],
							"EstatusComedor" => $row['EstatusComedor'],
							"Tipo_Empleado" => $row['Tipo_Empleado'],
							"Platillo" => utf8_encode($row['Platillo']),
							"Comentarios" => utf8_encode($row['Comentarios']),
							"NoPlatillo" => $row['NoPlatillo'],
							"idComedorSub" => utf8_encode($row['idComedorSub']),
							"Precio" => $row['Precio'],
							"Total" => $row['Total'],
							"Tipo_comida" => 1,
						);
						array_push($query, $datos);
					}
				}

				

				if ($row2 != 0) {
					while($row2 = sqlsrv_fetch_array($stmt2, SQLSRV_FETCH_ASSOC)) {
						$datos = array(
							"id" => $row2['id'],
							"IdPedido" => utf8_encode($row2['IdPedido']),
							"NoEmpleado" => $row2['NoEmpleado'],
							"NombreEmpleado" => utf8_encode($row2['NombreEmpleado']),
							"TipoPlatillo" => $row2['TipoPlatillo'],
							"Ubicacion" => $row2['Ubicacion'],
							"FechaPedido" => $row2['FechaPedido'],
							"EstatusEnviado" => $row2['EstatusEnviado'],
							"EstatusComedor" => $row2['EstatusComedor'],
							"Tipo_Empleado" => $row2['Tipo_Empleado'],
							"Platillo" => utf8_encode($row2['Platillo']),
							"Comentarios" => utf8_encode($row2['Comentario']),
							"NoPlatillo" => $row2['Cantidad'],
							"Kcal" =>utf8_encode($row2['Kcal']),
							"Precio" => $row2['Precio'],
							"Total" => $row2['total'],
							"IdPedido" => utf8_encode($row2['IdPedido']),
							"Tipo_comida" => 2,
						);
						array_push($query, $datos);
					}
				}

				sqlsrv_free_stmt($stmt);
				sqlsrv_free_stmt($stmt2);		
				sqlsrv_close($conn);
				if (count($query) != 0) {
					$data = array(
						"data" => $query,
						"estatus" => 'success'
					);	
				}else{
					$data = array(
						"estatus" => 'error_vacio',
						"Mensaje" => 'No hay registros de platillos pendientes por procesar'
					);
				}
			}else{
				$data = array(
					"estatus" => 'error_consulta',
					"Mensaje" => "Ops ocurrio un error"
				);	
			}
			ob_clean();//clears the output buffer
			echo json_encode($data);
		break;
		case '24':
			$datos = array();
			$data = null;
			$query = array();
			include './db/conectar.php';
			$Fecha = utf8_decode($_POST['daterange']);
			$fecha_inicial = "";
			$fecha_final = "";
			$numero_conciliado = isset($_POST['numero_conciliado']) ? $_POST['numero_conciliado'] : '' ;
			$numero_empleado = isset($_POST['numero_empleado']) ? $_POST['numero_empleado'] : 0;
			$tipo_comida = isset($_POST['tipo_comida']) ? $_POST['tipo_comida'] : 0;

			if ($numero_empleado == 0 && $numero_conciliado == '' && $tipo_comida == 0) {
				$data = array(
					"estatus" => 'error_vacio',
					"Mensaje" => 'Falta información proporcionada'
				);
				echo json_encode($data);
				die();
			}

			if ($Fecha != '') {
				list($f_inicio, $f_final) = explode(" - ", $Fecha);//Extrae la fecha inicial y la fecha final en formato espa?ol
				list ($dia_inicio,$mes_inicio,$anio_inicio) = explode("/", $f_inicio);//Extrae fecha inicial 
				$fecha_inicial="$anio_inicio-$mes_inicio-$dia_inicio";//Fecha inicial formato ingles
				list($dia_fin,$mes_fin,$anio_fin) = explode("/",$f_final);//Extrae la fecha final
				$fecha_final = "$anio_fin-$mes_fin-$dia_fin";
			}

			if (($fecha_inicial != "" && $fecha_inicial != null) && ($fecha_final != "" && $fecha_final != null)) {
				$sql = "{call RHCom_Listar_Segundo_Detalle(?, ?, ?, ?, ?)}";
				$params = array($fecha_inicial, $fecha_final, $numero_conciliado, $numero_empleado, $tipo_comida);
				$stmt = sqlsrv_query($conn, $sql, $params);
			}

			if (isset($stmt)) {
				if ( $stmt === false) {
					$data = array(
						"estatus" => 'error',
						"mensaje" => sqlsrv_errors()
					);
					echo json_encode($data);	
				}

				if ($tipo_comida == 1) {
					while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
						$id_conciliacion = isset($row['Id_Conciliacion']) ? $row['Id_Conciliacion'] : '';
						$datos = array(
							"id" => $row['id'],
							"IdPedido" => $row['IdPedido'],
							"NoEmpleado" => $row['NoEmpleado'],
							"NombreEmpleado" => utf8_encode($row['NombreEmpleado']),
							"TipoPlatillo" => $row['TipoPlatillo'],
							"Ubicacion" => $row['Ubicacion'],
							"FechaPedido" => $row['FechaPedido'],
							"EstatusEnviado" => $row['EstatusEnviado'],
							"EstatusComedor" => $row['EstatusComedor'],
							"Tipo_Empleado" => $row['Tipo_Empleado'],
							"Platillo" => utf8_encode($row['Platillo']),
							"Comentarios" => utf8_encode($row['Comentarios']),
							"NoPlatillo" => $row['NoPlatillo'],
							"idComedorSub" => utf8_encode($row['idComedorSub']),
							"Precio" => $row['Precio'],
							"Total" => $row['Total'],
							"Id_Conciliacion" => $id_conciliacion,
							"Tipo_comida" => $tipo_comida
						);
						array_push($query, $datos);
					}
				}else{
					while($row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
						$datos = array(
							"id" => $row['id'],
							"IdPedido" => $row['IdPedido'],
							"NoEmpleado" => $row['NoEmpleado'],
							"NombreEmpleado" => utf8_encode($row['NombreEmpleado']),
							"TipoPlatillo" => $row['TipoPlatillo'],
							"Ubicacion" => $row['Ubicacion'],
							"FechaPedido" => $row['FechaPedido'],
							"EstatusEnviado" => $row['EstatusEnviado'],
							"EstatusComedor" => $row['EstatusComedor'],
							"Tipo_Empleado" => $row['Tipo_Empleado'],
							"Platillo" => utf8_encode($row['Platillo']),
							"Comentarios" => utf8_encode($row['Comentario']),
							"NoPlatillo" => $row['Cantidad'],
							"Kcal" =>utf8_encode($row['Kcal']),
							"Precio" => $row['Precio'],
							"Total" => $row['total'],
							"IdPedido" => utf8_encode($row['IdPedido']),
							"Tipo_comida" => $tipo_comida
						);
						array_push($query, $datos);
					}
				}

				sqlsrv_free_stmt( $stmt);		
				sqlsrv_close($conn);

				if (count($query) != 0) {
					$data = array(
						"data" => $query,
						"estatus" => 'success'
					);	
				}else{
					$data = array(
						"estatus" => 'error_vacio',
						"Mensaje" => 'No hay registros de platillos pendientes por procesar'
					);
				}
			}else{
				$data = array(
					"estatus" => 'error_consulta',
					"Mensaje" => "Ops ocurrio un error"
				);	
			}
			ob_clean();//clears the output buffer
			echo json_encode($data);
		break;
		case '25': 
			$query = array();
			$data = array();
			include './db/conectar.php';
			$Fecha = isset($_POST['Fecha']) ? utf8_decode($_POST['Fecha']) : '';
			$fecha_inicial = "";
			$fecha_final = "";
			$Ubicacion = isset($_POST['Ubicacion']) ? utf8_decode($_POST['Ubicacion']) : '';
			$validar = true;
			$mensaje;

			if ($Fecha != '') {
				list($f_inicio, $f_final) = explode(" - ", $Fecha);//Extrae la fecha inicial y la fecha final en formato espa?ol
				list ($dia_inicio,$mes_inicio,$anio_inicio) = explode("/", $f_inicio);//Extrae fecha inicial 
				$fecha_inicial="$anio_inicio-$mes_inicio-$dia_inicio";//Fecha inicial formato ingles
				list($dia_fin,$mes_fin,$anio_fin) = explode("/",$f_final);//Extrae la fecha final
				$fecha_final = "$anio_fin-$mes_fin-$dia_fin";
			}

			if (($fecha_inicial != "" && $fecha_inicial != null) && ($fecha_final != "" && $fecha_final != null)) {
				$sql = "{call RH_Com_Listar_Pedidos_Sin_Estatus(?, ?, ?)}";
				$params = array($fecha_inicial, $fecha_final, $Ubicacion);
				$stmt = sqlsrv_query($conn, $sql, $params);

				if (isset($stmt)) {
					if ( $stmt === false) {
						$data = array(
							"estatus" => 'error',
							"Mensaje" => sqlsrv_errors()
						);
						echo json_encode($data);	
					}
					while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
						$sql2 = "{call RHCom_EstatusComedor(?,?)}";
						$params2 = array($row['IdPedido'], 2);
						$stmt2 = sqlsrv_query($conn, $sql2, $params2);

						if ($stmt2 === false) {
							$data = array(
								"estatus" => 'error',
								"Mensaje" => sqlsrv_errors()
							);
							echo json_encode($data);
						}
						
					}
					sqlsrv_free_stmt( $stmt);
					sqlsrv_free_stmt( $stmt2 );
					sqlsrv_close($conn);
				}
			}
			
			if ($validar) {
				$data = array(
					"estatus" => "success",
					"Validar" => $validar
				);
			}else{
				$data = array(
					"estatus" => "error",
					"Validar" => $validar,
					"Mensaje" => $mensaje
				);
			}
			ob_clean();//clears the output buffer
			echo json_encode($data); 
		break;
		case '26':
			$query = array(); 
			$data = array();
			include './db/conectar.php';
			$Fecha = isset($_POST['Fecha']) ? utf8_decode($_POST['Fecha']) : '';
			$fecha_inicial = "";
			$fecha_final = "";
			$Ubicacion = isset($_POST['ubicacion']) ? $_POST['ubicacion'] : '';
			$validar = true;
			$mensaje;

			if ($Fecha != '') {
				list($f_inicio, $f_final) = explode(" - ", $Fecha);//Extrae la fecha inicial y la fecha final en formato espa?ol
				list ($dia_inicio,$mes_inicio,$anio_inicio) = explode("/", $f_inicio);//Extrae fecha inicial 
				$fecha_inicial="$anio_inicio-$mes_inicio-$dia_inicio";//Fecha inicial formato ingles
				list($dia_fin,$mes_fin,$anio_fin) = explode("/",$f_final);//Extrae la fecha final
				$fecha_final = "$anio_fin-$mes_fin-$dia_fin";
			}

			if (($fecha_inicial != "" && $fecha_inicial != null) && ($fecha_final != "" && $fecha_final != null)) {
				$sql = "{call RHCom_GraficasPedidos(?, ?, ?)}";
				$params = array($fecha_inicial, $fecha_final, $Ubicacion);
				$stmt = sqlsrv_query($conn, $sql, $params);

				$sql2 = "{call RHCom_GraficasPedidosPlatoUnico(?, ?, ?)}";
				$params2 = array($fecha_inicial, $fecha_final, $Ubicacion);
				$stmt2 = sqlsrv_query($conn, $sql2, $params2);

				if (isset($stmt) && isset($stmt2)) {
					if ($stmt === false && $stmt2 === false) {
						$mensaje = sqlsrv_errors();
						$data = array(
							"estatus" => 'error',
							"mensaje" => $mensaje[0]['mensaje']
						);
						echo json_encode($data);	
					}
					while($row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
						$record = array(
							"Nombre" => utf8_encode($row['Platillo']),
							"Fecha_Pedido" => $row['FechaPedido'],
							"Cantidad_Platillo" => $row['Cantidad_Platillo']
						);
						array_push($query, $record);
					}
					while($row2 = sqlsrv_fetch_array( $stmt2, SQLSRV_FETCH_ASSOC) ) {
						$record2 = array(
							"Nombre" => utf8_encode($row2['Platillo']),
							"Fecha_Pedido" => $row2['FechaPedido'],
							"Cantidad_Platillo" => $row2['Cantidad_Platillo']
						);
						array_push($query, $record2);
					}

					if (count($query) != 0){
						$data = array(
							"estatus" => "success",
							"data" => $query,
							"code" => 200
						);
					}else{
						$data = array(
							"estatus" => 'error',
							"mensaje" => "no hay datos",
							"code" => 400
						);	
							
					}
					sqlsrv_free_stmt( $stmt);
					sqlsrv_close($conn);
				}
			}else{
				$data = array(
					"estatus" => 'error_fecha',
					"mensaje" => "no seleccionaste un rango de fechas valido"
				);	
			}
			ob_clean();//clears the output buffer
			echo json_encode($data); 
		break;
		case '27': 
			$query = array();
			$data = array();
			include './db/conectar.php';
			$id_pedido = $_POST['id_pedido'];
			$validar = true;
			$mensaje;
			
			$sql = "{call RHCom_Editar_Pedidos_Gr(?)}";
			$params = array($id_pedido);
			$stmt = sqlsrv_query($conn, $sql, $params);

			if (isset($stmt)) {
				if ( $stmt === false) {
					die( print_r( sqlsrv_errors(), true) );
				}
				while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
					$record = array(
						"id" => $row['id'],
						"IdPedido" => $row['IdPedido'],
						"NoEmpleado" => $row['NoEmpleado'],
						"NombreEmpleado" => utf8_encode($row['NombreEmpleado']),
						"TipoPlatillo" => $row['TipoPlatillo'],
						"Ubicacion" => $row['Ubicacion'],
						"FechaPedido" => $row['FechaPedido'],
						"EstatusEnviado" => $row['EstatusEnviado'],
						"EstatusComedor" => $row['EstatusComedor'],
						"IdComedorGr" => utf8_encode($row['IdComedorGr']),
						"Platillo" => utf8_encode($row['Platillo']),
						"Comentarios" => utf8_encode($row['Comentario']),
						"NoPlatillo" => $row['Cantidad'],
						"Kcal" =>utf8_encode($row['Kcal']),
						"Precio" => $row['Precio'],
						"total" => $row['total'],
						"IdPedido" => utf8_encode($row['IdPedido'])
					);
					array_push($query, $record);
				}

				if (count($query) != 0){
					$data = array(
						"estatus" => "success",
						"data" => $query,
						"code" => 200
					);
				}else{
					$data = array(
						"estatus" => 'error',
						"mensaje" => "no hay registros",
						"code" => 400
					);	
						
				}
		
				sqlsrv_free_stmt( $stmt);		
				sqlsrv_close($conn);
			}else{
				$data = array(
					"estatus" => 'error_fecha',
					"mensaje" => "no seleccionaste un rango de fechas valido",
					"code" => 400
				);	
			}
			ob_clean();//clears the output buffer
			echo json_encode($data); 
		break;
		case '28': 
			$query = array();
			$data = array();
			include './db/conectar.php';
			$IdPedido = isset($_POST['IdPedido']) ? utf8_decode($_POST['IdPedido']) : '';
			$IdComedorGr = isset($_POST['IdComedorGr']) ? utf8_decode($_POST['IdComedorGr']) : '';
			$validar = false;
			$mensaje = '';
			$contador = 0;

			if ($IdPedido != '' && $IdComedorGr != '') {
				$validar = true;
				$sql = "{call RHCom_Editar_Pedidos_Gr(?)}";
				$params = array($IdPedido);
				$stmt = sqlsrv_query($conn, $sql, $params);

				while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
					$contador++; 
				}

				if ($contador == 1) {
					$sql2 = "{call RHCom_EliminarPedidoComp(?)}";
					$params2 = array($IdPedido);
					$stmt2 = sqlsrv_query($conn, $sql2, $params2);
				}
				
				$sql3 = "{call RHCom_EliminarPedidoGr(?, ?)}";
				$params3 = array($IdPedido, $IdComedorGr);
				$stmt3 = sqlsrv_query($conn, $sql3, $params3);

				if (isset($stmt) && isset($stmt3)) {
					if ( $stmt === false) {
						$data = array(
							"estatus" => 'error',
							"Mensaje" => sqlsrv_errors()
						);
						echo json_encode($data);	
					}

					sqlsrv_free_stmt( $stmt);
					sqlsrv_close($conn);
				}
			}
			
			if ($validar) {
				$data = array(
					"estatus" => "success",
					"Validar" => $validar
				);
			}else{
				$mensaje = "no se ejecuto nada";
				$data = array(
					"estatus" => "error",
					"Validar" => $validar,
					"Mensaje" => $mensaje
				);
			}
			ob_clean();//clears the output buffer
			echo json_encode($data); 
		break;
		case '29':
			$data = array();
			$IdPedido = $_POST['IdPedido'];
			$NoEmpleado = $_POST['NoEmpleadoLogeado'];
			$NombreEmpleado =  utf8_decode($_POST['NombreEmpleado']);
			$TipoPlatillo = $_POST['TipoPlatillo'];
			$Ubicacion =  $_POST['Ubicacion'];
			$FechaDeOrden =  $_POST['FechaDeOrden'];
			$arrayListadoPlatilloUnico = isset($_POST['arrayListadoPlatilloUnico']) ? json_decode($_POST['arrayListadoPlatilloUnico'], true) : 0;
			$arrayListadoGreenSpot = isset($_POST['arrayListadoGreenSpot']) ? json_decode($_POST['arrayListadoGreenSpot'], true) : 0;
			$Tipo_Empleado =  $_POST['Tipo_Empleado'];
			$contador = 0;
			$IdPedido_new = '';

			$validar = false;
			$pedidoporcomedor =  $_POST['pedidoporcomedor'];
			$comentario_global =  isset($_POST['comentario_global']) ? utf8_decode($_POST['comentario_global']) : '';
			
			include './db/conectar.php';
			
			$sql = "{call RHCom_Editar_Pedidos_Gr(?)}";
			$params = array($IdPedido);
			$stmt = sqlsrv_query($conn, $sql, $params);

			while( $row = sqlsrv_fetch_array( $stmt, SQLSRV_FETCH_ASSOC) ) {
				$contador++; 
			}

			if ($contador == 0) {
				$sql2 = "{call RHCom_GuardaPedido(?,?,?,?,?,?,?)}";
				$params2 = array($NoEmpleado,$NombreEmpleado,$TipoPlatillo,$FechaDeOrden,$Ubicacion,$pedidoporcomedor,$Tipo_Empleado);
				$stmt2 = sqlsrv_query($conn, $sql2, $params2);
				
				if ($stmt2 === false) {
					$validar = false;
					$mensaje = sqlsrv_errors();
					$data = array(
						"estatus" => 'error_guardar_pedido',
						"Validar" => $validar,
						"mensaje" => $mensaje[0]['message']
					);
					echo json_encode($data);
					die();	
				}else{
					while( $row2 = sqlsrv_fetch_array($stmt2, SQLSRV_FETCH_ASSOC) ) {
						$IdPedido_new = $row2['IdPedido'];
					}
					
					foreach ($arrayListadoGreenSpot as $row3) {		
						// $IdPedidoInsertado = $IdPedido_new;
						$Posicion = $row3['Posicion'];
						$IdPlatillo = $row3['IdPlatillo'];
						$Platillo = utf8_decode($row3['Platillo']);
						$Comentario = utf8_decode($comentario_global);
						$TipoPlatillo = $TipoPlatillo;
						$KCal =  utf8_decode($row3['KCal']);
						$Cantidad = $row3['Cantidad'];
						$Precios = $row3['Precios'];
						$Total = $row3['Total'];
						$FechaPedido = $FechaDeOrden;
							
						include './db/conectar.php';
						$sql3 = "{call RHCom_GuardaPedidoComedorGreenSpot(?,?,?,?,?,?,?,?,?,?,?)}";
						$params3 = array($IdPedido_new,$Posicion,$IdPlatillo,$Platillo,$Comentario,$TipoPlatillo,
										$KCal,$Cantidad,$Precios,$Total,$FechaPedido);
						$stmt3 = sqlsrv_query($conn, $sql3, $params3);
						if ( $stmt3 === false) {
							$validar = false;
							$mensaje = sqlsrv_errors();
							$data = array(
								"estatus" => 'error_guardar_pedido_green_spot',
								"Validar" => $validar,
								"mensaje" => $mensaje[0]['message']
							);
							echo json_encode($data);
							die();
						}
					}
					sqlsrv_free_stmt( $stmt3 );
				}
				sqlsrv_free_stmt( $stmt2 );
			}else{
				foreach ($arrayListadoGreenSpot as $row4) {		
					$IdPedidoInsertado = $IdPedido;
					$Posicion = $row4['Posicion'];
					$IdPlatillo = $row4['IdPlatillo'];
					$Platillo = utf8_decode($row4['Platillo']);
					$Comentario = utf8_decode($comentario_global);
					$TipoPlatillo = $TipoPlatillo;
					$KCal =  utf8_decode($row4['KCal']);
					$Cantidad = $row4['Cantidad'];
					$Precios = $row4['Precios'];
					$Total = $row4['Total'];
					$FechaPedido = $FechaDeOrden;
						
					include './db/conectar.php';
					$sql4 = "{call RHCom_GuardaPedidoComedorGreenSpot(?,?,?,?,?,?,?,?,?,?,?)}";
					$params4 = array($IdPedidoInsertado,$Posicion,$IdPlatillo,$Platillo,$Comentario,$TipoPlatillo,
									$KCal,$Cantidad,$Precios,$Total,$FechaPedido);
					$stmt4 = sqlsrv_query($conn, $sql4, $params4);
					if ( $stmt4 === false) {
						$validar = false;
						$mensaje = sqlsrv_errors();
						$data = array(
							"estatus" => 'error_guardar_pedido_green_spot',
							"Validar" => $validar,
							"mensaje" => $mensaje[0]['message']
						);
						echo json_encode($data);
						die();
					}
				}
			}

			sqlsrv_free_stmt( $stmt );
			sqlsrv_close($conn);

			if ($validar) {
				$data = array(
					"estatus" => "success",
					"validar" => true
				);
			}else{
				$data = array(
					"estatus" => "success",
					"validar" => true
				);
			}
			// array_push($query2,$record2);
			ob_clean();//clears the output buffer
			echo json_encode($data);	
		break;
		case '30':
			$query = array();
			$data = array();
			include './db/conectar.php';
			$bandera = isset($_POST['bandera']) ? $_POST['bandera'] : 0;
			$fecha_actual = isset($_POST['fecha_actual']) ? $_POST['fecha_actual'] : '';
			$estatus = 1;
			$validar = true;

			switch ($bandera) {
				case 0:
					$nombre_platillo = isset($_POST['nombre_platillo']) ? utf8_decode($_POST['nombre_platillo']) : '';
					$descripcion = isset($_POST['descripcion']) ? utf8_decode($_POST['descripcion']) : '';
					$sede = isset($_POST['sede']) ? utf8_decode($_POST['sede']) : '';
					$fecha_dia = isset($_POST['fecha_dia']) ? $_POST['fecha_dia'] : '';
					$nueva_fecha = date("Y-m-d", strtotime($fecha_dia));

					if ($nombre_platillo != '' && $descripcion != '' && $sede != '' && $fecha_dia != '' && $fecha_actual != '') {
						if ($nueva_fecha < $fecha_actual ) {
							$data = array(
								"estatus" => "error",
								"validar" => "false",
								"mensaje" => "La fecha dia publicar no puede ser menor que la fecha actual"
							);
							ob_clean();//clears the output buffer
							echo json_encode($data);
							die(); 
						}
						$sql = "{call RHCom_Guardar_Menu(?,?,?,?,?)}";
						$params = array($nombre_platillo, $descripcion, $sede, $nueva_fecha, $estatus);
						$stmt = sqlsrv_query($conn, $sql, $params);
						if ($stmt === false) {
							$validar = false;
							$mensaje = sqlsrv_errors();
							$data = array(
								"estatus" => 'error_guardar_menu',
								"Validar" => $validar,
								"mensaje" => $mensaje[0]['message']
							);
							echo json_encode($data);
							die();	
						}

						while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
							$record = array(
								"Resultado" => $row['Resultado']
							);
							array_push($query, $record);
						}
					}

					if($validar && count($query) != 0) {
						$data = array(
							"estatus" => "success",
							"validar" => "true",
							"mensaje" => "Se guardo correctamente"
						);
					}else{
						$data = array(
							"estatus" => "error",
							"validar" => "false",
							"mensaje" => "no se guardo correctamente"
						);
					}
				break;

				case 1:
					$nombre_archivo = $_FILES['file_excel']['name'];
					$tipo_archivo = $_FILES['file_excel']['type'];
					$tamano_archivo = $_FILES['file_excel']['size'];
					$extension = pathinfo($nombre_archivo, PATHINFO_EXTENSION);
					$allowedfileExtensions = array('xlsx');
					
					if (in_array($extension, $allowedfileExtensions) && $fecha_actual != '') {
						$directorio = 'archivos/';
						$subir_archivo = $directorio.basename("menu.xlsx");

						if (move_uploaded_file($_FILES['file_excel']['tmp_name'], $subir_archivo)){
							$validar = true;
							$mensaje = '';
							$contador = 0;

							//Cargar nuestra hoja de excel
							$excel = PHPExcel_IOFactory::load($subir_archivo);

							//Cargar la hoja de calculo que queremos
							$excel->setActiveSheetIndex(0);

							$numerofila = $excel->setActiveSheetIndex(0)->getHighestRow();

							for ($i=2; $i <= $numerofila; $i++) {
								$fecha = $excel->getActiveSheet()->getCell('D'. $i)->getValue();
								$nueva_fecha = date($format = "Y-m-d", PHPExcel_Shared_Date::ExcelToPHP($fecha)); 
								if ($nueva_fecha < $fecha_actual ) {
									$data = array(
										"estatus" => "error",
										"validar" => "false",
										"mensaje" => "La fecha dia publicar no puede ser menor que la fecha actual"
									);
									ob_clean();//clears the output buffer
									echo json_encode($data);
									die(); 
								}
							}
							
							for ($i=2; $i <= $numerofila; $i++) { 
								if ($excel->getActiveSheet()->getCell('A'. $i)->getValue() == null) {
									break;
								}
								$nombre_platillo = utf8_decode($excel->getActiveSheet()->getCell('A'. $i)->getValue());
								$descripcion = utf8_decode($excel->getActiveSheet()->getCell('B'. $i)->getValue());
								$sede = utf8_decode($excel->getActiveSheet()->getCell('C'. $i)->getValue());
								$fecha = $excel->getActiveSheet()->getCell('D'. $i)->getValue();
								$cantidad_platillo = utf8_decode($excel->getActiveSheet()->getCell('E'. $i)->getValue());
								$nueva_fecha = date($format = "Y-m-d", PHPExcel_Shared_Date::ExcelToPHP($fecha));

								$sql = "{call RHCom_Guardar_Menu(?,?,?,?,?,?)}";
								$params = array($nombre_platillo, $descripcion, $sede, $nueva_fecha, $estatus, $cantidad_platillo);
								$stmt = sqlsrv_query($conn, $sql, $params);
								if ($stmt === false) {
									$validar = false;
									$mensaje = sqlsrv_errors();
									$data = array(
										"estatus" => 'error_guardar_menu',
										"Validar" => $validar,
										"mensaje" => $mensaje[0]['message']
									);
									echo json_encode($data);
									die();	
								}

								while($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
									$record = array(
										"Resultado" => $row['Resultado']
									);
									array_push($query, $record);
								}
								
							
								sqlsrv_free_stmt($stmt);
							}
							if ($validar && count($query) != 0) {
								$data = array(
									"estatus" => "success",
									"validar" => "true",
									"mensaje" => "Se guardo correctamente"
								);
							}else{
								$data = array(
									"estatus" => "success",
									"validar" => "true",
									"mensaje" => "no se guardo correctamente"
								);
							}
						}else{
							$data = array(
								"estatus" => "error",
								"validar" => "false",
								"mensaje" => "no se guardo correctamente"
							);
						}	
					}else{
						$data = array(
							"estatus" => "error",
							"validar" => "false",
							"mensaje" => "solo los archivos dee excel son permitidos"
						);
					}
				break;
				
				default:
					$data = array(
						"estatus" => "error",
						"validar" => "false",
						"mensaje" => "no se guardo correctamente"
					);
				break;
			}
			ob_clean();//clears the output buffer
			echo json_encode($data); 
		break;
		case '31':
			$query = array();
			$data = array();
			include './db/conectar.php';
			$fechaActual = isset($_POST['fecha_actual']) ? $_POST['fecha_actual'] : '';
			$sede = isset($_POST['sede']) ? $_POST['sede'] : '';
			$validar = true;

			$sql = "{call RHCom_ObtenerMenuPlatillos(?, ?)}";
			$params = array($fechaActual, $sede);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if ($stmt === false) {
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_guardar_menu',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();	
			}else{
				while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
					$record = array(
						"IDPlatillo" => $row['IDPlatillo'] != null ? $row['IDPlatillo']:0,
						"Nombre_Platillo" => $row['Nombre_Platillo'] != null ? utf8_encode ($row['Nombre_Platillo']):"",
						"Descripcion" => $row['Descripcion'] != null ? utf8_encode ($row['Descripcion']):"",
						"Sede" => $row['Sede'] != null ? utf8_encode ($row['Sede']):"",
						"DiaPublicar" => $row['Fecha'] != null ? $row['Fecha']:""
					);
					array_push($query, $record);
				}
	
				if (count($query) != 0) {
					$data = array(
						"estatus" => "success",
						"datos" => $query
					);
				}else{
					$data = array(
						"estatus" => "error",
						"mensaje" => "ocurrio un error"
					);
				}
			}
			ob_clean();//clears the output buffer
			echo json_encode($data); 
		break;
		case '32':
			$query = array();
			$data = array();
			include './db/conectar.php';
			$id_platillo = isset($_POST['id_platillo']) ? $_POST['id_platillo'] : 0;
			$validar = true;

			$sql = "{call RHCom_ValidarPlatillosMenu(?)}";
			$params = array($id_platillo);
			$stmt = sqlsrv_query($conn, $sql, $params);
			if ($stmt === false) {
				$mensaje = sqlsrv_errors();
				$data = array(
					"estatus" => 'error_platillos_menu',
					"Validar" => $validar,
					"mensaje" => $mensaje[0]['message']
				);
				echo json_encode($data);
				die();	
			}else{
				while( $row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC) ) {
					$record = array(
						"CantidadPlatillo" => $row['CantidadPlatillo'] != null ? $row['CantidadPlatillo']: 0
					);
				}
	
				if ($record['CantidadPlatillo'] != 0) {
					$data = array(
						"estatus" => "success",
						"mensaje" => "Si hay platillo."
					);
				}else{
					$data = array(
						"estatus" => "error",
						"mensaje" => "El menu solicitado ya se terminó."
					);
				}
			}
			ob_clean();//clears the output buffer
			echo json_encode($data); 
		break;
  }
?>