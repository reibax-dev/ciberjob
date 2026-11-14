import usuarioRepository from "../../repositories/usuario.repository.js";


// ------------------ CRUD de user ----------------------------
// ------------------ C (Create)
// endpoint para crear dato

const create = async(req,res)=>{
    const user = await  usuarioRepository.create(req.body);
    res.json({data:user})
}

// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async(req, res) => {
    const users = await usuarioRepository.getAll();
    res.json({ data: users })
};

// endpoint dato individual
const getById = async(req, res) => {
    const id = parseInt(req.params.id);
    const user = await usuarioRepository.getById(id);
    res.json({ data: user })
};

// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update = async(req,res)=>{
    const id = parseInt(req.params.id);
    const user = await usuarioRepository.update(id,req.body);
    res.json({data:user});
}

// endpoint para cambiar parte del dato
const modify =async (req,res)=>{
    const id = parseInt(req.params.id);
    const user  = await usuarioRepository.modify(id,req.body);
    res.json({data:user});
}

// ------------------------ D (Delete)------------

const remove = async(req,res)=>{
    const id  = parseInt(req.params.id);
    const user = await usuarioRepository.remove(id);
    res.json({data: user})
}



export default {
    create,
    getAll,
    getById,
    update,
    remove
}
