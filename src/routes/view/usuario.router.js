import { Router } from "express";
import usuarioViewController from "../../controllers/usuario/usuario.view.controller.js";

const router = Router();

// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato

// vista de formulario
router.get("/new",usuarioViewController.createForm);

// creación de dato
router.post("/",usuarioViewController.create);

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
router.get("/",usuarioViewController.getAll);

// endpoint dato individual
router.get("/:id", usuarioViewController.getById)

// ---------------- U (Update) -----------------------------------

// vista de actualización de usuario
router.get("/:id/edit",usuarioViewController.updateForm);

// endpoint para cambiar dato por completo
router.post("/:id/edit",usuarioViewController.update)



// ------------------------ D (Delete)------------


router.post("/:id/delete",usuarioViewController.remove)


export default router;