<?php
class FacturaController
{

    private $modelo;

    public function __construct($modelo){
        $this->modelo = $modelo;
    }

public function obtenerFacturasProveedor($username){
    	$data = $this->modelo->obtenerFacturasProveedor($username);
    	if ($data['success']) {
    		return $data['data'];
    	}
    	else{
    		return '';
    	}    	
    }

}