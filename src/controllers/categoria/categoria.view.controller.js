
import categoriaRepository from "../../repositories/categoria.repository.js";


// ------------------ CRUD de categoria ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (req,res)=>{

    const categoria = await categoriaRepository.create({...req.body,userId:1})
    res.redirect("/categoria/"+categoria.idCategoria);
}

const createForm = (req,res)=>{
    res.render("categoria/create");
}

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async(req, res) => {
    const categoria = await categoriaRepository.getAll();
    res.render("categoria/list",{categoria})
};

// endpoint dato individual
const getById =async (req, res) => {
    const idCategoria = parseInt(req.params.idCategoria);
    const categoria = await categoriaRepository.getById(idCategoria);
    res.render("categoria/show",{categoria})
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update =async (req,res)=>{
    const idCategoria = req.params.idCategoria;
    const categoria  = await categoriaRepository.update(idCategoria,req.body);
    if(categoria){
        res.redirect("/categoria/"+categoria.idCategoria);
    }else{
        res.redirect("/categoria");
    }

}

const updateForm = async (req,res)=>{
    const idCategoria = parseInt(req.params.idCategoria);
    const categoria  = await categoriaRepository.getById(idCategoria);
    res.render("categoria/update", {categoria})
}


// ------------------------ D (Delete)------------

const remove =async (req,res)=>{
    const idCategoria  = parseInt(req.params.idCategoria);
    const categoria = await categoriaRepository.remove(idCategoria);
    res.redirect("/categoria");
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