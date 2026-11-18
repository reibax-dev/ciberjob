import Oferta from "./oferta.model.js";
import Usuario from "./usuario.model.js";
import Categoria from "./categoria.model.js";
import Modalidad from "./modalidad.model.js";
import Trabajador from "./trabajador.model.js";
import Empresa from "./empresa.model.js";
import OfertaTrabajador from "./ofertaTrabajador.model.js";

// Relaciones 1 a 1
Usuario.hasOne(Trabajador, {foreignKey: 'idUsuario', as: 'trabajadores'});
Trabajador.belongsTo(Usuario,{foreignKey: 'idUsuario', as: 'usuarios'})

Usuario.hasOne(Empresa, {foreignKey: 'idUsuario', as: 'empresas'});
Empresa.belongsTo(Usuario,{foreignKey: 'idUsuario', as: 'usuarios'});

// Relacines 1 a N
Categoria.hasMany(Oferta,{foreignKey: 'idCategoria', as: 'ofertas'});
Oferta.belongsTo(Categoria,{foreignKey: 'idCategoria', as: 'categorias'});

Modalidad.hasMany(Oferta,{foreignKey: 'idModalidad', as: 'ofertas'});
Oferta.belongsTo(Modalidad,{foreignKey: 'idModalidad', as: 'modalidades'});

Empresa.hasMany(Oferta,{foreignKey:'idEmpresa', as: 'ofertas'});
Oferta.belongsTo(Empresa,{foreignKey:'idEmpresa',as:'empresas'});

//Relaciones M a N
Trabajador.belongsToMany(Oferta, { through: OfertaTrabajador, foreignKey: 'idTrabajador', otherKey: 'idOfertas', as: 'ofertas' })
Oferta.belongsToMany(Trabajador, { through: OfertaTrabajador, foreignKey: 'idOfertas', otherKey: 'idTrabajador', as: 'trabajadores' })

export {
  Oferta,
  Categoria,
  Modalidad,
  Usuario,
  Trabajador,
  Empresa,
  OfertaTrabajador
}