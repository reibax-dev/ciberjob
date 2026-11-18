
import bcrypt from "bcrypt";
import { Usuario, Empresa, Trabajador, Oferta, OfertaTrabajador } from "../models/index.js";
import sequelize from "../config/db.js";

const SALT_ROUNDS = 10;


// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (data, transaction)=>{
    // la contraseña se guarda cifrada con bcrypt, nunca en claro
    const contrasenia = await bcrypt.hash(data.contrasenia, SALT_ROUNDS);
    const user = await Usuario.create({...data, contrasenia}, {transaction})
    return user;
}


// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async() => {
    const users = await Usuario.findAll();
    return users;
};

// endpoint dato individual
const getById = async (id) => {
    const user = await Usuario.findByPk(id/* ,{
        include:{
            model: Hero,
            as: "heroes",
        } 
    }*/);
    return user;
};

// endpoint dato por email (login)
const getByEmail = async (email) => {
    const user = await Usuario.findOne({where: {email}});
    return user;
};

// endpoint dato por nombre de usuario (login y registro)
const getByUsername = async (nombre) => {
    const user = await Usuario.findOne({where: {nombre}});
    return user;
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update =async (id, data)=>{
    const {nombre,email,contrasenia,telefono,admin} = data;
    const user  = await Usuario.findByPk(id);
    if(user){
        user.nombre = nombre;
        user.email = email;
        if(contrasenia){
            user.contrasenia = await bcrypt.hash(contrasenia, SALT_ROUNDS);
        }
        user.telefono = telefono
        user.admin = admin;
        await user.save();
        return user;
    }else{
        return null;
    }

}

const modify = async (id,data)=>{
    const {nombre,email,contrasenia,telefono,admin} = data;
    const user  = await Usuario.findByPk(id);
    if(!user){
        return null;
    }
    user.nombre = nombre || user.nombre;
    user.email = email || user.email;
    if(contrasenia){
        user.contrasenia = await bcrypt.hash(contrasenia, SALT_ROUNDS);
    }
    user.telefono = telefono || user.telefono;
    user.admin = admin || user.admin;
    await user.save();
    return user;
}




// ------------------------ D (Delete)------------

const remove =async (id)=>{
    const user = await Usuario.findByPk(id);
    if(user){
        // borra también su empresa (con sus ofertas) o su trabajador (con sus inscripciones): todo o nada
        await sequelize.transaction(async (t)=>{
            const empresa = await Empresa.findOne({where: {idUsuario: user.idUsuario}, transaction: t});
            if(empresa){
                const ofertas = await Oferta.findAll({where: {idEmpresa: empresa.idEmpresa}, transaction: t});
                await OfertaTrabajador.destroy({where: {idOfertas: ofertas.map(o => o.idOfertas)}, transaction: t});
                await Oferta.destroy({where: {idEmpresa: empresa.idEmpresa}, transaction: t});
                await empresa.destroy({transaction: t});
            }
            const trabajador = await Trabajador.findOne({where: {idUsuario: user.idUsuario}, transaction: t});
            if(trabajador){
                await OfertaTrabajador.destroy({where: {idTrabajador: trabajador.idTrabajador}, transaction: t});
                await trabajador.destroy({transaction: t});
            }
            await user.destroy({transaction: t});
        });
        return user;
    }
    return null;
}


export default {
    create,
    getAll,
    getById,
    getByEmail,
    getByUsername,
    update,
    modify,
    remove
}