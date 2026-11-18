import { Router} from "express";
import modalidadViewControler from "../../controllers/modalidad/modalidad.view.controller.js";
import { isAuthenticated, isAdmin } from "../../middlewares/auth.middleware.js";
import { validarId } from "../../middlewares/id.middleware.js";

const router = Router();

// comprueba que el :id es un número válido antes de llegar al controlador
router.param("id", validarId);

// la gestión de modalidades es solo para el admin
router.use(isAuthenticated, isAdmin);


//? ++++ C ++++

//! ENDPOINT crear dato

//* Vista de formulario 
router.get("/new", modalidadViewControler.createForm);

//! Creación de modalidad
router.post("/", modalidadViewControler.create);

//!? ++++ R +++++

//! ENDPOINT lista de datos
router.get("/", modalidadViewControler.getAll);

//! ENDPOINT dato individual
router.get("/:id", modalidadViewControler.getById);

//? ++++ U ++++

//* Vista de actualizacion nde usuario
router.get("/:id/edit", modalidadViewControler.updateForm);
//! ENDPOINT para cambiar dato por completo
router.post("/:id/edit", modalidadViewControler.update);

//? ++++ D ++++

router.post("/:id/delete", modalidadViewControler.remove);


export default router;
