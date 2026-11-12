

import { Router} from "express";
import { trabajadores } from "../../models/index.js";

const router = Router();

//! Prueba 
router.get("/", (req,res) => {
    res.json ({message:"Puta from trabajador API"})
})



export default router;