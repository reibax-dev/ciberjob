import { Router} from "express";
import categoriaApiControler from "../../controllers/categoria/categoria.api.controller.js";

const router = Router();


//? ++++ C ++++

//! ENDPOINT crear dato
router.post("/", categoriaApiControler.create);

//!? ++++ R +++++

//! ENDPOINT lista de datos
router.get("/", categoriaApiControler.getAll);

//! ENDPOINT dato individual
router.get("/:id", categoriaApiControler.getById);

//? ++++ U ++++

//! ENDPOINT para cambiar dato por completo
router.put("/:id", categoriaApiControler.update);


//! ENDPOINT para cambiar parte del dato
router.patch("/:id", categoriaApiControler.modify);

//? ++++ D ++++

router.delete("/:id", categoriaApiControler.remove);


export default router;
