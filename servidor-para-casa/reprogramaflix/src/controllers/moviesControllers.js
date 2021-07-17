const movies = require("../models/filmes.json")             


const home = (request, response) => {
    response.status(200).send(
        {
            "message": "Olá pessoa, seja bem vinda ao {reprograma}flix <3 <3 <3"
        }
    )
};

const getAll = (request, response) => {
    response.status(200).send(movies);
};

const getById = (request, response) => {
    
    const requestedId = request.params.id;


    const filteredId = movies.find(movie => movie.id == requestedId);


    response.status(200).send(filteredId);
}

const getByTitle = (request, response) => {
    const requestedTitle = request.query.title.toLowerCase()

    
    const filteredTitle = movies.find(movie => movie.title.toLowerCase().includes(requestedTitle))
    if (requestedTitle === "" || filteredTitle === undefined) {
        response.status(404).send({
            "message": "Por favor, insira um título válido."
        })
    } else {
        response.status(200).send(filteredTitle)
    }

const getByGenre = (request, response) => {
    const requestedGenre = request.query.genre;
    let movieList = [];

    movies.forEach(movie => {
        
        let genreList = movie.genre.split(",")

        for (genre of genreList) {
            if (genre.includes(requestedGenre)) {
                console.log(movie)
                movieList.push(movie)
            }
        }

    })
    response.status(200).send(movieList)
}
const apagarmovie = (request, response) => {


    const idRequerido = request.params.id;
    const filmesFiltrado = movies.find(filme => filme.id == idRequerido);

    const indice = movies.indexOf(filmesFiltrado);

    movies.splice(indice, 1);

    response.status(200).send(

        {
            "mensagem": "tarefa deletada com sucesso",


            movies
        }


    )
},

const createMovies = (req, res) => {


    let requestedTitle = req.body.title;
    let requestedYear = req.body.year;
    let requestedRated = req.body.rated;
    let requestedReleased = req.body.released;
    let requestedRuntime = req.body.runtime;
    let requestedGenre = requ.body.genre;
    let requestedDirector = req.body.director;
    let requestedWriter = req.body.writer;
    let requestedActors = req.body.actors;
    let requestedPlot = req.body.plot;
    let requestedLanguage = req.body.language;
    let requestedCountry = req.body.country;
    let requestedAwards = req.body.awards


    }
     
        let newMovies = {

            "id":  Math.random().toString(32).substr(2, 6) ,
            "title": requestedTitle,
            "year": requestedYear,
            "rated": requestedRated,
            "released": requestedReleased,
            "runtime": requestedRuntime,
            "genre": requestedGenre,
            "director": requestedDirector,
            "writer": requestedWriter,
            "actors": requestedActors,
            "plot": requestedPlot,
            "language": requestedLanguage,
            "country": requesteCountry,
            "awards": requestedAwards
        }

    movies.push(newMovies);


    res.status(201).send({
        "mensagem": "Post criado com sucesso",
        newMovies
    });



    const replaceMovies = (req, res) => {

        let requestedId = req.params.id;
        let movieFromBody = req.body;

        let filteredPost = movies.find(filme => filme.id == requestedId);

        let updateMovie = {
            "id": filteredPost.id,
            "title": movieFromBody.title,
            "year": filteredPost.year,
            "rated": movieFromBody.rated,
            "released": movieFromBody.released,
            "runtime": movieFromBody.runtime,
            "genre": movieFromBody.genero,
            "director": movieFromBody.director,
            "writer": movieFromBody.writer,
            "actors": movieFromBody.actors,
            "plot": movieFromBody.plot,
            "language": movieFromBody.linguagem,
            "country": movieFromBody.country,
            "awards": movieFromBody.awards,
        }

        const indice = movies.indexOf(filteredPost);
        movies.splice(indice, 1, updateMovie);
        res.status(200).send({
            "mensagem": "Post substituído com sucesso",
            updateMovie
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
        apagarmovie,
        createMovies,
        replaceMovies,
        updateTitle,
        updateAnything,
    }
}
