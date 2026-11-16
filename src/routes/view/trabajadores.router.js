import { Router } from "express";
import trabajadorViewController from "../../controllers/trabajador/trabajador.view.controller.js";

const router = Router();

// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato

// vista de formulario
router.get("/new",trabajadorViewController.createForm);

// creación de dato
router.post("/",trabajadorViewController.create);

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
router.get("/",trabajadorViewController.getAll);

// endpoint dato individual
router.get("/:id", trabajadorViewController.getById)

// ---------------- U (Update) -----------------------------------

// vista de actualización de usuario
router.get("/:id/edit",trabajadorViewController.updateForm);

// endpoint para cambiar dato por completo
router.post("/:id/edit",trabajadorViewController.update)



// ------------------------ D (Delete)------------


router.post("/:id/delete",trabajadorViewController.remove)


export default router;