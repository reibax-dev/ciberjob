
import { Router} from "express";
import { usuarios } from "../../models/index.js";

const router = Router();

//! Prueba 
router.get("/", (req,res) => {
    res.json ({message:"Puta from usuario API"})
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    res.json({ message: `Puta from usuario ${id}`})
})


export default router;