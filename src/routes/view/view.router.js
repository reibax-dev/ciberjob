

import { Router} from "express";

const router = Router();



//! Prueba 
router.get("/", (req,res) => {
    res.send("<h1 style= 'background-color: #f5f';> Puta from API</h1>");
})

export default router;