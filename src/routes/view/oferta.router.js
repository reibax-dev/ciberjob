import { Router} from "express";
import ofertaViewControler from "../../controllers/oferta/oferta.view.contoller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { validarId } from "../../middlewares/id.middleware.js";

const router = Router();

// comprueba que el :id es un número válido antes de llegar al controlador
router.param("id", validarId);


//? ++++ C ++++

//! ENDPOINT crear dato

//* Vista de formulario 
router.get("/new", isAuthenticated, ofertaViewControler.createForm);

//! Creación de oferta
router.post("/", isAuthenticated, ofertaViewControler.create);

//!? ++++ R +++++

//! ENDPOINT lista de datos
router.get("/", ofertaViewControler.getAll);

//! ENDPOINT dato individual
router.get("/:id", ofertaViewControler.getById);

//? ++++ U ++++

//* Vista de actualizacion nde usuario
router.get("/:id/edit", isAuthenticated, ofertaViewControler.updateForm);
//! ENDPOINT para cambiar dato por completo
router.post("/:id/edit", isAuthenticated, ofertaViewControler.update);

//? ++++ D ++++

router.post("/:id/delete", isAuthenticated, ofertaViewControler.remove);


export default router;
