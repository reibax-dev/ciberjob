import { Trabajador, Usuario, OfertaTrabajador } from "../models/index.js";
import sequelize from "../config/db.js";
import usuarioRepository from "./usuario.repository.js";


// ------------------ CRUD de trabajador ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (data)=>{
    const trabajador = await Trabajador.create(data)
    return trabajador;
}

// crea el usuario y su trabajador a la vez (transacción): si falla uno no se guarda ninguno
const createConUsuario = async (datosUsuario, datosTrabajador)=>{
    const trabajador = await sequelize.transaction(async (t)=>{
        const user = await usuarioRepository.create(datosUsuario, t);
        return await Trabajador.create({...datosTrabajador, idUsuario: user.idUsuario}, {transaction: t});
    });
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
        throw error;
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
        // borra también sus inscripciones y su usuario: todo o nada
        await sequelize.transaction(async (t)=>{
            await OfertaTrabajador.destroy({where: {idTrabajador: trabajador.idTrabajador}, transaction: t});
            await trabajador.destroy({transaction: t});
            await Usuario.destroy({where: {idUsuario: trabajador.idUsuario}, transaction: t});
        });
        return trabajador;
    }
    return null;
}


export default {
    create,
    createConUsuario,
    getAll,
    getById,
    getByIdUsuario,
    update,
    modify,
    remove
}
