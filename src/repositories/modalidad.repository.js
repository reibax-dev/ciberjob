
import { Modalidad, Usuario } from "../models/index.js";


// ------------------ CRUD de modalidad ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (data)=>{
    const modalidad = await Modalidad.create(data)
    return modalidad;
}


// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async() => {
    const modalidades = await Modalidad.findAll();
    return modalidades;
};

// endpoint dato individual
const getById = async (id) => {
    const modalidad = await Modalidad.findByPk(id);
    return modalidad;
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update =async (id, data)=>{
    const {nombre} = data;
    const modalidad  = await Modalidad.findByPk(id);
    if(modalidad){
        modalidad.nombre = nombre;
        await modalidad.save();
        return modalidad;
    }else{
        return null;
    }

}

const modify = async (id,data)=>{
    const {nombre,descripcion} = data;
    const modalidad  = await Modalidad.findByPk(id);
    if(!modalidad){
        return null;
    }
    modalidad.nombre = nombre || modalidad.nombre;
    await modalidad.save();
    return modalidad;
}




// ------------------------ D (Delete)------------

const remove =async (id)=>{
    const modalidad = await Modalidad.findByPk(id);
    if(modalidad){
        await modalidad.destroy();
        return modalidad;
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