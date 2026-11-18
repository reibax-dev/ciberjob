import { Router} from "express";
import ofertaViewControler from "../../controllers/oferta/oferta.view.contoller.js";
import { isAuthenticated, hasRol } from "../../middlewares/auth.middleware.js";
import { validarId } from "../../middlewares/id.middleware.js";

const router = Router();

// comprueba que el :id es un número válido antes de llegar al controlador
router.param("id", validarId);

// todas las rutas de ofertas necesitan sesión iniciada
router.use(isAuthenticated);


//? ++++ C ++++

//! ENDPOINT crear dato

//* Vista de formulario 
router.get("/new", hasRol("Empresa", "Admin"), ofertaViewControler.createForm);

//! Creación de oferta
router.post("/", hasRol("Empresa", "Admin"), ofertaViewControler.create);

//!? ++++ R +++++

//! ENDPOINT lista de datos
router.get("/", ofertaViewControler.getAll);

//! Ofertas en las que está inscrito el trabajador (antes de /:id)
router.get("/inscripciones", hasRol("Trabajador"), ofertaViewControler.inscripciones);

//! ENDPOINT dato individual
router.get("/:id", ofertaViewControler.getById);

//? ++++ U ++++

//* Vista de actualizacion nde usuario
router.get("/:id/edit", hasRol("Empresa", "Admin"), ofertaViewControler.updateForm);
//! ENDPOINT para cambiar dato por completo
router.post("/:id/edit", hasRol("Empresa", "Admin"), ofertaViewControler.update);

//? ++++ D ++++

router.post("/:id/delete", hasRol("Empresa", "Admin"), ofertaViewControler.remove);

//? ++++ Inscripciones ++++

router.post("/:id/inscribir", hasRol("Trabajador"), ofertaViewControler.inscribir);
router.post("/:id/baja", hasRol("Trabajador"), ofertaViewControler.baja);


export default router;
