import { Router} from "express";
import ofertaRouter from "./view/oferta.router.js";

const router = Router();


//? ++++ C ++++

//! ENDPOINT crear dato
router.post("/", ofertaApiControler.create);

//!? ++++ R +++++

//! ENDPOINT lista de datos
router.get("/", ofertaApiControler.getAll);

//! ENDPOINT dato individual
router.get("/:id", ofertaApiControler.getById);

//? ++++ U ++++

//! ENDPOINT para cambiar dato por completo
router.put("/:id", ofertaApiControler.update);


//! ENDPOINT para cambiar parte del dato
router.patch("/:id", ofertaApiControler.modify);

//? ++++ D ++++

router.delete("/:id", ofertaApiControler.remove);


export default router;
