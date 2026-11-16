import { Router } from "express";
import usuarioRouter from "./usuario.router.js";
import ofertaRouter from "./oferta.router.js";
import categoriaRouter from "./categoria.router.js";
import modalidadRouter from "./modalidad.router.js";


const router  = Router();

router.get("/", (req, res) => {
    res.send("<h1 style='background-color:#fabada;'>Puta from view</h1>")
})

router.use("/usuario",usuarioRouter);
router.use("/oferta", ofertaRouter);
router.use("/categoria",categoriaRouter);
router.use("/modalidad",modalidadRouter);


export default router;