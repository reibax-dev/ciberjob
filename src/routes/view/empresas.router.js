import { Router } from "express";
import { mostrarEmpresas } from "../../controllers/empresa/empresa.view.controller.js"

const router = Router();

router.get("/", mostrarEmpresas);

export default router;