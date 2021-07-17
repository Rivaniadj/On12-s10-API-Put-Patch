const express = require("express")
const router = express.Router()
const controller = require("../controllers/toDoController")

router.get("/", controller.getAll);
router.get("/:id", controller.getById);

router.post("/cadastrar", controller.createTarefa);
router.put("/:id", controller.replaceTarefa)
router.patch("/updateDescricao/:id", controller.updateDescricao);

router.delete("/:id", controller.deleteTarefa)



module.exports = router