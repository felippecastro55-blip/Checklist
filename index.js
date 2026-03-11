//Campos para preenchimento das tarefas
var data = $('#data');
var hora = $('#hora');
var tarefa = $('#tarefa');
var idtarefaEditada = $('#idTarefaEditada')

//Buttons
var buttonSalvar = `<button class="btn btn-primary" id="salvar">Salvar</button>`;
var buttonCancelar = `<button class="btn btn-primary" id="cancelarEdit">Cancelar</button>`;
var buttonEditar = `<a href="#" class="editar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path
                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                        </svg>
                        </a>`;
var buttonRemover = `<a href="#" class="delete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
                        </svg>
                     </a>`
                    
var statusTarefa = `<div class="form-check form-switch">
                            <input class="form-check-input status" type="checkbox">
                        </div>`;


//Upload dos dados do localStorage
for (let i = 0; i < localStorage.length; i++) {
    let tarefaStorage = JSON.parse(localStorage.getItem(localStorage.key(i)));
    $('tbody').append(`<tr>
                            <td name="id" hidden></td>
                            <td name="data"></td>
                            <td name="hora"></td>
                            <td name="tarefa"></td>
                            <td></td>
                            <td style="text-align: center;">${buttonEditar}</td>
                            <td>${buttonRemover}</td>
                        </tr>`);
    Object.keys(tarefaStorage).forEach(function (el, j) {

        if (el !== "status") {

            $('.listaTarefas tbody tr').last().find('td').eq(j).text(tarefaStorage[el])

            console.log('preencheu');
        } else {
            $('.listaTarefas tbody tr').last().find('td').eq(j).html(tarefaStorage[el])
            console.log('chegou no campo status');
        };
    });
};

var objTarefas = {};
var id = Number($('tbody tr').last().find('[name="id"]').text()) + 1 || 0;
console.log(id)
//button salvar
$("#salvar").on('click', function () {
    if (idtarefaEditada.text()) {

        console.log(idtarefaEditada)
        console.log('id = ""');
        localStorage.removeItem(`tarefa${idtarefaEditada.text()}`); //Removendo tarefa do localStorage
        linhaSelecionada.remove(); //Removendo tarefa da lista no front
        console.log(linhaSelecionada)
        $('#cancelarEdit').remove();
    };
    $('tbody').append(`<tr>
                            <td name="id" hidden>${id}</td>
                            <td name="data">${data.val()}</td>
                            <td name="hora">${hora.val()}</td>
                            <td name="tarefa">${tarefa.val()}</td>
                            <td>${statusTarefa}</td>
                            <td style="text-align: center;">${buttonEditar}</td>
                            <td>${buttonRemover}</td>
                            </tr>`);

    objTarefas.id = id
    objTarefas.data = data.val()
    objTarefas.hora = hora.val()
    objTarefas.descTarefa = tarefa.val()
    objTarefas.status = statusTarefa

    localStorage.setItem(`tarefa${id}`, JSON.stringify(objTarefas));
    id++
    objTarefas = {};
    // Limpar campos
    data.val("");
    hora.val("");
    tarefa.val("");
    idtarefaEditada.text("");
});

//button editar
var linhaSelecionada;
$('tbody').on('click', '.editar', function () {
    console.log("rodou editar");
    linhaSelecionada = $(this).closest("tr");
    let idLinha = $(this).closest('tr').find('[hidden]').prop('innerText');
    let dataLinha = $(this).closest('tr').find('[name="data"]').prop('innerText');
    let horaLinha = $(this).closest('tr').find('[name="hora"]').prop('innerText');
    let tarefaLinha = $(this).closest('tr').find('[name="tarefa"]').prop('innerText');
    console.log(dataLinha);
    data.val(dataLinha);
    hora.val(horaLinha);
    tarefa.val(tarefaLinha);
    idtarefaEditada.text(idLinha)
    $('.buttonsSalvaCancelar').append(buttonCancelar);
    console.log(idtarefaEditada.prop('innerText'));

});

//Button checkbox
$('tbody').on('click', '.status', function () {
    console.log('clicou')
    let id = $(this).closest('tr').find('[name="id"]').text();
    console.log(id)
    let tarefaLocalStrg = JSON.parse(localStorage.getItem(`tarefa${id}`));
    console.log(tarefaLocalStrg)
    if (tarefaLocalStrg.status.includes('checked')) {
        tarefaLocalStrg.status = `<div class="form-check form-switch">
                                    <input class="form-check-input status" type="checkbox">
                                 </div>`;
    } else {
        tarefaLocalStrg.status = `<div class="form-check form-switch">
                                    <input class="form-check-input status" type="checkbox" checked>
                                </div>`;
    }
    localStorage.setItem(`tarefa${id}`, JSON.stringify(tarefaLocalStrg));
});
//Button remover
$('tbody').on('click', '.delete', function(){
    console.log("clicou em deletar");
    let idTarefa = $(this).closest('tr').find('[name="id"]').text();
    localStorage.removeItem(`tarefa${idTarefa}`);
    $(this).closest('tr').remove();
});


/* var req = new XMLHttpRequest();
req.open('GET', 'teste.txt', true)
req.onload = function(){
    console.log(req.responseText);
};
req.send(); */

var req = new XMLHttpRequest();
req.open('GET', 'teste.txt', true)
req.onload = function () {
    console.log(req.responseText);
};
req.send();
