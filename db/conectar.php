<?php
	//
	// $serverName = "VMSQL2008";
	//$serverName = "VMDYNAMICSAXDEV";
	// $serverName = "vmdynamicsaxdev";
	// $connectionInfo = array( "Database"=>"Consultas", "UID"=>"Consulta", "PWD"=>"Consulta");
	// $conn = sqlsrv_connect( $serverName, $connectionInfo);
	$serverName = "vmdynamicsaxdev";
	$connectionInfo = array( "Database"=>"dwweb_comedor", "UID"=>"sa", "PWD"=>"Dyn4mic$");
	$conn = sqlsrv_connect( $serverName, $connectionInfo);

	if( !$conn ) {
		echo "No se pudo establecer la conexión.<br />";
		die( print_r( sqlsrv_errors(), true));
	}

?>