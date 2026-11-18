import { Trabajador } from "../models/index.js";


// ------------------ CRUD de trabajador ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (data)=>{
    const trabajador = await Trabajador.create(data)
    return trabajador;
}


// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async() => {
    const trabajadores = await Trabajador.findAll();
    return trabajadores;
};

// endpoint dato individual
const getById = async (id) => {
    const trabajador = await Trabajador.findByPk(id);
    return trabajador;
};

// endpoint dato por relación
const getByIdUsuario = async (idUsuario) => {
    try{
        const trabajador = await Trabajador.findOne({where: {idUsuario}});
        return trabajador;
    }catch (error){
        throwError(error);
    }
}

// endpoint 


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update =async (id, data)=>{
    const {idUsuario,cv} = data;
    const trabajador  = await Trabajador.findByPk(id);
    if(trabajador){
        trabajador.idUsuario = idUsuario;
        trabajador.cv = cv;
        await trabajador.save();
        return trabajador;
    }else{
        return null;
    }

}

const modify = async (id,data)=>{
    const {idUsuario,cv} = data;
    const trabajador  = await Trabajador.findByPk(id);
    if(!trabajador){
        return null;
    }
    trabajador.idUsuario = idUsuario || trabajador.idUsuario;
    trabajador.cv = cv || trabajador.cv;
    await trabajador.save();
    return trabajador;
}




// ------------------------ D (Delete)------------

const remove =async (id)=>{
    const trabajador = await Trabajador.findByPk(id);
    if(trabajador){
        await trabajador.destroy();
        return trabajador;
    }
    return null;
}


export default {
    create,
    getAll,
    getById,
    getByIdUsuario,
    update,
    modify,
    remove
}
