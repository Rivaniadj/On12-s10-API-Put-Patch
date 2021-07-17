const series = require("../models/series.json")

const home = (request, response) => {
    response.status(200).send(
        {
            "mensagem": "Novo projeto"
        }
    )
}

const getAll = (request  , response) => {
    response.status(200).send(series)

};

const getById = (request, response) => {
    const buscarId = request.params.id;

    const filterId = series.find(serie => serie.id == buscarId);
    response.status(200).send(filterId);
}
const getByTitle = (request, response) => {
    const buscarTitle = request.query.title.toLowerCase()

    const filtrarTitle = series.find(serie => serie.title.toLowerCase().includes(buscarTitle))
    console.log(filtrarTitle)

    if (buscarTitle === "" || filtrarTitle === undefined) {
        response.status(404).send({
            "messagem": "precisa  inserir um título válido."
        })
    } else {
        response.status(200).send(filtrarTitle)
    }
};


const getByGenre = (request, response) => {

    const buscarpGenre = request.query.genre;
    let serieList = [];


    series.forEach(serie => {
        let genreList = serie.genre;


        for (genre of genreList) {
            if (genre.includes(buscarpGenre)) {
                // console.log(serie)
                serieList.push(serie)
            }


        }
    })
    // retornar a resposta
    response.status(200).send(serieList)
}

const apagarSeries = (request, response) => {


    const idRequerido = request.params.id;
    const seriesFiltrado = series.find(serie => serie.id == idRequerido);

    const indice = series.indexOf(seriesFiltrado);

    movies.splice(indice, 1);

    response.status(200).send(

        {
            "mensagem": "tarefa deletada com sucesso",


            series
        }


    )
},


const createSeries = (req, res) => {


    let requestedTitle = req.body.title;
    let resquestedTotalSeasons = req.body.totalSeasons;
    let requestedGenre = req.body.genre;
    let requestedWriters = req.body.writers;
    let requestedPoster = req.body.poster;
    let requestedActors = req.body.actors;
    let requestedRatings = req.body.ratings;
    let requestedRating = req.body.rating;
    let requestdLikes = req.body.likes

    let newSeries = {

        "id": Math.random().toString(32).substr(2, 6),
        "title": requestedTitle,
        "totalSeasons": resquestedTotalSeasons,
        "genre": requestedGenre,
        "writers": requestedWriters,
        "poster": requestedPoster,
        "actors": requestedActors,
        "ratings": requestedRatings,
        "rating": requestedRating,
        "likes": requestdLikes,



    }

    movies.push(newSeries);


    res.status(201).send({
        "mensagem": "Post criado com sucesso",
        newSeries
    });



    const replaceSeries = (req, res) => {

        let requestedId = req.params.id;
        let seriesFromBody = req.body;

        let filteredPost = series.find(serie => serie.id == requestedId);

        let updateSeries = {
            "id": filteredPost.id,
            "title": seriesFromBody.title,
            "totalSeasons": seriesFromBody.seasons,
            "genre": seriesFromBody.genre,
            "writers": seriesFromBody.writers,
            "poster": seriesFromBody.poster,
            "actors": seriesFromBody.actors,
            "ratings": seriesFromBody.ratings,
            "rating": seriesFromBody.rating,
            "likes": seriesFromBody.likes
    
        }

        const indice = movies.indexOf(filteredPost);
        movies.splice(indice, 1, updateMovie);
        res.status(200).send({
            "mensagem": "Post substituído com sucesso",
            updateSeries
        });
    };

    const updateTitle = (req, res) => {

        let requestedId = req.params.id;
        let newTitle = req.body.titulo;


        let filteredPost = movies.find(post => post.id == requestedId)
        filteredPost.titulo = newTitle;

        res.status(200).send({
            "mensagem": "Título atualizado com sucesso",
            filteredPost
        });
    };

    const updateAnything = (req, res) => {
        let requestedId = req.params.id;

        let filteredPost = movies.find(filme => filme.id == requestedId);
        let updatedPost = req.body;

        let keyList = Object.keys(updatedPost);

        keyList.forEach((key) => {

            filteredPost[key] = updatedPost[key]
        });

        res.status(201).send({
            "message": "Post atualizado com sucesso",
            filteredPost
        });

    };


    module.exports = {
        home,
        getAll,
        getById,
        getByTitle,
        getByGenre,
        apagarSeries,
        createSeries,
        replaceSeries,
        updateTitle,
        updateAnything,

    }






}
