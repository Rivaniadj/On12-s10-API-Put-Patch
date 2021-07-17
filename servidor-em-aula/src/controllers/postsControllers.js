const { restart } = require("nodemon");
const postsJson = require("../models/posts.json")

const getAll = (req, res) => {
    res.status(200).send(postsJson)
};

const getById = (req, res) => {

    let requestedId = req.params.id;
    let filteredPost = postsJson.find(post => post.id == requestedId)

    res.status(200).send(filteredPost)
};

const createPost = (req, res) => {


let requestedTitle = req.body.titulo;
let requestedContent = req.body.conteudo;
let requestedLabels = req.body.etiquetas;

let newPost = {
    "id": Math.random().toString(32).substr(2, 6),
    "dataCriacao": new Date(),
    "titulo": requestedTitle,
    "conteudo": requestedContent,
    "etiquetas": requestedLabels

};
 postsJson.push(newPost);

res.status(201).send({
    "mensagem": "Post criado com  sucesso",
    newPost

});


};

   const replacePost = (req, res) => {

    let requestedId =  req.params.id;
    let postFromBody = req.body;

    let filteredPost = postsJson.find(post => post.id == requestedId)

    let updatedPost = {
        "id": filteredPost.id,
        "dataCriacao": filteredPost.dataCriacao,
        "titulo": postFromBody.titulo,
        "conteudo": postFromBody.conteudo,
        "etiquetas": postFromBody.etiquetas
    }


    const indice = postsJson.indexOf(filteredPost)
    postsJson.splice(indice, 1, updatedPost);
    
    res.status(200).send({
        "mensagem": "Post subtituido com  sucesso",
        updatedPost

    })

}
//atualizar apenas titulos
const updateTitle = (req, res) => {
    
    let requestedId = req.params.id;
    let newTitle = req.body.titulo;

    
    let filteredPost = postsJson.find(post => post.id == requestedId);

    
    filteredPost.titulo = newTitle;

    res.status(200).send({
        "mensagem": "Título atualizado com sucesso",
        filteredPost
    });
};


//const p atualizar qualquer coisa
const updateAnything = (req, res) => {

    //
    let requestedId = req.params.id;
    
    let filteredPost = postsJson.find(post => post.id == requestedId)

    let updatedPost = req.body;


let keyList = object.keys(updatedPost)


keyList.forEach((key) => {
    
//chave do body = chave do postFiltrado
       filteredPost[key] = updatedPost[key];
});
response.status(200).send({

    "message": "post atualizado com sucesso",

    filteredPost
});

};
const deletePost = (request, response) => {
    const requestedId = request.params.id;
    const filteredPost = postsJson.find(post => post.id == requestedId);

    const index = postsJson.indexOf(filteredPost);

    postsJson.splice(index, 1);

    response.status(200).json([{
        "mensagem": "Post deletado com sucesso",
        postsJson
    }]);
};






module.exports = {getAll, getById, createPost, replacePost, updateTitle, updateAnything , deletePost } 

    





