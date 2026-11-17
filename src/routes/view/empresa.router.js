import { Router } from "express";
import {
    mostrarEmpresas,
    mostrarEmpresaPorID,
    mostrarFormularioCrear,
    guardarEmpresa,
    mostrarFormularioEditar,
    guardarCambiosEmpresa,
    borrarEmpresaDesdeVista
} from "../../controllers/empresa/empresa.view.controller.js";

const router = Router();

router.get("/", mostrarEmpresas);
router.get("/new", mostrarFormularioCrear);
router.get("/:id", mostrarEmpresaPorID);
router.get("/:id/edit", mostrarFormularioEditar);

router.post("/", guardarEmpresa);
router.post("/:id/edit", guardarCambiosEmpresa);
router.post("/:id/delete", borrarEmpresaDesdeVista);

export default router;