
import trabajadorRepository from "../../repositories/trabajador.repository.js";
import usuarioRepository from "../../repositories/usuario.repository.js";


// ------------------ CRUD de trabajador ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (req,res)=>{
    //Generación de Usuario
    const { nombre, email, contrasenia, contraseniaRepeat, telefono } = req.body;
    let idUser;
    if (contrasenia !== contraseniaRepeat) {
        return res.redirect("/trabajador/new/err");
    } else {
        const user = await usuarioRepository.create({
            nombre,
            email,
            contrasenia,
            telefono,
            admin:false
        })
        idUser = user.idUsuario;
        //res.redirect("/trabajador/" + user.idUsuario);
    }
    //Generación de trabajador (y asociación de usuario)
    const {cv} = req.body;
    const trabajador = await trabajadorRepository.create({
        idUsuario: idUser,
        cv
    });
    res.redirect("/trabajador/"+trabajador.idTrabajador);
}

const createForm = (req,res)=>{
    res.render("trabajador/create");
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
    const trabajador  = await trabajadorRepository.update(id,req.body);
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
