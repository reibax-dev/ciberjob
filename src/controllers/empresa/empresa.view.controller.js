import { listarEmpresas } from "../../repositories/empresa.repository.js";

async function mostrarEmpresas(req, res) {

    const empresas = await listarEmpresas();
    return res.render("empresa/list", { empresas });
}

export { mostrarEmpresas };