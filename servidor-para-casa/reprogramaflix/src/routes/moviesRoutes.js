const controller = require("../controllers/moviesControllers"); // importei o arquivo de controller

const express = require("express");
const router = express.Router();

router.get("/", controller.home);
router.get("/todos", controller.getAll);
router.get("/titulo", controller.getByTitle)
router.get("/genero", controller.getByGenre)
router.delete("/:id", controller.apagarmovie)
router.post("/create", controller.createMovies)
router.put("/:id", controller.replaceMovies)
router.patch("/:id", controller.updateTitle);
router.patch("/:id", controller.updateAnything)
router.get("/:id", controller.getById)


module.exports = router