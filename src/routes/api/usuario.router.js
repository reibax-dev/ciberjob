import { Router } from "express";
import usuarioApiController from "../../controllers/usuario/usuario.api.controller.js";

const router = Router();

// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
router.post("/",usuarioApiController.create)

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
router.get("/",usuarioApiController.getAll);

// endpoint dato individual
router.get("/:id", usuarioApiController.getById)

// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
router.put("/:id",usuarioApiController.update)

// endpoint para cambiar parte del dato
router.patch("/:id",usuarioApiController.modify)

// ------------------------ D (Delete)------------

router.delete("/:id",usuarioApiController.remove)


export default router;