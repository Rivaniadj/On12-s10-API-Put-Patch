const controller = require("../controllers/seriesControllers");//importei o arquivo de controller

const express = require("express");

const router = express.Router();

router.get("/", controller.home);
router.get("/todos", controller.getAll);
router.get("/titulo", controller.getByTitle);
router.get("/genero", controller.getByGenre);
router.get("/:id", controller.getById);
router.delete("/:id", controller.apagarSeries)
router.post("/create", controller.createSeries)
router.put("/:id", controller.replaceSeries)
router.patch("/:id", controller.updateTitle);
router.patch("/:id", controller.updateAnything)







module.exports = router 