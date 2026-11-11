import { Router} from "express";
import ofertaApiControler from "../../controllers/oferta/oferta.api.controller";

const router = Router();


//? ++++ C ++++

//! ENDPOINT crear dato

//* Vista de formulario 
router.get("/new", ofertaApiControler.createForm);

//! Creación de oferta
router.post("/", ofertaApiControler.create);

//!? ++++ R +++++

//! ENDPOINT lista de datos
router.get("/", ofertaApiControler.getAll);

//! ENDPOINT dato individual
router.get("/:id", ofertaApiControler.getById);

//? ++++ U ++++

//* Vista de actualizacion nde usuario
router.get("/:id/edit", ofertaApiControler.updateForm);
//! ENDPOINT para cambiar dato por completo
router.post("/:id/edit", ofertaApiControler.update);

//? ++++ D ++++

router.post("/:id/delete", ofertaApiControler.remove);


export default router;
