


import ofertaRepository from "../../repositories/oferta.repository.js";
import categoriaRepository from "../../repositories/categoria.repository.js";
import modalidadRepository from "../../repositories/modalidad.repository.js";
import empresaRepository from "../../repositories/empresa.repository.js";


//? ++++ C ++++

//! ENDPOINT crear dato
const create = async (req, res) => {
    // const id = ofertas(ofertas.length - 1).id + 1;  // const id = ofertas.length ? ofertas[ofertas.length - 1].id + 1 : 1;
    const {nombre, id_categoria, id_empresa, descripcion, id_modalidad, salario, ubicacion, fecha} = req.body;   
    const oferta = await ofertaRepository.create ({
        nombre,
        idCategoria: id_categoria,
        idEmpresa: id_empresa,
        descripcion,
        idModalidad: id_modalidad,
        salario,
        ubicacion,
        fecha
    })
    // ofertas.push(oferta);
    res.redirect("/oferta/"+ oferta.idOfertas);
}

const createForm = async (req, res) => {
    const [categorias, modalidades, empresas] = await Promise.all([
        categoriaRepository.getAll(),
        modalidadRepository.getAll(),
        empresaRepository.getAll()
    ]);
    res.render("oferta/create", {categorias, modalidades, empresas})
}

//!? ++++ R +++++

//! ENDPOINT lista de datos
const getAll = async (req,res) => {
    const [ofertas, categorias, modalidades, empresas] = await Promise.all([
        ofertaRepository.getAll(),
        categoriaRepository.getAll(),
        modalidadRepository.getAll(),
        empresaRepository.getAll()
    ]);
    res.render("oferta/list", {ofertas, categorias, modalidades, empresas})
}

//! ENDPOINT dato individual
const getById = async (req, res) => {
    const id = parseInt(req.params.id);
    // const oferta = ofertas.find ( o => o.id === id)
    const oferta = await ofertaRepository.getById(id);
    if (!oferta) {
        return res.status(404).render("layout/errorPagina", {status: 404, mensaje: "Oferta no encontrada."});
    }
    const [categoria, modalidad, empresa] = await Promise.all([
        categoriaRepository.getById(oferta.idCategoria),
        modalidadRepository.getById(oferta.idModalidad),
        empresaRepository.getById(oferta.idEmpresa)
    ]);
    res.render("oferta/show", {oferta, categoria, modalidad, empresa});
}

//? ++++ U ++++

//! ENDPOINT para cambiar dato por completo
const update = async (req,res) => {
    const id = parseInt(req.params.id);
    // const oferta = ofertas.find ( u => u.id === id)
    const oferta = await ofertaRepository.update(id, req.body);
    // const {nombre, id_categoria, id_empresa, descripcion, id_modalidad, salario, ubicacion, fecha} = req.body;
    if (oferta) {
        // oferta.nombre = nombre;
        // oferta.idCategoria = id_categoria;
        // oferta.idEmpresa = id_empresa;
        // oferta.descripcion = descripcion;
        // oferta.idModalidad = id_modalidad;
        // oferta.salario = salario;
        // oferta.ubicacion = ubicacion;
        // oferta.fecha = fecha;
        // await oferta.save();
        res.redirect("/oferta/" + oferta.idOfertas);   
    } else {
        res.redirect("/oferta");
    }    
};

const updateForm = async (req, res) => {
    const id = parseInt(req.params.id);
    // const oferta = ofertas.find ( u => u.id === id);
    const oferta = await ofertaRepository.getById(id); 
    if (!oferta) {
        return res.status(404).render("layout/errorPagina", {status: 404, mensaje: "Oferta no encontrada."});
    }
    const [categorias, modalidades, empresas] = await Promise.all([
        categoriaRepository.getAll(),
        modalidadRepository.getAll(),
        empresaRepository.getAll()
    ]);
    res.render("oferta/update", {oferta, categorias, modalidades, empresas});
}

//? ++++ D ++++

const remove = async (req,res) => {
    const id = parseInt(req.params.id);
    // const index = ofertas.findIndex(o => o.id === id);
    const oferta = await ofertaRepository.remove(id);
    // if (oferta) {
    //     await oferta.destroy()
    // }
    res.redirect("/oferta");
}    
    // let oferta;
    // if (index > -1 ) {
    //     oferta = ofertas.splice(index, 1);
    // }
    
    



export default {
    create,
    getAll,
    getById,
    update,
    createForm,
    updateForm,
    remove
};
