import trabajadorRepository from "../../repositories/trabajador.repository.js";


// ------------------ CRUD de user ----------------------------
// ------------------ C (Create)
// endpoint para crear dato

const create = async(req,res)=>{
    const trabajador = await  trabajadorRepository.create(req.body);
    res.json({data: trabajador})
}

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async(req, res) => {
    const trabajadores = await trabajadorRepository.getAll();
    res.json({ data: trabajadores })
};

// endpoint dato individual
const getById = async(req, res) => {
    const id = parseInt(req.params.id);
    const trabajador = await trabajadorRepository.getById(id);
    res.json({ data: trabajador })
};

// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update = async(req,res)=>{
    const id = parseInt(req.params.id);
    const trabajador = await trabajadorRepository.update(id,req.body);
    res.json({data:trabajador});
}

// endpoint para cambiar parte del dato
const modify =async (req,res)=>{
    const id = parseInt(req.params.id);
    const trabajador  = await trabajadorRepository.modify(id,req.body);
    res.json({data: trabajador});
}

// ------------------------ D (Delete)------------

const remove = async(req,res)=>{
    const id  = parseInt(req.params.id);
    const trabajador = await trabajadorRepository.remove(id);
    res.json({data: trabajador})
}



export default {
    create,
    getAll,
    getById,
    update,
    remove
}
