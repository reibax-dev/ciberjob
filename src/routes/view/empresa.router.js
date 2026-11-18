import { Router } from "express";
import empresaViewController from "../../controllers/empresa/empresa.view.controller.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";

const router = Router();

router.get("/", empresaViewController.getAll);
router.get("/new", empresaViewController.createForm);
router.get("/new/err", empresaViewController.createForm);
router.get("/:id", empresaViewController.getById);
router.get("/:id/edit", isAuthenticated, empresaViewController.updateForm);

router.post("/", empresaViewController.create);
router.post("/:id/edit", isAuthenticated, empresaViewController.update);
router.post("/:id/delete", isAuthenticated, empresaViewController.remove);

export default router;