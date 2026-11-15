
import trabajadorRepository from "../../repositories/trabajador.repository.js";


// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (req,res)=>{
    const {id_usuario,cv} = req.body;
    const trabajador = await trabajadorRepository.create({
        id_usuario,
        cv
    })
    res.redirect("/trabajador/"+trabajador.idTrabajador);
}

/* const createForm = (req,res)=>{
    const roles = ["user","admin"]
    res.render("usuario/create",{roles});
} */

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async(req, res) => {
    const trabajadores = await trabajadorRepository.getAll();
    res.render("trabajador/list",{trabajadores})
};

// endpoint dato individual
const getById =async (req, res) => {
    const id = parseInt(req.params.id);
    const trabajador = await trabajadorRepository.getById(id);
    res.render("trabajador/show",{trabajador})
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update =async (req,res)=>{
    const id = req.params.id;
    const trabajador  = await trabajadorRepository.update(id,req.body);
    if(trabajador){
        res.redirect("/trabajador/"+trabajador.id);
    }else{
        res.redirect("/trabajador");
    }

}

const updateForm = async (req,res)=>{
    const id = parseInt(req.params.id);
    const trabajador  = await trabajadorRepository.getById(id);
    res.render("usuario/update", {trabajador})
}


// ------------------------ D (Delete)------------

const remove =async (req,res)=>{
    const id  = parseInt(req.params.id);
    const trabajador = await trabajadorRepository.remove(id);
    res.redirect("/trabajador");
}


export default {
    create,
    getAll,
    getById,
    update,
    // createForm,
    updateForm,
    remove
}