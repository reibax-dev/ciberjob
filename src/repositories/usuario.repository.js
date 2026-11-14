
import { Usuario } from "../models/index.js";


// ------------------ CRUD de user ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (data)=>{
    const user = await Usuario.create(data)
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


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update =async (id, data)=>{
    const {username,email,password,telefono,admin} = data;
    const user  = await Usuario.findByPk(id);
    if(user){
        user.username = username;
        user.email = email;
        user.password = password;
        user.telefono = telefono
        user.admin = admin;
        await user.save();
        return user;
    }else{
        return null;
    }

}

const modify = async (id,data)=>{
    const {username,email,password,telefono,admin} = data;
    const user  = await Usuario.findByPk(id);
    if(!user){
        return null;
    }
    user.username = username || user.username;
    user.email = email || user.email;
    user.password = password || user.password;
    user.telefono = telefono || user.telefono;
    user.admin = admin || user.admin;
    await user.save();
    return user;
}




// ------------------------ D (Delete)------------

const remove =async (id)=>{
    const user = await User.findByPk(id);
    if(user){
        await user.destroy();
        return user;
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