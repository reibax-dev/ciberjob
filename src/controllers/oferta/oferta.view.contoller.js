
import { ofertas } from "../../models/index.js";


//? ++++ C ++++

//! ENDPOINT crear dato
const create = (req, res) => {
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
    res.redirect("./");
}

const createForm = (req, res) => {
    res.render("oferta/create")
}

//!? ++++ R +++++

//! ENDPOINT lista de datos
const getAll = (req,res) => {
    res.render("oferta/list", {ofertas})
}

//! ENDPOINT dato individual
const getById = (req, res) => {
    const id = parseInt(req.params.id);
    const oferta = ofertas.find ( o => o.id === id)
    res.render("oferta/show", {oferta});
}

//? ++++ U ++++

//! ENDPOINT para cambiar dato por completo
const update = (req,res) => {
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
    res.redirect("./");
}

const updateForm = (req, rest) => {
    const id = parseInt(req.params.id);
    const oferta = ofertas.find ( u => u.id === id);
    res.render("oferta/update", {oferta});
}

//? ++++ D ++++

const remove = (req,res) => {
    const id = parseInt(req.params.id);
    const index = ofertas.findIndex(o => o.id === id);
    const [oferta] = ofertas.splice(index, 1);
    res.redirect("./");
}


export default {
    create,
    getAll,
    getById,
    update,
    createForm,
    updateForm,
    remove
};
