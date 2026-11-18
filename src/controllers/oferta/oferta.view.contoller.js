


import ofertaRepository from "../../repositories/oferta.repository.js";
import categoriaRepository from "../../repositories/categoria.repository.js";
import modalidadRepository from "../../repositories/modalidad.repository.js";
import empresaRepository from "../../repositories/empresa.repository.js";
import ofertaTrabajadorRepository from "../../repositories/ofertaTrabajador.repository.js";

// El admin puede gestionar cualquier oferta; la empresa solo las suyas
const puedeGestionar = (usuario, oferta) => {
    return usuario.admin || (usuario.rol === "Empresa" && usuario.idTipo === oferta.idEmpresa);
}


//? ++++ C ++++

//! ENDPOINT crear dato
const create = async (req, res) => {
    // const id = ofertas(ofertas.length - 1).id + 1;  // const id = ofertas.length ? ofertas[ofertas.length - 1].id + 1 : 1;
    const {nombre, id_categoria, id_empresa, descripcion, id_modalidad, salario, ubicacion, fecha} = req.body;   
    const usuario = req.session.usuario;
    const oferta = await ofertaRepository.create ({
        nombre,
        idCategoria: id_categoria,
        idEmpresa: usuario.rol === "Empresa" ? usuario.idTipo : id_empresa,   //* la empresa publica siempre a su nombre
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
    res.render("oferta/create", {categorias, modalidades, empresas: req.session.usuario.rol === "Empresa" ? null : empresas})
}

//!? ++++ R +++++

//! ENDPOINT lista de datos
const getAll = async (req,res) => {
    const usuario = req.session.usuario;
    // la empresa solo ve sus ofertas; trabajador y admin las ven todas
    const filtro = (usuario.rol === "Empresa" && !usuario.admin) ? {idEmpresa: usuario.idTipo} : {};
    const [ofertas, categorias, modalidades, empresas, idsInscritas] = await Promise.all([
        ofertaRepository.getAll(filtro),
        categoriaRepository.getAll(),
        modalidadRepository.getAll(),
        empresaRepository.getAll(),
        usuario.rol === "Trabajador" ? ofertaTrabajadorRepository.getIdsOfertas(usuario.idTipo) : []
    ]);
    res.render("oferta/list", {ofertas, categorias, modalidades, empresas: usuario.rol === "Empresa" ? null : empresas, idsInscritas})
}

//! ENDPOINT dato individual
const getById = async (req, res) => {
    const id = parseInt(req.params.id);
    // const oferta = ofertas.find ( o => o.id === id)
    const oferta = await ofertaRepository.getById(id);
    if (!oferta) {
        return res.status(404).render("layout/errorPagina", {status: 404, mensaje: "Oferta no encontrada."});
    }
    const usuario = req.session.usuario;
    // una empresa no puede ver las ofertas de otra
    if (usuario.rol === "Empresa" && !puedeGestionar(usuario, oferta)) {
        return res.status(403).render("layout/errorPagina", {status: 403, mensaje: "Solo puedes gestionar las ofertas de tu empresa."});
    }
    const inscrito = usuario.rol === "Trabajador" && oferta.trabajadores.some(t => t.idTrabajador === usuario.idTipo);
    // los inscritos solo los ven la empresa dueña y el admin
    const inscritos = puedeGestionar(usuario, oferta) ? oferta.trabajadores : null;
    res.render("oferta/show", {oferta, categoria: oferta.categorias, modalidad: oferta.modalidades, empresa: oferta.empresas, inscrito, inscritos});
}

//? ++++ U ++++

//! ENDPOINT para cambiar dato por completo
const update = async (req,res) => {
    const id = parseInt(req.params.id);
    const usuario = req.session.usuario;
    const ofertaActual = await ofertaRepository.getById(id);
    if (!ofertaActual) {
        return res.status(404).render("layout/errorPagina", {status: 404, mensaje: "Oferta no encontrada."});
    }
    if (!puedeGestionar(usuario, ofertaActual)) {
        return res.status(403).render("layout/errorPagina", {status: 403, mensaje: "Solo puedes gestionar las ofertas de tu empresa."});
    }
    if (usuario.rol === "Empresa") {
        req.body.id_empresa = usuario.idTipo;       //* la empresa no puede pasar la oferta a otra
    }
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
    if (!puedeGestionar(req.session.usuario, oferta)) {
        return res.status(403).render("layout/errorPagina", {status: 403, mensaje: "Solo puedes gestionar las ofertas de tu empresa."});
    }
    const [categorias, modalidades, empresas] = await Promise.all([
        categoriaRepository.getAll(),
        modalidadRepository.getAll(),
        empresaRepository.getAll()
    ]);
    res.render("oferta/update", {oferta, categorias, modalidades, empresas: req.session.usuario.rol === "Empresa" ? null : empresas});
}

//? ++++ D ++++

const remove = async (req,res) => {
    const id = parseInt(req.params.id);
    // const index = ofertas.findIndex(o => o.id === id);
    const ofertaActual = await ofertaRepository.getById(id);
    if (!ofertaActual) {
        return res.status(404).render("layout/errorPagina", {status: 404, mensaje: "Oferta no encontrada."});
    }
    if (!puedeGestionar(req.session.usuario, ofertaActual)) {
        return res.status(403).render("layout/errorPagina", {status: 403, mensaje: "Solo puedes gestionar las ofertas de tu empresa."});
    }
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
    
    



//? ++++ Inscripciones (trabajador) ++++

//! Inscribirse en una oferta
const inscribir = async (req, res) => {
    const id = parseInt(req.params.id);
    const oferta = await ofertaRepository.getById(id);
    if (!oferta) {
        return res.status(404).render("layout/errorPagina", {status: 404, mensaje: "Oferta no encontrada."});
    }
    await ofertaTrabajadorRepository.inscribir(id, req.session.usuario.idTipo);
    res.redirect(req.get("Referrer") || "/oferta/" + id);
}

//! Darse de baja de una oferta
const baja = async (req, res) => {
    const id = parseInt(req.params.id);
    await ofertaTrabajadorRepository.baja(id, req.session.usuario.idTipo);
    res.redirect(req.get("Referrer") || "/oferta/" + id);
}

//! Ofertas en las que está inscrito el trabajador
const inscripciones = async (req, res) => {
    const idsInscritas = await ofertaTrabajadorRepository.getIdsOfertas(req.session.usuario.idTipo);
    const ofertas = await ofertaRepository.getAll({idOfertas: idsInscritas});
    res.render("oferta/inscripciones", {ofertas, idsInscritas});
}


export default {
    create,
    getAll,
    getById,
    update,
    createForm,
    updateForm,
    remove,
    inscribir,
    baja,
    inscripciones
};
