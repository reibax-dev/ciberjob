import { Router} from "express";
import categoriaViewControler from "../../controllers/categoria/categoria.view.controller.js";
import { isAuthenticated, isAdmin } from "../../middlewares/auth.middleware.js";
import { validarId } from "../../middlewares/id.middleware.js";

const router = Router();

// comprueba que el :id es un número válido antes de llegar al controlador
router.param("id", validarId);

// la gestión de categorías es solo para el admin
router.use(isAuthenticated, isAdmin);


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
