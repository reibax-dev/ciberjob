//! INDEX RUTER PRINCIPAL

import { Router} from "express";
import apiRouter from "./api/api.router.js";
import viewRouter from "./view/view.router.js";

const router = Router();

router.use("/api", apiRouter);
router.use("/", viewRouter);


export default router;