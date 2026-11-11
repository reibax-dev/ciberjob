
import { usuarios } from "../../models/usuarios.js";


// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = (req,res)=>{
    const id =usuarios[usuarios.length-1].id + 1
    const {nombre,email,contrasenia,telefono,admin} = req.body;
    const usuario = {
        id_usuario,
        nombre,
        email,
        contrasenia,
        telefono,
        admin
    }
    usuarios.push(usuario)
    res.redirect("/usuario/"+id);
}

const createForm = (req,res)=>{
    const roles = ["usuario","admin"]
    res.render("usuario/create",{roles});
}

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = (req, res) => {
    res.render("usuario/list",{usuarios})
};

// endpoint dato individual
const getById =(req, res) => {
    const id = parseInt(req.params.id);
    const usuario = usuarios.find(u=>u.id===id)
    res.render("usuario/show",{usuario})
};



// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update =(req,res)=>{
    const {nombre,email,contrasenia,telefono,admin} = req.body;
    const id = req.params.id;
    const usuario  = users.find(u=>u.id===id)
    usuario.nombre = nombre;
    usuario.email = email;
    usuario.contrasenia = contrasenia;
    usuario.telefono = telefono;
    usuario.admin = admin;
    res.redirect("/usuario/"+usuario.id_usuario);
}

const updateForm = (req,res)=>{
    const id = req.params.id;
    const usuario  = usuarios.find(u=>u.id===id)
    res.render("usuario/update", {usuario})
}

// endpoint para cambiar parte del dato
/* const modify =(req,res)=>{
    const {nombre,email,contrasenia,telefono,admin} = req.body;
    const id = req.params.id;
    const usuario  = users.find(u=>u.id===id)

    usuario.nombre = nombre || usuario.noumber;
    usuario.email = email || usuario.email;
    usuario.contrasenia = contrasenia || usuario.contrasenia;
    usuario.telefono = telfono || usuario.telefono;
    usuario.admin = admin || usuario.admin;
    res.json({data:usuario});
} */

// ------------------------ D (Delete)------------

const remove =(req,res)=>{
    const id  = parseInt(req.params.id);
    const index = usuarios.findIndex(u=>u.id === id);
    let usuario;
    if(index > -1){
        usuario =usuarios.splice(index,1);
    }
    res.redirect("/usuario");
}


export default {
    create,
    createForm,
    getAll,
    getById,
    update,
    updateForm,
    remove
}