import { Router } from "express";

import usuarioRouter from "./usuario.router.js";

const router = Router();

router.get("/", (req, res) => {
    res.json({ message: "Hello from api" })
})

router.use("/user",usuarioRouter);

export default router;