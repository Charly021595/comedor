<?php
class LoginControlador
{
    private $modelo;

    public function __construct($modelo){
        $this->modelo = $modelo;
    }

    public function mostrarVista()
    {
    	return "vista/login.php";
    }

    public function validarCredenciales($username, $password){
    	$data = $this->modelo->validarCredenciales($username, $password);
    	if($data['success']){ 
            $_SESSION["username"]       = $data['data'][0]['usuario'];
            $_SESSION["name"]           = $data['data'][0]['nombre'];
            /*if ($data['data'][0]['ultimoacceso'] == strtotime('01/01/1900 00:00:00')) {
                $_SESSION["ultimoacceso"]   = $data['data'][0]['ultimoacceso'];
            }
            else{
                $_SESSION["ultimoacceso"]   = date('d/m/Y h:i:s', time());
            }*/
            $_SESSION["ultimoacceso"]   = $data['data'][0]['ultimoacceso'];
            $_SESSION["tipoproveedor"]   = $data['data'][0]['tipoproveedor']; // Tipo de proveedor  0 - Indirectos, 1 - Transportista, 2 - Materia prima
        }
        return $data['success'];  	
    }

    public function recuperarContrasena($username){
        $data = $this->modelo->recuperarContrasena($username);
        return $data['correo'];
    }
}