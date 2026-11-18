import { Router} from "express";
import modalidadViewControler from "../../controllers/modalidad/modalidad.view.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { validarId } from "../../middlewares/id.middleware.js";

const router = Router();

// comprueba que el :id es un número válido antes de llegar al controlador
router.param("id", validarId);


//? ++++ C ++++

//! ENDPOINT crear dato

//* Vista de formulario 
router.get("/new", isAuthenticated, modalidadViewControler.createForm);

//! Creación de modalidad
router.post("/", isAuthenticated, modalidadViewControler.create);

//!? ++++ R +++++

//! ENDPOINT lista de datos
router.get("/", modalidadViewControler.getAll);

//! ENDPOINT dato individual
router.get("/:id", modalidadViewControler.getById);

//? ++++ U ++++

//* Vista de actualizacion nde usuario
router.get("/:id/edit", isAuthenticated, modalidadViewControler.updateForm);
//! ENDPOINT para cambiar dato por completo
router.post("/:id/edit", isAuthenticated, modalidadViewControler.update);

//? ++++ D ++++

router.post("/:id/delete", isAuthenticated, modalidadViewControler.remove);


export default router;
