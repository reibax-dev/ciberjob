import { Router } from "express";
import trabajadorViewController from "../../controllers/trabajador/trabajador.view.controller.js";
import { isAuthenticated, isAdmin, isPropioOAdmin } from "../../middlewares/auth.middleware.js";
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

// a partir de aquí hace falta sesión (el registro de arriba es público)
router.use(isAuthenticated);

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
router.get("/",isAdmin,trabajadorViewController.getAll);

// endpoint dato individual
router.get("/:id", isPropioOAdmin("Trabajador"), trabajadorViewController.getById)

// ---------------- U (Update) -----------------------------------

// vista de actualización de usuario
router.get("/:id/edit",isPropioOAdmin("Trabajador"),trabajadorViewController.updateForm);

// endpoint para cambiar dato por completo
router.post("/:id/edit",isPropioOAdmin("Trabajador"),trabajadorViewController.update)



// ------------------------ D (Delete)------------


router.post("/:id/delete",isAdmin,trabajadorViewController.remove)


export default router;