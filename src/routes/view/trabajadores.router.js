import { Router } from "express";
import trabajadorViewController from "../../controllers/trabajador/trabajador.view.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { validarId } from "../../middlewares/id.middleware.js";

const router = Router();

// comprueba que el :id es un número válido antes de llegar al controlador
router.param("id", validarId);

// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato

// vista de formulario
router.get("/new",trabajadorViewController.createForm);

router.get("/new/err",trabajadorViewController.createForm);

// creación de dato
router.post("/",trabajadorViewController.create);

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
router.get("/",trabajadorViewController.getAll);

// endpoint dato individual
router.get("/:id", trabajadorViewController.getById)

// ---------------- U (Update) -----------------------------------

// vista de actualización de usuario
router.get("/:id/edit",isAuthenticated,trabajadorViewController.updateForm);

// endpoint para cambiar dato por completo
router.post("/:id/edit",isAuthenticated,trabajadorViewController.update)



// ------------------------ D (Delete)------------


router.post("/:id/delete",isAuthenticated,trabajadorViewController.remove)


export default router;