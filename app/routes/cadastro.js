module.exports = function(application){
  application.get('/cadastro',function(req,res){
    application.app.controllers.cadastroController.cadastro(application,req,res);
  });
}
