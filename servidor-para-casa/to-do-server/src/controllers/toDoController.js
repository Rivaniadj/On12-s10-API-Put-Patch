const tarefasJson = require("../models/tarefas.json");
const fs = require("fs");

const getAll = (request, response) => {
    response.status(200).send(tarefasJson);
};

const getById = (request, response) => {
    let idRequirido = request.params.id
    let tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    response.status(200).send(tarefaFiltrada)
};

const createTarefa = (request, response) => {

    let descricaoRequirida = request.body.descricao;
    let nomeColaboradorRequirido = request.body.nomeColaborador;


    const newTarefa = {
        id: Math.random().toString(32).substr(2, 9),
        dataInclusao: new Date(),
        concluido: false,
        descricao: descricaoRequirida,
        nomeColaborador: nomeColaboradorRequirido
    };

    tarefasJson.push(newTarefa)


    

    response.status(200).send({
        "messagem": " tarefa realizada com sucesso",
        newTarefa

    })

};

const replaceTarefa = (req, res) => {
    let resquestedId = req.params.id;
    let tarefaFromBody = req.body;

    let tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == resquestedId)

    let updateTarefa = {

        "id": tarefaFiltrada.id,
        "dataInclusao": new Date(),
        "concluido": false,
        "descricao": tarefaFromBody.descricao,
        "nomeColaborador": tarefaFromBody.nomeColaborador,

    };

    const indice = tarefasJson.indexOf(tarefaFiltrada);
    tarefasJson.splice(indice, 1, updateTarefa);

    res.status(200).send({

        "mensagem": "Tarefa subtiruido com sucesso",
        updateTarefa

    });

};


const updateDescricao = (req, res) => {
    const idRequirido = req.params.id;
    const newDescricao = req.body.descricao;

    let tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)
    tarefaFiltrada.descricao = newDescricao
    res.status(200).send({ "mensagem": "descricão atualizada com exito", tarefaFiltrada })
}


const deleteTarefa = (request, response) => {
    const idRequirido = request.params.id
    const tarefaFiltrada = tarefasJson.find(tarefa => tarefa.id == idRequirido)

    const indice = tarefasJson.indexOf(tarefaFiltrada)
    tarefasJson.splice(indice, 1)
}
    //O método fs.writefile() substitui o arquivo toda vez em que o método for chamado, se 
    //ele não existir vai ser criado o arquivo com o conteúdo ...

     fs.writeFile("./src/models/tarefas.json", JSON.stringify(tarefasJson), 'utf8', function (err) {
        if (err) {
             return response.status(424).send({ message: err })
       }
    
    });
    response.status(200).json([{
        "mensagem": "Tarefa deletada com sucesso",

    }])

    tarefasJson





module.exports = {
    getAll,
    getById,
    createTarefa,
    deleteTarefa,
    replaceTarefa,
    updateDescricao,

}