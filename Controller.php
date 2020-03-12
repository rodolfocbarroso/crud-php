<?php

header ('Content-type: text/html; charset=utf-8');

//utilizado para realizar a conexão com  o banco de dados
function getConnection() {
    return mysqli_connect('localhost', 'root', '', 'avaliacao');
}

function insertFuncionario() {
    //implementar a funcionalidade de criar novo funcionario
    mysqli_query(getConnection(),"INSERT INTO funcionario (nome,email,dataNasc,cidade,estado) VALUES ('".$_POST['nome']."','".$_POST['email']."','".$_POST['dataNasc']."','".$_POST['cidade']."',".$_POST['estado']." )");
    header('location: index.html');
    
}

function updateFuncionario() {
    //implementar a funcionalidade de atualizar os dados do funcionario apos a edição
    $sql = "UPDATE funcionario SET nome = '".$_POST['nome']."', email = '".$_POST['email']."',dataNasc = '".$_POST['dataNasc']."',cidade = '".$_POST['cidade']."',estado = ".$_POST['estado']." WHERE matricula =".$_POST['matricula'];
    mysqli_query(getConnection(),$sql);
    header('location: index.html');
    
}

function FindFuncionarioByMatricula() {
    //implementar a funcionalidade de buscar um funcionario em questão através de sua matricula e retornar este para
    //ser utilizado no editar
    $buscar = mysqli_query(getConnection(), "SELECT * FROM funcionario WHERE matricula =" . $_REQUEST['matricula']);
    $dados = mysqli_fetch_array($buscar, MYSQLI_ASSOC);

    $funcionarios[] = $dados;
    echo json_encode($funcionarios, JSON_UNESCAPED_UNICODE);
}


function listar() {
    //funcionalidade de listar os funcionarios cadastros no banco
    $busca = mysqli_query(getConnection(), "SELECT * FROM funcionario");
    $num_busca = mysqli_num_rows($busca);
    $funcionarios = [];

    for ($i = 0; $i < $num_busca; $i++) {
        $dados = mysqli_fetch_array($busca, MYSQLI_ASSOC);

        $funcionarios[] = $dados;
    }

    echo json_encode($funcionarios, JSON_UNESCAPED_UNICODE);
}

function FindAllEstados() {
    $busca = mysqli_query(getConnection(), "SELECT * FROM estado");
    $num_busca = mysqli_num_rows($busca);


    $estados = [];

    for ($i = 0; $i < $num_busca; $i++) {
        $dados = mysqli_fetch_array($busca, MYSQLI_ASSOC);

        $estados[] = $dados;
    }

    echo json_encode($estados, JSON_UNESCAPED_UNICODE);
}

function removeFuncionario() {
    //implementar a funcionalidade de deletar o funcionario do banco de dados
    mysqli_query(getConnection(),"DELETE FROM funcionario WHERE matricula = ".$_POST['matricula']);
    //header('location: index.html');
   
}

//utilizado para redirecionar cada requisição ao seu metodo
switch ($_REQUEST["f"]) {
    case "listar":
        listar();
        break;
    case "getListEstados":
        FindAllEstados();
        break;
    case "getFuncionario":
        FindFuncionarioByMatricula();
        break;
    case "createFuncionario":
        insertFuncionario();
        break;
    case "editFuncionario":
        updateFuncionario();
        break;
    case "deleteFuncionario":
        removeFuncionario();
        break;

}
?>