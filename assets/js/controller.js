var getListFuncionario = function () {
    $.ajax({
        method: "GET",
        url: "Controller.php?f=listar"
    }).done(function (data) {
        var funcionarios = JSON.parse(data);
		$("#tabelaLista").find('tbody').html("");
        for (var i = 0; i < funcionarios.length; i++) {

            var dn = new Date(funcionarios[i].dataNasc);
            dn.setDate(dn.getDate() + 1);
            
            
            $("#tabelaLista").find('tbody').append("<tr id='row"+funcionarios[i].matricula+"'>"
                + "<td>" + funcionarios[i].nome + "</td>"
                + "<td>" + ("0" + dn.getDate()).slice(-2) + "/" + ("0" + (dn.getMonth() + 1)).slice(-2) + "/" + dn.getFullYear() + "</td>"
                + "<td><button id='editar' value='"+funcionarios[i].matricula+"' class='btn btn-primary btn-sm'><i class='glyphicon glyphicon-edit'></i></button>"
                + "<button id='deletar' value='"+funcionarios[i].matricula+"' class='btn btn-danger btn-sm'><i class='glyphicon glyphicon-remove'></i></button>"
                + "</td></tr>")
        }
    });
};

$("#tabelaLista").on('click','button', function () {
   location.href = 'form.html#'+this.value;
});

function getListEstados() {
    $.ajax({
        url: "controller.php?f=getListEstados",
        method: "GET"
    }).done(function (data) {
        let estados = JSON.parse(data);
        let option = "<option value=''>Selecione...</option>";
        for(estado of estados) {
            option += "<option value='"+estado.id+"'>"+estado.nome+"</option>";
        }
        $("#estado").append(option);
    })
}
function createOrEditFuncionario(){
    if (location.hash === ''){ //Cria um  novo Funcionário
        $("#idForm").attr('action','controller.php?f=createFuncionario')
    } else { // Editar Funcionário
        $.ajax({
            url: "controller.php?f=getFuncionario",
            method: "GET",
            data: {matricula: location.hash.substring(1)}
        }).done(function (data) {
            let funcionario = JSON.parse(data);
            $("#matricula").val(funcionario[0].matricula)
            $("#nome").val(funcionario[0].nome)
            $("#email").val(funcionario[0].email)
            $("#dataNasc").val(funcionario[0].dataNasc)
            $("#cidade").val(funcionario[0].cidade)
            $("#estado").val(funcionario[0].estado)
            $("#idForm").attr('action','controller.php?f=editFuncionario')
        })
    }
}

$("#tabelaLista").on('click','a',function () {
    let nome = $(this).closest('tr').find('td:eq(0)').text()
    $("#idCorpo").append("<p>Deseja Excluir o Funcionario: "+nome+"</p>")
    $("#idRodaPe").append("<button id='"+this.id+"' class='close' data-dismiss='modal'>Excluir</button>");
});

$("#idRodaPe").on('click','button',function () {
    let matricula = this.id;
    $.ajax({
        url: "controller.php?f=deletar",
        method: "POST",
        data: {matricula: matricula}
    }).done(function () {
        $("#row"+matricula).remove();
    })
});

//Validação do Formulário
$(document).ready(function(){
    $("#idForm").validate({
        rules:{
            nome: {
                required: true,
                maxlength: 100,
                minlength: 10,
                minWords: 2
            },
            email: {
                required: true,
                email: true
            },
            dataNasc: {
                required: true
            },
            cidade: {
                required: true
            },
            estado: {
                required: true,

            }
        }
    })
})