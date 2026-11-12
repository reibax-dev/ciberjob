

import { Router} from "express";
import { empresas } from "../../models/index.js";

const router = Router();

//! Prueba 
router.get("/", (req,res) => {
    res.json ({message:"Puta from empresa API"})
})



export default router;