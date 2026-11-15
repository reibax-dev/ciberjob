import { Router} from "express";
import categoriaViewControler from "../../controllers/categoria/categoria.view.contoller.js";

const router = Router();


//? ++++ C ++++

//! ENDPOINT crear dato

//* Vista de formulario 
router.get("/new", categoriaViewControler.createForm);

//! Creación de categoria
router.post("/", categoriaViewControler.create);

//!? ++++ R +++++

//! ENDPOINT lista de datos
router.get("/", categoriaViewControler.getAll);

//! ENDPOINT dato individual
router.get("/:id", categoriaViewControler.getById);

//? ++++ U ++++

//* Vista de actualizacion nde usuario
router.get("/:id/edit", categoriaViewControler.updateForm);
//! ENDPOINT para cambiar dato por completo
router.post("/:id/edit", categoriaViewControler.update);

//? ++++ D ++++

router.post("/:id/delete", categoriaViewControler.remove);


export default router;
