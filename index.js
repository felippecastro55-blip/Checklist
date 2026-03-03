var data = $('#data');
var hora = $('#hora');
var tarefa = $('#tarefa');

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

var statusTarefa = `<div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox">
                        </div>`;

var tarefas = [];
var quantidadeTarefas = tarefas.length;
var id = 0;
/* $("#salvar").on('click', function () {
    data = $('#data').val();
    hora = $('#hora').val();
    tarefa = $('#tarefa').val();
    let status = `<div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox">
                        </div>`;    


    $('tbody tr').append(`<tr>                    
                            <td>${data}</td>
                            <td>${hora}</td>
                            <td>${tarefa}</td>
                            <td>${status}</td>`);

    localStorage.setItem(`data_${idLocalStorage}`, data);                        
    localStorage.setItem('hora', hora);
    localStorage.setItem('tarefa', tarefa);
    localStorage.setItem('status', status);
}); */
//button salvar
$("#salvar").on('click', function () {
    if($('#idTarefaEditada').text()){
        console.log('id = ""');
        linhaSelecionada.remove();
        $('#cancelarEdit').remove();
    };
    $('tbody').append(`<tr>
                            <td name="data">${data.val()}</td>
                            <td name="hora">${hora.val()}</td>
                            <td name="tarefa">${tarefa.val()}</td>
                            <td>${statusTarefa}</td>
                            <td>${buttonEditar}</td>
                            <td hidden>${id}</td>
                            </tr>`);

    tarefas.push({
        id: id,
        data: data,
        hora: hora,
        descTarefa: tarefa,
        status: statusTarefa
    });

    localStorage.setItem(`tarefa${id}`, tarefas);
    id = id++
    tarefas = [];
    // Limpar campos
    data.val("");
    hora.val("");
    tarefa.val("");
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
    $('#idTarefaEditada').text(idLinha)
    $('.buttonsSalvaCancelar').append(buttonCancelar)
    console.log($('#idTarefaEditada').prop('innerText'))
    
});
