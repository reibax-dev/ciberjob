import { Router } from "express";
import usuarioRouter from "./usuario.router.js";
import ofertaRouter from "./oferta.router.js";
import categoriaRouter from "./categoria.router.js";
import modalidadRouter from "./modalidad.router.js";
import trabajadoresRouter from "./trabajadores.router.js";
import empresaRouter from "./empresa.router.js";
import authRouter from "./auth.router.js";
import { isAuthenticated } from "../../middlewares/auth.middleware.js";


const router = Router();

router.get("/", (req, res) => {
    res.render("index", {message: req.query.message});
})

router.use("/usuario", usuarioRouter);
router.use("/oferta", ofertaRouter);
router.use("/categoria", categoriaRouter);
router.use("/modalidad", modalidadRouter);
router.use("/trabajador", trabajadoresRouter);
router.use("/empresa", empresaRouter);
router.use("/auth",authRouter);


export default router;