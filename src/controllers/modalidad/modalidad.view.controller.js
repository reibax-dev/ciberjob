
import modalidadRepository from "../../repositories/modalidad.repository.js";


// ------------------ CRUD de modalidad ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (req,res)=>{

    const modalidad = await modalidadRepository.create({...req.body,userId:1})
    res.redirect("/modalidad/"+modalidad.idModalidad);
}

const createForm = (req,res)=>{
    res.render("modalidad/create");
}

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async(req, res) => {
    const modalidad = await modalidadRepository.getAll();
    res.render("modalidad/list",{modalidad})
};

// endpoint dato individual
const getById =async (req, res) => {
    const idModalidad = parseInt(req.params.idModalidad);
    const modalidad = await modalidadRepository.getById(idModalidad);
    res.render("modalidad/show",{modalidad})
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update =async (req,res)=>{
    const idModalidad = req.params.idModalidad;
    const modalidad  = await modalidadRepository.update(idModalidad,req.body);
    if(modalidad){
        res.redirect("/modalidad/"+modalidad.idModalidad);
    }else{
        res.redirect("/modalidad");
    }

}

const updateForm = async (req,res)=>{
    const idModalidad = parseInt(req.params.idModalidad);
    const modalidad  = await modalidadRepository.getById(idModalidad);
    res.render("modalidad/update", {modalidad})
}


// ------------------------ D (Delete)------------

const remove =async (req,res)=>{
    const idModalidad  = parseInt(req.params.idModalidad);
    const modalidad = await modalidadRepository.remove(idModalidad);
    res.redirect("/modalidad");
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