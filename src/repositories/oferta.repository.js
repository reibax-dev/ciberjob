


import { Oferta } from "../../models/index.js";


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
    remove
};
