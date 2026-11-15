import { Trabajador } from "../models/index.js";


// ------------------ CRUD de user ----------------------------

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
    const trabajador = await Trabajador.findByPk(id/* ,{
        include:{
            model: Hero,
            as: "heroes",
        } 
    }*/);
    return trabajador;
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update =async (id, data)=>{
    const {id_usuario,cv} = data;
    const trabajador  = await Usuario.findByPk(id);
    if(trabajador){
        trabajador.id_usuario = id_usuario;
        trabajador.cv = cv;
        await trabajador.save();
        return trabajador;
    }else{
        return null;
    }

}

const modify = async (id,data)=>{
    const {id_usuario,cv} = data;
    const trabajador  = await Usuario.findByPk(id);
    if(!trabajador){
        return null;
    }
    trabajador.id_usuario = id_usuario || trabajador.id_usuario;
    trabajador.cv = cv || trabajador.cv;
    await trabajador.save();
    return trabajador;
}




// ------------------------ D (Delete)------------

const remove =async (id)=>{
    const trabajador = await User.findByPk(id);
    if(user){
        await trabajador.destroy();
        return trabajador;
    }
    return null;
}


export default {
    create,
    getAll,
    getById,
    update,
    modify,
    remove
}