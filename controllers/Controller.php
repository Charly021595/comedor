<?php
class Controlador
{
    // Contenedor Instancia de la clase
    private static $instance = NULL;

    // Constructor privado, previene la creación de objetos vía new
    private function __construct(){
        //session_start();
    }

    // Clone no permitido
    public function __clone() { }

    // Método singleton 
    public static function getInstance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new self;
        }

        return self::$instance;
    }    

    public function index()
    {                
        if (isset($_SESSION['username'])){
            $data['content'] = 'views/home.php';
            $data['title'] = 'Facturas';            
            return $data;
        }
        else{
            $loginController = new LoginControlador(new LoginModelo());            
            $data['content'] = $loginController->mostrarVista();
            $data['title'] = 'Inicio';
            return $data;
        }
    }
    public function startSessions(){
        session_start();        
    }
    public function destroySessions(){     
        session_start();   
        // Borrar todos los valores de sesión
        session_unset();

        session_unregister('username');

        unset($_SESSION);
        unset($_COOKIE);

        // Terminar la sesión
        session_destroy();
    }

    public function mostrarMenu(){
        if (isset($_SESSION['username'])){
            return 'views/menu.php';        
        }
    }

    public function mostrarMensaje(){
        if (isset($_SESSION['mensaje'])){
            echo '<script language="javascript">alert("'.$_SESSION['mensaje'].'");</script>';
        }
    }

    public function borrarMensaje(){
        unset($_SESSION['mensaje']);
    }    
}