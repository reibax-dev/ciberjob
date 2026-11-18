import { Router } from "express";
import usuarioViewController from "../../controllers/usuario/usuario.view.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";
import { validarId } from "../../middlewares/id.middleware.js";

const router = Router();

// comprueba que el :id es un número válido antes de llegar al controlador
router.param("id", validarId);

// todas las rutas de usuarios necesitan sesión iniciada
router.use(isAuthenticated);

// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato

// vista de formulario
router.get("/new",usuarioViewController.createForm);

router.get("/new/err",usuarioViewController.createForm);

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