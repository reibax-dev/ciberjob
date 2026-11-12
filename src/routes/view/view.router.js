import { Router } from "express";
import usuarioRouter from "./usuario.router.js";


const router  = Router();

router.get("/", (req, res) => {
    res.send("<h1 style='background-color:#fabada;'>Hello from view</h1>")
})

router.use("/usuario",usuarioRouter);


export default router;