


import { Oferta } from "../models/index.js";


//? ++++ C ++++

//! ENDPOINT crear dato
const create = async (data) => {   
    const oferta = await Oferta.create (data)
    return oferta;
}

//!? ++++ R +++++

//! ENDPOINT lista de datos
const getAll = async () => {
    const ofertas = await Oferta.findAll();
    return ofertas
}

//! ENDPOINT dato individual
const getById = async (id) => {
    const oferta = await Oferta.findByPk(id)
    return oferta;
}

//? ++++ U ++++

//! ENDPOINT para cambiar dato por completo
const update = async (id, data) => {
    const oferta = await Oferta.findByPk(id);
    const {nombre, id_categoria, id_empresa, descripcion, id_modalidad, salario, ubicacion, fecha} = data;
    if (oferta) {
        oferta.nombre = nombre;
        oferta.idCategoria = id_categoria;
        oferta.idEmpresa = id_empresa;
        oferta.descripcion = descripcion;
        oferta.idModalidad = id_modalidad;
        oferta.salario = salario;
        oferta.ubicacion = ubicacion;
        oferta.fecha = fecha;
        await oferta.save();
        return oferta;   
    } else {
        return null;
    }    
};

const modify = async (id, data) => {
    // const id = parseInt(req.params.id);
    const oferta = await Oferta.findByPk(id);
    // const oferta = ofertas.find ( o => o.id === id)
    const {nombre, id_categoria, id_empresa, descripcion, id_modalidad, salario, ubicacion, fecha} = data;
    if (!oferta) {
        return null ;
    }
    oferta.nombre = nombre || oferta.nombre;
    oferta.idCategoria = id_categoria || oferta.idCategoria;
    oferta.idEmpresa = id_empresa || oferta.idEmpresa;
    oferta.descripcion = descripcion || oferta.descripcion;
    oferta.idModalidad = id_modalidad || oferta.idModalidad;
    oferta.salario = salario || oferta.salario;
    oferta.ubicacion = ubicacion || oferta.ubicacion;
    oferta.fecha = fecha || oferta.fecha;
    await oferta.save();
    return oferta;
}

//? ++++ D ++++

const remove = async (id) => {
    const oferta = await Oferta.findByPk(id);
    if (oferta) {
        await oferta.destroy()
        return oferta;
    }
    return null ;
}    
    // let oferta;
    // if (index > -1 ) {
    //     oferta = ofertas.splice(index, 1);
    // }
    
    



export default {
    create,
    getAll,
    getById,
    update,
    modify,
    remove
};
