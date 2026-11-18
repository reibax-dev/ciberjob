import { Router } from "express";
import empresaViewController from "../../controllers/empresa/empresa.view.controller.js";
import { isAuthenticated, isAdmin, isPropioOAdmin } from "../../middlewares/auth.middleware.js";

const router = Router();

// registro de empresas: público
router.get("/new", empresaViewController.createForm);
router.get("/new/err", empresaViewController.createForm);
router.post("/", empresaViewController.create);

// a partir de aquí hace falta sesión
router.use(isAuthenticated);

router.get("/", isAdmin, empresaViewController.getAll);
router.get("/:id", empresaViewController.getById);
router.get("/:id/edit", isPropioOAdmin("Empresa"), empresaViewController.updateForm);

router.post("/:id/edit", isPropioOAdmin("Empresa"), empresaViewController.update);
router.post("/:id/delete", isAdmin, empresaViewController.remove);

export default router;