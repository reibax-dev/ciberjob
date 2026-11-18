import { Router} from "express";
import categoriaViewControler from "../../controllers/categoria/categoria.view.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { validarId } from "../../middlewares/id.middleware.js";

const router = Router();

// comprueba que el :id es un número válido antes de llegar al controlador
router.param("id", validarId);


//? ++++ C ++++

//! ENDPOINT crear dato

//* Vista de formulario 
router.get("/new", isAuthenticated, categoriaViewControler.createForm);

//! Creación de categoria
router.post("/", isAuthenticated, categoriaViewControler.create);

//!? ++++ R +++++

//! ENDPOINT lista de datos
router.get("/", categoriaViewControler.getAll);

//! ENDPOINT dato individual
router.get("/:id", categoriaViewControler.getById);

//? ++++ U ++++

//* Vista de actualizacion nde usuario
router.get("/:id/edit", isAuthenticated, categoriaViewControler.updateForm);
//! ENDPOINT para cambiar dato por completo
router.post("/:id/edit", isAuthenticated, categoriaViewControler.update);

//? ++++ D ++++

router.post("/:id/delete", isAuthenticated, categoriaViewControler.remove);


export default router;
