import { Router } from "express";
import empresaViewController from "../../controllers/empresa/empresa.view.controller.js";

const router = Router();

router.get("/", empresaViewController.getAll);
router.get("/new", empresaViewController.createForm);
router.get("/:id", empresaViewController.getById);
router.get("/:id/edit", empresaViewController.updateForm);

router.post("/", empresaViewController.create);
router.post("/:id/edit", empresaViewController.update);
router.post("/:id/delete", empresaViewController.remove);

export default router;