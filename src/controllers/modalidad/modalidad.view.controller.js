
import modalidadRepository from "../../repositories/modalidad.repository.js";


// ------------------ CRUD de modalidad ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (req,res)=>{
    const modalidad = await modalidadRepository.create(req.body)
    res.redirect("/modalidad/"+modalidad.idModalidad);
}

const createForm = (req,res)=>{
    res.render("modalidad/create");
}

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async (req, res) => {
    const modalidades = await modalidadRepository.getAll();
    res.render("modalidad/list",{modalidades})
};

// endpoint dato individual
const getById = async (req, res) => {
    const idModalidad = parseInt(req.params.id);
    const modalidad = await modalidadRepository.getById(idModalidad);
    res.render("modalidad/show",{modalidad})
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update = async (req,res)=>{
    const idModalidad = req.params.id;
    const modalidad  = await modalidadRepository.update(idModalidad,req.body);
    if(modalidad){
        res.redirect("/modalidad/"+modalidad.idModalidad);
    }else{
        res.redirect("/modalidad");
    }
}

const updateForm = async (req,res)=>{
    const idModalidad = parseInt(req.params.id);
    const modalidad  = await modalidadRepository.getById(idModalidad);
    if(!modalidad){
        return res.status(404).render("layout/errorPagina", {status: 404, mensaje: "Modalidad no encontrada."});
    }
    res.render("modalidad/update", {modalidad})
}


// ------------------------ D (Delete)------------

const remove = async (req,res)=>{
    const idModalidad  = parseInt(req.params.id);
    await modalidadRepository.remove(idModalidad);
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
