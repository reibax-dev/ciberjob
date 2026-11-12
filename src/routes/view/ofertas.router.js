import { Router} from "express";
import ofertaViewControler from "../../controllers/oferta/oferta.view.contoller.js";

const router = Router();


//? ++++ C ++++

//! ENDPOINT crear dato

//* Vista de formulario 
router.get("/new", ofertaViewControler.createForm);

//! Creación de oferta
router.post("/", ofertaViewControler.create);

//!? ++++ R +++++

//! ENDPOINT lista de datos
router.get("/", ofertaViewControler.getAll);

//! ENDPOINT dato individual
router.get("/:id", ofertaViewControler.getById);

//? ++++ U ++++

//* Vista de actualizacion nde usuario
router.get("/:id/edit", ofertaViewControler.updateForm);
//! ENDPOINT para cambiar dato por completo
router.post("/:id/edit", ofertaViewControler.update);

//? ++++ D ++++

router.post("/:id/delete", ofertaViewControler.remove);


export default router;
