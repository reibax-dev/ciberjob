

// Comprueba que el :id de la ruta es un número entero positivo
// antes de llegar al controlador (se usa con router.param("id", validarId))
const validarId = (req,res,next,id) =>{
    const idNumero = Number(id);
    if(!Number.isInteger(idNumero) || idNumero <= 0){
        return res.status(400).render("layout/errorPagina", { status: 400, mensaje: "ID no válido. Debe ser un número entero y positivo." });
    }
    next();
}


export {
    validarId
}
