

import { Router} from "express";
import usuarioRouter from "./usuarios.api.js";
import trabajadorRouter from "./trabajador.api.js";
import ofertasRouter from "./oferta.api.js";
import empresaRouter from "./empresa.api.js";

const router = Router();

//! Prueba 
router.get("/", (req,res) => {
    res.json ({message:"Puta from API"})
})

router.use("/usuario", usuarioRouter);
router.use("/trabajador", trabajadorRouter);
router.use("/ofertas", ofertasRouter);
router.use("/empresa", empresaRouter);

export default router;