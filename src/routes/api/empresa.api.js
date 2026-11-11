

import { Router} from "express";
import { empresa} from "../../models.js";

const router = Router();

//! Prueba 
router.get("/", (req,res) => {
    res.json ({message:"Puta from empresa API"})
})



export default router;