import { Router} from "express";
import { ofertas} from "../../models.js";  //* donde se almacenan los datos del array

const router = Router();


//? ++++ C ++++

//! ENDPOINT crear dato
router.post("/", (req, res) => {
    const id = ofertas(ofertas.length - 1).id + 1; 
    const {nombre, id_categoria, id_empresa, descripcion, id_modalidad, salario, ubicacion, fecha} = req.body;
    // const id = ofertas.length ? ofertas[ofertas.length - 1].id + 1 : 1;
    const oferta = {
        id,
        nombre,
        id_categoria,
        id_empresa,
        descripcion,
        id_modalidad,
        salario,
        ubicacion,
        fecha
    }
    ofertas.push(oferta);
    res.json({data: oferta})
})

//!? ++++ R +++++

//! ENDPOINT lista de datos
router.get("/", (req,res) => {
    res.json ({ data: ofertas})
})

//! ENDPOINT dato individual
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const oferta = ofertas.find ( o => o.id === id)
    res.json({ data: oferta})
})

//? ++++ U ++++

//! ENDPOINT para cambiar dato por completo
router.put("/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const oferta = ofertas.find ( u => u.id === id)
    const {nombre, id_categoria, id_empresa, descripcion, id_modalidad, salario, ubicacion, fecha} = req.body;

    oferta.nombre = nombre;
    oferta.id_categoria = id_categoria;
    oferta.id_empresa = id_empresa;
    oferta.descripcion = descripcion;
    oferta.id_modalidad = id_modalidad;
    oferta.salario = salario;
    oferta.ubicacion = ubicacion;
    oferta.fecha = fecha;
    res.json({data: oferta})
})


//! ENDPOINT para cambiar parte del dato
router.patch("/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const oferta = ofertas.find ( o => o.id === id)
    const {nombre, id_categoria, id_empresa, descripcion, id_modalidad, salario, ubicacion, fecha} = req.body;

    oferta.nombre = nombre || oferta.nombre;
    oferta.id_categoria = id_categoria || oferta.id_categoria;
    oferta.id_empresa = id_empresa || oferta.id_empresa;
    oferta.descripcion = descripcion || oferta.descripcion;
    oferta.id_modalidad = id_modalidad || oferta.id_modalidad;
    oferta.salario = salario || oferta.salario;
    oferta.ubicacion = ubicacion || oferta.ubicacion;
    oferta.fecha = fecha || oferta.fecha;
    res.json({data: oferta})
})

//? ++++ D ++++

router.delete("/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const index = ofertas.findIndex(o => o.id === id);
    const [oferta] = ofertas.splice(index, 1);
    res.json({data: oferta})
})


export default router;
