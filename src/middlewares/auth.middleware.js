

const isAuthenticated = async(req,res,next) =>{
    if(req.session.usuario){
        next();
    }else{
        res.redirect("/auth/login");
    }
}


export {
    isAuthenticated
}