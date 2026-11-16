
import { Categoria, Usuario } from "../models/index.js";


// ------------------ CRUD de categoria ----------------------------

// ------------------ C (Create)
// endpoint para crear dato
const create = async (data)=>{
    const categoria = await Categoria.create(data)
    return categoria;
}


// ------------------ R (Read)---------------------------------------------
// endpoint lista de datos
const getAll = async() => {
    const categorias = await Categoria.findAll();
    return categorias;
};

// endpoint dato individual
const getById = async (id) => {
    const categoria = await Categoria.findByPk(id);
    return categoria;
};


// ---------------- U (Update) -----------------------------------
// endpoint para cambiar dato por completo
const update =async (id, data)=>{
    const {nombre,descripcion} = data;
    const categoria  = await Categoria.findByPk(id);
    if(categoria){
        categoria.nombre = name;
        categoria.descripcion = description;
        await categoria.save();
        return categoria;
    }else{
        return null;
    }

}

const modify = async (id,data)=>{
    const {nombre,descripcion} = data;
    const categoria  = await Categoria.findByPk(id);
    if(!categoria){
        return null;
    }
    categoria.nombre = nombre || categoria.nombre;
    categoria.descripcion = descripcion || categoria.descripcion;
    await categoria.save();
    return categoria;
}




// ------------------------ D (Delete)------------

const remove =async (id)=>{
    const categoria = await Categoria.findByPk(id);
    if(categoria){
        await categoria.destroy();
        return categoria;
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