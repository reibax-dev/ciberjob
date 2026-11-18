

const isAuthenticated = async(req,res,next) =>{
    if(req.session.usuario){
        next();
    }else{
        res.redirect("/auth/login");
    }
}

// Deja pasar solo a los roles indicados ("Trabajador", "Empresa", "Admin").
// El admin se reconoce por su campo admin aunque tenga otro rol.
const hasRol = (...roles) => (req,res,next) =>{
    const usuario = req.session.usuario;
    if(usuario && (roles.includes(usuario.rol) || (usuario.admin && roles.includes("Admin")))){
        next();
    }else{
        res.status(403).render("layout/errorPagina", { status: 403, mensaje: "No tienes permiso para acceder a esta página." });
    }
}

const isAdmin = hasRol("Admin");

// Deja pasar al admin, o al usuario de ese rol si el :id de la ruta es el suyo
// (su idTrabajador o su idEmpresa, guardado en la sesión como idTipo)
const isPropioOAdmin = (rol) => (req,res,next) =>{
    const usuario = req.session.usuario;
    if(usuario && (usuario.admin || (usuario.rol === rol && usuario.idTipo === Number(req.params.id)))){
        next();
    }else{
        res.status(403).render("layout/errorPagina", { status: 403, mensaje: "Solo puedes acceder a tu propio perfil." });
    }
}


export {
    isAuthenticated,
    hasRol,
    isAdmin,
    isPropioOAdmin
}