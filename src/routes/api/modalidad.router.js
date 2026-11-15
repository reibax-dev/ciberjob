import { Router} from "express";
import modalidadApiControler from "../../controllers/modalidad/modalidad.api.controller.js";

const router = Router();


//? ++++ C ++++

//! ENDPOINT crear dato
router.post("/", modalidadApiControler.create);

//!? ++++ R +++++

//! ENDPOINT lista de datos
router.get("/", modalidadApiControler.getAll);

//! ENDPOINT dato individual
router.get("/:id", modalidadApiControler.getById);

//? ++++ U ++++

//! ENDPOINT para cambiar dato por completo
router.put("/:id", modalidadApiControler.update);


//! ENDPOINT para cambiar parte del dato
router.patch("/:id", modalidadApiControler.modify);

//? ++++ D ++++

router.delete("/:id", modalidadApiControler.remove);


export default router;
