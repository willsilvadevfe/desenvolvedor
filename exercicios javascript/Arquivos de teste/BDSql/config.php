<?php 
    if(isset($_POST['cadastrar'])) {
        $nome = $_POST['nome'];
        $cpf = $_POST['cpf'];
        $senha = $_POST['senha'];
        $checksenha =$_POST['checksenha'];
    }

    if($senha != $checksenha){
        die("As senhas não correspondem.");
    }

    $host = "localhost";
    $banco = "FormularioTeste";
    $user = "root";
    $senha_user = "";

    $con = mysqli_connect($host, $user, $senha_user, $banco);

    if(!$con){
        die("Conexão falhou..." . mysqli_connect_error());
    }

    $sql = "INSERT INTO Clientes(Nome, CPF, Senha) VALUES('$nome', '$cpf', '$senha')" ;

    $rs = mysqli_query($con, $sql);

    if($rs){
        echo "Cliente cadastrado com sucesso!";
    }


?>