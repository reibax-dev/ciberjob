import { Router } from "express";
import trabajadorApiController from "../../controllers/trabajador/trabajador.api.controller.js";

const router = Router();

// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
router.post("/",trabajadorApiController.create)

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
router.get("/",trabajadorApiController.getAll);

// endpoint dato individual
router.get("/:id", trabajadorApiController.getById)

// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
router.put("/:id",trabajadorApiController.update)

// endpoint para cambiar parte del dato
router.patch("/:id",trabajadorApiController.modify)

// ------------------------ D (Delete)------------

router.delete("/:id",trabajadorApiController.remove)


export default router;