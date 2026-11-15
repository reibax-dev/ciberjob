
import { Router } from "express";
import { obtenerEmpresas, obtenerEmpresaPorID, registrarEmpresa, editarEmpresa, borrarEmpresa } from "../../controllers/empresa/empresa.api.controller.js";

const router = Router();

router.get("/", obtenerEmpresas);
router.get("/:id", obtenerEmpresaPorID);

router.post("/", registrarEmpresa);

router.put("/:id", editarEmpresa);

router.delete("/:id", borrarEmpresa);

export default router;