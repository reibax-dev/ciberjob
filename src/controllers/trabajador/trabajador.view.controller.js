
import trabajadorRepository from "../../repositories/trabajador.repository.js";
import usuarioRepository from "../../repositories/usuario.repository.js";


// ------------------ CRUD de trabajador ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (req,res)=>{
    //Generación de Usuario y de trabajador (asociados) en una sola transacción
    const { nombre, email, contrasenia, contraseniaRepeat, telefono, cv } = req.body;
    if (contrasenia !== contraseniaRepeat) {
        return res.redirect("/trabajador/new/err");
    }
    if (await usuarioRepository.getByEmail(email) || await usuarioRepository.getByUsername(nombre)) {
        return res.redirect("/trabajador/new?error=" + encodeURIComponent("Ya existe un usuario con ese email o nombre"));
    }
    const trabajador = await trabajadorRepository.createConUsuario(
        { nombre, email, contrasenia, telefono, admin:false },
        { cv }
    );
    // al registrarse se inicia la sesión como trabajador
    if (!req.session.usuario) {
        req.session.usuario = {idUsuario: trabajador.idUsuario, nombre, admin: false, rol: "Trabajador", idTipo: trabajador.idTrabajador};
        return res.redirect("/oferta");
    }
    res.redirect("/trabajador/"+trabajador.idTrabajador);
}

const createForm = (req,res)=>{
    res.render("trabajador/create", {error: req.query.error});
}

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async(req, res) => {
    const trabajadores = await trabajadorRepository.getAll();
    const usuarios = [];
    for(let trabajador of trabajadores){
        const usuario = await usuarioRepository.getById(trabajador.idUsuario);
        usuarios.push(usuario);
    }
    res.render("trabajador/list",{trabajadores,usuarios})
};

// endpoint dato individual
const getById =async (req, res) => {
    const id = parseInt(req.params.id);
    const trabajador = await trabajadorRepository.getById(id);
    if(!trabajador){
        return res.status(404).render("layout/errorPagina", {status: 404, mensaje: "Trabajador no encontrado."});
    }
    const usuario = await usuarioRepository.getById(trabajador.idUsuario);
    res.render("trabajador/show",{trabajador,usuario})
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update =async (req,res)=>{
    const id = req.params.id;
    // solo se cambia el CV: el usuario asociado no se reasigna desde aquí
    const trabajador  = await trabajadorRepository.modify(id,{cv: req.body.cv});
    if(trabajador){
        res.redirect("/trabajador/"+trabajador.idTrabajador);
    }else{
        res.redirect("/trabajador");
    }

}

const updateForm = async (req,res)=>{
    const id = parseInt(req.params.id);
    const trabajador  = await trabajadorRepository.getById(id);
    if(!trabajador){
        return res.status(404).render("layout/errorPagina", {status: 404, mensaje: "Trabajador no encontrado."});
    }
    res.render("trabajador/update", {trabajador})
}


// ------------------------ D (Delete)------------

const remove =async (req,res)=>{
    const id  = parseInt(req.params.id);
    await trabajadorRepository.remove(id);
    res.redirect("/trabajador");
}


export default {
    create,
    getAll,
    getById,
    update,
    createForm,
    updateForm,
    remove
}
